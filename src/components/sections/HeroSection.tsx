"use client";
import React from 'react';
import SignupForm from '@/components/common/SignupForm';
import CountdownTimer from '@/components/ui/CountdownTimer';

export default function HeroSection() {
  return (
    <section className="w-full max-w-[1440px] lg:h-[675px] mx-auto relative">
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch w-full max-w-[1440px] h-auto lg:h-[539.81px] lg:mt-[97px] mx-auto p-0">
        {/* Hero Image */}
        <div
          className="
            w-full max-w-[393px] h-[294.65px]
            lg:w-[720px] lg:h-[539.81px] lg:max-w-none
            flex-none self-stretch
            mx-auto lg:mx-0
          "
          style={{
            backgroundImage: "url('/heroimg.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'center left',
            backgroundRepeat: 'no-repeat',
            order: 0,
            flexGrow: 0,
          }}
        />
        {/* Content (mobile: below image, desktop: right side) */}
        <div className="flex flex-col items-center w-full max-w-[393px] mx-auto lg:w-[720px] lg:h-[462.13px] lg:gap-[40px] gap-6 p-3 lg:p-0 text-center lg:justify-center">
          <h1 className="font-montserrat font-bold text-[30px] leading-[38px] text-[#FCFCFD] max-w-[369px] w-full">
            Shape the future of sustainable sound
          </h1>
          {/* Countdown Timer */}
          <div className="w-full flex items-center justify-center lg:w-[506.98px] lg:max-w-none">
            <CountdownTimer />
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