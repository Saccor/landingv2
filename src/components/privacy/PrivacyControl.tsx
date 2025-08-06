'use client';

import Image from 'next/image';

const PrivacyControl = () => {
  return (
    <section className="w-full bg-black text-white px-4 md:px-16 py-20 flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Image */}
        <div className="flex-1 flex justify-center items-center">
          <Image
            src="/podsustainability.png" // Replace with the actual image if needed
            alt="Control your data illustration"
            width={372}
            height={405}
            className="object-contain w-[372px] h-[405px]"
          />
        </div>

        {/* Right Text */}
        <div className="flex-1 max-w-[600px]">
          <h2 className="text-white text-lg md:text-xl font-semibold mb-4">
            Control your Data
          </h2>
          <p className="text-base leading-7 font-light mb-4">
            The data are going to be used only for internal purposes, like improving app performance, delivering personalized recommendations, and advancing our AI models (with anonymized data). We keep your information for as long as you actively use our services, and we automatically delete data from inactive accounts after 48 months.
          </p>
          <p className="text-base leading-7 font-light">
            Your personal data will never be shared externally. Every piece of information is used solely to make your ARFVE experience better. We aim to make technology better, without hampering your privacy. Technology that will be more intuitive, more tailored to your needs but always in a secure environment, where data will be always under your control.
          </p>
        </div>

      </div>
    </section>
  );
};

export default PrivacyControl;
