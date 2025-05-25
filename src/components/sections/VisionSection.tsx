'use client';

import React, { useState } from 'react';

export default function VisionSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="w-full bg-black flex justify-center items-center py-12 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex flex-col md:flex-row w-full gap-8 items-stretch">
        {/* Left: Text */}
        <div className="bg-[var(--Gray-800,#363637)] rounded-[23px] p-5 flex flex-col justify-center items-center gap-3 w-full md:w-[420px] h-[220px] md:h-[460px] z-[1] flex-none md:ml-32">
          <h2 className="text-white text-3xl font-bold mb-2 font-montserrat text-center">Our vision</h2>
          <p className="text-gray-200 text-lg font-poppins text-center">
            Arfive isn't just another pair of earbuds — it's a modular audio system engineered for life on your terms.
          </p>
        </div>
        {/* Right: Video */}
        <div className="relative flex items-center justify-center w-full h-[220px] md:h-[460px] rounded-[27px] overflow-hidden flex-grow z-0 md:mr-32">
          <video
            className="w-full h-full object-cover rounded-[27px]"
            src="/video/hero-optimized.mp4"
            controls={isPlaying}
            onClick={() => setIsPlaying(true)}
            poster="/video/poster.jpg"
          >
            Your browser does not support the video tag.
          </video>
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer rounded-[27px]" onClick={() => setIsPlaying(true)}>
              {/* Play Icon */}
              <svg className="w-16 h-16 text-white opacity-80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="32" fill="black" fillOpacity="0.5"/>
                <polygon points="26,20 48,32 26,44" fill="white" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 