/**
 * Video player state and configuration types
 */

/**
 * Video player state interface
 */
export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  volume: number;
  isLoading: boolean;
  showControls: boolean;
  isDragging: boolean;
  isMobile: boolean;
  isFullscreen: boolean;
}

/**
 * Video player actions interface
 */
export interface VideoPlayerActions {
  handlePlayPause: () => Promise<void>;
  toggleMute: (e?: React.MouseEvent) => void;
  toggleFullscreen: () => Promise<void>;
  handleProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleProgressMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleProgressTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  handleVolumeChange: (e: React.MouseEvent<HTMLDivElement>) => void;
  setShowControls: (show: boolean) => void;
}

/**
 * Browser fullscreen API extensions
 */
export interface ExtendedDocument extends Document {
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
}

export interface ExtendedElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
}

/**
 * Video player component props
 */
export interface VideoPlayerProps {
  state: VideoPlayerState;
  actions: VideoPlayerActions;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Video controls component props
 */
export interface VideoControlsProps {
  state: VideoPlayerState;
  actions: VideoPlayerActions;
  formatTime: (time: number) => string;
  isFullscreen: boolean;
} 