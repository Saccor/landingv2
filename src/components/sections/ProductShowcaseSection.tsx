'use client';

import React, { useState, useRef, useEffect } from 'react';
import RevealSection from '@/components/ui/RevealSection';
import { gsap } from 'gsap';

const ExpandableIcon: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => {
  const iconRef = React.useRef<SVGSVGElement>(null);
  const verticalLineRef = React.useRef<SVGPathElement>(null);

  React.useEffect(() => {
    if (verticalLineRef.current) {
      gsap.to(verticalLineRef.current, {
        opacity: isExpanded ? 0 : 1,
        rotation: isExpanded ? -90 : 0,
        transformOrigin: "center",
        duration: 0.4,
        ease: "power2.inOut"
      });
    }
  }, [isExpanded]);

  return (
    <svg
      ref={iconRef}
      width="20"
      height="20"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Horizontal line - always visible */}
      <path
        d="M1 11.005L21 11.005"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Vertical line - rotates and fades when expanded */}
      <path
        ref={verticalLineRef}
        d="M10.9961 1V21"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ transformOrigin: "center" }}
      />
    </svg>
  );
};

// Video component that cycles between two videos with smooth transitions
const CyclingVideoPlayer: React.FC<{
  className?: string;
  videos: string[];
}> = ({ className = '', videos }) => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentVideoRef = useRef<HTMLVideoElement | null>(null);
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);
  const currentIndexRef = useRef(0);
  const transitionDuration = 0.8; // seconds for fade transition
  const isTransitioningRef = useRef(false);
  const isVisibleRef = useRef(true);
  const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    if (!video1 || !video2) return;

    // Set up intersection observer to pause videos when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;

          // Clear any existing timeout
          if (visibilityTimeoutRef.current) {
            clearTimeout(visibilityTimeoutRef.current);
          }

          // Debounce visibility changes to prevent rapid play/pause calls
          visibilityTimeoutRef.current = setTimeout(() => {
            isVisibleRef.current = isIntersecting;

            if (isIntersecting) {
              // Resume playing when visible - only if not already playing
              if (currentVideoRef.current && currentVideoRef.current.paused && !isTransitioningRef.current) {
                currentVideoRef.current.play().catch((err) => {
                  // Ignore "interrupted by pause" errors - they're harmless
                  if (!err.message.includes('interrupted by a call to pause')) {
                    console.error('Video play error:', err);
                  }
                });
              }
            } else {
              // Pause when not visible - only if currently playing
              if (currentVideoRef.current && !currentVideoRef.current.paused) {
                currentVideoRef.current.pause();
              }
              if (nextVideoRef.current && !nextVideoRef.current.paused) {
                nextVideoRef.current.pause();
              }
            }
          }, 100); // 100ms debounce
        });
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    observer.observe(containerRef.current!);

    // Set up initial video references
    currentVideoRef.current = video1;
    nextVideoRef.current = video2;

    // Set initial video sources
    video1.src = videos[0];
    video2.src = videos[1];

    // Set initial opacity
    gsap.set(video1, { opacity: 1 });
    gsap.set(video2, { opacity: 0 });

    // Preload and play the first video only when it's ready
    const startInitialVideo = () => {
      if (isVisibleRef.current && video1.readyState >= 2) { // HAVE_CURRENT_DATA or higher
        video1.play().catch((err) => {
          // Ignore "interrupted by pause" errors - they're harmless
          if (!err.message.includes('interrupted by a call to pause') &&
            !err.message.includes('interrupted by a new load request')) {
            console.error('Initial video play error:', err);
          }
        });
      }
    };

    // Wait for video to be ready before playing
    if (video1.readyState >= 2) {
      // Video is already loaded
      startInitialVideo();
    } else {
      // Wait for video to load
      const handleLoadedData = () => {
        video1.removeEventListener('loadeddata', handleLoadedData);
        startInitialVideo();
      };
      video1.addEventListener('loadeddata', handleLoadedData);

      // Fallback: try to play after a short delay if loadeddata doesn't fire
      setTimeout(() => {
        if (video1.readyState >= 2) {
          video1.removeEventListener('loadeddata', handleLoadedData);
          startInitialVideo();
        }
      }, 1000);
    }

    // Load the videos (this happens asynchronously)
    video1.load();
    video2.load();

    const handleVideoEnd = () => {
      // Prevent multiple transitions
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      const currentVideo = currentVideoRef.current;
      const nextVideo = nextVideoRef.current;

      if (!currentVideo || !nextVideo) {
        isTransitioningRef.current = false;
        return;
      }

      // Switch to next video index
      currentIndexRef.current = (currentIndexRef.current + 1) % videos.length;

      // Set the next video source (it should already be loaded)
      nextVideo.src = videos[currentIndexRef.current];
      nextVideo.load();

      // Start transition immediately (videos should be preloaded)
      const startTransition = () => {
        // Start playing next video (muted, at 0 opacity) only if visible
        nextVideo.currentTime = 0;
        if (isVisibleRef.current) {
          nextVideo.play().catch((err) => {
            // Ignore "interrupted by pause" and "new load request" errors - they're harmless
            if (!err.message.includes('interrupted by a call to pause') &&
              !err.message.includes('interrupted by a new load request')) {
              console.error('Video transition play error:', err);
            }
          });
        }

        // Create smooth crossfade transition
        gsap.to(currentVideo, {
          opacity: 0,
          duration: transitionDuration,
          ease: 'power2.inOut',
          onComplete: () => {
            // Pause and reset the previous video
            currentVideo.pause();
            currentVideo.currentTime = 0;
            isTransitioningRef.current = false;
          }
        });

        gsap.to(nextVideo, {
          opacity: 1,
          duration: transitionDuration,
          ease: 'power2.inOut'
        });

        // Swap references for next transition
        const temp = currentVideoRef.current;
        currentVideoRef.current = nextVideoRef.current;
        nextVideoRef.current = temp;
      };

      // Start transition immediately since videos are preloaded
      startTransition();
    };

    // Set up event listeners
    video1.addEventListener('ended', handleVideoEnd);
    video2.addEventListener('ended', handleVideoEnd);

    return () => {
      observer.disconnect();
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
      video1.removeEventListener('ended', handleVideoEnd);
      video2.removeEventListener('ended', handleVideoEnd);
    };
  }, [videos]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <video
        ref={video1Ref}
        className={`${className} absolute inset-0`}
        muted
        playsInline
        preload="auto"
        aria-label="Modular earbuds animation"
      />
      <video
        ref={video2Ref}
        className={`${className} absolute inset-0`}
        muted
        playsInline
        preload="auto"
        aria-label="Modular earbuds animation"
      />
    </div>
  );
};

