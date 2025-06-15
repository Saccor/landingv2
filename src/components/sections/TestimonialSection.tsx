'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

const testimonials = [
  {
    name: 'Marco Anderson',
    title: 'Chief Operating Officer @ Lentro',
    quote:
      '“Driven by a passion for tech and circular economy, I joined Arfve’s Advisory Board, inspired by their innovative vision, sustainable model, and dynamic team.”',
    image: '/person1carousel.png',
  },
  {
    name: 'Jenny Kaiser',
    title: 'CEO & Assistant Host – The North Alliance',
    quote:
      '“It’s the rite of a modern brand meeting human needs, maintaining quality with minimal impact on nature.”',
    image: '/person2carousel.png',
  },
];

export default function EndorsementSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    if (!emblaApi || testimonials.length <= 2) return;

    const interval = setInterval(() => {
      if (!emblaApi) return;
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="bg-black text-white py-16 flex justify-center font-montserrat">
      <div className="w-full flex justify-center">
        <div className="w-[380px] lg:w-[1400px] px-0 sm:px-6 lg:px-2">
          <h2 className="text-center text-2xl lg:text-3xl font-normal mb-6">
            Endorsed by Industry Leaders
          </h2>

          <blockquote className="text-center italic font-semibold text-lg lg:text-xl max-w-2xl mx-auto text-[#DDDDDD] mb-4 leading-snug">
            “Arfve’s earbuds is a dream come to life,<br />
            leading the way in audio innovation.”
          </blockquote>

          <div className="text-center text-[#BBBBBB] text-sm lg:text-base mb-12 leading-snug">
            <p>— Jean-Michel Donner,</p>
            <p>Former Global Sales Director @ Monster (Beats by Dre)</p>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex" style={{ gap: '50px', maxWidth: '100%' }}>
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="shrink-0 w-full sm:w-full lg:w-[calc(50%-25px)] h-auto flex flex-col items-center text-center"
                >
                  <div className="w-full max-w-[400px] lg:mx-auto">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={400}
                      height={300}
                      className="w-full h-[300px] object-contain mb-4"
                    />
                    <div className="px-4 lg:px-0">
                      <p className="text-sm text-[#CCCCCC] mb-2 font-semibold leading-relaxed">
                        {t.quote}
                      </p>
                      <p className="text-xs text-[#AAAAAA]">{t.name}</p>
                      <p className="text-xs text-[#AAAAAA]">{t.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
