'use client';

import React from 'react';
import Image from 'next/image';

const PrivacyHero = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto relative bg-black overflow-hidden">
      {/* Radial background glow – aligned so center of glow is top-right */}
      <div
        className="
          absolute 
          top-[0px] 
          right-[0px]
          w-[934px] 
          h-[934px] 
          z-0 
          pointer-events-none 
          rounded-full 
          translate-x-[270px] translate-y-[-250px]
        "
        style={{
          background: `radial-gradient(circle, rgba(42,41,41,2.6) 0%, rgba(2,2,2,0.9) 40%, rgba(0,0,0,1) 70%)`,
          filter: 'blur(30px)',
        }}
      />

      {/* Content Layout */}
      <div className="
        w-full max-w-[1440px] mx-auto p-0
        flex flex-col items-center gap-6
        md:gap-8
        lg:flex-row lg:items-stretch lg:gap-0 lg:h-[480px] lg:mt-[80px]
        xl:h-[539.81px] xl:mt-[97px]
        relative z-10
      ">
        {/* Left: Logo + Text */}
        <div className="
          w-full max-w-[393px] h-[294.65px] mx-auto
          md:w-[836px] md:h-[626.779px] md:max-w-none md:mx-auto md:aspect-[836/626.78]
          lg:w-[55%] lg:h-[420px] lg:max-w-none lg:mx-0 lg:aspect-auto
          xl:w-[720px] xl:h-[539.81px]
          flex items-start justify-start px-6 md:px-20 pt-6
        ">
          <div className="max-w-xl">
            <Image
              src="/arfvelogo.png"
              alt="arfve logo"
              width={564.83}
              height={196}
              priority
            />
            <p className="text-white text-[24px] leading-[38px] font-semibold tracking-normal mt-4">
              Data Privacy first. No compromises.
            </p>
          </div>
        </div>

        {/* Right side: Empty for now */}
        <div className="
          flex flex-col items-center w-full mx-auto text-center
          max-w-[393px] gap-6
          md:max-w-[626px] md:gap-8
          lg:w-[45%] lg:max-w-none lg:gap-[35px] lg:justify-center lg:px-8
          xl:w-[720px] xl:h-[462.13px] xl:gap-[40px] xl:px-0
        "></div>
      </div>
    </section>
  );
};

export default PrivacyHero;
