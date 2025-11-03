'use client';

// Reuse the sustainability carousel for social posts on homepage
import SustainabilitySocialCarousel from '@/components/sustainability/SustainabilitySocialCarousel';
import NewHeroSection from '@/components/sections/NewHeroSection';
import SignupCTASection from '@/components/sections/SignupCTASection';
import ModularFeaturesSection from '@/components/sections/ModularFeaturesSection';
import DetailsSection from '@/components/sections/DetailsSection';
import AIPowered from '@/components/sections/AIPowered'; 
import AppIntelligenceSection from '@/components/sections/AppIntelligenceSection';
import TeamSection from '@/components/sections/TeamSection';
// Removed legacy sections in favor of new flow
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <NewHeroSection />
      <SignupCTASection />
      {/* InfoImage sections removed per v6 layout */}
      <ModularFeaturesSection />
      <DetailsSection />
      <AIPowered /> 
      <AppIntelligenceSection />
      <TeamSection />
      <SustainabilitySocialCarousel />
      <Footer />
    </div>
  );
}
