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
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60', // Cache for 5 minutes
        },
      }
    );
  } catch {
    console.error('MailerLite: Service failed');
    
    // Return fallback count on error
    return NextResponse.json(
      { count: 485, total: 1000 },
      { status: 200 }
    );
  }
} 