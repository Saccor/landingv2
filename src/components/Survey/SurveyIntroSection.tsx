'use client';

import { Home } from 'lucide-react';
import { useState } from 'react';
import SingleChoiceScreen from './Questions/SingleChoiceScreen';
import MultipleChoiceScreen from './Questions/MultipleChoiceScreen';

type Question = {
  id: string;
  text: string;
  type: string;
  order_no: number;
  options: { value: string }[];
};

export default function SurveyIntroSection() {
  const [currentView, setCurrentView] = useState<'intro' | 'questions'>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Fetching questions from /api/questions');
      const response = await fetch('/api/questions');
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        
        if (data && data.length > 0) {
          setQuestions(data);
          setCurrentView('questions');
        } else {
          setError('No questions found in the database');
        }
      } else {
        const errorData = await response.json();
        console.error('API error response:', errorData);
        setError(`Failed to fetch questions: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error: Unable to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const handleStartSurvey = () => {
    fetchQuestions();
  };

  const handleSelect = (selectedOption: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedOption
    }));
  };

  const handleMultipleSelect = (selectedOptions: string[]) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedOptions
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Survey completed - handle submission here
      console.log('Survey completed:', answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      // Go back to intro section when on first question
      setCurrentView('intro');
    }
  };

  if (currentView === 'questions' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion.id] || null;
    const progressPercentage = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
    
    return (
      <div className="flex flex-col bg-black text-white">
        {/* Breadcrumb */}
        <div className="w-full px-4 py-4 lg:px-6 lg:pt-10 lg:pb-8">
          <div className="lg:max-w-[1270px] lg:mx-auto flex items-center gap-2 text-sm text-white">
            <Home size={18} className="lg:w-4 lg:h-4" />
            <span className="font-semibold underline cursor-pointer">Homepage</span>
            <span className="text-lg">›</span>
            <span className="text-white/80 lg:text-white">Survey</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full px-4 lg:px-6 mb-6">
          <div className="max-w-[329px] mx-auto flex items-center gap-4">
            {/* Percentage Text */}
            <div className="w-[27px] h-[20px] flex items-center justify-start">
              <span className="font-montserrat font-medium text-sm text-white">
                {progressPercentage}%
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-[305px] h-[2px] bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="w-full px-4 lg:px-6">
          {currentQuestion.type === 'single' ? (
            <SingleChoiceScreen
              questionNumber={currentQuestionIndex + 1}
              question={currentQuestion.text}
              options={currentQuestion.options.map(opt => opt.value)}
              selected={currentAnswer as string}
              onSelect={handleSelect}
              onPrev={handlePrevious}
              onNext={handleNext}
            />
          ) : (
            <MultipleChoiceScreen
              questionNumber={currentQuestionIndex + 1}
              question={currentQuestion.text}
              options={currentQuestion.options.map(opt => opt.value)}
              selected={currentAnswer as string[]}
              onSelect={handleMultipleSelect}
              onNext={handleNext}
              onPrevious={handlePrevious}
              showPrevious={true}
              otherValue={answers[`${currentQuestion.id}_other`] as string || ''}
              onOtherChange={(value: string) =>
                setAnswers(a => ({
                  ...a,
                  [`${currentQuestion.id}_other`]: value
                }))
              }
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-black text-white pb-8">
      {/* Breadcrumb */}
      <div className="w-full px-4 mb-6 lg:px-6 lg:pt-10 lg:mb-6">
        <div className="lg:max-w-[1270px] lg:mx-auto flex items-center gap-2 text-sm text-white">
          <Home size={18} className="lg:w-4 lg:h-4" />
          <span className="font-semibold underline cursor-pointer">Homepage</span>
          <span className="text-lg">›</span>
          <span className="text-white/80 lg:text-white">Survey</span>
        </div>
      </div>
      {/* Main Content */}
      <div className="px-4 lg:px-6">
        <div className="w-full max-w-[321px] mx-auto lg:max-w-[960px] lg:mt-12 lg:pb-16">
          <div className="font-montserrat lg:space-y-6">
            <h1 className="font-bold text-xl mb-4 lg:mb-0 lg:text-xl lg:font-semibold">Welcome to the Arfve Survey</h1>
            <p className="font-bold mb-2 lg:mb-0 lg:font-semibold">Help us shape the future of audio – your voice matters.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">This quick 4-minute survey will directly influence our final design and features.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">At Arfve, we believe the world doesn't need more disposable earbuds. It needs sound that lasts, design that adapts, and tech that doesn't expire. Your insights will help us build something different.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">As a thank you, you'll get early access to exclusive discounts, product updates and a chance to win a pair of Legacy 1 Earbuds.</p>
            <p className="font-bold mb-4 lg:mb-0 lg:font-semibold">The winner will be announced right before launch day.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">This survey is anonymous. If you'd like to receive your reward, please leave your email at the end.</p>
            <div className="mb-6 lg:mb-0 lg:leading-snug">
              <p className="font-bold mb-6 lg:mb-0 lg:font-semibold lg:text-white">Thank you for being part of this movement.</p>
              <p className="italic mb-8 lg:mb-0 lg:not-italic lg:text-[#CCCCCC]">– The Arfve Team</p>
            </div>
            
            {/* Error Display */}
            {error && (
              <div className="mb-4 p-4 bg-red-900/20 border border-red-500 rounded text-red-300 text-sm">
                {error}
              </div>
            )}
            
            <div className="flex justify-center lg:mt-8">
              <button 
                onClick={handleStartSurvey}
                disabled={loading}
                className="bg-white text-black rounded-full px-8 py-2 font-semibold text-base shadow-sm hover:bg-gray-100 transition lg:px-6 lg:py-2 lg:hover:opacity-90 lg:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Start the survey'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
