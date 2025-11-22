'use client';

import React, { useEffect, useRef } from 'react';
import RevealSection from '@/components/ui/RevealSection';

const partnerLogos = [
  { src: '/shift.png', alt: 'Shift', height: 'h-[40px] w-auto object-contain' },
  { src: '/monster.png', alt: 'Monster', height: 'h-[28px] w-auto object-contain' },
  { src: '/codico.png', alt: 'Codico', height: 'h-[28px] w-auto object-contain' },
];

export default function OurPartners() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Only enable carousel on mobile (screen width < 768px)
    const checkMobile = () => window.innerWidth < 768;
    if (!checkMobile()) return;

    let animationId: number;
    let position = 0;
    const speed = 0.5; // Adjust speed here (pixels per frame)
    let setWidth = 0;
    let isVisible = true;

    const calculateSetWidth = () => {
      if (!carousel.firstElementChild) return;

      // Calculate width of one complete set of logos
      const logos = carousel.children;
      let totalWidth = 0;
      const computedStyle = window.getComputedStyle(carousel);
      const gap = parseFloat(computedStyle.gap) || 32;

      for (let i = 0; i < partnerLogos.length; i++) {
        const logo = logos[i] as HTMLElement;
        if (logo) {
          totalWidth += logo.offsetWidth;
          if (i < partnerLogos.length - 1) {
            totalWidth += gap;
          }
        }
      }

      setWidth = totalWidth;
    };

    const animate = () => {
      // Only animate if page is visible
      if (!isVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      if (setWidth === 0) {
        calculateSetWidth();
        if (setWidth === 0) {
          animationId = requestAnimationFrame(animate);
          return;
        }
      }

      position += speed;

      // Seamless infinite loop: when we've scrolled one full set,
      // jump back to the beginning instantly (user won't notice due to duplicated content)
      if (position >= setWidth) {
        position = 0;
      }

      carousel.style.transform = `translateX(-${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Small delay to ensure DOM is ready and elements are sized
    setTimeout(() => {
      calculateSetWidth();
      animate();
    }, 200);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Create enough duplicates for smooth infinite scroll (only for mobile)
  const duplicatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <RevealSection className="w-full relative bg-[white]">
      <section
        className="
          w-full flex flex-col items-center
          px-4 py-12
          md:px-6 md:py-16
          lg:px-12 lg:py-20
          3xl:px-16 3xl:py-24
          4xl:px-20 4xl:py-28
          max-w-[1440px] 3xl:max-w-[1920px] 4xl:max-w-[2560px] mx-auto
        "
      >
        {/* Header */}
        <header
          className="
            w-full text-center
            flex flex-col gap-2
          "
        >
          <h2
            className="
              font-montserrat font-bold text-[#101010]
              text-[22px] leading-[30px]
              md:text-[26px] md:leading-[34px]
              lg:text-[30px] lg:leading-[38px]
              3xl:text-[36px] 3xl:leading-[44px]
              4xl:text-[42px] 4xl:leading-[52px]
            "
          >
            Our partners
          </h2>
        </header>

        {/* Mobile Carousel */}
        <div className="w-full overflow-hidden mt-8 md:hidden">
          <div
            ref={carouselRef}
            className="flex items-center gap-8 transition-none"
            style={{ width: 'fit-content' }}
          >
            {duplicatedLogos.map((logo, index) => (
              <img
                key={`${logo.alt}-${index}`}
                src={logo.src}
                alt={logo.alt}
                className={`${logo.height} flex-shrink-0`}
              />
            ))}
          </div>
        </div>

        {/* Tablet & Desktop Static Layout */}
        <div
          className="
            hidden md:flex w-full max-w-[1120px] 3xl:max-w-[1500px] 4xl:max-w-[2000px] flex-wrap items-center justify-center
            gap-12 mt-10
            lg:gap-20 lg:mt-12
            3xl:gap-28 3xl:mt-14
            4xl:gap-36 4xl:mt-16
          "
        >
          {/* Partner 1 */}
          <img
            src="/shift.png"
            alt="Shift"
            className="
              h-[50px] w-auto object-contain
              lg:h-[60px]
              3xl:h-[72px]
              4xl:h-[84px]
            "
          />

          {/* Partner 2 */}
          <img
            src="/monster.png"
            alt="Monster"
            className="
              h-[36px] w-auto object-contain
              lg:h-[44px]
              3xl:h-[54px]
              4xl:h-[64px]
            "
          />

          {/* Partner 3 */}
          <img
            src="/codico.png"
            alt="Codico"
            className="
              h-[36px] w-auto object-contain
              lg:h-[44px]
              3xl:h-[54px]
              4xl:h-[64px]
            "
          />
        </div>
      </section>
    </RevealSection>
  );
}
