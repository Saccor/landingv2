import { NextRequest, NextResponse } from 'next/server';
import { MailerLiteService } from '@/services/mailerlite';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const mailerLite = new MailerLiteService();
    const result = await mailerLite.subscribe({ email, name });

    return NextResponse.json(
      { message: 'Successfully subscribed!', data: result },
      { status: 200 }
    );
  } catch (error) {
    // Return appropriate error response based on error type
    if (error instanceof Error) {
      if (error.message.includes('API key not configured')) {
        return NextResponse.json(
          { error: 'Service temporarily unavailable' },
          { status: 503 }
        );
      }
      
      if (error.message.includes('400') || error.message.includes('422')) {
        return NextResponse.json(
          { error: 'Invalid request. Please check your email address.' },
          { status: 400 }
        );
      }
      
      if (error.message.includes('401') || error.message.includes('403')) {
        return NextResponse.json(
          { error: 'Service configuration error. Please try again later.' },
          { status: 503 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
} 