const ExpandableItem: React.FC<{
  title: string;
  content: string;
  onExpandChange?: (sectionId: string, isExpanded: boolean) => void;
  sectionId: string;
}> = ({ title, content, onExpandChange, sectionId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        // Animate in
        gsap.set(contentRef.current, { height: 0, opacity: 0 });
        gsap.to(contentRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      } else {
        // Animate out
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            if (contentRef.current) {
              gsap.set(contentRef.current, { height: 0 });
            }
          }
        });
      }
    }
  }, [isExpanded]);

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onExpandChange?.(sectionId, newExpanded);
  };

  return (
    <div className="w-full">
      <button
        onClick={handleToggle}
        className="w-full flex flex-col items-start gap-[5px] cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="w-full h-[24px] flex flex-row items-center gap-2">
          <ExpandableIcon isExpanded={isExpanded} />
          <div className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A]">
            {title}
          </div>
        </div>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <div className="w-full mt-4 pl-7">
          <p className="font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProductShowcaseSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('earbuds'); // Default to earbuds

  const earbudVideos = ['/v6/3pcBlackAnim.mp4', '/v6/3pcWhiteAnim.mp4'];
  const caseVideos = ['/v6/3pcBlackAnimCase.mp4', '/v6/3pcWhiteAnimCase.mp4'];

  const handleSectionExpand = (sectionId: string, isExpanded: boolean) => {
    if (isExpanded) {
      setActiveSection(sectionId);
    }
  };

  return (
    <RevealSection className="relative w-full flex justify-center bg-white overflow-hidden">
      <div className="w-full max-w-[1440px] px-5 md:px-20 lg:px-[124px] py-[50px] flex flex-col items-center gap-[95px] bg-white">
        {/* Title */}
        <div className="w-full flex flex-row flex-wrap items-baseline gap-x-[17px] gap-y-0">
          <h2 className="font-montserrat font-semibold text-[24px] md:text-[30px] lg:text-[36px] leading-[32px] md:leading-[38px] lg:leading-[44px] text-[#1A1A1A]">
            Modular by Design: Swap,<br />
            Upgrade and Evolve Your Earbuds
          </h2>
        </div>

        {/* Mobile/Tablet: Vertical stack - Title then Content */}
        {/* Desktop: Two column layout */}
        <div className="w-full max-w-[1192px]">
          {/* Mobile and Tablet Layout */}
          <div className="lg:hidden flex flex-col items-start gap-[40px]">
            {/* Content - below title */}
            <div className="w-full flex flex-col gap-[40px]">
              <div className="w-full flex flex-col gap-[15px]">
                <div className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A]">
                  Earbuds split in 3 parts.
                </div>
                <div className="w-full max-w-[280px] mx-auto">
                  <div className="relative w-full aspect-[300/200] rounded-[30px] overflow-hidden">
                    <CyclingVideoPlayer
                      videos={earbudVideos}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="w-full font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
                  Experience the future of audio with our revolutionary modular design. Each earbud can be easily disassembled into three distinct components, allowing for unprecedented customization and repairability.
                </p>
              </div>

              <div className="w-full flex flex-col gap-[15px]">
                <div className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A]">
                  A well made case
                </div>
                <div className="w-full max-w-[280px] mx-auto">
                  <div className="relative w-full aspect-[300/200] rounded-[30px] overflow-hidden">
                    <CyclingVideoPlayer
                      videos={caseVideos}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="w-full font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
                  Our precision-engineered case provides ultimate protection while maintaining a sleek, minimalist aesthetic. Crafted with premium materials for durability and style.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-row items-start gap-[60px]">
            {/* Left side - Expandable content (1/3 width) */}
            <div className="w-1/3">
              <div className="w-full flex flex-col gap-[20px]">
                <ExpandableItem
                  title="Earbuds split in 3 parts."
                  content="Experience the future of audio with our revolutionary modular design. Each earbud can be easily disassembled into three distinct components, allowing for unprecedented customization and repairability."
                  sectionId="earbuds"
                  onExpandChange={handleSectionExpand}
                />
                <ExpandableItem
                  title="A well made case"
                  content="Our precision-engineered case provides ultimate protection while maintaining a sleek, minimalist aesthetic. Crafted with premium materials for durability and style."
                  sectionId="case"
                  onExpandChange={handleSectionExpand}
                />
              </div>
            </div>

            {/* Right side - Video Player (2/3 width) */}
            <div className="w-2/3 rounded-[30px] overflow-hidden">
              <div className="relative w-full aspect-[719/404]">
                {/* Earbuds videos */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${activeSection === 'earbuds' ? 'opacity-100' : 'opacity-0'}`}>
                  <CyclingVideoPlayer
                    videos={earbudVideos}
                    className="absolute inset-0 w-full h-full object-cover rounded-[30px]"
                  />
                </div>
                {/* Case videos */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${activeSection === 'case' ? 'opacity-100' : 'opacity-0'}`}>
                  <CyclingVideoPlayer
                    videos={caseVideos}
                    className="absolute inset-0 w-full h-full object-cover rounded-[30px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

export default ProductShowcaseSection;
