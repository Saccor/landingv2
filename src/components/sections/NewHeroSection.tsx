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
      // This page is composed with responsive logic to select appropriate hero video:
      // - Uses window.innerWidth to determine which video source to show:
      //   * Under 768px: vertical mobile video
      //   * 768px to under 1024px: square compressed video for tablets
      //   * 1024px and up: full desktop horizontal video
      if (typeof window === 'undefined') return;

      const width = window.innerWidth;
      let src = '';

      if (width < 768) {
        // Mobile: vertical hero video
        src = '/v6/hero/HeroBothVersionsLoopVertical.webm';
      } else if (width < 1024) {
        // Tablet: square/1:1 hero video
        src = '/v6/hero/HeroBothVersionsLoopSquare.webm';
      } else {
        // Desktop: horizontal widescreen hero video
        src = '/v6/hero/HeroBothVersionsLoopHorizontal.webm';
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
    <>
      {/* Sticky header - positioned above the hero section */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full h-[82px]" style={{ background: 'linear-gradient(180deg, rgba(230, 230, 230, 0.42) 0%, rgba(230, 230, 230, 0.25) 100%)', backdropFilter: 'blur(11.5px)', WebkitBackdropFilter: 'blur(11.5px)' }}>
        {/* Logo - aligned with Legacy 1 text from viewport left edge */}
        <Link href="/" aria-label="Arfve Home" className="
            absolute left-[50px] 3xl:left-[80px] 4xl:left-[120px] top-0 h-[82px]
            flex-none z-10 flex items-center justify-center
          ">
          <Image
            src="/images/logo.svg"
            alt="Arfve"
            width={131}
            height={46}
            priority
            className="w-[130px] h-[34px] object-contain"
          />
        </Link>

        {/* Navigation links - hidden on mobile, visible on tablet/desktop */}
        <nav className="hidden md:flex items-center gap-[22px] flex-none z-30 absolute right-[50px] 3xl:right-[80px] 4xl:right-[120px] top-0 h-[82px]">
          <Link href="/sustainability" className="font-montserrat font-normal text-[18px] leading-[28px] text-[#1A1A1A] transition-all duration-200 px-2 py-1 rounded cursor-pointer relative z-40">
            Sustainability
          </Link>
          <Link href="/privacy" className="font-montserrat font-normal text-[18px] leading-[28px] text-[#1A1A1A] transition-all duration-200 px-2 py-1 rounded cursor-pointer relative z-40">
            Privacy
          </Link>
        </nav>

        {/* Hamburger menu button - only visible on mobile, positioned on right */}
        <button
          onClick={toggleMenu}
          className="md:hidden absolute right-[50px] 3xl:right-[80px] 4xl:right-[120px] top-0 h-[82px] flex flex-col justify-center items-start gap-[3px] w-[20px] p-0 flex-none z-[20]"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="w-[20px] h-0 border border-black flex-none self-stretch" />
          <span className="w-[20px] h-0 border border-black flex-none self-stretch" />
          <span className="w-[20px] h-0 border border-black flex-none self-stretch" />
        </button>

        {/* Dropdown menu - only visible on mobile */}
        {isMenuOpen && (
          <div className="md:hidden absolute right-[50px] 3xl:right-[80px] 4xl:right-[120px] top-[82px] flex flex-col items-start gap-2 bg-[rgba(230,230,230,0.57)] backdrop-blur-[11.5px] rounded-[20px] px-4 py-3 min-w-[120px] z-50">
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

      <RevealSection className="relative w-full overflow-hidden">
        {/* Hero container - Full viewport height for immersive video experience */}
        <div className="relative w-full h-screen">
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

          {/* Overlay container for bottom info text */}
          <div className="absolute inset-0">
            {/* Bottom info text - 50px from bottom of frame, aligned with container left margin */}
            <div className="absolute left-[50px] 3xl:left-[80px] 4xl:left-[120px] bottom-[50px]">
              <div className="flex flex-col items-start gap-[7px]">
                {/* Mobile: 28px, Tablet: 32px, Desktop: 36px, 3XL: 42px, 4XL: 48px */}
                <div className="font-montserrat font-semibold text-[28px] leading-[34px] md:text-[32px] md:leading-[40px] lg:text-[36px] lg:leading-[44px] 3xl:text-[42px] 3xl:leading-[50px] 4xl:text-[48px] 4xl:leading-[56px] text-white mix-blend-difference whitespace-nowrap">
                  Legacy 1
                </div>
                {/* Mobile: 14px, Tablet: 16px, Desktop: 18px, 3XL: 22px, 4XL: 24px */}
                <div className="font-montserrat font-semibold text-[14px] leading-[18px] md:text-[16px] md:leading-[20px] lg:text-[18px] lg:leading-[24px] 3xl:text-[22px] 3xl:leading-[28px] 4xl:text-[24px] 4xl:leading-[30px] text-white mix-blend-difference">
                  The world&apos;s first 3-piece <br />modular AI earbuds
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
    </>
  );
};

export default NewHeroSection;


