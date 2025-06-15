'use client';

import React from 'react';
import SignupForm from '@/components/common/SignupForm';
import RevealSection from '@/components/common/RevealSection';

interface BottomSubscribeProps {
  className?: string;
}

export default function BottomSubscribe({ className = '' }: BottomSubscribeProps) {
  return (
    <RevealSection className={`bg-black overflow-hidden ${className}`}>
      {/* Container: Clean, simple approach with proper spacing */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Content: Custom container with specific styling */}
        <div className="
          flex flex-col items-start
          p-0 gap-[30px]
          w-[353px] h-[176px]
          drop-shadow-[0_4px_49.6px_rgba(0,0,0,0.1)]
          rounded-[20px]
          flex-none order-0 self-stretch flex-grow-0
          mx-auto
        ">
          
          {/* Heading: Custom styling with specific dimensions */}
          <div className="
            w-[353px] sm:w-[421.79px] h-[102px]
            flex flex-col justify-center
            flex-none order-0 self-stretch flex-grow-0
          ">
            <p className="
              text-[#F5F5F5] font-montserrat
              text-[18px] leading-[28px]
              text-left
              mb-4
            ">
              <span className="font-bold">Sign up now</span> to be part of the future of sustainable sound.
            </p>
            <p className="
              text-[#F5F5F5] font-montserrat font-normal
              text-[18px] leading-[28px]
              text-left
            ">
              485 of 1000 spots already gone.
            </p>
          </div>

          {/* Form: Inherits proper responsive behavior */}
          <div className="w-full max-w-md">
            <SignupForm buttonText="Sign-up" />
          </div>
          
        </div>
      </div>
    </RevealSection>
  );
} 