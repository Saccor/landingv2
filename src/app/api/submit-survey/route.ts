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
    const answerRows = Object.entries(answers)
      // only process real question IDs (skip the "…_other" entries)
      .filter(([qid]) => !qid.endsWith('_other'))
      .map(([qid, val]) => {
        const otherKey = `${qid}_other`;
        // if there's a custom-text entry, use that instead of the placeholder
        const hasCustom = answers.hasOwnProperty(otherKey);
        let answerValue: string;

        if (hasCustom) {
          answerValue = String(answers[otherKey]);
        } else if (Array.isArray(val)) {
          answerValue = val.join('; ');
        } else {
          answerValue = String(val);
        }

        return {
          response_id: resp.id,
          question_id: qid,
          answer: answerValue,
        };
      });

    console.log('Inserting answer rows:', answerRows);

    // then insert:
    const { error: answersErr } = await supabaseAdmin
      .from('answers')
      .insert(answerRows);
    if (answersErr) throw answersErr;

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