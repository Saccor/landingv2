'use client';

import React, { useEffect, useState } from 'react';

// Grid size
const CELL_SIZE = 6; // in px

// Map digits to 5x10 pixel grid (1 = lit, 0 = unlit)
const DIGIT_MAP: Record<string, number[][]> = {
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

// Utility
function getTimeSegments(target: Date) {
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
}

// Digit Component
const CountdownDigit = ({ char }: { char: string }) => {
  const grid = DIGIT_MAP[char];
  if (!grid) return null;

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${grid[0].length}, ${CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${grid.length}, ${CELL_SIZE}px)`,
        gap: '1px',
      }}
    >
      {grid.flat().map((cell, i) => (
        <div
          key={i}
          style={{
            width: `${CELL_SIZE}px`,
            height: `${CELL_SIZE}px`,
            backgroundColor: cell ? '#FFFFFF' : '#000000',
            border: cell ? 'none' : '0.5px solid #2a2a2a',
          }}
        />
      ))}
    </div>
  );
};

// Countdown Component
export default function CountdownTimerPixel({ targetDate }: { targetDate: string }) {
  const [segments, setSegments] = useState<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setSegments(getTimeSegments(new Date(targetDate)));

    const interval = setInterval(() => {
      setSegments(getTimeSegments(new Date(targetDate)));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isMounted || !segments) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center flex-wrap gap-0" style={{ minHeight: '60px' }}>
          <div className="text-white font-mono">Loading...</div>
        </div>
        <div className="flex justify-center mt-2 text-xs text-white font-mono">
          <div style={{ width: '100px', textAlign: 'center' }}>Days</div>
          <div style={{ width: '100px', textAlign: 'center' }}>Hours</div>
          <div style={{ width: '100px', textAlign: 'center' }}>Minutes</div>
          <div style={{ width: '100px', textAlign: 'center' }}>Seconds</div>
        </div>
      </div>
    );
  }

  const rawDigits = `${segments.days}:${segments.hours}:${segments.minutes}:${segments.seconds}`;

  const timeStringWithSpacers = [
    '_',
    ...rawDigits.split('').flatMap((char, idx, arr) =>
      idx < arr.length - 1 ? [char, '_'] : [char]
    ),
    '_',
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center flex-wrap gap-0">
        {timeStringWithSpacers.map((char, i) => (
          <div
            key={i}
            style={{
              marginRight: i < timeStringWithSpacers.length - 1 ? '1px' : '0px',
            }}
          >
            <CountdownDigit char={char} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-2 text-xs text-white font-mono">
        <div style={{ width: '100px', textAlign: 'center' }}>Days</div>
        <div style={{ width: '100px', textAlign: 'center' }}>Hours</div>
        <div style={{ width: '100px', textAlign: 'center' }}>Minutes</div>
        <div style={{ width: '100px', textAlign: 'center' }}>Seconds</div>
      </div>
    </div>
  );
}
