'use client';

import React from 'react';
import Image from 'next/image';
import RevealSection from '@/components/common/RevealSection';

const testimonials = [
  {
    name: 'Marco Anderson',
    title: 'Chief Operating Officer @ Lentro',
    quote:
      "Driven by a passion for tech and circular economy, I joined Arfve's Advisory Board, inspired by their innovative vision, sustainable model, and dynamic team.",
    image: '/person1carousel.png',
  },
  {
    name: 'Jenny Kaiser',
    title: 'CEO & Assistant Host – The North Alliance',
    quote:
      "It's the rite of a modern brand meeting human needs, maintaining quality with minimal impact on nature.",
    image: '/person2carousel.png',
  },
];

export default function TestimonialSection() {
  // For seamless infinite scroll, we need to duplicate the content
  // Each item is 200px wide + 20px gap = 220px total
  // We'll create enough duplicates so the animation moves exactly the width of the original set
  const itemWidth = 220; // 200px + 20px gap
  const originalSetWidth = testimonials.length * itemWidth; // 2 * 220 = 440px
  
  // Duplicate enough times to create a long strip
  // The animation will move exactly the width of one complete set (440px)
  // This ensures when it loops, it's showing the exact same content
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials]; // 12 items total

  return (
    <RevealSection className="bg-black text-white pt-[25px] pb-16 flex justify-center font-montserrat">
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-440px); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
      
      <div className="w-full flex justify-center">
        <div className="w-[380px] lg:w-[1400px] px-0 sm:px-6 lg:px-2">
          <h2 className="w-[329px] h-16 font-montserrat font-medium text-2xl leading-8 text-center text-white flex-none order-0 self-stretch grow-0 mx-auto mb-[42px] lg:w-auto lg:h-auto lg:text-3xl lg:font-normal lg:mb-6">
            Endorsed by Industry Leaders
          </h2>

          <blockquote className="w-[329px] h-[120px] font-montserrat italic font-bold text-xl leading-[30px] text-center text-white flex-none order-0 self-stretch grow-0 mx-auto mb-4 lg:max-w-2xl lg:text-xl lg:font-semibold lg:text-[#DDDDDD] lg:w-auto lg:h-auto lg:leading-snug">
            &ldquo;Arfve&rsquo;s earbuds is a dream come to life,<br />
            leading the way in audio innovation.&rdquo;
          </blockquote>

          <div className="w-[329px] h-[60px] font-montserrat font-medium text-sm leading-5 text-center text-[#FCFCFD] flex-none order-1 self-stretch grow-0 mx-auto mb-12">
            Jean-Michel Donner<br />
            former Global Sales Director @ Monster (Beats by Dre)
          </div>

          {/* Mobile: CSS Animation with Perfect Seamless Infinite Scroll */}
          <div className="overflow-hidden lg:hidden">
            <div className="flex gap-5 animate-scroll">
              {duplicatedTestimonials.map((t, index) => (
                <div key={index} className="shrink-0 w-[200px] flex flex-col items-center p-0 gap-3">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={200}
                    height={150}
                    className="w-[200px] h-[150px] object-contain"
                  />
                  <div className="w-[200px] flex flex-col items-start p-0 gap-3">
                    <p className="w-[200px] font-montserrat font-bold text-sm leading-5 text-[#FCFCFD]">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="w-[200px] font-montserrat font-normal text-sm leading-5 text-[#FCFCFD]">
                      <p>{t.name}</p>
                      <p>{t.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Static Display */}
          <div className="hidden lg:block">
            <div className="flex gap-5 lg:justify-center">
              {testimonials.map((t, index) => (
                <div key={index} className="shrink-0 lg:w-[400px] lg:h-[482px] flex flex-col items-center text-center">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={400}
                    height={300}
                    className="w-full h-[300px] object-contain mb-4"
                  />
                  <div className="px-4 lg:px-0">
                    <p className="text-sm text-[#CCCCCC] mb-2 font-semibold leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="text-xs text-[#AAAAAA]">{t.name}</p>
                    <p className="text-xs text-[#AAAAAA]">{t.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
