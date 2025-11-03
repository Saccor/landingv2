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
    <RevealSection className="relative w-full flex justify-center bg-white overflow-hidden">
      {/* Desktop container per v6: 1440x1252, padding 50/124, gap 60 */}
      <div className="hidden lg:flex relative w-full max-w-[1440px] h-[1252px] px-[124px] py-[50px] gap-[60px] items-start justify-center">
        <div className="w-full h-full flex flex-col items-start justify-center gap-[60px]">
          {/* Top heading group (1043 x 134) */}
          <div className="w-[1043px] h-[134px] flex flex-col items-start gap-[10px]">
            <div className="w-[1043px] h-[60px] flex flex-row flex-wrap items-start gap-x-[17px]">
              <div className="w-[572px] h-[60px] font-montserrat font-semibold text-[48px] leading-[60px] tracking-[-0.02em] text-[#1A1A1A]" style={{ textShadow: '0px 0px 37.4px #FFFFFF' }}>
                What Needs Changing
              </div>
            </div>
            <p className="w-[1043px] h-[64px] font-montserrat font-normal text-[24px] leading-[32px] text-[#1A1A1A] whitespace-pre-line">
              {`Swappable sound drivers, batteries, chipsets, and design covers. Legacy 1 is built to stay.\nWhy throw away the whole product when just one part needs an upgrade?`}
            </p>
          </div>

          {/* Row 1 */}
          <div className="w-[1192px] h-[449px] flex flex-row items-center gap-[60px]">
            {/* Column A */}
            <div className="w-[566px] h-[449px] flex flex-col items-start gap-[20px]">
              <div className="w-[566px] h-[152px] flex flex-col items-start gap-[12px]">
                <h3 className="w-[566px] h-[44px] font-montserrat font-semibold text-[36px] leading-[44px] tracking-[-0.02em] text-[#1A1A1A]">AI noise cancelling</h3>
                <p className="w-[566px] h-[96px] font-montserrat font-medium text-[16px] leading-[24px] text-[#1A1A1A]">Lörem ipsum lose nyska rektiga nyfriskjobb eftersom berenar. Dor tira att spediskap depude. Os od tidaning plus petening och dasade. Faprede mubopun exov om än daboss repör. E-learning nenodöbel antel.</p>
              </div>
              <div className="relative w-[566px] h-[277px] bg-[#DDDDDD] rounded-[20px] overflow-hidden">
                <OptimizedImage src="/v6/NoiseCancellation" alt="Noise cancellation" fill fallbackOnly className="object-cover" />
              </div>
            </div>
            {/* Column B */}
            <div className="w-[566px] h-[449px] flex flex-col items-start gap-[20px]">
              <div className="w-[566px] h-[152px] flex flex-col items-start gap-[12px]">
                <h3 className="w-[566px] h-[44px] font-montserrat font-semibold text-[36px] leading-[44px] tracking-[-0.02em] text-[#1A1A1A]">AI noise cancelling</h3>
                <p className="w-[566px] h-[96px] font-montserrat font-medium text-[16px] leading-[24px] text-[#1A1A1A]">Lörem ipsum lose nyska rektiga nyfriskjobb eftersom berenar. Dor tira att spediskap depude. Os od tidaning plus petening och dasade. Faprede mubopun exov om än daboss repör. E-learning nenodöbel antel.</p>
              </div>
              <div className="relative w-[566px] h-[277px] bg-[#DDDDDD] rounded-[20px] overflow-hidden">
                <OptimizedImage src="/v6/NoteTaking" alt="Note taking" fill fallbackOnly className="object-cover" />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="w-[1192px] h-[449px] flex flex-row items-center gap-[60px]">
            {/* Column C */}
            <div className="w-[566px] h-[449px] flex flex-col items-start gap-[20px]">
              <div className="w-[566px] h-[152px] flex flex-col items-start gap-[12px]">
                <h3 className="w-[566px] h-[44px] font-montserrat font-semibold text-[36px] leading-[44px] tracking-[-0.02em] text-[#1A1A1A]">AI noise cancelling</h3>
                <p className="w-[566px] h-[96px] font-montserrat font-medium text-[16px] leading-[24px] text-[#1A1A1A]">Lörem ipsum lose nyska rektiga nyfriskjobb eftersom berenar. Dor tira att spediskap depude. Os od tidaning plus petening och dasade. Faprede mubopun exov om än daboss repör. E-learning nenodöbel antel.</p>
              </div>
              <div className="relative w-[566px] h-[277px] bg-[#DDDDDD] rounded-[20px] overflow-hidden">
                <OptimizedImage src="/v6/NoiseCancellation" alt="Noise cancellation" fill fallbackOnly className="object-cover" />
              </div>
            </div>
            {/* Column D */}
            <div className="w-[566px] h-[449px] flex flex-col items-start gap-[20px]">
              <div className="w-[566px] h-[152px] flex flex-col items-start gap-[12px]">
                <h3 className="w-[566px] h-[44px] font-montserrat font-semibold text-[36px] leading-[44px] tracking-[-0.02em] text-[#1A1A1A]">AI noise cancelling</h3>
                <p className="w-[566px] h-[96px] font-montserrat font-medium text-[16px] leading-[24px] text-[#1A1A1A]">Lörem ipsum lose nyska rektiga nyfriskjobb eftersom berenar. Dor tira att spediskap depude. Os od tidaning plus petening och dasade. Faprede mubopun exov om än daboss repör. E-learning nenodöbel antel.</p>
              </div>
              <div className="relative w-[566px] h-[277px] bg-[#DDDDDD] rounded-[20px] overflow-hidden">
                <OptimizedImage src="/v6/NoteTaking" alt="Note taking" fill fallbackOnly className="object-cover" />
              </div>
            </div>
          </div>
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


