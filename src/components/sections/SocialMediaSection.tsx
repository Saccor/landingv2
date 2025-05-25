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
    <section className={`self-stretch px-32 py-20 bg-black inline-flex flex-col justify-center items-center gap-9 overflow-hidden ${className}`}>
      <div className="flex flex-col justify-start items-start gap-3 w-full">
        <div className="self-stretch text-center justify-start text-white text-2xl font-bold font-['Montserrat'] leading-loose">
          Follow us on social media
        </div>
      </div>
      <div className="flex flex-row items-start gap-[35px] w-[1040px] h-[150px] p-0">
        {socialPlatforms.map((platform) => (
          <div
            key={platform.name}
            className="flex flex-col justify-center items-center p-5 gap-5 w-[180px] h-[150px] bg-[var(--Gray-900,#1b1b1b)] rounded-[23px] flex-none order-0 flex-grow-0 text-white"
          >
            {platform.icon}
            <div className="w-36 h-9 text-center justify-start text-white text-lg font-normal font-['Poppins'] leading-7">
              {platform.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 