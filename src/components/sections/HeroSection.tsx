"use client";
import React, { useEffect, useState } from 'react';
import SignupForm from '@/components/common/SignupForm';
import CountdownTimer from '@/components/ui/countdown-timer';

const LAUNCH_DATE = new Date(new Date().getFullYear(), 6, 22, 0, 0, 0); // July is month 6 (0-indexed)

function getTimeLeft() {
  const now = new Date();
  const diff = LAUNCH_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
  const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
  return { days, hours, minutes, seconds };
}

export default function HeroSection() {
  const [countdown, setCountdown] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="w-full flex justify-center items-center bg-[#020202] px-4 sm:px-8 md:px-16 lg:px-32 py-8 md:py-0"
      style={{ minHeight: '400px' }}
    >
      <div
        className="w-full max-w-[1440px] flex flex-col md:flex-row justify-center items-center gap-8"
        style={{ minHeight: '400px' }}
      >
        {/* Left: Image Container */}
        <div
          className="w-full md:w-1/2 h-[200px] xs:h-[250px] sm:h-[300px] md:h-[539.81px] flex-none order-0 flex-grow rounded-2xl"
          style={{
            backgroundImage: "url('/heroimg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Right: Content Container */}
        <div
          className="w-full md:w-1/2 h-auto flex flex-col items-center justify-center gap-6 md:gap-8 order-1 flex-grow px-0 sm:px-4"
        >
          <h1 className="text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-center leading-tight font-montserrat">
            Shape the future of<br />sustainable sound
          </h1>
          <CountdownTimer {...countdown} />
          <p className="text-white text-sm xs:text-base md:text-lg text-center font-poppins max-w-[420px]">
            Subscribe now — don't miss a thing. The countdown to launch has begun!
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[420px]">
            <SignupForm className="w-full h-full flex-col sm:flex-row gap-3 [&>form]:flex-col sm:[&>form]:flex-row [&>form]:gap-3 [&>form]:w-full" buttonText="Sign-up" />
          </div>
        </div>
      </div>
    </section>
  );
} 