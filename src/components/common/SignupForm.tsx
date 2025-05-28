'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import Button from './Button';

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
    <div className={`w-full max-w-md flex flex-col items-center gap-3 ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full px-4 sm:px-0">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="email"
          className="
            w-full h-12 px-4 rounded-full
            border border-white/20 bg-transparent
            text-white placeholder:text-gray-400
            text-sm font-poppins
            focus:outline-none focus:border-white/40
          "
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={status === 'loading'}
          className="w-full sm:w-auto"
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