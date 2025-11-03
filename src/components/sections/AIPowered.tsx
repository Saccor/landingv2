'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';

export default function AIPowered() {
  return (
    <RevealSection className="w-full max-w-[1440px] mx-auto relative">
      <section
        className="
          w-full max-w-[1440px] mx-auto
          /* Mobile container */
          px-4 py-10 flex flex-col items-center gap-8 text-left
          /* Tablet spacing */
          md:px-6 md:py-14 md:gap-10
          /* Desktop spacing */
          lg:px-12 lg:py-16 lg:gap-14
        "
      >
        {/* Section header */}
        <header
          className="
            w-full max-w-[1120px] mx-auto
            flex flex-col gap-2
          "
        >
          <h2
            className="
              font-montserrat font-bold text-[#101010]
              /* Mobile */
              text-[26px] leading-[34px] tracking-[-0.2px]
              /* Tablet */
              md:text-[30px] md:leading-[38px]
              /* Desktop */
              lg:text-[36px] lg:leading-[44px]
            "
          >
            AI Powered earphones
          </h2>

          <p
            className="
              font-montserrat text-[#3A3A3A]
              max-w-[920px]
              /* Mobile */
              text-[15px] leading-[23px]
              /* Tablet */
              md:text-[17px] md:leading-[26px]
              /* Desktop */
              lg:text-[18px] lg:leading-[28px]
            "
          >
            Swappable sound drivers, batteries, chipsets, and design covers. Legacy1 is built to stay.
            Why throw away the whole product when just one part needs an upgrade?
          </p>
        </header>

        {/* Features grid */}
        <div
          className="
            w-full max-w-[1120px] mx-auto
            /* Mobile: stack */
            grid grid-cols-1 gap-8
            /* Tablet+: 2-up */
            md:grid-cols-2 md:gap-6
            /* Desktop: more space */
            lg:gap-10
          "
        >
          {/* Feature: ANC */}
          <article
            className="
              flex flex-col gap-4
            "
          >
            <h3
              className="
                font-montserrat font-semibold text-[#101010]
                /* Mobile */
                text-[20px] leading-[28px]
                /* Tablet */
                md:text-[22px] md:leading-[32px]
                /* Desktop */
                lg:text-[24px] lg:leading-[34px]
              "
            >
              The best industry ANC
            </h3>

            <p
              className="
                font-montserrat text-[#4F4F4F]
                max-w-[560px]
                /* Mobile */
                text-[14px] leading-[22px]
                /* Tablet */
                md:text-[15px] md:leading-[24px]
                /* Desktop */
                lg:text-[16px] lg:leading-[25px]
              "
            >
              Lorem ipsum text placeholder. Replace with your copy describing your active noise
              cancelation performance and approach.
            </p>

            {/* Media card */}
            <div
              className="
                w-full rounded-xl overflow-hidden
                /* Fixed aspect on mobile for consistent height */
                aspect-[16/10]
                /* Tablet/desktop: taller media */
                md:aspect-[16/9] lg:aspect-[16/8]
                bg-no-repeat bg-center bg-cover
              "
              style={{
                backgroundImage: "url('/aipowered/anc.png')",
              }}
              aria-label="ANC preview media"
              role="img"
            />
          </article>

          {/* Feature: Real-time translation */}
          <article
            className="
              flex flex-col gap-4
            "
          >
            <h3
              className="
                font-montserrat font-semibold text-[#101010]
                /* Mobile */
                text-[20px] leading-[28px]
                /* Tablet */
                md:text-[22px] md:leading-[32px]
                /* Desktop */
                lg:text-[24px] lg:leading-[34px]
              "
            >
              Real time translation
            </h3>

            <p
              className="
                font-montserrat text-[#4F4F4F]
                max-w-[560px]
                /* Mobile */
                text-[14px] leading-[22px]
                /* Tablet */
                md:text-[15px] md:leading-[24px]
                /* Desktop */
                lg:text-[16px] lg:leading-[25px]
              "
            >
              Placeholder copy for translation feature. Describe supported languages and latency.
            </p>

            {/* Media card */}
            <div
              className="
                w-full rounded-xl overflow-hidden
                aspect-[16/10]
                md:aspect-[16/9] lg:aspect-[16/8]
                bg-no-repeat bg-center bg-cover
              "
              style={{
                backgroundImage: "url('/aipowered/translation.png')",
              }}
              aria-label="Real-time translation preview media"
              role="img"
            />
          </article>
        </div>
      </section>
    </RevealSection>
  );
}
