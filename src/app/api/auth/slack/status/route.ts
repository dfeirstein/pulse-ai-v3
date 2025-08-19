import { NextRequest, NextResponse } from 'next/server';
import { TokenManager } from '@/lib/services/token-manager.service';

/**
 * GET /api/auth/slack/status
 * 
 * Check the status of OAuth tokens for a workspace.
 * Returns token validity, expiry information, and workspace details.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const workspaceId = searchParams.get('workspace_id');
  const tokenType = (searchParams.get('token_type') as 'bot' | 'user') || 'bot';

  if (!workspaceId) {
    return NextResponse.json(
      { error: 'Workspace ID is required' },
      { status: 400 }
    );
  }

  try {
    const tokenManager = new TokenManager();
    
    // Test token validity
    const tokenTest = await tokenManager.testTokens(workspaceId, tokenType);
    
    // Get expiry information
    const expiryInfo = await tokenManager.getTokenExpiry(workspaceId, tokenType);
    
    // Get all workspace tokens (without sensitive data)
    const tokens = await tokenManager.getWorkspaceTokens(workspaceId);

    return NextResponse.json({
      workspace_id: workspaceId,
      token_type: tokenType,
      valid: tokenTest.valid,
      error: tokenTest.error,
      token_info: tokenTest.tokenInfo,
      expires_at: expiryInfo.expiresAt,
      expires_in: expiryInfo.expiresIn,
      needs_refresh: expiryInfo.needsRefresh,
      all_tokens: tokens.map(token => ({
        type: token.tokenType,
        scopes: token.scopes,
        expires_at: token.expiresAt,
        created_at: token.createdAt,
        rotation_enabled: token.rotationEnabled
      }))
    });
  } catch (error: any) {
    console.error('Token status check error:', error);
    
    return NextResponse.json(
      { 
        error: 'Status check failed',
        message: error.message || 'Failed to check token status'
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