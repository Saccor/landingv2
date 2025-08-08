'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import SignupForm from '@/components/ui/SignupForm';

const SignupCTASection: React.FC = () => {
  return (
    <RevealSection className="relative w-full flex justify-center bg-[#121212] overflow-hidden">
      {/* Radials */}
      <div className="pointer-events-none absolute w-[700px] h-[700px] right-[-200px] -top-[300px] rounded-full md:w-[934px] md:h-[934px] md:right-[ -100px] md:-top-[448px]"
           style={{ background: 'radial-gradient(50% 50% at 50% 50%, #2A2929 0%, rgba(2, 2, 2, 0) 100%)' }} />
      <div className="pointer-events-none absolute w-[700px] h-[700px] left-[-250px] -top-[100px] rounded-full md:w-[934px] md:h-[934px] md:-left-[442px] md:-top-[138px]"
           style={{ background: 'radial-gradient(50% 50% at 50% 50%, #2A2929 0%, rgba(2, 2, 2, 0) 100%)' }} />

      {/* Desktop exact layout */}
      <div className="hidden lg:flex relative w-full max-w-[1440px] h-[368px] items-center justify-center">
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
        <div className="absolute left-[452px] top-[203px] w-[535px] flex flex-col items-center gap-[12px]">
          {/* Claimed line aligned to form width */}
          <div className="w-[350px] xl:w-[369px] h-[24px] flex items-center justify-start gap-2 text-[#868889] font-montserrat text-[16px] leading-[24px] font-medium">
            <span className="inline-block w-[10px] h-[10px] rounded-full bg-[#06DF73]" />
            <span>516 of 1000 super early bird spots claimed</span>
          </div>
          {/* Form */}
          <div className="w-[535px] h-[44px] flex items-center justify-center">
            <SignupForm buttonText="Join the Movement" />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet stacked layout */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-12 flex flex-col items-center gap-6">
        <h2 className="text-center font-montserrat font-semibold text-[22px] leading-[30px] text-[#D0D5DD] md:text-[26px] md:leading-[34px]">
          Sign up now to get 50% off, early access, and exclusive updates, countdown’s ticking.
        </h2>
        <div className="w-full max-w-[560px] flex flex-col items-center gap-3">
          <div className="relative w-full h-[24px] flex items-center justify-center text-[#868889] font-montserrat text-[14px] leading-[20px]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#06DF73] mr-2" />
            516 of 1000 super early bird spots claimed
          </div>
          <SignupForm buttonText="Join the Movement" />
        </div>
      </div>
    </RevealSection>
  );
};

export default SignupCTASection;


