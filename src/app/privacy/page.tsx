import PrivacyHero from '@/components/privacy/PrivacyHero';
import PrivacyStatement from '@/components/privacy/PrivacyStatement';
import PrivacyTransparency from '@/components/privacy/PrivacyTransparency';
import PrivacyControl from '@/components/privacy/PrivacyControl';
import SustainabilitySocialCarousel from '@/components/sustainability/SustainabilitySocialCarousel';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <PrivacyHero />
       <PrivacyStatement />
       <PrivacyTransparency />
       <PrivacyControl />
       <SustainabilitySocialCarousel className="mt-4 md:mt-8 lg:mt-10" />
       <Footer />
      {/* Add more content here */}
    </main>
  );
}
