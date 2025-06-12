'use client';

import React from 'react';
import Image from 'next/image';

const AppSection: React.FC = () => {
  return (
    <section className="bg-black overflow-hidden flex justify-center">
      <div className="w-full flex justify-center">
        <div className="w-[380px] lg:w-[1400px] flex flex-col lg:flex-row gap-x-0 px-6 py-8 lg:px-16 lg:py-16">

          {/* Image container */}
          <div className="flex-shrink-0 lg:flex-[0.9] text-center lg:text-left mb-8 lg:mb-0 lg:-mr-4">

            <Image
              src="/phone.png"
              alt="App preview"
              width={236}
              height={400}
              className="mx-auto lg:mx-0 w-full max-w-[150px] lg:max-w-[220] object-contain"
              priority
            />
          </div>

          {/* Text container */}
          <div className="flex flex-col gap-10 lg:flex-[2.1] text-white font-montserrat">
            {/* Heading + Paragraph */}
            <div>
              <h2 className="text-[1.75rem] font-bold bg-gradient-to-r from-white to-[#C8CBAC] bg-clip-text text-transparent leading-tight">
                Smarter Control — Powered by AI and the Arfve App
              </h2>
              <p className="text-[#cccccc] mt-2 text-[1.1rem] leading-relaxed">
                Behind every sound is a system that adapts in real time. <br />
                The Arfve App and on-device AI learn from you — and put you in control.
              </p>
            </div>

            {/* Feature Boxes */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Box 1 */}
              <div className="flex-1 bg-[#1b1b1b] p-4 lg:p-6 text-white">
                <h3 className="text-[1.25rem] font-semibold mb-4">AI That Moves With You</h3>
                <ul className="list-disc pl-6 text-[0.9rem] leading-7">
                  <li>Real-time translation.</li>
                  <li>Voice memos with xNotes.</li>
                  <li>Gesture and voice commands — no taps needed.</li>
                  <li>AI adapts noise control based on your environment.</li>
                </ul>
              </div>

              {/* Box 2 */}
              <div className="flex-1 bg-[#1b1b1b] p-4 lg:p-6 text-white">
                <h3 className="text-[1.25rem] font-semibold mb-4">Your Sound, Your Rules</h3>
                <ul className="list-disc pl-6 text-[0.9rem] leading-7">
                  <li>Bluetooth 5.4 + LE Audio</li>
                  <li>Stay connected up to two devices at once</li>
                  <li>Auracast ready: share audio with multiple listeners at once</li>
                  <li>Voice assistant ready: Siri, Alexa and Google assistant</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
