# Pulse AI Slack Integration Implementation Guide

## Executive Summary

This document outlines the comprehensive implementation strategy for integrating Slack OAuth 2.0 into Pulse AI, enabling seamless workspace connection and real-time team sentiment analysis. The implementation follows industry best practices for 2025, emphasizing security, GDPR compliance, and user experience.

## 1. Architecture Overview

### 1.1 High-Level Flow
```
User → Landing Page → Slack OAuth → Token Exchange → Channel Selection → Data Collection → AI Processing → Dashboard
```

### 1.2 Core Components
- **OAuth Service**: Handles Slack OAuth 2.0 flow
- **Token Manager**: Manages access/refresh tokens with rotation
- **Data Collector**: Retrieves Slack messages via Web API
- **Sentiment Analyzer**: Processes messages with LLM
- **Dashboard Service**: Generates insights and visualizations

## 2. Slack App Configuration

### 2.1 Required OAuth Scopes

```yaml
Bot Token Scopes:
  - channels:history      # Read public channel messages
  - channels:read         # List and view channel info
  - groups:history        # Read private channel messages (optional)
  - groups:read           # List private channels (optional)
  - reactions:read        # Read emoji reactions
  - users:read            # Get user information
  - team:read             # Get workspace info
  - chat:write            # Post insights back to Slack

User Token Scopes:
  - identity.basic        # Get user identity
  - identity.email        # Get user email
  - identity.team         # Get workspace identity
```

### 2.2 Event Subscriptions

```yaml
Events API:
  - message.channels      # New messages in public channels
  - reaction_added        # Emoji reactions added
  - reaction_removed      # Emoji reactions removed
  - member_joined_channel # Team member joins
  - member_left_channel   # Team member leaves
```

### 2.3 Redirect URLs

```
Production: https://pulse-ai-v3.vercel.app/api/auth/slack/callback
Development: https://localhost:3002/api/auth/slack/callback
```

## 3. Database Schema

### 3.1 Core Tables

```sql
-- Workspaces table
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slack_team_id VARCHAR(255) UNIQUE NOT NULL,
  slack_team_name VARCHAR(255) NOT NULL,
  slack_team_domain VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  subscription_tier VARCHAR(50) DEFAULT 'free',
  data_retention_days INTEGER DEFAULT 30
);

-- OAuth tokens table with rotation support
CREATE TABLE oauth_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  slack_user_id VARCHAR(255),
  access_token TEXT ENCRYPTED,
  refresh_token TEXT ENCRYPTED,
  token_type VARCHAR(50) DEFAULT 'bot',
  scopes TEXT[],
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  rotation_enabled BOOLEAN DEFAULT true
);

-- Channels being monitored
CREATE TABLE monitored_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  slack_channel_id VARCHAR(255) NOT NULL,
  slack_channel_name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(workspace_id, slack_channel_id)
);

-- Messages for analysis
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES monitored_channels(id) ON DELETE CASCADE,
  slack_message_id VARCHAR(255) UNIQUE,
  slack_user_id VARCHAR(255),
  message_text TEXT,
  sentiment_score DECIMAL(3,2),
  sentiment_label VARCHAR(50),
  has_reactions BOOLEAN DEFAULT false,
  thread_ts VARCHAR(255),
  posted_at TIMESTAMP,
  processed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Team insights
CREATE TABLE team_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  metric_type VARCHAR(100), -- 'morale', 'productivity', 'collaboration'
  metric_value DECIMAL(5,2),
  period_start TIMESTAMP,
  period_end TIMESTAMP,
  ai_recommendations TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- User consent tracking for GDPR
CREATE TABLE user_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  slack_user_id VARCHAR(255) NOT NULL,
  consent_type VARCHAR(100), -- 'data_processing', 'analytics', 'ai_analysis'
  consented BOOLEAN DEFAULT false,
  consent_date TIMESTAMP,
  ip_address INET,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(workspace_id, slack_user_id, consent_type)
);
```

## 4. API Endpoints

### 4.1 OAuth Flow Endpoints

```typescript
// Initiate OAuth flow
GET /api/auth/slack/install
Response: Redirect to Slack OAuth URL

// OAuth callback
GET /api/auth/slack/callback
Query params: code, state, error
Response: { 
  success: boolean, 
  workspace: { id, name }, 
  nextStep: 'channel-selection' 
}

// Token refresh endpoint
POST /api/auth/slack/refresh
Body: { workspace_id }
Response: { success: boolean, expires_at: timestamp }

// Revoke access
POST /api/auth/slack/revoke
Body: { workspace_id }
Response: { success: boolean }
```

### 4.2 Channel Management

