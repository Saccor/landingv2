'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import OptimizedImage from '@/components/ui/OptimizedImage';

/**
 * NewHeroSection
 * Desktop follows absolute positioning from Figma; mobile/tablet use stacked layout.
 * CTA intentionally omitted (to be placed in the next section).
 */
const NewHeroSection: React.FC = () => {
  return (
    <RevealSection className="relative w-full flex justify-center bg-black overflow-hidden">
      {/* Desktop fixed canvas */}
      <div className="hidden lg:block relative w-full max-w-[1440px] h-[691px]">
        {/* Image container (white rectangle) */}
        <div className="absolute left-[137px] top-[66px] w-[503px] h-[625px] bg-white rounded-sm overflow-hidden z-0">
          <div className="absolute inset-0">
            <OptimizedImage
              src="/headphones"
              alt="Arfve Legacy1 product"
              fill
              fallbackOnly
              className="object-contain"
              sizes="(min-width: 1024px) 503px, 100vw"
              quality={85}
            />
          </div>
        </div>

        {/* Heading block */}
        <div className="absolute left-[657px] top-[193px] w-[620px] h-[227px] flex items-center justify-center z-10">
          <div className="relative w-full h-full">
            {/* Small gradient label positioned above container top by 51px */}
            <div
              className="absolute w-[620px] h-[59px] left-[14px] text-center text-[48px] leading-[60px] font-semibold font-montserrat"
              style={{
                top: '-51px',
                background: 'linear-gradient(90deg, #FCFCFD 0%, #969797 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: '0px 0px 37.4px #FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              Legacy1
            </div>

            {/* Main heading at top: 39px */}
            <h1
              className="absolute left-0 w-[620px] text-center text-[48px] leading-[60px] font-semibold font-montserrat tracking-[-0.02em] text-[#FCFCFD]"
              style={{ top: '39px' }}
            >
              The World’s First
              <br />
              AI-Powered 3-Pieces
              <br />
              Modular Earbuds.
            </h1>
          </div>
        </div>

        {/* Subheading */}
        <p className="absolute left-[743px] top-[430px] w-[506px] h-[56px] text-center font-montserrat text-[18px] leading-[28px] text-white z-10">
          Swap parts. Upgrade freely. AI adapts to you. Tech that
          listens, learns, and puts you in control.
        </p>

        {/* Decorative vertical bar (Frame 481677) */}
        <div className="absolute left-[883px] top-[108px] w-[24px] h-[72px] rounded-full bg-gradient-to-b from-[#2a2a2a] to-[#0f0f0f] opacity-60 z-0" />
      </div>

      {/* Mobile/Tablet responsive layout */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-12 flex flex-col items-center gap-6">
        {/* Mobile image container above text */}
        <div className="w-[300px] md:w-[360px] aspect-[503/625] bg-white rounded-sm overflow-hidden">
          <div className="relative w-full h-full">
            <OptimizedImage
              src="/headphones"
              alt="Arfve Legacy1 product"
              fill
              fallbackOnly
              className="object-contain"
              sizes="100vw"
              quality={85}
            />
          </div>
        </div>
        <div
          className="text-[32px] leading-[40px] md:text-[40px] md:leading-[52px] font-semibold font-montserrat text-center"
          style={{
            background: 'linear-gradient(90deg, #FCFCFD 0%, #969797 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0px 0px 24px #FFFFFF',
          }}
        >
          Legacy1
        </div>
        <h1 className="text-center text-[28px] leading-[36px] md:text-[36px] md:leading-[46px] font-semibold font-montserrat tracking-[-0.02em] text-[#FCFCFD]">
          The World’s First AI-Powered 3-Pieces Modular Earbuds.
        </h1>
        <p className="text-center text-[14px] leading-[22px] md:text-[18px] md:leading-[28px] text-white font-montserrat max-w-[520px]">
          Swap parts. Upgrade freely. AI adapts to you. Tech that listens, learns, and puts you in control.
        </p>
      </div>
    </RevealSection>
  );
};

export default NewHeroSection;


