'use client';

import Image from 'next/image';

const PrivacyStatement = () => {
  return (
    <section className="w-full bg-black text-white px-4 md:px-16 py-20 flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Image */}
        <div className="flex-1 flex justify-center items-center">
          <Image
            src="/podsustainability.png" // Replace with your actual image path
            alt="Privacy illustration"
            width={372}
            height={405}
            className="object-contain w-[372px] h-[405px]"
          />
        </div>

        {/* Right Text */}
        <div className="flex-1 max-w-[600px]">
          <h2 className="text-white text-lg md:text-xl font-semibold mb-4">
            Your Privacy, Our Priority
          </h2>
          <p className="text-base leading-7 font-light mb-4">
            At ARFVE, your privacy is at the heart of everything we do. Our data protection policy isn’t just a legal requirement, it’s a core part of earning your trust. When you use our app and services, we collect limited data categories such as usage behavior, device type, location, sensor data, and system interactions. Importantly, no content of your communication is ever accessed.
          </p>
          <p className="text-base leading-7 font-light">
            All information is collected only with your explicit consent and is used strictly for enhancing your experience. We never share your data outside our organization. That means no selling, renting, or disclosing to third parties. Not now, not ever.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyStatement;
