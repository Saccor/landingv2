'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { gsap } from 'gsap';
import RevealSection from '@/components/ui/RevealSection';

const PlusIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <path d="M10.9961 1V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
    <path d="M1 11.005L21 11.005" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

interface FeatureData {
  title: string;
  description: string;
}

const features: FeatureData[] = [
  {
    title: "Battery",//Wanted 
    description: "Engineered for longevity. Adaptive power intelligence ensures extended battery life, delivering consistent performance from morning to night."
  },
  {
    title: "Recycled Materials",//Wanted
    description: "Designed with care for both performance and the planet, using recycled materials without compromise on quality or feel."
  },
  {
    title: "Snapdragon® S7 Pro Gen 1",
    description: "The most advanced audio chipset delivers best-in-class sound, intelligent processing, and seamless connectivity."
  },
  {
    title: "Multi-AI Assistant Integration",
    description: "Your world, your AI. Seamlessly works with Siri and Alexa."
  },
  {
    title: "Swedish Design",
    description: "Rooted in Scandinavian minimalism, every detail is crafted for balance, clarity, and purpose where form always follows function."
  },
  {
    title: "Water Resistance",
    description: "Ready for anything. Resistant to sweat and rain, built to perform through every moment of your day."
  }
];

interface FeatureBlockProps {
  feature: FeatureData;
  angle: number;
  radius: number;
  centerX: number;
  centerY: number;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ feature, angle, radius, centerX, centerY }) => {
  const radian = (angle * Math.PI) / 180;
  const x = Math.round(centerX + radius * Math.cos(radian));
  const y = Math.round(centerY + radius * Math.sin(radian));

  return (
    <div
      className="absolute w-[280px] flex flex-col items-start gap-[5px] transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <div className="w-full flex flex-row items-center gap-[8px]">
        <PlusIcon />
        <div className="font-montserrat font-semibold text-[20px] leading-[26px] text-[#1A1A1A] whitespace-nowrap">
          {feature.title}
        </div>
      </div>
      <p className="w-full font-montserrat font-medium text-[14px] leading-[20px] text-[#1A1A1A] max-w-[260px]">
        {feature.description}
      </p>
    </div>
  );
};

