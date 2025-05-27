import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const buttonVariants = {
  primary: 'bg-white text-black hover:bg-gray-100 active:bg-gray-200',
  secondary: 'bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5',
  outline: 'bg-transparent text-white border border-white hover:bg-white hover:text-black',
};

const buttonSizes = {
  sm: 'h-10 px-3 sm:px-4 lg:px-5 text-sm',
  md: 'h-12 px-4 sm:px-6 lg:px-8 text-base',
  lg: 'h-14 px-6 sm:px-8 lg:px-10 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'font-medium font-poppins rounded-full transition-all duration-200 whitespace-nowrap',
        'focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        
        // Variant styles
        buttonVariants[variant],
        
        // Size styles
        buttonSizes[size],
        
        className
      )}
      disabled={disabled || isLoading}
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