import { WebClient } from '@slack/web-api';
import crypto from 'crypto';
import { generateOAuthState, verifyOAuthState } from '@/lib/encryption';

export interface SlackTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  team: {
    id: string;
    name: string;
    domain?: string;
  };
  authed_user: {
    id: string;
    access_token?: string;
  };
  scope: string;
  bot_user_id?: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

export class SlackOAuthService {
  private clientId: string;
  private clientSecret: string;
  private signingSecret: string;
  private redirectUri: string;

  constructor() {
    this.clientId = process.env.SLACK_CLIENT_ID!;
    this.clientSecret = process.env.SLACK_CLIENT_SECRET!;
    this.signingSecret = process.env.SLACK_SIGNING_SECRET!;
    
    // Use environment-specific redirect URI
    this.redirectUri = process.env.NODE_ENV === 'production' 
      ? process.env.SLACK_REDIRECT_URI_PROD!
      : process.env.SLACK_REDIRECT_URI_DEV!;

    this.validateEnvironment();
  }

  /**
   * Validate that all required environment variables are set
   */
  private validateEnvironment(): void {
    const required = [
      'SLACK_CLIENT_ID',
      'SLACK_CLIENT_SECRET', 
      'SLACK_SIGNING_SECRET'
    ];

    const missing = required.filter(key => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    if (!this.redirectUri) {
      throw new Error('Missing redirect URI environment variable');
    }
  }

  /**
   * Generate OAuth authorization URL with state parameter
   * @param state - Optional custom state, if not provided, a secure random state is generated
   * @returns Object containing the authorization URL and state
   */
  generateAuthUrl(state?: string): { url: string; state: string } {
    const oauthState = state || generateOAuthState();
    
    const params = new URLSearchParams({
      client_id: this.clientId,
      scope: [
        'channels:history',
        'channels:read',
        'reactions:read',
        'users:read',
        'team:read',
        'chat:write'
      ].join(','),
      redirect_uri: this.redirectUri,
      state: oauthState,
      user_scope: [
        'identity.basic',
        'identity.email',
        'identity.team'
      ].join(',')
    });

    return {
      url: `https://slack.com/oauth/v2/authorize?${params}`,
      state: oauthState
    };
  }

  /**
   * Exchange authorization code for access tokens
   * @param code - Authorization code from Slack
   * @returns Token response with workspace and user information
   */
  async exchangeCodeForTokens(code: string): Promise<SlackTokenResponse> {
    const client = new WebClient();

    try {
      const result = await client.oauth.v2.access({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: code,
        redirect_uri: this.redirectUri
      });

      if (!result.ok || !result.access_token) {
        console.error('OAuth token exchange failed:', result.error);
        throw new Error(`Token exchange failed: ${result.error || 'Unknown error'}`);
      }

      return {
        access_token: result.access_token as string,
        refresh_token: result.refresh_token as string,
        expires_in: result.expires_in as number,
        team: {
          id: result.team?.id as string,
          name: result.team?.name as string,
          domain: result.team?.domain as string
        },
        authed_user: {
          id: result.authed_user?.id as string,
          access_token: result.authed_user?.access_token as string
        },
        scope: result.scope as string,
        bot_user_id: result.bot_user_id as string
      };
    } catch (error: any) {
      console.error('OAuth token exchange error:', error);
      
      // Handle specific Slack API errors
      if (error?.data?.error) {
        switch (error.data.error) {
          case 'invalid_code':
            throw new Error('Invalid authorization code. Please try again.');
          case 'code_already_used':
            throw new Error('Authorization code has already been used.');
          case 'invalid_redirect_uri':
            throw new Error('Invalid redirect URI configuration.');
          default:
            throw new Error(`Slack API error: ${error.data.error}`);
        }
      }
      
      throw new Error('Failed to complete OAuth flow');
    }
  }

  /**
   * Refresh an expired access token
   * @param refreshToken - The refresh token
   * @returns New token response
   */
  async refreshAccessToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const client = new WebClient();

    try {
      const result = await client.oauth.v2.access({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      });

      if (!result.ok || !result.access_token) {
        console.error('Token refresh failed:', result.error);
        throw new Error(`Token refresh failed: ${result.error || 'Unknown error'}`);
      }

      return {
        access_token: result.access_token as string,
        refresh_token: result.refresh_token as string,
        expires_in: result.expires_in as number
      };
    } catch (error: any) {
      console.error('Token refresh error:', error);
      
      if (error?.data?.error) {
        switch (error.data.error) {
          case 'invalid_refresh_token':
            throw new Error('Invalid refresh token. Re-authorization required.');
          case 'token_revoked':
            throw new Error('Token has been revoked. Re-authorization required.');
          default:
            throw new Error(`Token refresh error: ${error.data.error}`);
        }
      }
      
      throw new Error('Failed to refresh token');
    }
  }

