'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';

export default function OtherFeatures() {
  return (
    <RevealSection className="w-full relative bg-[white]">
      <section
        className="
          w-full flex flex-col items-center
          px-4 py-[30px]
          md:px-6 md:py-[46px]
          lg:px-12 lg:py-[54px]
          3xl:px-16 3xl:py-[70px]
          4xl:px-20 4xl:py-[86px]
          max-w-[1440px] 3xl:max-w-[1920px] 4xl:max-w-[2560px] mx-auto
        "
      >
        {/* Header */}
        <header className="w-full max-w-[1120px] 3xl:max-w-[1500px] 4xl:max-w-[2000px] flex flex-col gap-1 text-left">
          <h2 className="font-montserrat font-bold text-[#101010] text-[26px] leading-[34px] md:text-[30px] lg:text-[36px] 3xl:text-[42px] 4xl:text-[48px] 3xl:leading-[52px] 4xl:leading-[60px]">
            And many other features
          </h2>
        </header>

        {/* Grid layout */}
        <div className="w-full max-w-[1120px] 3xl:max-w-[1500px] 4xl:max-w-[2000px] mt-8 3xl:mt-10 4xl:mt-12 flex flex-col gap-4 lg:gap-6 3xl:gap-8 4xl:gap-10">
          {/* ROW 1 — 60/40 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:[grid-template-columns:1.6fr_1fr] gap-4 lg:gap-6 3xl:gap-8 4xl:gap-10">
            {/* Voice isolation (image first, then text) */}
            <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
              <div
                className="mx-3 mt-3 rounded-[12px] overflow-hidden h-[280px] md:h-[320px] lg:h-[380px] 3xl:h-[500px] 4xl:h-[620px] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/VoiceIsolation.webp')" }}
                aria-label="Voice isolation preview"
                role="img"
              />
              <div className="p-4 pt-2 3xl:p-6 4xl:p-8">
                <h3 className="font-montserrat font-semibold text-[#101010] text-[18px] lg:text-[20px] 3xl:text-[22px] 4xl:text-[24px]">
                  Voice isolation
                </h3>
                <p className="font-montserrat text-[#4F4F4F] text-[14px] lg:text-[15px] 3xl:text-[16px] 4xl:text-[18px]">
                  listen your music like at home
                </p>
              </div>
            </article>

            {/* Transcript & summary (text bottom) */}
            <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
              <div
                className="mx-3 mt-3 rounded-[12px] overflow-hidden h-[280px] md:h-[320px] lg:h-[380px] 3xl:h-[500px] 4xl:h-[620px] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/Summary.webp')" }}
                aria-label="Transcript and summary preview"
                role="img"
              />
              <div className="p-4 pt-2 3xl:p-6 4xl:p-8">
                <h3 className="font-montserrat font-semibold text-[#101010] text-[18px] lg:text-[20px] 3xl:text-[22px] 4xl:text-[24px]">
                  Transcript & summary
                </h3>
                <p className="font-montserrat text-[#4F4F4F] text-[14px] lg:text-[15px] 3xl:text-[16px] 4xl:text-[18px]">
                  Conversations captured. Insights delivered.
                </p>
              </div>
            </article>
          </div>

          {/* ROW 2 — 40/60 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:[grid-template-columns:1fr_1.6fr] gap-4 lg:gap-6 3xl:gap-8 4xl:gap-10">
            {/* Adaptive Audio */}
            <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
              <div
                className="mx-3 mt-3 rounded-[12px] overflow-hidden h-[280px] md:h-[320px] lg:h-[380px] 3xl:h-[500px] 4xl:h-[620px] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/MoodbasedPlaylist.webp')" }}
                aria-label="Adaptive Audio preview"
                role="img"
              />
              <div className="p-4 pt-2 3xl:p-6 4xl:p-8">
                <h3 className="font-montserrat font-semibold text-[#101010] text-[18px] lg:text-[20px] 3xl:text-[22px] 4xl:text-[24px]">
                  Adaptive Audio
                </h3>
                <p className="font-montserrat text-[#4F4F4F] text-[14px] lg:text-[15px] 3xl:text-[16px] 4xl:text-[18px]">
                  Adjusts in real time to your world for perfect balance and focus.
                </p>
              </div>
            </article>

            {/* AI driven */}
            <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
              <div
                className="mx-3 mt-3 rounded-[12px] overflow-hidden h-[280px] md:h-[320px] lg:h-[380px] 3xl:h-[500px] 4xl:h-[620px] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/AIDriven.webp')" }}
                aria-label="AI driven feature preview"
                role="img"
              />
              <div className="p-4 pt-2 3xl:p-6 4xl:p-8">
                <h3 className="font-montserrat font-semibold text-[#101010] text-[18px] lg:text-[20px] 3xl:text-[22px] 4xl:text-[24px]">
                  AI driven
                </h3>
                <p className="font-montserrat text-[#4F4F4F] text-[14px] lg:text-[15px] 3xl:text-[16px] 4xl:text-[18px]">
                  Your world, your AI. Works flawlessly with any ecosystem you choose.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </RevealSection>
  );
}
