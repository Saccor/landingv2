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
      md:px-20 md:py-[50px] md:gap-[95px]
      lg:px-12 lg:py-20 lg:gap-20
    "
  >
        {/* Section header - Frame 481710 */}
        <header
          className="
            w-full max-w-[353px] md:max-w-[674px] lg:max-w-[1120px] mx-auto
            flex flex-col items-start gap-[10px]
          "
        >
          <h2
            className="
              w-full h-[88px] md:h-auto
              font-montserrat font-semibold text-[#1A1A1A]
              text-[36px] leading-[44px]
              tracking-[-0.02em]
            "
            style={{ textShadow: '0px 0px 37.4px #FFFFFF' }}
          >
            AI Powered Earphones
          </h2>
          <p
            className="
              w-full h-[140px] md:h-auto
              font-montserrat font-medium text-[#1A1A1A]
              text-[18px] leading-[28px]
            "
          >
            Swappable sound drivers, batteries, chipsets, and design covers. Legacy 1 is built to stay.
            Why throw away the whole product when just one part needs an upgrade?
          </p>
        </header>

        {/* Features grid */}
        <div
          className="
            w-full max-w-[353px] md:max-w-[674px] lg:max-w-[1120px] mx-auto
            grid grid-cols-1 gap-8
            md:grid-cols-1 md:gap-[58px]
            lg:grid-cols-2 lg:gap-10
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
