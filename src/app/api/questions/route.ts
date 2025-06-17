import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

type Option = {
  id: string;
  value: string;
  order_no: number;
};

type Question = {
  id: string;
  text: string;
  type: string;
  order_no: number;
  question_code: string;
  options: Option[];
};

/**
 * Creates Supabase client for public question access
 */
function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing required Supabase environment variables');
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function GET() {
  try {
    const supabase = createSupabaseClient();
    
    // First, find the active survey
    const { data: survey, error: surveyError } = await supabase
      .from('surveys')
      .select('id')
      .eq('title', 'Arfve Launch Survey')
      .single();

    if (surveyError || !survey) {
      console.error('Supabase: Survey not found:', surveyError);
      return NextResponse.json({ 
        error: 'Survey not found', 
        details: surveyError?.message 
      }, { status: 404 });
    }

    // Fetch questions with their options for the specific survey
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select(`
        id,
        text,
        type,
        order_no,
        question_code,
        options (
          id,
          value,
          order_no
        )
      `)
      .eq('survey_id', survey.id)
      .order('order_no', { ascending: true });

    if (questionsError) {
      console.error('Supabase: Failed to fetch questions:', questionsError);
      return NextResponse.json({ 
        error: 'Failed to fetch questions', 
        details: questionsError.message 
      }, { status: 500 });
    }

    // Transform and sort options within each question
    const transformedQuestions: Question[] = questions?.map(question => ({
      ...question,
      options: (question.options || [])
        .sort((a, b) => (a.order_no || 0) - (b.order_no || 0))
        .map(({ id, value, order_no }) => ({ id, value, order_no }))
    })) || [];
    
    return NextResponse.json(transformedQuestions);
    
  } catch (err) {
    console.error('Questions API: Unexpected error:', err);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
} 