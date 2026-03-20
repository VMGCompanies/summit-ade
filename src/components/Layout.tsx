import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingCart, FileText, Wrench, Calculator,
  CheckSquare, FolderOpen, Building2, Layers, ScrollText,
  Settings, Bell, Search, Zap, ChevronRight, Menu, X
} from 'lucide-react';
import { approvals } from '../data/mockData';
import { Button } from './ui/Button';
import { NewWorkflowModal } from './NewWorkflowModal';

const SummitLogo = () => (
  <svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left peak */}
    <path d="M7 26 L13 10 L19 26 Z" fill="white" fillOpacity="0.45" />
    {/* Center peak — tallest */}
    <path d="M10 26 L18 2 L26 26 Z" fill="white" fillOpacity="0.9" />
    {/* Right peak */}
    <path d="M19 26 L25 12 L31 26 Z" fill="white" fillOpacity="0.45" />
    {/* Ground line */}
    <line x1="2" y1="26" x2="30" y2="26" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
  </svg>
);

const navItems = [
  { to: '/', label: 'Executive Dashboard', icon: LayoutDashboard },
  { to: '/purchasing', label: 'PETRA — Purchasing', icon: ShoppingCart },
  { to: '/po-compliance', label: 'PASCAL — PO Management', icon: FileText },
  { to: '/tool-tracking', label: 'TITAN — Tool Tracking', icon: Wrench },
  { to: '/estimating', label: 'Estimating ADE', icon: Calculator },
  { separator: true },
  { to: '/approvals', label: 'Approvals', icon: CheckSquare, badge: approvals.filter(a => a.status === 'Pending').length },
  { to: '/documents', label: 'Documents', icon: FolderOpen },
  { to: '/vendors', label: 'Vendors', icon: Building2 },
  { to: '/projects', label: 'Projects', icon: Layers },
  { to: '/audit', label: 'Audit Trail', icon: ScrollText },
  { separator: true },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const pendingApprovals = approvals.filter(a => a.status === 'Pending').length;

  return (
    <div className="flex h-screen bg-navy-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-0 overflow-hidden'} transition-all duration-200 bg-navy-900 flex-shrink-0 flex flex-col`}>
        {/* Logo */}
        <div className="px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <SummitLogo />
            <div>
              <div className="text-white font-bold text-sm leading-tight tracking-wide">Summit Electrical</div>
              <div className="text-white/50 text-[10px] leading-tight uppercase tracking-wider">ADE Operations Platform</div>
            </div>
          </div>
        </div>

        {/* ADE Roles Label */}
        <div className="px-4 pt-4 pb-1">
          <span className="text-white/30 text-[9px] uppercase tracking-widest font-semibold">ADE Roles</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto pb-3 px-3">
          {navItems.map((item, i) => {
            if (item.separator) return <div key={i} className="my-2 border-t border-white/10" />;
            const Icon = item.icon!;
            return (
              <NavLink
                key={item.to}
                to={item.to!}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded text-sm mb-0.5 transition-colors group ${
                    isActive
                      ? 'bg-orange-500 text-white font-medium'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon size={15} />
                <span className="flex-1 leading-tight">{item.label}</span>
                {item.badge ? (
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
                ) : null}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded px-2 py-1.5">
            <div className="w-2 h-2 bg-orange-400 rounded-full pulse-dot" />
            <span className="text-orange-300 text-xs font-medium">DEMO MODE</span>
          </div>
          <div className="text-white/25 text-[9px] text-center leading-relaxed">
            Powered by Neuralogic Group LLC
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-14 flex items-center px-4 gap-4 flex-shrink-0 shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-navy-900 transition-colors">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, POs, invoices, tools..."
              className="w-full pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded bg-gray-50 focus:outline-none focus:border-navy-400 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex-1" />

          {/* Notification */}
          <button className="relative text-gray-500 hover:text-navy-900 transition-colors">
            <Bell size={18} />
            {pendingApprovals > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {pendingApprovals}
              </span>
            )}
          </button>

          {/* User */}
          <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
            <div className="w-7 h-7 bg-navy-900 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">DH</span>
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-900 text-xs leading-tight">D. Harmon</div>
              <div className="text-gray-400 text-[10px]">Project Manager</div>
            </div>
          </div>

          {/* New Workflow */}
          <Button variant="orange" size="sm" onClick={() => setShowWorkflow(true)}>
            <Zap size={13} />
            New Workflow
          </Button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {showWorkflow && <NewWorkflowModal onClose={() => setShowWorkflow(false)} />}
    </div>
  );
};
