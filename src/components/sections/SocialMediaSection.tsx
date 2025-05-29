'use client';

import LinkedInIcon from '@/components/icons/LinkedInIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import TikTokIcon from '@/components/icons/TikTokIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import YouTubeIcon from '@/components/icons/YouTubeIcon';
import { motion } from 'framer-motion';

interface SocialMediaSectionProps {
  className?: string;
}

const socialPlatforms = [
  { name: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://www.linkedin.com/company/arfve' },
  { name: 'Instagram', icon: <InstagramIcon />, url: 'https://www.instagram.com/arfve_legacy/' },
  { name: 'TikTok', icon: <TikTokIcon />, url: 'https://www.tiktok.com/@arfve_legacy' },
  { name: 'Facebook', icon: <FacebookIcon />, url: 'https://www.facebook.com/profile.php?id=61554925177330' },
  { name: 'YouTube', icon: <YouTubeIcon />, url: 'https://www.youtube.com/@arfve' },
];

export default function SocialMediaSection({ className = '' }: SocialMediaSectionProps) {
  return (
    <section className={`bg-black overflow-hidden ${className}`}>
      {/* Container: Clean, simple approach with proper spacing */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Content: Center aligned with clean spacing */}
        <div className="
          flex flex-col items-center text-center
          space-y-8 lg:space-y-10
          max-w-4xl mx-auto
        ">
          
          {/* Heading: Simple responsive typography */}
          <h2 className="
            text-white font-bold font-montserrat
            text-xl sm:text-2xl lg:text-3xl
            leading-tight
          ">
            Follow us on social media
          </h2>

          {/* Social Grid: Mobile-first responsive grid with geometric pattern */}
          <div className="
            grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
            gap-3 sm:gap-4 lg:gap-6
            w-full
            max-w-5xl
          ">
            {socialPlatforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  rotateX: 4,
                  rotateY: -4,
                  boxShadow: '0 8px 24px 0 rgba(0,0,0,0.3)'
                }}
                whileTap={{
                  scale: 0.98,
                  rotateX: 0,
                  rotateY: 0
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="
                  flex flex-col items-center justify-center
                  p-4 sm:p-5 lg:p-6
                  space-y-2 sm:space-y-3 lg:space-y-4
                  bg-[#1b1b1b] rounded-sm
                  text-white cursor-pointer
                  h-24 sm:h-32 lg:h-36
                  hover:bg-[#252525] transition-colors
                  border border-[#2a2a2a]/50
                "
                style={{
                  aspectRatio: '1.2/1', // Slightly rectangular like a charging case
                }}
                aria-label={`Follow us on ${platform.name}`}
              >
                <div className="flex-shrink-0">
                  {platform.icon}
                </div>
                <span className="
                  text-xs sm:text-sm lg:text-base
                  font-poppins text-center
                  leading-tight
                ">
                  {platform.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 