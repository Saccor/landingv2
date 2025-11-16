'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';

/**
 * Represents time segments for countdown display
 */
interface TimeSegments {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

/**
 * Props for the CountdownTimerPixel component
 */
interface CountdownTimerPixelProps {
  targetDate: string;
}

/**
 * Props for individual digit components
 */
interface CountdownDigitProps {
  char: string;
}

/**
 * Pixel grid type for digit rendering
 */
type PixelGrid = number[][];

// Constants - back to fixed size but with container scaling
const CELL_SIZE = 5; // Fixed at 5px for optimal display
const UPDATE_INTERVAL = 1000; // milliseconds
const GRID_GAP = '1px';
const DIGIT_MARGIN = '2px';

// Colors
const PIXEL_COLORS = {
  ACTIVE: '#FFFFFF',
  INACTIVE: '#000000',
  BORDER: '#2a2a2a',
} as const;

// 5x10 pixel grid patterns for digits 0-9, colon (:), and spacer (_)
const DIGIT_MAP: Record<string, PixelGrid> = {
  '0': [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ],
  '1': [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
  ],
  '2': [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
  ],
  '3': [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ],
  '4': [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 1, 0, 1],
    [0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0],
  ],
  '5': [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ],
  '6': [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ],
  '7': [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  '8': [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ],
  '9': [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ],
  ':': [
    [0],
    [0],
    [0],
    [1],
    [0],
    [0],
    [1],
    [0],
    [0],
    [0],
  ],
  '_': [
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
  ],
};

/**
 * Calculate time segments from target date
 */
const getTimeSegments = (target: Date): TimeSegments => {
  const diff = Math.max(0, target.getTime() - Date.now());
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  return {
    days: days.toString().padStart(2, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };
};

/**
 * Individual pixel cell component
 */
const PixelCell = React.memo(({ isActive }: { isActive: boolean }) => (
  <div
    style={{
      width: `${CELL_SIZE}px`,
      height: `${CELL_SIZE}px`,
      backgroundColor: isActive ? PIXEL_COLORS.ACTIVE : PIXEL_COLORS.INACTIVE,
      border: isActive ? 'none' : `0.5px solid ${PIXEL_COLORS.BORDER}`,
    }}
  />
));

PixelCell.displayName = 'PixelCell';

/**
 * Renders a single digit using pixel grid pattern
 */
const CountdownDigit = React.memo(({ char }: CountdownDigitProps) => {
  const grid = DIGIT_MAP[char];
  
  const gridStyle = useMemo(() => {
    if (!grid) return {};
    return {
      gridTemplateColumns: `repeat(${grid[0].length}, ${CELL_SIZE}px)`,
      gridTemplateRows: `repeat(${grid.length}, ${CELL_SIZE}px)`,
      gap: GRID_GAP,
    };
  }, [grid]);

  const pixels = useMemo(() => {
    if (!grid) return [];
    return grid.flat().map((cell, i) => (
      <PixelCell key={i} isActive={Boolean(cell)} />
    ));
  }, [grid]);

  if (!grid) return null;

  return (
    <div className="grid" style={gridStyle}>
      {pixels}
    </div>
  );
});

CountdownDigit.displayName = 'CountdownDigit';

/**
 * Loading state component
 */
const LoadingState = React.memo(() => (
  <div className="flex flex-col items-center">
    <div className="flex items-center justify-center flex-wrap gap-0 min-h-[60px]">
      <div className="text-white font-mono text-sm">Loading...</div>
    </div>
    <TimeLabels />
  </div>
));

LoadingState.displayName = 'LoadingState';

/**
 * Time unit labels component with proper alignment under digit groups
 */
const TimeLabels = React.memo(() => {
  // Create label elements that exactly match the digit positions
  // We'll use the same structure as the timeChars array to ensure perfect alignment
  const labelChars = [
    '', // spacer
    'Days', // first day digit - positioned for proper centering
    '', // between day digits
    '', // second day digit  
    '', // spacer
    '', // colon
    '', // spacer
    '', // first hour digit
    'Hours', // between hour digits - this position is correct
    '', // second hour digit
    '', // spacer
    '', // colon
    '', // spacer
    '', // first minute digit
    '', // between minute digits
    'Minutes', // second minute digit - moved to the right for better centering
    '', // spacer
    '', // colon
    '', // spacer
    '', // first second digit
    '', // between second digits
    'Seconds', // second second digit - moved to the right for better centering
    '', // spacer
  ];
  
  return (
    <div className="flex items-center justify-center gap-0 mt-2 text-xs text-white font-mono">
      {labelChars.map((label, i) => (
        <div
          key={i}
          className="flex items-center justify-center h-4"
          style={{
            width: label ? 'auto' : `${CELL_SIZE}px`,
            marginRight: i < labelChars.length - 1 ? DIGIT_MARGIN : '0px',
            minWidth: label ? '40px' : `${CELL_SIZE}px`,
          }}
        >
          {label && <span className="whitespace-nowrap">{label}</span>}
        </div>
      ))}
    </div>
  );
});

TimeLabels.displayName = 'TimeLabels';

/**
 * Pixel art countdown timer with container-based responsive scaling
 */
export default function CountdownTimerPixel({ targetDate }: CountdownTimerPixelProps) {
  const [segments, setSegments] = useState<TimeSegments | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  /**
   * Update countdown segments
   */
  const updateSegments = useCallback(() => {
    // Only update if page is visible
    if (isVisible) {
      setSegments(getTimeSegments(new Date(targetDate)));
    }
  }, [targetDate, isVisible]);

  useEffect(() => {
    setIsMounted(true);
    updateSegments();

    const updateScale = () => {
      if (typeof window !== 'undefined') {
        setScale(Math.min(1, (window.innerWidth * 0.9) / 350));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const interval = setInterval(updateSegments, UPDATE_INTERVAL);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateScale);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [updateSegments]);

  /**
   * Generate character array with spacers for visual separation
   */
  const timeChars = useMemo(() => {
    if (!segments) return [];

    const rawDigits = `${segments.days}:${segments.hours}:${segments.minutes}:${segments.seconds}`;
    
    return [
      '_',
      ...rawDigits.split('').flatMap((char, idx, arr) =>
        idx < arr.length - 1 ? [char, '_'] : [char]
      ),
      '_',
    ];
  }, [segments]);

  /**
   * Render individual digit components
   */
  const digitComponents = useMemo(() => 
    timeChars.map((char, i) => (
      <div
        key={`${char}-${i}`}
        style={{
          marginRight: i < timeChars.length - 1 ? DIGIT_MARGIN : '0px',
        }}
      >
        <CountdownDigit char={char} />
      </div>
    )), [timeChars]
  );

  // Hydration safety and loading state
  if (!isMounted || !segments) {
    return <LoadingState />;
  }

  return (
    <div 
      className="w-full flex justify-center" 
      style={isMounted ? { 
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        whiteSpace: 'nowrap'
      } : { whiteSpace: 'nowrap' }}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center gap-0" style={{ whiteSpace: 'nowrap' }}>
          {digitComponents}
        </div>
        <TimeLabels />
      </div>
    </div>
  );
}
