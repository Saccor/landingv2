'use client';

import Image from 'next/image';

const PrivacyTransparency = () => {
  return (
    <section className="w-full bg-black text-white px-4 md:px-16 py-20 flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Text */}
        <div className="flex-1 max-w-[600px]">
          <h2 className="text-white text-lg md:text-xl font-semibold mb-4">
            Commitment to Transparency
          </h2>
          <p className="text-base leading-7 font-light mb-4">
            We believe that being transparent in how we use data is crucial for a successful user experience. ARFVE ensures your data is protected using advanced security protocols. Our system uses end-to-end encryption, anonymization, and strict access controls. Regular security audits and compliance with GDPR and ISO/IEC 27001 standards mean your data stays private and protected.
          </p>
          <p className="text-base leading-7 font-light">
            Transparency matters to us. You are in full control of your data at all times. From your app settings, you can manage what you share, export your data, or delete your account entirely. Consent can be withdrawn at any moment.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center items-center">
          <Image
            src="/modularitysustain.png" // replace with correct path if needed
            alt="Transparency illustration"
            width={604}
            height={317}
            className="object-contain w-[604px] h-[317px]"
          />
        </div>
      </div>
    </section>
  );
};

export default PrivacyTransparency;
