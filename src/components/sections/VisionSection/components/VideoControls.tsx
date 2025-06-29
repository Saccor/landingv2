'use client';

import React from 'react';
import { VideoControlsProps } from '../types';

/**
 * VideoControls component that renders the video control overlay
 */
export default function VideoControls({
  state,
  actions,
  formatTime,
  isFullscreen,
}: VideoControlsProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    isMuted,
    volume,
    showControls,
    isDragging,
    isMobile,
  } = state;

  const {
    handleProgressClick,
    handleProgressMouseDown,
    handleProgressTouchStart,
    handleVolumeChange,
    toggleMute,
    toggleFullscreen,
    setShowControls,
  } = actions;

  /**
   * Handles control play/pause button click
   */
  const handleControlPlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.handlePlayPause();
    setShowControls(true);
  };

  /**
   * Renders the progress bar
   */
  const renderProgressBar = () => (
    <div 
      data-progress-bar
      className={`w-full bg-white/30 rounded-full cursor-pointer group touch-manipulation ${isFullscreen ? 'h-4 mb-4' : 'h-3 mb-3'}`}
      onClick={handleProgressClick}
      onMouseDown={handleProgressMouseDown}
      onTouchStart={handleProgressTouchStart}
      onMouseMove={() => setShowControls(true)}
    >
      <div 
        className="h-full bg-white rounded-full transition-all duration-150 relative"
        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
      >
        <div className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transition-opacity ${isDragging || (showControls && !isMobile) ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </div>
  );

  /**
   * Renders the volume control slider
   */
  const renderVolumeControl = () => (
    <div 
      className={`bg-white/30 rounded-full cursor-pointer ${isFullscreen ? 'w-16 h-3' : 'w-12 h-2'}`}
      onClick={handleVolumeChange}
      onMouseMove={() => setShowControls(true)}
      onMouseEnter={() => setShowControls(true)}
      aria-label="Change volume"
      tabIndex={0}
    >
      <div 
        className="h-full bg-white rounded-full"
        style={{ width: `${isMuted ? 0 : volume * 100}%` }}
      />
    </div>
  );

  /**
   * Renders a control button with consistent styling
   */
  const renderControlButton = (
    onClick: (e: React.MouseEvent) => void, 
    ariaLabel: string, 
    children: React.ReactNode
  ) => (
    <button 
      onClick={onClick}
      className={`hover:scale-110 transition-transform ${isFullscreen ? 'p-2' : 'p-1'}`}
      onMouseEnter={() => setShowControls(true)}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
    </button>
  );

  /**
   * Renders play/pause icon based on current state
   */
  const renderPlayPauseIcon = () => (
    <svg className={`${isFullscreen ? 'w-6 h-6' : 'w-4 h-4'}`} fill="currentColor" viewBox="0 0 24 24">
      {isPlaying ? (
        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
      ) : (
        <path d="M8 5v14l11-7z"/>
      )}
    </svg>
  );

  /**
   * Renders mute/unmute icon based on current state
   */
  const renderMuteIcon = () => (
    <svg className={`${isFullscreen ? 'w-6 h-6' : 'w-4 h-4'}`} fill="currentColor" viewBox="0 0 24 24">
      {isMuted ? (
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
      ) : (
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      )}
    </svg>
  );

  /**
   * Renders fullscreen icon based on current state
   */
  const renderFullscreenIcon = () => (
    <svg className={`${isFullscreen ? 'w-6 h-6' : 'w-4 h-4'}`} fill="currentColor" viewBox="0 0 24 24">
      {isFullscreen ? (
        <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
      ) : (
        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
      )}
    </svg>
  );

  // Show controls if video is playing OR if we're in fullscreen mode (professional behavior)
  const shouldShowControls = isPlaying || isFullscreen;

  if (!shouldShowControls) return null;

  return (
    <div 
      className={`absolute inset-0 transition-opacity duration-300 ${(showControls || isDragging || isFullscreen) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} ${isFullscreen ? 'z-[9999]' : 'z-30'}`}
      onMouseMove={() => setShowControls(true)}
      onClick={(e) => e.stopPropagation()}
      style={isFullscreen ? { zIndex: 9999 } : {}}
    >
      {/* Debug indicator for fullscreen */}
      {isFullscreen && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-xs rounded z-[10000]">
          FULLSCREEN ACTIVE - Controls: {showControls ? 'ON' : 'OFF'}
        </div>
      )}
      
      <div 
        className={`absolute bottom-0 left-0 right-0 pointer-events-auto ${isFullscreen ? 'p-8' : 'p-3'}`}
        onClick={(e) => e.stopPropagation()}
        style={isFullscreen ? { 
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
          minHeight: '120px' // Ensure minimum height in fullscreen
        } : {
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)'
        }}
      >
        {/* Debug bar for fullscreen */}
        {isFullscreen && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400"></div>
        )}
        
        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Controls Row */}
        <div 
          className={`flex items-center justify-between text-white ${isFullscreen ? 'text-base' : 'text-sm'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            {renderControlButton(
              handleControlPlayPause,
              isPlaying ? 'Pause video' : 'Play video',
              renderPlayPauseIcon()
            )}
            
            {renderControlButton(
              toggleMute,
              isMuted ? 'Unmute video' : 'Mute video',
              renderMuteIcon()
            )}
            
            {renderVolumeControl()}
          </div>
          
          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <span 
              className={`font-mono select-none ${isFullscreen ? 'text-sm' : 'text-xs'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            
            {renderControlButton(
              (e) => {
                e.stopPropagation();
                toggleFullscreen();
                setShowControls(true);
              },
              isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen',
              renderFullscreenIcon()
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 