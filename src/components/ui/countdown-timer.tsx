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

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* Clean timer display with colons */}
      <div className="w-full max-w-[clamp(320px,95%,600px)]">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="text-white font-bold font-montserrat text-[clamp(2rem,6vw,4rem)] leading-none">
              {days}
            </span>
            <span className="text-white/70 font-montserrat text-[clamp(0.7rem,2vw,0.9rem)] uppercase tracking-wider">
              Days
            </span>
          </div>

          {/* Colon */}
          <span className="text-white font-bold font-montserrat text-[clamp(1.5rem,5vw,3rem)] leading-none mb-6">
            :
          </span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-white font-bold font-montserrat text-[clamp(2rem,6vw,4rem)] leading-none">
              {hours}
            </span>
            <span className="text-white/70 font-montserrat text-[clamp(0.7rem,2vw,0.9rem)] uppercase tracking-wider">
              Hours
            </span>
          </div>

          {/* Colon */}
          <span className="text-white font-bold font-montserrat text-[clamp(1.5rem,5vw,3rem)] leading-none mb-6">
            :
          </span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="text-white font-bold font-montserrat text-[clamp(2rem,6vw,4rem)] leading-none">
              {minutes}
            </span>
            <span className="text-white/70 font-montserrat text-[clamp(0.7rem,2vw,0.9rem)] uppercase tracking-wider">
              Minutes
            </span>
          </div>

          {/* Colon */}
          <span className="text-white font-bold font-montserrat text-[clamp(1.5rem,5vw,3rem)] leading-none mb-6">
            :
          </span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="text-white font-bold font-montserrat text-[clamp(2rem,6vw,4rem)] leading-none">
              {seconds}
            </span>
            <span className="text-white/70 font-montserrat text-[clamp(0.7rem,2vw,0.9rem)] uppercase tracking-wider">
              Seconds
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add flip animation
// In your global CSS (e.g., globals.css or tailwind config):
// @keyframes flip { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(180deg); } } 