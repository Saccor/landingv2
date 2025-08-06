'use client';

import Image from 'next/image';

const SustainabilityModularity = () => {
  return (
    <section className="w-full bg-black text-white px-4 md:px-16 py-20 flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Text Block */}
        <div className="flex-1 max-w-[600px]">
          <h2 className="text-white text-lg md:text-xl font-semibold mb-4">
            Three-pieces modularity
          </h2>
          <p className="text-base leading-7 font-light mb-4">
            Change starts with everyday choices. At Arfve, we design technology that adapts, endures, and respects your values.
            Our 3-pieces modular earbuds are the revolution. You deserve to decide when it’s time to move on from a product,
            not the companies that built it to fail. Modularity isn’t a compromise. Replace just what you need, when you need.
          </p>
          <p className="text-base leading-7 font-light">
            A circular life cycle where everything is in harmony.
          </p>
        </div>

        {/* Right Image Block */}
        <div className="flex-1 flex justify-center items-center">
          <Image
            src="/modularitysustain.png" // ← replace with your actual filename
            alt="Modular earbuds"
            width={604}
            height={317}
            className="object-contain w-[604px] h-[317px]"
          />
        </div>
      </div>
    </section>
  );
};

export default SustainabilityModularity;
