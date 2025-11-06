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

const ModularFeaturesSection: React.FC = () => {
  return (
    <RevealSection className="relative w-full flex justify-center bg-[#F4F4F4] overflow-hidden">
      {/* Desktop layout: 1440x1302 with padding 50 124 and gap 95 */}
      <div className="hidden lg:flex relative w-full max-w-[1440px] h-[1302px] px-[124px] py-[50px] flex-col items-center gap-[95px] isolation-isolate">
        {/* Frame 481699 - Top heading & subheading (1192 x 134) */}
        <div className="w-[1192px] h-[134px] flex flex-col items-start gap-[10px]">
          <div className="w-[1192px] h-[60px] flex flex-row flex-wrap items-start gap-x-[17px]">
            <div className="w-[156px] h-[60px] font-montserrat font-semibold text-[48px] leading-[60px] text-[#1A1A1A]">
              Modularity
            </div>
          </div>
          <p className="w-[1192px] h-[64px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A]">
            Swap sound drivers, batteries, chipsets, or covers instead of replacing the entire product. Because true innovation respects both you and the planet.
          </p>
        </div>

        {/* Frame 481697 - Row of 3 features (1199 x 157) */}
        <div className="w-[1199px] h-[157px] flex flex-row items-start gap-[58px]">
          {/* Feature 1 */}
          <div className="w-[361px] h-[157px] flex flex-col items-start gap-[5px]">
            <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
              <PlusIcon />
              <div className="w-[247px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A]">Sound drivers</div>
            </div>
            <p className="w-[327px] h-[120px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Precision-built sound drivers deliver clear, balanced audio designed for real-world listening. Each component is engineered to bring detail, depth and control to every frequency.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="w-[361px] h-[157px] flex flex-col items-start gap-[5px]">
            <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
              <PlusIcon />
              <div className="w-[112px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A]">Batteries</div>
            </div>
            <p className="w-[327px] h-[120px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              The battery system is built to deliver long-lasting performance throughout the day. Power that adapts to your rhythm, so the music keeps going when you do.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="w-[361px] h-[133px] flex flex-col items-start gap-[5px]">
            <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
              <PlusIcon />
              <div className="w-[333px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A] whitespace-nowrap">Chipsets and design covers</div>
            </div>
            <p className="w-[327px] h-[96px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Powered by the Snapdragon platform, Legacy 1 delivers faster processing, smarter noise control and seamless AI integration.
            </p>
          </div>
        </div>

        {/* Exploded view image (834 x 469) */}
        <div className="w-[834px] h-[469px]">
          <div className="relative w-full h-full">
            <OptimizedImage src="/v6/ExplodedView16_9-2 1.png" alt="Exploded modular view" fill fallbackOnly className="object-contain" sizes="(min-width:1024px) 834px, 100vw" />
          </div>
        </div>

        {/* Frame 481701 - Second row of 3 features (1199 x 157) */}
        <div className="w-[1199px] h-[157px] flex flex-row items-start gap-[58px]">
          {/* Feature 4 */}
          <div className="w-[361px] h-[157px] flex flex-col items-start gap-[5px]">
            <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
              <PlusIcon />
              <div className="w-[247px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A]">Sound drivers</div>
            </div>
            <p className="w-[327px] h-[120px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Precision-built sound drivers deliver clear, balanced audio designed for real-world listening. Each component is engineered to bring detail, depth and control to every frequency.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="w-[361px] h-[157px] flex flex-col items-start gap-[5px]">
            <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
              <PlusIcon />
              <div className="w-[112px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A]">Batteries</div>
            </div>
            <p className="w-[327px] h-[120px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              The battery system is built to deliver long-+
               performance throughout the day. Power that adapts to your rhythm, so the music keeps going when you do.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="w-[361px] h-[133px] flex flex-col items-start gap-[5px]">
            <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
              <PlusIcon />
              <div className="w-[333px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A] whitespace-nowrap">Chipsets and design covers</div>
            </div>
            <p className="w-[327px] h-[96px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Powered by the Snapdragon platform, Legacy 1 delivers faster processing, smarter noise control and seamless AI integration.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet stacked layout */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-12 flex flex-col items-center gap-10 bg-[#F4F4F4]">
        <div className="w-full flex flex-col items-start gap-2">
          <div className="font-montserrat font-semibold text-[32px] leading-[40px] text-[#1A1A1A]">Modularity</div>
          <p className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A]">
            Swap sound drivers, batteries, chipsets, or covers instead of replacing the entire product. Because true innovation respects both you and the planet.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-8">
          <div>
            <div className="flex items-center gap-2"><PlusIcon /><span className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A] ml-1">Sound drivers</span></div>
            <p className="font-montserrat text-[16px] leading-[24px] text-[#1A1A1A] mt-1">Precision-built sound drivers deliver clear, balanced audio designed for real-world listening. Each component is engineered to bring detail, depth and control to every frequency.</p>
          </div>
          <div>
            <div className="flex items-center gap-2"><PlusIcon /><span className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A] ml-1">Batteries</span></div>
            <p className="font-montserrat text-[16px] leading-[24px] text-[#1A1A1A] mt-1">The battery system is built to deliver long-lasting performance throughout the day. Power that adapts to your rhythm, so the music keeps going when you do.</p>
          </div>
          <div>
            <div className="flex items-center gap-2"><PlusIcon /><span className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A] ml-1 whitespace-nowrap">Chipsets and design covers</span></div>
            <p className="font-montserrat text-[16px] leading-[24px] text-[#1A1A1A] mt-1">Powered by the Snapdragon platform, Legacy 1 delivers faster processing, smarter noise control and seamless AI integration.</p>
          </div>
        </div>
        <div className="relative w-full flex items-center justify-center">
          <div className="relative w-[320px] md:w-[480px] aspect-[834/469]">
            <OptimizedImage src="/v6/whiteheadphone.png" alt="Exploded modular view" fill fallbackOnly className="object-contain" sizes="100vw" />
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-8">
          <div>
            <div className="flex items-center gap-2"><PlusIcon /><span className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A] ml-1">Sound drivers</span></div>
            <p className="font-montserrat text-[16px] leading-[24px] text-[#1A1A1A] mt-1">Precision-built sound drivers deliver clear, balanced audio designed for real-world listening. Each component is engineered to bring detail, depth and control to every frequency.</p>
          </div>
          <div>
            <div className="flex items-center gap-2"><PlusIcon /><span className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A] ml-1">Batteries</span></div>
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

export default ModularFeaturesSection;


