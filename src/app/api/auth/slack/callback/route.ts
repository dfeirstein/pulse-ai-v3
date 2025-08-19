import { NextRequest, NextResponse } from 'next/server';
import { SlackOAuthService } from '@/lib/services/slack-oauth.service';
import { TokenManager } from '@/lib/services/token-manager.service';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

/**
 * GET /api/auth/slack/callback
 * 
 * Handles the OAuth callback from Slack after user authorization.
 * Exchanges the authorization code for access tokens and stores them securely.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  // Check for OAuth errors
  if (error) {
    console.error('Slack OAuth error:', error);
    const errorUrl = new URL('/auth/slack/error', request.url);
    errorUrl.searchParams.set('error', error);
    return NextResponse.redirect(errorUrl);
  }

  if (!code || !state) {
    console.error('Missing OAuth parameters:', { code: !!code, state: !!state });
    const errorUrl = new URL('/auth/slack/error', request.url);
    errorUrl.searchParams.set('error', 'invalid_request');
    return NextResponse.redirect(errorUrl);
  }

  try {
    // Validate OAuth state
    const cookieStore = await cookies();
    const storedState = cookieStore.get('slack_oauth_state')?.value;
    
    if (!storedState) {
      throw new Error('Missing OAuth state cookie');
    }

    const oauthService = new SlackOAuthService();
    if (!oauthService.validateState(state, storedState)) {
      throw new Error('Invalid OAuth state parameter');
    }

    // Clear the state cookie
    cookieStore.delete('slack_oauth_state');

    // Exchange code for tokens
    const tokenResponse = await oauthService.exchangeCodeForTokens(code);
    
    // Create or update workspace record
    const workspace = await prisma.workspace.upsert({
      where: { slackTeamId: tokenResponse.team.id },
      create: {
        slackTeamId: tokenResponse.team.id,
        slackTeamName: tokenResponse.team.name,
        slackTeamDomain: tokenResponse.team.domain || null,
        isActive: true,
        subscriptionTier: 'free',
        dataRetentionDays: 30
      },
      update: {
        slackTeamName: tokenResponse.team.name,
        slackTeamDomain: tokenResponse.team.domain || null,
        isActive: true,
        updatedAt: new Date()
      }
    });

    // Store bot token
    const tokenManager = new TokenManager();
    const scopes = tokenResponse.scope.split(',').map(s => s.trim());
    
    await tokenManager.storeTokens(
      workspace.id,
      {
        access_token: tokenResponse.access_token,
        refresh_token: tokenResponse.refresh_token,
        expires_in: tokenResponse.expires_in,
        scopes
      },
      tokenResponse.bot_user_id,
      'bot',
      true
    );

    // Store user token if present
    if (tokenResponse.authed_user.access_token) {
      await tokenManager.storeTokens(
        workspace.id,
        {
          access_token: tokenResponse.authed_user.access_token,
          scopes: ['identity.basic', 'identity.email', 'identity.team']
        },
        tokenResponse.authed_user.id,
        'user',
        false // User tokens typically don't support refresh
      );
    }

    // Redirect to success page with workspace info
    const successUrl = new URL('/auth/slack/success', request.url);
    successUrl.searchParams.set('workspace_id', workspace.id);
    successUrl.searchParams.set('workspace_name', workspace.slackTeamName);
    
    return NextResponse.redirect(successUrl);
  } catch (error: any) {
    console.error('Slack OAuth callback error:', error);
    
    const errorUrl = new URL('/auth/slack/error', request.url);
    errorUrl.searchParams.set('error', 'oauth_failed');
    errorUrl.searchParams.set('message', error.message || 'OAuth flow failed');
    
    return NextResponse.redirect(errorUrl);
  }
}

/**
 * Handle preflight OPTIONS requests for CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}