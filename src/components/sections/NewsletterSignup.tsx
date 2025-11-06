'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import SignupForm from '@/components/ui/SignupForm';

export default function NewsletterSignup() {
  return (
    <RevealSection className="w-full relative bg-white">
      <section
        className="
          w-full max-w-[1120px] mx-auto
          flex flex-col lg:flex-row items-center lg:justify-between
          gap-4 md:gap-6 lg:gap-10
          px-4 py-10 md:px-6 md:py-14 lg:px-8 lg:py-16
        "
      >
        {/* Text (always on top in mobile/tablet, left on desktop) */}
        <h2
          className="
            font-montserrat font-semibold text-[#101010]
            text-[18px] leading-[26px]
            md:text-[22px] md:leading-[30px]
            lg:text-[24px] lg:leading-[32px]
            text-center lg:text-left
          "
        >
          Subscribe to our newsletter
        </h2>

        {/* Signup form (under text on mobile/tablet, right on desktop) */}
        <div
          className="
            w-full lg:w-auto
            flex justify-center lg:justify-end
          "
        >
          <SignupForm theme="lightV6" buttonText="Join the Movement" />
        </div>
      </section>
    </RevealSection>
  );
}