```typescript
// List available channels
GET /api/workspaces/:workspace_id/channels
Response: {
  channels: [{
    id: string,
    name: string,
    member_count: number,
    is_monitored: boolean
  }]
}

// Enable channel monitoring
POST /api/workspaces/:workspace_id/channels/:channel_id/monitor
Response: { success: boolean, channel: {...} }

// Disable channel monitoring
DELETE /api/workspaces/:workspace_id/channels/:channel_id/monitor
Response: { success: boolean }
```

### 4.3 Data Collection & Insights

```typescript
// Trigger manual sync
POST /api/workspaces/:workspace_id/sync
Response: { 
  success: boolean, 
  messages_processed: number,
  next_sync: timestamp 
}

// Get team insights
GET /api/workspaces/:workspace_id/insights
Query params: period (daily|weekly|monthly)
Response: {
  team_health: number,
  sentiment_trend: 'improving'|'stable'|'declining',
  top_issues: string[],
  recommendations: string[],
  metrics: {
    morale: number,
    productivity: number,
    collaboration: number
  }
}

// Get sentiment timeline
GET /api/workspaces/:workspace_id/sentiment
Query params: start_date, end_date
Response: {
  timeline: [{
    date: string,
    average_sentiment: number,
    message_count: number,
    positive_ratio: number
  }]
}
```

## 5. Implementation Code

### 5.1 OAuth Service (TypeScript/Next.js)

```typescript
// src/services/slack-oauth.service.ts
import { WebClient } from '@slack/web-api';
import crypto from 'crypto';

export class SlackOAuthService {
  private clientId = process.env.SLACK_CLIENT_ID!;
  private clientSecret = process.env.SLACK_CLIENT_SECRET!;
  private redirectUri = process.env.SLACK_REDIRECT_URI!;
  
  // Generate OAuth URL with PKCE
  generateAuthUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      scope: 'channels:history,channels:read,reactions:read,users:read,team:read,chat:write',
      redirect_uri: this.redirectUri,
      state: state,
      user_scope: 'identity.basic,identity.email,identity.team'
    });
    
    return `https://slack.com/oauth/v2/authorize?${params}`;
  }
  
  // Exchange code for tokens
  async exchangeCodeForTokens(code: string): Promise<SlackTokenResponse> {
    const client = new WebClient();
    
    try {
      const result = await client.oauth.v2.access({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: code,
        redirect_uri: this.redirectUri
      });
      
      if (!result.ok) {
        throw new Error('Token exchange failed');
      }
      
      return {
        access_token: result.access_token as string,
        refresh_token: result.refresh_token as string,
        expires_in: result.expires_in as number,
        team: {
          id: result.team?.id as string,
          name: result.team?.name as string
        },
        authed_user: result.authed_user,
        scope: result.scope as string
      };
    } catch (error) {
      console.error('OAuth token exchange error:', error);
      throw new Error('Failed to complete OAuth flow');
    }
  }
  
  // Refresh access token
  async refreshAccessToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const client = new WebClient();
    
    try {
      const result = await client.oauth.v2.access({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      });
      
      return {
        access_token: result.access_token as string,
        refresh_token: result.refresh_token as string,
        expires_in: result.expires_in as number
      };
    } catch (error) {
      console.error('Token refresh error:', error);
      throw new Error('Failed to refresh token');
    }
  }
  
  // Verify webhook signature
  verifyWebhookSignature(
    signature: string,
    timestamp: string,
    body: string
  ): boolean {
    const signingSecret = process.env.SLACK_SIGNING_SECRET!;
    const baseString = `v0:${timestamp}:${body}`;
    
    const hash = crypto
      .createHmac('sha256', signingSecret)
      .update(baseString)
      .digest('hex');
    
    const computedSignature = `v0=${hash}`;
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(computedSignature)
    );
  }
}
```

### 5.2 Token Manager with Rotation

```typescript
// src/services/token-manager.service.ts
import { encrypt, decrypt } from '@/lib/encryption';
import { prisma } from '@/lib/prisma';

export class TokenManager {
  private readonly TOKEN_REFRESH_BUFFER = 5 * 60 * 1000; // 5 minutes
  
  async storeTokens(
    workspaceId: string,
    tokens: TokenData,
    rotationEnabled: boolean = true
  ): Promise<void> {
    const encryptedAccess = encrypt(tokens.access_token);
    const encryptedRefresh = tokens.refresh_token 
      ? encrypt(tokens.refresh_token) 
      : null;
    
    const expiresAt = tokens.expires_in
      ? new Date(Date.now() + tokens.expires_in * 1000)
      : null;
    
    await prisma.oauthTokens.upsert({
      where: { workspace_id: workspaceId },
      create: {
        workspace_id: workspaceId,
        access_token: encryptedAccess,
        refresh_token: encryptedRefresh,
        expires_at: expiresAt,
        scopes: tokens.scopes,
        rotation_enabled: rotationEnabled,
        token_type: 'bot'
      },
      update: {
        access_token: encryptedAccess,
        refresh_token: encryptedRefresh,
        expires_at: expiresAt,
        updated_at: new Date(),
        is_active: true
      }
    });
  }
  
