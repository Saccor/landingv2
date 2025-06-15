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

    // 3) First, build options lookup table
    const { data: optionsData, error: optionsError } = await supabaseAdmin
      .from('options')
      .select('id, question_id, value');

    if (optionsError) {
      console.error('Failed to fetch options:', optionsError);
      throw new Error(`Options fetch failed: ${optionsError.message}`);
    }

    // Group options by question_id for easy lookup
    const optionsLookup: Record<string, Array<{id: string, value: string}>> = {};
    optionsData?.forEach(option => {
      if (!optionsLookup[option.question_id]) {
        optionsLookup[option.question_id] = [];
      }
      optionsLookup[option.question_id].push({
        id: option.id,
        value: option.value
      });
    });

    console.log('Options lookup built:', optionsLookup);

    // 4) Build answer rows with option_id and answer_text
    const rows = Object.entries(answers)
      .filter(([qid]) => !qid.endsWith('_other'))
      .flatMap(([qid, val]) => {
        const otherKey = `${qid}_other`;
        const hasCustom = !!answers[otherKey];

        // single‐choice or multi‐choice
        if (Array.isArray(val)) {
          return val.map(optValue => {
            // find the matching option_id from your options table
            const option = optionsLookup[qid]?.find(o => o.value === optValue);
            if (!option) {
              console.warn(`Option not found for question ${qid}, value: ${optValue}`);
              return null;
            }
            return {
              response_id: resp.id,
              question_id: qid,
              option_id: option.id,
              answer_text: hasCustom ? answers[otherKey] : null
            };
          }).filter(Boolean); // Remove null entries
        } else {
          // single‐choice
          const option = optionsLookup[qid]?.find(o => o.value === val);
          if (!option) {
            console.warn(`Option not found for question ${qid}, value: ${val}`);
            return [];
          }
          return {
            response_id: resp.id,
            question_id: qid,
            option_id: option.id,
            answer_text: hasCustom ? answers[otherKey] : null
          };
        }
      });

    console.log('Inserting answer rows:', rows);

    const { error: answersErr } = await supabaseAdmin
      .from('answers')
      .insert(rows);
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