// API endpoints
export const API_ENDPOINTS = {
  QUESTIONS: '/api/questions',
  SUBMIT_SURVEY: '/api/submit-survey',
} as const;

// Survey configuration
export const SURVEY_CONFIG = {
  ESTIMATED_DURATION: 4, // minutes
  PROGRESS_ANIMATION_DURATION: 300, // milliseconds
} as const;

// Layout constants
export const LAYOUT_CONSTANTS = {
  MAX_WIDTH_MOBILE: '321px',
  MAX_WIDTH_DESKTOP: '960px',
  PROGRESS_BAR_MAX_WIDTH: '768px',
  BREADCRUMB_MAX_WIDTH: '1270px',
} as const; 