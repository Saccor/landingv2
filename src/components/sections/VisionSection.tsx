'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function VisionSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Video event handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePlayPause = async () => {
    if (!videoRef.current) return;
    
    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await videoRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced progress handling for both mouse and touch
  const getProgressFromEvent = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent, targetElement?: HTMLElement) => {
    if (!videoRef.current || !duration) return 0;
    
    const target = targetElement || (e.currentTarget as HTMLElement);
    if (!target || !target.getBoundingClientRect) return 0;
    
    const rect = target.getBoundingClientRect();
    
    let clientX: number;
    if ('touches' in e) {
      clientX = e.touches[0]?.clientX || e.changedTouches[0]?.clientX || 0;
    } else {
      clientX = e.clientX;
    }
    
    const clickX = clientX - rect.left;
    const progress = Math.max(0, Math.min(1, clickX / rect.width));
    return progress * duration;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const newTime = getProgressFromEvent(e);
    if (videoRef.current && newTime > 0) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
    setShowControls(true);
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    const newTime = getProgressFromEvent(e);
    if (videoRef.current && newTime > 0) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
    setShowControls(true);
  };

  const handleProgressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    const newTime = getProgressFromEvent(e);
    if (videoRef.current && newTime > 0) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
    setShowControls(true);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent triggering play/pause
    if (!videoRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, clickX / rect.width));
    
    videoRef.current.volume = newVolume;
    videoRef.current.muted = false;
    setVolume(newVolume);
    setIsMuted(false);
    
    // Keep controls visible and reset timer
    setShowControls(true);
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent triggering play/pause
    if (!videoRef.current) return;
    
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    
    // Keep controls visible and reset timer
    setShowControls(true);
  };

  const handleControlPlayPause = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    handlePlayPause();
    setShowControls(true); // Keep controls visible
  };

  // Fullscreen functionality
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (isFullscreen) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        }
      } else {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if ((containerRef.current as any).webkitRequestFullscreen) {
          await (containerRef.current as any).webkitRequestFullscreen();
        } else if ((containerRef.current as any).mozRequestFullScreen) {
          await (containerRef.current as any).mozRequestFullScreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  // Fullscreen change detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Global drag handling
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
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
      if (!isDragging) return;
      const progressBar = document.querySelector('[data-progress-bar]') as HTMLElement;
      if (progressBar) {
        const newTime = getProgressFromEvent(e, progressBar);
        if (videoRef.current && newTime > 0) {
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
  }, [isDragging, getProgressFromEvent]);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isPlaying && showControls && !isDragging) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls, isDragging]);

  return (
    <section className="bg-black overflow-hidden">
      <div className="w-full max-w-[353px] lg:max-w-[1440px] mx-auto py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-8">
          
          {/* Vision Text Box - Left on desktop, bottom on mobile */}
          <div className="order-2 w-[353px] h-[460px] bg-[var(--Gray-900,#1b1b1b)] rounded-sm flex justify-center items-center">
            <div className="w-[305px] h-[360px] mx-auto bg-gradient-to-b from-white to-[#C8A596] bg-clip-text text-transparent text-center text-[20px] leading-[30px] font-semibold font-['Montserrat'] flex flex-col justify-between">
              <p className="m-0 p-0">Arfve isn't just earbuds.</p>
              <p className="m-0 p-0">
                It's a modular system of personalized sound, intelligent design, and circular thinking —<br className="hidden lg:block" />
                built to last, adapt, and be yours.
              </p>
              <p className="m-0 p-0">Rooted in Scandinavian minimalism.</p>
              <p className="m-0 p-0">Made by Arfve. Defined by you.</p>
            </div>
          </div>

          {/* Video Container - Right on desktop, top on mobile */}
          <div 
            ref={containerRef}
            className={`order-1 lg:order-2 relative w-full h-[210px] lg:w-[875px] lg:h-[505px] bg-gray-900 rounded-sm overflow-hidden cursor-pointer transition-all duration-300`}
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
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/video/hero-optimized.mp4" type="video/mp4" />
            </video>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                {isLoading ? (
                  <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                )}
              </div>
            )}

                         {/* Video Controls */}
             {isPlaying && (
               <div 
                 className={`absolute inset-0 transition-opacity duration-300 ${showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-20`}
                 onMouseMove={() => setShowControls(true)}
                 onClick={(e) => e.stopPropagation()}
               >
                 <div 
                   className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto ${isFullscreen ? 'p-6' : 'p-3'}`}
                   onClick={(e) => e.stopPropagation()}
                 >
                   
                   {/* Progress Bar */}
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
                       <div className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transition-opacity ${isDragging || (showControls && !isMobile) ? 'opacity-100' : 'opacity-0'}`}></div>
                     </div>
                   </div>

                   {/* Controls Row */}
                                        <div 
                       className={`flex items-center justify-between text-white ${isFullscreen ? 'text-base' : 'text-sm'}`}
                       onClick={(e) => e.stopPropagation()}
                     >
                     <div className="flex items-center gap-2">
                       <button 
                         onClick={handleControlPlayPause} 
                         className={`hover:scale-110 transition-transform ${isFullscreen ? 'p-2' : 'p-1'}`}
                         onMouseEnter={() => setShowControls(true)}
                       >
                         <svg className={`${isFullscreen ? 'w-6 h-6' : 'w-4 h-4'}`} fill="currentColor" viewBox="0 0 24 24">
                           <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                         </svg>
                       </button>
                       
                       <button 
                         onClick={toggleMute} 
                         className={`hover:scale-110 transition-transform ${isFullscreen ? 'p-2' : 'p-1'}`}
                         onMouseEnter={() => setShowControls(true)}
                       >
                         <svg className={`${isFullscreen ? 'w-6 h-6' : 'w-4 h-4'}`} fill="currentColor" viewBox="0 0 24 24">
                           {isMuted ? (
                             <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                           ) : (
                             <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                           )}
                         </svg>
                       </button>
                       
                       <div 
                         className={`bg-white/30 rounded-full cursor-pointer ${isFullscreen ? 'w-16 h-3' : 'w-12 h-2'}`}
                         onClick={handleVolumeChange}
                         onMouseMove={() => setShowControls(true)}
                         onMouseEnter={() => setShowControls(true)}
                       >
                         <div 
                           className="h-full bg-white rounded-full"
                           style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                         />
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-2">
                       <span 
                         className={`font-mono select-none ${isFullscreen ? 'text-sm' : 'text-xs'}`}
                         onClick={(e) => e.stopPropagation()}
                       >
                         {formatTime(currentTime)} / {formatTime(duration)}
                       </span>
                       
                                               <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFullscreen();
                            setShowControls(true);
                          }}
                          className={`hover:scale-110 transition-transform touch-manipulation ${isFullscreen ? 'p-2' : 'p-1'}`}
                          onMouseEnter={() => setShowControls(true)}
                        >
                          <svg className={`${isFullscreen ? 'w-6 h-6' : 'w-4 h-4'}`} fill="currentColor" viewBox="0 0 24 24">
                           {isFullscreen ? (
                             <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                           ) : (
                             <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                           )}
                         </svg>
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