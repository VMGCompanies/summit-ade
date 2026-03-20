import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
  ShoppingCart, FileText, Wrench, Calculator, AlertTriangle,
  TrendingUp, CheckCircle, Clock, Zap, ChevronRight, Activity, Play
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { projects, approvals, purchaseOrders, tools, weeklyWorkflowData, auditTrail } from '../data/mockData';

const KpiCard = ({ label, value, sub, icon: Icon, color, alert }: any) => (
  <Card>
    <CardBody className="flex items-start gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon size={18} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-xs text-gray-500 mt-0.5">{label}</div>
        {sub && <div className={`text-xs mt-1 font-medium ${alert ? 'text-orange-600' : 'text-gray-400'}`}>{sub}</div>}
      </div>
    </CardBody>
  </Card>
);

const AdeIdleCard = ({ name, icon: Icon, desc, onRun, confidence }: any) => (
  <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
      <Icon size={15} className="text-gray-500" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-xs font-semibold text-gray-800">{name}</div>
      <div className="text-[10px] text-gray-400 truncate">{desc}</div>
    </div>
    <div className="flex items-center gap-2 flex-shrink-0">
      <span className="text-[10px] text-gray-400">{confidence}%</span>
      <div className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
        Idle
      </div>
      <button
        onClick={onRun}
        className="inline-flex items-center gap-1 px-2 py-1 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-semibold rounded transition-colors"
      >
        <Play size={9} fill="currentColor" /> Run
      </button>
    </div>
  </div>
);

export const Dashboard = () => {
  const navigate = useNavigate();
  const overrunPOs = purchaseOrders.filter(p => p.status === 'Overrun').length;
  const watchPOs = purchaseOrders.filter(p => p.status === 'Watch').length;
  const pendingApprovals = approvals.filter(a => a.status === 'Pending').length;
  const toolsDeployed = tools.filter(t => t.status === 'In Field').length;
  const missingTools = tools.filter(t => t.status === 'Missing').length;

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Week of March 18, 2026 — PETRA · PASCAL · TITAN · Estimating</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5">
          <div className="w-2 h-2 bg-gray-400 rounded-full" />
          <span className="text-xs font-medium text-gray-600">4 ADEs Standing By</span>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard label="Active Workflows" value="18" sub="↑ 4 from last week" icon={Activity} color="bg-navy-900" />
        <KpiCard label="Pending Approvals" value={pendingApprovals} sub={`${pendingApprovals} require action`} icon={Clock} color="bg-orange-500" alert />
        <KpiCard label="Invoice Anomalies" value="2" sub="2 flagged this week" icon={AlertTriangle} color="bg-red-500" alert />
        <KpiCard label="PO Overrun Risks" value={overrunPOs + watchPOs} sub={`${overrunPOs} overrun · ${watchPOs} watch`} icon={FileText} color="bg-yellow-500" alert />
        <KpiCard label="Tools Deployed" value={toolsDeployed} sub={missingTools > 0 ? `${missingTools} missing` : 'All accounted'} icon={Wrench} color="bg-blue-600" alert={missingTools > 0} />
        <KpiCard label="Est. Cost Savings" value="$4,820" sub="Vendor optimization YTD" icon={TrendingUp} color="bg-green-600" />
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Chart */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Weekly Workflow Volume by ADE</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Feb 24 – Mar 17, 2026</p>
                </div>
                <Badge variant="navy">4 Week Trend</Badge>
              </div>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={weeklyWorkflowData} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="gPurchasing" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1B2E5E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1B2E5E" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gPO" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gTools" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gEst" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="purchasing" name="Purchasing" stroke="#1B2E5E" fill="url(#gPurchasing)" strokeWidth={2} />
                  <Area type="monotone" dataKey="po" name="PO Compliance" stroke="#F97316" fill="url(#gPO)" strokeWidth={2} />
                  <Area type="monotone" dataKey="tools" name="Tool Tracking" stroke="#3b82f6" fill="url(#gTools)" strokeWidth={2} />
                  <Area type="monotone" dataKey="estimating" name="Estimating" stroke="#10b981" fill="url(#gEst)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>

        {/* ADE Command Panel */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <h3 className="font-semibold text-gray-900 text-sm">ADE Command Panel</h3>
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">All Idle</span>
              </div>
            </CardHeader>
            <CardBody className="p-0 px-2">
              <AdeIdleCard name="PETRA — Purchasing" icon={ShoppingCart} desc="Material requests · Vendor comparison · Invoice review" onRun={() => navigate('/purchasing')} confidence={94} />
              <AdeIdleCard name="PASCAL — PO Management" icon={FileText} desc="PO tracking · Budget monitoring · Weekly reports" onRun={() => navigate('/po-compliance')} confidence={98} />
              <AdeIdleCard name="TITAN — Tool Tracking" icon={Wrench} desc="Field requests · Pick tickets · Shortage alerts" onRun={() => navigate('/tool-tracking')} confidence={100} />
              <AdeIdleCard name="Estimating ADE" icon={Calculator} desc="Spec review · Cost impact · Addendum analysis" onRun={() => navigate('/estimating')} confidence={91} />
            </CardBody>
            <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50 rounded-b-lg">
              <p className="text-[10px] text-gray-400 text-center">Click <strong>Run</strong> on any ADE to launch its workflow cycle</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Exceptions Queue */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-sm">Active Exceptions</h3>
                <Badge variant="danger">{pendingApprovals} Open</Badge>
              </div>
            </CardHeader>
            <div className="divide-y divide-gray-100">
              {approvals.map(a => (
                <div key={a.id} className="px-5 py-3 flex items-start gap-3 hover:bg-gray-50 cursor-pointer">
                  <AlertTriangle size={14} className={a.urgency === 'High' ? 'text-orange-500 mt-0.5' : 'text-yellow-400 mt-0.5'} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-800">{a.type}</div>
                    <div className="text-xs text-gray-500 truncate">{a.description}</div>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge variant={a.urgency === 'High' ? 'danger' : 'warning'}>{a.urgency}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Project Drilldown */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900 text-sm">Project Burn Overview</h3>
            </CardHeader>
            <CardBody className="p-0">
              {projects.map(p => {
                const pct = Math.round((p.billed / p.budget) * 100);
                return (
                  <div key={p.id} className="px-5 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <span className="text-xs font-semibold text-navy-900">{p.id}</span>
                        <span className="text-xs text-gray-500 ml-2">{p.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700">{pct}%</span>
                        <Badge variant={p.status === 'At Risk' ? 'danger' : 'success'}>{p.status}</Badge>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${pct > 100 ? 'bg-red-500' : pct > 85 ? 'bg-orange-400' : 'bg-navy-600'}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-gray-400">${p.billed.toLocaleString()} billed</span>
                      <span className="text-[10px] text-gray-400">${p.budget.toLocaleString()} budget</span>
                    </div>
                  </div>
                );
              })}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 text-sm">Recent Activity Feed</h3>
        </CardHeader>
        <div className="divide-y divide-gray-100">
          {auditTrail.slice(0, 6).map(a => (
            <div key={a.id} className="px-5 py-3 flex items-start gap-3 hover:bg-gray-50">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                a.status === 'Escalated' ? 'bg-orange-500' :
                a.status === 'Completed' ? 'bg-green-500' : 'bg-blue-400'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-navy-900">{a.ade}</span>
                  <span className="text-[10px] text-gray-400">{a.timestamp}</span>
                </div>
                <div className="text-xs text-gray-600">{a.action}</div>
              </div>
              <Badge variant={a.status === 'Escalated' ? 'orange' : a.status === 'Completed' ? 'success' : 'info'}>
                {a.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
