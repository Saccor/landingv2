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
}

const OpenEndedScreen: React.FC<OpenEndedScreenProps> = ({
  questionNumber,
  questionText,
  value,
  onChange,
  onPrev,
  onNext,
  isRequired = false,
  isLastQuestion = false
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const canProceed = !isRequired || inputValue.trim().length > 0;

  return (
    <div className="w-full max-w-[329px] mx-auto flex flex-col items-center justify-center">
      
      {/* Question */}
      <div className="w-full mb-8">
        <h2 className="font-montserrat font-semibold text-[20px] leading-[28px] text-center text-[#F2F4F7] mb-6">
          {questionNumber}. {questionText}
        </h2>

        {/* Text Area Container - same width as other options */}
        <div className="w-[329px] flex flex-col justify-center items-start gap-3 mb-8">
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
          
          {isRequired && (
            <p className="mt-2 text-[#98A2B3] font-montserrat font-normal text-[12px] leading-[16px]">
              * This field is required
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
          onClick={onNext}
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