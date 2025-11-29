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
    <RevealSection className="relative w-full flex justify-center bg-white overflow-hidden" data-signup-section>
      {/* Radials per Figma (bottom left and right) - hidden on mobile/tablet */}
      <div className="hidden lg:block pointer-events-none absolute w-[934px] h-[934px] -left-[467px] -bottom-[467px] rounded-full" style={{ background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(228, 228, 228, 0) 100%)' }} />
      <div className="hidden lg:block pointer-events-none absolute w-[934px] h-[934px] left-[966px] 3xl:left-[1400px] 4xl:left-[1800px] -bottom-[159px] rounded-full" style={{ background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(228, 228, 228, 0) 100%)' }} />

      {/* Desktop layout: responsive width, responsive padding, gap 30 */}
      <div className="hidden lg:flex relative w-full max-w-[1440px] 3xl:max-w-[1920px] 4xl:max-w-[2560px] h-[302px] 3xl:h-[380px] 4xl:h-[460px] items-center justify-center px-[124px] 3xl:px-[160px] 4xl:px-[200px] py-[35px] 3xl:py-[45px] 4xl:py-[55px]">
        <div className="w-full h-full flex flex-col items-center justify-center gap-[30px] 3xl:gap-[40px] 4xl:gap-[50px] isolation-isolate">
          <h2 className="w-[700px] 3xl:w-[900px] 4xl:w-[1100px] max-w-[700px] 3xl:max-w-[900px] 4xl:max-w-[1100px] h-[76px] 3xl:h-[90px] 4xl:h-[110px] text-center font-montserrat font-bold text-[30px] 3xl:text-[36px] 4xl:text-[42px] leading-[38px] 3xl:leading-[45px] 4xl:leading-[55px] text-[#3E3E3E]">
            Sign up now to get 50% off, early access, and exclusive updates, countdown&apos;s ticking.
          </h2>
          <div className="w-[431px] 3xl:w-[520px] 4xl:w-[600px] h-[78px] 3xl:h-[90px] 4xl:h-[100px] flex flex-col items-start gap-[12px]">
            <div className="relative w-full h-[24px] 3xl:h-[28px] 4xl:h-[32px] flex items-center">
              <span className="inline-block w-[10px] 3xl:w-[12px] 4xl:w-[14px] h-[10px] 3xl:h-[12px] 4xl:h-[14px] rounded-full bg-[#06DF73] z-0" />
              <span className="absolute left-[22px] 3xl:left-[26px] 4xl:left-[30px] top-0 font-montserrat font-medium text-[16px] 3xl:text-[18px] 4xl:text-[20px] leading-[24px] 3xl:leading-[28px] 4xl:leading-[32px] text-[#868889] z-1">{claimText}</span>
            </div>
            <SignupForm theme="lightV6" buttonText="Join the Movement" />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet stacked layout */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-[43px] flex flex-col items-center gap-6 bg-white">
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


