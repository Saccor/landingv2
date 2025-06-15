import { Home } from 'lucide-react';

export default function SurveyPage() {
  return (
    <div className="flex flex-col bg-black text-white pb-8">
      {/* Breadcrumb */}
      <div className="w-full px-4 mb-6 lg:px-6 lg:pt-10 lg:mb-6">
        <div className="lg:max-w-[1270px] lg:mx-auto flex items-center gap-2 text-sm text-white">
          <Home size={18} className="lg:w-4 lg:h-4" />
          <span className="font-semibold underline cursor-pointer">Homepage</span>
          <span className="text-lg">›</span>
          <span className="text-white/80 lg:text-white">Survey</span>
        </div>
      </div>
      {/* Main Content */}
      <div className="px-4 lg:px-6">
        <div className="w-full max-w-[321px] mx-auto lg:max-w-[960px] lg:mt-12 lg:pb-16">
          <div className="font-montserrat lg:space-y-6">
            <h1 className="font-bold text-xl mb-4 lg:mb-0 lg:text-xl lg:font-semibold">Welcome to the Arfve Survey</h1>
            <p className="font-bold mb-2 lg:mb-0 lg:font-semibold">Help us shape the future of audio – your voice matters.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">This quick 4-minute survey will directly influence our final design and features.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">At Arfve, we believe the world doesn't need more disposable earbuds. It needs sound that lasts, design that adapts, and tech that doesn't expire. Your insights will help us build something different.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">As a thank you, you'll get early access to exclusive discounts, product updates and a chance to win a pair of Legacy 1 Earbuds.</p>
            <p className="font-bold mb-4 lg:mb-0 lg:font-semibold">The winner will be announced right before launch day.</p>
            <p className="mb-4 lg:mb-0 lg:text-[#CCCCCC]">This survey is anonymous. If you'd like to receive your reward, please leave your email at the end.</p>
            <div className="mb-6 lg:mb-0 lg:leading-snug">
              <p className="font-bold mb-6 lg:mb-0 lg:font-semibold lg:text-white">Thank you for being part of this movement.</p>
              <p className="italic mb-8 lg:mb-0 lg:not-italic lg:text-[#CCCCCC]">– The Arfve Team</p>
            </div>
            <div className="flex justify-center lg:mt-8">
              <button className="bg-white text-black rounded-full px-8 py-2 font-semibold text-base shadow-sm hover:bg-gray-100 transition lg:px-6 lg:py-2 lg:hover:opacity-90 lg:shadow-none">Start the survey</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
