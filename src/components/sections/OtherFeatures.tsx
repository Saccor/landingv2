'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';

export default function OtherFeatures() {
  return (
    <RevealSection className="w-full relative bg-[white]">
      <section
        className="
          w-full flex flex-col items-center
          px-4 py-10
          md:px-6 md:py-14
          lg:px-12 lg:py-16
        "
      >
        {/* Header */}
        <header className="w-full max-w-[1120px] mx-auto flex flex-col gap-1 text-left">
          <h2 className="font-montserrat font-bold text-[#101010] text-[26px] leading-[34px] md:text-[30px] lg:text-[36px]">
            And many other features
          </h2>
        </header>

        {/* Grid layout */}
        <div className="w-full max-w-[1120px] mx-auto mt-8 flex flex-col gap-4 lg:gap-6">
          {/* ROW 1 — 60/40 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:[grid-template-columns:1.6fr_1fr] gap-4 lg:gap-6">
            {/* Voice isolation (text top) */}
            <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
              <div className="p-4 pb-2">
                <h3 className="font-montserrat font-semibold text-[#101010] text-[18px] lg:text-[20px]">
                  Voice isolation
                </h3>
                <p className="font-montserrat text-[#4F4F4F] text-[14px] lg:text-[15px]">
                  listen your music like at home
                </p>
              </div>
              <div
                className="mx-3 mb-3 rounded-[12px] overflow-hidden h-[220px] md:h-[250px] lg:h-[300px] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/VoiceIsolation.png')" }}
                aria-label="Voice isolation preview"
                role="img"
              />
            </article>

            {/* Transcript & summary (text bottom) */}
            <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
              <div
                className="mx-3 mt-3 rounded-[12px] overflow-hidden h-[220px] md:h-[250px] lg:h-[300px] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/Summary.png')" }}
                aria-label="Transcript and summary preview"
                role="img"
              />
              <div className="p-4 pt-2">
                <h3 className="font-montserrat font-semibold text-[#101010] text-[18px] lg:text-[20px]">
                  Transcript & summary
                </h3>
                <p className="font-montserrat text-[#4F4F4F] text-[14px] lg:text-[15px]">
                  Conversations captured. Insights delivered.
                </p>
              </div>
            </article>
          </div>

          {/* ROW 2 — 40/60 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:[grid-template-columns:1fr_1.6fr] gap-4 lg:gap-6">
            {/* Mood based playlist */}
            <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
              <div
                className="mx-3 mt-3 rounded-[12px] overflow-hidden h-[220px] md:h-[250px] lg:h-[300px] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/MoodbasedPlaylist.png')" }}
                aria-label="Mood based playlist preview"
                role="img"
              />
              <div className="p-4 pt-2">
                <h3 className="font-montserrat font-semibold text-[#101010] text-[18px] lg:text-[20px]">
                  Mood based playlist
                </h3>
                <p className="font-montserrat text-[#4F4F4F] text-[14px] lg:text-[15px]">
                  Access in one click to your favorite LLM
                </p>
              </div>
            </article>

            {/* AI driven */}
            <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
              <div
                className="mx-3 mt-3 rounded-[12px] overflow-hidden h-[220px] md:h-[250px] lg:h-[300px] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/AIDriven.png')" }}
                aria-label="AI driven feature preview"
                role="img"
              />
              <div className="p-4 pt-2">
                <h3 className="font-montserrat font-semibold text-[#101010] text-[18px] lg:text-[20px]">
                  AI driven
                </h3>
                <p className="font-montserrat text-[#4F4F4F] text-[14px] lg:text-[15px]">
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
