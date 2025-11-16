'use client';

import SustainabilitySocialCarousel from '@/components/sustainability/SustainabilitySocialCarousel';
import NewHeroSection from '@/components/sections/NewHeroSection';
import LegacyInfoSection from '@/components/sections/LegacyInfoSection';
import SignupCTASection from '@/components/sections/SignupCTASection';
import ModularFeaturesSection from '@/components/sections/ModularFeaturesSection';
import DetailsSection from '@/components/sections/DetailsSection';
import ColorSelectionSection from '@/components/sections/ColorSelectionSection';
import ProductShowcaseSection from '@/components/sections/ProductShowcaseSection';
import AIPowered from '@/components/sections/AIPowered';
import OtherFeatures from '@/components/sections/OtherFeatures';
import AdditionalFeaturesSection from '@/components/sections/AdditionalFeaturesSection';
import OurPartners from '@/components/sections/OurPartners';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-white">
      <NewHeroSection />
      <SignupCTASection />
      <LegacyInfoSection />
      {/* InfoImage sections removed per v6 layout */}
      <ModularFeaturesSection />
      <DetailsSection />
      <ColorSelectionSection />
      <ProductShowcaseSection />
      <AIPowered />
      <OtherFeatures />
      <AdditionalFeaturesSection />
      <OurPartners />
      <SustainabilitySocialCarousel />
      <SignupCTASection />
      <Footer />
    </div>
  );
}
