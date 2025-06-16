import React, { useState, useEffect } from 'react';

interface OpenEndedScreenProps {
  questionNumber: number;
  questionText: string;
  value: string;
  onChange: (value: string) => void;
  onPrev: () => void;
  onNext: () => void;
  isRequired?: boolean;
  isLastQuestion?: boolean;
  isEmailField?: boolean;
}

const OpenEndedScreen: React.FC<OpenEndedScreenProps> = ({
  questionNumber,
  questionText,
  value,
  onChange,
  onPrev,
  onNext,
  isRequired = false,
  isLastQuestion = false,
  isEmailField = false
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);

    // Clear email error when user starts typing
    if (isEmailField && emailError) {
      setEmailError('');
    }
  };

  const handleNext = () => {
    if (isEmailField && inputValue.trim()) {
      if (!validateEmail(inputValue.trim())) {
        setEmailError('Please enter a valid email address (e.g., user@gmail.com)');
        return;
      }
    }
    onNext();
  };

  const canProceed = (() => {
    if (!isRequired && !inputValue.trim()) return true;
    if (isRequired && !inputValue.trim()) return false;
    if (isEmailField && inputValue.trim() && !validateEmail(inputValue.trim())) return false;
    return true;
  })();

  return (
    <div className="w-full max-w-[329px] mx-auto flex flex-col items-center justify-center">
      
      {/* Question */}
      <div className="w-full mb-8">
        <h2 className="font-montserrat font-semibold text-[20px] leading-[28px] text-center text-[#F2F4F7] mb-6">
          {questionNumber}. {questionText}
        </h2>

        {/* Input Container - same width as other options */}
        <div className="w-[329px] flex flex-col justify-center items-start gap-3 mb-8">
          {isEmailField ? (
            <input
              type="email"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="your.email@gmail.com"
              className="w-[329px] h-[48px] px-4 rounded-lg bg-[rgba(31,36,41,0.05)] border border-[#6C6C6E] 
                       text-[#F2F4F7] font-montserrat font-normal text-[16px] leading-[24px]
                       placeholder-[#98A2B3] 
                       focus:outline-none focus:border-white focus:bg-[rgba(255,255,255,0.1)]
                       transition-all duration-200"
            />
          ) : (
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your answer here..."
              className="w-[329px] min-h-[120px] p-4 rounded-lg bg-[rgba(31,36,41,0.05)] border border-[#6C6C6E] 
                       text-[#F2F4F7] font-montserrat font-normal text-[16px] leading-[24px]
                       placeholder-[#98A2B3] resize-vertical
                       focus:outline-none focus:border-white focus:bg-[rgba(255,255,255,0.1)]
                       transition-all duration-200"
              rows={5}
            />
          )}
          
          {/* Email Error Message */}
          {isEmailField && emailError && (
            <p className="mt-2 text-red-400 font-montserrat font-normal text-[12px] leading-[16px]">
              {emailError}
            </p>
          )}
          
          {/* Required Field Message */}
          {isRequired && (
            <p className="mt-2 text-[#98A2B3] font-montserrat font-normal text-[12px] leading-[16px]">
              * This field is required
            </p>
          )}
          
          {/* Email Help Text */}
          {isEmailField && (
            <p className="mt-2 text-[#98A2B3] font-montserrat font-normal text-[12px] leading-[16px]">
              Enter your email to receive exclusive updates and participate in the Legacy 1 Earbuds giveaway
            </p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="w-[141px] h-[44px] rounded-lg bg-[rgba(31,36,41,0.05)] border border-[#6C6C6E] 
                   hover:bg-[rgba(255,255,255,0.1)] hover:border-[#8C8C8E] transition-all duration-200
                   flex items-center justify-center"
        >
          <span className="font-montserrat font-medium text-[16px] leading-[24px] text-[#F2F4F7]">
            Previous
          </span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`w-[141px] h-[44px] rounded-lg transition-all duration-200 flex items-center justify-center
            ${canProceed 
              ? 'bg-white hover:bg-[#E5E7EB] text-[#1F2429]' 
              : 'bg-[rgba(255,255,255,0.3)] text-[#98A2B3] cursor-not-allowed'
            }`}
        >
          <span className="font-montserrat font-medium text-[16px] leading-[24px]">
            {isLastQuestion ? 'Finish' : 'Next'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default OpenEndedScreen; 