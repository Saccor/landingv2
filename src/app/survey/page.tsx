'use client';

import SurveyIntroSection from '@/components/Survey/SurveyIntroSection';
import Footer from '@/components/Footer';

export default function SurveyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <SurveyIntroSection />
      </div>
      <Footer />
    </div>
  );
}
