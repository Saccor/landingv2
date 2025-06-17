import { NextRequest } from 'next/server';
import { MailerLiteService } from '@/services/mailerlite';
import { addClient, removeClient, getSubscriberCount, setSubscriberCount } from '@/lib/liveCountManager';

// Initialize with real count
async function getCurrentCount(): Promise<number> {
  try {
    const mailerLite = new MailerLiteService();
    const count = await mailerLite.getSubscriberCount();
    setSubscriberCount(count); // Update our cached value
    return count;
  } catch (error) {
    console.error('Failed to fetch current count:', error);
    return getSubscriberCount(); // Return cached/fallback value
  }
}

export async function GET(request: NextRequest) {
  // Create SSE stream
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // Add client to our set
      addClient(controller);
      
      // Get real current count
      const currentCount = await getCurrentCount();
      
      // Send initial count with real data
      const initialMessage = `data: ${JSON.stringify({ 
        count: currentCount, 
        total: 1000 
      })}\n\n`;
      
      try {
        controller.enqueue(new TextEncoder().encode(initialMessage));
      } catch {
        console.error('SSE: Failed to send initial message');
      }
      
      // Keep connection alive with heartbeat
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(new TextEncoder().encode(': heartbeat\n\n'));
        } catch {
          clearInterval(heartbeat);
          removeClient(controller);
        }
      }, 30000);
      
      // Cleanup on close
      request.signal?.addEventListener('abort', () => {
        clearInterval(heartbeat);
        removeClient(controller);
        controller.close();
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
} 