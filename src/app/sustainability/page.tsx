import ComingSoonHero from '@/components/common/ComingSoonHero';
import SustainabilitySocialCarousel from '@/components/sustainability/SustainabilitySocialCarousel';
import Footer from '@/components/Footer';

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen bg-white">
      <ComingSoonHero
        title="Coming Soon"
        subtitle="We're working on something amazing for sustainable technology. Stay tuned for updates."
      />
      <div className="mt-4 md:mt-8 lg:mt-10">
        <SustainabilitySocialCarousel />
      </div>
      <Footer />
    </main>
  );
}
