'use client';

import { useCallback } from 'react';
import { useSurveyState } from './hooks/useSurveyState';
import { SuccessScreen, IntroScreen, QuestionsScreen } from './components';

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
  const { state, actions } = useSurveyState();

  /**
   * Navigate to homepage
   */
  const handleGoToHomepage = useCallback(() => {
    window.location.href = '/';
  }, []);

  /**
   * Handle survey start
   */
  const handleStartSurvey = useCallback(() => {
    actions.fetchQuestions();
  }, [actions]);

  /**
   * Handle single choice selection
   */
  const handleSelect = useCallback((selectedOption: string) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    actions.updateAnswer(currentQuestion.id, selectedOption);
  }, [state.questions, state.currentQuestionIndex, actions]);

  /**
   * Handle multiple choice selection
   */
  const handleMultipleSelect = useCallback((selectedOptions: string[]) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    actions.updateAnswer(currentQuestion.id, selectedOptions);
  }, [state.questions, state.currentQuestionIndex, actions]);

  /**
   * Handle open-ended response change
   */
  const handleOpenEndedChange = useCallback((value: string) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    actions.updateAnswer(currentQuestion.id, value);
  }, [state.questions, state.currentQuestionIndex, actions]);

  /**
   * Handle "other" option input change
   */
  const handleOtherChange = useCallback((value: string) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    actions.updateAnswer(`${currentQuestion.id}_other`, value);
  }, [state.questions, state.currentQuestionIndex, actions]);

  // Show success screen after submission
  if (state.submitted) {
    return (
      <SuccessScreen 
        onGoToHomepage={handleGoToHomepage} 
        onGoToSurvey={actions.resetSurvey} 
      />
    );
  }

  // Show questions screen
  if (state.currentView === 'questions' && state.questions.length > 0) {
    return (
      <QuestionsScreen
        state={state}
        onGoToHomepage={handleGoToHomepage}
        onGoToSurvey={actions.resetSurvey}
        onSelect={handleSelect}
        onMultipleSelect={handleMultipleSelect}
        onOpenEndedChange={handleOpenEndedChange}
        onOtherChange={handleOtherChange}
        onNext={actions.goToNext}
        onPrevious={actions.goToPrevious}
      />
    );
  }

  // Show intro screen (default)
  return (
    <IntroScreen
      state={state}
      onGoToHomepage={handleGoToHomepage}
      onGoToSurvey={actions.resetSurvey}
      onStartSurvey={handleStartSurvey}
    />
  );
}
