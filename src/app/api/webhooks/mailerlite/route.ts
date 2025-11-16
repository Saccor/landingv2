import { NextRequest, NextResponse } from 'next/server';
import { MailerLiteService } from '@/services/mailerlite';
import { broadcastUpdate } from '@/lib/liveCountManager';

/**
 * MailerLite webhook event types that trigger subscriber count updates
 */
const SUBSCRIBER_EVENT_TYPES = [
  'subscriber.created',
  'subscriber.updated',
  'subscriber.unsubscribed',
  'subscriber.deleted'
] as const;

/**
 * Interface for MailerLite webhook payload
 */
interface MailerLiteWebhookPayload {
  type: string;
  data?: {
    id?: string;
    email?: string;
    status?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Configuration constants
 */
const CONFIG = {
  TOTAL_SPOTS: 1000,
  TIMEOUT_MS: 5000,
} as const;

/**
 * Validates webhook payload structure
 */
function isValidWebhookPayload(payload: unknown): payload is MailerLiteWebhookPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'type' in payload &&
    typeof (payload as MailerLiteWebhookPayload).type === 'string'
  );
}

/**
 * Checks if webhook event should trigger count update
 */
function shouldUpdateCount(eventType: string): boolean {
  return SUBSCRIBER_EVENT_TYPES.includes(eventType as typeof SUBSCRIBER_EVENT_TYPES[number]);
}

/**
 * Fetches current subscriber count with timeout protection (force refresh for webhooks)
 */
async function fetchCurrentCount(): Promise<number> {
  try {
    const mailerLite = new MailerLiteService();
    // Use refreshSubscriberCount for webhooks to ensure fresh data
    const count = await Promise.race([
      mailerLite.refreshSubscriberCount(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), CONFIG.TIMEOUT_MS)
      )
    ]);

    console.log(`Webhook: ✅ Fetched fresh current count: ${count}`);
    return count;
  } catch (error) {
    console.error('Webhook: ❌ Failed to fetch current count:', error);
    throw new Error('Failed to fetch current subscriber count');
  }
}

/**
 * Broadcasts count update to all connected clients
 */
function broadcastCountUpdate(count: number): void {
  try {
    broadcastUpdate({
      count,
      total: CONFIG.TOTAL_SPOTS
    });
    console.log(`Webhook: 📡 Broadcasting count update: ${count}/${CONFIG.TOTAL_SPOTS}`);
  } catch (error) {
    console.error('Webhook: ❌ Failed to broadcast update:', error);
  }
}

/**
 * Processes MailerLite webhook events
 * 
 * Handles subscriber events and updates real-time count across all connected clients
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse webhook payload
    const body = await request.text();

    if (!body.trim()) {
      console.warn('Webhook: ⚠️ Empty request body received');
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }

    let webhookData: MailerLiteWebhookPayload;
    try {
      webhookData = JSON.parse(body);
    } catch (parseError) {
      console.error('Webhook: ❌ Invalid JSON payload:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Validate payload structure
    if (!isValidWebhookPayload(webhookData)) {
      console.warn('Webhook: ⚠️ Invalid payload structure:', webhookData);
      return NextResponse.json(
        { error: 'Invalid webhook payload structure' },
        { status: 400 }
      );
    }

    console.log(`Webhook: 📨 Received event: ${webhookData.type}`);

    // Process subscriber events that affect count
    if (shouldUpdateCount(webhookData.type)) {
      try {
        // Fetch real current count from MailerLite API
        const currentCount = await fetchCurrentCount();

        // Broadcast real-time update to all connected clients
        broadcastCountUpdate(currentCount);

        console.log(`Webhook: ✅ Successfully processed ${webhookData.type} event`);
      } catch (countError) {
        console.error(`Webhook: ❌ Failed to process ${webhookData.type} event:`, countError);
        // Return success to MailerLite but log the error
        // This prevents webhook retries for count update failures
      }
    } else {
      console.log(`Webhook: ℹ️ Event ${webhookData.type} does not require count update`);
    }

    // Always return success to MailerLite to prevent retries
    return NextResponse.json({
      success: true,
      processed: shouldUpdateCount(webhookData.type),
      eventType: webhookData.type
    });

  } catch (error) {
    console.error('Webhook: ❌ Unexpected error:', error);

    // Return generic error to avoid exposing internal details
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
} 