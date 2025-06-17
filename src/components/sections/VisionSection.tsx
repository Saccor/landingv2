'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import RevealSection from '@/components/ui/RevealSection';

// Constants
const THUMBNAIL_TIME = 63; // 1:03 timestamp for thumbnail
const CONTROLS_HIDE_DELAY = 3000; // 3 seconds
const MOBILE_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

// Types for browser fullscreen API extensions
interface ExtendedDocument extends Document {
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
}

interface ExtendedElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
}

export default function VisionSection() {
  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(THUMBNAIL_TIME);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Updates current video time state
   */
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  /**
   * Toggles video play/pause with thumbnail reset logic
   */
  const handlePlayPause = useCallback(async () => {
    if (!videoRef.current) return;
    
    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        // Reset from thumbnail position to start
        if (!isPlaying && videoRef.current.currentTime === THUMBNAIL_TIME) {
          videoRef.current.currentTime = 0;
          setCurrentTime(0);
        }
        await videoRef.current.play();
        setIsPlaying(true);
      }
    } catch {
      console.error('Video: ❌ Playback failed');
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying]);

  /**
   * Calculates progress position from mouse/touch event
   */
  const getProgressFromEvent = useCallback((
    e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent, 
    targetElement?: HTMLElement
  ) => {
    if (!videoRef.current || !duration) return 0;
    
    const target = targetElement || (e.currentTarget as HTMLElement);
    if (!target?.getBoundingClientRect) return 0;
    
    const rect = target.getBoundingClientRect();
    const clientX = 'touches' in e 
      ? e.touches[0]?.clientX || e.changedTouches[0]?.clientX || 0
      : e.clientX;
    
    const clickX = clientX - rect.left;
    const progress = Math.max(0, Math.min(1, clickX / rect.width));
    return progress * duration;
  }, [duration]);

  /**
   * Handles progress bar click to seek video
   */
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * (videoRef.current.duration || 0);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setShowControls(true);
  }, []);

  /**
   * Initiates progress bar dragging for mouse events
   */
  const handleProgressMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    
    if (videoRef.current) {
      const newTime = pos * (videoRef.current.duration || 0);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!videoRef.current || !isDragging) return;
      const rect = progressBar.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const newTime = pos * (videoRef.current.duration || 0);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [isDragging]);

  /**
   * Initiates progress bar dragging for touch events
   */
  const handleProgressTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    
    const progressBar = e.currentTarget;
    const touch = e.touches[0];
    const rect = progressBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
    
    if (videoRef.current) {
      const newTime = pos * (videoRef.current.duration || 0);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!videoRef.current || !isDragging) return;
      const touch = e.touches[0];
      const rect = progressBar.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
      const newTime = pos * (videoRef.current.duration || 0);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }, [isDragging]);

  /**
   * Handles volume slider interaction
   */
  const handleVolumeChange = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, clickX / rect.width));
    
    videoRef.current.volume = newVolume;
    videoRef.current.muted = false;
    setVolume(newVolume);
    setIsMuted(false);
    setShowControls(true);
  }, []);

  /**
   * Toggles video mute state
   */
  const toggleMute = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    setShowControls(true);
  }, [isMuted]);

  /**
   * Handles play/pause from control buttons
   */
  const handleControlPlayPause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    handlePlayPause();
    setShowControls(true);
  }, [handlePlayPause]);

  /**
   * Handles fullscreen API across browsers
   */
  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (isFullscreen) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ('webkitExitFullscreen' in document) {
          await (document as ExtendedDocument).webkitExitFullscreen?.();
        } else if ('mozCancelFullScreen' in document) {
          await (document as ExtendedDocument).mozCancelFullScreen?.();
        }
      } else {
        const element = containerRef.current;
        if ('requestFullscreen' in element) {
          await element.requestFullscreen();
        } else if ('webkitRequestFullscreen' in element) {
          await (element as ExtendedElement).webkitRequestFullscreen?.();
        } else if ('mozRequestFullScreen' in element) {
          await (element as ExtendedElement).mozRequestFullScreen?.();
        }
      }
    } catch {
      console.error('Video: ❌ Fullscreen toggle failed');
    }
  }, [isFullscreen]);

  /**
   * Formats time display (mm:ss)
   */
  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  /**
   * Handles video metadata loaded event
   */
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  /**
   * Handles when video data is loaded and ready
   */
  const handleLoadedData = useCallback(() => {
    if (videoRef.current && !isPlaying) {
      // Set thumbnail to 1:03 when data is loaded and video hasn't been played
      videoRef.current.currentTime = THUMBNAIL_TIME;
      setCurrentTime(THUMBNAIL_TIME);
    }
  }, [isPlaying]);

  // Effects
  
  /**
   * Initialize responsive scaling and detect mobile devices
   */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(MOBILE_REGEX.test(navigator.userAgent));
    };

    checkMobile();
  }, []);

  /**
   * Ensure thumbnail is set on mount/refresh
   */
  useEffect(() => {
    if (videoRef.current && !isPlaying) {
      // Set thumbnail on mount/refresh
      const setThumbnail = () => {
        if (videoRef.current && !isPlaying) {
          videoRef.current.currentTime = THUMBNAIL_TIME;
          setCurrentTime(THUMBNAIL_TIME);
        }
      };
      
      if (videoRef.current.readyState >= 2) {
        // Video is ready
        setThumbnail();
      } else {
        // Wait for video to be ready
        videoRef.current.addEventListener('loadeddata', setThumbnail, { once: true });
      }
    }
  }, [isPlaying]);

  /**
   * Handle fullscreen state changes
   */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const events = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange'];
    events.forEach(event => document.addEventListener(event, handleFullscreenChange));

    return () => {
      events.forEach(event => document.removeEventListener(event, handleFullscreenChange));
    };
  }, []);

  /**
   * Handle global drag events for progress bar
   */
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const progressBar = document.querySelector('[data-progress-bar]') as HTMLElement;
      if (progressBar) {
        const newTime = getProgressFromEvent(e, progressBar);
        if (videoRef.current && newTime > 0) {
          videoRef.current.currentTime = newTime;
          setCurrentTime(newTime);
        }
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      const progressBar = document.querySelector('[data-progress-bar]') as HTMLElement;
      if (progressBar) {
        const newTime = getProgressFromEvent(e, progressBar);
        if (videoRef.current && newTime > 0) {
          videoRef.current.currentTime = newTime;
          setCurrentTime(newTime);
        }
      }
    };

    const handleGlobalEnd = () => setIsDragging(false);

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalEnd);
    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    document.addEventListener('touchend', handleGlobalEnd);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalEnd);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalEnd);
    };
  }, [isDragging, getProgressFromEvent]);

  /**
   * Auto-hide controls after delay
   */
  useEffect(() => {
    if (!isPlaying || !showControls || isDragging) return;

    const timeout = setTimeout(() => setShowControls(false), CONTROLS_HIDE_DELAY);
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls, isDragging]);

  // Render helpers
  const renderPlayButton = () => (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      {isLoading ? (
        <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      )}
    </div>
  );

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

  const renderControlButton = (onClick: (e: React.MouseEvent) => void, ariaLabel: string, children: React.ReactNode) => (
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

  return (
    <RevealSection className="bg-black overflow-hidden">
      <div className="w-full flex flex-col items-center responsive-container responsive-section px-4 pt-8 pb-0 mb-[20px] mt-[20px]">
        <div className="flex justify-center w-full">
          <div className="w-[353px] lg:w-[1400px] px-0 py-0 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-5">
            
            {/* Video Container */}
            <div 
              ref={containerRef}
              className="relative w-full lg:w-[875px] h-[210px] lg:h-[505px] bg-black rounded-sm overflow-hidden cursor-pointer transition-all duration-300 lg:order-2"
              onMouseMove={() => setShowControls(true)}
              onMouseLeave={() => isPlaying && !isMobile && setShowControls(false)}
              onClick={handlePlayPause}
              onTouchStart={() => setShowControls(true)}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="/video/hero-optimized.mp4"
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onLoadedData={handleLoadedData}
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/video/hero-optimized.mp4" type="video/mp4" />
              </video>

              {/* Play Button Overlay */}
              {!isPlaying && renderPlayButton()}

              {/* Video Controls */}
              {isPlaying && (
                <div 
                  className={`absolute inset-0 transition-opacity duration-300 ${(showControls || isDragging) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-30`}
                  onMouseMove={() => setShowControls(true)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div 
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto ${isFullscreen ? 'p-6' : 'p-3'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
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
                          <svg className={`${isFullscreen ? 'w-6 h-6' : 'w-4 h-4'}`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                          </svg>
                        )}
                        
                        {renderControlButton(
                          toggleMute,
                          isMuted ? 'Unmute video' : 'Mute video',
                          <svg className={`${isFullscreen ? 'w-6 h-6' : 'w-4 h-4'}`} fill="currentColor" viewBox="0 0 24 24">
                            {isMuted ? (
                              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                            ) : (
                              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                            )}
                          </svg>
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
                          <svg className={`${isFullscreen ? 'w-6 h-6' : 'w-4 h-4'}`} fill="currentColor" viewBox="0 0 24 24">
                            {isFullscreen ? (
                              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                            ) : (
                              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                            )}
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Vision Text Box */}
            <div className="bg-[var(--Gray-900,#1b1b1b)] shadow-lg w-full lg:w-[505px] min-h-[400px] lg:h-[505px] rounded-sm flex flex-col items-center justify-center px-6 py-7 lg:px-0 lg:py-0 lg:order-1">
              <div className="w-full max-w-[305px] lg:max-w-none bg-gradient-to-b from-white to-[#C8A596] bg-clip-text text-transparent text-center font-semibold font-montserrat flex flex-col gap-4 lg:gap-8">
                <p className="m-0 p-0 text-[20px] leading-[30px]">Arfve isn&apos;t just earbuds.</p>
                <p className="m-0 p-0 text-[20px] leading-[30px]">
                  It&apos;s a modular system of personalized sound, intelligent design, and circular thinking —<br className="hidden lg:block" />
                  built to last, adapt, and be yours.
                </p>
                <p className="m-0 p-0 text-[20px] leading-[30px]">Rooted in Scandinavian minimalism.</p>
                <p className="m-0 p-0 text-[20px] leading-[30px]">Made by Arfve. Defined by you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
} 