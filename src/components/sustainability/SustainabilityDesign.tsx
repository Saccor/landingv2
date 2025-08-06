'use client';

import Image from 'next/image';
import SignupForm from '@/components/ui/SignupForm';

const SustainabilityDesign = () => {
  return (
    <section className="w-full bg-black text-white px-4 md:px-16 py-12 flex flex-col items-center gap-12">
      {/* Image Row */}
      <div className="w-full max-w-[1440px] flex flex-wrap justify-center">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-[233.33px] h-[155.57px]">
            <Image
              src="/sustainrepeatimg.png" // ⬅️ Replace with your actual file name
              alt={`Sustainability image ${i + 1}`}
              width={233.33}
              height={155.57}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Text and Signup */}
      <div className="w-full max-w-[1440px] flex flex-col gap-10 md:flex-row md:gap-20">
        {/* Left Text */}
        <div className="flex-1 text-base leading-7 font-light max-w-[600px]">
          <p>
            Sustainability for Arfve is not just a corollary. Sustainability is a core value.
            Our modular solution aims to triple the lifespan of the product without compromising
            excellence and immaculate sound. Devices created to last longer, using upstanding
            materials and replaceable components. Repairing instead of buying a new device.
          </p>
        </div>

        {/* Right Text + Form */}
        <div className="flex-1 max-w-[480px]">
          <p className="mb-4 text-base leading-7 font-light">
            Embrace now this future where design, sound quality and sustainability thrive. Together.
          </p>
          <SignupForm buttonText="Signup" />
        </div>
      </div>
    </section>
  );
};

export default SustainabilityDesign;