// Tablet Carousel Component (shows 2 features at a time)
const TabletFeatureCarousel: React.FC<{ features: FeatureData[] }> = ({ features }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      // GSAP animation for carousel transitions
      gsap.fromTo(
        '.embla-slide',
        { opacity: 0.7, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Group features into pairs for tablet carousel
  const featurePairs = [];
  for (let i = 0; i < features.length; i += 2) {
    featurePairs.push(features.slice(i, i + 2));
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {featurePairs.map((pair, pairIndex) => (
            <div key={pairIndex} className="flex-[0_0_100%] embla-slide">
              <div className="flex gap-[40px] justify-center px-4">
                {pair.map((feature, featureIndex) => (
                  <div key={`${pairIndex}-${featureIndex}`} className="flex-1 max-w-[280px]">
                    <div className="w-full flex flex-col items-start gap-[8px]">
                      <div className="w-full flex flex-row items-center gap-[8px]">
                        <PlusIcon />
                        <div className="font-montserrat font-semibold text-[18px] leading-[24px] text-[#1A1A1A] whitespace-nowrap">
                          {feature.title}
                        </div>
                      </div>
                      <p className="w-full font-montserrat font-medium text-[14px] leading-[20px] text-[#1A1A1A]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-6">
        {featurePairs.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${selectedIndex === index
              ? 'bg-[#1A1A1A] scale-125'
              : 'bg-gray-300 hover:bg-gray-500'
              }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Mobile Carousel Component (shows 1 feature at a time)
const MobileFeatureCarousel: React.FC<{ features: FeatureData[] }> = ({ features }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      // GSAP animation for carousel transitions
      gsap.fromTo(
        '.mobile-embla-slide',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {features.map((feature, index) => (
            <div key={index} className="flex-[0_0_100%] mobile-embla-slide">
              <div className="px-4">
                <div className="w-full flex flex-col items-center text-center gap-[12px]">
                  <div className="w-full flex flex-row items-center justify-center gap-[8px]">
                    <PlusIcon />
                    <div className="font-montserrat font-semibold text-[16px] leading-[22px] text-[#1A1A1A] whitespace-nowrap">
                      {feature.title}
                    </div>
                  </div>
                  <p className="w-full font-montserrat font-medium text-[14px] leading-[20px] text-[#1A1A1A] max-w-[280px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {features.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${selectedIndex === index
              ? 'bg-[#1A1A1A] scale-125'
              : 'bg-gray-300 hover:bg-gray-500'
              }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

const DetailsSection: React.FC = () => {
  // Circle parameters - more conservative scaling for larger screens
  const centerX = 720; // Center X coordinate for lg
  const centerY = 730; // Center Y coordinate for lg
  const radius = 375; // Radius for lg

  // More conservative scaling for 3xl (centered for 1920px viewport)
  const centerX3xl = 960; // Center of 1920px viewport
  const centerY3xl = 830;
  const radius3xl = 430;

  // Moderate scaling for 4xl (centered for 2560px viewport)
  const centerX4xl = 1280; // Center of 2560px viewport
  const centerY4xl = 930;
  const radius4xl = 490;

  // Custom angles for 6 features - evenly distributed in hexagonal arrangement
  const angles = [30, 90, 150, 210, 270, 330];

  return (
    <RevealSection className="relative w-full flex justify-center bg-white overflow-hidden">
      {/* Mobile layout */}
      <div className="block md:hidden w-full max-w-[393px] px-5 py-[100px] flex flex-col items-start gap-[50px] bg-white">
        {/* Heading section */}
        <div className="w-full flex flex-col items-start gap-[16px]">
          <div className="w-full font-montserrat font-semibold text-[24px] leading-[32px] text-[#1A1A1A]">
            Innovation, Engineered for You
          </div>
          <p className="w-full font-montserrat font-normal text-[16px] leading-[24px] text-[#1A1A1A]">
            Every feature is engineered to connect, adapt, and elevate your listening experience. Intelligent, intuitive, and effortlessly refined for those who expect nothing less than perfection.
          </p>
        </div>

        {/* Specs image */}
        <div className="relative w-[300px] h-[168px] mx-auto">
          <Image
            src="/images/EarbudSpecs.webp"
            alt="Earbud specifications"
            fill
            className="object-contain"
            priority
            sizes="300px"
          />
        </div>

        {/* Mobile carousel - single feature */}
        <MobileFeatureCarousel features={features} />
      </div>

      {/* Tablet layout */}
      <div className="hidden md:flex lg:hidden w-full max-w-[834px] px-20 py-[100px] flex flex-col items-start gap-[95px] bg-white">
        {/* Heading section */}
        <div className="w-full max-w-[654px] flex flex-col items-start gap-[10px]">
          <div className="w-full flex flex-row flex-wrap items-baseline gap-x-[17px] gap-y-0">
            <div className="font-montserrat font-semibold text-[30px] leading-[38px] text-[#1A1A1A]">
              Innovation, Engineered for You
            </div>
          </div>
          <p className="w-full font-montserrat font-normal text-[18px] leading-[28px] text-[#1A1A1A]">
            Every feature is engineered to connect, adapt, and elevate your listening experience. Intelligent, intuitive, and effortlessly refined for those who expect nothing less than perfection.
          </p>
        </div>

        {/* Specs image */}
        <div className="relative w-[400px] h-[225px] mx-auto">
          <Image
            src="/images/EarbudSpecs.webp"
            alt="Earbud specifications"
            fill
            className="object-contain"
            priority
            sizes="400px"
          />
        </div>

        {/* Tablet carousel - two features at a time */}
        <TabletFeatureCarousel features={features} />
      </div>

      {/* Desktop layout: lg - 1440x1150 circular layout */}
      <div className="hidden lg:block 3xl:hidden relative w-full max-w-[1440px] h-[1250px] py-[100px]">
        {/* Top heading group */}
        <div className="absolute left-[124px] top-[50px] w-[1192px] flex flex-col items-start gap-[10px] z-10">
          {/* Heading container */}
          <div className="w-full flex flex-row flex-wrap items-start gap-x-[17px] gap-y-0">
            <div className="font-montserrat font-semibold text-[36px] leading-[44px] text-[#1A1A1A]">
              Innovation, Engineered for You
            </div>
          </div>
          {/* Description */}
          <p className="w-full font-montserrat font-semibold text-[20px] leading-[30px] text-[#1A1A1A]">
            Every feature is engineered to connect, adapt, and elevate your listening experience. Intelligent, intuitive, and effortlessly refined for those who expect nothing less than perfection.
          </p>
        </div>

        {/* Central specs image */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20" style={{ left: `${centerX}px`, top: `${centerY}px` }}>
          <div className="relative w-[500px] h-[270px]">
            <Image
              src="/images/EarbudSpecs.webp"
              alt="Earbud specifications"
              fill
              className="object-contain"
              priority
              sizes="500px"
            />
          </div>
        </div>

        {/* Circular features */}
        {features.map((feature, index) => (
          <FeatureBlock
            key={`feature-${index}`}
            feature={feature}
            angle={angles[index]}
            radius={radius}
            centerX={centerX}
            centerY={centerY}
          />
        ))}
      </div>

      {/* 3XL layout: 1920px width circular layout - left-aligned heading */}
      <div className="hidden 3xl:block 4xl:hidden relative w-full max-w-[1920px] h-[1400px] py-[100px] mx-auto">
        {/* Top heading group - left-aligned to match other sections */}
        <div className="absolute left-[160px] top-[50px] w-[1600px] flex flex-col items-start gap-[12px] z-10">
          {/* Heading container */}
          <div className="w-full flex flex-row flex-wrap items-start gap-x-[17px] gap-y-0">
            <div className="font-montserrat font-semibold text-[40px] leading-[50px] text-[#1A1A1A]">
              Innovation, Engineered for You
            </div>
          </div>
          {/* Description */}
          <p className="w-full font-montserrat font-semibold text-[22px] leading-[32px] text-[#1A1A1A]">
            Every feature is engineered to connect, adapt, and elevate your listening experience. Intelligent, intuitive, and effortlessly refined for those who expect nothing less than perfection.
          </p>
        </div>

        {/* Central specs image */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20" style={{ left: `${centerX3xl}px`, top: `${centerY3xl}px` }}>
          <div className="relative w-[575px] h-[310px]">
            <Image
              src="/images/EarbudSpecs.webp"
              alt="Earbud specifications"
              fill
              className="object-contain"
              priority
              sizes="575px"
            />
          </div>
        </div>

        {/* Circular features */}
        {features.map((feature, index) => (
          <FeatureBlock
            key={`feature-3xl-${index}`}
            feature={feature}
            angle={angles[index]}
            radius={radius3xl}
            centerX={centerX3xl}
            centerY={centerY3xl}
          />
        ))}
      </div>

      {/* 4XL layout: 2560px width circular layout - left-aligned heading */}
      <div className="hidden 4xl:block relative w-full max-w-[2560px] h-[1550px] py-[120px] mx-auto">
        {/* Top heading group - left-aligned to match other sections */}
        <div className="absolute left-[200px] top-[50px] w-[2160px] flex flex-col items-start gap-[14px] z-10">
          {/* Heading container */}
          <div className="w-full flex flex-row flex-wrap items-start gap-x-[17px] gap-y-0">
            <div className="font-montserrat font-semibold text-[44px] leading-[54px] text-[#1A1A1A]">
              Innovation, Engineered for You
            </div>
          </div>
          {/* Description */}
          <p className="w-full font-montserrat font-semibold text-[24px] leading-[36px] text-[#1A1A1A]">
            Every feature is engineered to connect, adapt, and elevate your listening experience. Intelligent, intuitive, and effortlessly refined for those who expect nothing less than perfection.
          </p>
        </div>

        {/* Central specs image */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20" style={{ left: `${centerX4xl}px`, top: `${centerY4xl}px` }}>
          <div className="relative w-[650px] h-[350px]">
            <Image
              src="/images/EarbudSpecs.webp"
              alt="Earbud specifications"
              fill
              className="object-contain"
              priority
              sizes="650px"
            />
          </div>
        </div>

        {/* Circular features */}
        {features.map((feature, index) => (
          <FeatureBlock
            key={`feature-4xl-${index}`}
            feature={feature}
            angle={angles[index]}
            radius={radius4xl}
            centerX={centerX4xl}
            centerY={centerY4xl}
          />
        ))}
      </div>

    </RevealSection>
  );
};

export default DetailsSection;


