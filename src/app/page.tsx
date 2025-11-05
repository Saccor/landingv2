'use client';

import SustainabilitySocialCarousel from '@/components/sustainability/SustainabilitySocialCarousel';
import NewHeroSection from '@/components/sections/NewHeroSection';
import SignupCTASection from '@/components/sections/SignupCTASection';
import ModularFeaturesSection from '@/components/sections/ModularFeaturesSection';
import DetailsSection from '@/components/sections/DetailsSection';
import AIPowered from '@/components/sections/AIPowered'; 
import OtherFeatures from '@/components/sections/OtherFeatures';
import OurPartners from '@/components/sections/OurPartners';
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
      <OtherFeatures />
      <OurPartners />
      <SustainabilitySocialCarousel />
      <Footer />
    </div>
  );
}
