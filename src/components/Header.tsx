'use client';

import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full h-20 bg-black relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 lg:px-32 h-full flex items-center justify-between">
        {/* Left: Empty for symmetry or future nav */}
        <div className="w-1/3" />

        {/* Center: Logo */}
        <div className="flex justify-center items-center w-1/3">
          <Link href="/" className="relative w-28 h-10 flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={42}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Right: Navigation buttons */}
        <div className="w-1/3 flex justify-end items-center gap-4">
          <Link href="/survey" className="text-white text-sm font-medium hover:underline transition">
            Survey
          </Link>
          <Link href="/specs" className="text-white text-sm font-medium hover:underline transition">
            Specs
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
