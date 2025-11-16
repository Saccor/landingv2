'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import Button from '@/components/ui/button';

interface SignupFormProps {
  className?: string;
  buttonText?: string;
  onSuccess?: () => void;
  theme?: 'dark' | 'lightV6';
}

export default function SignupForm({
  className = '',
  buttonText = 'Sign-up',
  onSuccess,
  theme = 'dark'
}: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setIsMounted(true);

    const updateScale = () => {
      if (typeof window !== 'undefined') {
        // Only apply scaling on mobile, let tablet and desktop use full size
        if (window.innerWidth < 768) {
          setScale(Math.min(1, (window.innerWidth * 0.9) / 300));
        } else {
          setScale(1); // No scaling for tablet and desktop
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Track form submission attempt
    trackEvent({
      action: 'newsletter_signup_attempt',
      category: 'engagement',
      label: 'signup_form'
    });

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');

      // Track successful signup
      trackEvent({
        action: 'newsletter_signup_success',
        category: 'conversion',
        label: 'signup_form',
        value: 1
      });

      onSuccess?.();
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');

      // Track signup error
      trackEvent({
        action: 'newsletter_signup_error',
        category: 'engagement',
        label: 'signup_form'
      });
    }
  };

  if (theme === 'lightV6') {
    return (
      <div className={`w-full flex flex-col items-center gap-3 ${className}`}>
        <div className="flex justify-center" style={isMounted ? { transform: `scale(${scale})`, transformOrigin: 'center' } : undefined}>
          <form
            onSubmit={handleSubmit}
            className="
              box-border
              flex flex-row items-center
              rounded-[28px] border border-[#626262]
              gap-[10px]
              bg-transparent
              overflow-hidden
              /* Mobile: 315px width, 44px height, padding 4px 4px 4px 20px */
              w-[315px] h-[44px] py-[4px] pl-[20px] pr-[4px]
              /* Desktop: Keep original wider size */
              lg:w-[431px]
            "
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="
                flex-1 min-w-0 h-[36px] bg-transparent outline-none border-0
                font-montserrat font-normal text-[14px] leading-[20px]
                text-[#1A1A1A] placeholder-[#868889]
              "
            />
            <Button
              type="submit"
              variant="solidGray"
              size="sm"
              isLoading={status === 'loading'}
              className="
                !box-border
                !flex !items-center !justify-center
                !w-[178px] !h-[36px] !py-[4px] !px-[20px]
                !rounded-[55px] !bg-[#545454]
                font-montserrat font-medium !text-[14px] !leading-[20px]
                !text-white !text-center
                !flex-none
                !shrink-0
              "
            >
              {buttonText}
            </Button>
          </form>
        </div>
        {message && (
          <div style={isMounted ? { transform: `scale(${scale})`, transformOrigin: 'center' } : undefined}>
            <p className={`text-center w-full px-4 sm:px-0 text-sm md:text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col items-center gap-3 ${className}`}>
      <div
        className="w-full flex justify-center"
        style={isMounted ? {
          transform: `scale(${scale})`,
          transformOrigin: 'center',
        } : undefined}
      >
        <form onSubmit={handleSubmit} className="
          flex flex-row items-center justify-center gap-2 p-0 bg-transparent
          
          /* Mobile: Compact form (0-767px) */
          w-[300px] h-[38px]
          
          /* Tablet: Wider (768px-1023px) */
          md:w-[420px] md:h-[44px] md:gap-2
          
          /* Desktop: Expand to fit CTA section (1024px+) */
          lg:w-[460px] lg:h-[42px] lg:gap-3
          xl:w-[535px] xl:h-[44px]
        ">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email"
            className="
              px-5 py-2.5 rounded-full
              border border-white bg-transparent
              text-white placeholder:text-gray-400
              font-poppins
              focus:outline-none focus:border-white/40
              transition-all duration-200
              box-border
              
              /* Mobile: Compact input (0-767px) */
              w-[190px] h-[38px] text-sm
              
              /* Tablet: Long input like in image (768px-1023px) */
              md:w-[330px] md:h-[44px] md:text-base md:px-6
              
              /* Desktop: Wider input (1024px+) to fit long button label */
              lg:w-[320px] lg:h-[42px] lg:text-sm lg:px-5
              xl:w-[355px] xl:h-[44px] xl:text-sm
            "
          />
          <Button
            type="submit"
            variant="solidGray"
            size="md"
            isLoading={status === 'loading'}
            className="h-[36px] px-[20px] rounded-[55px] bg-[#545454] text-white text-[14px] leading-[20px] font-montserrat"
          >
            {buttonText}
          </Button>
        </form>
      </div>
      {message && (
        <div
          style={isMounted ? {
            transform: `scale(${scale})`,
            transformOrigin: 'center',
          } : undefined}
        >
          <p className={`
            text-center w-full px-4 sm:px-0
            
            /* Mobile: Smaller text */
            text-sm
            
            /* Tablet & Desktop: Standard size */
            md:text-sm
            
            ${status === 'success' ? 'text-green-600' : 'text-red-600'}
          `}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
} 