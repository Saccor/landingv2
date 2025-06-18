import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    hasApiKey: !!process.env.MAILERLITE_API_KEY,
    hasDefaultGroupId: !!process.env.MAILERLITE_GROUP_ID,
    hasSurveyGroupId: !!process.env.MAILERLITE_SURVEY_GROUP_ID,
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    environment: process.env.NODE_ENV || 'development',
    // Show last 4 characters of IDs for debugging (safely)
    defaultGroupIdSuffix: process.env.MAILERLITE_GROUP_ID?.slice(-4) || 'NOT SET',
    surveyGroupIdSuffix: process.env.MAILERLITE_SURVEY_GROUP_ID?.slice(-4) || 'NOT SET',
  };

  return NextResponse.json(config);
} 