'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface InfoImageSectionProps {
  text: string;
  imageSrc?: string; // base path without extension
  imageRight?: boolean; // if false, image on left and text on right
  textVariant?: 'subtle' | 'emphasis'; // subtle = 16/24 70%, emphasis = 20/30 100%
  footerHeading?: string; // optional bold heading at the bottom left (620, 612)
  textHeight?: number; // explicit text block height in px (desktop). Defaults to 120; set 320 for long copy
}

/**
 * Desktop matches Figma absolute positions:
 * - Canvas: 1440x766
 * - Text: 617x120 at left 141 / top 271
 * - Image container: 509x625 at left 796 / top 104 (right side)
 */
const InfoImageSection: React.FC<InfoImageSectionProps> = ({
  text,
  imageSrc = '/headphones',
  imageRight = true,
  textVariant = 'subtle',
  footerHeading,
  textHeight = 120,
}) => {
  return (
    <RevealSection className="relative w-full flex justify-center bg-black overflow-hidden">
      {/* Desktop canvas */}
      <div className="hidden lg:block relative w-full max-w-[1440px] h-[766px]">
        {/* Image container */}
        <div
          className={`absolute top-[104px] w-[509px] h-[625px] bg-transparent overflow-visible ${
            imageRight ? 'left-[796px]' : 'left-[141px]'
          }`}
        >
          <div className="absolute inset-0">
            <OptimizedImage
              src={imageSrc}
              alt="Product visual"
              fill
              fallbackOnly
              className="object-contain"
              sizes="(min-width: 1024px) 509px, 100vw"
            />
          </div>
        </div>

        {/* Text block */}
        <p
          className={`absolute top-[271px] w-[617px] font-montserrat font-medium whitespace-pre-line ${
            textVariant === 'emphasis' ? 'text-[20px] leading-[30px] text-white' : 'text-[16px] leading-[24px] text-white opacity-70'
          } ${imageRight ? 'left-[141px]' : 'left-[796px]'}`}
          style={{ height: `${textHeight}px` }}
        >
          {text}
        </p>

        {footerHeading && (
          <h3 className={`absolute left-[141px] top-[612px] w-[617px] h-[38px] font-montserrat font-bold text-[20px] leading-[30px] text-[#FCFCFD]`}>
            {footerHeading}
          </h3>
        )}
      </div>

      {/* Mobile/Tablet stacked layout */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-12 flex flex-col items-center gap-6">
        {!imageRight && (
          <div className="w-[300px] md:w-[360px] aspect-[509/625] bg-transparent overflow-visible">
            <div className="relative w-full h-full">
              <OptimizedImage src={imageSrc} alt="Product visual" fill fallbackOnly className="object-contain" sizes="100vw" />
            </div>
          </div>
        )}
        <p className={`max-w-[620px] text-center font-montserrat font-medium ${
          textVariant === 'emphasis' ? 'text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] text-white' : 'text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] text-white/70'
        }`}>
          {text}
        </p>
        {footerHeading && (
          <h3 className="text-center font-montserrat font-bold text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] text-white">
            {footerHeading}
          </h3>
        )}
        {imageRight && (
          <div className="w-[300px] md:w-[360px] aspect-[509/625] bg-transparent overflow-visible">
            <div className="relative w-full h-full">
              <OptimizedImage src={imageSrc} alt="Product visual" fill fallbackOnly className="object-contain" sizes="100vw" />
            </div>
          </div>
        )}
      </div>
    </RevealSection>
  );
};

export default InfoImageSection;


