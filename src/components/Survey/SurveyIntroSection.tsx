'use client';

import { Home } from 'lucide-react';
import { useState, useCallback } from 'react';
import SingleChoiceScreen from './Questions/SingleChoiceScreen';
import MultipleChoiceScreen from './Questions/MultipleChoiceScreen';
import LikertScaleScreen from './Questions/LikertScaleScreen';
import OpenEndedScreen from './Questions/OpenEndedScreen';

/**
 * Survey question data structure
 */
interface Question {
  id: string;
  text: string;
  type: string;
  order_no: number;
  options: { value: string }[];
}

/**
 * Survey answer types
 */
type AnswerValue = string | string[];

/**
 * Survey state management
 */
interface SurveyState {
  currentView: 'intro' | 'questions';
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, AnswerValue>;
  loading: boolean;
  error: string;
  submitting: boolean;
  submitted: boolean;
}



// Constants
const API_ENDPOINTS = {
  QUESTIONS: '/api/questions',
  SUBMIT_SURVEY: '/api/submit-survey',
} as const;

const SURVEY_CONFIG = {
  ESTIMATED_DURATION: 4, // minutes
  PROGRESS_ANIMATION_DURATION: 300, // milliseconds
} as const;

const LAYOUT_CONSTANTS = {
  MAX_WIDTH_MOBILE: '321px',
  MAX_WIDTH_DESKTOP: '960px',
  PROGRESS_BAR_MAX_WIDTH: '768px',
  BREADCRUMB_MAX_WIDTH: '1270px',
} as const;

const INITIAL_STATE: SurveyState = {
  currentView: 'intro',
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  loading: false,
  error: '',
  submitting: false,
  submitted: false,
};

/**
 * Main survey component with intro, questions, and completion screens
 * 
 * Features:
 * - Multi-step survey with progress tracking
 * - Support for multiple question types (single, multiple, likert, open-ended)
 * - State management for answers and navigation
 * - Error handling and loading states
 * - Success screen with completion message
 * - Breadcrumb navigation
 */
