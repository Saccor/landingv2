import { SurveyState, NavigationCallbacks, AnswerCallbacks, QuestionNavigationCallbacks } from '../types';
import { Breadcrumb } from './Breadcrumb';
import { ProgressBar } from './ProgressBar';
import { ErrorDisplay } from './ErrorDisplay';
import { LoadingOverlay } from './LoadingOverlay';
import { QuestionRenderer } from './QuestionRenderer';

interface QuestionsScreenProps extends NavigationCallbacks, AnswerCallbacks, QuestionNavigationCallbacks {
  state: SurveyState;
}

/**
 * Questions screen component that displays the current question with progress
 */
export function QuestionsScreen({
  state,
  onGoToHomepage,
  onGoToSurvey,
  onSelect,
  onMultipleSelect,
  onOpenEndedChange,
  onOtherChange,
  onNext,
  onPrevious,
}: QuestionsScreenProps) {
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const currentAnswer = state.answers[currentQuestion.id] || null;
  const progressPercentage = Math.round(((state.currentQuestionIndex + 1) / state.questions.length) * 100);
  const questionNumber = state.currentQuestionIndex + 1;
  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;

  return (
    <div className="flex flex-col bg-black text-white pb-4">
      <Breadcrumb onGoToHomepage={onGoToHomepage} onGoToSurvey={onGoToSurvey} />
      <ProgressBar progressPercentage={progressPercentage} />
      <ErrorDisplay error={state.error} />
      
      <div className="flex-1">
        <QuestionRenderer
          currentQuestion={currentQuestion}
          currentAnswer={currentAnswer}
          questionNumber={questionNumber}
          isLastQuestion={isLastQuestion}
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