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
    <div className="w-full flex flex-col items-center">
      {/* Mobile-first fluid timer display */}
      <div className="w-full max-w-[clamp(280px,90%,500px)]">
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="text-white font-bold font-montserrat text-[clamp(2rem,6vw,3.5rem)] leading-none">
              {days}
            </span>
            <span className="text-white/70 font-montserrat text-[clamp(0.7rem,2vw,0.9rem)] uppercase tracking-wider mt-1">
              Days
            </span>
          </div>

          {/* Colon */}
          <span className="text-white font-bold font-montserrat text-[clamp(1.5rem,5vw,2.5rem)] leading-none mb-4 sm:mb-5">
            :
          </span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-white font-bold font-montserrat text-[clamp(2rem,6vw,3.5rem)] leading-none">
              {hours}
            </span>
            <span className="text-white/70 font-montserrat text-[clamp(0.7rem,2vw,0.9rem)] uppercase tracking-wider mt-1">
              Hours
            </span>
          </div>

          {/* Colon */}
          <span className="text-white font-bold font-montserrat text-[clamp(1.5rem,5vw,2.5rem)] leading-none mb-4 sm:mb-5">
            :
          </span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="text-white font-bold font-montserrat text-[clamp(2rem,6vw,3.5rem)] leading-none">
              {minutes}
            </span>
            <span className="text-white/70 font-montserrat text-[clamp(0.7rem,2vw,0.9rem)] uppercase tracking-wider mt-1">
              Minutes
            </span>
          </div>

          {/* Colon */}
          <span className="text-white font-bold font-montserrat text-[clamp(1.5rem,5vw,2.5rem)] leading-none mb-4 sm:mb-5">
            :
          </span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="text-white font-bold font-montserrat text-[clamp(2rem,6vw,3.5rem)] leading-none">
              {seconds}
            </span>
            <span className="text-white/70 font-montserrat text-[clamp(0.7rem,2vw,0.9rem)] uppercase tracking-wider mt-1">
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