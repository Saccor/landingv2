'use client';

import React, { useState } from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <RevealSection className="relative w-full overflow-hidden">
      {/* Hero container - Full width on all screen sizes for proper video filling */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[789px]">
        {/* Mobile video - vertical version */}
        <video
          className="md:hidden absolute inset-0 w-full h-full object-cover"
          src="/v6/hero/HeroBothVersionsLoopVertical.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Hero background video"
        />
        {/* Tablet video - square version */}
        <video
          className="hidden md:block lg:hidden absolute inset-0 w-full h-full object-cover"
          src="/v6/hero/HeroVideoSquare.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Hero background video"
        />
        {/* Desktop video - horizontal version */}
        <video
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          src="/v6/HeroBothVersionsLoop.mp4"
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
            {/* Debug labels - remove when done */}
            <div className="md:hidden absolute left-2 top-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-50">
              mobile
            </div>
            <div className="hidden md:block lg:hidden absolute left-2 top-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold z-50">
              tablet
            </div>
            <div className="hidden lg:block absolute left-2 top-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold z-50">
              desktop
            </div>

            {/* Responsive header pill - maintains consistent distance from edges */}
            <div className="absolute flex flex-row items-center justify-between box-border rounded-[30px] bg-[rgba(230,230,230,0.7)] backdrop-blur-[11.5px] isolation-isolate
              /* Mobile - smaller margin */
              left-4 top-[7px] right-4 h-[91px] py-[30px] px-[40px]
              /* Tablet and up - desktop margin */
              md:left-[113px] md:top-[19px] md:right-[113px] md:h-[91px]
            ">
              {/* Logo - centered on mobile, left-aligned on tablet/desktop */}
              <Link href="/" aria-label="Arfve Home" className="
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                md:relative md:left-0 md:top-0 md:translate-x-0 md:translate-y-0
                w-[118px] h-[31px] flex-none z-0
              ">
                <Image src="/logo-black.svg" alt="Arfve" width={118} height={31} priority />
              </Link>
              
              {/* Navigation links - hidden on mobile, visible on tablet/desktop */}
              <nav className="hidden md:flex items-center gap-[22px] flex-none order-1">
                <Link href="/sustainability" className="font-montserrat font-normal text-[18px] leading-[28px] text-[#1A1A1A] w-[122px] h-[28px] flex-none">
                  Sustainability
                </Link>
                <Link href="/privacy" className="font-montserrat font-normal text-[18px] leading-[28px] text-[#1A1A1A] w-[65px] h-[28px] flex-none">
                  Privacy
                </Link>
              </nav>

              {/* Hamburger menu button - only visible on mobile */}
              <button
                onClick={toggleMenu}
                className="md:hidden absolute flex flex-col justify-between items-start gap-[3px] w-[20px] h-[13px] p-0 right-[35px] top-1/2 -translate-y-1/2 flex-none z-[1]"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <span className="w-[20px] h-0 border border-black flex-none self-stretch" />
                <span className="w-[20px] h-0 border border-black flex-none self-stretch" />
                <span className="w-[20px] h-0 border border-black flex-none self-stretch" />
              </button>

              {/* Dropdown menu - only visible on mobile */}
              {isMenuOpen && (
                <div className="md:hidden absolute right-[35px] top-[calc(100%+8px)] flex flex-col items-start gap-2 bg-[rgba(230,230,230,0.95)] backdrop-blur-[11.5px] rounded-[20px] px-4 py-3 min-w-[120px] z-10">
                  <Link 
                    href="/sustainability" 
                    className="font-montserrat text-[14px] leading-[20px] text-[#1A1A1A] hover:opacity-70 transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sustainability
                  </Link>
                  <Link 
                    href="/privacy" 
                    className="font-montserrat text-[14px] leading-[20px] text-[#1A1A1A] hover:opacity-70 transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Privacy
                  </Link>
                </div>
              )}
            </div>

            {/* Bottom info text - matches desktop position, responsive sizing */}
            {/* Desktop: 789px height, top: 588px (74.5% from top) */}
            {/* Mobile: 500px height, top: 372px (74.5% from top) */}
            {/* Tablet: 600px height, top: 447px (74.5% from top) */}
            <div className="absolute left-[124px] top-[372px] md:top-[447px] lg:top-[588px]">
              <div className="flex flex-col items-start gap-[7px]">
                {/* Mobile: 28px, Tablet: 32px, Desktop: 36px - proportional scaling */}
                <div className="font-montserrat font-semibold text-[28px] leading-[34px] md:text-[32px] md:leading-[40px] lg:text-[36px] lg:leading-[44px] text-white mix-blend-difference whitespace-nowrap">
                  Legacy 1
                </div>
                {/* Mobile: 18px, Tablet: 20px, Desktop: 24px - proportional scaling */}
                <div className="font-montserrat font-semibold text-[18px] leading-[20px] md:text-[20px] md:leading-[24px] lg:text-[24px] lg:leading-[32px] text-white mix-blend-difference">
                  First AI earphones
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

export default NewHeroSection;


