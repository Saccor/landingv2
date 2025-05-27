"use client";
import React, { useEffect, useState } from 'react';
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
    <section className="bg-[#020202] overflow-hidden">
      {/* Container: Clean, simple approach with proper spacing */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Layout Grid: Mobile stack, desktop row */}
        <div className="
          w-full 
          grid grid-cols-1 lg:grid-cols-2 
          gap-8 lg:gap-12 xl:gap-16
          items-center
        ">
          
          {/* Image: Aspect-ratio based, simple sizing */}
          <div className="
            w-full max-w-sm mx-auto lg:max-w-none
            aspect-[4/5] lg:aspect-square
            rounded-2xl lg:rounded-3xl
            overflow-hidden bg-gray-900
            order-1 lg:order-1
          ">
            <div
              className="w-full h-full transition-transform duration-500 hover:scale-105"
              style={{
                backgroundImage: "url('/heroimg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>

          {/* Content: Clean spacing and typography */}
          <div className="
            flex flex-col items-center text-center
            space-y-6 lg:space-y-8
            order-2 lg:order-2
            max-w-lg mx-auto lg:max-w-none
          ">
            
            {/* Heading: Simple responsive typography */}
            <h1 className="
              text-white font-bold font-montserrat 
              text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl
              leading-tight
            ">
              Shape the future of{' '}
              <br className="hidden sm:block lg:hidden xl:block" />
              <span className="sm:hidden lg:inline xl:hidden"> </span>
              sustainable sound
            </h1>

            {/* Timer: Inherits parent container sizing */}
            <CountdownTimer {...countdown} />

            {/* Subtitle: Clean typography scale */}
            <p className="
              text-white font-poppins leading-relaxed
              text-sm sm:text-base lg:text-lg
              max-w-sm lg:max-w-md
            ">
              Subscribe now — don&apos;t miss a thing. The countdown to launch has begun!
            </p>

            {/* Form: Simple responsive layout */}
            <form className="
              w-full max-w-sm lg:max-w-md
              flex flex-col sm:flex-row
              gap-3 sm:gap-4
            ">
              <input
                type="email"
                placeholder="email"
                className="
                  flex-1 h-12
                  px-4 rounded-full
                  border border-white/20 bg-transparent
                  text-white placeholder:text-gray-400
                  focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20
                  transition-all duration-200
                "
              />
              <button
                type="submit"
                className="
                  px-8 h-12 
                  bg-white text-black font-medium font-poppins
                  rounded-full
                  hover:bg-gray-100 active:bg-gray-200
                  transition-all duration-200
                  whitespace-nowrap
                "
              >
                Sign-up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 