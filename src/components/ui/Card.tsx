import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className = '', onClick }: CardProps) => (
  <div
    className={`bg-white border border-gray-200 rounded-lg shadow-sm ${onClick ? 'cursor-pointer hover:border-navy-300 hover:shadow-md transition-all' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-5 py-4 border-b border-gray-100 ${className}`}>{children}</div>
);

export const CardBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-5 py-4 ${className}`}>{children}</div>
);
