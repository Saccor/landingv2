'use client';

import React, { useState, useRef, useEffect } from 'react';
import RevealSection from '@/components/ui/RevealSection';
import { gsap } from 'gsap';

// Feature data - centralized for easy maintenance
const FEATURES = [
  {
    title: "Studio-Grade Sound",
    description: "Lossless audio up to 192 kHz for pure, high-fidelity detail."
  },
  {
    title: "Adaptive Noise Control",
    description: "4th-gen ANC that perfectly balances silence and awareness."
  },
  {
    title: "AI-Driven Audio",
    description: "Real-time tuning for your environment and listening habits."
  },
  {
    title: "Personalized Hearing",
    description: "Built-in compensation enhances every frequency for your unique hearing profile."
  },
  {
    title: "Next-Level Connectivity",
    description: "Bluetooth 5.4, LE Audio, Auracast, and Qualcomm XPAN Wi-Fi ensure flawless range and stability."
  },
  {
    title: "All-Day Power",
    description: "Ultra-efficient design delivers enduring performance without compromise."
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

// Reusable Feature Section Component
interface FeatureSectionProps {
  features: readonly { title: string; description: string }[];
  layout: 'vertical' | 'horizontal';
  titleSize?: 'sm' | 'md' | 'lg';
  descriptionSize?: 'sm' | 'md';
  maxWidth?: string;
  gap?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  features,
  layout,
  titleSize = 'md',
  descriptionSize = 'md',
  maxWidth,
  gap = 'gap-[58px]'
}) => {
  const containerClasses = layout === 'vertical'
    ? `flex flex-col items-start ${gap}`
    : `flex flex-row items-start ${gap}`;

  return (
    <div className={`w-full ${maxWidth ? `max-w-[${maxWidth}]` : ''} ${containerClasses}`}>
      {features.map((feature, index) => (
        <div key={index} className={layout === 'horizontal' ? 'flex-1 max-w-[378px]' : 'w-full'}>
          <FeatureItem
            title={feature.title}
            description={feature.description}
            titleSize={titleSize}
            descriptionSize={descriptionSize}
          />
        </div>
      ))}
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
            Powered by the Qualcomm® Snapdragon™ S7 Pro sound chipset, Arfve Legacy 1 redefines what earbuds can do, delivering unmatched precision, adaptive intelligence, and seamless connectivity.
          </p>
        </div>

        {/* Video */}
        <div className="relative w-[351px] h-[198px] rounded-[30px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-contain"
            src="/v6/ExplodedView16_9.mp4"
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
            Powered by the Qualcomm® Snapdragon™ S7 Pro sound chipset, Arfve Legacy 1 redefines what earbuds can do, delivering unmatched precision, adaptive intelligence, and seamless connectivity.
          </p>
        </div>

        {/* Video */}
        <div className="relative w-[719px] h-[404px] rounded-[30px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-contain"
            src="/v6/ExplodedView16_9.mp4"
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
      <div className="hidden lg:flex w-full max-w-[1440px] px-[124px] py-[50px] flex flex-col items-center gap-[95px] bg-white">
        {/* Heading section */}
        <div className="w-full max-w-[1192px] flex flex-col items-start gap-[10px]">
          <div className="w-full flex flex-row flex-wrap items-start gap-x-[17px] gap-y-0">
            <div className="font-montserrat font-semibold text-[36px] leading-[44px] text-[#1A1A1A]">
              The Pinnacle of Intelligent Audio
            </div>
          </div>
          <p className="w-full font-montserrat font-semibold text-[20px] leading-[30px] text-[#1A1A1A]">
            Powered by the Qualcomm® Snapdragon™ S7 Pro sound chipset, Arfve Legacy 1 redefines what earbuds can do, delivering unmatched precision, adaptive intelligence, and seamless connectivity.
          </p>
        </div>

        {/* First feature row */}
        <FeatureSection
          features={FEATURES.slice(0, 3)}
          layout="horizontal"
          titleSize="lg"
          maxWidth="1199px"
        />

        {/* Video */}
        <div className="relative w-[719px] h-[404px] rounded-[30px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-contain"
            src="/v6/ExplodedView16_9.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Exploded modular view"
          />
        </div>

        {/* Second feature row */}
        <FeatureSection
          features={FEATURES.slice(3, 6)}
          layout="horizontal"
          titleSize="lg"
          maxWidth="1199px"
        />
      </div>
    </RevealSection>
  );
};

export default ModularFeaturesSection;


