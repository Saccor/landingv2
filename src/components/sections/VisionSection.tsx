'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import { useVideoPlayer } from './VisionSection/hooks/useVideoPlayer';
import { VideoPlayer, VideoControls } from './VisionSection/components';

/**
 * VisionSection component featuring an interactive video player and brand message
 * 
 * This component showcases the Arfve brand vision through an interactive video
 * player with custom controls and a complementary text section.
 */
export default function VisionSection() {
  // Get video player state and controls from custom hook
  const {
    state,
    actions,
    videoRef,
    containerRef,
    formatTime,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleLoadedData,
  } = useVideoPlayer();

  return (
    <RevealSection className="bg-black overflow-hidden">
      <div className="
        w-full max-w-[1440px] mx-auto flex flex-col items-center
        
        /* Mobile: Tight padding (0-767px) */
        px-4 pt-8 pb-0 mb-[20px] mt-[20px]
        
        /* Tablet: Moderate padding, better spacing (768px-1023px) */
        md:px-6 md:pt-10 md:pb-0 md:mb-[20px] md:mt-[30px]
        
        /* Desktop: Standard padding (1024px+) */
        lg:px-4 lg:pt-8 lg:pb-0
      ">
        <div className="w-full flex justify-center">
          <div className="
            /* Mobile: Single column layout (0-767px) */
            w-full max-w-[353px] p-0 flex flex-col items-center justify-center gap-4
            
            /* Tablet: Use Figma base size (794px), scale down only when screen is smaller (768px-1023px) */
            md:w-[min(794px,calc(100vw-48px))] md:max-w-none md:gap-5
            
            /* Desktop: Side-by-side layout with percentage scaling (1024px+) */
            lg:w-full lg:max-w-[1400px] lg:flex-row lg:gap-5
          ">
            
            {/* Video Player Container */}
            <div className="
              relative w-full
              
              /* Mobile: Standard width (0-767px) */
              max-w-[353px]
              
              /* Tablet: Match Figma exact specs - 794x422px, scale proportionally (768px-1023px) */
              md:w-full md:h-[422px] md:max-w-none md:p-0 md:rounded-[2px]
              
              /* Desktop: Order and flexible width (1024px+) */
              lg:order-2 lg:flex-1 lg:max-w-none lg:h-auto lg:p-0 lg:rounded-sm
            ">
              <VideoPlayer
                state={state}
                actions={actions}
                videoRef={videoRef}
                containerRef={containerRef}
                handleTimeUpdate={handleTimeUpdate}
                handleLoadedMetadata={handleLoadedMetadata}
                handleLoadedData={handleLoadedData}
              />
              
              {/* Video Controls Overlay */}
              <VideoControls
                state={state}
                actions={actions}
                formatTime={formatTime}
                isFullscreen={state.isFullscreen}
              />
            </div>
            
            {/* Vision Text Section */}
            <div className="
              bg-[var(--Gray-900,#1b1b1b)] shadow-lg rounded-sm
              flex flex-col items-center justify-center
              
              /* Mobile: Full width, auto height (0-767px) */
              w-full min-h-[400px] px-6 py-7
              
              /* Tablet: Match Figma exact specs - 794x364px, scale proportionally (768px-1023px) */
              md:h-[364px] md:min-h-0 md:p-[50px]
              
              /* Desktop: Restore original layout (1024px+) */
              lg:w-[36%] lg:min-w-[400px] lg:max-w-[505px] lg:h-[505px] lg:p-0 lg:order-1
            ">
              <div className="
                w-full bg-gradient-to-b from-white to-[#C8A596] 
                bg-clip-text text-transparent text-center font-semibold font-montserrat 
                flex flex-col
                
                /* Mobile: Compact spacing (0-767px) */
                max-w-[305px] gap-4
                
                /* Tablet: Match Figma layout specs (768px-1023px) */
                md:max-w-[694px] md:mx-auto md:gap-[24px] md:justify-center
                
                /* Desktop: Fit within gray section with padding (1024px+) */
                lg:max-w-full lg:px-8 lg:gap-8 lg:h-auto lg:justify-start
              ">
                <p className="m-0 p-0 text-[20px] leading-[30px]">
                  Arfve isn&apos;t just earbuds.
                </p>
                <p className="m-0 p-0 text-[20px] leading-[30px]">
                  It&apos;s a modular system of personalized sound, intelligent design, and circular thinking —<br className="hidden lg:block" /> built to last, adapt, and be yours.
                </p>
                <p className="m-0 p-0 text-[20px] leading-[30px]">
                  Rooted in Scandinavian minimalism.
                </p>
                <p className="m-0 p-0 text-[20px] leading-[30px]">
                  Made by Arfve. Defined by you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
} 