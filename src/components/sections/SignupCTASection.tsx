'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import SignupForm from '@/components/ui/SignupForm';
import { useSubscriberCount } from '@/hooks/useSubscriberCount';

const SignupCTASection: React.FC = () => {
  const { count, total, loading } = useSubscriberCount();
  const claimText = loading ? 'Loading…' : `${count} of ${total} super early bird spots claimed`;
  return (
    <RevealSection className="relative w-full flex justify-center bg-white overflow-hidden">
      {/* Radials per Figma (bottom left and right) */}
      <div className="pointer-events-none absolute w-[934px] h-[934px] -left-[467px] -bottom-[467px] rounded-full" style={{ background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(228, 228, 228, 0) 100%)' }} />
      <div className="pointer-events-none absolute w-[934px] h-[934px] left-[966px] -bottom-[159px] rounded-full" style={{ background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(228, 228, 228, 0) 100%)' }} />

      {/* Desktop layout: 1440x302, padding 40 124, gap 30 */}
      <div className="hidden lg:flex relative w-full max-w-[1440px] h-[302px] items-center justify-center px-[124px] py-[40px]">
        <div className="w-full h-full flex flex-col items-center justify-center gap-[30px] isolation-isolate">
          <h2 className="w-[600px] max-w-[600px] h-[114px] text-center font-montserrat font-bold text-[30px] leading-[38px] text-[#3E3E3E]">
            Sign up now to get 50% off, early access, and exclusive updates, countdown’s ticking.
          </h2>
          <div className="w-[431px] h-[78px] flex flex-col items-start gap-[12px]">
            <div className="relative w-full h-[24px] flex items-center">
              <span className="inline-block w-[10px] h-[10px] rounded-full bg-[#06DF73] z-0" />
              <span className="absolute left-[22px] top-0 font-montserrat font-medium text-[16px] leading-[24px] text-[#868889] z-1">{claimText}</span>
            </div>
            <SignupForm theme="lightV6" buttonText="Sign-up" />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet stacked layout */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-12 flex flex-col items-center gap-6 bg-white">
        <h2 className="text-center font-montserrat font-bold text-[22px] leading-[30px] text-[#3E3E3E] md:text-[26px] md:leading-[34px]">
          Sign up now to get 50% off, early access, and exclusive updates, countdown’s ticking.
        </h2>
        <div className="w-full max-w-[431px] flex flex-col items-center gap-3">
          <div className="relative w-full h-[24px] flex items-center justify-center text-[#868889] font-montserrat text-[14px] leading-[20px]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#06DF73] mr-2" />
            {claimText}
          </div>
          <SignupForm theme="lightV6" buttonText="Sign-up" />
        </div>
      </div>
    </RevealSection>
  );
};

export default SignupCTASection;


