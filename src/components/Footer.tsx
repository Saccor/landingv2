import Image from 'next/image';
import Link from 'next/link';
import LinkedInIcon from './icons/LinkedInIcon';
import InstagramIcon from './icons/InstagramIcon';
import TikTokIcon from './icons/TikTokIcon';
import FacebookIcon from './icons/FacebookIcon';
import YouTubeIcon from './icons/YouTubeIcon';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-500 overflow-hidden">
      {/* Container: Clean, simple approach with proper spacing */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Layout: Mobile stack, desktop row */}
        <div className="
          flex flex-col lg:flex-row 
          items-center lg:justify-between
          space-y-6 lg:space-y-0
          text-center lg:text-left
        ">
          
          {/* Logo: Simple responsive sizing */}
          <Link href="https://www.linkedin.com/company/arfve" target="_blank" rel="noopener noreferrer" className="
            flex-shrink-0
            order-1 lg:order-1
          ">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={42}
              className="object-contain w-24 h-8 sm:w-28 sm:h-10 lg:w-32 lg:h-11"
            />
          </Link>

          {/* Navigation Links: Clean responsive layout */}
          <div className="
            flex flex-col sm:flex-row items-center
            space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6
            order-3 lg:order-2
          ">
            <Link 
              href="/privacy-policy" 
              className="
                text-white font-poppins
                text-sm sm:text-base
                hover:opacity-80 transition-opacity
                leading-normal
              "
            >
              Privacy policy
            </Link>
            <Link 
              href="/cookie-settings" 
              className="
                text-white font-poppins
                text-sm sm:text-base
                hover:opacity-80 transition-opacity
                leading-normal
              "
            >
              Cookie settings
            </Link>
            <span className="
              text-white font-poppins
              text-sm sm:text-base
              leading-normal
            ">
              © 2025 Arfve
            </span>
          </div>

          {/* Social Links: Clean responsive grid */}
          <div className="
            flex flex-row items-center justify-center
            space-x-4 sm:space-x-5 lg:space-x-6
            order-2 lg:order-3
          ">
            <Link 
              href="https://www.linkedin.com/company/arfve" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:opacity-80 transition-opacity"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </Link>
            <Link 
              href="https://www.instagram.com/arfve_legacy/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </Link>
            <Link 
              href="https://www.tiktok.com/@arfve_legacy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:opacity-80 transition-opacity"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </Link>
            <Link 
              href="https://www.facebook.com/profile.php?id=61554925177330" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </Link>
            <Link 
              href="https://www.youtube.com/@Arfve-ll7vt" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:opacity-80 transition-opacity"
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