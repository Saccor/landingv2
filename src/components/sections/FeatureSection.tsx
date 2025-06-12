'use client';

import React from 'react';
import WavesIcon from '@/components/icons/featuresIcons/waves';
import BatteryIcon from '@/components/icons/featuresIcons/Battery';
import CircleIcon from '@/components/icons/featuresIcons/Circle';
import GamepadIcon from '@/components/icons/featuresIcons/gamepad';
import SoundwaveIcon from '@/components/icons/featuresIcons/soundwave';
import LeafIcon from '@/components/icons/featuresIcons/Leaf';

export default function FeatureSection() {
  return (
    <section className="bg-black overflow-hidden">
      <div className="w-full flex flex-col items-center">
        {/* Gray box: heading at the top, features grid below */}
        <div className="bg-[var(--Gray-900,#1b1b1b)] rounded-xl shadow-lg w-[353px] lg:w-[1400px] flex flex-col items-start px-6 py-7 mt-[20px] lg:px-16 lg:py-0">
          {/* Heading inside the gray box, left-aligned, width matches features */}
          <h2 className="font-montserrat font-bold text-[24px] leading-[32px] bg-gradient-to-r from-white to-[#C8A596] bg-clip-text text-transparent text-left mb-[50px] lg:mb-8 lg:text-[28px] lg:leading-[36px] w-full max-w-[305px] lg:max-w-none">
            <span className="block lg:hidden">
              Earbuds Engineered<br />
              Without Compromise —<br />
              and Built for<br />
              Sustainability
            </span>
            <span className="hidden lg:inline">
              Earbuds <span className="text-inherit">Engineered Without Compromise</span> — and <span className="text-inherit">Built for Sustainability</span>
            </span>
          </h2>
          {/* Features grid */}
          <div className="w-full max-w-[305px] lg:max-w-none grid grid-cols-1 gap-6 lg:grid-cols-2 lg:grid-rows-3 lg:gap-x-16 lg:gap-y-8">
            {/* Feature 1: Studio-Grade Sound */}
            <div className="flex flex-col gap-2 lg:gap-3">
              <div className="flex flex-row items-center gap-3 lg:gap-4">
                <SoundwaveIcon className="w-[39px] h-[25px]" />
                <span className="font-montserrat font-semibold text-white text-xl">Studio-Grade Sound</span>
              </div>
              <p className="font-montserrat font-medium text-[14px] leading-[20px] text-white">
                Immersive, high-fidelity audio with premium dynamic drivers. Calibrated to your unique hearing profile with a 9-band EQ.
              </p>
            </div>
            {/* Feature 2: Modular Power */}
            <div className="flex flex-col gap-2 lg:gap-3">
              <div className="flex flex-row items-center gap-3 lg:gap-4">
                <BatteryIcon className="w-[39px] h-[22px]" />
                <span className="font-montserrat font-semibold text-white text-xl">Modular Power</span>
              </div>
              <p className="font-montserrat font-medium text-[14px] leading-[20px] text-white">
                Rechargeable, swappable batteries in both earbuds and case.<br/>
                <span className="block ml-2">→ Up to 9 hours playback</span>
                <span className="block ml-2">→ 30+ hours total with case</span>
                <span className="block ml-2">15 min of charging = 2+ hours of playback</span>
              </p>
            </div>
            {/* Feature 3: Hybrid ANC */}
            <div className="flex flex-col gap-2 lg:gap-3">
              <div className="flex flex-row items-center gap-3 lg:gap-4">
                <CircleIcon className="w-[24px] h-[25px]" />
                <span className="font-montserrat font-semibold text-white text-xl">Hybrid ANC</span>
              </div>
              <p className="font-montserrat font-medium text-[14px] leading-[20px] text-white">
                Up to 45 dB of ambient noise cancelled. Silence distractions. Let in what matters.
              </p>
            </div>
            {/* Feature 4: Low latency mode */}
            <div className="flex flex-col gap-2 lg:gap-3">
              <div className="flex flex-row items-center gap-3 lg:gap-4">
                <GamepadIcon className="w-[36px] h-[36px]" />
                <span className="font-montserrat font-semibold text-white text-xl">Low latency mode</span>
              </div>
              <p className="font-montserrat font-medium text-[14px] leading-[20px] text-white">
                Ultra-responsive for gaming and streaming
              </p>
            </div>
            {/* Feature 5: IPX54 rated */}
            <div className="flex flex-col gap-2 lg:gap-3">
              <div className="flex flex-row items-center gap-3 lg:gap-4">
                <WavesIcon className="w-[35px] h-[36px]" />
                <span className="font-montserrat font-semibold text-white text-xl">IPX54 rated</span>
              </div>
              <p className="font-montserrat font-medium text-[14px] leading-[20px] text-white">
                Water and sweat resistant - ready for active days
              </p>
            </div>
            {/* Feature 6: Recycled materials */}
            <div className="flex flex-col gap-2 lg:gap-3">
              <div className="flex flex-row items-center gap-3 lg:gap-4">
                <LeafIcon className="w-[41px] h-[44px]" />
                <span className="font-montserrat font-semibold text-white text-xl">Recycled materials</span>
              </div>
              <p className="font-montserrat font-medium text-[14px] leading-[20px] text-white">
                Crafted from recycled materials and designed to be 100% serviceable. Replace only what&apos;s needed, and extend lifespan with every update.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 