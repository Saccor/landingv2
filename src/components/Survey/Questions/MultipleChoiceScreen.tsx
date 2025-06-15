'use client';

import React, { useState, useEffect } from 'react';

interface MultipleChoiceScreenProps {
  questionNumber: number;
  question: string;
  options: string[];
  selected: string[] | null;
  onSelect: (selectedOptions: string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  showPrevious?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  questionType: 'multiple' | 'likert';
}

export default function MultipleChoiceScreen({
  questionNumber,
  question,
  options,
  selected,
  onSelect,
  onNext,
  onPrevious,
  showPrevious = true,
  otherValue = '',
  onOtherChange,
  questionType
}: MultipleChoiceScreenProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selected || []);

  useEffect(() => {
    setSelectedOptions(selected || []);
  }, [selected]);

  // Generate default likert scale options if none provided
  const displayOptions = questionType === 'likert' && options.length === 0 
    ? ['1', '2', '3', '4', '5']
    : options;

  const handleOptionToggle = (option: string) => {
    if (questionType === 'likert') {
      // Likert scale: single selection only
      onSelect([option]);
    } else {
      // Multiple choice: allow multiple selections
      if (selectedOptions.includes(option)) {
        onSelect(selectedOptions.filter(opt => opt !== option));
      } else {
        onSelect([...selectedOptions, option]);
      }
    }
  };

  const handleContinue = () => {
    onNext();
  };

  const showOtherInput = selectedOptions.includes('Other (please specify)');

  return (
    <div className="flex flex-col items-center justify-center px-4 lg:px-6">
      <div className="w-[393px] min-h-[433px] flex flex-col items-center px-8 gap-[42px] py-8">
        {/* Main Content Container - flexible height */}
        <div className="w-[329px] flex flex-col items-start gap-6">
          {/* Question Title - flexible height */}
          <div className="w-[329px] min-h-[28px]">
            <h2 className="font-montserrat font-semibold text-[18px] leading-[28px] text-center text-white">
              {questionNumber}. {question}
            </h2>
          </div>

          {/* Options Container - flexible height */}
          <div className="w-[329px] flex flex-col justify-center items-start gap-3 mb-8">
            {displayOptions.map((opt, i) => (
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

          {/* Other Input Field - appears between options and buttons */}
          {showOtherInput && onOtherChange && (
            <div className="w-[329px] mb-4">
              <label className="block font-montserrat font-medium text-white mb-2">
                Please specify:
              </label>
              <input
                type="text"
                value={otherValue}
                onChange={e => onOtherChange(e.target.value)}
                className="w-full p-2 bg-[rgba(31,36,41,0.05)] border border-[#6C6C6E] rounded text-white placeholder-gray-400"
                placeholder="Enter your answer..."
              />
            </div>
          )}
        </div>

        {/* Buttons Container - 300x44 - Always at bottom */}
        <div className="w-[300px] h-[44px] flex flex-row items-center gap-[18px] mt-auto">
          {showPrevious && (
            <button
              onClick={onPrevious}
              className="w-[141px] h-[44px] flex flex-row justify-center items-center py-[10px] px-[20px] gap-[10px] border border-white rounded-[28px] flex-1"
            >
              <span className="w-[101px] h-[20px] font-montserrat font-normal text-[14px] leading-[20px] text-center text-white flex-1">
                Previous
              </span>
            </button>
          )}
          <button
            onClick={handleContinue}
            className="w-[141px] h-[44px] flex flex-row items-center py-[10px] px-[20px] gap-[10px] bg-[#F5F5F5] rounded-[55px] flex-1"
          >
            <span className="w-[101px] h-[20px] font-montserrat font-medium text-[14px] leading-[20px] text-center text-black flex-1">
              Continue
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 