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

// Centered colon pattern (dots in rows 2 and 5)
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

const DIGIT_WIDTH = 5;
const COLON_WIDTH = 1;
const ROWS = 8;

export default function CountdownTimer({ days, hours, minutes, seconds }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // Build the full grid pattern for the timer row
  const groups = [days, hours, minutes, seconds];
  const grid: number[][] = Array.from({ length: ROWS }, () => []);
  groups.forEach((group, groupIdx) => {
    group.split('').forEach((digit, digitIdx) => {
      const pattern = DIGIT_PATTERNS[digit] || DIGIT_PATTERNS['0'];
      for (let row = 0; row < ROWS; row++) {
        grid[row].push(...pattern[row]);
      }
      // Add gap after each digit except the last in the group
      if (digitIdx < group.length - 1) {
        for (let row = 0; row < ROWS; row++) {
          grid[row].push(0);
        }
      }
    });
    // Add colon after each group except the last
    if (groupIdx < groups.length - 1) {
      // Add gap before colon
      for (let row = 0; row < ROWS; row++) {
        grid[row].push(0);
      }
      // Add colon
      for (let row = 0; row < ROWS; row++) {
        grid[row].push(...COLON_PATTERN[row]);
      }
      // Add gap after colon
      for (let row = 0; row < ROWS; row++) {
        grid[row].push(0);
      }
    }
  });

  // Add 1 row/col of empty squares around the grid
  const paddedGrid: number[][] = [
    Array(grid[0].length + 2).fill(0), // Top border
    ...grid.map(row => [0, ...row, 0]), // Left/right borders
    Array(grid[0].length + 2).fill(0), // Bottom border
  ];
  const paddedRows = paddedGrid.length;
  const paddedCols = paddedGrid[0].length;

  // Responsive square size and gap
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480;
  const SQUARE_SIZE = isMobile ? 4.5 : 7.78; // px
  const GAP = isMobile ? 1 : 2; // px
  const containerWidth = paddedCols * SQUARE_SIZE + (paddedCols - 1) * GAP;
  const containerHeight = paddedRows * SQUARE_SIZE + (paddedRows - 1) * GAP;

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className="relative mx-auto overflow-x-auto w-full"
        style={{
          maxWidth: '100vw',
          minWidth: '180px',
          width: '100%',
          height: `${containerHeight}px`,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${paddedCols}, 1fr)`,
            gridTemplateRows: `repeat(${paddedRows}, 1fr)`,
            gap: `${GAP}px`,
            width: `${containerWidth}px`,
            height: '100%',
            margin: '0 auto',
          }}
        >
          {paddedGrid.flat().map((cell, i) => (
            <div
              key={i}
              className={`w-[${SQUARE_SIZE}px] h-[${SQUARE_SIZE}px] border-[0.7px] border-stone-300/30 ${cell ? 'bg-white' : 'bg-transparent'}`}
            />
          ))}
        </div>
      </div>
      {/* Responsive label row */}
      <div
        className="flex flex-row justify-between items-center w-full max-w-full overflow-x-auto mt-2 gap-2 px-1"
        style={{ maxWidth: `${containerWidth}px`, minWidth: '180px' }}
      >
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => (
          <span
            key={label}
            className="text-white text-xs sm:text-sm md:text-lg font-montserrat text-center min-w-[60px] flex-1"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Add flip animation
// In your global CSS (e.g., globals.css or tailwind config):
// @keyframes flip { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(180deg); } } 