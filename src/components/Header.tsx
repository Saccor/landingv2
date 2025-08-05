'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-black relative z-50 h-[51px] md:h-[87px] lg:h-20">
      
      {/* Mobile & Tablet Header */}
      <div className="lg:hidden relative h-full flex items-center justify-center">
        {/* Centered Logo */}
        <Link href="/" className="z-10">
          <svg 
            width="77" 
            height="27" 
            viewBox="0 0 78 28" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-[77px] h-[27px] md:w-[85px] md:h-[30px]"
          >
            <text x="0" y="20" fill="white" fontSize="20" fontFamily="Arial">arfve</text>
          </svg>
        </Link>

        {/* Hamburger positioned from center */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          className="
            absolute 
            left-1/2 
            translate-x-[150px] 
            md:translate-x-[350px]
            text-white 
            z-20
          "
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black border-t border-white z-40">
          <div className="flex flex-col text-white text-sm md:text-base">
            <Link href="/survey" className="px-4 py-3 hover:underline" onClick={() => setIsMenuOpen(false)}>
              Survey
            </Link>
            <Link href="/sustainability" className="px-4 py-3 hover:underline" onClick={() => setIsMenuOpen(false)}>
              Sustainability
            </Link>
            <Link href="/privacy" className="px-4 py-3 hover:underline" onClick={() => setIsMenuOpen(false)}>
              Privacy
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden lg:flex max-w-[1440px] mx-auto px-4 lg:px-32 h-full items-center justify-between">
        <div className="w-1/3" />

        <div className="flex justify-center items-center w-1/3 h-full">
          <Link href="/" className="relative w-full h-full lg:w-28 lg:h-10 flex items-center justify-center flex-shrink-0">
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

        <div className="w-1/3 hidden lg:flex justify-end items-center gap-4">
          <Link href="/survey" className="text-white text-sm font-medium hover:underline transition">
            Survey
          </Link>
          <Link href="/sustainability" className="text-white text-sm font-medium hover:underline transition">
            Sustainability
          </Link>
          <Link href="/privacy" className="text-white text-sm font-medium hover:underline transition">
            Privacy
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
