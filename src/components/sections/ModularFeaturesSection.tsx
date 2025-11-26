'use client';

import React, { useState, useRef, useEffect } from 'react';
import RevealSection from '@/components/ui/RevealSection';
import { gsap } from 'gsap';

// Feature data - centralized for easy maintenance
const FEATURES = [
  {
    title: "Studio-Grade Sound",
    description: "Lossless audio up to 192 kHz for pure, studio-level clarity sound."
  },
  {
    title: "Active Noise Canceling",
    description: "4th Generation Adaptive ANC that perfectly balances silence and awareness."
  },
  {
    title: "Low Latency Mode",
    description: "Low-latency mode delivers instant sound response, ideal for gaming, movies, and streaming."
  },
  {
    title: "Smart Battery Optimization",
    description: "Thoughtfully built for low power consumption, smart technology keeps your audio precise and effortless all day."
  },
  {
    title: "Next-Level Connectivity",
    description: "Bluetooth 5.4, LE Audio, Auracast, and Qualcomm XPAN Wi-Fi ensure flawless range and stability."
  },
  {
    title: "Personalized Hearing",
    description: "Smart on-device AI adapts to your hearing, your environment, and your listening habits to create a personalized audio experience."
  }
] as const;

const PlusIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <path d="M10.9961 1V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
    <path d="M1 11.005L21 11.005" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ExpandableIcon: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => {
  const iconRef = React.useRef<SVGSVGElement>(null);
  const verticalLineRef = React.useRef<SVGPathElement>(null);

  React.useEffect(() => {
    if (verticalLineRef.current) {
      gsap.to(verticalLineRef.current, {
        opacity: isExpanded ? 0 : 1,
        rotation: isExpanded ? -90 : 0,
        transformOrigin: "center",
        duration: 0.4,
        ease: "power2.inOut"
      });
    }
  }, [isExpanded]);

  return (
    <svg
      ref={iconRef}
      width="20"
      height="20"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Horizontal line - always visible */}
      <path
        d="M1 11.005L21 11.005"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Vertical line - rotates and fades when expanded */}
      <path
        ref={verticalLineRef}
        d="M10.9961 1V21"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ transformOrigin: "center" }}
      />
    </svg>
  );
};

const ExpandableItem: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        // Animate in
        gsap.set(contentRef.current, { height: 0, opacity: 0 });
        gsap.to(contentRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      } else {
        // Animate out
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            if (contentRef.current) {
              gsap.set(contentRef.current, { height: 0 });
            }
          }
        });
      }
    }
  }, [isExpanded]);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex flex-col items-start gap-[5px] cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="w-full h-[24px] flex flex-row items-center gap-2">
          <ExpandableIcon isExpanded={isExpanded} />
          <div className="font-montserrat font-semibold text-[18px] leading-[28px] text-[#1A1A1A]">
            {title}
          </div>
        </div>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <div className="w-full mt-4 pl-7">
          <p className="font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

// Reusable Feature Item Component
interface FeatureItemProps {
  title: string;
  description: string;
  titleSize?: 'sm' | 'md' | 'lg';
  descriptionSize?: 'sm' | 'md';
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  title,
  description,
  titleSize = 'md',
  descriptionSize = 'md'
}) => {
  const titleClasses = {
    sm: 'text-[16px] leading-[24px]',
    md: 'text-[18px] leading-[28px]',
    lg: 'text-[20px] leading-[30px]'
  };

  const descriptionClasses = {
    sm: 'text-[16px] leading-[24px]',
    md: 'text-[18px] leading-[28px]'
  };

  return (
    <div className="w-full flex flex-col items-start gap-[5px]">
      <div className={`w-full h-[24px] flex flex-row items-center gap-2 ${titleSize !== 'sm' ? 'h-[28px]' : ''} ${titleSize === 'lg' ? 'h-[30px]' : ''}`}>
        <PlusIcon />
        <div className={`font-montserrat font-semibold text-[#1A1A1A] ${titleClasses[titleSize]}`}>
          {title}
        </div>
      </div>
      <p className={`w-full font-montserrat font-normal text-[#1A1A1A] ${descriptionClasses[descriptionSize]}`}>
        {description}
      </p>
    </div>
  );
};


