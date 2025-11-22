'use client';

import Image from 'next/image';
import Link from 'next/link';
import LinkedInIcon from './icons/LinkedInIcon';
import InstagramIcon from './icons/InstagramIcon';
import TikTokIcon from './icons/TikTokIcon';
import FacebookIcon from './icons/FacebookIcon';
import YouTubeIcon from './icons/YouTubeIcon';

const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 py-6 sm:py-8 3xl:py-10 4xl:py-12">
        <div
          className="
            flex flex-col lg:flex-row 
            items-center lg:items-center
            justify-between
            gap-6 lg:gap-0
            text-center lg:text-left
          "
        >
          {/* Left group: logo + links */}
          <div className="flex flex-col lg:flex-row items-center lg:items-center lg:space-x-8 3xl:space-x-12 4xl:space-x-16 space-y-4 lg:space-y-0">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={118}
                height={41}
                className="object-contain w-[86px] h-[30px] lg:w-[118px] lg:h-[41px] 3xl:w-[140px] 3xl:h-[49px] 4xl:w-[160px] 4xl:h-[56px]"
              />
            </Link>

            <div
              className="
                flex flex-col sm:flex-row items-center
                space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 3xl:space-x-8 4xl:space-x-10
              "
            >
              <Link
                href="/privacy-policy"
                className="
                  text-black font-montserrat text-[16px] 3xl:text-[18px] 4xl:text-[20px] leading-[26px] 3xl:leading-[28px] 4xl:leading-[30px]
                  hover:opacity-70 transition-opacity
                "
              >
                Privacy policy
              </Link>
              <Link
                href="/cookie-settings"
                className="
                  text-black font-montserrat text-[16px] 3xl:text-[18px] 4xl:text-[20px] leading-[26px] 3xl:leading-[28px] 4xl:leading-[30px]
                  hover:opacity-70 transition-opacity
                "
              >
                Cookie settings
              </Link>
              <span
                className="
                  text-black font-montserrat text-[16px] 3xl:text-[18px] 4xl:text-[20px] leading-[26px] 3xl:leading-[28px] 4xl:leading-[30px]
                "
              >
                © 2025 Arfve
              </span>
            </div>
          </div>

          {/* Right group: social icons */}
          <div
            className="
              flex flex-row items-center justify-center
              space-x-4 sm:space-x-5 lg:space-x-6 3xl:space-x-8 4xl:space-x-10
            "
          >
            <Link
              href="https://www.linkedin.com/company/arfve"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:opacity-80 transition-opacity"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </Link>
            <Link
              href="https://www.instagram.com/arfve_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </Link>
            <Link
              href="https://www.tiktok.com/@arfve_official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:opacity-80 transition-opacity"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </Link>
            <Link
              href="https://www.facebook.com/arfve.legacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="https://www.youtube.com/@arfve_official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:opacity-80 transition-opacity"
              aria-label="YouTube"
            >
              <YouTubeIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
