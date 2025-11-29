'use client';

import React, { useEffect, useRef, useState } from 'react';
import RevealSection from '@/components/ui/RevealSection';

// Carousel item components with case images
const CarouselItem1 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 lg:gap-6 flex-shrink-0 w-[1120px] 3xl:w-[1500px] 4xl:w-[2000px]">
        <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
            <div
                className="mx-3 mt-1 mb-1 rounded-[12px] overflow-hidden h-[220px] md:h-[250px] lg:h-[300px] 3xl:h-[380px] 4xl:h-[480px] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/WhiteOpen.webp')" }}
                aria-label="Open case white preview"
                role="img"
            />
        </article>
        <div className="flex flex-col gap-4 lg:gap-6">
            <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
                <div
                    className="mx-3 mt-1 mb-1 rounded-[12px] overflow-hidden h-[220px] md:h-[250px] lg:h-[145px] 3xl:h-[182px] 4xl:h-[232px] bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/WhiteCaseOption2.webp')" }}
                    aria-label="Black case option 2 preview"
                    role="img"
                />
            </article>
            <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
                <div
                    className="mx-3 mt-1 mb-1 rounded-[12px] overflow-hidden h-[220px] md:h-[250px] lg:h-[145px] 3xl:h-[182px] 4xl:h-[232px] bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/WhiteAngled.webp')" }}
                    aria-label="White case angled preview"
                    role="img"
                />
            </article>
        </div>
    </div>
);

const CarouselItem2 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 lg:gap-6 flex-shrink-0 w-[1120px] 3xl:w-[1500px] 4xl:w-[2000px]">
        <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
            <div
                className="mx-3 mt-1 mb-1 rounded-[12px] overflow-hidden h-[220px] md:h-[250px] lg:h-[300px] 3xl:h-[380px] 4xl:h-[480px] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/BlackOpen.webp')" }}
                aria-label="White case option 2 preview"
                role="img"
            />
        </article>
        <div className="flex flex-col gap-4 lg:gap-6">
            <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
                <div
                    className="mx-3 mt-1 mb-1 rounded-[12px] overflow-hidden h-[220px] md:h-[250px] lg:h-[145px] 3xl:h-[182px] 4xl:h-[232px] bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/BlackAngled.webp')" }}
                    aria-label="Black case angled preview"
                    role="img"
                />
            </article>
            <article className="rounded-2xl bg-[#f4f4f4] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
                <div
                    className="mx-3 mt-1 mb-1 rounded-[12px] overflow-hidden h-[220px] md:h-[250px] lg:h-[145px] 3xl:h-[182px] 4xl:h-[232px] bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/BlackCaseOption2.webp')" }}
                    aria-label="Black case option 1 preview"
                    role="img"
                />
            </article>
        </div>
    </div>
);

export default function AdditionalFeaturesSection() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [items] = useState([CarouselItem1, CarouselItem2]);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        let animationId: number;
        let position = 0;
        const speed = 0.8; // Adjust speed here (pixels per frame)
        let isVisible = true;

        const animate = () => {
            // Only animate if page is visible
            if (!isVisible) {
                animationId = requestAnimationFrame(animate);
                return;
            }

            position += speed;

            // Dynamic item width calculation based on screen size
            const getItemWidth = () => {
                if (window.innerWidth >= 2560) return 2000; // 4xl
                if (window.innerWidth >= 1920) return 1500; // 3xl
                return 1120; // lg and below
            };

            const itemWidth = getItemWidth();
            const gap = 32;
            const totalItemWidth = itemWidth + gap;

            // Reset position when we've scrolled through enough items for smooth loop
            // We use items.length * 2 to create a buffer before resetting
            if (position >= totalItemWidth * items.length * 2) {
                position = 0;
                carousel.style.transform = `translateX(0px)`;
            } else {
                carousel.style.transform = `translateX(-${position}px)`;
            }

            animationId = requestAnimationFrame(animate);
        };

        // Handle page visibility changes
        const handleVisibilityChange = () => {
            isVisible = !document.hidden;
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Small delay to ensure DOM is ready
        setTimeout(() => {
            animate();
        }, 100);

        // Pause on hover - commented out for now
        // const handleMouseEnter = () => {
        //     cancelAnimationFrame(animationId);
        // };

        // const handleMouseLeave = () => {
        //     animate();
        // };

        // carousel.addEventListener('mouseenter', handleMouseEnter);
        // carousel.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            // carousel.removeEventListener('mouseenter', handleMouseEnter);
            // carousel.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [items]);

    // Create enough duplicates for smooth infinite scroll
    const duplicatedItems = [...items, ...items, ...items, ...items];

    return (
        <RevealSection className="w-full relative bg-gray-50">
            <section
                className="
          w-full flex flex-col items-center
          px-4 py-10
          md:px-6 md:py-14
          lg:px-12 lg:py-16
          3xl:px-16 3xl:py-20
          4xl:px-20 4xl:py-24
          max-w-[1440px] 3xl:max-w-[1920px] 4xl:max-w-[2560px] mx-auto
        "
            >
                {/* Header */}
                <header
                    className="
                    w-full max-w-[1120px] 3xl:max-w-[1500px] 4xl:max-w-[2000px] flex flex-col gap-1 text-left
                  "
                >
                    <h2
                        className="
                      font-montserrat font-bold text-[#101010]
                      text-[26px] leading-[34px]
                      md:text-[30px]
                      lg:text-[36px]
                      3xl:text-[42px] 3xl:leading-[52px]
                      4xl:text-[48px] 4xl:leading-[60px]
                    "
                    >
                        Product overview
                    </h2>
                </header>

                {/* Carousel Container */}
                <div className="w-full overflow-hidden mt-12 md:mt-14 lg:mt-16 3xl:mt-[72px] 4xl:mt-20">
                    <div
                        ref={carouselRef}
                        className="flex gap-8 3xl:gap-10 4xl:gap-12 transition-none"
                        style={{ width: 'fit-content' }}
                    >
                        {duplicatedItems.map((ItemComponent, index) => (
                            <ItemComponent key={index} />
                        ))}
                    </div>
                </div>

            </section>
        </RevealSection>
    );
}