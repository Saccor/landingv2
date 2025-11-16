import ComingSoonHero from '@/components/common/ComingSoonHero';
import SustainabilitySocialCarousel from '@/components/sustainability/SustainabilitySocialCarousel';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white min-h-screen">
      <ComingSoonHero
        title="Coming Soon"
        subtitle="We're developing comprehensive privacy policies and controls. Check back soon for detailed information."
      />
      <div className="mt-4 md:mt-8 lg:mt-10">
        <SustainabilitySocialCarousel />
      </div>
      <Footer />
    </main>
  );
} 