  async getValidToken(workspaceId: string): Promise<string> {
    const tokenRecord = await prisma.oauthTokens.findFirst({
      where: { 
        workspace_id: workspaceId,
        is_active: true 
      }
    });
    
    if (!tokenRecord) {
      throw new Error('No active token found');
    }
    
    // Check if token needs refresh
    if (tokenRecord.rotation_enabled && tokenRecord.expires_at) {
      const expiresIn = tokenRecord.expires_at.getTime() - Date.now();
      
      if (expiresIn <= this.TOKEN_REFRESH_BUFFER) {
        return await this.refreshToken(workspaceId, tokenRecord);
      }
    }
    
    return decrypt(tokenRecord.access_token);
  }
  
  private async refreshToken(
    workspaceId: string,
    tokenRecord: any
  ): Promise<string> {
    if (!tokenRecord.refresh_token) {
      throw new Error('No refresh token available');
    }
    
    const oauthService = new SlackOAuthService();
    const refreshToken = decrypt(tokenRecord.refresh_token);
    
    try {
      const newTokens = await oauthService.refreshAccessToken(refreshToken);
      
      await this.storeTokens(workspaceId, {
        ...newTokens,
        scopes: tokenRecord.scopes
      });
      
      return newTokens.access_token;
    } catch (error) {
      // Mark token as inactive if refresh fails
      await prisma.oauthTokens.update({
        where: { id: tokenRecord.id },
        data: { is_active: false }
      });
      
      throw new Error('Token refresh failed - reauthorization required');
    }
  }
}
```

### 5.3 Data Collection Service

```typescript
// src/services/slack-data-collector.service.ts
import { WebClient } from '@slack/web-api';
import { TokenManager } from './token-manager.service';

export class SlackDataCollector {
  private tokenManager = new TokenManager();
  
  async collectChannelMessages(
    workspaceId: string,
    channelId: string,
    since?: Date
  ): Promise<ProcessedMessages> {
    const token = await this.tokenManager.getValidToken(workspaceId);
    const client = new WebClient(token);
    
    try {
      // Get channel history
      const result = await client.conversations.history({
        channel: channelId,
        oldest: since ? (since.getTime() / 1000).toString() : undefined,
        limit: 100
      });
      
      if (!result.messages) return { messages: [], count: 0 };
      
      // Process messages for storage
      const processed = await Promise.all(
        result.messages.map(async (msg) => {
          // Get reactions if present
          let reactions = [];
          if (msg.reactions) {
            reactions = msg.reactions.map(r => ({
              name: r.name,
              count: r.count,
              users: r.users
            }));
          }
          
          return {
            slack_message_id: msg.ts,
            slack_user_id: msg.user,
            message_text: this.anonymizeMessage(msg.text || ''),
            has_reactions: reactions.length > 0,
            reactions: reactions,
            thread_ts: msg.thread_ts,
            posted_at: new Date(parseFloat(msg.ts!) * 1000)
          };
        })
      );
      
      return {
        messages: processed,
        count: processed.length,
        has_more: result.has_more || false
      };
    } catch (error) {
      console.error('Failed to collect messages:', error);
      throw new Error('Message collection failed');
    }
  }
  
  private anonymizeMessage(text: string): string {
    // Remove email addresses
    text = text.replace(/[\w.-]+@[\w.-]+\.\w+/g, '[email]');
    
    // Remove phone numbers
    text = text.replace(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/g, '[phone]');
    
    // Remove user mentions but keep the fact there was a mention
    text = text.replace(/<@U[A-Z0-9]+>/g, '[user]');
    
    return text;
  }
  
  async getWorkspaceInfo(workspaceId: string): Promise<WorkspaceInfo> {
    const token = await this.tokenManager.getValidToken(workspaceId);
    const client = new WebClient(token);
    
    const [teamInfo, usersList] = await Promise.all([
      client.team.info(),
      client.users.list({ limit: 1000 })
    ]);
    
    return {
      name: teamInfo.team?.name,
      domain: teamInfo.team?.domain,
      user_count: usersList.members?.filter(m => !m.is_bot).length || 0,
      plan: teamInfo.team?.plan
    };
  }
}
```

### 5.4 Webhook Handler

```typescript
// src/api/webhooks/slack/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SlackOAuthService } from '@/services/slack-oauth.service';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const timestamp = request.headers.get('X-Slack-Request-Timestamp') || '';
  const signature = request.headers.get('X-Slack-Signature') || '';
  
  // Verify request signature
  const oauthService = new SlackOAuthService();
  if (!oauthService.verifyWebhookSignature(signature, timestamp, body)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
  
  // Check timestamp to prevent replay attacks
  const requestTimestamp = parseInt(timestamp);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (Math.abs(currentTimestamp - requestTimestamp) > 60 * 5) {
    return NextResponse.json({ error: 'Request too old' }, { status: 401 });
  }
  
  const payload = JSON.parse(body);
  
  // Handle URL verification challenge
  if (payload.type === 'url_verification') {
    return NextResponse.json({ challenge: payload.challenge });
  }
  
  // Handle events
  if (payload.type === 'event_callback') {
    await handleSlackEvent(payload.event, payload.team_id);
    return NextResponse.json({ ok: true });
  }
  
  return NextResponse.json({ ok: true });
}

