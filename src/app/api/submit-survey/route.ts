import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Type definitions
interface Question {
  id: string;
  text: string;
  question_code: string;
  type: string;
}

interface Option {
  id: string;
  value: string;
}

interface SurveyAnswers {
  [key: string]: string | string[] | unknown;
}

interface SurveySubmissionBody {
  answers: SurveyAnswers;
}

interface AnswerInsert {
  response_id: string;
  question_id: string;
  option_id?: string;
  answer_text?: string;
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
 * Processes raw survey answers into individual answer records
 */
function processAnswersForInsert(
  answers: SurveyAnswers, 
  questions: Question[], 
  questionOptions: Record<string, Option[]>
): AnswerInsert[] {
  const answerInserts: AnswerInsert[] = [];
  
  // Create lookup maps
  const questionLookup = Object.fromEntries(
    questions.map(q => [q.id, q])
  );
  
  Object.entries(answers).forEach(([questionId, value]) => {
    // Skip _other suffix keys (processed separately)
    if (questionId.endsWith('_other')) return;
    
    const question = questionLookup[questionId];
    if (!question) return;
    
    const otherKey = `${questionId}_other`;
    const customText = answers[otherKey] ? String(answers[otherKey]).trim() : '';
    const options = questionOptions[questionId] || [];
    
    console.log(`Processing question ${question.question_code}:`, {
      questionId,
      value,
      customText,
      optionsCount: options.length
    });
    
    if (question.type === 'open-ended') {
      // Open-ended questions: store as answer_text
      answerInserts.push({
        response_id: '', // Will be filled later
        question_id: questionId,
        answer_text: String(value)
      });
    } else if (Array.isArray(value)) {
      // Multiple choice: create separate records for each selection
      console.log(`Multiple choice answers for ${question.question_code}:`, value);
      value.forEach(selectedValue => {
        const option = options.find(opt => opt.value === selectedValue);
        if (option) {
          // Check if this is an "Other" option with custom text
          const isOtherOption = selectedValue.toLowerCase().includes('other');
          const answerRecord = {
            response_id: '', // Will be filled later
            question_id: questionId,
            option_id: option.id,
            answer_text: isOtherOption && customText ? customText : undefined
          };
          console.log(`Adding answer record:`, answerRecord);
          answerInserts.push(answerRecord);
        } else {
          console.log(`No option found for value: "${selectedValue}"`);
        }
      });
    } else {
      // Single choice: find matching option
      const selectedValue = String(value);
      const option = options.find(opt => opt.value === selectedValue);
      if (option) {
        const isOtherOption = selectedValue.toLowerCase().includes('other');
        answerInserts.push({
          response_id: '', // Will be filled later
          question_id: questionId,
          option_id: option.id,
          answer_text: isOtherOption && customText ? customText : undefined
        });
      }
    }
  });

  return answerInserts;
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

    // Fetch questions with their options
    const { data: questions, error: questionsError } = await supabaseAdmin
      .from('questions')
      .select(`
        id, 
        text, 
        question_code, 
        type,
        options (
          id,
          value
        )
      `)
      .eq('survey_id', survey.id)
      .order('order_no');

    if (questionsError) {
      console.error('Supabase: ❌ Failed to fetch questions');
      return NextResponse.json(
        { error: 'Failed to fetch questions', details: questionsError.message },
        { status: 500 }
      );
    }

    // Create options lookup
    const questionOptions: Record<string, Option[]> = {};
    questions?.forEach(question => {
      questionOptions[question.id] = question.options || [];
    });

    // Extract email from answers (if provided)
    const emailQuestion = questions?.find(q => q.question_code === 'Q18');
    const email = emailQuestion ? answers[emailQuestion.id] as string : null;

    // Insert response record
    const { data: response, error: insertError } = await supabaseAdmin
      .from('responses')
      .insert({
        survey_id: survey.id,
        submitted_at: new Date().toISOString(),
        email: email || null
      })
      .select('id')
      .single();
    
    if (insertError || !response) {
      console.error('Supabase: ❌ Response insertion failed');
      throw new Error(`Response insertion failed: ${insertError?.message}`);
    }

    // Process answers for individual inserts
    const answerInserts = processAnswersForInsert(answers, questions || [], questionOptions);
    
    // Fill in response_id for all answer inserts
    const answersToInsert = answerInserts.map(answer => ({
      ...answer,
      response_id: response.id
    }));

    console.log(`Total answers to insert: ${answersToInsert.length}`);
    console.log('Answers to insert:', JSON.stringify(answersToInsert, null, 2));

    // Bulk insert answers
    if (answersToInsert.length > 0) {
      const { error: answersError } = await supabaseAdmin
        .from('answers')
        .insert(answersToInsert);

      if (answersError) {
        console.error('Supabase: ❌ Answers insertion failed');
        throw new Error(`Answers insertion failed: ${answersError.message}`);
      }
    }

    console.log(`Supabase: ✅ Survey response saved (ID: ${response.id}, ${answersToInsert.length} answers)`);
    return NextResponse.json({ 
      response_id: response.id,
      answers_count: answersToInsert.length
    });

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