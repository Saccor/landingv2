'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import Link from 'next/link';
import Image from 'next/image';

/**
 * NewHeroSection
 * Video background covering the hero, with two overlay "pills":
 *  - Top header pill (logo + nav) per Figma
 *  - Bottom info pill with product title and subtitle
 */
const NewHeroSection: React.FC = () => {
  return (
    <RevealSection className="relative w-full overflow-hidden">
      {/* Hero height per Figma Frame 58 */}
      <div className="relative w-full h-[789px]">
        {/* Full-bleed background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/video/hero-optimized.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Hero background video"
        />

        {/* Overlay container restricted to 1440px canvas for exact positioning */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full max-w-[1440px] mx-auto">
            {/* Top header pill */}
            <div className="hidden lg:flex items-center justify-between absolute left-[113px] top-[19px] w-[1192px] h-[91px] rounded-[30px] bg-[rgba(230,230,230,0.7)] backdrop-blur-[11.5px] px-[40px]">
              <Link href="/" aria-label="Arfve Home" className="shrink-0">
                <Image src="/logo-black.svg" alt="Arfve" width={118} height={31} priority />
              </Link>
              <nav className="flex items-center gap-[22px]">
                <Link href="/sustainability" className="font-montserrat text-[18px] leading-[28px] text-[#1A1A1A]">
                  Sustainability
                </Link>
                <Link href="/privacy" className="font-montserrat text-[18px] leading-[28px] text-[#1A1A1A]">
                  Privacy
                </Link>
              </nav>
            </div>

            {/* Bottom info pill - left computed to 124px for 1440 canvas */}
            <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-start absolute left-[124px] top-[588px] w-[265px] h-[123px] rounded-[30px] bg-[rgba(230,230,230,0.5)] backdrop-blur-[11.5px] p-5">
              <div className="flex flex-col items-start gap-[7px] w-[225px]">
                <div className="font-montserrat font-semibold text-[36px] leading-[44px] text-[#1A1A1A] text-center whitespace-nowrap">
                  Legacy 1
                </div>
                <div className="font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A] w-[225px]">
                  First AI earphones
                </div>
              </div>
            </div>

            {/* Mobile/Tablet header pill only (remove centered gray block) */}
            <div className="lg:hidden absolute left-4 right-4 top-3 flex items-center justify-between rounded-[20px] bg-[rgba(230,230,230,0.7)] backdrop-blur-[11.5px] px-4 py-3">
              <Link href="/" aria-label="Arfve Home" className="shrink-0">
                <Image src="/logo-black.svg" alt="Arfve" width={90} height={24} priority />
              </Link>
              <nav className="flex items-center gap-4">
                <Link href="/sustainability" className="font-montserrat text-[14px] leading-[20px] text-[#1A1A1A]">
                  Sustainability
                </Link>
                <Link href="/privacy" className="font-montserrat text-[14px] leading-[20px] text-[#1A1A1A]">
                  Privacy
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

export default NewHeroSection;


