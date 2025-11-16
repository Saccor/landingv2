'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { VideoPlayerState, VideoPlayerActions, ExtendedDocument, ExtendedElement } from '../types';
import { VIDEO_CONFIG, DEVICE_DETECTION, FULLSCREEN_EVENTS } from '../constants';

/**
 * Custom hook for video player functionality
 * 
 * Manages all video player state, controls, and interactions with professional features
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
  const [wasPlayingBeforeSeeking, setWasPlayingBeforeSeeking] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    if (videoRef.current && !isDragging) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, [isDragging]);

  /**
   * Professional play/pause with improved thumbnail handling
   */
  const handlePlayPause = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      if (isPlaying) {
        // Pausing - maintain current position
        videoRef.current.pause();
        setIsPlaying(false);
        setShowControls(true); // Show controls when paused for better UX
      } else {
        setIsLoading(true);

        // If this is the first play and we're at thumbnail time, start from beginning
        if (!hasPlayedOnce && videoRef.current.currentTime === VIDEO_CONFIG.THUMBNAIL_TIME) {
          videoRef.current.currentTime = 0;
          setCurrentTime(0);
        }

        await videoRef.current.play();
        setIsPlaying(true);
        setHasPlayedOnce(true);

        // Auto-hide controls after delay (except in fullscreen when paused)
        if (!isFullscreen) {
          setTimeout(() => setShowControls(false), 3000);
        }
      }
    } catch (error) {
      console.error('Video: ❌ Playback failed', error);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, hasPlayedOnce, isFullscreen]);

  /**
   * Professional seeking with play state preservation
   */
  const seekToTime = useCallback((time: number) => {
    if (!videoRef.current || !duration) return;

    const clampedTime = Math.max(0, Math.min(time, duration));
    videoRef.current.currentTime = clampedTime;
    setCurrentTime(clampedTime);

    // Show controls when seeking
    setShowControls(true);
  }, [duration]);

  /**
   * Skip forward/backward (professional feature)
   */
  const skipTime = useCallback((seconds: number) => {
    if (!videoRef.current) return;
    seekToTime(videoRef.current.currentTime + seconds);
  }, [seekToTime]);

  /**
   * Toggle mute with professional UX
   */
  const toggleMute = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    setShowControls(true);

    // Auto-hide controls after mute toggle
    setTimeout(() => {
      if (!isFullscreen || isPlaying) {
        setShowControls(false);
      }
    }, 2000);
  }, [isMuted, isFullscreen, isPlaying]);

  /**
   * Enhanced fullscreen with better UX
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

      // Always show controls when toggling fullscreen
      setShowControls(true);
    } catch (error) {
      console.error('Video: ❌ Fullscreen toggle failed', error);
    }
  }, [isFullscreen]);

  /**
   * Professional progress bar interaction with seeking state
   */
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;

    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;

    seekToTime(newTime);
  }, [duration, seekToTime]);

  /**
   * Enhanced progress bar dragging with play state preservation
   */
  const handleProgressMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;

    e.preventDefault();
    e.stopPropagation();

    // Remember if we were playing before seeking
    setWasPlayingBeforeSeeking(isPlaying);
    setIsDragging(true);

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * duration;

    seekToTime(newTime);

    const handleMouseMove = (e: MouseEvent) => {
      if (!videoRef.current || !duration) return;
      const rect = progressBar.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const newTime = pos * duration;
      seekToTime(newTime);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Resume playback if it was playing before seeking
      if (wasPlayingBeforeSeeking && videoRef.current) {
        videoRef.current.play().catch((err) => {
          // Ignore "interrupted by pause" and "new load request" errors - they're harmless
          if (!err.message.includes('interrupted by a call to pause') &&
            !err.message.includes('interrupted by a new load request')) {
            console.error('Video play error:', err);
          }
        });
        setIsPlaying(true);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [duration, isPlaying, seekToTime, wasPlayingBeforeSeeking]);

  /**
   * Enhanced touch dragging for mobile
   */
  const handleProgressTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;

    e.preventDefault();
    e.stopPropagation();

    setWasPlayingBeforeSeeking(isPlaying);
    setIsDragging(true);

    const progressBar = e.currentTarget;
    const touch = e.touches[0];
    const rect = progressBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
    const newTime = pos * duration;

    seekToTime(newTime);

    const handleTouchMove = (e: TouchEvent) => {
      if (!videoRef.current || !duration) return;
      const touch = e.touches[0];
      const rect = progressBar.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
      const newTime = pos * duration;
      seekToTime(newTime);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      if (wasPlayingBeforeSeeking && videoRef.current) {
        videoRef.current.play().catch((err) => {
          // Ignore "interrupted by pause" and "new load request" errors - they're harmless
          if (!err.message.includes('interrupted by a call to pause') &&
            !err.message.includes('interrupted by a new load request')) {
            console.error('Video play error:', err);
          }
        });
        setIsPlaying(true);
      }
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }, [duration, isPlaying, seekToTime, wasPlayingBeforeSeeking]);

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

    // Auto-hide after volume change
    setTimeout(() => {
      if (!isFullscreen || isPlaying) {
        setShowControls(false);
      }
    }, 2000);
  }, [isFullscreen, isPlaying]);

  /**
   * Professional keyboard controls
   */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!videoRef.current) return;

    // Only handle if video container is focused or in fullscreen
    if (!isFullscreen && !containerRef.current?.contains(document.activeElement)) return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        handlePlayPause();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        skipTime(-10); // Skip back 10 seconds
        break;
      case 'ArrowRight':
        e.preventDefault();
        skipTime(10); // Skip forward 10 seconds
        break;
      case 'ArrowUp':
        e.preventDefault();
        const newVolumeUp = Math.min(1, volume + 0.1);
        videoRef.current.volume = newVolumeUp;
        setVolume(newVolumeUp);
        setIsMuted(false);
        videoRef.current.muted = false;
        setShowControls(true);
        break;
      case 'ArrowDown':
        e.preventDefault();
        const newVolumeDown = Math.max(0, volume - 0.1);
        videoRef.current.volume = newVolumeDown;
        setVolume(newVolumeDown);
        setShowControls(true);
        break;
      case 'KeyM':
        e.preventDefault();
        toggleMute();
        break;
      case 'KeyF':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'Escape':
        if (isFullscreen) {
          e.preventDefault();
          toggleFullscreen();
        }
        break;
    }
  }, [handlePlayPause, skipTime, volume, toggleMute, toggleFullscreen, isFullscreen]);

  /**
   * Professional control visibility management
   */
  const showControlsTemporarily = useCallback((duration = 3000) => {
    setShowControls(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    // Don't auto-hide if paused or in fullscreen while paused
    if (isPlaying || (isFullscreen && !isPlaying)) {
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying || !isFullscreen) {
          setShowControls(false);
        }
      }, duration);
    }
  }, [isPlaying, isFullscreen]);

  /**
   * Professional show/hide controls that matches the interface
   */
  const handleSetShowControls = useCallback((show: boolean) => {
    if (show) {
      showControlsTemporarily();
    } else {
      setShowControls(false);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }
  }, [showControlsTemporarily]);

  /**
   * Enhanced metadata handling
   */
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      videoRef.current.volume = volume;
    }
  }, [volume]);

  /**
   * Professional data loading with thumbnail
   */
  const handleLoadedData = useCallback(() => {
    if (videoRef.current && !hasPlayedOnce) {
      // Set thumbnail to 1:03 when data is loaded and video hasn't been played
      videoRef.current.currentTime = VIDEO_CONFIG.THUMBNAIL_TIME;
      setCurrentTime(VIDEO_CONFIG.THUMBNAIL_TIME);
    }
  }, [hasPlayedOnce]);

  /**
   * Initialize mobile device detection and keyboard controls
   */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(DEVICE_DETECTION.MOBILE_REGEX.test(navigator.userAgent));
    };
    checkMobile();

    // Add keyboard event listeners
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  /**
   * Professional thumbnail management
   */
  useEffect(() => {
    if (videoRef.current && !hasPlayedOnce) {
      const setThumbnail = () => {
        if (videoRef.current && !hasPlayedOnce) {
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
  }, [hasPlayedOnce]);

  /**
   * Enhanced fullscreen state management
   */
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);

      // Always show controls when entering fullscreen
      if (isNowFullscreen) {
        setShowControls(true);
        showControlsTemporarily(5000);
      }
    };

    FULLSCREEN_EVENTS.forEach(event =>
      document.addEventListener(event, handleFullscreenChange)
    );

    return () => {
      FULLSCREEN_EVENTS.forEach(event =>
        document.removeEventListener(event, handleFullscreenChange)
      );
    };
  }, [showControlsTemporarily]);

  /**
   * Professional control auto-hide logic
   */
  useEffect(() => {
    if (!isPlaying || !showControls || isDragging) return;

    // Don't auto-hide in fullscreen when paused
    if (isFullscreen && !isPlaying) return;

    const timeout = setTimeout(() => setShowControls(false), VIDEO_CONFIG.CONTROLS_HIDE_DELAY);
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls, isDragging, isFullscreen]);

  /**
   * Cleanup timeouts on unmount
   */
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

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
    setShowControls: handleSetShowControls,
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