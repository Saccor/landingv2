import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Type definitions
interface Question {
  id: string;
  text: string;
}

interface SurveyAnswers {
  [key: string]: string | string[] | unknown;
}

interface SurveySubmissionBody {
  answers: SurveyAnswers;
}

interface ProcessedAnswers {
  [questionText: string]: string;
}

/**
 * Maps raw answer UUIDs to human-readable question text
 */
function mapAnswersToQuestions(
  rawAnswers: Record<string, string>,
  questions: Question[]
): ProcessedAnswers {
  const questionLookup = Object.fromEntries(
    questions.map((q) => [q.id, q.text])
  );

  const humanReadableAnswers: ProcessedAnswers = {};
  
  for (const [questionId, answer] of Object.entries(rawAnswers)) {
    if (questionId.endsWith('_other')) continue;
    
    const questionText = questionLookup[questionId] ?? questionId;
    humanReadableAnswers[questionText] = answer;
  }

  return humanReadableAnswers;
}

/**
 * Creates Supabase admin client with environment validation
 */
function createSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE;
  
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing required Supabase environment variables');
  }
  
  console.log('Supabase: ✅ OK');
  return createClient(supabaseUrl, serviceRoleKey);
}

/**
 * Processes raw survey answers, handling "Other" options and multiple selections
 */
function processAnswers(answers: SurveyAnswers): Record<string, string> {
  const processed: Record<string, string> = {};
  
  Object.entries(answers).forEach(([key, value]) => {
    // Skip _other suffix keys (processed separately)
    if (key.endsWith('_other')) return;
    
    const valueString = Array.isArray(value) ? value.join(' | ') : String(value);
    
    // Skip standalone "Others:" entries that are duplicates
    const isStandaloneOther = valueString.match(/^Others?:\s*.+$/i) && !valueString.includes('|');
    if (isStandaloneOther) return;
    
    // Handle custom "Other" text
    const otherKey = `${key}_other`;
    const customText = answers[otherKey] ? String(answers[otherKey]).trim() : '';
    const hasCustomText = customText.length > 0;
    
    if (hasCustomText) {
      processed[key] = processAnswerWithCustomText(value, customText);
    } else if (Array.isArray(value)) {
      processed[key] = value.join(' | ');
    } else {
      processed[key] = String(value);
    }
  });

  return processed;
}

/**
 * Combines "Other" options with custom text
 */
function processAnswerWithCustomText(value: string | string[] | unknown, customText: string): string {
  if (Array.isArray(value)) {
    const processedArray = value.map(option => {
      const optionLower = option.toLowerCase();
      return optionLower.includes('other') ? `${option}: ${customText}` : option;
    });
    return processedArray.join(' | ');
  }
  
  const singleValue = String(value);
  const isOtherOption = singleValue.toLowerCase().includes('other');
  return isOtherOption ? `${singleValue}: ${customText}` : singleValue;
}

/**
 * Validates request body structure
 */
function validateRequestBody(body: unknown): body is SurveySubmissionBody {
  return (
    body !== null &&
    typeof body === 'object' &&
    'answers' in body &&
    typeof (body as Record<string, unknown>).answers === 'object'
  );
}

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = createSupabaseAdmin();
    const body = await request.json();
    
    // Validate request structure
    if (!validateRequestBody(body)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    const { answers } = body;

    // Find survey
    const { data: survey, error: surveyError } = await supabaseAdmin
      .from('surveys')
      .select('id')
      .eq('title', 'Arfve Launch Survey')
      .single();

    if (surveyError || !survey) {
      console.error('Supabase: ❌ Survey not found');
      return NextResponse.json(
        { error: 'Survey not found', details: surveyError?.message },
        { status: 404 }
      );
    }

    // Fetch questions for mapping
    const { data: questions, error: questionsError } = await supabaseAdmin
      .from('questions')
      .select('id, text')
      .eq('survey_id', survey.id);

    if (questionsError) {
      console.error('Supabase: ❌ Failed to fetch questions');
      return NextResponse.json(
        { error: 'Failed to fetch questions', details: questionsError.message },
        { status: 500 }
      );
    }

    // Process and map answers
    const processedAnswers = processAnswers(answers);
    const humanReadableAnswers = mapAnswersToQuestions(processedAnswers, questions || []);

    // Insert response
    const { data: response, error: insertError } = await supabaseAdmin
      .from('responses')
      .insert({
        survey_id: survey.id,
        submitted_at: new Date().toISOString(),
        answers: humanReadableAnswers
      })
      .select('id')
      .single();
    
    if (insertError || !response) {
      console.error('Supabase: ❌ Response insertion failed');
      throw new Error(`Response insertion failed: ${insertError?.message}`);
    }

    console.log(`Supabase: ✅ Survey response saved (ID: ${response.id})`);
    return NextResponse.json({ response_id: response.id });

  } catch (error) {
    console.error('API: ❌ Survey submission failed');
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 