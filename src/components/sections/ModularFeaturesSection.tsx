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
      {/* Mobile layout - Frame 481700 */}
      <div className="md:hidden w-full max-w-[393px] px-5 py-[50px] flex flex-col items-start gap-[95px] bg-[#F4F4F4]">
        {/* Frame 481699 - Heading section */}
        <div className="w-full flex flex-col items-start gap-[10px]">
          {/* Frame 481698 - Heading container */}
          <div className="w-full h-[64px] flex flex-col items-start gap-0">
            {/* Heading with text shadow */}
            <div className="w-full h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A]" style={{ textShadow: '0px 0px 37.4px #949494' }}>
              Only Change What Needs Changing
            </div>
          </div>
          {/* Description */}
          <p className="w-full h-[140px] font-montserrat font-normal text-[18px] leading-[28px] text-[#1A1A1A]">
            Swappable sound drivers, batteries, chipsets, and design covers. Legacy 1 is built to stay. Why throw away the whole product when just one part needs an upgrade?
          </p>
        </div>

        {/* Frame 481702 - First feature section with gap 58px */}
        <div className="w-full flex flex-col items-start gap-[58px]">
          {/* Frame 481610 - Snapdragon feature */}
          <div className="w-full flex flex-col items-start gap-[5px]">
            <div className="w-full h-[24px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[16px] leading-[24px] text-[#1A1A1A]">Snapdragon feature</div>
            </div>
            <p className="w-full font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Precision-built sound drivers deliver clear, balanced audio designed for real-world listening. Each component is engineered to bring detail, depth and control to every frequency.
            </p>
          </div>

          {/* Frame 481609 - Batteries */}
          <div className="w-full flex flex-col items-start gap-[5px]">
            <div className="w-full h-[24px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[16px] leading-[24px] text-[#1A1A1A]">Batteries</div>
            </div>
            <p className="w-full font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              The battery system is built to deliver long-lasting performance throughout the day. Power that adapts to your rhythm, so the music keeps going when you do.
            </p>
          </div>

          {/* Frame 481613 - Chipsets and design covers */}
          <div className="w-full flex flex-col items-start gap-[5px]">
            <div className="w-full h-[24px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[16px] leading-[24px] text-[#1A1A1A]">Chipsets and design covers</div>
            </div>
            <p className="w-full font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Powered by the Snapdragon platform, Legacy 1 delivers faster processing, smarter noise control and seamless AI integration.
            </p>
          </div>
        </div>

        {/* ExplodedView16_9-2 1 - Image */}
        <div className="relative w-[351px] h-[198px]">
          <OptimizedImage src="/v6/ExplodedView16_9-2 1.png" alt="Exploded modular view" fill fallbackOnly className="object-contain" sizes="351px" />
        </div>

        {/* Frame 481703 - Second feature section with gap 58px */}
        <div className="w-full flex flex-col items-start gap-[58px]">
          {/* Frame 481610 - Snapdragon feature */}
          <div className="w-full flex flex-col items-start gap-[5px]">
            <div className="w-full h-[24px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[16px] leading-[24px] text-[#1A1A1A]">Snapdragon feature</div>
            </div>
            <p className="w-full font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Precision-built sound drivers deliver clear, balanced audio designed for real-world listening. Each component is engineered to bring detail, depth and control to every frequency.
            </p>
          </div>

          {/* Frame 481609 - Batteries */}
          <div className="w-full flex flex-col items-start gap-[5px]">
            <div className="w-full h-[24px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[16px] leading-[24px] text-[#1A1A1A]">Batteries</div>
            </div>
            <p className="w-full font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              The battery system is built to deliver long-lasting performance throughout the day. Power that adapts to your rhythm, so the music keeps going when you do.
            </p>
          </div>

          {/* Frame 481613 - Chipsets and design covers */}
          <div className="w-full flex flex-col items-start gap-[5px]">
            <div className="w-full h-[24px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[16px] leading-[24px] text-[#1A1A1A]">Chipsets and design covers</div>
            </div>
            <p className="w-full font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Powered by the Snapdragon platform, Legacy 1 delivers faster processing, smarter noise control and seamless AI integration.
            </p>
          </div>
        </div>
      </div>

      {/* Tablet layout - Frame 481700 */}
      <div className="hidden md:flex lg:hidden w-full max-w-[834px] px-20 py-[50px] flex flex-col items-start gap-[95px] bg-[#F4F4F4]">
        {/* Frame 481699 - Heading section */}
        <div className="w-full max-w-[674px] flex flex-col items-start gap-[10px]">
          {/* Frame 481698 - Two headings in a row */}
          <div className="w-full h-[76px] flex flex-row flex-wrap items-start gap-x-[17px] gap-y-0">
            {/* First heading - no text shadow */}
            <div className="w-[201px] h-[38px] font-montserrat font-semibold text-[30px] leading-[38px] text-[#1A1A1A]">
              Only Change
            </div>
            {/* Second heading - with text shadow */}
            <div className="w-[572px] h-[38px] font-montserrat font-semibold text-[30px] leading-[38px] text-[#1A1A1A]" style={{ textShadow: '0px 0px 37.4px #949494' }}>
              What Needs Changing
            </div>
          </div>
          {/* Description */}
          <p className="w-full h-[112px] font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A]">
            Swappable sound drivers, batteries, chipsets, and design covers. Legacy 1 is built to stay. Why throw away the whole product when just one part needs an upgrade?
          </p>
        </div>

        {/* Frame 481702 - First feature section with gap 58px */}
        <div className="w-full max-w-[674px] flex flex-col items-start gap-[58px]">
          {/* Frame 481610 - Snapdragon feature */}
          <div className="w-full h-[105px] flex flex-col items-start gap-[5px]">
            <div className="w-full h-[28px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A]">Snapdragon feature</div>
            </div>
            <p className="w-full h-[72px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Precision-built sound drivers deliver clear, balanced audio designed for real-world listening. Each component is engineered to bring detail, depth and control to every frequency.
            </p>
          </div>

          {/* Frame 481609 - Batteries */}
          <div className="w-full h-[81px] flex flex-col items-start gap-[5px]">
            <div className="w-full h-[28px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A]">Batteries</div>
            </div>
            <p className="w-full h-[48px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              The battery system is built to deliver long-lasting performance throughout the day. Power that adapts to your rhythm, so the music keeps going when you do.
            </p>
          </div>

          {/* Frame 481613 - Chipsets and design covers */}
          <div className="w-full h-[81px] flex flex-col items-start gap-[5px]">
            <div className="w-full h-[28px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A]">Chipsets and design covers</div>
            </div>
            <p className="w-full h-[48px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Powered by the Snapdragon platform, Legacy 1 delivers faster processing, smarter noise control and seamless AI integration.
            </p>
          </div>
        </div>

        {/* ExplodedView16_9-2 1 - Image */}
        <div className="relative w-[719px] h-[404px]">
          <OptimizedImage src="/v6/ExplodedView16_9-2 1.png" alt="Exploded modular view" fill fallbackOnly className="object-contain" sizes="719px" />
        </div>

        {/* Frame 481701 - Second feature section with gap 58px */}
        <div className="w-full max-w-[674px] flex flex-col items-start gap-[58px]">
          {/* Frame 481610 - Snapdragon feature */}
          <div className="w-full h-[105px] flex flex-col items-start gap-[5px]">
            <div className="w-full h-[28px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A]">Snapdragon feature</div>
            </div>
            <p className="w-full h-[72px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Precision-built sound drivers deliver clear, balanced audio designed for real-world listening. Each component is engineered to bring detail, depth and control to every frequency.
            </p>
          </div>

          {/* Frame 481609 - Batteries */}
          <div className="w-full h-[81px] flex flex-col items-start gap-[5px]">
            <div className="w-full h-[28px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A]">Batteries</div>
            </div>
            <p className="w-full h-[48px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              The battery system is built to deliver long-lasting performance throughout the day. Power that adapts to your rhythm, so the music keeps going when you do.
            </p>
          </div>

          {/* Frame 481613 - Chipsets and design covers */}
          <div className="w-full h-[81px] flex flex-col items-start gap-[5px]">
            <div className="w-full h-[28px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A]">Chipsets and design covers</div>
            </div>
            <p className="w-full h-[48px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Powered by the Snapdragon platform, Legacy 1 delivers faster processing, smarter noise control and seamless AI integration.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop layout - Frame 481700 */}
      <div className="hidden lg:flex w-full max-w-[1440px] px-[124px] py-[50px] flex flex-col items-center gap-[95px] bg-[#F4F4F4]">
        {/* Frame 481699 - Heading section */}
        <div className="w-full max-w-[1192px] flex flex-col items-start gap-[10px]">
          {/* Frame 481698 - Two headings in a row */}
          <div className="w-full flex flex-row flex-wrap items-start gap-x-[17px] gap-y-0">
            {/* First heading - no text shadow */}
            <div className="font-montserrat font-semibold text-[36px] leading-[44px] text-[#1A1A1A]">
              Only Change
            </div>
            {/* Second heading - with text shadow */}
            <div className="font-montserrat font-semibold text-[36px] leading-[44px] text-[#1A1A1A]" style={{ textShadow: '0px 0px 37.4px #949494' }}>
              What Needs Changing
            </div>
          </div>
          {/* Description */}
          <p className="w-full font-montserrat font-semibold text-[20px] leading-[30px] text-[#1A1A1A]">
            Swap sound drivers, batteries, chipsets, or covers instead of replacing the entire product. Because true innovation respects both you and the planet.
          </p>
        </div>

        {/* Frame 481697 - First row of 3 features (horizontal) */}
        <div className="w-full max-w-[1199px] flex flex-row items-start gap-[58px]">
          {/* Frame 481610 - Snapdragon feature */}
          <div className="flex-1 max-w-[378px] h-[155px] flex flex-col items-start gap-[5px]">
            <div className="w-full h-[30px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[20px] leading-[30px] text-[#1A1A1A]">Snapdragon feature</div>
            </div>
            <p className="w-[327px] h-[120px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Precision-built sound drivers deliver clear, balanced audio designed for real-world listening. Each component is engineered to bring detail, depth and control to every frequency.
            </p>
          </div>

          {/* Frame 481609 - Batteries */}
          <div className="flex-1 max-w-[378px] h-[155px] flex flex-col items-start gap-[5px]">
            <div className="w-full h-[30px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[20px] leading-[30px] text-[#1A1A1A]">Batteries</div>
            </div>
            <p className="w-[327px] h-[120px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              The battery system is built to deliver long-lasting performance throughout the day. Power that adapts to your rhythm, so the music keeps going when you do.
            </p>
          </div>

          {/* Frame 481613 - Chipsets and design covers */}
          <div className="w-[327px] h-[131px] flex flex-col items-start gap-[5px]">
            <div className="w-full h-[30px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[20px] leading-[30px] text-[#1A1A1A]">Chipsets and design covers</div>
            </div>
            <p className="w-full h-[96px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Powered by the Snapdragon platform, Legacy 1 delivers faster processing, smarter noise control and seamless AI integration.
            </p>
          </div>
        </div>

        {/* ExplodedView16_9-2 1 - Image */}
        <div className="relative w-[719px] h-[404px]">
          <OptimizedImage src="/v6/ExplodedView16_9-2 1.png" alt="Exploded modular view" fill fallbackOnly className="object-contain" sizes="719px" />
        </div>

        {/* Frame 481701 - Second row of 3 features (horizontal) */}
        <div className="w-full max-w-[1199px] flex flex-row items-start gap-[58px]">
          {/* Frame 481610 - Snapdragon feature */}
          <div className="flex-1 max-w-[378px] h-[155px] flex flex-col items-start gap-[5px]">
            <div className="w-full h-[30px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[20px] leading-[30px] text-[#1A1A1A]">Snapdragon feature</div>
            </div>
            <p className="w-[327px] h-[120px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Precision-built sound drivers deliver clear, balanced audio designed for real-world listening. Each component is engineered to bring detail, depth and control to every frequency.
            </p>
          </div>

          {/* Frame 481609 - Batteries */}
          <div className="flex-1 max-w-[378px] h-[155px] flex flex-col items-start gap-[5px]">
            <div className="w-full h-[30px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[20px] leading-[30px] text-[#1A1A1A]">Batteries</div>
            </div>
            <p className="w-[327px] h-[120px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              The battery system is built to deliver long-lasting performance throughout the day. Power that adapts to your rhythm, so the music keeps going when you do.
            </p>
          </div>

          {/* Frame 481613 - Chipsets and design covers */}
          <div className="w-[327px] h-[131px] flex flex-col items-start gap-[5px]">
            <div className="w-full h-[30px] flex flex-row items-center gap-2">
              <PlusIcon />
              <div className="font-montserrat font-semibold text-[20px] leading-[30px] text-[#1A1A1A]">Chipsets and design covers</div>
            </div>
            <p className="w-full h-[96px] font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
              Powered by the Snapdragon platform, Legacy 1 delivers faster processing, smarter noise control and seamless AI integration.
            </p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

export default ModularFeaturesSection;


