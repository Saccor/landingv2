import Image from 'next/image';
import Link from 'next/link';
import LinkedInIcon from './icons/LinkedInIcon';
import InstagramIcon from './icons/InstagramIcon';
import TikTokIcon from './icons/TikTokIcon';
import FacebookIcon from './icons/FacebookIcon';
import YouTubeIcon from './icons/YouTubeIcon';

const Footer = () => {
  return (
    <footer className="w-full h-28 bg-black border-t border-gray-500">
      <div className="max-w-[1440px] mx-auto px-32 pt-8 pb-6">
        <div className="max-w-[1192px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative w-28 h-10">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={42}
              className="object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-3">
            <Link 
              href="/privacy-policy" 
              className="text-brand-mist text-base font-normal font-['Poppins'] leading-normal hover:opacity-80 transition-opacity"
            >
              Privacy policy
            </Link>
            <Link 
              href="/cookie-settings" 
              className="text-brand-mist text-base font-normal font-['Poppins'] leading-normal hover:opacity-80 transition-opacity"
            >
              Cookie settings
            </Link>
            <span className="text-brand-mist text-base font-normal font-['Poppins'] leading-normal">
              © 2025 Arfve
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-mist hover:opacity-80 transition-opacity"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </Link>
            <Link 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-mist hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </Link>
            <Link 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-mist hover:opacity-80 transition-opacity"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </Link>
            <Link 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-mist hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </Link>
            <Link 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-mist hover:opacity-80 transition-opacity"
              aria-label="YouTube"
            >
              <YouTubeIcon />
            </Link>
            <Link href="#" className="w-7 h-5 bg-brand-mist hover:opacity-80 transition-opacity" aria-label="Social Media 5" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 