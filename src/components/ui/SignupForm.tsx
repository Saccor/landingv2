'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

// Simple Button component without external dependencies
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  
  const variantStyles = {
    primary: 'bg-white text-black hover:bg-gray-100 hover:scale-105 hover:shadow-lg hover:shadow-white/20 active:bg-gray-200 active:scale-100 active:shadow-md transform transition-all duration-200 ease-out',
    secondary: 'bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5 hover:scale-105 hover:shadow-md hover:shadow-white/10 active:scale-100 transform transition-all duration-200 ease-out',
    outline: 'bg-transparent text-white border border-white hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg hover:shadow-white/20 active:scale-100 transform transition-all duration-200 ease-out'
  };
  
  const sizeStyles = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg'
  };
  
  const classNames = [
    'font-medium font-poppins rounded-full whitespace-nowrap',
    'focus:outline-none focus:ring-2 focus:ring-white/20 focus:scale-105',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none',
    variantStyles[variant],
    sizeStyles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

interface SignupFormProps {
  className?: string;
  buttonText?: string;
  onSuccess?: () => void;
}

export default function SignupForm({
  className = '',
  buttonText = 'Sign-up',
  onSuccess
}: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

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

  return (
    <div className={`w-full flex flex-col items-center gap-3 ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center gap-3 w-[369px] h-[44px] p-0 bg-transparent">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="email"
          className="
            w-[227px] h-[44px] px-5 py-2.5 rounded-full
            border border-white bg-transparent
            text-white placeholder:text-gray-400
            text-sm font-poppins
            focus:outline-none focus:border-white/40
            transition-all duration-200
            box-border
          "
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={status === 'loading'}
          className="h-full px-6 rounded-full whitespace-nowrap"
        >
          {buttonText}
        </Button>
      </form>
      {message && (
        <p className={`text-sm text-center w-full px-4 sm:px-0 ${
          status === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
} 