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
  const { data, error } = await supabase
    .from('questions')
    .select('id, text, type, order_no, options(value)')
    .eq('survey_id', 'YOUR_SURVEY_ID')
    .order('order_no', { ascending: true });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data as Question[]);
} 