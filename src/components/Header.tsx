'use client';

import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full h-20 bg-black">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 lg:px-32 h-full flex items-center justify-between relative">
        {/* Left: Empty for symmetry or future nav */}
        <div className="w-1/3" />

        {/* Center: Logo */}
        <div className="flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 pointer-events-none">
          <Link href="/" className="relative w-28 h-10 flex-shrink-0 pointer-events-auto">
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
