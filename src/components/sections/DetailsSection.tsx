'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Button from '@/components/ui/Button';

interface FeatureProps {
  title: string;
  description: string;
}

function Feature({ title, description }: FeatureProps) {
  return (
    <div className="flex flex-col gap-2 max-w-[300px]">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#06DF73]" />
        <h4 className="text-white font-montserrat font-semibold text-[18px] leading-[24px] md:text-[20px] md:leading-[28px]">
          {title}
        </h4>
      </div>
      <p className="text-white/90 font-montserrat text-[14px] leading-[20px] md:text-[14px] md:leading-[20px]">
        {description}
      </p>
    </div>
  );
}

const DetailsSection: React.FC = () => {
  return (
    <RevealSection className="relative w-full flex justify-center bg-black overflow-hidden">
      {/* Desktop: absolute composition */}
      <div className="hidden lg:block relative w-full max-w-[1440px] h-[918px] bg-[#020202]">
        {/* Heading */}
        <div className="absolute left-[54px] top-[54px] text-white font-montserrat font-semibold tracking-[-0.02em]">
          <div className="text-[40px] leading-[50px]">Not Just Earbuds, A System Where</div>
          <div className="text-[40px] leading-[50px]">Every Detail Matters</div>
        </div>
        {/* Top-right buttons */}
        <div className="absolute right-[54px] top-[54px] flex items-center gap-3">
          <Button variant="secondary" size="md" className="h-[36px] px-5 rounded-full border border-white/30 font-montserrat text-[14px] leading-[20px]">
            Discover The Features
          </Button>
          <Button variant="primary" size="md" className="h-[36px] px-5 rounded-full font-montserrat text-[14px] leading-[20px]">
            Get Early Access
          </Button>
        </div>

        {/* Center product image (render9 1) */}
        <div className="absolute left-[502px] top-[293px] w-[435.47px] h-[492px]">
          <div className="relative w-full h-full">
            <OptimizedImage src="/headphonetilt" alt="Arfve earbuds tilt" fill fallbackOnly className="object-contain" />
          </div>
        </div>

        {/* Left features exact positions */}
        <div className="absolute left-[117px] top-[365px] w-[345px] h-[109px] flex flex-col items-start gap-[5px]">
          <div className="flex items-center justify-end gap-2 h-[32px] w-full">
            <div className="text-white font-montserrat font-semibold text-[24px] leading-[32px]">AI Personal Assistant</div>
            <span className="w-[10px] h-[10px] rounded-full bg-[#06DF73]" />
          </div>
          <p className="w-[327px] h-[72px] text-right text-white font-montserrat font-medium text-[16px] leading-[24px]">
            Take notes, translate in real time, and access Siri, Google Assistant, or Alexa, all from your earbuds.
          </p>
        </div>
        <div className="absolute left-[173px] top-[634px] w-[345px] h-[109px] flex flex-col items-start gap-[5px]">
          <div className="flex items-center justify-end gap-2 h-[32px] w-full">
            <div className="text-white font-montserrat font-semibold text-[24px] leading-[32px]">Intelligent Noise Control</div>
            <span className="w-[10px] h-[10px] rounded-full bg-[#06DF73]" />
          </div>
          <p className="w-[327px] h-[72px] text-right text-white font-montserrat font-medium text-[16px] leading-[24px]">
            AI adjusts to your surroundings and learns your preferences for smarter, more personal sound.
          </p>
        </div>

        {/* Right features exact positions */}
        <div className="absolute left-[613px] top-[226px] w-[345px] h-[85px] flex flex-col items-end gap-[5px]">
          <div className="flex items-center gap-2 h-[32px] w-full">
            <span className="w-[10px] h-[10px] rounded-full bg-[#06DF73]" />
            <div className="text-white font-montserrat font-semibold text-[24px] leading-[32px]">Water & Sweat Resistance</div>
          </div>
          <p className="w-[327px] h-[48px] text-white font-montserrat font-medium text-[16px] leading-[24px]">
            IPX54-rated. Built for everyday use, workouts, and unexpected weather.
          </p>
        </div>

        <div className="absolute left-[977px] top-[444px] w-[345px] h-[157px] flex flex-col items-end gap-[5px]">
          <div className="flex items-center gap-2 h-[32px] w-full">
            <span className="w-[10px] h-[10px] rounded-full bg-[#06DF73]" />
            <div className="text-white font-montserrat font-semibold text-[24px] leading-[32px]">Connectivity</div>
          </div>
          <p className="w-[327px] h-[120px] text-white font-montserrat font-medium text-[16px] leading-[24px]">
            Bluetooth 5.4 + LE Audio Multipoint support. Connect to two devices at once. Auracast-ready. Share audio with multiple listeners instantly.
          </p>
        </div>

        <div className="absolute left-[844px] top-[719px] w-[345px] h-[85px] flex flex-col items-end gap-[5px]">
          <div className="flex items-center gap-2 h-[32px] w-full">
            <span className="w-[10px] h-[10px] rounded-full bg-[#06DF73]" />
            <div className="text-white font-montserrat font-semibold text-[24px] leading-[32px]">Gesture & Voice Control</div>
          </div>
          <p className="w-[327px] h-[48px] text-white font-montserrat font-medium text-[16px] leading-[24px]">
            Control your earbuds hands-free. No taps, no buttons, just motion and voice.
          </p>
        </div>
      </div>

      {/* Mobile/Tablet stacked layout */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-12 flex flex-col items-center gap-8">
        <h3 className="text-center text-white font-montserrat font-semibold text-[28px] leading-[36px] md:text-[32px] md:leading-[40px]">
          Not Just Earbuds, A System Where
          <br />
          Every Detail Matters
        </h3>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="md" className="h-[36px] px-4 rounded-full border border-white/30 font-montserrat text-[14px] leading-[20px]">Discover The Features</Button>
          <Button variant="primary" size="md" className="h-[36px] px-4 rounded-full font-montserrat text-[14px] leading-[20px]">Get Early Access</Button>
        </div>
        <div className="w-[320px] md:w-[420px] aspect-[4/3]">
          <div className="relative w-full h-full">
            <OptimizedImage src="/headphonetilt" alt="Arfve earbuds tilt" fill fallbackOnly className="object-contain" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Feature title="AI Personal Assistant" description="Take notes, translate in real time, and access Siri, Google Assistant, or Alexa, all from your earbuds." />
          <Feature title="Water & Sweat Resistance" description="IPX54-rated. Built for everyday use, workouts, and unexpected weather." />
          <Feature title="Intelligent Noise Control" description="AI adjusts to your surroundings and learns your preferences for smarter, more personal sound." />
          <Feature title="Connectivity" description="Bluetooth 5.4 + LE Audio Multipoint support. Connect to two devices at once. Auracast-ready. Share audio with multiple listeners." />
          <Feature title="Gesture & Voice Control" description="Control your earbuds hands-free. No taps, no buttons, just motion and voice." />
        </div>
      </div>
    </RevealSection>
  );
};

export default DetailsSection;


