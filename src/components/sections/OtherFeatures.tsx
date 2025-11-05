'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';

export default function OtherFeatures() {
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
            w-full max-w-[1120px] mx-auto
            flex flex-col gap-2 text-left
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
            And many other features
          </h2>
          <p
            className="
              font-montserrat text-[#3A3A3A]
              text-[15px] leading-[23px]
              md:text-[17px] md:leading-[26px]
              lg:text-[18px] lg:leading-[28px]
              max-w-[700px]
            "
          >
            Every module expands what your earphones can do. Pick the features that fit your flow.
          </p>
        </header>

        {/* Grid */}
        <div
          className="
            w-full max-w-[1120px] mx-auto mt-10
            grid grid-cols-1 gap-6
            md:grid-cols-2 md:auto-rows-[minmax(200px,_1fr)]
            lg:grid-cols-2 lg:gap-10
          "
        >
          {/* Feature 1 */}
          <article className="flex flex-col gap-3 p-6 rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h3 className="font-montserrat font-semibold text-[#101010] text-[20px] leading-[28px]">
              Voice isolation
            </h3>
            <p className="font-montserrat text-[#4F4F4F] text-[15px] leading-[24px]">
              Listen to your music like at home.
            </p>
            <div
              className="w-full rounded-xl overflow-hidden aspect-[16/9] bg-cover bg-center"
              style={{
                backgroundImage: "url('/lady.png')",
              }}
              aria-label="Voice isolation preview"
              role="img"
            />
          </article>

          {/* Feature 2 */}
          <article className="flex flex-col gap-3 p-6 rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h3 className="font-montserrat font-semibold text-[#101010] text-[20px] leading-[28px]">
              Transcript & summary
            </h3>
            <p className="font-montserrat text-[#4F4F4F] text-[15px] leading-[24px]">
              Access in one click to your favorite LLM.
            </p>
            <div
              className="w-full rounded-xl overflow-hidden aspect-[16/9] bg-cover bg-center"
              style={{
                backgroundImage: "url('/earbudpic.png')",
              }}
              aria-label="Transcript and summary preview"
              role="img"
            />
          </article>

          {/* Feature 3 */}
          <article className="flex flex-col gap-3 p-6 rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h3 className="font-montserrat font-semibold text-[#101010] text-[20px] leading-[28px]">
              Mood based playlist
            </h3>
            <p className="font-montserrat text-[#4F4F4F] text-[15px] leading-[24px]">
              Access in one click to your favorite LLM.
            </p>
            <div
              className="w-full rounded-xl overflow-hidden aspect-[16/9] bg-cover bg-center"
              style={{
                backgroundImage: "url('/aipic.png')",
              }}
              aria-label="Mood based playlist preview"
              role="img"
            />
          </article>

          {/* Feature 4 */}
          <article className="flex flex-col gap-3 p-6 rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h3 className="font-montserrat font-semibold text-[#101010] text-[20px] leading-[28px]">
              AI driven
            </h3>
            <p className="font-montserrat text-[#4F4F4F] text-[15px] leading-[24px]">
              Access in one click to your favorite LLM.
            </p>
            <div
              className="w-full rounded-xl overflow-hidden aspect-[16/9] bg-cover bg-center"
              style={{
                backgroundImage: "url('/phonefeature.png')",
              }}
              aria-label="AI driven feature preview"
              role="img"
            />
          </article>
        </div>
      </section>
    </RevealSection>
  );
}
