'use client';

import React from 'react';
import Link from 'next/link';
import RevealSection from '@/components/ui/RevealSection';
import InstagramIcon from '@/components/icons/InstagramIcon';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import TikTokIcon from '@/components/icons/TikTokIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import YouTubeIcon from '@/components/icons/YouTubeIcon';

type SocialPlatform = {
  name: string;
  icon: React.ReactNode;
  url: string;
  brandColor: string;
  hoverBgColor: string;
};

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    name: 'LinkedIn',
    icon: <LinkedInIcon />,
    url: 'https://www.linkedin.com/company/arfve',
    brandColor: '#0077B5',
    hoverBgColor: 'hover:bg-[#0077B5]/5'
  },
  {
    name: 'Instagram',
    icon: <InstagramIcon />,
    url: 'https://www.instagram.com/arfve_official/',
    brandColor: '#E4405F',
    hoverBgColor: 'hover:bg-[#E4405F]/5'
  },
  {
    name: 'TikTok',
    icon: <TikTokIcon />,
    url: 'https://www.tiktok.com/@arfve_official',
    brandColor: '#000000',
    hoverBgColor: 'hover:bg-[#000000]/5'
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon />,
    url: 'https://www.facebook.com/arfve.legacy/',
    brandColor: '#1877F2',
    hoverBgColor: 'hover:bg-[#1877F2]/5'
  },
  {
    name: 'YouTube',
    icon: <YouTubeIcon />,
    url: 'https://www.youtube.com/@arfve_official',
    brandColor: '#FF0000',
    hoverBgColor: 'hover:bg-[#FF0000]/5'
  }
];

export default function SustainabilitySocialCarousel() {
  return (
    <RevealSection className="w-full relative bg-[white]">
      <section
        className="
          w-full flex flex-col items-center
          px-4 py-12
          md:px-6 md:py-16
          lg:px-12 lg:py-20
          3xl:px-16 3xl:py-24
          4xl:px-20 4xl:py-28
          max-w-[1440px] 3xl:max-w-[1920px] 4xl:max-w-[2560px] mx-auto
        "
      >
        <h2
          className="
            text-center font-montserrat font-bold text-[#101010]
            text-[22px] leading-[30px]
            md:text-[26px] md:leading-[34px]
            lg:text-[30px] lg:leading-[38px]
            3xl:text-[36px] 3xl:leading-[44px]
            4xl:text-[42px] 4xl:leading-[52px]
            mb-8 md:mb-10 lg:mb-12 3xl:mb-14 4xl:mb-16
          "
        >
          Follow us on social media
        </h2>

        <div className="w-full max-w-[1000px] 3xl:max-w-[1400px] 4xl:max-w-[1800px]">
          <div className="
            grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5
            gap-6 md:gap-8 lg:gap-10 3xl:gap-14 4xl:gap-16
            place-items-center
          ">
            {SOCIAL_PLATFORMS.map((platform) => (
              <Link
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex flex-col items-center gap-4
                  p-6 3xl:p-8 4xl:p-10 rounded-2xl
                  bg-[#f4f4f4] hover:bg-[#f0f0f0]
                  border border-[#EAEAEA]
                  shadow-[0_2px_12px_rgba(0,0,0,0.05)]
                  hover:shadow-[0_3px_15px_rgba(0,0,0,0.08)]
                  transition-all duration-200 ease-out
                  hover:scale-[1.02]
                  min-h-[140px] md:min-h-[160px] lg:min-h-[180px] 3xl:min-h-[220px] 4xl:min-h-[260px]
                  w-full max-w-[160px] md:max-w-[180px] lg:max-w-[200px] 3xl:max-w-[260px] 4xl:max-w-[320px]
                "
              >
                <div
                  className="
                    w-[56px] h-[56px] md:w-[64px] md:h-[64px] lg:w-[72px] lg:h-[72px]
                    3xl:w-[84px] 3xl:h-[84px] 4xl:w-[96px] 4xl:h-[96px]
                    flex items-center justify-center
                  "
                  style={{
                    color: platform.brandColor
                  }}
                >
                  {platform.icon}
                </div>

                <div className="text-center">
                  <div className="
                    font-montserrat font-semibold text-[#101010]
                    text-[14px] md:text-[16px] lg:text-[18px]
                    3xl:text-[20px] 4xl:text-[22px]
                    leading-[20px] md:leading-[24px] lg:leading-[26px]
                    3xl:leading-[28px] 4xl:leading-[30px]
                    mb-1
                  ">
                    {platform.name}
                  </div>
                  <div className="
                    font-montserrat text-[#666666]
                    text-[12px] md:text-[13px] lg:text-[14px]
                    leading-[18px] md:leading-[20px] lg:leading-[20px]
                  ">
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </RevealSection>
  );
}
