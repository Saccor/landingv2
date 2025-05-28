"use client";
import React, { useEffect, useState } from 'react';
import CountdownTimer from '@/components/ui/countdown-timer';
import SignupForm from '@/components/common/SignupForm';

const LAUNCH_DATE = new Date(new Date().getFullYear(), 7, 11, 0, 0, 0); // August is month 7 (0-indexed)

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
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
        {/* Image: Fluid, responsive */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div
            className="w-full aspect-[4/5] max-w-[clamp(200px,60vw,400px)] rounded-2xl overflow-hidden"
            style={{
              backgroundImage: "url('/heroimg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#1f2937',
              minHeight: '200px',
            }}
          />
        </div>
        {/* Content: Fluid, mobile-first */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 px-0">
          <h1 className="text-white font-bold font-montserrat text-[clamp(1.5rem,5vw,2.5rem)] leading-tight max-w-md">
            Shape the future of sustainable sound
          </h1>
          {/* Timer: Fluid, percent-based scaling */}
          <div className="w-full max-w-[clamp(220px,90vw,600px)] mx-auto">
            <CountdownTimer {...countdown} />
          </div>
          <p className="text-white font-poppins text-base md:text-lg leading-relaxed max-w-md">
            Subscribe now — don&apos;t miss a thing. The countdown to launch has begun!
          </p>
          <SignupForm buttonText="Sign-up" />
        </div>
      </div>
    </section>
  );
} 