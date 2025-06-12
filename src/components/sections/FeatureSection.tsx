'use client';

import React from 'react';
import WavesIcon from '@/components/icons/featuresIcons/waves.svg';
import BatteryIcon from '@/components/icons/featuresIcons/Battery.svg';
import CircleIcon from '@/components/icons/featuresIcons/Circle.svg';
import GamepadIcon from '@/components/icons/featuresIcons/gamepad.svg';
import SoundwaveIcon from '@/components/icons/featuresIcons/soundwave.svg';
import LeafIcon from '@/components/icons/featuresIcons/Leaf.svg';

export default function GrayBoxSection() {
  return (
    <section className="bg-black overflow-hidden">
      <div className="w-full flex justify-center py-8 lg:py-12">
        {/* Gray box: correct size for mobile and desktop */}
        <div className="bg-[var(--Gray-900,#1b1b1b)] rounded-md shadow-lg w-[353px] h-[1042px] lg:w-[1400px] lg:h-[587px] flex flex-col px-5 py-7 gap-8 lg:px-16 lg:py-12 lg:gap-12">
          {/* Heading */}
          <h2 className="w-[305px] h-[128px] font-montserrat font-bold text-[24px] leading-[32px] bg-gradient-to-r from-white to-[#C8A596] bg-clip-text text-transparent self-stretch">
            Earbuds <span className="text-inherit">Engineered Without Compromise</span> — and <span className="text-inherit">Built for Sustainability</span>
          </h2>

          {/* Features grid */}
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8">
            {/* Left column */}
            <div className="flex flex-col gap-[24px]">
              {/* Studio-Grade Sound */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center p-0 gap-[10px] w-[295px] h-[30px] flex-none order-0 self-stretch">
                  <SoundwaveIcon className="w-[39px] h-[25px]" />
                  <span className="font-montserrat font-semibold text-white text-xl">Studio-Grade Sound</span>
                </div>
                <p className="w-[295px] h-[80px] font-montserrat font-medium text-[14px] leading-[20px] text-white flex-none order-1 self-stretch">
                  Immersive, high-fidelity audio with premium dynamic drivers. Calibrated to your unique hearing profile with a 9-band EQ.
                </p>
              </div>

              {/* Modular Power */}
              <div className="flex flex-col items-start p-[5px] gap-[10px] w-[305px] h-[150px] flex-none order-0 self-stretch">
                <div className="flex flex-row items-center gap-[10px]">
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

              {/* Hybrid ANC */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center p-0 gap-[10px] w-[295px] h-[30px] flex-none order-0 self-stretch">
                  <CircleIcon className="w-[24px] h-[25px]" />
                  <span className="font-montserrat font-semibold text-white text-xl">Hybrid ANC</span>
                </div>
                <p className="w-[295px] h-[40px] font-montserrat font-medium text-[14px] leading-[20px] text-white">
                  Up to 45 dB of ambient noise cancelled. Silence distractions. Let in what matters.
                </p>
              </div>

              {/* Low Latency Mode */}
              <div className="flex flex-col items-start p-[5px] gap-[10px] w-[305px] h-[96px] flex-none order-0 self-stretch">
                <div className="flex flex-row items-center p-0 gap-[10px] w-[295px] h-[36px] flex-none order-0 self-stretch">
                  <GamepadIcon className="w-[36px] h-[36px]" />
                  <span className="font-montserrat font-semibold text-white text-xl">Low latency mode</span>
                </div>
                <p className="font-montserrat font-medium text-[14px] leading-[20px] text-white">
                  Ultra-responsive for gaming and streaming
                </p>
              </div>
            </div>
            {/* Right column */}
            <div className="flex flex-col gap-6">
              {/* IPX54 rated */}
              <div className="flex flex-col items-start p-[5px] gap-[10px] w-[305px] h-[95px] flex-none order-0 self-stretch">
                <div className="flex flex-row items-center p-0 gap-[10px] w-[295px] h-[30px] flex-none order-0 self-stretch">
                  <WavesIcon className="w-[35px] h-[36px]" />
                  <span className="font-montserrat font-semibold text-white text-xl">IPX54 rated</span>
                </div>
                <p className="font-montserrat font-medium text-[14px] leading-[20px] text-white">
                  Water and sweat resistant - ready for active days
                </p>
              </div>
              {/* Recycled materials */}
              <div className="flex flex-col items-start p-[5px] gap-[10px] w-[305px] h-[135px] flex-none order-1 self-stretch">
                <div className="flex flex-row items-center p-0 gap-[10px] w-[295px] h-[30px] flex-none order-0 self-stretch">
                  <LeafIcon className="w-[41px] h-[44px]" />
                  <span className="font-montserrat font-semibold text-white text-xl">Recycled materials</span>
                </div>
                <p className="font-montserrat font-medium text-[14px] leading-[20px] text-white">
                  Crafted from recycled materials and designed to be 100% serviceable. Replace only what's needed, and extend lifespan with every update.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
} 