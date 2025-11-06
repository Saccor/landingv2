'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import RevealSection from '@/components/ui/RevealSection';
import OptimizedImage from '@/components/ui/OptimizedImage';
import InstagramIcon from '@/components/icons/InstagramIcon';

type SocialPost = {
  id: string;
  imageSrc: string;
  caption: string;
  href?: string;
  platform: 'instagram';
};

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'p1',
    imageSrc: '/socialmediademopic.png',
    caption:
      'With AI-driven and adaptive noise control, smart sound profiling, note…',
    href: 'https://www.instagram.com/arfve_legacy/',
    platform: 'instagram',
  },
  {
    id: 'p2',
    imageSrc: '/socialmediademopic.png',
    caption:
      'With AI-driven and adaptive noise control, smart sound profiling, note…',
    href: 'https://www.instagram.com/arfve_legacy/',
    platform: 'instagram',
  },
  {
    id: 'p3',
    imageSrc: '/socialmediademopic.png',
    caption:
      'With AI-driven and adaptive noise control, smart sound profiling, note…',
    href: 'https://www.instagram.com/arfve_legacy/',
    platform: 'instagram',
  },
  {
    id: 'p4',
    imageSrc: '/socialmediademopic.png',
    caption:
      'With AI-driven and adaptive noise control, smart sound profiling, note…',
    href: 'https://www.instagram.com/arfve_legacy/',
    platform: 'instagram',
  },
];

export default function SustainabilitySocialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: false,
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })],
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <RevealSection className="w-full relative bg-[white]">
      <section
        className="
          w-full flex flex-col items-center
          px-4 py-12
          md:px-6 md:py-16
          lg:px-12 lg:py-20
        "
      >
        <h2
          className="
            text-center font-montserrat font-bold text-[#101010]
            text-[22px] leading-[30px]
            md:text-[26px] md:leading-[34px]
            lg:text-[30px] lg:leading-[38px]
            mb-8 md:mb-10 lg:mb-12
          "
        >
          Follow us on social media
        </h2>

        <div className="relative w-full max-w-[1400px]">
          {/* Navigation arrows outside cards */}
          <button
            onClick={scrollPrev}
            aria-label="Previous"
            className="
              hidden lg:flex absolute -left-14 top-1/2 -translate-y-1/2
              z-10 h-10 w-10 items-center justify-center
              rounded-full bg-[#E0E0E0] hover:bg-[#D5D5D5]
            "
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={scrollNext}
            aria-label="Next"
            className="
              hidden lg:flex absolute -right-14 top-1/2 -translate-y-1/2
              z-10 h-10 w-10 items-center justify-center
              rounded-full bg-[#E0E0E0] hover:bg-[#D5D5D5]
            "
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Carousel */}
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-4 md:gap-6 lg:gap-8">
              {SOCIAL_POSTS.map((post) => (
                <a
                  key={post.id}
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block shrink-0 w-[260px] md:w-[280px] lg:w-[300px]"
                >
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="
                      bg-[#f4f4f4] rounded-2xl overflow-hidden flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                      border border-[#EAEAEA]
                    "
                  >
                    {/* Top: Instagram + caption */}
                    <div className="flex flex-col items-center px-4 pt-6 pb-3 gap-2 text-center">
                      <div className="w-[28px] h-[28px] text-[#101010]">
                        <InstagramIcon />
                      </div>
                      <p className="text-[#3A3A3A] font-montserrat text-[15px] leading-[23px]">
                        {post.caption}
                      </p>
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-[280px]">
                      <OptimizedImage
                        src={post.imageSrc}
                        alt="Social media post"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 300px, (min-width: 768px) 280px, 260px"
                        quality={80}
                      />
                    </div>
                  </motion.div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </RevealSection>
  );
}
