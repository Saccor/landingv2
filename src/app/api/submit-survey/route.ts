import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Define types for the request body
interface SurveyAnswers {
  [key: string]: string | string[] | unknown;
}

interface SurveySubmissionBody {
  answers: SurveyAnswers;
}

// Add the mapping function as provided by the user
function mapAnswersToQuestions(
  rawAnswers: Record<string, string>,
  questions: { id: string; text: string }[]
) {
  // build a lookup map from question-id → question-text
  const qLookup = Object.fromEntries(
    questions.map((q) => [q.id, q.text])
  );

  // for each entry in rawAnswers, replace the key with the text
  const humanAnswers: Record<string, string> = {};
  for (const [qid, val] of Object.entries(rawAnswers)) {
    // skip any "_other" entries if you're handling those specially
    if (qid.endsWith('_other')) continue;

    const questionText = qLookup[qid] ?? qid; 
    humanAnswers[questionText] = val;
  }

  return humanAnswers;
}

// Create admin client with proper error handling
function createSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE;
  
  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  }
  
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE is not set');
  }
  
  console.log('Supabase: ✅ OK');
  return createClient(supabaseUrl, serviceRoleKey);
}

export async function POST(request: NextRequest) {
  let body: SurveySubmissionBody | null = null;
  try {
    // Create Supabase admin client
    const supabaseAdmin = createSupabaseAdmin();
    
    body = await request.json();
    
    // Type guard to ensure body has the correct structure
    if (!body || typeof body !== 'object' || !('answers' in body)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    const { answers } = body as SurveySubmissionBody;

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'Invalid answers data' },
        { status: 400 }
      );
    }

    // 1) lookup survey
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

    // 2) Fetch questions to map UUIDs to human-readable text
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

    // 3) Process answers for clean storage
    const processedAnswers: Record<string, string> = {};
    
    Object.entries(answers).forEach(([key, val]) => {
      if (key.endsWith('_other')) {
        return;
      }
      
      // Skip standalone "Others" entries that are duplicates
      const valStr = Array.isArray(val) ? val.join(' | ') : String(val);
      const isStandaloneOthers = valStr.match(/^Others?:\s*.+$/i) && !valStr.includes('|');
      
      if (isStandaloneOthers) {
        return;
      }
      
      const otherKey = `${key}_other`;
      const hasCustomText = !!answers[otherKey];
      const customText = answers[otherKey] ? String(answers[otherKey]).trim() : '';
      
      if (hasCustomText && customText.length > 0) {
        // Combine "Other" option with custom text
        if (Array.isArray(val)) {
          // For multiple choice: combine "Other" entries with custom text
          const processedArray = val.map(option => {
            const optionLower = option.toLowerCase();
            if (optionLower.includes('other')) {
              return `${option}: ${customText}`;
            }
            return option;
          });
          processedAnswers[key] = processedArray.join(' | ');
        } else {
          // For single choice: if it's an "Other" option, combine with custom text
          const singleVal = String(val);
          const singleValLower = singleVal.toLowerCase();
          if (singleValLower.includes('other')) {
            processedAnswers[key] = `${singleVal}: ${customText}`;
          } else {
            processedAnswers[key] = singleVal;
          }
        }
      } else if (hasCustomText) {
        // Handle case where _other key exists but is empty
        if (Array.isArray(val)) {
          processedAnswers[key] = val.join(' | ');
        } else {
          processedAnswers[key] = String(val);
        }
      } else if (Array.isArray(val)) {
        // Join multiple selections with separator
        processedAnswers[key] = val.join(' | ');
      } else {
        // Single value
        processedAnswers[key] = String(val);
      }
    });

    // 4) Map UUID keys to human-readable question text
    const humanReadableAnswers = mapAnswersToQuestions(processedAnswers, questions || []);

    // 5) Insert response WITH human-readable answers
    const { data: resp, error: respErr } = await supabaseAdmin
      .from('responses')
      .insert({
        survey_id: survey.id,
        submitted_at: new Date().toISOString(),
        answers: humanReadableAnswers
      })
      .select('id')
      .single();
    
    if (respErr) {
      console.error('Supabase: ❌ Response insertion failed');
      throw new Error(`Response insertion failed: ${respErr.message}`);
    }

    console.log(`Supabase: ✅ Survey response saved (ID: ${resp.id})`);
    return NextResponse.json({ response_id: resp.id });

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