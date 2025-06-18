/**
 * Survey question data structure
 */
export interface Question {
  id: string;
  text: string;
  type: string;
  order_no: number;
  question_code: string;
  options: { id: string; value: string; order_no: number }[];
}

/**
 * Survey answer types
 */
export type AnswerValue = string | string[];

/**
 * Survey state management
 */
export interface SurveyState {
  currentView: 'intro' | 'questions';
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, AnswerValue>;
  loading: boolean;
  error: string;
  submitting: boolean;
  submitted: boolean;
}

/**
 * Navigation callback types
 */
export interface NavigationCallbacks {
  onGoToHomepage: () => void;
  onGoToSurvey: () => void;
}

/**
 * Answer callback types
 */
export interface AnswerCallbacks {
  onSelect: (option: string) => void;
  onMultipleSelect: (options: string[]) => void;
  onOpenEndedChange: (value: string) => void;
  onOtherChange: (value: string) => void;
}

/**
 * Question navigation callbacks
 */
export interface QuestionNavigationCallbacks {
  onNext: () => void;
  onPrevious: () => void;
} 