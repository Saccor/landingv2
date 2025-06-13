'use client';

import React from 'react';
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
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <section className="bg-black text-white py-16 flex justify-center font-montserrat">
      <div className="w-full flex justify-center">
        <div className="w-[380px] lg:w-[1400px] px-6 lg:px-16">
          {/* Heading */}
          <h2 className="text-center text-2xl lg:text-3xl font-bold mb-6">
            Endorsed by Industry Leaders
          </h2>

          {/* Center Quote */}
          <blockquote className="text-center italic text-lg lg:text-xl max-w-2xl mx-auto text-[#DDDDDD] mb-4">
            “Arfve’s earbuds is a dream come to life, leading the way in audio innovation.”
          </blockquote>
          <p className="text-center text-sm lg:text-base text-[#BBBBBB] mb-12">
            — Jean-Michel Donner, Former Global Sales Director @ Monster (Beats by Dre)
          </p>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-start gap-4 justify-center">
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="shrink-0 w-[200px] lg:w-[400px] h-[340px] lg:h-[500px] flex flex-col justify-start"
                >
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={400}
                    height={300}
                    className="w-[200px] h-[150px] lg:w-[400px] lg:h-[300px] object-cover mb-4"
                  />
                  <p className="text-sm text-[#CCCCCC] mb-2 leading-relaxed">{t.quote}</p>
                  <p className="mt-2 font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-[#AAAAAA]">{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
