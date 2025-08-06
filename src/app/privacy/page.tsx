import PrivacyHero from '@/components/privacy/PrivacyHero';
import PrivacyStatement from '@/components/privacy/PrivacyStatement';
import PrivacyTransparency from '@/components/privacy/PrivacyTransparency';
import PrivacyControl from '@/components/privacy/PrivacyControl';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <PrivacyHero />
       <PrivacyStatement />
       <PrivacyTransparency />
       <PrivacyControl />
       <Footer />
      {/* Add more content here */}
    </main>
  );
}
