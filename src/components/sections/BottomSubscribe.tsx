'use client';

import SignupForm from '@/components/common/SignupForm';

interface BottomSubscribeProps {
  className?: string;
}

export default function BottomSubscribe({ className = '' }: BottomSubscribeProps) {
  return (
    <section className={`bg-black overflow-hidden ${className}`}>
      {/* Container: Clean, simple approach with proper spacing */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Content: Center aligned with clean spacing */}
        <div className="
          flex flex-col items-center text-center
          space-y-8 lg:space-y-10
          max-w-lg mx-auto
          w-full
        ">
          
          {/* Heading: Simple responsive typography */}
          <div className="space-y-2 px-4 sm:px-0">
            <h2 className="
              text-white font-bold font-montserrat
              text-xl sm:text-2xl lg:text-3xl
              leading-tight
            ">
              Subscribe now
            </h2>
            <p className="
              text-white font-montserrat
              text-xl sm:text-2xl lg:text-3xl
              leading-tight
            ">
              Time is ticking, and secrets await.
            </p>
          </div>

          {/* Form: Inherits proper responsive behavior */}
          <div className="w-full max-w-md">
            <SignupForm buttonText="Sign-up" />
          </div>
          
        </div>
      </div>
    </section>
  );
} 