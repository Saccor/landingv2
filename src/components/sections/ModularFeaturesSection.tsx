'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Button from '@/components/ui/Button';

const ModularFeaturesSection: React.FC = () => {
  return (
    <RevealSection className="relative w-full flex justify-center bg-[#020202] overflow-hidden">
      {/* Desktop/Large layout (absolute to match Figma) */}
      <div className="hidden lg:block relative w-full max-w-[1440px] h-[979px]">
        {/* Headings */}
        <div className="absolute left-[86px] top-[75px] w-[685px] h-[60px] z-10">
          <div className="absolute left-0 top-0 w-[312px] h-[60px] text-white font-montserrat font-semibold text-[48px] leading-[60px] tracking-[-0.02em]">
            Only Change
          </div>
          <div className="absolute left-[329px] top-0 w-[572px] h-[60px] text-white font-montserrat font-semibold text-[48px] leading-[60px] tracking-[-0.02em]" style={{ textShadow: '0px 0px 37.4px #FFFFFF' }}>
            What Needs Changing
          </div>
        </div>
        <p className="absolute left-[86px] top-[145px] w-[1332px] h-[64px] font-montserrat text-white text-[24px] leading-[32px] z-10">
          Swappable sound drivers, batteries, chipsets, and design covers. Legacy1 is built to stay.
          <br />
          Why throw away the whole product when just one part needs an upgrade?
        </p>

        {/* Three product images positioned centered above each text column */}
        {/* Calculated left offsets: columnLeft + (345 - 145.16)/2 ≈ columnLeft + 99.92 */}
        <div className="absolute left-[202px] top-[187.63px] w-[145.16px] h-[492px] z-0 pointer-events-none">
          <div className="relative w-full h-full">
            <OptimizedImage src="/headphones2-1" alt="Sound Drivers" fill fallbackOnly className="object-contain" />
          </div>
        </div>
        <div className="absolute left-[646.92px] top-[187.63px] w-[145.16px] h-[492px] z-0 pointer-events-none">
          <div className="relative w-full h-full">
            <OptimizedImage src="/headphones2" alt="Chipsets and Design" fill fallbackOnly className="object-contain" />
          </div>
        </div>
        <div className="absolute left-[1091.92px] top-[187.63px] w-[145.16px] h-[492px] z-0 pointer-events-none">
          <div className="relative w-full h-full">
            <OptimizedImage src="/headphones2-2" alt="Batteries" fill fallbackOnly className="object-contain" />
          </div>
        </div>

        {/* Feature cards text blocks */}
        <div className="absolute left-[102px] top-[639px] w-[345px] h-[133px] flex flex-col items-start gap-[8px]">
          <div className="flex items-center gap-2 h-[32px] w-full">
            <div className="w-[10px] h-[10px] rounded-full bg-[#06DF73]" />
            <div className="text-white font-montserrat font-semibold text-[24px] leading-[32px]">Sound Drivers</div>
          </div>
          <p className="w-[327px] h-[96px] text-white font-montserrat font-medium text-[16px] leading-[24px] text-left">
            Crystal-clear audio, hybrid noise canceling up to 45 dB, and AI-powered sound that adjusts to you for a smarter, more immersive experience.
          </p>
        </div>

        <div className="absolute left-[547px] top-[639px] w-[345px] h-[133px] flex flex-col items-start gap-[8px]">
          <div className="flex items-center gap-2 h-[32px] w-full">
            <div className="w-[10px] h-[10px] rounded-full bg-[#06DF73]" />
            <div className="text-white font-montserrat font-semibold leading-[32px] whitespace-nowrap text-[22px] tracking-[-0.01em]">Chipsets and Design Cover</div>
          </div>
          <p className="w-[327px] h-[72px] text-white font-montserrat font-medium text-[16px] leading-[24px] text-left">
            Replaceable chipsets. Customizable design covers. Upgrade what’s inside. Express what’s outside.
          </p>
        </div>

        <div className="absolute left-[992px] top-[639px] w-[345px] h-[133px] flex flex-col items-start gap-[8px]">
          <div className="flex items-center gap-2 h-[32px] w-full">
            <div className="w-[10px] h-[10px] rounded-full bg-[#06DF73]" />
            <div className="text-white font-montserrat font-semibold text-[24px] leading-[32px]">Batteries</div>
          </div>
          <p className="w-[327px] h-[96px] text-white font-montserrat font-medium text-[16px] leading-[24px] text-left">
            Swappable battery modules with up to 9 hours of playback and 30+ with the case. Because great tech shouldn’t come with an expiry date.
          </p>
        </div>

        {/* Bottom tagline */}
        <p className="absolute left-[399px] top-[825px] w-[641px] h-[32px] font-montserrat text-[24px] leading-[32px] text-[#A1A3A5] text-center">
          Arfve’s 3-piece modular system makes it easy to swap
        </p>

        {/* CTA buttons */}
        <div className="absolute left-[535px] top-[884px] w-[347px] h-[44px] flex items-center justify-center gap-3">
          <Button variant="secondary" size="md" className="flex items-center justify-center w-[165px] h-[44px] px-5 border border-[#808080] rounded-[55px] font-montserrat text-[14px] leading-[20px] tracking-normal">
            See How It Works
          </Button>
          <Button variant="primary" size="md" className="flex items-center justify-center w-[170px] h-[44px] px-5 rounded-[55px] font-montserrat text-[14px] leading-[20px] tracking-normal">
            Reserve Your Spot
          </Button>
        </div>
      </div>

      {/* Mobile/Tablet responsive layout */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-12 flex flex-col items-center gap-8">
        {/* Headings */}
        <div className="text-center">
          <div className="text-white font-montserrat font-semibold text-[28px] leading-[36px] md:text-[36px] md:leading-[46px]">
            Only Change
          </div>
          <div className="text-white font-montserrat font-semibold text-[28px] leading-[36px] md:text-[36px] md:leading-[46px]" style={{ textShadow: '0px 0px 24px #FFFFFF' }}>
            What Needs Changing
          </div>
        </div>
        <p className="text-center font-montserrat text-white/90 text-[16px] leading-[24px] md:text-[18px] md:leading-[28px]">
          Swappable sound drivers, batteries, chipsets, and design covers. Legacy1 is built to stay.
          <br />
          Why throw away the whole product when just one part needs an upgrade?
        </p>

        {/* Images row */}
        <div className="w-full flex items-center justify-center gap-6 md:gap-10">
          <div className="w-[90px] md:w-[110px] aspect-[145/492]">
            <div className="relative w-full h-full">
              <OptimizedImage src="/headphones2-1" alt="Sound Drivers" fill fallbackOnly className="object-contain" />
            </div>
          </div>
          <div className="w-[90px] md:w-[110px] aspect-[145/492]">
            <div className="relative w-full h-full">
              <OptimizedImage src="/headphones2" alt="Chipsets and Design" fill fallbackOnly className="object-contain" />
            </div>
          </div>
          <div className="w-[90px] md:w-[110px] aspect-[145/492]">
            <div className="relative w-full h-full">
              <OptimizedImage src="/headphones2-2" alt="Batteries" fill fallbackOnly className="object-contain" />
            </div>
          </div>
        </div>

        {/* Features stacked */}
        <div className="w-full max-w-[850px] grid grid-cols-1 gap-8">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#06DF73]" />
              <span className="text-white font-montserrat font-semibold text-[20px] leading-[28px]">Sound Drivers</span>
            </div>
            <p className="text-white/90 font-montserrat text-[16px] leading-[24px]">
              Crystal-clear audio, hybrid noise canceling up to 45 dB, and AI-powered sound that adjusts to you for a smarter, more immersive experience.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#06DF73]" />
              <span className="text-white font-montserrat font-semibold text-[20px] leading-[28px] whitespace-nowrap">Chipsets and Design Cover</span>
            </div>
            <p className="text-white/90 font-montserrat text-[16px] leading-[24px]">
              Replaceable chipsets. Customizable design covers. Upgrade what’s inside. Express what’s outside.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#06DF73]" />
              <span className="text-white font-montserrat font-semibold text-[20px] leading-[28px]">Batteries</span>
            </div>
            <p className="text-white/90 font-montserrat text-[16px] leading-[24px]">
              Swappable battery modules with up to 9 hours of playback and 30+ with the case. Because great tech shouldn’t come with an expiry date.
            </p>
          </div>
        </div>

        <p className="text-center font-montserrat text-[#A1A3A5] text-[16px] leading-[24px] md:text-[18px] md:leading-[28px]">
          Arfve’s 3-piece modular system makes it easy to swap
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" size="md" className="h-[40px] px-4 rounded-[55px] border border-[#808080] font-montserrat text-[14px] leading-[20px] tracking-normal">See How It Works</Button>
          <Button variant="primary" size="md" className="h-[40px] px-5 rounded-[55px] font-montserrat text-[14px] leading-[20px] tracking-normal">Reserve Your Spot</Button>
        </div>
      </div>
    </RevealSection>
  );
};

export default ModularFeaturesSection;


