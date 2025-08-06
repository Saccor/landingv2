'use client';

import React from 'react';
import Image from 'next/image';

const SustainabilityAwareness = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-20 py-16 bg-black text-white">
      <div className="
  flex flex-col gap-12 items-center justify-between
  md:flex-row md:items-center
">

        {/* Image */}
        <div className="flex-shrink-0">
          <Image
            src="/podsustainability.png" // Replace with your actual file path
            alt="Awareness Visual"
            width={372}
            height={405}
            className="object-contain"
            priority
          />
        </div>

        {/* Text */}
        <div className="max-w-xl text-left">
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 leading-snug">
            Building awareness
          </h2>
          <p className="text-[#E0E0E0] text-base leading-relaxed font-light">
            Arfve exists to bring together this community: people who value excellence,
            longevity, and purpose. Our mission is to end tech overconsumption by creating
            products that are built to last, not just physically, but emotionally and
            functionally. In a world where over 50 electronic devices often lie unused in every
            household and islands of e-waste pollute our oceans, we believe the solution isn’t
            a dream. It’s a decision. Yours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityAwareness;
