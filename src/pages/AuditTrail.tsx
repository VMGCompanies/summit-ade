import React, { useState } from 'react';
import { ScrollText, Filter } from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { auditTrail } from '../data/mockData';
import { showToast } from '../components/ui/Toast';

export const AuditTrail = () => {
  const [filterAde, setFilterAde] = useState('All');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const ades = ['All', 'PETRA', 'PASCAL', 'TITAN', 'Estimating ADE'];
  const filtered = filterAde === 'All' ? auditTrail : auditTrail.filter(a => a.ade === filterAde);

  return (
    <div className="p-6 space-y-5 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Audit Trail</h1>
          <p className="text-xs text-gray-500 mt-0.5">Complete chronological log of all ADE actions and system events</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => showToast('Audit log exported to CSV', 'success')}>
          <ScrollText size={13} /> Export Log
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter size={13} className="text-gray-400" />
        <span className="text-xs text-gray-400">Filter by ADE:</span>
        <div className="flex gap-1 flex-wrap">
          {ades.map(a => (
            <button
              key={a}
              onClick={() => setFilterAde(a)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filterAde === a ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-gray-900">System Event Log</h3>
            <Badge variant="neutral">{filtered.length} entries</Badge>
          </div>
        </CardHeader>
        <div className="divide-y divide-gray-100">
          {filtered.map(entry => (
            <div key={entry.id}>
              <div
                className="px-5 py-3.5 flex items-start gap-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setExpandedRow(expandedRow === entry.id ? null : entry.id)}
              >
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  entry.status === 'Escalated' ? 'bg-orange-500' :
                  entry.status === 'Completed' ? 'bg-green-500' :
                  entry.status === 'Pending Approval' ? 'bg-yellow-400' : 'bg-blue-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-[10px] text-gray-400">{entry.id}</span>
                    <span className="text-[10px] text-gray-400">{entry.timestamp}</span>
                    <Badge variant="navy" className="text-[10px]">{entry.ade}</Badge>
                    {entry.project !== 'All' && entry.project !== 'N/A' && (
                      <Badge variant="neutral" className="text-[10px]">{entry.project}</Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-800 mt-0.5">{entry.action}</div>
                  <div className="text-xs text-gray-400 mt-0.5">User: {entry.user}</div>
                </div>
                <Badge variant={
                  entry.status === 'Escalated' ? 'orange' :
                  entry.status === 'Completed' ? 'success' :
                  entry.status === 'Pending Approval' ? 'warning' : 'info'
                }>
                  {entry.status}
                </Badge>
              </div>
              {expandedRow === entry.id && (
                <div className="px-12 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div><span className="text-gray-400">Audit ID:</span> <span className="font-semibold">{entry.id}</span></div>
                    <div><span className="text-gray-400">ADE:</span> <span className="font-semibold">{entry.ade}</span></div>
                    <div><span className="text-gray-400">Project:</span> <span className="font-semibold">{entry.project}</span></div>
                    <div><span className="text-gray-400">Timestamp:</span> <span className="font-semibold">{entry.timestamp}</span></div>
                    <div><span className="text-gray-400">Initiated By:</span> <span className="font-semibold">{entry.user}</span></div>
                    <div><span className="text-gray-400">Resolution:</span> <span className="font-semibold">{entry.status}</span></div>
                    <div className="col-span-3"><span className="text-gray-400">Full Action:</span> <span className="font-semibold">{entry.action}</span></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
