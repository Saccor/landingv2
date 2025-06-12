"use client";
import React, { useState, useEffect } from 'react';
import Digit0 from './digits/Digit0';
import Digit1 from './digits/Digit1';
import Digit2 from './digits/Digit2';
import Digit3 from './digits/Digit3';
import Digit4 from './digits/Digit4';
import Digit5 from './digits/Digit5';
import Digit6 from './digits/Digit6';
import Digit7 from './digits/Digit7';
import Digit8 from './digits/Digit8';
import Digit9 from './digits/Digit9';
import Colon from './digits/Colon';
import Separator from './digits/Separator';

// August 11th launch date
const LAUNCH_DATE = new Date(new Date().getFullYear(), 7, 11, 0, 0, 0); // August is month 7 (0-indexed)

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Map digit numbers to components
  const digitComponents = {
    0: Digit0,
    1: Digit1,
    2: Digit2,
    3: Digit3,
    4: Digit4,
    5: Digit5,
    6: Digit6,
    7: Digit7,
    8: Digit8,
    9: Digit9,
  };

  const renderDigit = (digit: number) => {
    const DigitComponent = digitComponents[digit as keyof typeof digitComponents];
    return <DigitComponent className="w-[30px] h-[49px]" />;
  };

  const renderDoubleDigit = (value: number) => {
    const tens = Math.floor(value / 10);
    const ones = value % 10;
    return (
      <div className="flex items-center">
        {renderDigit(tens)}
        <Separator className="w-[5.25px] h-[49px]" />
        {renderDigit(ones)}
      </div>
    );
  };

  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const distance = LAUNCH_DATE.getTime() - now;

    if (distance < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Set initial time
    setTimeRemaining(calculateTimeRemaining());

    return () => clearInterval(timer);
  }, []);

  // Digit group container component
  const DigitGroup: React.FC<{ 
    digits: React.ReactNode; 
    label: string; 
  }> = ({ digits, label }) => (
    <div className="flex flex-col items-center">
      {digits}
      <span className="font-montserrat font-normal text-[10px] leading-[12px] text-[#F5F5F5] mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-start justify-center">
      {/* Days */}
      <DigitGroup 
        digits={renderDoubleDigit(timeRemaining.days)} 
        label="Days" 
      />
      
      {/* Colon 1 */}
      <div className="flex items-start pt-0">
        <Colon className="w-[17.75px] h-[49px]" />
      </div>
      
      {/* Hours */}
      <DigitGroup 
        digits={renderDoubleDigit(timeRemaining.hours)} 
        label="Hours" 
      />
      
      {/* Colon 2 */}
      <div className="flex items-start pt-0">
        <Colon className="w-[17.75px] h-[49px]" />
      </div>
      
      {/* Minutes */}
      <DigitGroup 
        digits={renderDoubleDigit(timeRemaining.minutes)} 
        label="Minutes" 
      />
      
      {/* Colon 3 */}
      <div className="flex items-start pt-0">
        <Colon className="w-[17.75px] h-[49px]" />
      </div>
      
      {/* Seconds */}
      <DigitGroup 
        digits={renderDoubleDigit(timeRemaining.seconds)} 
        label="Seconds" 
      />
    </div>
  );
};

export default CountdownTimer; 