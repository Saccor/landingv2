'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import OptimizedImage from '@/components/ui/OptimizedImage';

const ProductShowcaseSection: React.FC = () => {
  return (
    <RevealSection className="relative w-full flex justify-center bg-white overflow-hidden">
      {/* Desktop layout - Frame 481715 */}
      <div className="hidden lg:flex w-full max-w-[1440px] px-[124px] py-[50px] flex-col items-center gap-[60px]">
        {/* Frame 481699 - Heading section */}
        <div className="w-full max-w-[1192px] flex flex-col items-start gap-[10px]">
          {/* Frame 481698 - Heading */}
          <div className="w-full h-[44px] flex flex-row flex-wrap items-start gap-x-[17px]">
            <div className="w-[222px] h-[44px] font-montserrat font-semibold text-[36px] leading-[44px] text-[#1A1A1A]">
              Heading
            </div>
          </div>
          {/* Description */}
          <p className="w-full h-[64px] font-montserrat font-normal text-[24px] leading-[32px] text-[#1A1A1A]">
            Swap sound drivers, batteries, chipsets, or covers instead of replacing the entire product. Because true innovation respects both you and the planet.
          </p>
        </div>

        {/* Frame 481755 - Main content section */}
        <div className="w-full max-w-[1192px] flex flex-col items-start gap-[30px]">
          {/* Frame 481698 - Subheading */}
          <div className="w-full h-[38px] flex flex-row flex-wrap items-start gap-x-[17px]">
            <div className="w-[361px] h-[38px] font-montserrat font-semibold text-[30px] leading-[38px] text-[#1A1A1A]">
              Heading
            </div>
          </div>

          {/* Frame 481738 - Image/content section */}
          <div className="w-full flex flex-col items-center gap-[30px]">
            {/* Frame 481713 - Large image area */}
            <div className="relative w-full h-[600px] bg-[#E3E2E2] rounded-[30px] overflow-hidden">
              {/* 3pc WhiteAnim1920x1080 images positioned absolutely */}
              <div className="absolute left-0 top-[-55px] w-full h-[670px]">
                <OptimizedImage 
                  src="/3pc WhiteAnim1920x1080.png" 
                  alt="Product showcase" 
                  fill 
                  fallbackOnly 
                  className="object-contain" 
                  sizes="1192px" 
                />
              </div>
              <div className="absolute left-0 top-[-71px] w-full h-[671px]">
                <OptimizedImage 
                  src="/3pc WhiteAnim1920x1080.png" 
                  alt="Product showcase overlay" 
                  fill 
                  fallbackOnly 
                  className="object-contain" 
                  sizes="1192px" 
                />
              </div>
            </div>

            {/* Description text */}
            <p className="w-full h-[64px] font-montserrat font-normal text-[24px] leading-[32px] text-[#1A1A1A]">
              Swap sound drivers, batteries, chipsets, or covers instead of replacing the entire product. Because true innovation respects both you and the planet.
            </p>

            {/* Frame 481737 - Two side-by-side images */}
            <div className="w-full flex flex-row items-start gap-[30px]">
              {/* Frame 481714 - Left image */}
              <div className="relative flex-1 h-[280px] bg-[#E3E2E2] rounded-[30px] overflow-hidden">
                <div className="absolute left-[49px] top-0 w-[480px] h-[288px]">
                  <OptimizedImage 
                    src="/BlackCaseOpening.png" 
                    alt="Case opening" 
                    fill 
                    fallbackOnly 
                    className="object-contain" 
                    sizes="581px" 
                  />
                </div>
              </div>

              {/* Frame 481715 - Right image */}
              <div className="relative flex-1 h-[280px] bg-[#E3E2E2] rounded-[30px] overflow-hidden">
                <div className="absolute left-[19px] top-[-57px] w-[562px] h-[337px]">
                  <OptimizedImage 
                    src="/BlackCaseAngled.png.png" 
                    alt="Case angled" 
                    fill 
                    fallbackOnly 
                    className="object-contain" 
                    sizes="581px" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Frame 481756 - Second content section */}
        <div className="w-full max-w-[1192px] flex flex-col items-start gap-[30px]">
          {/* Frame 481698 - Subheading */}
          <div className="w-full h-[38px] flex flex-row flex-wrap items-start gap-x-[17px]">
            <div className="w-[270px] h-[38px] font-montserrat font-semibold text-[30px] leading-[38px] text-[#1A1A1A]">
              Heading
            </div>
          </div>

          {/* Frame 481738 - Row layout */}
          <div className="w-full flex flex-row justify-center items-start gap-[30px]">
            {/* Frame 481713 - Square image */}
            <div className="relative w-[600px] h-[600px] bg-[#E3E2E2] rounded-[30px] overflow-hidden">
              <div className="absolute left-0 top-0 w-full h-full">
                <OptimizedImage 
                  src="/BlackCaseSquare.png" 
                  alt="Case square" 
                  fill 
                  fallbackOnly 
                  className="object-contain" 
                  sizes="600px" 
                />
              </div>
            </div>

            {/* Frame 481737 - Column with two images */}
            <div className="flex-1 flex flex-col items-start gap-[30px]">
              {/* Frame 481714 - Top image */}
              <div className="relative w-full h-[285px] bg-[#E3E2E2] rounded-[30px] overflow-hidden">
                <div className="absolute left-[49px] top-0 w-[480px] h-[288px]">
                  <OptimizedImage 
                    src="/BlackCaseOpening.png" 
                    alt="Case opening" 
                    fill 
                    fallbackOnly 
                    className="object-contain" 
                    sizes="562px" 
                  />
                </div>
              </div>

              {/* Frame 481715 - Bottom image */}
              <div className="relative w-full h-[285px] bg-[#E3E2E2] rounded-[30px] overflow-hidden">
                <div className="absolute left-0 top-[-57px] w-full h-[337px]">
                  <OptimizedImage 
                    src="/BlackCaseAngled.png.png" 
                    alt="Case angled" 
                    fill 
                    fallbackOnly 
                    className="object-contain" 
                    sizes="562px" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

export default ProductShowcaseSection;

