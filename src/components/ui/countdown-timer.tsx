import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

// 5x8 patterns for digits 0-9
const DIGIT_PATTERNS: Record<string, number[][]> = {
  '0': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,1,1],
    [1,0,1,0,1],
    [1,1,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  '1': [
    [0,0,1,0,0],
    [0,1,1,0,0],
    [1,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [1,1,1,1,1],
  ],
  '2': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [0,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
  ],
  '3': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [0,0,0,0,1],
    [0,0,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  '4': [
    [0,0,0,1,0],
    [0,0,1,1,0],
    [0,1,0,1,0],
    [1,0,0,1,0],
    [1,1,1,1,1],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,0,1,1,1],
  ],
  '5': [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  '6': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  '7': [
    [1,1,1,1,1],
    [0,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
  ],
  '8': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  '9': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [0,1,1,1,0],
  ],
};

// Colon pattern (1x8, centered vertically)
const COLON_PATTERN = [
  [0],
  [0],
  [1],
  [0],
  [0],
  [1],
  [0],
  [0],
];

const ROWS = 8;

export default function CountdownTimer({ days, hours, minutes, seconds }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Build the complete timer grid: DD:HH:MM:SS
  const timeString = `${days}:${hours}:${minutes}:${seconds}`;
  const grid: number[][] = Array.from({ length: ROWS }, () => []);

  for (let i = 0; i < timeString.length; i++) {
    const char = timeString[i];
    
    if (char === ':') {
      // Add colon pattern
      for (let row = 0; row < ROWS; row++) {
        grid[row].push(...COLON_PATTERN[row]);
      }
    } else {
      // Add digit pattern
      const pattern = DIGIT_PATTERNS[char] || DIGIT_PATTERNS['0'];
      for (let row = 0; row < ROWS; row++) {
        grid[row].push(...pattern[row]);
      }
    }
    
    // Add spacing between characters (except after last character)
    if (i < timeString.length - 1) {
      for (let row = 0; row < ROWS; row++) {
        grid[row].push(0);
      }
    }
  }

  // Add padding around the entire timer
  const paddedGrid: number[][] = [
    Array(grid[0].length + 2).fill(0),
    ...grid.map(row => [0, ...row, 0]),
    Array(grid[0].length + 2).fill(0),
  ];

  const paddedRows = paddedGrid.length;
  const paddedCols = paddedGrid[0].length;

  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-6">
      {/* Main timer display */}
      <div className="flex justify-center">
        <div
          className="grid gap-[1px] sm:gap-[1.5px] lg:gap-[2px]"
          style={{
            gridTemplateColumns: `repeat(${paddedCols}, 1fr)`,
            gridTemplateRows: `repeat(${paddedRows}, 1fr)`,
          }}
        >
          {paddedGrid.flat().map((cell, i) => (
            <div
              key={i}
              className={`
                border border-stone-300/20
                ${cell ? 'bg-white shadow-sm' : 'bg-transparent'}
                w-[2px] h-[2px]
                sm:w-[3px] sm:h-[3px]
                lg:w-[4px] lg:h-[4px]
                transition-all duration-300
              `}
              style={{
                borderWidth: '0.5px',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Labels row */}
      <div className="grid grid-cols-4 w-full max-w-sm lg:max-w-md gap-4 sm:gap-6 lg:gap-8">
        <span className="text-white font-montserrat text-xs sm:text-sm lg:text-base text-center">
          Days
        </span>
        <span className="text-white font-montserrat text-xs sm:text-sm lg:text-base text-center">
          Hours
        </span>
        <span className="text-white font-montserrat text-xs sm:text-sm lg:text-base text-center">
          Minutes
        </span>
        <span className="text-white font-montserrat text-xs sm:text-sm lg:text-base text-center">
          Seconds
        </span>
      </div>
    </div>
  );
}

// Add flip animation
// In your global CSS (e.g., globals.css or tailwind config):
// @keyframes flip { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(180deg); } } 