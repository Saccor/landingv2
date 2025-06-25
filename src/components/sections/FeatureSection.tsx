import React from 'react';
import RevealSection from '@/components/ui/RevealSection';
import WavesIcon from '@/components/icons/featuresIcons/waves';
import BatteryIcon from '@/components/icons/featuresIcons/Battery';
import CircleIcon from '@/components/icons/featuresIcons/Circle';
import GamepadIcon from '@/components/icons/featuresIcons/gamepad';
import SoundwaveIcon from '@/components/icons/featuresIcons/soundwave';
import LeafIcon from '@/components/icons/featuresIcons/Leaf';

export default function FeatureSection() {
  return (
    <RevealSection className="bg-black overflow-hidden">
      <div className="
        w-full flex flex-col items-center
        
        /* Mobile: Tight padding (0-1023px) */
        px-4 pt-0 pb-8
        
        /* Desktop: Standard padding (1024px+) */
        lg:px-4 lg:pb-8
      ">
        <div className="w-full flex justify-center">
          {/* Gray box: Fully responsive with proper sizing */}
          <div className="
            bg-[var(--Gray-900,#1b1b1b)] shadow-lg
            flex flex-col items-start
            
            /* Mobile: Compact size and padding (0-767px) */
            w-[353px] px-6 py-7
            
            /* Tablet: Match Figma tablet design (768px-1023px) */
            md:w-[794px] md:px-[50px] md:py-[50px] md:items-start
            
            /* Desktop: Progressive scaling with centering (1024px+) */
            lg:w-[1200px] lg:px-[50px] lg:py-[40px] lg:justify-center lg:items-center
            xl:w-[1400px] xl:h-[587px] xl:py-[50px] xl:justify-start
          ">
            {/* Heading - Responsive Typography */}
            <h2 className="
              font-montserrat font-semibold text-left w-full
              bg-gradient-to-r from-white to-[#C8A596] bg-clip-text text-transparent
             
              /* Mobile: Smaller text, allow full width for horizontal text (0-767px) */
              text-[22px] leading-[30px] mb-[40px] max-w-none
              
              /* Tablet: Match Figma exact specs (768px-1023px) */
              md:text-[30px] md:leading-[38px] md:mb-[50px] md:max-w-none
              
              /* Desktop: Fluid scaling (1024px+) */
              lg:text-[26px] lg:leading-[34px] lg:mb-[40px] lg:max-w-none
              xl:text-[30px] xl:leading-[38px] xl:mb-[50px]
            ">
              Earbuds <span className="text-inherit">Engineered Without Compromise</span> — and <span className="text-inherit">Built for Sustainability</span>
            </h2>

            {/* Features grid - Responsive Grid Layout */}
            <div className="
              w-full grid
           
              /* Mobile: Single column, tight spacing (0-767px) */
              grid-cols-1 gap-6 max-w-[305px]
              
              /* Tablet: Single column with 50px gap (768px-1023px) */
              md:grid-cols-1 md:gap-[50px] md:max-w-[694px]
              
              /* Desktop: Compact layout to match Figma exactly (1024px+) */
              lg:grid-cols-2 lg:grid-rows-3 lg:gap-x-[40px] lg:gap-y-[12px] lg:max-w-[1100px]
              xl:gap-x-[50px] xl:gap-y-[14px] xl:max-w-[1300px]
            ">
              {/* Feature 1: Studio-Grade Sound */}
              <div className="
                flex flex-col
                
                /* Mobile: Tight spacing (0-767px) */
                gap-2
                
                /* Tablet: Proper feature spacing (768px-1023px) */
                md:gap-3
                
                /* Desktop: Compact internal spacing to match Figma (1024px+) */
                lg:gap-2
              ">
                <div className="
                  flex flex-row items-center
                  
                  /* Mobile: Compact spacing (0-1023px) */
                  gap-3
                  
                  /* Desktop: More space (1024px+) */
                  lg:gap-4
                ">
                  <SoundwaveIcon className="w-[39px] h-[25px]" />
                  <span className="
                    font-montserrat font-semibold text-white
               
                    /* Mobile: Smaller text (0-767px) */
                    text-lg
                    
                    /* Tablet: Medium sizing (768px-1023px) */
                    md:text-[22px] md:leading-[28px]
               
                    /* Desktop: Match Figma specs (1024px+) */
                    lg:text-[24px] lg:leading-[32px]
                  ">Studio-Grade Sound</span>
                </div>
                <p className="
                  font-montserrat font-normal text-white
               
                  /* Mobile: Smaller text (0-767px) */
                  text-[13px] leading-[19px]
                  
                  /* Tablet: Medium sizing (768px-1023px) */
                  md:text-[15px] md:leading-[22px]
                  
                  /* Desktop: Match Figma specs (1024px+) */
                  lg:text-[16px] lg:leading-[24px]
                ">
                  Immersive, high-fidelity audio with premium dynamic drivers. Calibrated to your unique hearing profile with a 9-band EQ.
                </p>
              </div>

              {/* Feature 2: Modular Power */}
              <div className="
                flex flex-col
                
                /* Mobile: Tight spacing (0-767px) */
                gap-2
                
                /* Tablet: Proper feature spacing (768px-1023px) */
                md:gap-3
                
                /* Desktop: Compact internal spacing to match Figma (1024px+) */
                lg:gap-2
              ">
                <div className="
                  flex flex-row items-center
                  
                  /* Mobile: Compact spacing (0-1023px) */
                  gap-3
                  
                  /* Desktop: More space (1024px+) */
                  lg:gap-4
                ">
                  <BatteryIcon className="w-[39px] h-[22px]" />
                  <span className="
                    font-montserrat font-semibold text-white
               
                    /* Mobile: Smaller text (0-767px) */
                    text-lg
                    
                    /* Tablet: Medium sizing (768px-1023px) */
                    md:text-[22px] md:leading-[28px]
               
                    /* Desktop: Match Figma specs (1024px+) */
                    lg:text-[24px] lg:leading-[32px]
                  ">Modular Power</span>
                </div>
                <p className="
                  font-montserrat font-normal text-white
               
                  /* Mobile: Smaller text (0-767px) */
                  text-[13px] leading-[19px]
                  
                  /* Tablet: Medium sizing (768px-1023px) */
                  md:text-[15px] md:leading-[22px]
                  
                  /* Desktop: Match Figma specs (1024px+) */
                  lg:text-[16px] lg:leading-[24px]
                ">
                  Rechargeable, swappable batteries in both earbuds and case.<br/>
                  <span className="block ml-2">→ Up to 9 hours playback</span>
                  <span className="block ml-2">→ 30+ hours total with case</span>
                  <span className="block ml-2">15 min of charging = 2+ hours of playback</span>
                </p>
              </div>

              {/* Feature 3: Hybrid ANC */}
              <div className="
                flex flex-col
                
                /* Mobile: Tight spacing (0-767px) */
                gap-2
                
                /* Tablet: Proper feature spacing (768px-1023px) */
                md:gap-3
                
                /* Desktop: Compact internal spacing to match Figma (1024px+) */
                lg:gap-2
              ">
                <div className="
                  flex flex-row items-center
                  
                  /* Mobile: Compact spacing (0-1023px) */
                  gap-3
                  
                  /* Desktop: More space (1024px+) */
                  lg:gap-4
                ">
                  <CircleIcon className="w-[24px] h-[25px]" />
                  <span className="
                    font-montserrat font-semibold text-white
               
                    /* Mobile: Smaller text (0-767px) */
                    text-lg
                    
                    /* Tablet: Medium sizing (768px-1023px) */
                    md:text-[22px] md:leading-[28px]
               
                    /* Desktop: Match Figma specs (1024px+) */
                    lg:text-[24px] lg:leading-[32px]
                  ">Hybrid ANC</span>
                </div>
                <p className="
                  font-montserrat font-normal text-white
               
                  /* Mobile: Smaller text (0-767px) */
                  text-[13px] leading-[19px]
                  
                  /* Tablet: Medium sizing (768px-1023px) */
                  md:text-[15px] md:leading-[22px]
                  
                  /* Desktop: Match Figma specs (1024px+) */
                  lg:text-[16px] lg:leading-[24px]
                ">
                  Up to 45 dB of ambient noise cancelled. Silence distractions. Let in what matters.
                </p>
              </div>

              {/* Feature 4: Low latency mode */}
              <div className="
                flex flex-col
                
                /* Mobile: Tight spacing (0-767px) */
                gap-2
                
                /* Tablet: Proper feature spacing (768px-1023px) */
                md:gap-3
                
                /* Desktop: Compact internal spacing to match Figma (1024px+) */
                lg:gap-2
              ">
                <div className="
                  flex flex-row items-center
                  
                  /* Mobile: Compact spacing (0-1023px) */
                  gap-3
                  
                  /* Desktop: More space (1024px+) */
                  lg:gap-4
                ">
                  <GamepadIcon className="w-[36px] h-[36px]" />
                  <span className="
                    font-montserrat font-semibold text-white
                 
                    /* Mobile: Smaller text (0-767px) */
                    text-lg
                    
                    /* Tablet: Medium sizing (768px-1023px) */
                    md:text-[22px] md:leading-[28px]
                 
                    /* Desktop: Match Figma specs (1024px+) */
                    lg:text-[24px] lg:leading-[32px]
                  ">Low latency mode</span>
                </div>
                <p className="
                  font-montserrat font-normal text-white
                  
                  /* Mobile: Smaller text (0-767px) */
                  text-[13px] leading-[19px]
                  
                  /* Tablet: Medium sizing (768px-1023px) */
                  md:text-[15px] md:leading-[22px]
                  
                  /* Desktop: Match Figma specs (1024px+) */
                  lg:text-[16px] lg:leading-[24px]
                ">
                  Ultra-responsive for gaming and streaming
                </p>
              </div>

              {/* Feature 5: IPX54 rated */}
              <div className="
                flex flex-col
                
                /* Mobile: Tight spacing (0-767px) */
                gap-2
                
                /* Tablet: Proper feature spacing (768px-1023px) */
                md:gap-3
                
                /* Desktop: Compact internal spacing to match Figma (1024px+) */
                lg:gap-2
              ">
                <div className="
                  flex flex-row items-center
                  
                  /* Mobile: Compact spacing (0-1023px) */
                  gap-3
                  
                  /* Desktop: More space (1024px+) */
                  lg:gap-4
                ">
                  <WavesIcon className="w-[35px] h-[36px]" />
                  <span className="
                    font-montserrat font-semibold text-white
                     
                    /* Mobile: Smaller text (0-767px) */
                    text-lg
                    
                    /* Tablet: Medium sizing (768px-1023px) */
                    md:text-[22px] md:leading-[28px]
                     
                    /* Desktop: Match Figma specs (1024px+) */
                    lg:text-[24px] lg:leading-[32px]
                  ">IPX54 rated</span>
                </div>
                <p className="
                  font-montserrat font-normal text-white
                  
                  /* Mobile: Smaller text (0-767px) */
                  text-[13px] leading-[19px]
                  
                  /* Tablet: Medium sizing (768px-1023px) */
                  md:text-[15px] md:leading-[22px]
                  
                  /* Desktop: Match Figma specs (1024px+) */
                  lg:text-[16px] lg:leading-[24px]
                ">
                  Water and sweat resistant - ready for active days
                </p>
              </div>

              {/* Feature 6: Recycled materials */}
              <div className="
                flex flex-col
                
                /* Mobile: Tight spacing (0-767px) */
                gap-2
                
                /* Tablet: Proper feature spacing (768px-1023px) */
                md:gap-3
                
                /* Desktop: Compact internal spacing to match Figma (1024px+) */
                lg:gap-2
              ">
                <div className="
                  flex flex-row items-center
                  
                  /* Mobile: Compact spacing (0-1023px) */
                  gap-3
                  
                  /* Desktop: More space (1024px+) */
                  lg:gap-4
                ">
                  <LeafIcon className="w-[41px] h-[44px] lg:w-[36px] lg:h-[36px]" />
                  <span className="
                    font-montserrat font-semibold text-white
                     
                    /* Mobile: Smaller text (0-767px) */
                    text-lg
                    
                    /* Tablet: Medium sizing (768px-1023px) */
                    md:text-[22px] md:leading-[28px]
                     
                    /* Desktop: Match Figma specs (1024px+) */
                    lg:text-[24px] lg:leading-[32px]
                  ">Recycled materials</span>
                </div>
                <p className="
                  font-montserrat font-normal text-white
               
                  /* Mobile: Smaller text (0-767px) */
                  text-[13px] leading-[19px]
                  
                  /* Tablet: Medium sizing (768px-1023px) */
                  md:text-[15px] md:leading-[22px]
                  
                  /* Desktop: Match Figma specs (1024px+) */
                  lg:text-[16px] lg:leading-[24px]
                ">
                  Crafted from recycled materials and designed to be 100% serviceable. Replace only what&apos;s needed, and extend lifespan with every update.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
} 