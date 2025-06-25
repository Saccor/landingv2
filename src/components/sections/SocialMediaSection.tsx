'use client';

import React from 'react';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import TikTokIcon from '@/components/icons/TikTokIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import YouTubeIcon from '@/components/icons/YouTubeIcon';
import { motion } from 'framer-motion';
import RevealSection from '@/components/ui/RevealSection';

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
    <RevealSection className={`bg-black text-white py-8 ${className}`}>
      <div className="w-full flex justify-center">
        <div className="w-[353px] md:w-[800px] lg:w-[1400px] px-0 py-0 flex flex-col items-center gap-6">
          <h2 className="w-full max-w-[305px] md:max-w-none lg:max-w-none text-2xl font-bold text-center md:text-[24px] md:font-bold md:leading-[32px] md:text-[#FFF]">Follow us on social media</h2>
          
          {/* Mobile layout for <md (<768px) */}
          <div className="flex md:hidden w-full justify-center">
            <div className="flex flex-nowrap justify-center gap-3 max-w-[305px]">
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

          {/* Tablet layout for md (768px-1023px) */}
          <div className="hidden md:flex lg:hidden w-full justify-center">
            <div className="flex flex-nowrap justify-center gap-4 w-[680px]">
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
                  className="w-[120px] h-[120px] bg-[#1b1b1b] rounded-sm border border-[#2a2a2a]/50 flex flex-col items-center justify-center text-white hover:bg-[#252525] transition-colors"
                  aria-label={`Follow us on ${platform.name}`}
                >
                  <div className="mb-3">{platform.icon}</div>
                  <span className="text-sm font-poppins">{platform.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Desktop layout for lg+ (1024px+) */}
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
        </div>
      </div>
    </RevealSection>
  );
}
