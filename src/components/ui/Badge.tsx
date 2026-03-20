import React from 'react';

type Variant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'orange' | 'navy';

const variants: Record<Variant, string> = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  neutral: 'bg-gray-100 text-gray-700',
  orange: 'bg-orange-100 text-orange-700',
  navy: 'bg-navy-100 text-navy-900',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export const Badge = ({ children, variant = 'neutral', className = '' }: BadgeProps) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${variants[variant]} ${className}`}>
    {children}
  </span>
);