async function handleSlackEvent(event: any, teamId: string) {
  // Queue event for async processing
  await queueEvent({
    type: event.type,
    team_id: teamId,
    channel: event.channel,
    user: event.user,
    text: event.text,
    ts: event.ts,
    event_ts: event.event_ts
  });
}
```

## 6. Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Create Slack App in Slack API dashboard
- [ ] Set up OAuth endpoints and callback handlers
- [ ] Implement token storage with encryption
- [ ] Create database schema and migrations
- [ ] Build basic authentication flow UI

### Phase 2: Data Collection (Week 3-4)
- [ ] Implement channel listing and selection UI
- [ ] Build message collection service
- [ ] Set up webhook handlers for real-time events
- [ ] Implement data anonymization
- [ ] Create background job for periodic syncing

### Phase 3: AI Processing (Week 5-6)
- [ ] Integrate LLM for sentiment analysis
- [ ] Build insight generation algorithms
- [ ] Create recommendation engine
- [ ] Implement team health scoring
- [ ] Set up real-time processing pipeline

### Phase 4: Dashboard & Insights (Week 7-8)
- [ ] Build dashboard UI components
- [ ] Implement real-time updates via WebSocket
- [ ] Create data visualization charts
- [ ] Build notification system
- [ ] Add export functionality

### Phase 5: Security & Compliance (Week 9-10)
- [ ] Implement GDPR consent flows
- [ ] Add data retention policies
- [ ] Set up audit logging
- [ ] Perform security testing
- [ ] Implement rate limiting

### Phase 6: Testing & Launch (Week 11-12)
- [ ] End-to-end testing
- [ ] Load testing
- [ ] Security audit
- [ ] Documentation
- [ ] Beta user testing
- [ ] Production deployment

## 7. Security Considerations

### 7.1 Token Security
- Encrypt all tokens at rest using AES-256
- Use secure key management (AWS KMS or similar)
- Implement token rotation every 12 hours
- Monitor for suspicious token usage

### 7.2 Data Protection
- Anonymize PII in messages
- Implement row-level security in database
- Use TLS 1.3 for all API communications
- Regular security audits

### 7.3 GDPR Compliance
- Explicit consent before data processing
- Right to erasure implementation
- Data portability features
- Privacy policy and terms of service

## 8. Monitoring & Analytics

### 8.1 Key Metrics
- OAuth conversion rate
- Time to first insight
- Message processing latency
- API rate limit usage
- User engagement metrics

### 8.2 Error Tracking
- Sentry for error monitoring
- Custom alerts for OAuth failures
- Rate limit monitoring
- Webhook delivery tracking

## 9. Cost Estimation

### 9.1 Slack API Costs
- Free tier: Sufficient for MVP
- Enterprise Grid: Required for large organizations

### 9.2 Infrastructure Costs (Monthly)
- Database (PostgreSQL): $50-200
- Background jobs (Redis + Workers): $30-100  
- LLM API costs: $100-500 based on usage
- Hosting (Vercel Pro): $20

## 10. Success Criteria

- 80% OAuth completion rate
- <3 seconds time to dashboard after auth
- 95% uptime for webhook processing
- <500ms sentiment analysis per message
- 90% user satisfaction score

## Appendix A: Environment Variables

```env
# Slack OAuth
SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=
SLACK_SIGNING_SECRET=
SLACK_REDIRECT_URI=

# Database
DATABASE_URL=postgresql://...

# Encryption
ENCRYPTION_KEY=

# LLM
OPENAI_API_KEY=

# Redis (for job queue)
REDIS_URL=

# Monitoring
SENTRY_DSN=
```

## Appendix B: Testing Checklist

- [ ] OAuth flow with happy path
- [ ] OAuth error handling
- [ ] Token refresh mechanism
- [ ] Webhook signature verification
- [ ] Rate limiting behavior
- [ ] Data anonymization
- [ ] GDPR consent flow
- [ ] Message collection
- [ ] Sentiment analysis accuracy
- [ ] Dashboard real-time updates

## Next Steps

1. Register Slack App at https://api.slack.com/apps
2. Set up development environment with ngrok for webhooks
3. Implement Phase 1 authentication flow
4. Begin user testing with internal Slack workspace