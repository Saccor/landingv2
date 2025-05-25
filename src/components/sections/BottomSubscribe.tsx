'use client';

import SignupForm from '@/components/common/SignupForm';

interface BottomSubscribeProps {
  className?: string;
}

export default function BottomSubscribe({ className = '' }: BottomSubscribeProps) {
  return (
    <section className={`w-full px-4 sm:px-8 md:px-16 lg:px-32 py-12 sm:py-20 bg-black flex flex-col justify-center items-center gap-9 overflow-hidden ${className}`}>
      <div className="w-full max-w-[408px] flex flex-col items-center justify-center">
        <div className="text-center w-full">
          <div className="text-white text-2xl font-bold font-['Montserrat'] leading-8">Subscribe now</div>
          <div className="text-white text-2xl font-normal font-['Montserrat'] leading-8">Time is ticking, and secrets await.</div>
        </div>
      </div>
      <SignupForm
        className="w-full max-w-[408px] flex-col sm:flex-row gap-4 sm:gap-6 [&>form]:flex-col sm:[&>form]:flex-row [&>form]:gap-4 sm:[&>form]:gap-6 [&>form]:w-full"
        buttonText="Sign-up"
      />
    </section>
  );
} 