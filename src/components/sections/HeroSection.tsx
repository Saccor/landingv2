"use client";
import React, { useEffect, useState } from 'react';
import CountdownTimer from '@/components/ui/countdown-timer';
import SignupForm from '@/components/common/SignupForm';

const LAUNCH_DATE = new Date(new Date().getFullYear(), 7, 1, 0, 0, 0); // August is month 7 (0-indexed)

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
    <section className="w-full max-w-[1440px] mx-auto relative">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-[1440px] h-auto lg:h-[539.81px] mt-[97px] mx-auto p-0">
        {/* Hero Image */}
        <div
          className="w-full h-[294.65px] lg:w-[720px] lg:h-[539.81px]"
          style={{
            backgroundImage: "url('/heroimg.png')",
            backgroundColor: '#1f2937',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Content (mobile: below image, desktop: right side) */}
        <div className="flex flex-col items-center w-full max-w-[393px] mx-auto lg:w-[720px] lg:h-[462.13px] lg:gap-[40px] gap-6 p-3 lg:p-0 text-center">
          <h1 className="font-montserrat font-bold text-[30px] leading-[38px] text-[#FCFCFD] max-w-[369px] w-full">
            Shape the future of sustainable sound
          </h1>
          <div className="w-full h-[75.12px] flex items-center justify-center lg:w-[506.98px] lg:h-[112.13px] lg:items-start lg:gap-[1.39px] lg:max-w-none">
            <CountdownTimer {...countdown} />
          </div>
          <div className="w-full flex flex-col gap-2 items-center justify-center text-center lg:w-[421.79px] lg:h-[102px]">
            <p className="font-montserrat font-normal text-[18px] leading-[28px] text-[#F5F5F5]">
              <span className="font-bold">Sign up now</span> — countdown&apos;s ticking and secrets awaits.
            </p>
            <p className="font-montserrat font-normal text-[18px] leading-[28px] text-[#F5F5F5]">
              485 of 1000 spots already gone.
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <SignupForm buttonText="Sign-up" />
          </div>
        </div>
      </div>
    </section>
  );
} 