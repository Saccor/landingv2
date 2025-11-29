'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import FeatureBlock from './FeatureBlock';

export default function AIPowered() {
  return (
    <RevealSection className="w-full relative bg-white">
      <section
        className="
      w-full flex flex-col items-center gap-10
      px-4 py-[38px]
      md:px-20 md:py-[40px] md:gap-[95px]
      lg:px-12 lg:py-[70px] lg:gap-20
      3xl:px-16 3xl:py-[86px] 3xl:gap-24
      4xl:px-20 4xl:py-[102px] 4xl:gap-28
      max-w-[1440px] 3xl:max-w-[1920px] 4xl:max-w-[2560px] mx-auto
    "
      >
        {/* Section header - Frame 481710 */}
        <header
          className="
            w-full max-w-[353px] md:max-w-[674px] lg:max-w-[1120px] 3xl:max-w-[1500px] 4xl:max-w-[2000px]
            flex flex-col items-start gap-[10px] 3xl:gap-[12px] 4xl:gap-[14px]
          "
        >
          <div className="w-full flex flex-row flex-wrap items-baseline gap-x-[17px] gap-y-0">
            <h2
              className="
                w-full
                font-montserrat font-semibold text-[#1A1A1A]
                text-[24px] md:text-[30px] lg:text-[36px] 3xl:text-[42px] 4xl:text-[48px]
                leading-[32px] md:leading-[38px] lg:leading-[44px] 3xl:leading-[52px] 4xl:leading-[60px]
                tracking-[-0.02em]
              "
              style={{ textShadow: '0px 0px 37.4px #FFFFFF' }}
            >
              AI-Powered Earbuds & Your <br />Personal Assistant
            </h2>
          </div>
          <p
            className="
              w-full h-[140px] md:h-auto
              font-montserrat font-medium text-[#1A1A1A]
              text-[18px] 3xl:text-[20px] 4xl:text-[22px] leading-[28px] 3xl:leading-[30px] 4xl:leading-[34px]
            "
          >
            Our intelligent system learns from you, adapts to your environment, and evolves with your listening habits. It enhances every note, conversation, and experience, acting as a personal audio assistant that grows with you.
          </p>
        </header>

        {/* Features grid */}
        <div
          className="
            w-full max-w-[353px] md:max-w-[674px] lg:max-w-[1120px] 3xl:max-w-[1500px] 4xl:max-w-[2000px]
            grid grid-cols-1 gap-8
            md:grid-cols-1 md:gap-[58px]
            lg:grid-cols-2 lg:gap-10 3xl:gap-14 4xl:gap-16
          "
        >
          <FeatureBlock
            title="Smart Noise Cancellation & Voice Isolation"
            description="Focus on what matters. Adaptive noise cancellation blocks distractions, while voice isolation ensures your voice comes through perfectly - even in the busiest environments."
            media={{ src: "/video/NoiseCancellation.webm" }}
            isVideo={true}
          />

          <FeatureBlock
            title="Note-Taking"
            description="With Note-Taking, capture voice, media, and documents seamlessly. AI organizes and links everything, delivering curated summaries and insights that grow with you."
            media={{ src: "/video/NoteTaking2.webm" }}
            isVideo={true}
          />

          <FeatureBlock
            title="Live Translation"
            description="Communicate effortlessly across languages and never have a problem with language again. Instant in-ear and on-screen translation ensures every conversation flows naturally."
            media={{ src: "/images/LiveTranslation.webp", alt: "Live Translation preview" }}
            isVideo={false}
          />

          <FeatureBlock
            title="Zen Mode"
            description="Create your personal auditory sanctuary. Zen Mode blends immersive soundscapes and subtle brainwave tones to help you focus, relax or recharge, blocking distractions while guiding your mind to calm and clarity."
            media={{ src: "/images/zen_mode.webp", alt: "Zen Mode preview" }}
            isVideo={false}
          />
        </div>
      </section>
    </RevealSection>
  );
}
