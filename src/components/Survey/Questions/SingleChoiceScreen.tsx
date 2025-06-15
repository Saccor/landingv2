"use client";

type Props = {
  questionNumber: number;
  question: string;
  options: string[];
  selected: string | null;
  onSelect: (opt: string) => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function SingleChoiceScreen({
  questionNumber,
  question,
  options,
  selected,
  onSelect,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center px-4 lg:px-6">
      <div className="w-[329px] min-h-[328px] mx-auto flex flex-col items-center py-8 gap-10">
        {/* Question Title - flexible height */}
        <div className="w-full min-h-[28px]">
          <p className="font-montserrat font-semibold text-[18px] leading-[28px] text-white text-center">
            {questionNumber}. {question}
          </p>
        </div>
        
        {/* Options Grid - flexible height */}
        <div className="w-[329px] min-h-[329px] grid grid-cols-2 gap-3 mb-8">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onSelect(opt)}
              className={`flex justify-center items-center w-full min-h-[158px] border rounded-lg font-montserrat font-normal text-[16px] leading-[24px] text-center transition-all duration-200 text-white hover:bg-[rgba(255,255,255,0.1)] p-4 ${
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
        
        {/* Previous/Next Buttons - Always at bottom */}
        <div className="flex w-[300px] h-[44px] items-center gap-[18px] mt-auto">
          <button
            onClick={onPrev}
            className="flex-1 flex justify-center items-center py-[10px] px-[20px] border border-white rounded-full hover:bg-white hover:text-black transition-all duration-200"
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