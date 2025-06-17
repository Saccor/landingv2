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
    let newSelectedOptions: string[];
    if (selectedOptions.includes(option)) {
      newSelectedOptions = selectedOptions.filter(opt => opt !== option);
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }
    
    // Update local state
    setSelectedOptions(newSelectedOptions);
    
    // Update parent state
    onSelect(newSelectedOptions);
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherText(value);
    if (onOtherChange) {
      onOtherChange(value);
    }
  };

  const hasOtherOption = options.some(opt => opt.toLowerCase().includes('other'));
  const showOtherInput = hasOtherOption && selectedOptions.some(opt => opt.toLowerCase().includes('other')) && (questionNumber === 3 || questionNumber === 6);

  return (
    <div className="w-full max-w-[329px] lg:max-w-none mx-auto flex flex-col items-center justify-center">
      
      {/* Question */}
      <div className="w-full mb-8">
        <h2 className="font-montserrat font-semibold text-[20px] leading-[28px] text-center text-[#F2F4F7] mb-2">
          {questionNumber}. {question}
        </h2>
        
        {/* Multiple Choice Indicator */}
        <p className="font-montserrat font-normal text-[14px] leading-[20px] text-center text-[#98A2B3] mb-6">
          (Multiple Choice)
        </p>

        {/* Options Container - responsive layout */}
        <div className="w-full max-w-[329px] lg:max-w-none mx-auto flex flex-col justify-center items-center gap-3 mb-8">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionToggle(opt)}
              className={`
                w-full max-w-[329px] lg:max-w-md min-h-[36px] rounded-lg
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
          <div className="w-full max-w-[329px] lg:max-w-md mx-auto mb-8">
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
      <div className="flex w-full max-w-[300px] h-[44px] items-center gap-[18px] mb-8">
        {showPrevious && (
          <button
            onClick={onPrevious}
            className="flex-1 flex justify-center items-center py-[10px] px-[20px] 
                       border border-white rounded-full 
                       bg-[rgba(31,36,41,0.05)] 
                       hover:bg-[rgba(255,255,255,0.08)] hover:border-[#8C8C8E] 
                       transition-all duration-200"
          >
            <span className="font-montserrat font-normal text-[14px] leading-[20px] text-white">
              Previous
            </span>
          </button>
        )}
        
        <button
          onClick={onNext}
          disabled={selectedOptions.length === 0}
          className={`flex-1 flex justify-center items-center py-[10px] px-[20px] rounded-full transition-all duration-200 ${
            selectedOptions.length > 0 
              ? 'bg-[#F5F5F5] text-black hover:bg-white' 
              : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
        >
          <span className="font-montserrat font-medium text-[14px] leading-[20px]">
                          Continue
          </span>
        </button>
      </div>
    </div>
  );
};

export default MultipleChoiceScreen; 