import React from 'react';

// Types
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'solidGray';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

// Button variant styles with professional hover effects
const buttonVariants = {
  primary: `
    bg-white text-black 
    hover:bg-gray-100 hover:scale-105 hover:shadow-lg hover:shadow-white/20
    active:bg-gray-200 active:scale-100 active:shadow-md
    transform transition-all duration-200 ease-out
  `,
  secondary: `
    bg-transparent text-white border border-white/20 
    hover:border-white/40 hover:bg-white/5 hover:scale-105 hover:shadow-md hover:shadow-white/10
    active:scale-100
    transform transition-all duration-200 ease-out
  `,
  outline: `
    bg-transparent text-white border border-white 
    hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg hover:shadow-white/20
    active:scale-100
    transform transition-all duration-200 ease-out
  `,
  solidGray: `
    bg-[#545454] text-white 
    hover:opacity-90 active:opacity-100
    font-montserrat
    transform transition-all duration-200 ease-out
  `,
} as const;

const buttonSizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
} as const;

/**
 * Professional button component with variants, sizes, and loading states
 * Used across the application for consistent styling and behavior
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  // Simple class name merging without external dependencies
  const classNames = [
    // Base styles
    'font-medium font-poppins rounded-full whitespace-nowrap',
    'focus:outline-none focus:ring-2 focus:ring-white/20 focus:scale-105',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none',
    // Variant styles
    buttonVariants[variant],
    // Size styles
    buttonSizes[size],
    // Custom className
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