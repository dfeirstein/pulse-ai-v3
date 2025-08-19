import { NextRequest, NextResponse } from 'next/server';
import { TokenManager } from '@/lib/services/token-manager.service';

/**
 * POST /api/auth/slack/revoke
 * 
 * Revoke OAuth tokens for a workspace.
 * This will revoke tokens with Slack and mark them as inactive in the database.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workspace_id, token_type } = body;

    if (!workspace_id) {
      return NextResponse.json(
        { error: 'Workspace ID is required' },
        { status: 400 }
      );
    }

    const tokenManager = new TokenManager();
    await tokenManager.revokeTokens(workspace_id, token_type);

    return NextResponse.json({
      success: true,
      message: `${token_type || 'All'} tokens revoked for workspace`
    });
  } catch (error: any) {
    console.error('Token revocation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Token revocation failed',
        message: error.message || 'Failed to revoke tokens'
      },
      { status: 400 }
    );
  }
}

/**
 * Handle preflight OPTIONS requests for CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}