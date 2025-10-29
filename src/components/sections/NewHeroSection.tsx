'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Link from 'next/link';

/**
 * NewHeroSection
 * Desktop follows absolute positioning from Figma; mobile/tablet use stacked layout.
 * CTA intentionally omitted (to be placed in the next section).
 */
const NewHeroSection: React.FC = () => {
  return (
    <RevealSection className="relative w-full flex justify-center bg-white overflow-hidden">
      {/* Desktop fixed canvas (1440 x 675) */}
      <div className="hidden lg:block relative w-full max-w-[1440px] h-[675px]">
        {/* Radial gradient ellipse (934 x 934) */}
        <div
          className="absolute w-[934px] h-[934px] pointer-events-none"
          style={{
            left: 'calc(50% - 934px/2 + 21px)',
            top: 'calc(50% - 934px/2 - 76.5px)',
            background: 'radial-gradient(50% 50% at 50% 50%, #949292 0%, rgba(228, 228, 228, 0) 100%)',
          }}
        />

        {/* Absolute product image: 550 x 306 at (445, 97) */}
        <div className="absolute" style={{ left: 445, top: 97, width: 550, height: 306 }}>
          <div className="relative w-full h-full">
            <OptimizedImage
              src="/v6/heroheadphones"
              alt="Hero visual"
              fill
              fallbackOnly
              className="object-contain"
              sizes="(min-width: 1024px) 550px, 100vw"
            />
          </div>
        </div>

        {/* Frame 8: centered column with gap 21 at top: 448px */}
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{ left: '4.79%', right: '4.86%', top: 448, height: 214, gap: 21 }}
        >
          <h1 className="font-montserrat font-semibold text-[72px] leading-[90px] text-center text-[#1A1A1A] w-[332px] h-[90px]">
            Legacy 1
          </h1>
          <h2 className="font-montserrat font-semibold text-[30px] leading-[38px] text-center text-[#1A1A1A] w-[1301px] h-[38px]">
            First AI earphones
          </h2>
          <Link href="#signup" className="flex items-center border border-black rounded-[55px] h-[44px] px-5" style={{ gap: 10 }}>
            <span className="font-montserrat font-normal text-[16px] leading-[24px] text-black">Buy it</span>
          </Link>
        </div>
      </div>

      {/* Mobile/Tablet responsive layout (temporary fallback) */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-12 flex flex-col items-center gap-6 bg-white">
        <div className="relative w-[260px] md:w-[320px] aspect-[550/306]">
          <OptimizedImage src="/v6/heroheadphones" alt="Hero visual" fill fallbackOnly className="object-contain" sizes="100vw" />
        </div>
        <h1 className="font-montserrat font-semibold text-[36px] leading-[46px] md:text-[48px] md:leading-[58px] text-center text-[#1A1A1A]">
          Legacy 1
        </h1>
        <h2 className="font-montserrat font-semibold text-[18px] leading-[28px] md:text-[22px] md:leading-[32px] text-center text-[#1A1A1A]/90">
          First AI earphones
        </h2>
        <Link href="#signup" className="h-[40px] px-4 rounded-[55px] border border-black text-[#1A1A1A] font-montserrat text-[14px] leading-[20px] flex items-center">
          Buy it
        </Link>
      </div>
    </RevealSection>
  );
};

export default NewHeroSection;


