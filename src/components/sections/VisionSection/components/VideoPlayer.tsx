'use client';

import React from 'react';
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
   * Renders the play button overlay when video is paused
   */
  const renderPlayButton = () => (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      {isLoading ? (
        <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <button 
          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handlePlayPause();
          }}
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
      className="relative w-full lg:w-[875px] h-[210px] lg:h-[505px] bg-black rounded-sm overflow-hidden cursor-pointer transition-all duration-300 lg:order-2"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && !state.isMobile && setShowControls(false)}
      onClick={handlePlayPause}
      onTouchStart={() => setShowControls(true)}
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
          // Video ended, reset to paused state
          if (videoRef.current) {
            videoRef.current.currentTime = VIDEO_CONFIG.THUMBNAIL_TIME;
          }
        }}
      >
        <source src={VIDEO_CONFIG.VIDEO_SOURCE} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play Button Overlay */}
      {!isPlaying && renderPlayButton()}
    </div>
  );
} 