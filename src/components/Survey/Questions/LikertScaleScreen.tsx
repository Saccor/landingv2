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
    <div className="w-full max-w-[329px] mx-auto flex flex-col items-center justify-center">
      
      {/* Question */}
      <div className="w-full mb-8">
        <h2 className="font-montserrat font-semibold text-[20px] leading-[28px] text-center text-[#F2F4F7] mb-6">
          {questionNumber}. {question}
        </h2>

        {/* Options Container - vertical layout like other question types */}
        <div className="w-[329px] flex flex-col justify-center items-start gap-3 mb-8">
          {displayOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionSelect(opt)}
              className={`
                w-[329px] min-h-[36px] rounded-lg
                flex items-center justify-center border transition-all duration-200
                ${
                  selectedOption === opt
                    ? 'bg-[rgba(255,255,255,0.2)] border-white'
                    : 'bg-[rgba(31,36,41,0.05)] border-[#6C6C6E] hover:bg-[rgba(255,255,255,0.1)] hover:border-[#8C8C8E]'
                }
              `}
            >
              <span className="w-full font-montserrat font-normal text-[16px] leading-[24px] text-center text-[#F2F4F7] py-1">
                {opt}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {showPrevious && (
          <button
            onClick={onPrevious}
            className="w-[141px] h-[44px] rounded-lg bg-[rgba(31,36,41,0.05)] border border-[#6C6C6E] 
                     hover:bg-[rgba(255,255,255,0.1)] hover:border-[#8C8C8E] transition-all duration-200
                     flex items-center justify-center"
          >
            <span className="font-montserrat font-medium text-[16px] leading-[24px] text-[#F2F4F7]">
              Previous
            </span>
          </button>
        )}
        
        <button
          onClick={onNext}
          disabled={!selectedOption}
          className={`w-[141px] h-[44px] rounded-lg transition-all duration-200 flex items-center justify-center
            ${selectedOption 
              ? 'bg-white hover:bg-[#E5E7EB] text-[#1F2429]' 
              : 'bg-[rgba(255,255,255,0.3)] text-[#98A2B3] cursor-not-allowed'
            }`}
        >
          <span className="font-montserrat font-medium text-[16px] leading-[24px]">
            Next
          </span>
        </button>
      </div>
    </div>
  );
};

export default LikertScaleScreen; 