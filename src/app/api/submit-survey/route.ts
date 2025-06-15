import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!   // ← your secret service_role key
);

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

    // 1) lookup survey
    const { data: survey, error: surveyError } = await supabaseAdmin
      .from('surveys')
      .select('id')
      .eq('title', 'Arfve Launch Survey')
      .single();

    if (surveyError || !survey) {
      console.error('Failed to get survey ID:', surveyError);
      return NextResponse.json(
        { error: 'Survey not found', details: surveyError?.message },
        { status: 404 }
      );
    }

    console.log('Found survey ID:', survey.id);

    // 2) insert response (without answers in the response table)
    const { data: resp, error: respErr } = await supabaseAdmin
      .from('responses')
      .insert({
        survey_id: survey.id,
        submitted_at: new Date().toISOString()
      })
      .select('id')
      .single();
    if (respErr) throw respErr;

    console.log('Response created with ID:', resp.id);

    // 3) bulk-insert individual answers into relational table
    // Filter out "_other" entries and process them separately
    const processedAnswers: Record<string, string> = {};
    
    Object.entries(answers).forEach(([key, val]) => {
      if (key.endsWith('_other')) {
        // This is an "other" text input, combine it with the main answer
        const baseQuestionId = key.replace('_other', '');
        const mainAnswer = answers[baseQuestionId];
        
        if (mainAnswer && Array.isArray(mainAnswer) && mainAnswer.includes('Other')) {
          // Replace 'Other' with 'Other: [custom text]'
          const updatedAnswer = mainAnswer.map(option => 
            option === 'Other' ? `Other: ${val}` : option
          );
          processedAnswers[baseQuestionId] = updatedAnswer.join('; ');
        } else if (mainAnswer === 'Other') {
          // Single choice "Other" option
          processedAnswers[baseQuestionId] = `Other: ${val}`;
        }
        // If there's other text but no "Other" selected, ignore the other text
      } else {
        // Regular answer - only add if not already processed above
        if (!processedAnswers[key]) {
          processedAnswers[key] = Array.isArray(val) ? val.join('; ') : val as string;
        }
      }
    });

    const answerRows = Object.entries(processedAnswers).map(([qid, answer]) => ({
      response_id: resp.id,
      question_id: qid,
      answer: answer
    }));

    console.log('Inserting answer rows:', answerRows);

    const { error: answersError } = await supabaseAdmin
      .from('answers')
      .insert(answerRows);

    if (answersError) {
      console.error('Failed to insert answers:', answersError);
      throw new Error(`Answers insertion failed: ${answersError.message}`);
    }

    console.log('All answers inserted successfully');

    return NextResponse.json({ response_id: resp.id });

  } catch (error) {
    console.error('Survey submission error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 