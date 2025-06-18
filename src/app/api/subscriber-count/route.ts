import { NextResponse } from 'next/server';
import { MailerLiteService } from '@/services/mailerlite';

export async function GET() {
  try {
    const mailerLite = new MailerLiteService();
    const count = await mailerLite.getSubscriberCount();
    
    return NextResponse.json(
      { count, total: 1000, timestamp: Date.now() },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'private, no-cache, no-store, must-revalidate', // Disable caching for accurate counts
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch {
    console.error('MailerLite: Service failed');
    
    // Return fallback count on error
    return NextResponse.json(
      { count: 490, total: 1000, timestamp: Date.now() },
      { status: 200 }
    );
  }
} 