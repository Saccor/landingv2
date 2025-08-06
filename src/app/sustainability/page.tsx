import SustainabilityHero from '@/components/sustainability/SustainabilityHero';
import SustainabilityAwareness from '@/components/sustainability/SustainabilityAwareness';
import SustainabilityDesign from '@/components/sustainability/SustainabilityDesign';
import SustainabilityModularity from '@/components/sustainability/SustainabilityModularity';
import Footer from '@/components/Footer';

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen bg-black">
      <SustainabilityHero />
      <SustainabilityAwareness />
      <SustainabilityDesign />
      <SustainabilityModularity />
      <Footer />
      {/* Add more content below */}
    </main>
  );
}
