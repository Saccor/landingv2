'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SurveyIntroSection() {
  return (
    <section className="bg-black text-white flex-grow flex flex-col font-montserrat">


{/* Separate breadcrumb container */}
<div className="w-full px-6 pt-10">
  <div className="max-w-[1270px] mx-auto text-sm text-[#ffffff] mb-6 flex items-center gap-2">
    <Image src="/houseicon.png" alt="Home" width={16} height={16} className="inline-block" />
    <Link href="/" className="underline font-semibold">Homepage</Link>
    <span className="text-[#ffffff]">{'›'}</span>
    <span className="text-white">Survey</span>
  </div>
</div>

      {/* Main content */}
      <div className="max-w-[960px] mt-12 mx-auto px-6 pb-16">
        <div className="space-y-6">
          <h1 className="text-xl font-semibold">Welcome to the Arfve Survey</h1>

          <p className="font-semibold">
            Help us shape the future of audio – your voice matters.
          </p>
          <p className="text-[#CCCCCC]">
            This quick 4-minute survey will directly influence our final design and features.
          </p>

          <p className="text-[#CCCCCC]">
            At Arfve, we believe the world doesn’t need more disposable earbuds. It needs sound that lasts,
            design that adapts, and tech that doesn’t expire. Your insights will help us build something different.
          </p>

          <p className="text-[#CCCCCC]">
            As a thank you, you’ll get early access to exclusive discounts, product updates and a chance to win
            a pair of Legacy 1 Earbuds.
          </p>

          <p className="font-semibold">
            The winner will be announced right before launch day.
          </p>

          <p className="text-[#CCCCCC]">
            This survey is anonymous. If you’d like to receive your reward, please leave your email at the end.
          </p>

          <div className="leading-snug">
  <p className="text-white font-semibold ">Thank you for being part of this movement.</p>
  <p className="text-[#CCCCCC]">– The Arfve Team</p>
</div>


         <div className="mt-8 flex justify-center">
          <button className="bg-white text-black px-6 py-2 rounded-full hover:opacity-90 transition">
            Start the survey
          </button>
         </div>
        </div>
      </div>
    </section>
  );
}
