import Image from "next/image";
import BottomSubscribe from '@/components/sections/BottomSubscribe';
import SocialMediaSection from '@/components/sections/SocialMediaSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Your other sections will go here */}
      </main>
      
      <SocialMediaSection />
      <BottomSubscribe />
    </div>
  );
}
