import React, { useState, useEffect } from 'react';

interface LikertScaleScreenProps {
  questionNumber: number;
  question: string;
  options?: string[];
  selected: string;
  onSelect: (selected: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  showPrevious?: boolean;
}

const LikertScaleScreen: React.FC<LikertScaleScreenProps> = ({
  questionNumber,
  question,
  options,
  selected,
  onSelect,
  onNext,
  onPrevious,
  showPrevious = true
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(selected || '');

  useEffect(() => {
    setSelectedOption(selected || '');
  }, [selected]);

  // Use provided options or default 1-5 scale
  const displayOptions = options && options.length > 0 
    ? options 
    : ['1', '2', '3', '4', '5'];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className="w-full max-w-[329px] lg:max-w-none mx-auto flex flex-col items-center justify-center">
      
      {/* Question */}
      <div className="w-full mb-8">
        <h2 className="font-montserrat font-semibold text-[20px] leading-[28px] text-center text-[#F2F4F7] mb-6">
          {questionNumber}. {question}
        </h2>

        {/* Options Grid - Responsive wrapping layout */}
        <div className="w-full max-w-[329px] lg:max-w-none mx-auto mb-8">
          <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap lg:justify-center lg:gap-3">
            {displayOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionSelect(opt)}
                className={`flex justify-center items-center min-h-[158px] border rounded-lg font-montserrat font-normal text-[16px] leading-[24px] text-center transition-all duration-200 text-white hover:bg-[rgba(255,255,255,0.1)] p-4 lg:w-[163px] lg:h-[158px] lg:flex-shrink-0 ${
                  selectedOption === opt
                    ? "bg-[rgba(255,255,255,0.2)] border-white"
                    : "bg-[rgba(31,36,41,0.05)] border-[#6C6C6E] hover:border-[#8C8C8E]"
                }`}
              >
                <span className="break-words text-center">
                  {opt}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mb-6">
        {showPrevious && (
          <button
            onClick={onPrevious}
            className="w-[141px] h-[44px] rounded-full bg-[rgba(31,36,41,0.05)] border border-[#6C6C6E] 
             hover:bg-[rgba(255,255,255,0.08)] hover:border-[#8C8C8E] transition-all duration-200
             flex items-center justify-center">
              <span className="font-montserrat font-medium text-[16px] leading-[24px] text-[#F2F4F7] !hover:text-[#F2F4F7]">
                Previous
              </span>
          </button>
        )}
        
        <button
          onClick={onNext}
          disabled={!selectedOption}
          className={`w-[141px] h-[44px] rounded-full transition-all duration-200 flex items-center justify-center
            ${selectedOption 
              ? 'bg-white hover:bg-[#E5E7EB] text-[#1F2429]' 
              : 'bg-[rgba(255,255,255,0.3)] text-[#98A2B3] cursor-not-allowed'
            }`}
        >
          <span className="font-montserrat font-medium text-[16px] leading-[24px]">
                          Continue
          </span>
        </button>
      </div>
    </div>
  );
};

export default LikertScaleScreen; 