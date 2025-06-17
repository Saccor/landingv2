'use client';

import React from 'react';
import SignupForm from '@/components/ui/SignupForm';
import RevealSection from '@/components/ui/RevealSection';
import { useSubscriberCount } from '@/hooks/useSubscriberCount';

interface BottomSubscribeProps {
  className?: string;
}

export default function BottomSubscribe({ className = '' }: BottomSubscribeProps) {
  const { count, total, loading } = useSubscriberCount();
  
  return (
    <RevealSection className={`bg-black overflow-hidden ${className}`}>
      {/* Container: Responsive with media queries */}
      <div className="container mx-auto responsive-container responsive-section px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        <div className="w-full flex justify-center">
          {/* Content: Media query responsive container */}
          <div className="
            flex flex-col items-start
            responsive-content responsive-gap
            p-4 gap-6 sm:gap-[30px]
            w-full max-w-[353px] sm:max-w-[421.79px]
            min-h-fit
            drop-shadow-[0_4px_49.6px_rgba(0,0,0,0.1)]
            rounded-[20px]
            mx-auto
          ">
            
            {/* Heading: Responsive text container */}
            <div className="
              w-full
              flex flex-col justify-center items-center
              responsive-gap
              space-y-3 sm:space-y-4
            ">
              <p className="
                text-[#F5F5F5] font-montserrat
                responsive-text
                text-base sm:text-[18px] leading-relaxed sm:leading-[28px]
                text-center
              ">
                <span className="font-bold">Sign up now —</span> to be part of the future of sustainable sound.
              </p>
              <p className="
                text-[#F5F5F5] font-montserrat font-normal
                responsive-text
                text-base sm:text-[18px] leading-relaxed sm:leading-[28px]
                text-center
              ">
                {loading || count === 0 ? (
                  <span className="opacity-50">Loading spots...</span>
                ) : (
                  `${count} of ${total} spots already gone.`
                )}
              </p>
            </div>

            {/* Form: Inherits proper responsive behavior */}
            <div className="w-full max-w-md">
              <SignupForm buttonText="Sign-up" />
            </div>
            
          </div>
        </div>
      </div>
    </RevealSection>
  );
} 