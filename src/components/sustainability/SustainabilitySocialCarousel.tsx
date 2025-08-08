'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import RevealSection from '@/components/ui/RevealSection';
import OptimizedImage from '@/components/ui/OptimizedImage';
import InstagramIcon from '@/components/icons/InstagramIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import TikTokIcon from '@/components/icons/TikTokIcon';
import YouTubeIcon from '@/components/icons/YouTubeIcon';
import LinkedInIcon from '@/components/icons/LinkedInIcon';

type SocialPost = {
  id: string;
  imageSrc: string; // Base path without extension (OptimizedImage expects base path)
  caption: string;
  href?: string;
  platform: 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'linkedin';
};

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'p1',
    imageSrc: '/heroimg',
    caption:
      'With AI-driven and adaptive noise control, smart sound profiling, next‑gen comfort.',
    href: 'https://www.facebook.com/arfve.legacy/',
    platform: 'facebook',
  },
  {
    id: 'p2',
    imageSrc: '/heroimg',
    caption:
      'Modular by design for longevity. Repair, upgrade, and customize over time.',
    href: 'https://www.instagram.com/arfve_legacy/',
    platform: 'instagram',
  },
  {
    id: 'p3',
    imageSrc: '/heroimg',
    caption:
      'Engineered for sustainable sound. Materials chosen with purpose.',
    href: 'https://www.tiktok.com/@arfve_legacy',
    platform: 'tiktok',
  },
  {
    id: 'p4',
    imageSrc: '/heroimg',
    caption:
      'Join our community shaping the future of sustainable sound.',
    href: 'https://www.youtube.com/@arfve',
    platform: 'youtube',
  },
  {
    id: 'p5',
    imageSrc: '/heroimg',
    caption:
      'Updates from the team. Follow us professionally on LinkedIn.',
    href: 'https://www.linkedin.com/company/arfve',
    platform: 'linkedin',
  },
];

interface SustainabilitySocialCarouselProps {
  className?: string;
}

export default function SustainabilitySocialCarousel({
  className = '',
}: SustainabilitySocialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: false,
      skipSnaps: false,
      slidesToScroll: 1,
    },
    [
      Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
    ],
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <RevealSection className={`bg-black text-white ${className}`}>
      <div className="w-full flex justify-center">
        <div className="w-[353px] md:w-[800px] lg:w-[1400px] px-0 py-6 md:py-8 lg:py-10">
          <h2 className="text-center text-xl md:text-2xl font-bold mb-4 md:mb-6">
            Follow us on social media
          </h2>

          {/* Carousel Container */}
          <div className="relative">
            {/* Buttons */}
            <button
              aria-label="Previous"
              onClick={scrollPrev}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-[#1b1b1b]/80 border border-[#2a2a2a] hover:bg-[#232323]"
            >
              <span className="sr-only">Previous</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              aria-label="Next"
              onClick={scrollNext}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-[#1b1b1b]/80 border border-[#2a2a2a] hover:bg-[#232323]"
            >
              <span className="sr-only">Next</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Embla viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-3 md:gap-4 lg:gap-5">
                {SOCIAL_POSTS.map((post) => (
                  <a
                    key={post.id}
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block shrink-0 w-[290px] md:w-[290px] lg:w-[290px]"
                    aria-label="View post"
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="h-[457px] bg-[#1A1A1A] border border-[#4A4A4A] shadow-[0_0_4px_2px_#1B1B1B] rounded-[10px] overflow-hidden flex flex-col"
                    >
                      <div className="relative w-full h-[290px] bg-black">
                        <OptimizedImage
                          src={post.imageSrc}
                          alt="Social post"
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 290px, (min-width: 768px) 290px, 290px"
                          quality={80}
                        />
                      </div>
                      <div className="px-3 py-6 flex flex-col items-center gap-[5px] text-[#F5F5F5]">
                        <div className="w-[30px] h-[30px] text-[#F5F5F5]">
                          {post.platform === 'facebook' && <FacebookIcon />}
                          {post.platform === 'instagram' && <InstagramIcon />}
                          {post.platform === 'tiktok' && <TikTokIcon />}
                          {post.platform === 'youtube' && <YouTubeIcon />}
                          {post.platform === 'linkedin' && <LinkedInIcon />}
                        </div>
                        <p className="w-[266px] h-[84px] text-white font-montserrat text-[18px] leading-[28px] text-center">
                          {post.caption}
                        </p>
                      </div>
                    </motion.div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

