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

const ROWS = 8;

// Create individual digit grid for each time unit
function DigitGroup({ value, label }: { value: string; label: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Build grid for this 2-digit group
  const digits = value.split('');
  const grid: number[][] = Array.from({ length: ROWS }, () => []);
  
  digits.forEach((digit, digitIdx) => {
    const pattern = DIGIT_PATTERNS[digit] || DIGIT_PATTERNS['0'];
    for (let row = 0; row < ROWS; row++) {
      grid[row].push(...pattern[row]);
    }
    // Add gap between digits
    if (digitIdx < digits.length - 1) {
      for (let row = 0; row < ROWS; row++) {
        grid[row].push(0);
      }
    }
  });

  // Add padding around the group
  const paddedGrid: number[][] = [
    Array(grid[0].length + 2).fill(0),
    ...grid.map(row => [0, ...row, 0]),
    Array(grid[0].length + 2).fill(0),
  ];

  const paddedRows = paddedGrid.length;
  const paddedCols = paddedGrid[0].length;

  return (
    <div className="flex flex-col items-center space-y-3 sm:space-y-4">
      {/* Individual timer grid */}
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
      
      {/* Label */}
      <span className="text-white font-montserrat text-xs sm:text-sm lg:text-base text-center">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ days, hours, minutes, seconds }: CountdownTimerProps) {
  return (
    <div className="
      grid grid-cols-4 
      w-full max-w-sm lg:max-w-md
      gap-4 sm:gap-6 lg:gap-8
      items-center justify-items-center
    ">
      <DigitGroup value={days} label="Days" />
      <DigitGroup value={hours} label="Hours" />
      <DigitGroup value={minutes} label="Minutes" />
      <DigitGroup value={seconds} label="Seconds" />
    </div>
  );
}

// Add flip animation
// In your global CSS (e.g., globals.css or tailwind config):
// @keyframes flip { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(180deg); } } 