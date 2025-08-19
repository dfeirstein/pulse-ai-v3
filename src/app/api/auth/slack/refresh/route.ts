import { NextRequest, NextResponse } from 'next/server';
import { TokenManager } from '@/lib/services/token-manager.service';

/**
 * POST /api/auth/slack/refresh
 * 
 * Manually refresh OAuth tokens for a workspace.
 * Useful for testing token refresh functionality or handling edge cases.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workspace_id, token_type = 'bot' } = body;

    if (!workspace_id) {
      return NextResponse.json(
        { error: 'Workspace ID is required' },
        { status: 400 }
      );
    }

    const tokenManager = new TokenManager();
    
    // This will automatically refresh if needed
    await tokenManager.getValidToken(workspace_id, token_type);
    
    // Get updated expiry information
    const expiryInfo = await tokenManager.getTokenExpiry(workspace_id, token_type);

    return NextResponse.json({
      success: true,
      expires_at: expiryInfo.expiresAt,
      expires_in: expiryInfo.expiresIn,
      needs_refresh: expiryInfo.needsRefresh
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    
    return NextResponse.json(
      { 
        error: 'Token refresh failed',
        message: error instanceof Error ? error.message : 'Failed to refresh token'
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