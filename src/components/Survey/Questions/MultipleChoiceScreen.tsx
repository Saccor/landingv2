'use client';

import React, { useState, useEffect } from 'react';

interface MultipleChoiceScreenProps {
  questionNumber: number;
  question: string;
  options: string[];
  selected: string[];
  onSelect: (selected: string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  showPrevious?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

const MultipleChoiceScreen: React.FC<MultipleChoiceScreenProps> = ({
  questionNumber,
  question,
  options,
  selected,
  onSelect,
  onNext,
  onPrevious,
  showPrevious = true,
  otherValue = '',
  onOtherChange
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selected || []);
  const [otherText, setOtherText] = useState(otherValue);

  useEffect(() => {
    setSelectedOptions(selected || []);
  }, [selected]);

  useEffect(() => {
    setOtherText(otherValue);
  }, [otherValue]);

  const handleOptionToggle = (option: string) => {
    // Multiple choice: allow multiple selections
    if (selectedOptions.includes(option)) {
      onSelect(selectedOptions.filter(opt => opt !== option));
    } else {
      onSelect([...selectedOptions, option]);
    }
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherText(value);
    if (onOtherChange) {
      onOtherChange(value);
    }
  };

  const hasOtherOption = options.some(opt => opt.toLowerCase().includes('other'));
  const showOtherInput = hasOtherOption && selectedOptions.some(opt => opt.toLowerCase().includes('other'));

  return (
    <div className="w-full max-w-[329px] mx-auto flex flex-col items-center justify-center">
      
      {/* Question */}
      <div className="w-full mb-8">
        <h2 className="font-montserrat font-semibold text-[20px] leading-[28px] text-center text-[#F2F4F7] mb-6">
          {questionNumber}. {question}
        </h2>

        {/* Options Container - vertical layout */}
        <div className="w-[329px] flex flex-col justify-center items-start gap-3 mb-8">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionToggle(opt)}
              className={`
                w-[329px] min-h-[36px] rounded-lg
                flex items-center justify-center border transition-all duration-200
                ${
                  selectedOptions.includes(opt)
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

        {/* Other Input Field */}
        {showOtherInput && (
          <div className="w-[329px] mb-8">
            <input
              type="text"
              value={otherText}
              onChange={handleOtherChange}
              placeholder="Please specify..."
              className="w-full h-[36px] px-3 rounded-lg bg-[rgba(31,36,41,0.05)] border border-[#6C6C6E] 
                       text-[#F2F4F7] font-montserrat font-normal text-[16px] leading-[24px]
                       placeholder-[#98A2B3] focus:outline-none focus:border-white focus:bg-[rgba(255,255,255,0.1)]
                       transition-all duration-200"
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {showPrevious && (
          <button
  onClick={onPrevious}
  className="w-[141px] h-[44px] rounded-lg 
             bg-[rgba(31,36,41,0.05)] border border-[#6C6C6E]
             hover:bg-[rgba(255,255,255,0.08)] hover:border-[#8C8C8E]
             transition-all duration-200
             flex items-center justify-center"
>
  <span className="font-montserrat font-medium text-[16px] leading-[24px] text-[#F2F4F7] hover:text-[#F2F4F7]">
    Previous
  </span>
</button>


        )}
        
        <button
          onClick={onNext}
          disabled={selectedOptions.length === 0}
          className={`w-[141px] h-[44px] rounded-lg transition-all duration-200 flex items-center justify-center
            ${selectedOptions.length > 0 
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

export default MultipleChoiceScreen; 