'use client';

import BottomSubscribe from '@/components/sections/BottomSubscribe';
import SocialMediaSection from '@/components/sections/SocialMediaSection';
import VisionSection from '@/components/sections/VisionSection';
import NewHeroSection from '@/components/sections/NewHeroSection';
import SignupCTASection from '@/components/sections/SignupCTASection';
import InfoImageSection from '@/components/sections/InfoImageSection';
import ModularFeaturesSection from '@/components/sections/ModularFeaturesSection';
import DetailsSection from '@/components/sections/DetailsSection';
import FeatureSection from '@/components/sections/FeatureSection';
import AppSection from '@/components/sections/AppSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <NewHeroSection />
      <SignupCTASection />
      <InfoImageSection
        text="At Arfve, we believe premium technology should evolve with you, not expire. That’s why we’re reimagining personal tech for the AI era, starting with Legacy 1: the world’s first AI-powered 3-piece modular earbuds. Engineered over the years at Arfve, they’re built to adapt to you, not the other way around."
        imageSrc="/headphones"
        imageRight={true}
        textVariant="emphasis"
        textHeight={120}
      />
      <InfoImageSection
        text="We combine AI-powered performance with modular design, sustainable materials, and Scandinavian minimalism to challenge fast-consumption culture and redefine what quality means in today’s tech world."
        imageSrc="/headphones"
        imageRight={true}
        textVariant="subtle"
        textHeight={120}
      />
      <InfoImageSection
        text={`Legacy1 is precision audio without compromise. Designed for those who value durability, adaptability, and full ownership of their sound. With swappable drivers, batteries, chipsets, and design covers, plus personalized tuning, Legacy1 delivers an experience that fits you and stays with you.\n\nThis is more than a product. It’s the foundation for what comes next. Our long-term vision goes beyond earbuds, toward a smarter, more personal future in audio, interaction, and everyday technology where control stays in your hands.`}
        imageSrc="/headphones"
        imageRight={true}
        textVariant="emphasis"
        textHeight={320}
        footerHeading="Back the beginning. Shape the future."
      />
      <ModularFeaturesSection />
      <DetailsSection />
      <VisionSection />
      <FeatureSection />
      <AppSection />
      <TestimonialSection />
      <SocialMediaSection />
      <BottomSubscribe />
      <Footer />
    </div>
  );
}
