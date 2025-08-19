import { encrypt, decrypt } from '@/lib/encryption';
import { prisma } from '@/lib/prisma';
import { SlackOAuthService } from './slack-oauth.service';
import { OAuthToken, Workspace } from '@prisma/client';

export interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  scopes: string[];
}

export interface WorkspaceWithTokens extends Workspace {
  oauthTokens: OAuthToken[];
}

export class TokenManager {
  private readonly TOKEN_REFRESH_BUFFER = 5 * 60 * 1000; // 5 minutes before expiry
  private oauthService: SlackOAuthService;

  constructor() {
    this.oauthService = new SlackOAuthService();
  }

  /**
   * Store OAuth tokens for a workspace
   * @param workspaceId - The workspace ID
   * @param tokens - Token data to store
   * @param slackUserId - Optional Slack user ID
   * @param tokenType - Type of token (bot or user)
   * @param rotationEnabled - Whether automatic token rotation is enabled
   */
  async storeTokens(
    workspaceId: string,
    tokens: TokenData,
    slackUserId?: string,
    tokenType: 'bot' | 'user' = 'bot',
    rotationEnabled: boolean = true
  ): Promise<void> {
    try {
      const encryptedAccess = encrypt(tokens.access_token);
      const encryptedRefresh = tokens.refresh_token 
        ? encrypt(tokens.refresh_token) 
        : null;

      const expiresAt = tokens.expires_in
        ? new Date(Date.now() + tokens.expires_in * 1000)
        : null;

      await prisma.oAuthToken.upsert({
        where: { 
          workspaceId_tokenType: {
            workspaceId,
            tokenType
          }
        },
        create: {
          workspaceId,
          slackUserId,
          accessToken: encryptedAccess,
          refreshToken: encryptedRefresh,
          tokenType,
          scopes: tokens.scopes,
          expiresAt,
          rotationEnabled,
          isActive: true
        },
        update: {
          accessToken: encryptedAccess,
          refreshToken: encryptedRefresh,
          scopes: tokens.scopes,
          expiresAt,
          updatedAt: new Date(),
          isActive: true,
          rotationEnabled
        }
      });

      console.log(`${tokenType} token stored for workspace ${workspaceId}`);
    } catch (error) {
      console.error('Failed to store tokens:', error);
      throw new Error('Failed to store authentication tokens');
    }
  }

