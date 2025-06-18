import { useState, useCallback } from 'react';
import { SurveyState, AnswerValue } from '../types';
import { surveyApi } from '../services/surveyApi';

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

export function useSurveyState() {
  const [state, setState] = useState<SurveyState>(INITIAL_STATE);

  /**
   * Reset survey to intro state
   */
  const resetSurvey = useCallback(() => {
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
      const data = await surveyApi.fetchQuestions();
      
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
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch questions',
        loading: false,
      }));
    }
  }, []);

  /**
   * Submit survey to API
   */
  const submitSurvey = useCallback(async () => {
    setState(prev => ({ ...prev, submitting: true, error: '' }));
    
    try {
      await surveyApi.submitSurvey(state.answers);
      setState(prev => ({ ...prev, submitted: true, submitting: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to submit survey',
        submitting: false,
      }));
    }
  }, [state.answers]);

  /**
   * Update answer for current question
   */
  const updateAnswer = useCallback((questionId: string, value: AnswerValue) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value,
      },
    }));
  }, []);

  /**
   * Navigate to next question or submit survey
   */
  const goToNext = useCallback(() => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
    } else {
      submitSurvey();
    }
  }, [state.currentQuestionIndex, state.questions.length, submitSurvey]);

  /**
   * Navigate to previous question or intro
   */
  const goToPrevious = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }));
    } else {
      setState(prev => ({ ...prev, currentView: 'intro' }));
    }
  }, [state.currentQuestionIndex]);

  return {
    state,
    actions: {
      resetSurvey,
      fetchQuestions,
      submitSurvey,
      updateAnswer,
      goToNext,
      goToPrevious,
    },
  };
} 