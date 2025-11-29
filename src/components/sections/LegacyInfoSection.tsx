'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';

const LegacyInfoSection: React.FC = () => {
    return (
        <RevealSection className="relative w-full flex justify-center bg-gray-50 py-[49px] md:py-[65px] lg:py-[81px] 3xl:py-[97px] 4xl:py-[113px]">
            <div className="w-full max-w-[1440px] 3xl:max-w-[1920px] 4xl:max-w-[2560px] px-5 md:px-20 lg:px-[124px] 3xl:px-[160px] 4xl:px-[200px] flex flex-col items-center justify-center text-center mx-auto">
                {/* Content container */}
                <div className="flex flex-col items-center justify-center text-center max-w-[1080px] 3xl:max-w-[1440px] 4xl:max-w-[1920px]">
                    {/* Main title */}
                    <div className="font-montserrat font-semibold text-[24px] md:text-[32px] lg:text-[36px] 3xl:text-[42px] 4xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[44px] 3xl:leading-[52px] 4xl:leading-[60px] text-[#1A1A1A] mb-8">
                        World&apos;s First 3-Piece Modular AI Earbuds
                    </div>

                    {/* First description paragraph */}
                    <div className="font-montserrat font-normal text-[16px] md:text-[18px] lg:text-[20px] 3xl:text-[22px] 4xl:text-[24px] leading-[24px] md:leading-[28px] lg:leading-[30px] 3xl:leading-[34px] 4xl:leading-[38px] text-[#1A1A1A] max-w-[1080px] 3xl:max-w-[1440px] 4xl:max-w-[1920px] mb-6">
                        We create technology that moves with you. Engineered for longevity and inspired by Scandinavian minimalism, our 3-piece modular AI earbuds let you replace and upgrade the battery, chipset, and dynamic driver, keeping performance and intelligence responsive as naturally as you do.
                    </div>

                    {/* Second description paragraph */}
                    <div className="font-montserrat font-normal text-[16px] md:text-[18px] lg:text-[20px] 3xl:text-[22px] 4xl:text-[24px] leading-[24px] md:leading-[28px] lg:leading-[30px] 3xl:leading-[34px] 4xl:leading-[38px] text-[#1A1A1A] max-w-[1080px] 3xl:max-w-[1440px] 4xl:max-w-[1920px] mb-6 mt-0">
                        Arfve exists because the world doesn&apos;t need another disposable gadget. Our technology endures, adapts, and evolves directly on your device, designed to grow with you while empowering your creativity, focus, and impact. This is what we call Modular Intelligence, Human Potential.
                    </div>

                    {/* Third description paragraph */}
                    <div className="font-montserrat font-normal text-[16px] md:text-[18px] lg:text-[20px] 3xl:text-[22px] 4xl:text-[24px] leading-[24px] md:leading-[28px] lg:leading-[30px] 3xl:leading-[34px] 4xl:leading-[38px] text-[#1A1A1A] max-w-[1080px] 3xl:max-w-[1440px] 4xl:max-w-[1920px] mt-0">
                        We believe the future should be circular, intelligent, and purposeful. By choosing Arfve, you&apos;re not just picking a product; you&apos;re joining a movement that defines a new standard of innovation.
                    </div>
                </div>
            </div>
        </RevealSection>
    );
};

export default LegacyInfoSection;
