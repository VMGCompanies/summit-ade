import React from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export const Drawer = ({ open, onClose, title, children, width = 'w-[520px]' }: DrawerProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div className={`${width} bg-white shadow-2xl flex flex-col slide-in-right h-full overflow-hidden`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-navy-900">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
