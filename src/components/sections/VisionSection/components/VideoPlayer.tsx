'use client';

import React, { useCallback } from 'react';
import { VideoPlayerProps } from '../types';
import { VIDEO_CONFIG } from '../constants';

/**
 * VideoPlayer component that renders the video element and play button overlay
 */
export default function VideoPlayer({
  state,
  actions,
  videoRef,
  containerRef,
  handleTimeUpdate,
  handleLoadedMetadata,
  handleLoadedData,
}: VideoPlayerProps & {
  handleTimeUpdate: () => void;
  handleLoadedMetadata: () => void;
  handleLoadedData: () => void;
}) {
  const { isPlaying, isLoading } = state;
  const { handlePlayPause, setShowControls } = actions;

  /**
   * Professional click handling - click to pause/play
   */
  const handleVideoClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    handlePlayPause();
  }, [handlePlayPause]);

  /**
   * Enhanced mouse interaction for professional UX
   */
  const handleMouseEnter = useCallback(() => {
    setShowControls(true);
  }, [setShowControls]);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
  }, [setShowControls]);

  const handleMouseLeave = useCallback(() => {
    // Only auto-hide on mouse leave if playing and not mobile
    if (isPlaying && !state.isMobile && !state.isFullscreen) {
      setTimeout(() => setShowControls(false), 1000);
    }
  }, [isPlaying, state.isMobile, state.isFullscreen, setShowControls]);

  /**
   * Professional touch handling for mobile
   */
  const handleTouchStart = useCallback(() => {
    setShowControls(true);
  }, [setShowControls]);

  /**
   * Renders the professional play button overlay
   */
  const renderPlayButton = () => (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      {isLoading ? (
        <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <button 
          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200"
          onClick={handleVideoClick}
          aria-label="Play video"
        >
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="
        relative w-full bg-black rounded-sm overflow-hidden cursor-pointer transition-all duration-300
        
        /* Mobile: Compact video size (0-767px) */
        h-[210px] max-w-[353px]
        
        /* Tablet: Match Figma exact specs - 794x422px (768px-1023px) */
        md:h-[422px] md:max-w-none
        
        /* Desktop: Flexible width, proportional video size (1024px+) */
        lg:h-[505px] lg:order-2
      "
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleVideoClick}
      onTouchStart={handleTouchStart}
      tabIndex={0}
      role="button"
      aria-label={isPlaying ? "Pause video" : "Play video"}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={VIDEO_CONFIG.VIDEO_SOURCE}
        muted={state.isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadedData={handleLoadedData}
        onEnded={() => {
          // Professional video end behavior - stay at end position
          // The thumbnail will be handled by the pause state
        }}
      >
        <source src={VIDEO_CONFIG.VIDEO_SOURCE} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Professional Play Button Overlay */}
      {!isPlaying && renderPlayButton()}
    </div>
  );
} 