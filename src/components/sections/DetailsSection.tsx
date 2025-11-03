'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import OptimizedImage from '@/components/ui/OptimizedImage';

const PlusIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <path d="M10.9961 1V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"/>
    <path d="M1 11.005L21 11.005" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DetailsSection: React.FC = () => {
  return (
    <RevealSection className="relative w-full flex justify-center bg-[#F4F4F4] overflow-hidden">
      {/* Desktop layout: 1440x1009 absolute positioning per Frame 481717 */}
      <div className="hidden lg:block relative w-full max-w-[1440px] h-[1009px]">
        {/* Top heading group (Frame 481699) at (124, 50) */}
        <div className="absolute left-[124px] top-[50px] w-[1192px] h-[134px] flex flex-col items-start gap-[10px]">
          <div className="w-[1192px] h-[60px] flex flex-row flex-wrap items-start gap-x-[17px]">
            <div className="w-[604px] h-[60px] font-montserrat font-semibold text-[48px] leading-[60px] tracking-[-0.02em] text-[#1A1A1A]">
              Modularity
            </div>
          </div>
          <p className="w-[1192px] h-[64px] font-montserrat font-normal text-[24px] leading-[32px] text-[#1A1A1A]">
            Swap sound drivers, batteries, chipsets, or covers instead of replacing the entire product. Because true innovation respects both you and the planet.
          </p>
        </div>

        {/* Right column features */}
        <div className="absolute left-[919px] top-[291px] w-[361px] h-[133px] flex flex-col items-start gap-[5px]">
          <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
            <PlusIcon />
            <div className="w-[333px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A] whitespace-nowrap">Sound drivers</div>
          </div>
          <p className="w-[327px] h-[96px] font-montserrat font-medium text-[16px] leading-[24px] text-[#1A1A1A]">
            Precision-built sound drivers deliver clear, balanced audio designed for real-world listening. Each component is engineered to bring detail, depth and control to every frequency.
          </p>
        </div>

        <div className="absolute left-[974px] top-[515px] w-[361px] h-[133px] flex flex-col items-start gap-[5px]">
          <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
            <PlusIcon />
            <div className="w-[333px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A] whitespace-nowrap">Batteries</div>
          </div>
          <p className="w-[327px] h-[96px] font-montserrat font-medium text-[16px] leading-[24px] text-[#1A1A1A]">
            The battery system is built to deliver long-lasting performance throughout the day. Power that adapts to your rhythm, so the music keeps going when you do.
          </p>
        </div>

        <div className="absolute left-[833px] top-[749px] w-[361px] h-[133px] flex flex-col items-start gap-[5px]">
          <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
            <PlusIcon />
            <div className="w-[333px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A] whitespace-nowrap">Chipsets and design covers</div>
          </div>
          <p className="w-[327px] h-[96px] font-montserrat font-medium text-[16px] leading-[24px] text-[#1A1A1A]">
            Powered by the Snapdragon platform, Legacy 1 delivers faster processing, smarter noise control and seamless AI integration.
          </p>
        </div>

        {/* Left column features */}
        <div className="absolute left-[179px] top-[291px] w-[361px] h-[133px] flex flex-col items-start gap-[5px]">
          <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
            <PlusIcon />
            <div className="w-[333px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A] whitespace-nowrap">Sound drivers</div>
          </div>
          <p className="w-[327px] h-[96px] font-montserrat font-medium text-[16px] leading-[24px] text-[#1A1A1A]">
            Precision-built sound drivers deliver clear, balanced audio designed for real-world listening. Each component is engineered to bring detail, depth and control to every frequency.
          </p>
        </div>

        <div className="absolute left-[105px] top-[522px] w-[361px] h-[133px] flex flex-col items-start gap-[5px]">
          <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
            <PlusIcon />
            <div className="w-[333px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A] whitespace-nowrap">Batteries</div>
          </div>
          <p className="w-[327px] h-[96px] font-montserrat font-medium text-[16px] leading-[24px] text-[#1A1A1A]">
            The battery system is built to deliver long-lasting performance throughout the day. Power that adapts to your rhythm, so the music keeps going when you do.
          </p>
        </div>

        <div className="absolute left-[209px] top-[755px] w-[361px] h-[133px] flex flex-col items-start gap-[5px]">
          <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
            <PlusIcon />
            <div className="w-[333px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A] whitespace-nowrap">Chipsets and design covers</div>
          </div>
          <p className="w-[327px] h-[96px] font-montserrat font-medium text-[16px] leading-[24px] text-[#1A1A1A]">
            Powered by the Snapdragon platform, Legacy 1 delivers faster processing, smarter noise control and seamless AI integration.
          </p>
        </div>
      </div>

      {/* Mobile/Tablet stacked layout */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-12 flex flex-col items-start gap-8 bg-[#F4F4F4]">
        <div className="flex flex-col items-start gap-2">
          <div className="font-montserrat font-semibold text-[28px] leading-[36px] md:text-[32px] md:leading-[40px] text-[#1A1A1A]">Modularity</div>
          <p className="font-montserrat text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] text-[#1A1A1A]">
            Swap sound drivers, batteries, chipsets, or covers instead of replacing the entire product. Because true innovation respects both you and the planet.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2"><PlusIcon /><span className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A] ml-1 whitespace-nowrap">Sound drivers</span></div>
            <p className="font-montserrat text-[16px] leading-[24px] text-[#1A1A1A] mt-1">Precision-built sound drivers deliver clear, balanced audio designed for real-world listening. Each component is engineered to bring detail, depth and control to every frequency.</p>
          </div>
          <div>
            <div className="flex items-center gap-2"><PlusIcon /><span className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A] ml-1 whitespace-nowrap">Batteries</span></div>
            <p className="font-montserrat text-[16px] leading-[24px] text-[#1A1A1A] mt-1">The battery system is built to deliver long-lasting performance throughout the day. Power that adapts to your rhythm, so the music keeps going when you do.</p>
          </div>
          <div>
            <div className="flex items-center gap-2"><PlusIcon /><span className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A] ml-1 whitespace-nowrap">Chipsets and design covers</span></div>
            <p className="font-montserrat text-[16px] leading-[24px] text-[#1A1A1A] mt-1">Powered by the Snapdragon platform, Legacy 1 delivers faster processing, smarter noise control and seamless AI integration.</p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

export default DetailsSection;


