'use client';

import { useState } from 'react';
import { MailerLiteService } from '@/services/mailerlite';

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
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={`w-[408px] flex flex-col items-center gap-3 ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-row items-center gap-6 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="email"
          className="flex-1 h-11 px-5 py-2.5 rounded-3xl border border-white bg-transparent text-white text-sm font-normal font-['Poppins'] leading-tight placeholder:text-white focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-11 px-8 py-2.5 bg-white rounded-[55px] flex justify-center items-center text-black text-base font-medium font-['Poppins'] leading-tight disabled:opacity-50 border-none shadow-none"
        >
          {status === 'loading' ? 'Signing up...' : buttonText}
        </button>
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