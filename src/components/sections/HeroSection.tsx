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
    <section className="w-full bg-[#020202] flex justify-center items-stretch min-h-[500px] md:min-h-[600px] py-4 sm:py-6 md:py-0 pb-1 sm:pb-2">
      <div className="w-full max-w-[1440px] flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 min-h-[500px] md:min-h-[600px]">
        {/* Left: Image Container */}
        <div
          className="w-full md:w-1/2 h-[320px] sm:h-[380px] md:h-[539.81px] rounded-2xl min-w-0"
          style={{
            backgroundImage: "url('/heroimg.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Right: Content Container */}
        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-start px-4 sm:px-8 md:px-0 py-6 md:py-4 mx-auto">
          <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-[43px] w-full max-w-[720px]">
            <h1 className="text-center text-white text-4xl md:text-5xl font-bold font-montserrat leading-tight">
              Shape the future of <br />sustainable sound
            </h1>
            <CountdownTimer {...countdown} />
            <p className="text-center text-white text-lg font-normal font-poppins leading-7">
              Subscribe now — don&apos;t miss a thing. The countdown to launch has begun!
            </p>
            <form className="w-full max-w-[420px] mx-auto flex flex-row items-center gap-3">
              <input
                type="email"
                placeholder="email"
                className="flex-1 h-11 px-5 py-2.5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-white bg-transparent text-white font-poppins"
              />
              <button
                type="submit"
                className="h-11 px-5 py-2.5 bg-white rounded-[55px] text-black text-sm font-medium font-poppins"
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