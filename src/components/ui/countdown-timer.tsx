import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

// SVG patterns for digits (5x8 grid)
const DIGIT_PATTERNS = {
  '0': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '1': [
    [0,0,1,0,0],
    [0,1,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0]
  ],
  '2': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [0,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1]
  ],
  '3': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [0,0,0,0,1],
    [0,0,1,1,0],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '4': [
    [0,0,0,1,0],
    [0,0,1,1,0],
    [0,1,0,1,0],
    [1,0,0,1,0],
    [1,1,1,1,1],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,0,0,1,0]
  ],
  '5': [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '6': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '7': [
    [1,1,1,1,1],
    [0,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0]
  ],
  '8': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '9': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,1],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ]
};

// Helper to pad a pattern with minimal padding for clean layout
function padPattern(pattern: number[][], rows = 10, cols = 6) {
  // Add 1 empty row on top AND 1 empty row on bottom
  // Add 1 empty column on left only (no right padding)
  // This gives us: 1 (left) + 5 (pattern width) = 6 cols total
  const padded = [];
  
  // Add 1 empty row on top
  padded.push(Array(cols).fill(0));
  
  // Add the pattern rows with 1 empty column on the left only
  const left = 1; // Always 1 empty column on left
  
  for (let y = 0; y < pattern.length; y++) {
    padded.push([
      ...Array(left).fill(0),
      ...pattern[y]
    ]);
  }
  
  // Add 1 empty row on bottom
  padded.push(Array(cols).fill(0));
  
  return padded;
}

// Pad all digit patterns to 10x6 (1 empty border on top, bottom, and left only)
const PADDED_DIGIT_PATTERNS = Object.fromEntries(
  Object.entries(DIGIT_PATTERNS).map(([digit, pattern]) => [digit, padPattern(pattern, 10, 6)])
);

// Simplified colon pattern for 2-column grid (remove empty right columns)
const COLON_PATTERN_SIMPLE = [
  [0,0], // row 1 - empty
  [0,0], // row 2 - empty  
  [0,0], // row 3 - empty
  [0,1], // row 4 - DOT in column 2
  [0,0], // row 5 - empty
  [0,0], // row 6 - empty
  [0,1], // row 7 - DOT in column 2
  [0,0], // row 8 - empty
  [0,0], // row 9 - empty
  [0,0]  // row 10 - empty
];

// Helper function to render a digit using SVG with grid always visible and border
const renderDigit = (digit: string, size: number) => {
  const pattern = PADDED_DIGIT_PATTERNS[digit as keyof typeof PADDED_DIGIT_PATTERNS];
  if (!pattern) return null;
  const rows = pattern.length; // This is now 10
  const cols = pattern[0].length; // This is now 6
  
  // Standardized grid calculations with proper spacing between cells
  const baseGridSize = 6; // All calculations based on 6-column standard
  const cellSpacing = 0.1; // Gap between cells
  const cellSize = 0.9; // Cell size (smaller than 1 to leave room for gaps)
  const cellUnit = 1; // Base unit includes cell + spacing
  
  // Calculate dimensions - now includes spacing in positioning
  const totalWidth = baseGridSize * cellUnit;
  const totalHeight = rows * cellUnit;
  
  const cells = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const isOn = pattern[y][x];
      cells.push(
        <rect
          key={`cell-${x}-${y}`}
          x={x * cellUnit + cellSpacing / 2}
          y={y * cellUnit + cellSpacing / 2}
          width={cellSize}
          height={cellSize}
          fill={isOn ? "white" : "none"}
          stroke="#d6d3d1"
          strokeWidth={0.02}
          strokeOpacity={0.6}
          rx={0.1}
          ry={0.1}
        />
      );
    }
  }

  return (
    <svg
      width={size}
      height={size * (totalHeight / totalWidth)}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      className="text-white"
      style={{ display: 'block' }}
    >
      {cells}
    </svg>
  );
};

// Helper function to render a colon - using same base grid for perfect alignment
const renderColon = (size: number) => {
  const pattern = COLON_PATTERN_SIMPLE;
  const rows = pattern.length; // 10
  const cols = pattern[0].length; // 2
  
  // Use exact same grid system as digits with proper spacing
  const baseGridSize = 6; // Same as digits
  const cellSpacing = 0.1;
  const cellSize = 0.9;
  const cellUnit = 1;
  
  // Same total dimensions as digits for perfect alignment
  const totalWidth = baseGridSize * cellUnit;
  const totalHeight = rows * cellUnit;
  
  const cells = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const isOn = pattern[y][x];
      cells.push(
        <rect
          key={`cell-c-${x}-${y}`}
          x={x * cellUnit + cellSpacing / 2}
          y={y * cellUnit + cellSpacing / 2}
          width={cellSize}
          height={cellSize}
          fill={isOn ? "white" : "none"}
          stroke="#d6d3d1"
          strokeWidth={0.02}
          strokeOpacity={0.6}
          rx={0.1}
          ry={0.1}
        />
      );
    }
  }

  // Use exact proportional width for perfect fit
  const actualWidth = cols * cellUnit;
  const scaledWidth = size * (actualWidth / totalWidth);

  return (
    <svg
      width={scaledWidth}
      height={size * (totalHeight / totalWidth)}
      viewBox={`0 0 ${actualWidth} ${totalHeight}`}
      className="text-white"
      style={{ display: 'block' }}
    >
      {cells}
    </svg>
  );
};

