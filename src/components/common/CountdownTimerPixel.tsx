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

// Constants
const CELL_SIZE = 6; // pixels
const UPDATE_INTERVAL = 1000; // milliseconds
const GRID_GAP = '1px';
const DIGIT_MARGIN = '1px';

// Colors
const PIXEL_COLORS = {
  ACTIVE: '#FFFFFF',
  INACTIVE: '#000000',
  BORDER: '#2a2a2a',
} as const;

// Spacing
const LABEL_STYLES = {
  width: '100px',
  textAlign: 'center' as const,
};

const LOADING_MIN_HEIGHT = '60px';

/**
 * 5x10 pixel grid patterns for digits 0-9, colon (:), and spacer (_)
 * Each number represents a pixel: 1 = lit (white), 0 = unlit (black)
 */
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
  
  // Call hooks unconditionally before any early returns
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

  // Early return after hooks
  if (!grid) return null;

  return (
    <div className="grid" style={gridStyle}>
      {pixels}
    </div>
  );
});

CountdownDigit.displayName = 'CountdownDigit';

/**
 * Loading state component with consistent styling
 */
const LoadingState = React.memo(() => (
  <div className="flex flex-col items-center">
    <div 
      className="flex items-center justify-center flex-wrap gap-0" 
      style={{ minHeight: LOADING_MIN_HEIGHT }}
    >
      <div className="text-white font-mono">Loading...</div>
    </div>
    <TimeLabels />
  </div>
));

LoadingState.displayName = 'LoadingState';

/**
 * Time unit labels component
 */
const TimeLabels = React.memo(() => (
  <div className="flex justify-center mt-2 text-xs text-white font-mono">
    <div style={LABEL_STYLES}>Days</div>
    <div style={LABEL_STYLES}>Hours</div>
    <div style={LABEL_STYLES}>Minutes</div>
    <div style={LABEL_STYLES}>Seconds</div>
  </div>
));

TimeLabels.displayName = 'TimeLabels';

/**
 * Pixel art countdown timer with retro aesthetic
 * 
 * Features:
 * - Custom 5x10 pixel grid for each digit
 * - Hydration-safe with loading states
 * - Real-time updates every second
 * - Days:Hours:Minutes:Seconds format
 * - Responsive design with consistent spacing
 * - Performance optimized with React.memo
 */
export default function CountdownTimerPixel({ targetDate }: CountdownTimerPixelProps) {
  const [segments, setSegments] = useState<TimeSegments | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Update countdown segments
   */
  const updateSegments = useCallback(() => {
    setSegments(getTimeSegments(new Date(targetDate)));
  }, [targetDate]);

  useEffect(() => {
    setIsMounted(true);
    updateSegments();

    const interval = setInterval(updateSegments, UPDATE_INTERVAL);
    
    return () => clearInterval(interval);
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
        key={`${char}-${i}`} // Include index to handle duplicate characters
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
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center flex-wrap gap-0">
        {digitComponents}
      </div>
      <TimeLabels />
    </div>
  );
}
