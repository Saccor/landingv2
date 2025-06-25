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
      <div className="w-full flex justify-center">
        <div className="w-[353px] md:w-[600px] lg:w-[1400px] px-0 py-12">
          <div className="
            flex flex-col items-center
            gap-6
            w-full
            mx-auto
          ">
            
            {/* Heading */}
            <div className="w-full flex flex-col items-center gap-3 md:w-[422px] md:h-[102px] md:justify-center md:gap-2">
              <p className="
                text-[#F5F5F5] font-montserrat font-bold
                text-base leading-relaxed
                text-center
                md:text-[18px] md:leading-[28px] md:font-normal md:text-[#F5F5F5]
                lg:text-[18px] lg:leading-[28px]
              ">
                <span className="font-bold md:font-semibold">Sign up now —</span> countdown&apos;s ticking and secrets awaits.
              </p>
              <p className="
                text-[#F5F5F5] font-montserrat font-normal
                text-base leading-relaxed
                text-center
                md:text-[16px] md:leading-normal md:font-normal md:text-[#F5F5F5]
                lg:text-[18px] lg:leading-[28px]
              ">
                {loading || count === 0 ? (
                  <span className="opacity-50">Loading spots...</span>
                ) : (
                  `${count} of ${total} spots already gone.`
                )}
              </p>
            </div>

            {/* Form */}
            <div className="w-full max-w-md">
              <SignupForm buttonText="Sign-up" />
            </div>
            
          </div>
        </div>
      </div>
    </RevealSection>
  );
} 