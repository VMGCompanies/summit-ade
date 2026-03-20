import React from 'react';

export const Table = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`overflow-x-auto ${className}`}>
    <table className="w-full text-sm">{children}</table>
  </div>
);

export const Thead = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-50 border-b border-gray-200">{children}</thead>
);

export const Th = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <th className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap ${className}`}>
    {children}
  </th>
);

export const Tbody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-gray-100">{children}</tbody>
);

export const Tr = ({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <tr
    className={`hover:bg-blue-50/40 transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </tr>
);

export const Td = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-3 text-gray-700 ${className}`}>{children}</td>
);
