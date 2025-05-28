'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

export default function VisionSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Auto-hide controls after 3 seconds of inactivity (but not on touch devices when paused)
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    if (isPlaying && !isTouchDevice) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying, isTouchDevice]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Handle mouse movement to show controls
  const handleMouseMove = useCallback(() => {
    if (!isTouchDevice) {
      resetControlsTimeout();
    }
  }, [resetControlsTimeout, isTouchDevice]);

  // Handle touch to show controls
  const handleTouch = useCallback(() => {
    if (isTouchDevice) {
      setShowControls(true);
      if (isPlaying) {
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 4000); // Longer timeout for touch devices
      }
    }
  }, [isPlaying, isTouchDevice]);

  // Video event handlers
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current && !isDragging) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, [isDragging]);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      console.log('Video duration:', videoRef.current.duration);
      // Set video to start at 5 seconds to show background (only on initial load)
      if (videoRef.current.currentTime === 0) {
        setTimeout(() => {
          if (videoRef.current && videoRef.current.duration > 5 && videoRef.current.currentTime === 0) {
            console.log('Setting video to 5 seconds on initial load');
            videoRef.current.currentTime = 5;
            setCurrentTime(5);
          }
        }, 100);
      }
    }
  }, []);

  const handleVolumeChange = useCallback(() => {
    if (videoRef.current) {
      setVolume(videoRef.current.volume);
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  // Fullscreen handlers
  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Play/pause handler (only for control buttons)
  const handlePlayPause = useCallback(async () => {
    console.log('handlePlayPause called', { isLoading, isPlaying, videoRef: !!videoRef.current });
    
    if (!videoRef.current) {
      console.log('No video ref');
      return;
    }
    
    if (isLoading) {
      console.log('Already loading');
      return;
    }

    try {
      if (isPlaying) {
        console.log('Pausing video');
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        console.log('Starting video');
        setIsLoading(true);
        setHasError(false);
        
        if (videoRef.current.readyState < 3) {
          console.log('Video not ready, waiting...');
          await new Promise((resolve, reject) => {
            const video = videoRef.current!;
            const onCanPlay = () => {
              console.log('Video can play');
              video.removeEventListener('canplay', onCanPlay);
              video.removeEventListener('error', onError);
              resolve(void 0);
            };
            const onError = () => {
              console.log('Video error during load');
              video.removeEventListener('canplay', onCanPlay);
              video.removeEventListener('error', onError);
              reject(new Error('Video failed to load'));
            };
            video.addEventListener('canplay', onCanPlay);
            video.addEventListener('error', onError);
          });
        }

        // Ensure video is unmuted when starting playback
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.volume = volume;
        
        console.log('Playing video');
        await videoRef.current.play();
        setIsPlaying(true);
        console.log('Video started successfully');
      }
    } catch (error) {
      console.error('Error with video playback:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isPlaying, volume]);

  // Unified progress handler for both mouse and touch
  const getProgressFromEvent = useCallback((e: React.MouseEvent | React.TouchEvent, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0]?.clientX || e.changedTouches[0]?.clientX : e.clientX;
    const clickX = clientX - rect.left;
    return Math.max(0, Math.min(1, clickX / rect.width));
  }, []);

  // Progress bar handlers
  const handleProgressInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!videoRef.current || !progressRef.current || duration === 0) return;
    
    const progress = getProgressFromEvent(e, progressRef.current);
    const newTime = progress * duration;
    
    console.log('Seeking to:', newTime);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration, getProgressFromEvent]);

  const handleProgressMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleProgressInteraction(e);
  }, [handleProgressInteraction]);

  const handleProgressTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleProgressInteraction(e);
  }, [handleProgressInteraction]);

  const handleProgressMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleProgressInteraction(e);
  }, [isDragging, handleProgressInteraction]);

  const handleProgressEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse/touch move and end handlers
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && progressRef.current && duration > 0) {
        const rect = progressRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progress = Math.max(0, Math.min(1, clickX / rect.width));
        const newTime = progress * duration;
        
        if (videoRef.current) {
          videoRef.current.currentTime = newTime;
          setCurrentTime(newTime);
        }
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging && progressRef.current && duration > 0) {
        e.preventDefault();
        const rect = progressRef.current.getBoundingClientRect();
        const touch = e.touches[0] || e.changedTouches[0];
        const clickX = touch.clientX - rect.left;
        const progress = Math.max(0, Math.min(1, clickX / rect.width));
        const newTime = progress * duration;
        
        if (videoRef.current) {
          videoRef.current.currentTime = newTime;
          setCurrentTime(newTime);
        }
      }
    };

    const handleGlobalEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalEnd);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalEnd);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalEnd);
    };
  }, [isDragging, duration]);

  // Volume control handlers
  const handleVolumeInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!videoRef.current || !volumeRef.current) return;
    
    const rect = volumeRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0]?.clientX || e.changedTouches[0]?.clientX : e.clientX;
    const clickX = clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, clickX / rect.width));
    
    videoRef.current.muted = false;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(false);
  }, []);

  // Mute toggle
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  // Format time display
  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false);
    setShowControls(true);
  }, []);

  const handleVideoError = useCallback(() => {
    console.error('Video error occurred');
    setHasError(true);
    setIsLoading(false);
  }, []);

  const handleVideoLoadedData = useCallback(() => {
    console.log('Video data loaded');
    // Only set to 5 seconds if this is the initial load (currentTime is 0)
    if (videoRef.current && videoRef.current.currentTime === 0) {
      videoRef.current.currentTime = 5;
      setCurrentTime(5);
    }
  }, []);

  const handleVideoCanPlay = useCallback(() => {
    console.log('Video can play');
    // Only set to 5 seconds if this is the initial load (currentTime is still 0)
    if (videoRef.current && videoRef.current.currentTime === 0) {
      videoRef.current.currentTime = 5;
      setCurrentTime(5);
    }
  }, []);

  const handleVideoSeeked = useCallback(() => {
    console.log('Video seeked to:', videoRef.current?.currentTime);
    // Simply update the current time display - don't force it back to 5 seconds
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  return (
    <section className="bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Text Container */}
          <div className="
            w-full max-w-sm mx-auto
            lg:flex-none lg:w-96 lg:max-w-none
            bg-[#363637] rounded-2xl lg:rounded-3xl
            p-6 lg:p-8
            flex flex-col justify-center items-center gap-4 lg:gap-6
            aspect-video lg:aspect-auto lg:min-h-[500px]
          ">
          <h2 className="
            text-white font-bold font-montserrat text-center
            text-xl sm:text-2xl lg:text-3xl xl:text-4xl
            leading-tight
          ">
            Our vision
          </h2>
          <p className="
            text-gray-200 font-poppins text-center leading-relaxed
            text-sm sm:text-base lg:text-lg
            max-w-xs lg:max-w-sm
          ">
            Arfive isn&apos;t just another pair of earbuds — it&apos;s a modular audio system engineered for life on your terms.
          </p>
        </div>

        {/* Video Container */}
        <div 
          ref={containerRef}
          className="
            w-full max-w-lg mx-auto
            lg:flex-1 lg:max-w-none
            relative rounded-2xl lg:rounded-3xl overflow-hidden
            aspect-video lg:aspect-auto lg:min-h-[500px] xl:min-h-[550px]
            bg-gray-900
          "
          onMouseMove={handleMouseMove}
          onMouseLeave={() => !isTouchDevice && isPlaying && setShowControls(false)}
          onTouchStart={handleTouch}
        >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/video/hero-optimized.mp4"
          preload="auto"
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onVolumeChange={handleVolumeChange}
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          onLoadedData={handleVideoLoadedData}
          onCanPlay={handleVideoCanPlay}
          onSeeked={handleVideoSeeked}
          aria-label="Arfive product vision video"
        >
          <source src="/video/hero-optimized.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play button overlay when not playing */}
        {(!isPlaying || isLoading || hasError) && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-all duration-300"
          >
            {hasError ? (
              <div className="flex flex-col items-center gap-3 text-white">
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm font-medium">Failed to load video</span>
                <button 
                  onClick={handlePlayPause}
                  className="text-xs opacity-75 hover:opacity-100 underline"
                >
                  Click to retry
                </button>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center gap-3 text-white">
                <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Loading...</span>
              </div>
            ) : (
              <div className="group flex flex-col items-center gap-2">
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Play button clicked');
                      handlePlayPause();
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Play button touched');
                      handlePlayPause();
                    }}
                    className="w-16 sm:w-20 h-16 sm:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 ease-out cursor-pointer z-10 touch-manipulation"
                    type="button"
                  >
                    <svg 
                      className="w-6 sm:w-8 h-6 sm:h-8 text-white ml-1 pointer-events-none" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  <div className="absolute inset-0 w-16 sm:w-20 h-16 sm:h-20 bg-white/5 rounded-full animate-ping group-hover:animate-none pointer-events-none"></div>
                </div>
                <span className="text-white text-xs sm:text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                  Watch our vision
                </span>
              </div>
            )}
          </div>
        )}

        {/* Video Controls */}
        {isPlaying && (
          <div 
            className={`absolute inset-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'} ${showControls ? 'pointer-events-auto' : 'pointer-events-none'}`}
          >
            {/* Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pointer-events-auto">
              {/* Progress Bar */}
              <div 
                ref={progressRef}
                className="w-full h-3 sm:h-4 bg-white/30 rounded-full cursor-pointer mb-3 relative touch-manipulation group"
                onMouseDown={handleProgressMouseDown}
                onTouchStart={handleProgressTouchStart}
                onMouseMove={handleProgressMove}
                onTouchMove={handleProgressMove}
                onMouseUp={handleProgressEnd}
                onTouchEnd={handleProgressEnd}
                onClick={handleProgressInteraction}
              >
                <div 
                  className="h-full bg-white rounded-full transition-all duration-150 relative"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                >
                  {/* Progress handle */}
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                {/* Hover preview */}
                <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-20 bg-white rounded-full transition-opacity pointer-events-none"></div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-white">
                {/* Left Controls */}
                <div className="flex items-center gap-3">
                  {/* Play/Pause */}
                  <button 
                    onClick={handlePlayPause}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      handlePlayPause();
                    }}
                    className="hover:scale-110 transition-transform touch-manipulation p-1"
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>

                  {/* Volume Controls */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={toggleMute}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        toggleMute();
                      }}
                      className="hover:scale-110 transition-transform touch-manipulation p-1"
                    >
                      {isMuted || volume === 0 ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                        </svg>
                      ) : volume < 0.5 ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                        </svg>
                      )}
                    </button>
                    
                    {/* Volume Slider */}
                    <div 
                      ref={volumeRef}
                      className="w-16 h-3 bg-white/30 rounded-full cursor-pointer touch-manipulation"
                      onClick={handleVolumeInteraction}
                      onTouchStart={handleVolumeInteraction}
                    >
                      <div 
                        className="h-full bg-white rounded-full"
                        style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Time Display */}
                  <span className="text-xs font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-3">
                  {/* Fullscreen */}
                  <button 
                    onClick={toggleFullscreen}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      toggleFullscreen();
                    }}
                    className="hover:scale-110 transition-transform touch-manipulation p-1"
                  >
                    {isFullscreen ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
        </div>
      </div>
    </section>
  );
} 