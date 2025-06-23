'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { VideoPlayerState, VideoPlayerActions, ExtendedDocument, ExtendedElement } from '../types';
import { VIDEO_CONFIG, DEVICE_DETECTION, SELECTORS, FULLSCREEN_EVENTS } from '../constants';

/**
 * Custom hook for video player functionality
 * 
 * Manages all video player state, controls, and interactions
 */
export function useVideoPlayer() {
  // State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(VIDEO_CONFIG.THUMBNAIL_TIME);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(VIDEO_CONFIG.DEFAULT_VOLUME);
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Formats time display (mm:ss)
   */
  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

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
        if (!isPlaying && videoRef.current.currentTime === VIDEO_CONFIG.THUMBNAIL_TIME) {
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
      videoRef.current.currentTime = VIDEO_CONFIG.THUMBNAIL_TIME;
      setCurrentTime(VIDEO_CONFIG.THUMBNAIL_TIME);
    }
  }, [isPlaying]);

  /**
   * Initialize mobile device detection
   */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(DEVICE_DETECTION.MOBILE_REGEX.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  /**
   * Ensure thumbnail is set on mount/refresh
   */
  useEffect(() => {
    if (videoRef.current && !isPlaying) {
      const setThumbnail = () => {
        if (videoRef.current && !isPlaying) {
          videoRef.current.currentTime = VIDEO_CONFIG.THUMBNAIL_TIME;
          setCurrentTime(VIDEO_CONFIG.THUMBNAIL_TIME);
        }
      };
      
      if (videoRef.current.readyState >= 2) {
        setThumbnail();
      } else {
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

    FULLSCREEN_EVENTS.forEach(event => 
      document.addEventListener(event, handleFullscreenChange)
    );

    return () => {
      FULLSCREEN_EVENTS.forEach(event => 
        document.removeEventListener(event, handleFullscreenChange)
      );
    };
  }, []);

  /**
   * Handle global drag events for progress bar
   */
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const progressBar = document.querySelector(SELECTORS.PROGRESS_BAR) as HTMLElement;
      if (progressBar) {
        const newTime = getProgressFromEvent(e, progressBar);
        if (videoRef.current && newTime > 0) {
          videoRef.current.currentTime = newTime;
          setCurrentTime(newTime);
        }
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      const progressBar = document.querySelector(SELECTORS.PROGRESS_BAR) as HTMLElement;
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

    const timeout = setTimeout(() => setShowControls(false), VIDEO_CONFIG.CONTROLS_HIDE_DELAY);
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls, isDragging]);

  // Return state and actions
  const state: VideoPlayerState = {
    isPlaying,
    currentTime,
    duration,
    isMuted,
    volume,
    isLoading,
    showControls,
    isDragging,
    isMobile,
    isFullscreen,
  };

  const actions: VideoPlayerActions = {
    handlePlayPause,
    toggleMute,
    toggleFullscreen,
    handleProgressClick,
    handleProgressMouseDown,
    handleProgressTouchStart,
    handleVolumeChange,
    setShowControls,
  };

  return {
    state,
    actions,
    videoRef,
    containerRef,
    formatTime,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleLoadedData,
  };
} 