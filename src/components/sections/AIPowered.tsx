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
      px-4 py-12
      md:px-20 md:py-[50px] md:gap-[95px]
      lg:px-12 lg:py-20 lg:gap-20
    "
      >
        {/* Section header - Frame 481710 */}
        <header
          className="
            w-full max-w-[353px] md:max-w-[674px] lg:max-w-[1120px] mx-auto
            flex flex-col items-start gap-[10px]
          "
        >
          <div className="w-full flex flex-row flex-wrap items-baseline gap-x-[17px] gap-y-0">
            <h2
              className="
                w-full
                font-montserrat font-semibold text-[#1A1A1A]
                text-[24px] md:text-[30px] lg:text-[36px]
                leading-[32px] md:leading-[38px] lg:leading-[44px]
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
              text-[18px] leading-[28px]
            "
          >
            Our intelligent system learns from you, adapts to your environment, and evolves with your listening habits. It enhances every note, conversation, and experience, acting as a personal audio assistant that grows with you.
          </p>
        </header>

        {/* Features grid */}
        <div
          className="
            w-full max-w-[353px] md:max-w-[674px] lg:max-w-[1120px] mx-auto
            grid grid-cols-1 gap-8
            md:grid-cols-1 md:gap-[58px]
            lg:grid-cols-2 lg:gap-10
          "
        >
          <FeatureBlock
            title="Smart Noise Cancellation & Voice Isolation"
            description="Focus on what matters. Adaptive noise cancellation blocks distractions, while voice isolation ensures your voice comes through perfectly — even in the busiest environments."
            media={{ src: "/video/NoiseCancellation.mp4" }}
            isVideo={true}
          />

          <FeatureBlock
            title="Note-Taking"
            description="With Note-Taking, capture voice, media, and documents seamlessly. AI organizes and links everything, delivering curated summaries and insights that grow with you."
            media={{ src: "/video/NoteTaking2.mp4" }}
            isVideo={true}
          />

          <FeatureBlock
            title="Live Translation"
            description="Communicate effortlessly across languages and never have a problem with language again. Instant in-ear and on-screen translation ensures every conversation flows naturally."
            media={{ src: "/images/LiveTranslation.png", alt: "Live Translation preview" }}
            isVideo={false}
          />

          <FeatureBlock
            title="Zen Mode"
            description="Create your personal auditory sanctuary. Zen Mode blends immersive soundscapes and subtle brainwave tones to help you focus, relax or recharge, blocking distractions while guiding your mind to calm and clarity."
            media={{ src: "/images/zen_mode.png", alt: "Zen Mode preview" }}
            isVideo={false}
          />
        </div>
      </section>
    </RevealSection>
  );
}
