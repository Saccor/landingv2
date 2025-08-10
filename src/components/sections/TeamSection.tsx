'use client';

import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

type TeamCard = {
  name: string;
  role: string;
  quote: string;
  imageSrc: string; // base path without extension
};

const team: TeamCard[] = [
  {
    name: 'Leah',
    role: 'Lorem lorem',
    quote: 'It was popularised in the 1960s with the release of Letraset.',
    imageSrc: '/person1carousel',
  },
  {
    name: 'Leo',
    role: 'ML Intern',
    quote: 'Working on the AI engine made me believe in tech again.',
    imageSrc: '/person2carousel',
  },
  {
    name: 'Hanna',
    role: 'UX Intern',
    quote: 'I helped design the modular shell.',
    imageSrc: '/person1carousel',
  },
  {
    name: 'Sam',
    role: 'Acoustics Lab',
    quote: "I prototyped my own driver config. That's the future.",
    imageSrc: '/person2carousel',
  },
  {
    name: 'Gustav',
    role: 'Industrial designer',
    quote: 'It was popularised in the 1960s with the release of Letraset.',
    imageSrc: '/person1carousel',
  },
];

function SmallCard({ member }: { member: TeamCard }) {
  return (
    <motion.div
      className="w-[271px] h-[554px] opacity-50 hover:opacity-100 flex flex-col cursor-pointer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="w-[270.45px] h-[481px] rounded-[10px] overflow-hidden shrink-0">
        <div className="relative w-full h-full">
          <OptimizedImage src={member.imageSrc} alt={member.name} fill fallbackOnly className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
        </div>
      </div>
      <div className="mt-3 w-[255px] ml-2 pr-2 flex flex-col items-start gap-[5px] h-[93px]">
        <div className="flex items-center gap-2 h-[32px] flex-wrap">
          <div className="text-white font-montserrat font-semibold text-[24px] leading-[32px]">{member.name}</div>
          <span className="text-white/80 font-montserrat text-[14px] leading-[20px]">-</span>
          <div className="text-white font-montserrat text-[14px] leading-[20px] font-medium">{member.role}</div>
        </div>
        <p className="text-white font-montserrat text-[16px] leading-[24px] max-w-[255px] pr-1">
          “{member.quote}”
        </p>
      </div>
    </motion.div>
  );
}

function CenterCard({ member }: { member: TeamCard }) {
  return (
    <motion.div
      className="w-[271px] h-[554px] opacity-50 hover:opacity-100 flex flex-col cursor-pointer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="w-[270.45px] h-[481px] rounded-[10px] overflow-hidden shrink-0">
        <div className="relative w-full h-full">
          <OptimizedImage src={member.imageSrc} alt={member.name} fill fallbackOnly className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
        </div>
      </div>
      <div className="mt-3 ml-2 pr-2 w-[255px] flex flex-col items-start gap-[5px] h-[93px]">
        <div className="flex items-center gap-2 h-[32px] flex-wrap">
          <div className="text-white font-montserrat font-semibold text-[24px] leading-[32px]">{member.name}</div>
          <span className="text-white/80 font-montserrat text-[14px] leading-[20px]">-</span>
          <div className="text-white font-montserrat text-[14px] leading-[20px]">{member.role}</div>
        </div>
        <p className="text-white font-montserrat text-[16px] leading-[24px] max-w-[255px] pr-1">“{member.quote}”</p>
      </div>
    </motion.div>
  );
}

const TeamSection: React.FC = () => {
  return (
    <RevealSection className="relative w-full flex justify-center bg-[#020202] overflow-hidden">
      {/* Desktop exact layout */}
      <div className="hidden lg:block relative w-full max-w-[1440px] h-[945px]">
        {/* Text container */}
        <div className="absolute left-[87px] top-[51px] w-[1031px] h-[156px] flex flex-col gap-[12px]">
          <div className="flex flex-row items-start gap-[12px] w-[677px] h-[60px]">
            <div className="w-[235px] h-[60px] font-montserrat font-semibold text-[48px] leading-[60px] tracking-[-0.02em]" style={{
              background: 'linear-gradient(90deg, #FCFCFD 0%, #969797 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0px 0px 37.4px rgba(255,255,255,0.75)'
            }}>
              The Team
            </div>
            <div className="w-[430px] h-[60px] text-[#FCFCFD] font-montserrat font-semibold text-[48px] leading-[60px] tracking-[-0.02em]">
              Behind Arfve
            </div>
          </div>
          <p className="w-[1031px] h-[84px] text-white font-montserrat text-[18px] leading-[28px]">
            Arfve didn’t start with a product roadmap it started with believers. Believers in something better. Something more intelligent. A global collaboration of 55+ interns, engineers, and designers shaping a new era of sustainable tech through the Arfve Tech Lab.
          </p>
        </div>

        {/* CTA Button */}
        <div className="absolute left-[1172px] top-[67px] w-[197px] h-[44px]">
          <Button variant="primary" size="md" className="w-[197px] h-[44px] rounded-[55px] font-montserrat text-[13px] leading-[18px] whitespace-nowrap overflow-hidden">Join The Movement</Button>
        </div>

        {/* Cards row */}
        <div className="absolute left-[-51px] top-[310px] w-[1542px] h-[554px] flex flex-row items-end gap-[40px]">
          <SmallCard member={team[0]} />
          <SmallCard member={team[1]} />
          <CenterCard member={team[2]} />
          <SmallCard member={team[3]} />
          <SmallCard member={team[4]} />
        </div>
      </div>

      {/* Mobile/Tablet: stacked */}
      <div className="lg:hidden w-full max-w-[1440px] px-6 py-10 flex flex-col gap-6">
        <div className="text-white font-montserrat font-semibold text-[28px] leading-[36px]">
          The Team Behind Arfve
        </div>
        <p className="text-white/90 font-montserrat text-[16px] leading-[24px]">
          Arfve didn’t start with a product roadmap it started with believers. A global collaboration of interns, engineers, and designers shaping a new era of sustainable tech through the Arfve Tech Lab.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {team.map((m, idx) => (
            <div key={idx} className="relative w-full h-[420px] rounded-[10px] overflow-hidden">
              <div className="relative w-full h-full">
                <OptimizedImage src={m.imageSrc} alt={m.name} fill fallbackOnly className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
              </div>
              <div className="absolute left-4 bottom-4 right-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="text-white font-montserrat font-semibold text-[18px] leading-[24px]">{m.name}</div>
                  <div className="text-white font-montserrat text-[14px] leading-[20px]">{m.role}</div>
                </div>
                <p className="text-white font-montserrat text-[14px] leading-[20px]">“{m.quote}”</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
};

export default TeamSection;


