'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';

const LegacyInfoSection: React.FC = () => {
    return (
        <RevealSection className="relative w-full flex justify-center bg-gray-50 py-16 md:py-20 lg:py-24">
            <div className="w-full max-w-[1440px] px-5 md:px-20 lg:px-[124px] flex flex-col items-center justify-center text-center">
                {/* Content container */}
                <div className="flex flex-col items-center justify-center text-center max-w-[1000px]">
                    {/* Main title */}
                    <div className="font-montserrat font-semibold text-[32px] md:text-[40px] lg:text-[48px] leading-[40px] md:leading-[50px] lg:leading-[60px] text-[#1A1A1A] mb-8">
                        World&apos;s First 3-Piece Modular AI Earbuds
                    </div>

                    {/* First description paragraph */}
                    <div className="font-montserrat font-normal text-[16px] md:text-[18px] lg:text-[20px] leading-[24px] md:leading-[28px] lg:leading-[30px] text-[#1A1A1A] max-w-[1000px] mb-6">
                        Arfve is redefining how technology evolves with people. Engineered for longevity and inspired by Scandinavian minimalism, our 3-piece modular system lets you swap and upgrade the battery, chipset, and dynamic driver, keeping performance and intelligence aligned with your needs.
                    </div>

                    {/* Second description paragraph */}
                    <div className="font-montserrat font-normal text-[16px] md:text-[18px] lg:text-[20px] leading-[24px] md:leading-[28px] lg:leading-[30px] text-[#1A1A1A] max-w-[1000px] mt-0">
                        Modular Intelligence, Human Potential is our vision and the foundation of everything we create. It shapes every innovation with purpose, empathy, and intention, ensuring technology adapts to you, enhances your creativity, and respects your time and the planet. Intelligent, evolving, and intentional, our products don&apos;t just keep up; they empower every moment of your life.
                    </div>
                </div>
            </div>
        </RevealSection>
    );
};

export default LegacyInfoSection;