// Helper function to render an empty column spacer
const renderEmptyColumn = (size: number) => {
  const rows = 10;
  const cols = 1; // Just 1 empty column
  
  // Use exact same grid system as digits for perfect alignment with spacing
  const baseGridSize = 6; // Same as digits
  const cellSpacing = 0.1;
  const cellSize = 0.9;
  const cellUnit = 1;
  
  // Same total dimensions as digits for perfect alignment
  const totalWidth = baseGridSize * cellUnit;
  const totalHeight = rows * cellUnit;
  
  const cells = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      cells.push(
        <rect
          key={`cell-e-${x}-${y}`}
          x={x * cellUnit + cellSpacing / 2}
          y={y * cellUnit + cellSpacing / 2}
          width={cellSize}
          height={cellSize}
          fill="none"
          stroke="#d6d3d1"
          strokeWidth={0.02}
          strokeOpacity={0.6}
          rx={0.1}
          ry={0.1}
        />
      );
    }
  }

  // Use exact proportional width for perfect fit
  const actualWidth = cols * cellUnit;
  const scaledWidth = size * (actualWidth / totalWidth);

  return (
    <svg
      width={scaledWidth}
      height={size * (totalHeight / totalWidth)}
      viewBox={`0 0 ${actualWidth} ${totalHeight}`}
      className="text-white"
      style={{ display: 'block' }}
    >
      {cells}
    </svg>
  );
};

export default function CountdownTimer({ days, hours, minutes, seconds }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatches
  if (!mounted) return null;

  // Simple responsive digit size - no complex calculations
  const digitSize = 50; // Base size, CSS will handle responsiveness

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[clamp(220px,90vw,600px)]">
        {/* Use flexbox with no gaps for seamless grid */}
        <div 
          className="flex justify-center items-center gap-0"
          style={{
            transform: 'scale(clamp(0.4, 2vw, 1))',
            transformOrigin: 'center'
          }}
        >
          {/* Days */}
          <div className="flex gap-0">
            {days.split('').map((digit, i) => (
              <div key={`days-${i}`} className="flex-shrink-0">
                {renderDigit(digit, digitSize)}
              </div>
            ))}
          </div>

          {/* Colon */}
          <div className="flex-shrink-0">
            {renderColon(digitSize)}
          </div>

          {/* Hours */}
          <div className="flex gap-0">
            {hours.split('').map((digit, i) => (
              <div key={`hours-${i}`} className="flex-shrink-0">
                {renderDigit(digit, digitSize)}
              </div>
            ))}
          </div>

          {/* Colon */}
          <div className="flex-shrink-0">
            {renderColon(digitSize)}
          </div>

          {/* Minutes */}
          <div className="flex gap-0">
            {minutes.split('').map((digit, i) => (
              <div key={`minutes-${i}`} className="flex-shrink-0">
                {renderDigit(digit, digitSize)}
              </div>
            ))}
          </div>

          {/* Colon */}
          <div className="flex-shrink-0">
            {renderColon(digitSize)}
          </div>

          {/* Seconds */}
          <div className="flex gap-0">
            {seconds.split('').map((digit, i) => (
              <div key={`seconds-${i}`} className="flex-shrink-0">
                {renderDigit(digit, digitSize)}
              </div>
            ))}
          </div>

          {/* Empty column spacer after seconds */}
          <div className="flex-shrink-0">
            {renderEmptyColumn(digitSize)}
          </div>
        </div>

        {/* Labels */}
        <div 
          className="flex justify-center items-center gap-0 mt-2"
          style={{
            transform: 'scale(clamp(0.4, 2vw, 1))',
            transformOrigin: 'center'
          }}
        >
          <div className="flex-1 text-center">
            <span className="text-white/70 font-montserrat text-sm uppercase tracking-wider">
              Days
            </span>
          </div>
          <div className="w-6"></div> {/* Space for colon */}
          <div className="flex-1 text-center">
            <span className="text-white/70 font-montserrat text-sm uppercase tracking-wider">
              Hours
            </span>
          </div>
          <div className="w-6"></div> {/* Space for colon */}
          <div className="flex-1 text-center">
            <span className="text-white/70 font-montserrat text-sm uppercase tracking-wider">
              Minutes
            </span>
          </div>
          <div className="w-6"></div> {/* Space for colon */}
          <div className="flex-1 text-center">
            <span className="text-white/70 font-montserrat text-sm uppercase tracking-wider">
              Seconds
            </span>
          </div>
          <div className="w-1"></div> {/* Space for empty column */}
        </div>
      </div>
    </div>
  );
}

// Add flip animation
// In your global CSS (e.g., globals.css or tailwind config):
// @keyframes flip { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(180deg); } } 