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
    <section className="w-full bg-[#020202] overflow-hidden">
      {/* Responsive Container with Progressive Breakpoints + iPad Pro Support */}
      <div className="
        min-h-screen sm:min-h-[600px] md:min-h-[700px] lg:min-h-[750px] xl:min-h-[800px]
        w-full max-w-[2000px] mx-auto
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20
        py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20
      ">
        {/* Mobile-First Layout: Stack by default, side-by-side on larger screens */}
        <div className="
          flex flex-col lg:flex-row 
          items-center lg:items-stretch
          gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16
          h-full min-h-[calc(100vh-8rem)] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[650px]
        ">
          
          {/* Image Container - Enhanced for iPad Pro */}
          <div className="
            w-full lg:flex-1
            h-[40vh] sm:h-[45vh] md:h-[55vh] lg:h-auto 
            lg:min-h-[500px] xl:min-h-[600px]
            max-h-[400px] sm:max-h-[500px] md:max-h-[600px] lg:max-h-none
            rounded-2xl lg:rounded-3xl
            relative overflow-hidden
            order-1 lg:order-1
            bg-gray-900
          ">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: "url('/heroimg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>

          {/* Content Container - Enhanced for iPad Pro */}
          <div className="
            w-full lg:w-1/2 lg:max-w-[600px] xl:max-w-[700px]
            flex flex-col items-center justify-center
            px-2 sm:px-4 md:px-6 lg:px-8
            py-4 sm:py-6 md:py-8 lg:py-12
            order-2 lg:order-2
          ">
            <div className="
              flex flex-col items-center 
              gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12
              w-full max-w-[500px] lg:max-w-[600px]
            ">
              
              {/* Responsive Heading - Enhanced for iPad Pro */}
              <h1 className="
                text-center text-white font-bold font-montserrat leading-tight
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                px-2 sm:px-4
                [@media(min-width:820px)_and_(max-width:1024px)]:text-5xl
              ">
                Shape the future of <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>sustainable sound
              </h1>

              {/* Countdown Timer - Now with iPad Pro Optimization */}
              <div className="w-full flex justify-center">
                <CountdownTimer {...countdown} />
              </div>

              {/* Responsive Subtitle - Enhanced for iPad Pro */}
              <p className="
                text-center text-white font-normal font-poppins leading-relaxed
                text-sm sm:text-base md:text-lg lg:text-xl
                px-2 sm:px-4 md:px-6
                max-w-[400px] sm:max-w-[500px] md:max-w-full
                [@media(min-width:820px)_and_(max-width:1024px)]:text-lg
              ">
                Subscribe now — don&apos;t miss a thing. The countdown to launch has begun!
              </p>

              {/* Responsive Form - Enhanced for iPad Pro */}
              <form className="
                w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px]
                flex flex-col sm:flex-row items-center 
                gap-3 sm:gap-4
                [@media(min-width:820px)_and_(max-width:1024px)]:max-w-[480px]
              ">
                <input
                  type="email"
                  placeholder="email"
                  className="
                    w-full sm:flex-1 
                    h-10 sm:h-11 md:h-12
                    px-4 sm:px-5 
                    py-2 sm:py-2.5
                    rounded-3xl 
                    outline outline-1 outline-offset-[-1px] outline-white 
                    bg-transparent text-white font-poppins
                    text-sm sm:text-base
                    placeholder:text-gray-400
                    [@media(min-width:820px)_and_(max-width:1024px)]:h-12
                    [@media(min-width:820px)_and_(max-width:1024px)]:text-base
                  "
                />
                <button
                  type="submit"
                  className="
                    w-full sm:w-auto
                    h-10 sm:h-11 md:h-12
                    px-6 sm:px-5 md:px-8
                    py-2 sm:py-2.5
                    bg-white rounded-[55px] 
                    text-black font-medium font-poppins
                    text-sm sm:text-base
                    hover:bg-gray-100 transition-colors
                    min-w-[100px] sm:min-w-[120px]
                    [@media(min-width:820px)_and_(max-width:1024px)]:h-12
                    [@media(min-width:820px)_and_(max-width:1024px)]:text-base
                  "
                >
                  Sign-up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 