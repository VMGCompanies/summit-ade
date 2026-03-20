import React from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'orange';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-navy-900 text-white hover:bg-navy-700',
  secondary: 'bg-white text-navy-900 border border-gray-300 hover:bg-gray-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-transparent text-navy-900 hover:bg-gray-100',
  orange: 'bg-orange-500 text-white hover:bg-orange-600',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-sm',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) => (
  <button
    className={`inline-flex items-center gap-2 font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
);
