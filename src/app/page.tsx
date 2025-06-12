import BottomSubscribe from '@/components/sections/BottomSubscribe';
import SocialMediaSection from '@/components/sections/SocialMediaSection';
import VisionSection from '@/components/sections/VisionSection';
import HeroSection from '@/components/sections/HeroSection';
import FeatureSection from '@/components/sections/FeatureSection';
import AppSection from '@/components/sections/AppSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <HeroSection />
      <VisionSection />
      <FeatureSection />
      <SocialMediaSection />
      <BottomSubscribe />
    </div>
  );
}
