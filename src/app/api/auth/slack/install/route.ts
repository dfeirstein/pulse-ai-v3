import { NextResponse } from 'next/server';
import { SlackOAuthService } from '@/lib/services/slack-oauth.service';
import { cookies } from 'next/headers';

/**
 * GET /api/auth/slack/install
 * 
 * Initiates the Slack OAuth flow by redirecting the user to Slack's authorization page.
 * Stores the OAuth state in a secure cookie for validation during callback.
 */
export async function GET() {
  try {
    const oauthService = new SlackOAuthService();
    const { url, state } = oauthService.generateAuthUrl();

    // Store state in secure HTTP-only cookie for validation
    const cookieStore = await cookies();
    cookieStore.set('slack_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
      path: '/'
    });

    // Redirect to Slack OAuth page
    return NextResponse.redirect(url);
  } catch (error) {
    console.error('Slack OAuth install error:', error);
    
    return NextResponse.json(
      { 
        error: 'OAuth initialization failed',
        message: error instanceof Error ? error.message : 'Failed to start OAuth flow'
      },
      { status: 500 }
    );
  }
}

/**
 * Handle preflight OPTIONS requests for CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}