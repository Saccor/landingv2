'use client';

import React from 'react';
import Image from 'next/image';
import RevealSection from '@/components/ui/RevealSection';

const testimonials = [
  {
    name: 'Marco Andresen',
    title: 'Chief Operating Officer @ Lenovo',
    quote:
      "Driven by a passion for tech and circular economy, I joined Arfve's Advisory Board, inspired by their innovative vision, sustainable model, and dynamic team.",
    image: '/person1carousel.png',
  },
  {
    name: 'Jenny Kaiser',
    title: 'Former CEO @Åkestam Holst NoA',
    quote:
      "It's the rise of a modern brand meeting human needs, maintaining quality with minimal impact on nature.",
    image: '/person2carousel.png',
  },
];

const TestimonialSection: React.FC = () => {

  // For seamless infinite scroll, we need to duplicate the content
  // Each item is 200px wide + 20px gap = 220px total
  // The animation moves exactly 440px (width of 2 original items) for seamless loop
  
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
        <div className="w-full flex justify-center">
          <div className="w-[353px] lg:w-[1400px] px-0 py-0">
            <h2 className="w-full max-w-[305px] lg:max-w-none font-montserrat font-medium text-2xl leading-8 text-center text-white mx-auto mb-[42px] lg:text-3xl lg:font-normal lg:mb-6">
              Endorsed by Industry Leaders
            </h2>

            <blockquote className="w-full max-w-[305px] lg:max-w-2xl font-montserrat italic font-bold text-xl leading-[30px] text-center text-white mx-auto mb-4 lg:text-xl lg:font-semibold lg:text-[#DDDDDD] lg:leading-snug">
              &ldquo;Arfve&rsquo;s earbuds is a dream come to life,<br />
              leading the way in audio innovation.&rdquo;
            </blockquote>

            <div className="w-full max-w-[305px] lg:max-w-none font-montserrat font-medium text-sm leading-5 text-center text-[#FCFCFD] mx-auto mb-12">
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
      </div>
    </RevealSection>
  );
};

export default TestimonialSection;
