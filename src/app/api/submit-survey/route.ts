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

    // Get the survey ID dynamically from the surveys table
    const { data: surveyData, error: surveyError } = await supabase
      .from('surveys')
      .select('id')
      .eq('title', 'Arfve Launch Survey')
      .single();

    if (surveyError || !surveyData) {
      console.error('Failed to get survey ID:', surveyError);
      return NextResponse.json(
        { error: 'Survey not found', details: surveyError?.message },
        { status: 404 }
      );
    }

    console.log('Found survey ID:', surveyData.id);

    // Insert the survey response
    const insertData = {
      survey_id: surveyData.id,
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