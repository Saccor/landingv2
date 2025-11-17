'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import logoSvg from '../../public/images/logo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white relative z-50 h-[51px] md:h-[87px] lg:h-auto">

      {/* Mobile & Tablet Header */}
      <div className="lg:hidden relative h-full flex items-center justify-center">
        {/* Centered Logo */}
        <Link href="/" className="z-10 flex items-center">
          <Image
            src={logoSvg}
            alt="Arfve"
            className="w-[115px] h-[40px] md:w-[127px] md:h-[45px]"
            width={178}
            height={63}
          />
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
            text-[#1A1A1A] 
            z-20
          "
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-[#1A1A1A]/10 z-40">
          <div className="flex flex-col text-[#1A1A1A] text-sm md:text-base">
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

      {/* Desktop Header (Figma v6 pill layout) */}
      <div className="hidden lg:flex w-full justify-center">
        {/* Outer canvas: 1440x105 with horizontal padding 124px */}
        <div className="w-full max-w-[1440px] px-[124px] h-[105px] flex items-center justify-center">
          {/* Inner pill: 1192x91, bg #E6E6E6, radius 30, spacing px-40, gap 387 */}
          <div className="w-[1192px] h-[91px] mx-auto bg-[#E6E6E6] rounded-[30px] flex items-center justify-between px-[40px] py-[30px]" style={{ gap: 387 }}>
            {/* Logo area - scaled up */}
            <Link href="/" className="flex items-center">
              <Image
                src={logoSvg}
                alt="Arfve"
                className="w-[177px] h-[46px]"
                width={178}
                height={63}
              />
            </Link>

            {/* Nav items: Sustainability, Privacy */}
            <nav className="flex items-center" style={{ gap: 22 }}>
              <Link href="/sustainability" className="font-montserrat text-[18px] leading-[28px] text-[#1A1A1A] hover:underline">
                Sustainability
              </Link>
              <Link href="/privacy" className="font-montserrat text-[18px] leading-[28px] text-[#1A1A1A] hover:underline">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
