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
    <section className="w-full bg-black">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Hero Image */}
          <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:h-[540px]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: "url('/heroimg.png')",
                backgroundColor: '#1f2937',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-6 lg:gap-8 text-center lg:text-left">
            <h1 className="self-stretch text-center justify-start text-[var(--Gray-025,#fbfcfc)] text-3xl font-bold font-['Montserrat'] leading-9">
              Shape the future of sustainable sound
            </h1>

            <div className="w-full max-w-[506px]">
              <CountdownTimer {...countdown} />
            </div>

            <div className="flex flex-col gap-2 max-w-[421px]">
              <p className="font-montserrat text-lg leading-7 text-[#F5F5F5]">
                <span className="font-bold">Sign up now</span> — countdown&apos;s ticking and secrets awaits.
              </p>
              <p className="font-montserrat text-lg leading-7 text-[#F5F5F5]">
                485 of 1000 spots already gone.
              </p>
            </div>

            <div className="w-full max-w-[421px]">
              <SignupForm buttonText="Sign-up" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 