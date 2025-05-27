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

const ROWS = 8;

export default function CountdownTimer({ days, hours, minutes, seconds }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true);
  }, []);
  
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

  // Simple Mobile-First Responsive System (aligned with hero section)
  const getResponsiveSize = () => {
    return { gap: 0.2 };
  };

  const { gap } = getResponsiveSize();

  // Calculate label positions to align with digit groups
  const calculateLabelPositions = () => {
    // Each digit group structure: 2 digits (5 cols each) + 1 gap = 11 cols per group
    // Colon structure: 1 gap + 1 colon + 1 gap = 3 cols
    // Total structure: 11 + 3 + 11 + 3 + 11 + 3 + 11 = 53 cols + 2 padding = 55 cols
    
    const digitWidth = 5; // Each digit is 5 columns wide
    const gapWidth = 1;   // Gap between digits in same group
    const colonWidth = 3; // Gap + colon + gap
    const paddingWidth = 1; // Border padding
    
    // Calculate center positions for each group
    const positions = [];
    let currentPos = paddingWidth; // Start after left padding
    
    // Days group: 2 digits + gap = 11 columns
    const daysCenter = currentPos + (digitWidth * 2 + gapWidth) / 2;
    positions.push(daysCenter);
    currentPos += digitWidth * 2 + gapWidth + colonWidth;
    
    // Hours group
    const hoursCenter = currentPos + (digitWidth * 2 + gapWidth) / 2;
    positions.push(hoursCenter);
    currentPos += digitWidth * 2 + gapWidth + colonWidth;
    
    // Minutes group  
    const minutesCenter = currentPos + (digitWidth * 2 + gapWidth) / 2;
    positions.push(minutesCenter);
    currentPos += digitWidth * 2 + gapWidth + colonWidth;
    
    // Seconds group
    const secondsCenter = currentPos + (digitWidth * 2 + gapWidth) / 2;
    positions.push(secondsCenter);
    
    // Convert to percentages of total width
    const totalWidth = paddedCols;
    return positions.map(pos => (pos / totalWidth) * 100);
  };

  const labelPositions = calculateLabelPositions();

  return (
    <div className="flex flex-col items-center w-full countdown-timer-container">
      {/* Responsive Container - inherits parent sizing */}
      <div className="w-full flex justify-center">
        <div
          className="grid transition-all duration-300 ease-out"
          style={{
            gridTemplateColumns: `repeat(${paddedCols}, 1fr)`,
            gridTemplateRows: `repeat(${paddedRows}, 1fr)`,
            gap: `${gap}px`,
          }}
        >
          {paddedGrid.flat().map((cell, i) => (
            <div
              key={i}
              className={`
                border border-stone-300/20 transition-all duration-300
                ${cell ? 'bg-white shadow-sm' : 'bg-transparent'}
                w-1 h-1
                sm:w-1.5 sm:h-1.5
                lg:w-1.5 lg:h-1.5
              `}
              style={{
                borderWidth: '0.5px',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Aligned Label Row - positioned to match digit groups */}
      <div className="relative w-full mt-4">
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, index) => (
          <span
            key={label}
            className="
              absolute text-white font-montserrat text-center
              text-xs sm:text-sm lg:text-base
              transform -translate-x-1/2
            "
            style={{
              left: `${labelPositions[index]}%`,
            }}
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