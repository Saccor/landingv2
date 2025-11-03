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
      {/* Desktop layout: 1440x820 with padding 50 124 and gap 95 */}
      <div className="hidden lg:block relative w-full max-w-[1440px] h-[820px] px-[124px] py-[50px] isolation-isolate">
        {/* Top text group (1192 x 134) */}
        <div className="w-[1192px] h-[134px] flex flex-col items-start gap-[10px]">
          <div className="w-[1192px] h-[60px] flex flex-row flex-wrap items-start gap-x-[17px]">
            <div className="w-[572px] h-[60px] font-montserrat font-semibold text-[48px] leading-[60px] tracking-[-0.02em] text-[#1A1A1A]">
              AI Powered earphones
            </div>
          </div>
          <p className="w-[1192px] h-[64px] font-montserrat font-normal text-[24px] leading-[32px] text-[#1A1A1A] whitespace-pre-line">
            {`Swappable sound drivers, batteries, chipsets, and design covers. Legacy 1 is built to stay.
Why throw away the whole product when just one part needs an upgrade?`}
          </p>
        </div>

        {/* Features column (361 x 491) */}
        <div className="absolute left-[124px]" style={{ top: 50 + 134 + 95 }}>
          <div className="w-[361px] h-[491px] flex flex-col items-start gap-[58px]">
            {/* Feature 1 */}
            <div className="w-[361px] h-[133px] flex flex-col items-start gap-[5px]">
              <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
                <PlusIcon />
                <div className="w-[175px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A]">Sound Drivers</div>
              </div>
              <p className="w-[327px] h-[96px] font-montserrat font-medium text-[16px] leading-[24px] text-[#1A1A1A]">
                Crystal-clear audio, hybrid noise canceling up to 45 dB, and AI-powered sound that adjusts to you for a smarter, more immersive experience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="w-[361px] h-[133px] flex flex-col items-start gap-[5px]">
              <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
                <PlusIcon />
                <div className="w-[112px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A]">Batteries</div>
              </div>
              <p className="w-[327px] h-[96px] font-montserrat font-medium text-[16px] leading-[24px] text-[#1A1A1A]">
                Swappable battery modules with up to 9 hours of playback and 30+ with the case. Because great tech shouldn’t come with an expiry date.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="w-[361px] h-[109px] flex flex-col items-start gap-[5px]">
              <div className="w-[361px] h-[32px] flex flex-row items-center gap-[8px]">
                <PlusIcon />
                <div className="w-[333px] h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A]">Chipsets and Design Cover</div>
              </div>
              <p className="w-[327px] h-[72px] font-montserrat font-medium text-[16px] leading-[24px] text-[#1A1A1A]">
                Replaceable chipsets. Customizable design covers. Upgrade what’s inside. Express what’s outside.
              </p>
            </div>
          </div>
        </div>

        {/* Absolute image 639 x 639 at (626, 181) */}
        <div className="absolute" style={{ left: 626, top: 181, width: 639, height: 639 }}>
          <div className="relative w-full h-full">
            <OptimizedImage src="/v6/whiteheadphone" alt="Modular visual" fill fallbackOnly className="object-contain" sizes="(min-width:1024px) 639px, 100vw" />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet fallback */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-12 flex flex-col items-start gap-6 bg-[#F4F4F4]">
        <div>
          <div className="font-montserrat font-semibold text-[28px] leading-[36px] text-[#1A1A1A]">Only Change</div>
          <div className="font-montserrat font-semibold text-[28px] leading-[36px] text-[#1A1A1A]" style={{ textShadow: '0px 0px 24px #949494' }}>What Needs Changing</div>
        </div>
        <p className="font-montserrat text-[16px] leading-[24px] text-[#1A1A1A] whitespace-pre-line">
          {`Swappable sound drivers, batteries, chipsets, and design covers. Legacy 1 is built to stay.
Why throw away the whole product when just one part needs an upgrade?`}
        </p>
        <div className="relative w-full flex items-center justify-center">
          <div className="relative w-[280px] md:w-[360px] aspect-square">
            <OptimizedImage src="/v6/whiteheadphone" alt="Modular visual" fill fallbackOnly className="object-contain" sizes="100vw" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-6">
          <div>
            <div className="flex items-center gap-2"><PlusIcon /><span className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A] ml-1">Sound Drivers</span></div>
            <p className="font-montserrat text-[16px] leading-[24px] text-[#1A1A1A] mt-1">Crystal-clear audio, hybrid noise canceling up to 45 dB, and AI-powered sound that adjusts to you for a smarter, more immersive experience.</p>
          </div>
          <div>
            <div className="flex items-center gap-2"><PlusIcon /><span className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A] ml-1">Batteries</span></div>
            <p className="font-montserrat text-[16px] leading-[24px] text-[#1A1A1A] mt-1">Swappable battery modules with up to 9 hours of playback and 30+ with the case. Because great tech shouldn’t come with an expiry date.</p>
          </div>
          <div>
            <div className="flex items-center gap-2"><PlusIcon /><span className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A] ml-1">Chipsets and Design Cover</span></div>
            <p className="font-montserrat text-[16px] leading-[24px] text-[#1A1A1A] mt-1">Replaceable chipsets. Customizable design covers. Upgrade what’s inside. Express what’s outside.</p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

export default ModularFeaturesSection;


