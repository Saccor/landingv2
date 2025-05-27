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
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => { 
    setMounted(true);
    
    // Set initial container width
    const updateContainerWidth = () => {
      const width = window.innerWidth;
      setContainerWidth(width);
    };
    
    updateContainerWidth();
    
    const handleResize = () => {
      updateContainerWidth();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  // Enhanced Responsive System with Proper iPad Pro Detection
  const getResponsiveSize = () => {
    if (!mounted || containerWidth === 0) return { squareSize: 6, gap: 1.5, maxWidth: 400 };
    
    // Detect iPad Pro specifically using user agent and dimensions
    const isIPadPro = /iPad/.test(navigator.userAgent) || 
                      (containerWidth === 1024 && window.innerHeight === 1366) ||
                      (containerWidth === 1366 && window.innerHeight === 1024);
    
    // Debug logging for iPad Pro detection
    if (containerWidth > 1000) {
      console.log('CountdownTimer Debug:', {
        containerWidth,
        windowHeight: window.innerHeight,
        isIPadPro,
        userAgent: navigator.userAgent,
      });
    }
    
    // Calculate available space (with padding)
    const availableWidth = Math.min(containerWidth * 0.95, 700);
    
    // Calculate optimal square size based on available space
    const totalGaps = (paddedCols - 1);
    const gapRatio = 0.2; // Gap should be 20% of square size
    
    // Solve: availableWidth = (squareSize * paddedCols) + (gap * totalGaps)
    // Where gap = squareSize * gapRatio
    const optimalSquareSize = availableWidth / (paddedCols + (totalGaps * gapRatio));
    const optimalGap = optimalSquareSize * gapRatio;
    
    // Define breakpoint-based constraints with proper iPad Pro detection
    let squareSize, gap, maxWidth;
    
    // iPad Pro gets special treatment regardless of window width
    if (isIPadPro) {
      squareSize = Math.min(optimalSquareSize, 4.8); // Smaller squares for iPad Pro
      gap = Math.max(squareSize * 0.16, 1.0);
      maxWidth = Math.min(containerWidth * 0.90, 480); // Tighter container
    } else if (containerWidth < 480) {
      // Extra Small Mobile
      squareSize = Math.min(optimalSquareSize, 3.5);
      gap = Math.max(squareSize * 0.15, 0.8);
      maxWidth = containerWidth * 0.95;
    } else if (containerWidth < 640) {
      // Small Mobile
      squareSize = Math.min(optimalSquareSize, 4.5);
      gap = Math.max(squareSize * 0.2, 1);
      maxWidth = containerWidth * 0.9;
    } else if (containerWidth < 768) {
      // Large Mobile / Small Tablet
      squareSize = Math.min(optimalSquareSize, 5.5);
      gap = Math.max(squareSize * 0.2, 1.2);
      maxWidth = Math.min(containerWidth * 0.85, 500);
    } else if (containerWidth < 1024) {
      // Standard Tablet
      squareSize = Math.min(optimalSquareSize, 6.5);
      gap = Math.max(squareSize * 0.2, 1.4);
      maxWidth = Math.min(containerWidth * 0.8, 550);
    } else if (containerWidth < 1280) {
      // Small Desktop
      squareSize = Math.min(optimalSquareSize, 7.8);
      gap = Math.max(squareSize * 0.24, 1.8);
      maxWidth = Math.min(containerWidth * 0.7, 650);
    } else {
      // Large Desktop
      squareSize = Math.min(optimalSquareSize, 8.5);
      gap = Math.max(squareSize * 0.26, 2);
      maxWidth = Math.min(containerWidth * 0.65, 700);
    }
    
    // Ensure minimum readable size
    squareSize = Math.max(squareSize, 2.5);
    gap = Math.max(gap, 0.5);
    
    return { squareSize, gap, maxWidth };
  };

  const { squareSize: SQUARE_SIZE, gap: GAP, maxWidth: MAX_WIDTH } = getResponsiveSize();
  const calculatedWidth = paddedCols * SQUARE_SIZE + (paddedCols - 1) * GAP;
  const calculatedHeight = paddedRows * SQUARE_SIZE + (paddedRows - 1) * GAP;

  return (
    <div className="flex flex-col items-center w-full countdown-timer-container">
      {/* Responsive Timer Container */}
      <div
        className="relative flex justify-center items-center w-full overflow-hidden"
        style={{
          maxWidth: `${MAX_WIDTH}px`,
          minHeight: `${calculatedHeight + 20}px`, // Add buffer
        }}
      >
        <div
          className="grid transition-all duration-300 ease-out countdown-grid"
          style={{
            gridTemplateColumns: `repeat(${paddedCols}, 1fr)`,
            gridTemplateRows: `repeat(${paddedRows}, 1fr)`,
            gap: `${GAP}px`,
            width: `${Math.min(calculatedWidth, MAX_WIDTH)}px`,
            height: `${calculatedHeight}px`,
          }}
        >
          {paddedGrid.flat().map((cell, i) => (
            <div
              key={i}
              className={`
                border border-stone-300/20 transition-all duration-300
                ${cell ? 'bg-white shadow-sm' : 'bg-transparent'}
              `}
              style={{
                width: `${SQUARE_SIZE}px`,
                height: `${SQUARE_SIZE}px`,
                borderWidth: Math.max(0.5, SQUARE_SIZE * 0.08),
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Responsive Label Row */}
      <div
        className="flex flex-row justify-between items-center w-full mt-3 gap-2 px-2"
        style={{ 
          maxWidth: `${MAX_WIDTH}px`,
        }}
      >
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => (
          <span
            key={label}
            className="
              text-white font-montserrat text-center flex-1
              text-xs sm:text-sm md:text-base lg:text-lg
              transition-all duration-300
            "
            style={{
              fontSize: `${Math.max(0.75, SQUARE_SIZE * 0.18)}rem`,
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