  /**
   * Get a valid access token for a workspace
   * @param workspaceId - The workspace ID
   * @param tokenType - Type of token to retrieve
   * @returns Valid access token
   */
  async getValidToken(
    workspaceId: string, 
    tokenType: 'bot' | 'user' = 'bot'
  ): Promise<string> {
    try {
      const tokenRecord = await prisma.oAuthToken.findFirst({
        where: {
          workspaceId,
          tokenType,
          isActive: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      if (!tokenRecord) {
        throw new Error(`No active ${tokenType} token found for workspace ${workspaceId}`);
      }

      // Check if token needs refresh
      if (tokenRecord.rotationEnabled && tokenRecord.expiresAt) {
        const expiresIn = tokenRecord.expiresAt.getTime() - Date.now();
        
        if (expiresIn <= this.TOKEN_REFRESH_BUFFER) {
          console.log(`Token expiring in ${Math.round(expiresIn / 1000)}s, attempting refresh...`);
          return await this.refreshToken(workspaceId, tokenRecord);
        }
      }

      return decrypt(tokenRecord.accessToken);
    } catch (error) {
      console.error('Failed to get valid token:', error);
      throw new Error('Failed to retrieve valid authentication token');
    }
  }

  /**
   * Refresh an expired token
   * @param workspaceId - The workspace ID
   * @param tokenRecord - The existing token record
   * @returns New access token
   */
  private async refreshToken(
    workspaceId: string,
    tokenRecord: OAuthToken
  ): Promise<string> {
    if (!tokenRecord.refreshToken) {
      await this.markTokenInactive(tokenRecord.id);
      throw new Error('No refresh token available - re-authorization required');
    }

    try {
      const refreshToken = decrypt(tokenRecord.refreshToken);
      const newTokens = await this.oauthService.refreshAccessToken(refreshToken);

      // Store the refreshed tokens
      await this.storeTokens(
        workspaceId,
        {
          access_token: newTokens.access_token,
          refresh_token: newTokens.refresh_token || refreshToken,
          expires_in: newTokens.expires_in,
          scopes: tokenRecord.scopes
        },
        tokenRecord.slackUserId || undefined,
        tokenRecord.tokenType as 'bot' | 'user',
        tokenRecord.rotationEnabled
      );

      console.log(`Token successfully refreshed for workspace ${workspaceId}`);
      return newTokens.access_token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      
      // Mark token as inactive if refresh fails
      await this.markTokenInactive(tokenRecord.id);
      
      throw new Error('Token refresh failed - re-authorization required');
    }
  }

  /**
   * Mark a token as inactive
   * @param tokenId - The token ID to deactivate
   */
  private async markTokenInactive(tokenId: string): Promise<void> {
    try {
      await prisma.oAuthToken.update({
        where: { id: tokenId },
        data: { isActive: false }
      });
    } catch (error) {
      console.error('Failed to mark token as inactive:', error);
    }
  }

  /**
   * Revoke and remove tokens for a workspace
   * @param workspaceId - The workspace ID
   * @param tokenType - Optional specific token type to revoke
   */
  async revokeTokens(
    workspaceId: string,
    tokenType?: 'bot' | 'user'
  ): Promise<void> {
    try {
      const whereClause = {
        workspaceId,
        isActive: true,
        ...(tokenType && { tokenType })
      };

      const activeTokens = await prisma.oAuthToken.findMany({
        where: whereClause
      });

      // Revoke tokens with Slack
      const revocationPromises = activeTokens.map(async (token) => {
        try {
          const accessToken = decrypt(token.accessToken);
          await this.oauthService.revokeToken(accessToken);
        } catch (error) {
          console.error(`Failed to revoke token ${token.id} with Slack:`, error);
          // Continue with database cleanup even if Slack revocation fails
        }
      });

      await Promise.allSettled(revocationPromises);

      // Mark tokens as inactive in database
      await prisma.oAuthToken.updateMany({
        where: whereClause,
        data: { isActive: false }
      });

      console.log(`Revoked ${tokenType || 'all'} tokens for workspace ${workspaceId}`);
    } catch (error) {
      console.error('Failed to revoke tokens:', error);
      throw new Error('Failed to revoke authentication tokens');
    }
  }

  /**
   * Get all active tokens for a workspace
   * @param workspaceId - The workspace ID
   * @returns Array of token records (without sensitive data)
   */
  async getWorkspaceTokens(workspaceId: string): Promise<Omit<OAuthToken, 'accessToken' | 'refreshToken'>[]> {
    try {
      const tokens = await prisma.oAuthToken.findMany({
        where: {
          workspaceId,
          isActive: true
        },
        select: {
          id: true,
          workspaceId: true,
          slackUserId: true,
          tokenType: true,
          scopes: true,
          expiresAt: true,
          createdAt: true,
          updatedAt: true,
          isActive: true,
          rotationEnabled: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return tokens;
    } catch (error) {
      console.error('Failed to get workspace tokens:', error);
      throw new Error('Failed to retrieve workspace tokens');
    }
  }

  /**
   * Test if tokens are valid
   * @param workspaceId - The workspace ID
   * @param tokenType - Type of token to test
   * @returns Token validation result
   */
  async testTokens(
    workspaceId: string,
    tokenType: 'bot' | 'user' = 'bot'
  ): Promise<{ valid: boolean; error?: string; tokenInfo?: unknown }> {
    try {
      const accessToken = await this.getValidToken(workspaceId, tokenType);
      const tokenInfo = await this.oauthService.testToken(accessToken);
      
      return {
        valid: true,
        tokenInfo
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get token expiry information
   * @param workspaceId - The workspace ID
   * @param tokenType - Type of token to check
   * @returns Token expiry information
   */
  async getTokenExpiry(
    workspaceId: string,
    tokenType: 'bot' | 'user' = 'bot'
  ): Promise<{ expiresAt: Date | null; expiresIn: number | null; needsRefresh: boolean }> {
    try {
      const tokenRecord = await prisma.oAuthToken.findFirst({
        where: {
          workspaceId,
          tokenType,
          isActive: true
        }
      });

      if (!tokenRecord || !tokenRecord.expiresAt) {
        return {
          expiresAt: null,
          expiresIn: null,
          needsRefresh: false
        };
      }

      const expiresIn = tokenRecord.expiresAt.getTime() - Date.now();
      const needsRefresh = tokenRecord.rotationEnabled && expiresIn <= this.TOKEN_REFRESH_BUFFER;

      return {
        expiresAt: tokenRecord.expiresAt,
        expiresIn: expiresIn > 0 ? expiresIn : 0,
        needsRefresh
      };
    } catch (error) {
      console.error('Failed to get token expiry:', error);
      throw new Error('Failed to check token expiry');
    }
  }

  /**
   * Clean up expired tokens
   * @param olderThanDays - Remove tokens older than this many days
   */
  async cleanupExpiredTokens(olderThanDays: number = 30): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

      const result = await prisma.oAuthToken.deleteMany({
        where: {
          isActive: false,
          updatedAt: {
            lt: cutoffDate
          }
        }
      });

      console.log(`Cleaned up ${result.count} expired tokens`);
      return result.count;
    } catch (error) {
      console.error('Failed to cleanup expired tokens:', error);
      return 0;
    }
  }
}