const ModularFeaturesSection: React.FC = () => {
  return (
    <RevealSection className="relative w-full flex justify-center bg-white overflow-hidden">
      {/* Mobile layout */}
      <div className="md:hidden w-full max-w-[393px] px-5 py-[50px] flex flex-col items-start gap-[95px] bg-white">
        {/* Heading section */}
        <div className="w-full flex flex-col items-start gap-[10px]">
          <div className="w-full h-[64px] flex flex-col items-start gap-0">
            <div className="w-full h-[32px] font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A]">
              The Pinnacle of Intelligent Audio
            </div>
          </div>
          <p className="w-full h-[140px] font-montserrat font-normal text-[18px] leading-[28px] text-[#1A1A1A]">
            Powered by the Snapdragon® S7 Pro Gen 1&apos;s sound chipset, Arfve Legacy 1 redefines what earbuds can do, delivering unmatched precision, adaptive intelligence, and seamless connectivity.
          </p>
        </div>

        {/* Video */}
        <div className="relative w-[351px] h-[198px] rounded-[30px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-contain"
            src="/video/ExplodedView.webm"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Exploded modular view"
          />
        </div>

        {/* Expandable features */}
        <div className="w-full flex flex-col gap-[20px]">
          {FEATURES.map((feature, index) => (
            <ExpandableItem
              key={index}
              title={feature.title}
              content={feature.description}
            />
          ))}
        </div>
      </div>

      {/* Tablet layout */}
      <div className="hidden md:flex lg:hidden w-full max-w-[834px] px-20 py-[50px] flex flex-col items-start gap-[95px] bg-white">
        {/* Heading section */}
        <div className="w-full max-w-[674px] flex flex-col items-start gap-[10px]">
          <div className="w-full flex flex-row flex-wrap items-baseline gap-x-[17px] gap-y-0">
            <div className="font-montserrat font-semibold text-[30px] leading-[38px] text-[#1A1A1A]">
              The Pinnacle of Intelligent Audio
            </div>
          </div>
          <p className="w-full font-montserrat font-normal text-[18px] leading-[28px] text-[#1A1A1A]">
            Powered by the Snapdragon® S7 Pro Gen 1&apos;s sound chipset, Arfve Legacy 1 redefines what earbuds can do, delivering unmatched precision, adaptive intelligence, and seamless connectivity.
          </p>
        </div>

        {/* Video */}
        <div className="relative w-[719px] h-[404px] rounded-[30px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-contain"
            src="/video/ExplodedView.webm"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Exploded modular view"
          />
        </div>

        {/* Expandable features - 3 left, 3 right */}
        <div className="w-full max-w-[674px] flex flex-row gap-[40px]">
          {/* Left column - First 3 features */}
          <div className="flex-1 flex flex-col gap-[20px]">
            {FEATURES.slice(0, 3).map((feature, index) => (
              <ExpandableItem
                key={index}
                title={feature.title}
                content={feature.description}
              />
            ))}
          </div>

          {/* Right column - Last 3 features */}
          <div className="flex-1 flex flex-col gap-[20px]">
            {FEATURES.slice(3, 6).map((feature, index) => (
              <ExpandableItem
                key={index + 3}
                title={feature.title}
                content={feature.description}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex w-full max-w-[1440px] 3xl:max-w-[1920px] 4xl:max-w-[2560px] px-[124px] 3xl:px-[160px] 4xl:px-[200px] py-[50px] 3xl:py-[60px] 4xl:py-[80px] flex flex-col items-center gap-[95px] 3xl:gap-[110px] 4xl:gap-[130px] bg-white mx-auto">
        {/* Heading section */}
        <div className="w-full max-w-[1192px] 3xl:max-w-[1600px] 4xl:max-w-[2160px] flex flex-col items-start gap-[10px] 3xl:gap-[12px] 4xl:gap-[14px]">
          <div className="w-full flex flex-row flex-wrap items-start gap-x-[17px] gap-y-0">
            <div className="font-montserrat font-semibold text-[36px] 3xl:text-[42px] 4xl:text-[48px] leading-[44px] 3xl:leading-[52px] 4xl:leading-[60px] text-[#1A1A1A]">
              The Pinnacle of Intelligent Audio
            </div>
          </div>
          <p className="w-full font-montserrat font-semibold text-[20px] 3xl:text-[22px] 4xl:text-[24px] leading-[30px] 3xl:leading-[34px] 4xl:leading-[38px] text-[#1A1A1A]">
            Powered by the Snapdragon® S7 Pro Gen 1&apos;s sound chipset, Arfve Legacy 1 redefines what earbuds can do, delivering unmatched precision, adaptive intelligence, and seamless connectivity.
          </p>
        </div>

        {/* First feature row */}
        <div className="w-full max-w-[1199px] 3xl:max-w-[1600px] 4xl:max-w-[2160px] flex flex-row items-start gap-[58px] 3xl:gap-[70px] 4xl:gap-[90px]">
          {FEATURES.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex-1">
              <FeatureItem
                title={feature.title}
                description={feature.description}
                titleSize="lg"
                descriptionSize="md"
              />
            </div>
          ))}
        </div>

        {/* Video */}
        <div className="relative w-[719px] 3xl:w-[960px] 4xl:w-[1280px] h-[404px] 3xl:h-[540px] 4xl:h-[720px] rounded-[30px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-contain"
            src="/video/ExplodedView.webm"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Exploded modular view"
          />
        </div>

        {/* Second feature row */}
        <div className="w-full max-w-[1199px] 3xl:max-w-[1600px] 4xl:max-w-[2160px] flex flex-row items-start gap-[58px] 3xl:gap-[70px] 4xl:gap-[90px]">
          {FEATURES.slice(3, 6).map((feature, index) => (
            <div key={index + 3} className="flex-1">
              <FeatureItem
                title={feature.title}
                description={feature.description}
                titleSize="lg"
                descriptionSize="md"
              />
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
};

export default ModularFeaturesSection;


