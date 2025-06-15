import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

type Question = {
  id: string;
  text: string;
  type: string;
  order_no: number;
  options: { value: string }[];
};

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('id, text, type, order_no, options(value)')
      // .eq('survey_id', 'YOUR_SURVEY_ID') // Commented out for now
      .order('order_no', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Fetched questions:', data);
    return NextResponse.json(data as Question[]);
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 