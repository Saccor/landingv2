'use client';

import LinkedInIcon from '@/components/icons/LinkedInIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import TikTokIcon from '@/components/icons/TikTokIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import YouTubeIcon from '@/components/icons/YouTubeIcon';

interface SocialMediaSectionProps {
  className?: string;
}

const socialPlatforms = [
  { name: 'LinkedIn', icon: <LinkedInIcon /> },
  { name: 'Instagram', icon: <InstagramIcon /> },
  { name: 'Tiktok', icon: <TikTokIcon /> },
  { name: 'Facebook', icon: <FacebookIcon /> },
  { name: 'Youtube', icon: <YouTubeIcon /> },
];

export default function SocialMediaSection({ className = '' }: SocialMediaSectionProps) {
  return (
    <section className={`w-full px-4 sm:px-8 md:px-16 lg:px-32 py-12 sm:py-20 bg-black flex flex-col justify-center items-center gap-9 overflow-hidden ${className}`}>
      <div className="flex flex-col justify-start items-start gap-3 w-full">
        <div className="self-stretch text-center justify-start text-white text-2xl font-bold font-['Montserrat'] leading-loose">
          Follow us on social media
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-start gap-4 sm:gap-[35px] w-full max-w-[1040px] p-0">
        {socialPlatforms.map((platform) => (
          <div
            key={platform.name}
            className="flex flex-col justify-center items-center p-4 sm:p-5 gap-3 sm:gap-5 w-[120px] sm:w-[180px] h-[100px] sm:h-[150px] bg-[var(--Gray-900,#1b1b1b)] rounded-[23px] flex-none text-white"
          >
            {platform.icon}
            <div className="w-24 sm:w-36 h-7 sm:h-9 text-center justify-start text-white text-base sm:text-lg font-normal font-['Poppins'] leading-7">
              {platform.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 