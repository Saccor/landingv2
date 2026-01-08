// app/sustainability/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import SignupCTASection from '@/components/sections/SignupCTASection';

export default function SustainabilityPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Sticky header - positioned above the hero section */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full h-[82px]" style={{ background: 'linear-gradient(180deg, rgba(230, 230, 230, 0.42) 0%, rgba(230, 230, 230, 0.25) 100%)', backdropFilter: 'blur(11.5px)', WebkitBackdropFilter: 'blur(11.5px)' }}>
        {/* Logo - aligned with Legacy 1 text from viewport left edge */}
        <Link href="/" aria-label="Arfve Home" className="
            absolute left-[50px] 3xl:left-[80px] 4xl:left-[120px] top-0 h-[82px]
            flex-none z-10 flex items-center justify-center
          ">
          <Image
            src="/images/logo.svg"
            alt="Arfve"
            width={131}
            height={46}
            priority
            className="w-[130px] h-[34px] object-contain"
          />
        </Link>

        {/* Navigation links - hidden on mobile, visible on tablet/desktop */}
        <nav className="hidden md:flex items-center gap-[22px] flex-none z-30 absolute right-[50px] 3xl:right-[80px] 4xl:right-[120px] top-0 h-[82px]">
          <Link href="/sustainability" className="font-montserrat font-normal text-[18px] leading-[28px] text-[#1A1A1A] transition-all duration-200 px-2 py-1 rounded cursor-pointer relative z-40">
            Sustainability
          </Link>
          <Link href="/privacy" className="font-montserrat font-normal text-[18px] leading-[28px] text-[#1A1A1A] transition-all duration-200 px-2 py-1 rounded cursor-pointer relative z-40">
            Privacy
          </Link>
        </nav>

        {/* Hamburger menu button - only visible on mobile, positioned on right */}
        <button
          onClick={toggleMenu}
          className="md:hidden absolute right-[50px] 3xl:right-[80px] 4xl:right-[120px] top-0 h-[82px] flex flex-col justify-center items-start gap-[3px] w-[20px] p-0 flex-none z-[20]"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="w-[20px] h-0 border border-black flex-none self-stretch" />
          <span className="w-[20px] h-0 border border-black flex-none self-stretch" />
          <span className="w-[20px] h-0 border border-black flex-none self-stretch" />
        </button>

        {/* Dropdown menu - only visible on mobile */}
        {isMenuOpen && (
          <div className="md:hidden absolute right-[50px] 3xl:right-[80px] 4xl:right-[120px] top-[82px] flex flex-col items-start gap-2 bg-[rgba(230,230,230,0.57)] backdrop-blur-[11.5px] rounded-[20px] px-4 py-3 min-w-[120px] z-50">
            <Link
              href="/sustainability"
              className="font-montserrat text-[14px] leading-[20px] text-[#1A1A1A] hover:bg-black/10 transition-all duration-200 px-2 py-1 rounded w-full cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Sustainability
            </Link>
            <Link
              href="/privacy"
              className="font-montserrat text-[14px] leading-[20px] text-[#1A1A1A] hover:bg-black/10 transition-all duration-200 px-2 py-1 rounded w-full cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Privacy
            </Link>
          </div>
        )}
      </div>

      {/* Plain Hero Section for Sustainability Page - Reduced height with plain white background */}
      <div className="relative w-full h-[60vh] bg-white">
        {/* Centered content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center px-4">
            {/* Title */}
            <h1 className="font-montserrat font-semibold text-[28px] leading-[34px] md:text-[42px] md:leading-[48px] lg:text-[56px] lg:leading-[62px] 3xl:text-[64px] 3xl:leading-[70px] 4xl:text-[72px] 4xl:leading-[78px] text-[#1A1A1A] mb-4 md:mb-6">
              Sustainability
            </h1>
            {/* Subtitle */}
            <p className="font-montserrat font-semibold text-[14px] leading-[18px] md:text-[18px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] 3xl:text-[24px] 3xl:leading-[30px] 4xl:text-[26px] 4xl:leading-[32px] text-[#333330] max-w-2xl mx-auto">
              Redefining technology for a circular future
            </p>
          </div>
        </div>
      </div>

      {/* Sustainability content section with white background - Reduced top padding */}
      <div className="relative z-10 bg-white">
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            background-color: white;
            font-family: 'Montserrat', sans-serif;
            color: #1a1a18;
          }
          
          .sustainability-container {
            max-width: 900px;
            margin: 0 auto;
          }
          
          .sustainability-h1 {
            text-align: center;
            margin-bottom: 60px;
            font-size: 2.5em;
            color: #1a1a18;
            font-weight: 900;
          }
          
          .paragraphs-wrapper {
            display: flex;
            flex-direction: column;
            gap: 40px; /* Reduced from 60px */
          }
          
          .sustainability-paragraph {
            width: 100%;
            line-height: 1.8;
            color: #333330;
            font-size: 1.1em;
            font-weight: 400;
            text-align: center;
            margin: 0 auto;
          }
          
          .bold-phrase {
            display: block;
            font-size: 2em;
            font-weight: 900;
            margin-top: 20px; /* Reduced from 25px */
            letter-spacing: -1px;
            line-height: 1.2;
            color: #1a1a18;
          }
          
          .modules-container {
            display: flex;
            gap: 30px;
            margin-top: 30px; /* Reduced from 40px */
            margin-bottom: 20px;
            justify-content: center;
            flex-wrap: wrap;
          }
          
          .module-box {
            flex: 1;
            min-width: 200px;
            max-width: 250px;
            padding: 25px; /* Reduced from 30px */
            border: 2px solid #1a1a18;
            background-color: white;
            text-align: center;
            transition: all 0.3s ease;
            border-radius: 16px;
          }
          
          .module-box:hover {
            background-color: #1a1a18;
            color: white;
          }
          
          .module-box:hover .module-title {
            color: white;
          }
          
          .module-box:hover .module-description {
            color: #e0e0de;
          }
          
          .module-title {
            font-size: 1.2em;
            font-weight: 700;
            margin-bottom: 8px; /* Reduced from 10px */
            color: #1a1a18;
            transition: color 0.3s ease;
            line-height: 1.2;
          }
          
          .module-description {
            font-size: 0.95em;
            line-height: 1.5; /* Reduced from 1.6 */
            color: #666660;
            transition: color 0.3s ease;
          }
          
          /* Removed the CTA button styles */
          `}
        </style>

        <div className="sustainability-container px-4 md:px-6 py-12 md:py-16"> {/* Reduced padding */}
          <div className="paragraphs-wrapper">
            <div className="sustainability-paragraph">
              <p>Arfve exists to bring together a community of people who value excellence, longevity, and purpose. Our mission is to end tech overconsumption by creating products with a transparent supply chain, designed for longevity. 
              A triple side longevity: physical, emotional, and functional. 
              In a world where more than 50 electronic devices often lie unused in every household and islands of e-waste pollute our oceans, we believe the solution isn&apos;t a dream.</p>
              <span className="bold-phrase">It&apos;s a decision. Yours.</span>
            </div>
            
            <div className="sustainability-paragraph">
              <p>Sustainability at Arfve is a core value. 
              Arfve products are the world&apos;s first three pieces modular sound products. Battery, chipset, and dynamic driver are completely replaceable. This modular architecture is centered around user&apos;s satisfaction.</p>
              
              <div className="modules-container">
                <div className="module-box">
                  <div className="module-title">Why Replaceable Battery</div>
                  <div className="module-description">Battery is the single most common point of failure in consumer electronics. Replace the battery and continue using what you love. This approach extends product life by years, not months.</div>
                </div>
                <div className="module-box">
                  <div className="module-title">Why Replaceable Chipset</div>
                  <div className="module-description">A replaceable chipset prevents entire devices from becoming obsolete as technology evolves. Upgrading the brain of the product extends its usable life and reduces electronic waste.</div>
                </div>
                <div className="module-box">
                  <div className="module-title">Why Replaceable Driver</div>
                  <div className="module-description">A replaceable audio driver allows performance restoration without discarding the whole device. This reduces material waste and supports a circular lifecycle where sound quality can be renewed.</div>
                </div>
              </div>
            </div>
            
            <div className="sustainability-paragraph">
              <p>Every component is designed to be separated, repaired, and recycled, supported by an end-of-life strategy focused on recovery rather than disposal. </p>
            </div>
            
            <div className="sustainability-paragraph">
              <p>Even our material choices reflect the same vision. Built for disassembly rather than glued shut, Arfve technology puts control back where it belongs: with the user. 
              Our products are made with up to 85% recycled materials, a carefully balanced composition that preserves structural integrity, performance, and premium quality without compromise.
              Soy-based vegetable inks are integrated directly into components and markings, reducing dependence on petroleum-based chemicals while enhancing material safety, durability, and recyclability.
              Arfve products will be heavily compounded by metal alloys which offer exceptional durability, repairability, and recyclability. Unlike plastics, they retain performance over time, withstand repeated disassembly, and can be recycled indefinitely without quality loss.
              </p>
            </div>
            
            <div className="sustainability-paragraph">
              <p>Change starts with everyday choices. At Arfve, we design technology that adapts, endures, and respects your values. Our three-piece modular earbuds challenge planned obsolescence by design. You decide when it&apos;s time to move on and not a sealed battery or a failed component. Replace only what you need, when you need it. This is modularity with purpose: a circular lifecycle where performance, responsibility, and transparency exist in harmony.</p>
              <span className="bold-phrase">Embrace now this future where design, sound quality, and sustainability thrive. Together. </span>
              
              <div className="sustainability-paragraph">
                <p>Register and be part of the change.</p>
                {/* CTA button removed - replaced by SignupCTASection below */}
              </div>
            </div>
          </div>
        </div>

        {/* Add the SignupCTASection component here */}
        <SignupCTASection />

        <Footer />
      </div>
    </>
  );
}
