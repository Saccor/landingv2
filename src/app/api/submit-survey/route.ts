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
  rawAnswers: Record<string, any>,
  questions: { id: string; text: string }[]
) {
  // build a lookup map from question-id → question-text
  const qLookup = Object.fromEntries(
    questions.map((q) => [q.id, q.text])
  );

  // for each entry in rawAnswers, replace the key with the text
  const humanAnswers: Record<string, any> = {};
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
  
  console.log('Environment check:');
  console.log('- SUPABASE_URL exists:', !!supabaseUrl);
  console.log('- SERVICE_ROLE exists:', !!serviceRoleKey);
  
  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  }
  
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE is not set');
  }
  
  return createClient(supabaseUrl, serviceRoleKey);
}

export async function POST(request: NextRequest) {
  let body: SurveySubmissionBody | null = null;
  try {
    console.log('=== Survey Submission Started ===');
    
    // Create Supabase admin client
    const supabaseAdmin = createSupabaseAdmin();
    console.log('✅ Supabase admin client created successfully');
    
    body = await request.json();
    console.log('✅ Request body parsed successfully:', body);
    
    // Type guard to ensure body has the correct structure
    if (!body || typeof body !== 'object' || !('answers' in body)) {
      console.log('❌ Invalid request body structure:', body);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    const { answers } = body as SurveySubmissionBody;
    console.log('✅ Answers extracted:', answers);

    if (!answers || typeof answers !== 'object') {
      console.log('❌ Invalid answers data:', answers);
      return NextResponse.json(
        { error: 'Invalid answers data' },
        { status: 400 }
      );
    }

    console.log('✅ Answers validation passed');
    console.log('✅ About to start database operations...');

    // 1) lookup survey
    console.log('🔍 Step 1: Looking up survey...');
    
    // Test Supabase connection first
    try {
      console.log('🔗 Testing Supabase connection...');
      const testResult = await supabaseAdmin.from('surveys').select('count').limit(1);
      console.log('🔗 Supabase test result:', testResult);
    } catch (connectionError) {
      console.error('❌ Supabase connection failed:', connectionError);
      throw new Error(`Supabase connection failed: ${connectionError}`);
    }
    
    console.log('🔍 Now performing actual survey lookup...');
    const { data: survey, error: surveyError } = await supabaseAdmin
      .from('surveys')
      .select('id')
      .eq('title', 'Arfve Launch Survey')
      .single();

    console.log('Survey lookup result:', { survey, surveyError });

    if (surveyError || !survey) {
      console.error('Failed to get survey ID:', surveyError);
      return NextResponse.json(
        { error: 'Survey not found', details: surveyError?.message },
        { status: 404 }
      );
    }

    console.log('Found survey ID:', survey.id);

    // 2) Fetch questions to map UUIDs to human-readable text
    console.log('🔍 Step 2: Fetching questions for mapping...');
    const { data: questions, error: questionsError } = await supabaseAdmin
      .from('questions')
      .select('id, text')
      .eq('survey_id', survey.id);

    if (questionsError) {
      console.error('Failed to fetch questions:', questionsError);
      return NextResponse.json(
        { error: 'Failed to fetch questions', details: questionsError.message },
        { status: 500 }
      );
    }

    console.log('✅ Fetched questions for mapping:', questions);

    // 3) Process answers for clean storage
    console.log('🔍 Step 3: Processing answers...');
    console.log('Raw answers received:', JSON.stringify(answers, null, 2));
    const processedAnswers: Record<string, string> = {};
    
    Object.entries(answers).forEach(([key, val]) => {
      // Special debugging for the problematic UUID
      if (key === '3629963b-0e7d-4ee6-9bd0-6dfb957dcc77') {
        console.log(`🔍 DEBUGGING PROBLEMATIC UUID: ${key}`);
        console.log(`Value: ${JSON.stringify(val)}`);
        console.log(`Has _other key: ${key}_other = ${answers[`${key}_other`]}`);
        console.log(`All keys containing this UUID:`, Object.keys(answers).filter(k => k.includes(key)));
      }
      
      if (key.endsWith('_other')) {
        // Skip "_other" keys, they'll be handled below
        console.log(`Skipping _other key: ${key}`);
        return;
      }
      
      // Skip standalone "Others" entries that are duplicates
      const valStr = Array.isArray(val) ? val.join(' | ') : String(val);
      const isStandaloneOthers = valStr.match(/^Others?:\s*.+$/i) && !valStr.includes('|');
      
      if (isStandaloneOthers) {
        console.log(`🚫 Skipping standalone "Others" entry: ${key} = ${valStr}`);
        return;
      }
      
      const otherKey = `${key}_other`;
      const hasCustomText = !!answers[otherKey];
      const customText = answers[otherKey] ? String(answers[otherKey]).trim() : '';
      
      if (hasCustomText && customText.length > 0) {
        console.log(`Processing question with "other" text: ${key}`);
        console.log(`Original value: ${JSON.stringify(val)}`);
        console.log(`Custom text: ${customText}`);
        
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
          console.log(`Processed array result: ${processedAnswers[key]}`);
        } else {
          // For single choice: if it's an "Other" option, combine with custom text
          const singleVal = String(val);
          const singleValLower = singleVal.toLowerCase();
          if (singleValLower.includes('other')) {
            processedAnswers[key] = `${singleVal}: ${customText}`;
            console.log(`Combined "other" with custom text: ${processedAnswers[key]}`);
          } else {
            processedAnswers[key] = singleVal;
            console.log(`Kept original value: ${processedAnswers[key]}`);
          }
        }
      } else if (hasCustomText) {
        // Handle case where _other key exists but is empty
        console.log(`Found empty custom text for question: ${key}`);
        console.log(`Original value: ${JSON.stringify(val)}`);
        
        if (Array.isArray(val)) {
          processedAnswers[key] = val.join(' | ');
        } else {
          processedAnswers[key] = String(val);
        }
        console.log(`Stored without custom text: ${processedAnswers[key]}`);
      } else if (Array.isArray(val)) {
        // Join multiple selections with separator
        processedAnswers[key] = val.join(' | ');
      } else {
        // Single value
        processedAnswers[key] = String(val);
      }
    });

    console.log('Processed answers (still with UUIDs):', JSON.stringify(processedAnswers, null, 2));

    // 4) Map UUID keys to human-readable question text
    console.log('🔍 Step 4: Mapping UUIDs to human-readable questions...');
    const humanReadableAnswers = mapAnswersToQuestions(processedAnswers, questions || []);
    console.log('✅ Human-readable answers:', JSON.stringify(humanReadableAnswers, null, 2));

    // 5) Insert response WITH human-readable answers
    console.log('🔍 Step 5: Inserting response with human-readable answers...');
    const { data: resp, error: respErr } = await supabaseAdmin
      .from('responses')
      .insert({
        survey_id: survey.id,
        submitted_at: new Date().toISOString(),
        answers: humanReadableAnswers
      })
      .select('id')
      .single();
    
    console.log('Response insert result:', { resp, respErr });
    
    if (respErr) {
      console.error('Response insertion failed:', respErr);
      throw new Error(`Response insertion failed: ${respErr.message}`);
    }

    console.log('Response and answers stored successfully with ID:', resp.id);

    return NextResponse.json({ response_id: resp.id });

  } catch (error) {
    console.error('=== Survey submission error ===');
    console.error('Error:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Request body was:', body);
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 