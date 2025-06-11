'use client';

import React from 'react';

export default function GrayBoxSection() {
  return (
    <section className="bg-black overflow-hidden">
      <div className="w-full flex justify-center py-8 lg:py-12">
        {/* Gray box: correct size for mobile and desktop */}
        <div className="bg-[var(--Gray-900,#1b1b1b)] rounded-md shadow-lg w-[353px] h-[1042px] lg:w-[1400px] lg:h-[587px] flex flex-col px-5 py-7 gap-8 lg:px-16 lg:py-12 lg:gap-12">
          {/* Heading */}
          <h2 className="font-montserrat font-bold text-[22px] leading-tight text-white mb-2 lg:text-[32px] lg:leading-tight lg:mb-8">
            Earbuds <span className="text-[#C8A596]">Engineered Without Compromise</span> — and <span className="text-[#C8A596]">Built for Sustainability</span>
          </h2>

          {/* Features grid */}
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8">
            {/* Left column */}
            <div className="flex flex-col gap-6">
              {/* Studio-Grade Sound */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><g stroke="#00FF85" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="5" y2="12"/><line x1="7" y1="9" x2="7" y2="15"/><line x1="9" y1="7" x2="9" y2="17"/><line x1="11" y1="10" x2="11" y2="14"/><line x1="13" y1="12" x2="13" y2="12"/><line x1="15" y1="9" x2="15" y2="15"/><line x1="17" y1="11" x2="17" y2="13"/><line x1="19" y1="12" x2="21" y2="12"/></g></svg>
                  <span className="font-montserrat font-semibold text-white text-lg lg:text-xl">Studio-Grade Sound</span>
                </div>
                <p className="font-montserrat text-sm lg:text-base text-[#F5F5F5] ml-7">
                  Immersive, high-fidelity audio with premium dynamic drivers. Calibrated to your unique hearing profile with a 9-band EQ.
                </p>
              </div>
              {/* Hybrid ANC */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#00FF85" strokeWidth="2"/><path d="M8 12h2l2 4 2-8 2 4h2" stroke="#00FF85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="font-montserrat font-semibold text-white text-lg lg:text-xl">Hybrid ANC</span>
                </div>
                <p className="font-montserrat text-sm lg:text-base text-[#F5F5F5] ml-7">
                  Up to 45 dB of ambient noise cancelled. Silence distractions. Let in what matters.
                </p>
              </div>
              {/* IPX54 rated */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 15c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0 3.5 1 5 0" stroke="#00FF85" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span className="font-montserrat font-semibold text-white text-lg lg:text-xl">IPX54 rated</span>
                </div>
                <p className="font-montserrat text-sm lg:text-base text-[#F5F5F5] ml-7">
                  Water and sweat resistant - ready for active days
                </p>
              </div>
            </div>
            {/* Right column */}
            <div className="flex flex-col gap-6">
              {/* Modular Power */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="16" height="10" rx="2" stroke="#00FF85" strokeWidth="2"/><rect x="19" y="10" width="2" height="4" rx="1" fill="#00FF85"/></svg>
                  <span className="font-montserrat font-semibold text-white text-lg lg:text-xl">Modular Power</span>
                </div>
                <p className="font-montserrat text-sm lg:text-base text-[#F5F5F5] ml-7">
                  Rechargeable, swappable batteries in both earbuds and case.<br/>
                  <span className="block ml-2">→ Up to 9 hours playback</span>
                  <span className="block ml-2">→ 30+ hours total with case</span>
                  <span className="block ml-2">15 min of charging = 2+ hours of playback</span>
                </p>
              </div>
              {/* Low latency mode */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="4" stroke="#00FF85" strokeWidth="2"/><circle cx="7" cy="12" r="1" fill="#00FF85"/><circle cx="17" cy="12" r="1" fill="#00FF85"/></svg>
                  <span className="font-montserrat font-semibold text-white text-lg lg:text-xl">Low latency mode</span>
                </div>
                <p className="font-montserrat text-sm lg:text-base text-[#F5F5F5] ml-7">
                  Ultra-responsive for gaming and streaming
                </p>
              </div>
              {/* Recycled materials */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M5 19c2-6 7-10 14-10 0 7-4 12-10 12-2.5 0-4-1.5-4-4 0-2.5 2-4 4-4" stroke="#00FF85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="font-montserrat font-semibold text-white text-lg lg:text-xl">Recycled materials</span>
                </div>
                <p className="font-montserrat text-sm lg:text-base text-[#F5F5F5] ml-7">
                  Crafted from recycled materials and designed to be 100% serviceable. Replace only what&apos;s needed, and extend lifespan with every update.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
} 