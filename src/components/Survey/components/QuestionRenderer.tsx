import { Question, AnswerValue, AnswerCallbacks, QuestionNavigationCallbacks } from '../types';
import SingleChoiceScreen from '../Questions/SingleChoiceScreen';
import MultipleChoiceScreen from '../Questions/MultipleChoiceScreen';
import LikertScaleScreen from '../Questions/LikertScaleScreen';
import OpenEndedScreen from '../Questions/OpenEndedScreen';

interface QuestionRendererProps extends AnswerCallbacks, QuestionNavigationCallbacks {
  currentQuestion: Question;
  currentAnswer: AnswerValue | null;
  questionNumber: number;
  isLastQuestion: boolean;
  answers: Record<string, AnswerValue>;
  submitting: boolean;
}

/**
 * Question renderer component that handles different question types
 */
export function QuestionRenderer({
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
}: QuestionRendererProps) {
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

    case 'open-ended':
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

    case 'multiple':
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