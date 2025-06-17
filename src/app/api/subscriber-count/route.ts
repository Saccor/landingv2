import { NextResponse } from 'next/server';
import { MailerLiteService } from '@/services/mailerlite';

export async function GET() {
  try {
    const mailerLite = new MailerLiteService();
    const count = await mailerLite.getSubscriberCount();
    
    return NextResponse.json(
      { count, total: 1000 },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=15', // Cache for 30 seconds
        },
      }
    );
  } catch {
    console.error('MailerLite: Service failed');
    
    // Return fallback count on error
    return NextResponse.json(
      { count: 490, total: 1000 },
      { status: 200 }
    );
  }
} 