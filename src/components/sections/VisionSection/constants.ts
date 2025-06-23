/**
 * Video player configuration constants
 */

/**
 * Video playback configuration
 */
export const VIDEO_CONFIG = {
  /** Thumbnail timestamp in seconds (1:03) */
  THUMBNAIL_TIME: 63,
  /** Controls auto-hide delay in milliseconds */
  CONTROLS_HIDE_DELAY: 3000,
  /** Video source path */
  VIDEO_SOURCE: '/video/hero-optimized.mp4',
  /** Default volume level (0-1) */
  DEFAULT_VOLUME: 0.7,
} as const;

/**
 * Device detection patterns
 */
export const DEVICE_DETECTION = {
  /** Mobile device user agent regex */
  MOBILE_REGEX: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
} as const;

/**
 * Progress bar drag selector
 */
export const SELECTORS = {
  /** Data attribute for progress bar element */
  PROGRESS_BAR: '[data-progress-bar]',
} as const;

/**
 * Fullscreen change event names for cross-browser compatibility
 */
export const FULLSCREEN_EVENTS = [
  'fullscreenchange',
  'webkitfullscreenchange', 
  'mozfullscreenchange'
] as const; 