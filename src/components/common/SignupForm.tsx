'use client';

import { useState } from 'react';
import { MailerLiteService } from '@/services/mailerlite';
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

    try {
      const mailerLite = new MailerLiteService();
      await mailerLite.subscribe({ email });
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
      onSuccess?.();
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={`w-full max-w-sm lg:max-w-md flex flex-col items-center gap-3 ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-row items-center gap-3 sm:gap-4 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="email"
          className="
            flex-1 h-12
            px-4 rounded-full
            border border-white/20 bg-transparent
            text-white placeholder:text-gray-400
            text-sm font-normal font-poppins leading-tight
            focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20
            transition-all duration-200
          "
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={status === 'loading'}
        >
          {buttonText}
        </Button>
      </form>
      {message && (
        <p
          className={`text-sm text-center w-full ${
            status === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
} 