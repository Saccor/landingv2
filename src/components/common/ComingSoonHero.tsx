'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ComingSoonHeroProps {
    title: string;
    subtitle: string;
}

const ComingSoonHero: React.FC<ComingSoonHeroProps> = ({ title, subtitle }) => {
    return (
        <section className="w-full max-w-[1440px] mx-auto relative bg-white overflow-hidden">
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
                    background: `radial-gradient(circle, rgba(245,245,245,0.8) 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,1) 70%)`,
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
          flex items-start justify-start px-6 md:px-20 pt-8
        ">
                    <div className="max-w-xl">
                        <Image
                            src="/images/logo.svg"
                            alt="Arfve"
                            width={200}
                            height={70}
                            priority
                            className="w-auto h-auto"
                        />
                        <h1 className="text-black text-[32px] md:text-[48px] leading-[48px] md:leading-[72px] font-medium tracking-normal mt-6 mb-4">
                            {title}
                        </h1>
                        <p className="text-black text-[20px] md:text-[24px] leading-[32px] md:leading-[38px] font-semibold tracking-normal">
                            {subtitle}
                        </p>

                        {/* Back to Home Button */}
                        <Link
                            href="/"
                            className="inline-flex items-center mt-8 px-6 py-3 bg-black text-white font-montserrat font-medium text-[16px] rounded-full hover:bg-gray-800 transition-colors duration-200"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
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

export default ComingSoonHero;
