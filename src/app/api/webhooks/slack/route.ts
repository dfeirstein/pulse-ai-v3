import { NextRequest, NextResponse } from 'next/server';
import { SlackOAuthService } from '@/lib/services/slack-oauth.service';

// Disable body parsing to get raw body for signature verification
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text();
    
    // Parse the body
    let payload;
    try {
      payload = JSON.parse(body);
    } catch (e) {
      console.error('Failed to parse webhook body:', e);
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Handle URL verification challenge from Slack
    if (payload.type === 'url_verification') {
      console.log('Handling Slack URL verification challenge');
      // Respond immediately with the challenge value
      return NextResponse.json({ challenge: payload.challenge });
    }

    // Get headers for signature verification
    const timestamp = request.headers.get('X-Slack-Request-Timestamp') || '';
    const signature = request.headers.get('X-Slack-Signature') || '';

    // Skip signature verification for URL verification
    if (payload.type !== 'url_verification' && timestamp && signature) {
      // Verify request signature for security
      const oauthService = new SlackOAuthService();
      
      if (!oauthService.verifyWebhookSignature(signature, timestamp, body)) {
        console.error('Invalid Slack webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }

      // Check timestamp to prevent replay attacks (within 5 minutes)
      const requestTimestamp = parseInt(timestamp);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      
      if (Math.abs(currentTimestamp - requestTimestamp) > 60 * 5) {
        console.error('Slack webhook request too old');
        return NextResponse.json({ error: 'Request too old' }, { status: 401 });
      }
    }

    // Handle different event types
    if (payload.type === 'event_callback') {
      const event = payload.event;
      console.log('Received Slack event:', event.type);

      // Handle different event types
      switch (event.type) {
        case 'message':
          // Handle new message event
          await handleMessageEvent(event, payload.team_id);
          break;
          
        case 'reaction_added':
          // Handle reaction added event
          await handleReactionAddedEvent(event, payload.team_id);
          break;
          
        case 'reaction_removed':
          // Handle reaction removed event
          await handleReactionRemovedEvent(event, payload.team_id);
          break;
          
        case 'member_joined_channel':
          // Handle member joined channel event
          await handleMemberJoinedEvent(event, payload.team_id);
          break;
          
        case 'member_left_channel':
          // Handle member left channel event
          await handleMemberLeftEvent(event, payload.team_id);
          break;
          
        default:
          console.log('Unhandled event type:', event.type);
      }

      // Respond immediately with 200 OK
      return NextResponse.json({ ok: true });
    }

    // Handle app_rate_limited event
    if (payload.type === 'app_rate_limited') {
      console.warn('App rate limited by Slack:', payload);
      // Implement backoff strategy
      return NextResponse.json({ ok: true });
    }

    // Unknown event type
    console.log('Unknown Slack event type:', payload.type);
    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// Event handler functions (to be implemented in Phase 2)
async function handleMessageEvent(event: unknown, teamId: string) {
  // Queue message for sentiment analysis
  const evt = event as { channel?: string };
  console.log('New message in channel:', evt.channel, 'from team:', teamId);
  
  // TODO: Implement in Phase 2
  // - Store message in database
  // - Queue for sentiment analysis
  // - Update real-time dashboard
}

async function handleReactionAddedEvent(event: unknown, teamId: string) {
  // Process reaction for sentiment indicators
  const evt = event as { reaction?: string };
  console.log('Reaction added:', evt.reaction, 'in team:', teamId);
  
  // TODO: Implement in Phase 2
  // - Update message reaction count
  // - Adjust sentiment scoring
}

async function handleReactionRemovedEvent(event: unknown, teamId: string) {
  // Update reaction metrics
  const evt = event as { reaction?: string };
  console.log('Reaction removed:', evt.reaction, 'in team:', teamId);
  
  // TODO: Implement in Phase 2
  // - Update message reaction count
  // - Adjust sentiment scoring
}

async function handleMemberJoinedEvent(event: unknown, teamId: string) {
  // Track team dynamics
  const evt = event as { channel?: string };
  console.log('Member joined channel:', evt.channel, 'in team:', teamId);
  
  // TODO: Implement in Phase 2
  // - Update channel member count
  // - Track team growth metrics
}

async function handleMemberLeftEvent(event: unknown, teamId: string) {
  // Track team dynamics
  const evt = event as { channel?: string };
  console.log('Member left channel:', evt.channel, 'in team:', teamId);
  
  // TODO: Implement in Phase 2
  // - Update channel member count
  // - Track team dynamics metrics
}

// Support GET requests for testing
export async function GET() {
  return NextResponse.json({ 
    status: 'Slack webhook endpoint is running',
    timestamp: new Date().toISOString()
  });
}