export default function SurveyIntroSection() {
  const [state, setState] = useState<SurveyState>(INITIAL_STATE);

  /**
   * Navigate to homepage
   */
  const handleGoToHomepage = useCallback(() => {
    window.location.href = '/';
  }, []);

  /**
   * Reset survey to intro state
   */
  const handleGoToSurvey = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentView: 'intro',
      currentQuestionIndex: 0,
      answers: {},
      error: '',
      submitted: false,
    }));
  }, []);

  /**
   * Fetch questions from API
   */
  const fetchQuestions = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: '' }));

    try {
      console.log('SurveyIntroSection: 🔄 Fetching questions from API');
      const response = await fetch(API_ENDPOINTS.QUESTIONS);
      
      if (response.ok) {
        const data = await response.json();
        console.log('SurveyIntroSection: ✅ Questions fetched successfully', { count: data?.length });
        
        if (data && data.length > 0) {
          setState(prev => ({
            ...prev,
            questions: data,
            currentView: 'questions',
            loading: false,
          }));
        } else {
          setState(prev => ({
            ...prev,
            error: 'No questions found in the database',
            loading: false,
          }));
        }
      } else {
        const errorData = await response.json();
        console.error('SurveyIntroSection: ❌ API error', errorData);
        setState(prev => ({
          ...prev,
          error: `Failed to fetch questions: ${errorData.error || response.statusText}`,
          loading: false,
        }));
      }
    } catch (error) {
      console.error('SurveyIntroSection: ❌ Network error', error);
      setState(prev => ({
        ...prev,
        error: 'Network error: Unable to connect to the server',
        loading: false,
      }));
    }
  }, []);

  /**
   * Handle survey start
   */
  const handleStartSurvey = useCallback(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  /**
   * Handle single choice selection
   */
  const handleSelect = useCallback((selectedOption: string) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: selectedOption,
      },
    }));
  }, [state.questions, state.currentQuestionIndex]);

  /**
   * Handle multiple choice selection
   */
  const handleMultipleSelect = useCallback((selectedOptions: string[]) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: selectedOptions,
      },
    }));
  }, [state.questions, state.currentQuestionIndex]);

  /**
   * Handle open-ended response change
   */
  const handleOpenEndedChange = useCallback((value: string) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: value,
      },
    }));
  }, [state.questions, state.currentQuestionIndex]);

  /**
   * Handle "other" option input change
   */
  const handleOtherChange = useCallback((value: string) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [`${currentQuestion.id}_other`]: value,
      },
    }));
  }, [state.questions, state.currentQuestionIndex]);

  /**
   * Submit survey to API
   */
  const submitSurvey = useCallback(async () => {
    setState(prev => ({ ...prev, submitting: true, error: '' }));
    
    try {
      console.log('SurveyIntroSection: 🔄 Submitting survey', { answerCount: Object.keys(state.answers).length });
      const response = await fetch(API_ENDPOINTS.SUBMIT_SURVEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: state.answers }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('SurveyIntroSection: ✅ Survey submitted successfully', data);
        setState(prev => ({ ...prev, submitted: true, submitting: false }));
      } else {
        const errorData = await response.json();
        console.error('SurveyIntroSection: ❌ Submission error', errorData);
        setState(prev => ({
          ...prev,
          error: `Failed to submit survey: ${errorData.details || errorData.error || 'Unknown error'}`,
          submitting: false,
        }));
      }
    } catch (error) {
      console.error('SurveyIntroSection: ❌ Network error during submission', error);
      setState(prev => ({
        ...prev,
        error: `Network error: ${error instanceof Error ? error.message : 'Unable to submit survey'}`,
        submitting: false,
      }));
    }
  }, [state.answers]);

  /**
   * Navigate to next question or submit survey
   */
  const handleNext = useCallback(() => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
    } else {
      // Survey completed - submit to API
      submitSurvey();
    }
  }, [state.currentQuestionIndex, state.questions.length, submitSurvey]);

  /**
   * Navigate to previous question or intro
   */
  const handlePrevious = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }));
    } else {
      // Go back to intro section when on first question
      setState(prev => ({ ...prev, currentView: 'intro' }));
    }
  }, [state.currentQuestionIndex]);

  // Show success screen after submission
  if (state.submitted) {
    return <SuccessScreen onGoToHomepage={handleGoToHomepage} onGoToSurvey={handleGoToSurvey} />;
  }

  // Show questions screen
  if (state.currentView === 'questions' && state.questions.length > 0) {
    return (
      <QuestionsScreen
        state={state}
        onGoToHomepage={handleGoToHomepage}
        onGoToSurvey={handleGoToSurvey}
        onSelect={handleSelect}
        onMultipleSelect={handleMultipleSelect}
        onOpenEndedChange={handleOpenEndedChange}
        onOtherChange={handleOtherChange}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    );
  }

  // Show intro screen (default)
  return (
    <IntroScreen
      state={state}
      onGoToHomepage={handleGoToHomepage}
      onGoToSurvey={handleGoToSurvey}
      onStartSurvey={handleStartSurvey}
    />
  );
}

/**
 * Breadcrumb navigation component
 */
function Breadcrumb({
  onGoToHomepage,
  onGoToSurvey,
}: {
  onGoToHomepage: () => void;
  onGoToSurvey: () => void;
}) {
  return (
    <div className="w-full px-4 mb-6 lg:px-6 lg:pt-10 lg:mb-6">
      <div className={`lg:max-w-[${LAYOUT_CONSTANTS.BREADCRUMB_MAX_WIDTH}] lg:mx-auto flex items-center gap-2 text-sm text-white`}>
        <Home size={18} className="lg:w-4 lg:h-4" />
        <span className="font-semibold underline cursor-pointer" onClick={onGoToHomepage}>
          Homepage
        </span>
        <span className="text-lg">›</span>
        <span className="text-white/80 lg:text-white cursor-pointer hover:text-white" onClick={onGoToSurvey}>
          Survey
        </span>
      </div>
    </div>
  );
}

/**
 * Progress bar component for questions screen
 */
function ProgressBar({ progressPercentage }: { progressPercentage: number }) {
  return (
    <div className="w-full px-4 lg:px-6 mb-6 mt-6">
      <div className="w-[305px] lg:max-w-[768px] lg:w-full mx-auto flex items-center gap-4">
        {/* Percentage Text */}
        <div className="w-[40px] h-[20px] flex items-center justify-start">
          <span className="font-montserrat font-medium text-sm text-white">
            {progressPercentage}%
          </span>
        </div>

        {/* Progress Line */}
        <div className="flex-1 h-[2px] bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-white transition-all duration-${SURVEY_CONFIG.PROGRESS_ANIMATION_DURATION} ease-out`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Error display component
 */
function ErrorDisplay({ error }: { error: string }) {
  if (!error) return null;

  return (
    <div className="w-full px-4 lg:px-6 mb-4">
      <div className="max-w-[329px] mx-auto p-4 bg-red-900/20 border border-red-500 rounded text-red-300 text-sm">
        {error}
      </div>
    </div>
  );
}

/**
 * Loading overlay component
 */
function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1F2429] p-6 rounded-lg text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white font-montserrat">Submitting your survey...</p>
      </div>
    </div>
  );
}

