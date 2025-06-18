"use client";

import React, { useState, useEffect } from 'react';

type Props = {
  questionNumber: number;
  question: string;
  options: string[];
  selected: string | null;
  onSelect: (opt: string) => void;
  onPrev: () => void;
  onNext: () => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
};

export default function SingleChoiceScreen({
  questionNumber,
  question,
  options,
  selected,
  onSelect,
  onPrev,
  onNext,
  otherValue = '',
  onOtherChange
}: Props) {
  const [otherText, setOtherText] = useState(otherValue);

  useEffect(() => {
    setOtherText(otherValue);
  }, [otherValue]);

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherText(value);
    if (onOtherChange) {
      onOtherChange(value);
    }
  };

  const hasOtherOption = options.some(opt => opt.toLowerCase().includes('other'));
  const showOtherInput = hasOtherOption && selected && selected.toLowerCase().includes('other') && (questionNumber === 3 || questionNumber === 6);

  return (
    <div className="flex flex-col items-center justify-center px-4 lg:px-6">
      <div className="w-full max-w-[329px] lg:max-w-none min-h-[328px] mx-auto flex flex-col items-center py-4 gap-4">
        {/* Question Title - flexible height */}
        <div className="w-full min-h-[28px]">
          <p className="font-montserrat font-semibold text-[18px] leading-[28px] text-white text-center mb-2">
            {questionNumber}. {question}
          </p>
          
          {/* Single Choice Indicator */}
          <p className="font-montserrat font-normal text-[14px] leading-[20px] text-center text-[#98A2B3] mb-6">
            (Single choice)
          </p>
        </div>
        
        {/* Options Grid - Responsive wrapping layout */}
        <div className="w-full max-w-[329px] lg:max-w-none mx-auto">
          <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap lg:justify-center lg:gap-3">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => onSelect(opt)}
                className={`flex justify-center items-center min-h-[158px] border rounded-lg font-montserrat font-normal text-[16px] leading-[24px] text-center transition-all duration-200 text-white hover:bg-[rgba(255,255,255,0.1)] p-4 lg:w-[163px] lg:h-[158px] lg:flex-shrink-0 ${
                  selected === opt
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

        {/* Other Input Field - Between options and buttons */}
        {showOtherInput && (
          <div className="w-full max-w-[329px] lg:max-w-md mx-auto">
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
        
        {/* Previous/Next Buttons - Always at bottom */}
        <div className="flex w-full max-w-[300px] h-[44px] items-center gap-[18px] mt-auto">
          <button
  onClick={onPrev}
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

          <button
            onClick={onNext}
            disabled={!selected}
            className={`flex-1 flex justify-center items-center py-[10px] px-[20px] rounded-full transition-all duration-200 ${
              selected
                ? "bg-[#F5F5F5] text-black hover:bg-white"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
          >
            <span className="font-montserrat font-medium text-[14px] leading-[20px]">
              Continue
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 