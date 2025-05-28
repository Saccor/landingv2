"use client";
import React, { useEffect, useState } from 'react';
import CountdownTimer from '@/components/ui/countdown-timer';
import SignupForm from '@/components/common/SignupForm';

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
    <section className="bg-[#020202]">
      {/* Container: Clean layout without forced height constraints */}
      <div className="container mx-auto px-4 py-8 pb-16">
        
        {/* Layout: Mobile stack, desktop row with max-width constraint */}
        <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-6xl mx-auto">
          
          {/* Image: Larger, more prominent sizing */}
          <div className="flex-1 flex items-center justify-center">
            <div
              className="w-full max-w-lg aspect-[4/5] rounded-2xl overflow-hidden"
              style={{
                backgroundImage: "url('/heroimg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#1f2937', // fallback color
                minHeight: '500px' // larger minimum height
              }}
            />
          </div>

          {/* Content: Perfectly centered spacing and typography */}
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 px-4">
            
            {/* Heading: Fluid responsive typography */}
            <h1 className="text-white font-bold font-montserrat text-[clamp(1.5rem,5vw,2.5rem)] leading-tight max-w-md">
              Shape the future of sustainable sound
            </h1>

            {/* Timer: Clean container */}
            <CountdownTimer {...countdown} />

            {/* Subtitle: Fluid typography */}
            <p className="text-white font-poppins text-base leading-relaxed max-w-md">
              Subscribe now — don&apos;t miss a thing. The countdown to launch has begun!
            </p>

            {/* Form: Simple responsive layout */}
            <SignupForm buttonText="Sign-up" />
          </div>
        </div>
      </div>
    </section>
  );
} 