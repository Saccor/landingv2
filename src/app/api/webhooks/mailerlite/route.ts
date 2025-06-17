import { NextRequest, NextResponse } from 'next/server';
import { broadcastUpdate } from '@/lib/liveCountManager';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature (optional but recommended)
    const body = await request.text();
    
    // Parse MailerLite webhook data
    const webhookData = JSON.parse(body);
    
    // Handle subscriber events
    if (webhookData.type === 'subscriber.created' || 
        webhookData.type === 'subscriber.updated') {
      
      // Get current count from MailerLite API
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/subscriber-count`);
      const { count } = await response.json();
      
      // Broadcast real-time update to all connected clients
      broadcastUpdate({ count, total: 1000 });
      
      console.log(`MailerLite: New subscriber added. Broadcasting count: ${count}`);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('MailerLite webhook error:', error);
    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
  }
} 