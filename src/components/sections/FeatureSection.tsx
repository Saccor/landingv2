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
            
            /* Mobile: Compact size and padding (0-1023px) */
            w-[353px] px-6 py-7
            
            /* Desktop: Full size with specific layout (1024px+) */
            lg:w-[1200px] lg:px-16 lg:py-0 lg:justify-center
            xl:w-[1400px] xl:h-[587px]
          ">
            {/* Heading - Responsive Typography */}
            <h2 className="
              font-montserrat font-bold bg-gradient-to-r from-white to-[#C8A596] 
              bg-clip-text text-transparent text-left w-full
             
              /* Mobile: Smaller text with specific line breaks (0-1023px) */
              text-[22px] leading-[30px] mb-[40px] max-w-[305px]
              
              /* Desktop: Full size (1024px+) */
              lg:text-[28px] lg:leading-[36px] lg:mb-[50px] lg:max-w-none
            ">
              <span className="block lg:hidden">
                Earbuds Engineered<br />
                Without Compromise —<br />
                and Built for<br />
                Sustainability
              </span>
              <span className="hidden lg:inline">
                Earbuds <span className="text-inherit">Engineered Without Compromise</span> — and <span className="text-inherit">Built for Sustainability</span>
              </span>
            </h2>

            {/* Features grid - Responsive Grid Layout */}
            <div className="
              w-full grid
           
              /* Mobile: Single column, tight spacing (0-1023px) */
              grid-cols-1 gap-6 max-w-[305px]
              
              /* Desktop: 2 columns with specific spacing (1024px+) */
              lg:grid-cols-2 lg:grid-rows-3 lg:gap-x-16 lg:gap-y-8 lg:max-w-none
            ">
              {/* Feature 1: Studio-Grade Sound */}
              <div className="
                flex flex-col
                
                /* Mobile: Tight spacing (0-1023px) */
                gap-2
                
                /* Desktop: Standard spacing (1024px+) */
                lg:gap-3
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
               
                    /* Mobile: Smaller text (0-1023px) */
                    text-lg
               
                    /* Desktop: Standard size (1024px+) */
                    lg:text-xl
                  ">Studio-Grade Sound</span>
                </div>
                <p className="
                  font-montserrat font-medium text-white
               
                  /* Mobile: Smaller text (0-1023px) */
                  text-[13px] leading-[19px]
                  
                  /* Desktop: Full size (1024px+) */
                  lg:text-[14px] lg:leading-[20px]
                ">
                  Immersive, high-fidelity audio with premium dynamic drivers. Calibrated to your unique hearing profile with a 9-band EQ.
                </p>
              </div>

              {/* Feature 2: Modular Power */}
              <div className="
                flex flex-col
                
                /* Mobile: Tight spacing (0-1023px) */
                gap-2
                
                /* Desktop: Standard spacing (1024px+) */
                lg:gap-3
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
               
                    /* Mobile: Smaller text (0-1023px) */
                    text-lg
               
                    /* Desktop: Standard size (1024px+) */
                    lg:text-xl
                  ">Modular Power</span>
                </div>
                <p className="
                  font-montserrat font-medium text-white
               
                  /* Mobile: Smaller text (0-1023px) */
                  text-[13px] leading-[19px]
                  
                  /* Desktop: Full size (1024px+) */
                  lg:text-[14px] lg:leading-[20px]
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
                
                /* Mobile: Tight spacing (0-1023px) */
                gap-2
                
                /* Desktop: Standard spacing (1024px+) */
                lg:gap-3
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
               
                    /* Mobile: Smaller text (0-1023px) */
                    text-lg
               
                    /* Desktop: Standard size (1024px+) */
                    lg:text-xl
                  ">Hybrid ANC</span>
                </div>
                <p className="
                  font-montserrat font-medium text-white
               
                  /* Mobile: Smaller text (0-1023px) */
                  text-[13px] leading-[19px]
               
                  /* Desktop: Full size (1024px+) */
                  lg:text-[14px] lg:leading-[20px]
                ">
                  Up to 45 dB of ambient noise cancelled. Silence distractions. Let in what matters.
                </p>
              </div>

              {/* Feature 4: Low latency mode */}
              <div className="
                flex flex-col
                
                /* Mobile: Tight spacing (0-1023px) */
                gap-2
                
                /* Desktop: Standard spacing (1024px+) */
                lg:gap-3
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
                 
                    /* Mobile: Smaller text (0-1023px) */
                    text-lg
                     
                    /* Desktop: Standard size (1024px+) */
                    lg:text-xl
                  ">Low latency mode</span>
                </div>
                <p className="
                  font-montserrat font-medium text-white
                  
                  /* Mobile: Smaller text (0-1023px) */
                  text-[13px] leading-[19px]
                  
                  /* Desktop: Full size (1024px+) */
                  lg:text-[14px] lg:leading-[20px]
                ">
                  Ultra-responsive for gaming and streaming
                </p>
              </div>

              {/* Feature 5: IPX54 rated */}
              <div className="
                flex flex-col
                
                /* Mobile: Tight spacing (0-1023px) */
                gap-2
                
                /* Desktop: Standard spacing (1024px+) */
                lg:gap-3
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
                     
                    /* Mobile: Smaller text (0-1023px) */
                    text-lg
                     
                    /* Desktop: Standard size (1024px+) */
                    lg:text-xl
                  ">IPX54 rated</span>
                </div>
                <p className="
                  font-montserrat font-medium text-white
                  
                  /* Mobile: Smaller text (0-1023px) */
                  text-[13px] leading-[19px]
                  
                  /* Desktop: Full size (1024px+) */
                  lg:text-[14px] lg:leading-[20px]
                ">
                  Water and sweat resistant - ready for active days
                </p>
              </div>

              {/* Feature 6: Recycled materials */}
              <div className="
                flex flex-col
                
                /* Mobile: Tight spacing (0-1023px) */
                gap-2
                
                /* Desktop: Standard spacing (1024px+) */
                lg:gap-3
              ">
                <div className="
                  flex flex-row items-center
                  
                  /* Mobile: Compact spacing (0-1023px) */
                  gap-3
                  
                  /* Desktop: More space (1024px+) */
                  lg:gap-4
                ">
                  <LeafIcon className="w-[41px] h-[44px]" />
                  <span className="
                    font-montserrat font-semibold text-white
                     
                    /* Mobile: Smaller text (0-1023px) */
                    text-lg
                     
                    /* Desktop: Standard size (1024px+) */
                    lg:text-xl
                  ">Recycled materials</span>
                </div>
                <p className="
                  font-montserrat font-medium text-white
               
                  /* Mobile: Smaller text (0-1023px) */
                  text-[13px] leading-[19px]
               
                  /* Desktop: Full size (1024px+) */
                  lg:text-[14px] lg:leading-[20px]
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