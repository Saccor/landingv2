'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import OptimizedImage from '@/components/ui/OptimizedImage';

function Bullet({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 h-[28px] md:h-[32px] w-full md:w-[345px]">
      <span className="w-2 h-2 md:w-[10px] md:h-[10px] rounded-full bg-[#06DF73]" />
      <span className="text-white font-montserrat font-semibold text-[16px] leading-[24px] md:text-[24px] md:leading-[32px] md:whitespace-nowrap">{text}</span>
    </div>
  );
}

const AppIntelligenceSection: React.FC = () => {
  return (
    <RevealSection className="relative w-full flex justify-center bg-[#020202] overflow-hidden">
      {/* Desktop: absolute to match Figma */}
      <div className="hidden lg:block relative w-full max-w-[1440px] h-[701px]">
        {/* Headings group */}
        <div className="absolute left-[86px] top-[49px] w-[805px] h-[120px]">
          <div className="flex flex-row items-start gap-0 w-[760px] h-[60px]">
            <div className="w-[331px] h-[60px] text-white font-montserrat font-semibold text-[48px] leading-[60px] tracking-[-0.02em]">
              The App That
            </div>
            <div className="w-[429px] h-[60px] text-white font-montserrat font-semibold text-[48px] leading-[60px] tracking-[-0.02em]" style={{ textShadow: '0px 0px 37.4px #FFFFFF' }}>
              Understands You.
            </div>
          </div>
          <div className="w-[805px] h-[60px] text-[#FCFCFD] font-montserrat font-semibold text-[48px] leading-[60px] tracking-[-0.02em]">
            Not the Other Way Around.
          </div>
        </div>

        {/* Body copy */}
        <p className="absolute left-[86px] top-[191px] w-[766px] h-[112px] text-white font-montserrat text-[18px] leading-[28px]">
          Together with the earbuds, the Arfve app creates a modular intelligence system. Powered by both an on-device OS and the app, this adaptive setup runs AI locally, giving you more privacy, more speed, and full control over your experience. Discover features like:
        </p>

        {/* Bullet grid */}
        <div className="absolute left-[86px] top-[371px] w-[783px] h-[220px]">
          <div className="absolute left-0 top-0">
            <Bullet text="Live transcription & notes" />
          </div>
          <div className="absolute left-[436.5px] top-0">
            <Bullet text="Smart energy-saving" />
          </div>
          <div className="absolute left-0 top-[83.33px]">
            <Bullet text="Personalized EQ profiles" />
          </div>
          <div className="absolute left-[436.5px] top-[83.33px]">
            <Bullet text="Intent-based control" />
          </div>
          <div className="absolute left-0 top-[166.67px]">
            <Bullet text="Voice translation" />
          </div>
        </div>

        {/* Phone image on the right */}
        <div className="absolute left-[970px] top-[49px] w-[316px] h-[542px]">
          <div className="relative w-full h-full">
            <OptimizedImage src="/phone" alt="Arfve app phone" fill fallbackOnly className="object-contain" />
          </div>
        </div>
      </div>

      {/* Mobile / Tablet */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-10 flex flex-col gap-6">
        <div className="text-white font-montserrat font-semibold text-[28px] leading-[36px] md:text-[32px] md:leading-[40px]">
          The App That Understands You.
          <br />
          Not the Other Way Around.
        </div>
        <p className="text-white/90 font-montserrat text-[16px] leading-[24px] md:text-[18px] md:leading-[28px]">
          Together with the earbuds, the Arfve app creates a modular intelligence system. Powered by both an on-device OS and the app, this adaptive setup runs AI locally, giving you more privacy, more speed, and full control over your experience. Discover features like:
        </p>
        {/* Content grid: bullets and phone */}
        <div className="flex flex-col md:grid md:grid-cols-[1fr_260px] md:gap-8 items-center md:items-start gap-6">
          <div className="w-full max-w-[783px] grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-6 md:gap-y-4 order-2 md:order-1">
            <Bullet text="Live transcription & notes" />
            <Bullet text="Personalized EQ profiles" />
            <Bullet text="Voice translation" />
            <Bullet text="Smart energy-saving" />
            <Bullet text="Intent-based control" />
          </div>
          <div className="block w-[220px] h-[380px] sm:w-[240px] sm:h-[410px] md:w-[260px] md:h-[460px] order-1 md:order-2">
            <div className="relative w-full h-full">
              <OptimizedImage src="/phone" alt="Arfve app phone" fill fallbackOnly className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

export default AppIntelligenceSection;


