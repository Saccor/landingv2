'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';

export default function OurPartners() {
  return (
    <RevealSection className="w-full relative bg-[#F4F4F4]">
      <section
        className="
          w-full flex flex-col items-center
          px-4 py-12
          md:px-6 md:py-16
          lg:px-12 lg:py-20
        "
      >
        {/* Header */}
        <header
          className="
            w-full text-center
            flex flex-col gap-2
          "
        >
          <h2
            className="
              font-montserrat font-bold text-[#101010]
              text-[22px] leading-[30px]
              md:text-[26px] md:leading-[34px]
              lg:text-[30px] lg:leading-[38px]
            "
          >
            Our partners
          </h2>
        </header>

        {/* Logos */}
        <div
          className="
            w-full flex flex-wrap items-center justify-center
            gap-8 mt-8
            md:gap-12 md:mt-10
            lg:gap-20 lg:mt-12
          "
        >
          {/* Partner 1 */}
          <img
            src="/shift.png"
            alt="Shift"
            className="
              h-[40px] w-auto object-contain
              md:h-[50px]
              lg:h-[60px]
            "
          />

          {/* Partner 2 */}
          <img
            src="/monster.png"
            alt="Monster"
            className="
              h-[28px] w-auto object-contain
              md:h-[36px]
              lg:h-[44px]
            "
          />

          {/* Partner 3 */}
          <img
            src="/qualcomm.png"
            alt="Qualcomm"
            className="
              h-[30px] w-auto object-contain
              md:h-[38px]
              lg:h-[46px]
            "
          />

          {/* Partner 4 */}
          <img
            src="/codico.png"
            alt="Codico"
            className="
              h-[28px] w-auto object-contain
              md:h-[36px]
              lg:h-[44px]
            "
          />
        </div>
      </section>
    </RevealSection>
  );
}
