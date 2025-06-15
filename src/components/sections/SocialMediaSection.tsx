'use client';

import LinkedInIcon from '@/components/icons/LinkedInIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import TikTokIcon from '@/components/icons/TikTokIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import YouTubeIcon from '@/components/icons/YouTubeIcon';
import { motion } from 'framer-motion';
import RevealSection from '@/components/common/RevealSection';

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
    <RevealSection className={`bg-black overflow-hidden ${className}`}>
      <div className="w-full px-4 py-12 flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-white font-bold font-montserrat text-xl sm:text-2xl lg:text-3xl mb-8 text-center">
          Follow us on social media
        </h2>

        {/* Full-size layout for lg+ (≥1400px) */}
        <div className="hidden lg:flex w-full justify-center">
          <div className="flex flex-nowrap justify-center gap-6 w-[1040px]">
            {socialPlatforms.map((platform) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  rotateX: 4,
                  rotateY: -4,
                  boxShadow: '0 8px 24px 0 rgba(0,0,0,0.3)',
                }}
                whileTap={{
                  scale: 0.98,
                  rotateX: 0,
                  rotateY: 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-[160px] h-[160px] bg-[#1b1b1b] rounded-sm border border-[#2a2a2a]/50 flex flex-col items-center justify-center text-white hover:bg-[#252525] transition-colors"
                aria-label={`Follow us on ${platform.name}`}
              >
                <div className="mb-3">{platform.icon}</div>
                <span className="text-sm font-poppins">{platform.name}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Compact layout for <lg (<1400px) */}
        <div className="flex lg:hidden w-full justify-center">
          <div className="flex flex-nowrap justify-center gap-3 w-[320px]">
            {socialPlatforms.map((platform) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-[60px] h-[60px] bg-[#1b1b1b] rounded-sm border border-[#2a2a2a]/50 flex items-center justify-center text-white hover:bg-[#252525] transition-colors"
                aria-label={`Follow us on ${platform.name}`}
              >
                {platform.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
