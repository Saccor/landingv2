'use client';

import BottomSubscribe from '@/components/sections/BottomSubscribe';
import SocialMediaSection from '@/components/sections/SocialMediaSection';
import VisionSection from '@/components/sections/VisionSection';
import HeroSection from '@/components/sections/HeroSection';
import FeatureSection from '@/components/sections/FeatureSection';
import AppSection from '@/components/sections/AppSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
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
