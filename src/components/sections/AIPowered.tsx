'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';

export default function AIPowered() {
  return (
    <RevealSection className="w-full relative bg-white">
  <section
    className="
      w-full flex flex-col items-center gap-10
      px-4 py-12
      md:px-6 md:py-16 md:gap-14
      lg:px-12 lg:py-20 lg:gap-20
    "
  >
        {/* Section header */}
        <header
          className="
            w-full max-w-[1120px] mx-auto
            flex flex-col gap-3 text-center
          "
        >
          <h2
            className="
              font-montserrat font-bold text-[#101010]
              text-[26px] leading-[34px]
              md:text-[30px] md:leading-[38px]
              lg:text-[36px] lg:leading-[44px]
            "
          >
            AI Powered Earphones
          </h2>
          <p
            className="
              font-montserrat text-[#3A3A3A]
              max-w-[860px] mx-auto
              text-[15px] leading-[23px]
              md:text-[17px] md:leading-[26px]
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
            grid grid-cols-1 gap-8
            md:grid-cols-2 md:gap-10
          "
        >
          {/* Feature 1: Noise Cancellation video */}
          <article
            className="
              flex flex-col gap-5 p-6 rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]
            "
          >
            <h3
              className="
                font-montserrat font-semibold text-[#101010]
                text-[20px] leading-[28px]
                md:text-[22px] md:leading-[32px]
                lg:text-[24px] lg:leading-[34px]
              "
            >
              The best industry ANC
            </h3>
            <p
              className="
                font-montserrat text-[#4F4F4F]
                max-w-[560px]
                text-[14px] leading-[22px]
                md:text-[15px] md:leading-[24px]
                lg:text-[16px] lg:leading-[25px]
              "
            >
              Experience studio-grade active noise cancellation with real-time environmental
              adaptation. Focus fully on your sound, wherever you are.
            </p>
            <div className="w-full rounded-xl overflow-hidden aspect-[16/9]">
              <video
                className="w-full h-full object-cover"
                src="/NoiseCancellation.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </article>

          {/* Feature 2: Real-time translation image */}
          <article
            className="
              flex flex-col gap-5 p-6 rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]
            "
          >
            <h3
              className="
                font-montserrat font-semibold text-[#101010]
                text-[20px] leading-[28px]
                md:text-[22px] md:leading-[32px]
                lg:text-[24px] lg:leading-[34px]
              "
            >
              Real-time translation
            </h3>
            <p
              className="
                font-montserrat text-[#4F4F4F]
                max-w-[560px]
                text-[14px] leading-[22px]
                md:text-[15px] md:leading-[24px]
                lg:text-[16px] lg:leading-[25px]
              "
            >
              Break language barriers with instant AI-driven translation directly in your ears.
              Communicate effortlessly anywhere in the world.
            </p>
            <div
              className="
                w-full rounded-xl overflow-hidden aspect-[16/9]
                bg-cover bg-center
              "
              style={{
                backgroundImage: "url('/AIPoweredPic2.png')",
              }}
              aria-label="Real-time translation preview"
              role="img"
            />
          </article>
        </div>
      </section>
    </RevealSection>
  );
}
