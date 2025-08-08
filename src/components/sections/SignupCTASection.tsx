'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import SignupForm from '@/components/ui/SignupForm';

const SignupCTASection: React.FC = () => {
  return (
    <RevealSection className="relative w-full flex justify-center bg-[#121212] overflow-hidden">
      {/* Radial gradients */}
      <div className="pointer-events-none absolute w-[934px] h-[934px] left-[959px] -top-[448px] rounded-full"
           style={{ background: 'radial-gradient(50% 50% at 50% 50%, #2A2929 0%, rgba(2, 2, 2, 0) 100%)' }} />
      <div className="pointer-events-none absolute w-[934px] h-[934px] -left-[442px] -top-[138px] rounded-full"
           style={{ background: 'radial-gradient(50% 50% at 50% 50%, #2A2929 0%, rgba(2, 2, 2, 0) 100%)' }} />

      <div className="relative w-full max-w-[1440px] h-[368px] flex items-center justify-center">
        {/* Heading */}
        <div className="absolute left-[429px] top-[59px] w-[535px] h-[114px] flex items-center justify-center">
          <h2 className="text-center font-montserrat font-semibold text-[30px] leading-[38px] text-[#D0D5DD]">
            Sign up now to get 50% off, early
            <br />
            access, and exclusive updates,
            <br />
            countdown’s ticking.
          </h2>
        </div>

        {/* Claimed indicator + form */}
        <div className="absolute left-[452px] top-[203px] w-[535px] h-[84px] flex flex-col items-center gap-[12px]">
          {/* Claimed line */}
          <div className="relative w-[535px] h-[28px]">
            <div className="absolute left-0 top-[8px] w-[10px] h-[10px] rounded-full bg-[#06DF73]" />
            <div className="absolute left-[22px] top-[2px] w-[599px] h-[24px] text-[#868889] font-montserrat text-[16px] leading-[24px] font-medium">
              516 of 1000 super early bird spots claimed
            </div>
          </div>
          {/* Form */}
          <div className="w-[535px] h-[44px] flex items-center justify-center">
            <SignupForm buttonText="Join the Movement" />
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

export default SignupCTASection;


