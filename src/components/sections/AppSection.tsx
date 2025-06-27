'use client';

import React from 'react';
import Image from 'next/image';
import RevealSection from '@/components/ui/RevealSection';

const AppSection: React.FC = () => {
  return (
    <RevealSection className="bg-black overflow-hidden flex justify-center">
      <div className="w-full flex justify-center py-8 lg:py-16 px-6">
        <div className="w-full max-w-[1400px]">

          {/* Mobile Layout */}
          <div
            className="
              block md:hidden
              space-y-8 text-white font-montserrat
              max-w-[340px] mx-auto
            "
          >
            <div className="flex justify-center">
              <Image
                src="/phone.png"
                alt="App preview"
                width={236}
                height={400}
                className="w-[150px] object-contain drop-shadow-2xl"
                priority
              />
            </div>
            <div className="text-center">
              <h2 className="text-[1.75rem] font-bold bg-gradient-to-r from-white to-[#C8CBAC] bg-clip-text text-transparent leading-tight">
                Smarter Control — Powered by AI and the Arfve App
              </h2>
              <p className="text-[#cccccc] mt-2 text-[1.1rem] leading-relaxed">
                Behind every sound is a system that adapts in real time. <br />
                The Arfve App and on-device AI learn from you — and put you in control.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <FeatureBox1 />
              <FeatureBox2 />
            </div>
          </div>

          {/* Tablet Layout */}
          <div
            className="
              hidden md:grid lg:hidden
              grid-cols-2 gap-6
              text-white font-montserrat
              max-w-[700px] mx-auto
            "
          >
            <div className="flex justify-center">
              <Image
                src="/phone.png"
                alt="App preview"
                width={236}
                height={400}
                className="w-[180px] object-contain drop-shadow-2xl"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-[1.75rem] font-bold bg-gradient-to-r from-white to-[#C8CBAC] bg-clip-text text-transparent leading-tight">
                Smarter Control — Powered by AI and the Arfve App
              </h2>
              <p className="text-[#cccccc] mt-2 text-[1.1rem] leading-relaxed">
                Behind every sound is a system that adapts in real time. <br />
                The Arfve App and on-device AI learn from you — and put you in control.
              </p>
            </div>
            <FeatureBox1 />
            <FeatureBox2 />
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-[30%_70%] gap-8 text-white font-montserrat">
            {/* Left: Image */}
            <div className="flex justify-center">
              <Image
                src="/phone.png"
                alt="App preview"
                width={236}
                height={400}
                className="w-[220px] object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Right: Heading + Features */}
            <div className="flex flex-col gap-8 max-w-[900px] mx-auto">
              <div className="text-left">
                <h2 className="text-[1.75rem] font-bold bg-gradient-to-r from-white to-[#C8CBAC] bg-clip-text text-transparent leading-tight">
                  Smarter Control — Powered by AI and the Arfve App
                </h2>
                <p className="text-[#cccccc] mt-2 text-[1.1rem] leading-relaxed">
                  Behind every sound is a system that adapts in real time. <br />
                  The Arfve App and on-device AI learn from you — and put you in control.
                </p>
              </div>
              <div className="flex flex-row gap-4 w-full">
                <div className="flex-1 bg-[#1b1b1b] p-10">
                  <h3 className="text-[1.25rem] font-semibold mb-4">AI That Moves With You</h3>
                  <ul className="list-disc pl-6 text-[0.95rem] leading-7">
                    <li>Real-time translation.</li>
                    <li>Voice memos with xNotes.</li>
                    <li>Gesture and voice commands — no taps needed.</li>
                    <li>AI adapts noise control based on your environment.</li>
                  </ul>
                </div>
                <div className="flex-1 bg-[#1b1b1b] p-10">
                  <h3 className="text-[1.25rem] font-semibold mb-4">Your Sound, Your Rules</h3>
                  <ul className="list-disc pl-6 text-[0.95rem] leading-7">
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
      </div>
    </RevealSection>
  );
};

const FeatureBox1 = () => (
  <div className="w-full bg-[#1b1b1b] p-8">
    <h3 className="text-[1.25rem] font-semibold mb-4">AI That Moves With You</h3>
    <ul className="list-disc pl-6 text-[0.95rem] leading-7">
      <li>Real-time translation.</li>
      <li>Voice memos with xNotes.</li>
      <li>Gesture and voice commands — no taps needed.</li>
      <li>AI adapts noise control based on your environment.</li>
    </ul>
  </div>
);

const FeatureBox2 = () => (
  <div className="w-full bg-[#1b1b1b] p-8">
    <h3 className="text-[1.25rem] font-semibold mb-4">Your Sound, Your Rules</h3>
    <ul className="list-disc pl-6 text-[0.95rem] leading-7">
      <li>Bluetooth 5.4 + LE Audio</li>
      <li>Stay connected up to two devices at once</li>
      <li>Auracast ready: share audio with multiple listeners at once</li>
      <li>Voice assistant ready: Siri, Alexa and Google assistant</li>
    </ul>
  </div>
);

export default AppSection;
