'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoSrc, setCurrentVideoSrc] = useState<string>('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.warn('Video failed to load:', e.currentTarget.src);
    // Silently handle the error to prevent console spam
  };

  // Determine video source based on screen size
  useEffect(() => {
    const updateVideoSrc = () => {
      if (typeof window === 'undefined') return;

      const width = window.innerWidth;
      let src = '';

      if (width < 768) {
        src = '/v6/hero/HeroBothVersionsLoopVertical.mp4';
      } else if (width < 1024) {
        src = '/v6/hero/HeroVideoSquare_compressed.mp4';
      } else {
        src = '/v6/HeroBothVersionsLoop.mp4';
      }

      setCurrentVideoSrc(src);
    };

    updateVideoSrc();
    window.addEventListener('resize', updateVideoSrc);

    return () => window.removeEventListener('resize', updateVideoSrc);
  }, []);

  // Cleanup video on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    };
  }, []);

  return (
    <RevealSection className="relative w-full overflow-hidden">
      {/* Hero container - Full width on all screen sizes for proper video filling */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[789px]">
        {/* Single responsive video element */}
        {currentVideoSrc && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={currentVideoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Hero background video"
            onError={handleVideoError}
          />
        )}

        {/* Overlay container restricted to 1440px canvas for exact positioning */}
        <div className="absolute inset-0">
          {/* Responsive header pill - 50px margins all around */}
          <div className="absolute flex flex-row items-center justify-between box-border rounded-[30px] bg-[rgba(230,230,230,0.7)] backdrop-blur-[11.5px] isolation-isolate z-20
            /* Mobile - 50px margins */
            left-[50px] top-[50px] right-[50px] h-[82px] py-[27px] px-[40px]
            /* Tablet and up - 50px margins */
            md:left-[50px] md:top-[50px] md:right-[50px] md:h-[82px]
          ">
            {/* Logo - centered on mobile, left-aligned on tablet/desktop */}
            <Link href="/" aria-label="Arfve Home" className="
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                md:relative md:left-0 md:top-0 md:translate-x-0 md:translate-y-0
                flex-none z-10 flex items-center justify-center
              ">
              <Image
                src="/v6/logo.svg"
                alt="Arfve"
                width={131}
                height={46}
                priority
                className="w-[130px] h-[34px] object-contain"
              />
            </Link>

            {/* Navigation links - hidden on mobile, visible on tablet/desktop */}
            <nav className="hidden md:flex items-center gap-[22px] flex-none order-1 z-30 relative">
              <Link href="/sustainability" className="font-montserrat font-normal text-[18px] leading-[28px] text-[#1A1A1A] transition-all duration-200 px-2 py-1 rounded cursor-pointer relative z-40">
                Sustainability
              </Link>
              <Link href="/privacy" className="font-montserrat font-normal text-[18px] leading-[28px] text-[#1A1A1A] transition-all duration-200 px-2 py-1 rounded cursor-pointer relative z-40">
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
              <div className="md:hidden absolute right-[35px] top-[calc(100%+8px)] flex flex-col items-start gap-2 bg-[rgba(230,230,230,0.95)] backdrop-blur-[11.5px] rounded-[20px] px-4 py-3 min-w-[120px] z-50">
                <Link
                  href="/sustainability"
                  className="font-montserrat text-[14px] leading-[20px] text-[#1A1A1A] hover:bg-black/10 transition-all duration-200 px-2 py-1 rounded w-full cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sustainability
                </Link>
                <Link
                  href="/privacy"
                  className="font-montserrat text-[14px] leading-[20px] text-[#1A1A1A] hover:bg-black/10 transition-all duration-200 px-2 py-1 rounded w-full cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Privacy
                </Link>
              </div>
            )}
          </div>

          {/* Bottom info text - 50px from bottom of frame, aligned with container left margin */}
          <div className="absolute left-[50px] bottom-[50px]">
            <div className="flex flex-col items-start gap-[7px]">
              {/* Mobile: 28px, Tablet: 32px, Desktop: 36px - 50% reduced */}
              <div className="font-montserrat font-semibold text-[28px] leading-[34px] md:text-[32px] md:leading-[40px] lg:text-[36px] lg:leading-[44px] text-white mix-blend-difference whitespace-nowrap">
                Legacy 1
              </div>
              {/* Mobile: 18px, Tablet: 20px, Desktop: 24px - 50% reduced */}
              <div className="font-montserrat font-semibold text-[18px] leading-[20px] md:text-[20px] md:leading-[24px] lg:text-[24px] lg:leading-[32px] text-white mix-blend-difference">
                First AI earphones
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection >
  );
};

export default NewHeroSection;