/**
 * Success screen after survey completion
 */
function SuccessScreen({
  onGoToHomepage,
  onGoToSurvey,
}: {
  onGoToHomepage: () => void;
  onGoToSurvey: () => void;
}) {
  return (
    <div className="flex flex-col bg-black text-white pb-8">
      <Breadcrumb onGoToHomepage={onGoToHomepage} onGoToSurvey={onGoToSurvey} />
      
      {/* Success Content */}
      <div className="px-4 lg:px-6">
        <div className={`w-full max-w-[${LAYOUT_CONSTANTS.MAX_WIDTH_MOBILE}] mx-auto lg:max-w-[${LAYOUT_CONSTANTS.MAX_WIDTH_DESKTOP}] lg:mt-12 lg:pb-16`}>
          <div className="font-montserrat lg:space-y-6 text-center">
            <h1 className="font-bold text-xl mb-4 lg:mb-0 lg:text-xl lg:font-semibold">Thank You!</h1>
            <p className="font-bold mb-2 lg:mb-0 lg:font-semibold">Your survey has been submitted successfully.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">We appreciate you taking the time to help us shape the future of Arfve.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">Keep an eye on your email for exclusive updates and your chance to win Legacy 1 Earbuds!</p>
            
            <div className="flex justify-center lg:mt-8">
              <button 
                onClick={onGoToHomepage}
                className="bg-white text-black rounded-full px-8 py-2 font-semibold text-base shadow-sm hover:bg-gray-100 transition lg:px-6 lg:py-2 lg:hover:opacity-90 lg:shadow-none"
              >
                Back to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Questions screen with progress and question rendering
 */
function QuestionsScreen({
  state,
  onGoToHomepage,
  onGoToSurvey,
  onSelect,
  onMultipleSelect,
  onOpenEndedChange,
  onOtherChange,
  onNext,
  onPrevious,
}: {
  state: SurveyState;
  onGoToHomepage: () => void;
  onGoToSurvey: () => void;
  onSelect: (option: string) => void;
  onMultipleSelect: (options: string[]) => void;
  onOpenEndedChange: (value: string) => void;
  onOtherChange: (value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const currentAnswer = state.answers[currentQuestion.id] || null;
  const progressPercentage = Math.round(((state.currentQuestionIndex + 1) / state.questions.length) * 100);
  
  return (
    <div className="flex flex-col bg-black text-white">
      <Breadcrumb onGoToHomepage={onGoToHomepage} onGoToSurvey={onGoToSurvey} />
      <ProgressBar progressPercentage={progressPercentage} />
      <ErrorDisplay error={state.error} />

      {/* Question Content */}
      <div className="w-full px-4 lg:px-6">
        <QuestionRenderer
          currentQuestion={currentQuestion}
          currentAnswer={currentAnswer}
          questionNumber={state.currentQuestionIndex + 1}
          isLastQuestion={state.currentQuestionIndex === state.questions.length - 1}
          answers={state.answers}
          submitting={state.submitting}
          onSelect={onSelect}
          onMultipleSelect={onMultipleSelect}
          onOpenEndedChange={onOpenEndedChange}
          onOtherChange={onOtherChange}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      </div>

      {/* Submitting Overlay */}
      {state.submitting && <LoadingOverlay />}
    </div>
  );
}

/**
 * Intro screen with survey description and start button
 */
function IntroScreen({
  state,
  onGoToHomepage,
  onGoToSurvey,
  onStartSurvey,
}: {
  state: SurveyState;
  onGoToHomepage: () => void;
  onGoToSurvey: () => void;
  onStartSurvey: () => void;
}) {
  return (
    <div className="flex flex-col bg-black text-white pb-8">
      <Breadcrumb onGoToHomepage={onGoToHomepage} onGoToSurvey={onGoToSurvey} />
      
      {/* Main Content */}
      <div className="px-4 lg:px-6">
        <div className={`w-full max-w-[${LAYOUT_CONSTANTS.MAX_WIDTH_MOBILE}] mx-auto lg:max-w-[${LAYOUT_CONSTANTS.MAX_WIDTH_DESKTOP}] lg:mt-12 lg:pb-16`}>
          <div className="font-montserrat lg:space-y-6">
            <h1 className="font-bold text-xl mb-4 lg:mb-0 lg:text-xl lg:font-semibold">Welcome to the Arfve Survey</h1>
            <p className="font-bold mb-2 lg:mb-0 lg:font-semibold">Help us shape the future of audio – your voice matters.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">This quick {SURVEY_CONFIG.ESTIMATED_DURATION}-minute survey will directly influence our final design and features.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">At Arfve, we believe the world doesn&apos;t need more disposable earbuds. It needs sound that lasts, design that adapts, and tech that doesn&apos;t expire. Your insights will help us build something different.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">As a thank you, you&apos;ll get early access to exclusive discounts, product updates and a chance to win a pair of Legacy 1 Earbuds.</p>
            <p className="font-bold mb-4 lg:mb-0 lg:font-semibold">The winner will be announced right before launch day.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">This survey is anonymous. If you&apos;d like to receive your reward, please leave your email at the end.</p>
            <div className="mb-6 lg:mb-0 lg:leading-snug">
              <p className="font-bold mb-6 lg:mb-0 lg:font-semibold lg:text-white">Thank you for being part of this movement.</p>
              <p className="italic mb-8 lg:mb-0 lg:not-italic lg:text-[#CCCCCC]">– The Arfve Team</p>
            </div>
            
            <ErrorDisplay error={state.error} />
            
            <div className="flex justify-center lg:mt-8">
              <button 
                onClick={onStartSurvey}
                disabled={state.loading}
                className="bg-white text-black rounded-full px-8 py-2 font-semibold text-base shadow-sm hover:bg-gray-100 transition lg:px-6 lg:py-2 lg:hover:opacity-90 lg:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.loading ? 'Loading...' : 'Start the survey'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Question renderer component that handles different question types
 */
function QuestionRenderer({
  currentQuestion,
  currentAnswer,
  questionNumber,
  isLastQuestion,
  answers,
  submitting,
  onSelect,
  onMultipleSelect,
  onOpenEndedChange,
  onOtherChange,
  onNext,
  onPrevious,
}: {
  currentQuestion: Question;
  currentAnswer: AnswerValue | null;
  questionNumber: number;
  isLastQuestion: boolean;
  answers: Record<string, AnswerValue>;
  submitting: boolean;
  onSelect: (option: string) => void;
  onMultipleSelect: (options: string[]) => void;
  onOpenEndedChange: (value: string) => void;
  onOtherChange: (value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const otherValue = (answers[`${currentQuestion.id}_other`] as string) || '';

  switch (currentQuestion.type) {
    case 'single':
      return (
        <SingleChoiceScreen
          questionNumber={questionNumber}
          question={currentQuestion.text}
          options={currentQuestion.options.map(opt => opt.value)}
          selected={currentAnswer as string}
          onSelect={onSelect}
          onPrev={onPrevious}
          onNext={onNext}
          otherValue={otherValue}
          onOtherChange={onOtherChange}
        />
      );

    case 'open':
      return (
        <OpenEndedScreen
          questionNumber={questionNumber}
          questionText={currentQuestion.text}
          value={(currentAnswer as string) || ''}
          onChange={onOpenEndedChange}
          onPrev={onPrevious}
          onNext={submitting ? () => {} : onNext}
          isRequired={currentQuestion.text.includes('Required') || currentQuestion.text.includes('email')}
          isLastQuestion={isLastQuestion}
          isEmailField={isLastQuestion}
        />
      );

    case 'likert':
      return (
        <LikertScaleScreen
          questionNumber={questionNumber}
          question={currentQuestion.text}
          options={currentQuestion.options.map(opt => opt.value)}
          selected={currentAnswer as string}
          onSelect={onSelect}
          onNext={onNext}
          onPrevious={onPrevious}
          showPrevious={true}
        />
      );

    default: // multiple choice
      return (
        <MultipleChoiceScreen
          questionNumber={questionNumber}
          question={currentQuestion.text}
          options={currentQuestion.options.map(opt => opt.value)}
          selected={currentAnswer as string[]}
          onSelect={onMultipleSelect}
          onNext={onNext}
          onPrevious={onPrevious}
          showPrevious={true}
          otherValue={otherValue}
          onOtherChange={onOtherChange}
        />
      );
  }
}
