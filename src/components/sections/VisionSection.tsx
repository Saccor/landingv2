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
      <div className="w-full flex flex-col items-center responsive-container responsive-section px-4 pt-8 pb-0 mb-[20px] mt-[20px]">
        <div className="flex justify-center w-full">
          <div className="w-[353px] lg:w-[1400px] px-0 py-0 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-5">
            
            {/* Video Player Container */}
            <div className="relative lg:order-2">
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
            <div className="bg-[var(--Gray-900,#1b1b1b)] shadow-lg w-full lg:w-[505px] min-h-[400px] lg:h-[505px] rounded-sm flex flex-col items-center justify-center px-6 py-7 lg:px-0 lg:py-0 lg:order-1">
              <div className="w-full max-w-[305px] lg:max-w-none bg-gradient-to-b from-white to-[#C8A596] bg-clip-text text-transparent text-center font-semibold font-montserrat flex flex-col gap-4 lg:gap-8">
                <p className="m-0 p-0 text-[20px] leading-[30px]">
                  Arfve isn&apos;t just earbuds.
                </p>
                <p className="m-0 p-0 text-[20px] leading-[30px]">
                  It&apos;s a modular system of personalized sound, intelligent design, and circular thinking —<br className="hidden lg:block" />
                  built to last, adapt, and be yours.
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