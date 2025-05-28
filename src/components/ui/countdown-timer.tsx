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
function padPattern(pattern: number[][], cols = 6) {
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
  Object.entries(DIGIT_PATTERNS).map(([digit, pattern]) => [digit, padPattern(pattern, 6)])
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
const renderDigit = (digit: string, size: number | string) => {
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

  const svgStyle = typeof size === 'string' ? {
    width: size,
    height: `calc(${size} * ${totalHeight / totalWidth})`,
  } : {
    width: size,
    height: size * (totalHeight / totalWidth),
  };

  return (
    <svg
      style={svgStyle}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      className="text-white block"
    >
      {cells}
    </svg>
  );
};

// Helper function to render a colon - using same base grid for perfect alignment
const renderColon = (size: number | string) => {
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
  
  const svgStyle = typeof size === 'string' ? {
    width: `calc(${size} * ${actualWidth / totalWidth})`,
    height: `calc(${size} * ${totalHeight / totalWidth})`,
  } : {
    width: size * (actualWidth / totalWidth),
    height: size * (totalHeight / totalWidth),
  };

  return (
    <svg
      style={svgStyle}
      viewBox={`0 0 ${actualWidth} ${totalHeight}`}
      className="text-white block"
    >
      {cells}
    </svg>
  );
};

// Helper function to render an empty column spacer
const renderEmptyColumn = (size: number | string) => {
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
  
  const svgStyle = typeof size === 'string' ? {
    width: `calc(${size} * ${actualWidth / totalWidth})`,
    height: `calc(${size} * ${totalHeight / totalWidth})`,
  } : {
    width: size * (actualWidth / totalWidth),
    height: size * (totalHeight / totalWidth),
  };

  return (
    <svg
      style={svgStyle}
      viewBox={`0 0 ${actualWidth} ${totalHeight}`}
      className="text-white block"
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

  // Dynamic sizing based on viewport width
  const digitSize = "clamp(25px, 8vw, 50px)";

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        {/* Use flexbox with no gaps for seamless layout */}
        <div className="flex justify-center items-center gap-0">
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

        {/* Labels - use flexbox to match the timer layout exactly */}
        <div className="flex justify-center items-center gap-0 mt-2">
          {/* Days label - matches width of 2 digits */}
          <div 
            className="text-center"
            style={{
              width: `calc(${digitSize} * 2 * 6 / 6)`, // 2 digits worth of space
              fontSize: 'clamp(0.5rem, 2.5vw, 0.875rem)',
            }}
          >
            <span className="text-white/70 font-montserrat uppercase tracking-wider">
              Days
            </span>
          </div>

          {/* Colon space */}
          <div 
            style={{
              width: `calc(${digitSize} * 2 / 6)`, // Colon width
            }}
          ></div>

          {/* Hours label - matches width of 2 digits */}
          <div 
            className="text-center"
            style={{
              width: `calc(${digitSize} * 2 * 6 / 6)`, // 2 digits worth of space
              fontSize: 'clamp(0.5rem, 2.5vw, 0.875rem)',
            }}
          >
            <span className="text-white/70 font-montserrat uppercase tracking-wider">
              Hours
            </span>
          </div>

          {/* Colon space */}
          <div 
            style={{
              width: `calc(${digitSize} * 2 / 6)`, // Colon width
            }}
          ></div>

          {/* Minutes label - matches width of 2 digits */}
          <div 
            className="text-center"
            style={{
              width: `calc(${digitSize} * 2 * 6 / 6)`, // 2 digits worth of space
              fontSize: 'clamp(0.5rem, 2.5vw, 0.875rem)',
            }}
          >
            <span className="text-white/70 font-montserrat uppercase tracking-wider">
              Minutes
            </span>
          </div>

          {/* Colon space */}
          <div 
            style={{
              width: `calc(${digitSize} * 2 / 6)`, // Colon width
            }}
          ></div>

          {/* Seconds label - matches width of 2 digits */}
          <div 
            className="text-center"
            style={{
              width: `calc(${digitSize} * 2 * 6 / 6)`, // 2 digits worth of space
              fontSize: 'clamp(0.5rem, 2.5vw, 0.875rem)',
            }}
          >
            <span className="text-white/70 font-montserrat uppercase tracking-wider">
              Seconds
            </span>
          </div>

          {/* Empty column space */}
          <div 
            style={{
              width: `calc(${digitSize} * 1 / 6)`, // Empty column width
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Add flip animation
// In your global CSS (e.g., globals.css or tailwind config):
// @keyframes flip { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(180deg); } } 