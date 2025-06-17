import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Creates Supabase admin client with environment validation
 */
function createSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE;
  
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing required Supabase environment variables');
  }
  
  return createClient(supabaseUrl, serviceRoleKey);
}

/**
 * Type for survey result row from the database view
 */
interface SurveyResultRow {
  [key: string]: string | number | null;
}

/**
 * Converts survey data to CSV format
 */
function convertToCSV(data: SurveyResultRow[]): string {
  if (data.length === 0) return '';
  
  // Get headers from first row
  const headers = Object.keys(data[0]);
  
  // Create CSV string
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header] || '';
        // Escape commas and quotes in values
        const stringValue = String(value);
        const escapedValue = stringValue.replace(/"/g, '""');
        return stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n') 
          ? `"${escapedValue}"` 
          : escapedValue;
      }).join(',')
    )
  ];
  
  return csvRows.join('\n');
}

export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = createSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json'; // 'json' or 'csv'
    
    // Query the marketing export view
    const { data, error } = await supabaseAdmin
      .from('v_survey_results_csv')
      .select('*')
      .order('ID');

    if (error) {
      console.error('Supabase: Failed to fetch survey results');
      return NextResponse.json(
        { error: 'Failed to fetch survey results', details: error.message },
        { status: 500 }
      );
    }

    if (format === 'csv') {
      // Return CSV format
      const csvData = convertToCSV(data || []);
      
      return new NextResponse(csvData, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="arfve-survey-results.csv"'
        }
      });
    } else {
      // Return JSON format
      return NextResponse.json({
        total_responses: data?.length || 0,
        data: data || []
      });
    }

  } catch (error) {
    console.error('API: Survey export failed');
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Allow GET requests from browser for CSV download
export const dynamic = 'force-dynamic'; 