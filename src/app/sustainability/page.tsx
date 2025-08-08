import SustainabilityHero from '@/components/sustainability/SustainabilityHero';
import SustainabilityAwareness from '@/components/sustainability/SustainabilityAwareness';
import SustainabilityDesign from '@/components/sustainability/SustainabilityDesign';
import SustainabilityModularity from '@/components/sustainability/SustainabilityModularity';
import SustainabilitySocialCarousel from '@/components/sustainability/SustainabilitySocialCarousel';
import Footer from '@/components/Footer';

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen bg-black">
      <SustainabilityHero />
      <SustainabilityAwareness />
      <SustainabilityDesign />
      <SustainabilityModularity />
      <SustainabilitySocialCarousel className="mt-4 md:mt-8 lg:mt-10" />
      <Footer />
      {/* Add more content below */}
    </main>
  );
}
