'use client';

import React, { useState, useRef, useCallback } from 'react';

export default function VisionSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = useCallback(async () => {
    if (!videoRef.current || isLoading) return;

    try {
      if (isPlaying) {
        // Pause the video
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        // Play the video
        setIsLoading(true);
        setHasError(false);
        
        // Ensure video is loaded before playing
        if (videoRef.current.readyState < 3) {
          await new Promise((resolve, reject) => {
            const video = videoRef.current!;
            const onCanPlay = () => {
              video.removeEventListener('canplay', onCanPlay);
              video.removeEventListener('error', onError);
              resolve(void 0);
            };
            const onError = () => {
              video.removeEventListener('canplay', onCanPlay);
              video.removeEventListener('error', onError);
              reject(new Error('Video failed to load'));
            };
            video.addEventListener('canplay', onCanPlay);
            video.addEventListener('error', onError);
          });
        }

        await videoRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error with video playback:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isPlaying]);

  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleVideoError = useCallback((e: any) => {
    console.error('Video error:', e.target.error);
    setHasError(true);
    setIsLoading(false);
  }, []);

  const handleVideoLoadedData = useCallback(() => {
    console.log('Video loaded successfully');
    setIsVideoReady(true);
  }, []);

  const handleVideoCanPlay = useCallback(() => {
    console.log('Video can play');
    setIsVideoReady(true);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleVideoClick();
    }
  }, [handleVideoClick]);

  return (
    <section className="w-full bg-black flex justify-center items-center py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-32 pb-4 sm:pb-8 md:pb-16">
      <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8 items-stretch max-w-7xl mx-auto">
        {/* Left: Text */}
        <div className="bg-[var(--Gray-800,#363637)] rounded-[23px] p-5 md:p-6 flex flex-col justify-center items-center gap-3 flex-1 max-w-full md:max-w-[420px] h-[200px] sm:h-[240px] md:h-[460px] z-[1] mx-auto md:mx-0">
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2 font-montserrat text-center">Our vision</h2>
          <p className="text-gray-200 text-base sm:text-lg font-poppins text-center leading-relaxed">
            Arfive isn't just another pair of earbuds — it's a modular audio system engineered for life on your terms.
          </p>
        </div>

        {/* Right: Video */}
        <div className="relative flex items-center justify-center flex-1 w-full aspect-video min-h-[280px] sm:min-h-[320px] md:min-h-[300px] rounded-[27px] overflow-hidden z-0 bg-gray-900">
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-[27px] cursor-pointer"
            src="/video/hero-v2-optimized.mp4"
            preload="metadata"
            playsInline
            onClick={handleVideoClick}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            onLoadedData={handleVideoLoadedData}
            onCanPlay={handleVideoCanPlay}
            aria-label="Arfive product vision video"
          >
            <source src="/video/hero-v2-optimized.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play button overlay when not playing */}
          {(!isPlaying || isLoading || hasError) && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] cursor-pointer rounded-[27px] transition-all duration-300 hover:bg-black/50"
              onClick={handleVideoClick}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button"
              aria-label={hasError ? "Video failed to load. Click to retry." : isLoading ? "Loading video..." : "Play video"}
            >
              {hasError ? (
                <div className="flex flex-col items-center gap-3 text-white">
                  <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm font-medium">Failed to load video</span>
                  <span className="text-xs opacity-75">Click to retry</span>
                </div>
              ) : isLoading ? (
                <div className="flex flex-col items-center gap-3 text-white">
                  <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">Loading...</span>
                </div>
              ) : (
                <div className="group flex flex-col items-center gap-2">
                  {/* Modern play button */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 ease-out">
                      <svg 
                        className="w-8 h-8 text-white ml-1" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    {/* Pulse animation ring */}
                    <div className="absolute inset-0 w-20 h-20 bg-white/5 rounded-full animate-ping group-hover:animate-none"></div>
                  </div>
                  <span className="text-white text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                    Watch our vision
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Invisible clickable overlay when playing - no visible pause button */}
          {isPlaying && !isLoading && !hasError && (
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={handleVideoClick}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button"
              aria-label="Pause video"
            />
          )}

        </div>
      </div>
    </section>
  );
} 