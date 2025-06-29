'use client';

import React from 'react';
import SignupForm from '@/components/ui/SignupForm';
import RevealSection from '@/components/ui/RevealSection';
import CountdownTimerPixel from '@/components/common/CountdownTimerPixel';
import { useSubscriberCount } from '@/hooks/useSubscriberCount';

export default function HeroSection() {
  const { count, total, loading } = useSubscriberCount();
  
  return (
    <RevealSection className="w-full max-w-[1440px] mx-auto relative">
      <div className="
        w-full max-w-[1440px] mx-auto p-0
        
        /* Mobile: Stack vertically (0-767px) */
        flex flex-col items-center gap-6
        
        /* Tablet: Still stacked but with more space (768px-1023px) */
        md:gap-8
        
        /* Desktop: Side-by-side layout (1024px+) */
        lg:flex-row lg:items-stretch lg:gap-0 lg:h-[480px] lg:mt-[80px]
        xl:h-[539.81px] xl:mt-[97px]
      ">

        {/* Hero Image - Mobile vs Tablet vs Desktop Layout */}
        <div
          className="
            /* Mobile: Centered, contained (0-767px) */
            w-full max-w-[393px] h-[294.65px] mx-auto
            
            /* Tablet: Full specified dimensions with aspect ratio (768px-1023px) */
            md:w-[836px] md:h-[626.779px] md:max-w-none md:mx-auto md:aspect-[836/626.78]
            
            /* Desktop: Side layout, scaled (1024px+) */
            lg:w-[55%] lg:h-[420px] lg:max-w-none lg:mx-0 lg:aspect-auto
            xl:w-[720px] xl:h-[539.81px]
            
            flex-none self-stretch
            bg-no-repeat bg-cover bg-center
            lg:bg-contain lg:bg-left
            hero-image-modern
          "
          style={{
            backgroundImage: "url('/heroimg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            order: 0,
            flexGrow: 0,
          }}
        />

        {/* Content Section - Mobile vs Tablet vs Desktop Layout */}
        <div className="
          flex flex-col items-center w-full mx-auto text-center
          
          /* Mobile: Compact centered layout (0-767px) */
          max-w-[393px] gap-6
          
          /* Tablet: More spacious layout (768px-1023px) */
          md:max-w-[626px] md:gap-8
          
          /* Desktop: Side layout, scaled (1024px+) */
          lg:w-[45%] lg:max-w-none lg:gap-[35px] lg:justify-center lg:px-8
          xl:w-[720px] xl:h-[462.13px] xl:gap-[40px] xl:px-0
        ">

          {/* Heading - Mobile vs Tablet vs Desktop Sizing */}
          <h1 className="
            font-montserrat font-bold text-[#FCFCFD] w-full
            
            /* Mobile: Compact text (0-767px) */
            text-[26px] leading-[34px] max-w-[340px]
            
            /* Tablet: Larger text for better tablet viewing (768px-1023px) */
            md:text-[30px] md:leading-[38px] md:max-w-[480px]
            
            /* Desktop: Full size text (1024px+) */
            lg:text-[26px] lg:leading-[34px] lg:max-w-[350px]
            xl:text-[30px] xl:leading-[38px] xl:max-w-[369px]
          ">
            The world&apos;s first modular AI earbuds
          </h1>

          {/* Countdown Timer - Responsive sizing */}
          <div className="
            w-full flex justify-center
            
            /* Mobile: Standard padding (0-767px) */
            px-4
            
            /* Tablet: Full width, larger scale (768px-1023px) */
            md:px-0 md:w-full md:max-w-[800px] md:mx-auto
            md:[&>*]:!scale-[1.4] md:[&>*]:!transform-origin-center
            
            /* Desktop: Standard padding (1024px+) */
            lg:px-4 lg:[&>*]:!scale-100
          ">
            <CountdownTimerPixel targetDate="2025-08-11T00:00:00" />
          </div>

          {/* Text content - Mobile vs Tablet vs Desktop Sizing */}
          <div className="
            w-full flex flex-col items-center justify-center text-center gap-2
            
            /* Mobile: Standard layout (0-767px) */
            max-w-[340px] mx-auto
            
            /* Tablet: Centered, narrower than timer (768px-1023px) */
            md:max-w-[500px] md:gap-3 md:mx-auto
            
            /* Desktop: Full layout (1024px+) */
            lg:max-w-none lg:gap-2
            xl:w-[421.79px] xl:h-[102px]
          ">
            <p className="
              font-montserrat font-normal text-[#F5F5F5] w-full
              
              /* Mobile: Smaller text (0-767px) */
              text-[15px] leading-[23px]
              
              /* Tablet: Medium text with better spacing (768px-1023px) */
              md:text-[18px] md:leading-[28px] md:px-4
              
              /* Desktop: Full size text (1024px+) */
              lg:text-[17px] lg:leading-[26px] lg:px-0
              xl:text-[18px] xl:leading-[28px]
            ">
              <span className="font-bold">Sign up now</span> — countdown&apos;s ticking and secrets awaits.
            </p>
            <p className="
              font-montserrat font-normal text-[#F5F5F5] w-full
              
              /* Mobile: Smaller text (0-767px) */
              text-[15px] leading-[23px]
              
              /* Tablet: Medium text with better spacing (768px-1023px) */
              md:text-[18px] md:leading-[28px] md:px-4
              
              /* Desktop: Full size text (1024px+) */
              lg:text-[17px] lg:leading-[26px] lg:px-0
              xl:text-[18px] xl:leading-[28px]
            ">
              {loading || count === 0 ? (
                <span className="opacity-50">Loading spots...</span>
              ) : (
                `${count} of ${total} spots already gone.`
              )}
            </p>
          </div>

          {/* Sign-up Form */}
          <div className="w-full flex items-center justify-center">
            <SignupForm buttonText="Sign-up" />
          </div>

        </div>
      </div>
    </RevealSection>
  );
}
