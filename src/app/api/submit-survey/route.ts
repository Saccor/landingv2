import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Survey Submission Started ===');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { answers } = body;

    if (!answers || typeof answers !== 'object') {
      console.log('Invalid answers data:', answers);
      return NextResponse.json(
        { error: 'Invalid answers data' },
        { status: 400 }
      );
    }

    console.log('Answers to submit:', answers);
    console.log('Supabase client initialized:', !!supabase);

    // Test Supabase connection first
    const { data: testData, error: testError } = await supabase
      .from('responses')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('Supabase connection test failed:', testError);
      return NextResponse.json(
        { error: 'Database connection failed', details: testError.message },
        { status: 500 }
      );
    }

    console.log('Supabase connection test passed');

    // Insert the survey response
    const insertData = {
      survey_id: '550e8400-e29b-41d4-a716-446655440000', // Fixed UUID for Arfve survey
      answers: answers,
      submitted_at: new Date().toISOString()
    };

    console.log('Data to insert:', insertData);

    const { data, error } = await supabase
      .from('responses')
      .insert([insertData])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Failed to submit survey', details: error.message, code: error.code },
        { status: 500 }
      );
    }

    console.log('Insert successful:', data);

    return NextResponse.json(
      { 
        message: 'Survey submitted successfully',
        response_id: data[0]?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Survey submission error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 