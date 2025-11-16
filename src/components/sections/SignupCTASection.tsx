'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import SignupForm from '@/components/ui/SignupForm';
import { useSubscriberCount } from '@/hooks/useSubscriberCount';

const SignupCTASection: React.FC = () => {
  const { count, total, loading } = useSubscriberCount();
  const claimText = loading ? 'Loading…' : `${count} of ${total} super early bird spots claimed`;
  const claimTextMain = loading ? 'Loading…' : `${count} of ${total} super early bird spots`;
  const claimTextSuffix = 'claimed';
  return (
    <RevealSection className="relative w-full flex justify-center bg-white overflow-hidden">
      {/* Radials per Figma (bottom left and right) */}
      <div className="pointer-events-none absolute w-[934px] h-[934px] -left-[467px] -bottom-[467px] rounded-full" style={{ background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(228, 228, 228, 0) 100%)' }} />
      <div className="pointer-events-none absolute w-[934px] h-[934px] left-[966px] -bottom-[159px] rounded-full" style={{ background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(228, 228, 228, 0) 100%)' }} />

      {/* Desktop layout: 1440x302, padding 40 124, gap 30 */}
      <div className="hidden lg:flex relative w-full max-w-[1440px] h-[302px] items-center justify-center px-[124px] py-[40px]">
        <div className="w-full h-full flex flex-col items-center justify-center gap-[30px] isolation-isolate">
          <h2 className="w-[700px] max-w-[700px] h-[76px] text-center font-montserrat font-bold text-[30px] leading-[38px] text-[#3E3E3E]">
            Sign up now to get 50% off, early access, and exclusive updates, countdown&apos;s ticking.
          </h2>
          <div className="w-[431px] h-[78px] flex flex-col items-start gap-[12px]">
            <div className="relative w-full h-[24px] flex items-center">
              <span className="inline-block w-[10px] h-[10px] rounded-full bg-[#06DF73] z-0" />
              <span className="absolute left-[22px] top-0 font-montserrat font-medium text-[16px] leading-[24px] text-[#868889] z-1">{claimText}</span>
            </div>
            <SignupForm theme="lightV6" buttonText="Join the Movement" />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet stacked layout */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-12 flex flex-col items-center gap-6 bg-white">
        <h2 className="text-center font-montserrat font-bold text-[22px] leading-[30px] text-[#3E3E3E] md:text-[26px] md:leading-[34px]">
          Sign up now to get 50% off, early access, and exclusive updates, countdown&apos;s ticking.
        </h2>
        {/* Container: 315px × 116px with counter and form */}
        <div className="w-[315px] h-[116px] flex flex-col items-start gap-[12px] p-0 flex-none z-[3]">
          {/* Counter/Heading section: 315px × 60px */}
          <div className="w-[315px] h-[60px] flex flex-row items-center gap-[10px] py-[6px] flex-none self-stretch">
            {/* Green dot - 10px × 10px, vertically centered */}
            <div className="w-[10px] h-[10px] rounded-full bg-[#06DF73] flex-none self-center" style={{ transform: 'matrix(-1, 0, 0, 1, 0, 0)' }} />
            {/* Text container with two rows */}
            <div className="flex-1 flex flex-col items-start">
              {/* First row: main text */}
              <div className="w-full font-montserrat font-medium text-[16px] leading-[24px] text-[#868889]">
                {claimTextMain}
              </div>
              {/* Second row: "claimed" */}
              <div className="w-full font-montserrat font-medium text-[16px] leading-[24px] text-[#868889]">
                {claimTextSuffix}
              </div>
            </div>
          </div>
          {/* Form container */}
          <SignupForm theme="lightV6" buttonText="Join the Movement" />
        </div>
      </div>
    </RevealSection>
  );
};

export default SignupCTASection;