  /**
   * Revoke access tokens
   * @param token - The access token to revoke
   */
  async revokeToken(token: string): Promise<void> {
    const client = new WebClient();

    try {
      const result = await client.auth.revoke({
        token: token
      });

      if (!result.ok) {
        console.error('Token revocation failed:', result.error);
        throw new Error(`Token revocation failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error('Token revocation error:', error);
      throw new Error('Failed to revoke token');
    }
  }

  /**
   * Verify webhook signature from Slack
   * @param signature - The X-Slack-Signature header
   * @param timestamp - The X-Slack-Request-Timestamp header
   * @param body - The raw request body
   * @returns True if signature is valid
   */
  verifyWebhookSignature(signature: string, timestamp: string, body: string): boolean {
    try {
      // Check timestamp to prevent replay attacks (within 5 minutes)
      const requestTime = parseInt(timestamp);
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (Math.abs(currentTime - requestTime) > 300) {
        console.warn('Webhook request timestamp too old');
        return false;
      }

      // Create signature base string
      const baseString = `v0:${timestamp}:${body}`;
      
      // Compute expected signature
      const hash = crypto
        .createHmac('sha256', this.signingSecret)
        .update(baseString, 'utf8')
        .digest('hex');
      
      const expectedSignature = `v0=${hash}`;

      // Compare signatures using timing-safe comparison
      return crypto.timingSafeEqual(
        Buffer.from(signature, 'utf8'),
        Buffer.from(expectedSignature, 'utf8')
      );
    } catch (error) {
      console.error('Webhook signature verification error:', error);
      return false;
    }
  }

  /**
   * Validate OAuth state parameter
   * @param receivedState - State parameter from callback
   * @param expectedState - Expected state value
   * @returns True if states match
   */
  validateState(receivedState: string, expectedState: string): boolean {
    return verifyOAuthState(receivedState, expectedState);
  }

  /**
   * Get workspace information using bot token
   * @param token - Bot access token
   * @returns Workspace information
   */
  async getWorkspaceInfo(token: string) {
    const client = new WebClient(token);

    try {
      const [teamInfo, authTest] = await Promise.all([
        client.team.info(),
        client.auth.test()
      ]);

      return {
        team: {
          id: teamInfo.team?.id,
          name: teamInfo.team?.name,
          domain: teamInfo.team?.domain,
          icon: teamInfo.team?.icon
        },
        bot: {
          id: authTest.bot_id,
          user_id: authTest.user_id
        }
      };
    } catch (error) {
      console.error('Failed to get workspace info:', error);
      throw new Error('Failed to retrieve workspace information');
    }
  }

  /**
   * Test if a token is valid
   * @param token - Access token to test
   * @returns Token info if valid
   */
  async testToken(token: string) {
    const client = new WebClient(token);

    try {
      const result = await client.auth.test();
      
      if (!result.ok) {
        throw new Error('Token test failed');
      }

      return {
        user_id: result.user_id,
        team_id: result.team_id,
        bot_id: result.bot_id,
        is_enterprise_install: result.is_enterprise_install
      };
    } catch (error) {
      console.error('Token test error:', error);
      throw new Error('Invalid or expired token');
    }
  }
}