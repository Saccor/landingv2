import { NextResponse } from 'next/server';
import { MailerLiteService } from '@/services/mailerlite';

export async function GET() {
  try {
    console.log('API Route: Attempting to fetch subscriber count...');
    console.log('Environment check:');
    console.log('- API Key exists:', !!process.env.MAILERLITE_API_KEY);
    console.log('- API Key length:', process.env.MAILERLITE_API_KEY?.length || 0);
    console.log('- Group ID:', process.env.MAILERLITE_GROUP_ID);
    
    const mailerLite = new MailerLiteService();
    const count = await mailerLite.getSubscriberCount();
    
    console.log('Successfully fetched count:', count);
    
    return NextResponse.json(
      { count, total: 1000 },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60', // Cache for 5 minutes
        },
      }
    );
  } catch (error) {
    console.error('Detailed error in subscriber-count API:', error);
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Return fallback count on error
    return NextResponse.json(
      { count: 485, total: 1000 },
      { status: 200 }
    );
  }
} 