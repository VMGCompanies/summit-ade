import React, { useState } from 'react';
import { CheckCircle, XCircle, MessageSquare, Clock, AlertTriangle, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Drawer } from '../components/ui/Drawer';
import { ConfidenceMeter } from '../components/ui/ConfidenceMeter';
import { approvals } from '../data/mockData';
import { showToast } from '../components/ui/Toast';

export const Approvals = () => {
  const [selectedApproval, setSelectedApproval] = useState<any>(null);
  const [approved, setApproved] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  const handleApprove = (id: string) => {
    setApproved(p => [...p, id]);
    showToast(`Approval ${id} approved and logged`, 'success');
    setSelectedApproval(null);
  };

  const handleReject = (id: string) => {
    setRejected(p => [...p, id]);
    showToast(`Approval ${id} rejected and returned`, 'error');
    setSelectedApproval(null);
  };

  const getStatus = (a: any) => {
    if (approved.includes(a.id)) return 'Approved';
    if (rejected.includes(a.id)) return 'Rejected';
    return a.status;
  };

  return (
    <div className="p-6 space-y-5 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Approvals Center</h1>
          <p className="text-xs text-gray-500 mt-0.5">Review and action all pending ADE-triggered approvals</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-400">Approval Threshold: <strong className="text-gray-700">$25,000</strong></div>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending', value: approvals.filter(a => !approved.includes(a.id) && !rejected.includes(a.id)).length, color: 'bg-orange-500' },
          { label: 'Approved', value: approved.length, color: 'bg-green-600' },
          { label: 'Rejected', value: rejected.length, color: 'bg-red-500' },
        ].map(k => (
          <Card key={k.label}>
            <CardBody className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded ${k.color} flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">{k.value}</span>
              </div>
              <div className="text-sm font-semibold text-gray-700">{k.label} Approvals</div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Approvals List */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-sm text-gray-900">Pending Approvals Queue</h3>
        </CardHeader>
        <div className="divide-y divide-gray-100">
          {approvals.map(a => {
            const status = getStatus(a);
            return (
              <div
                key={a.id}
                className={`px-5 py-4 flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  status === 'Approved' ? 'opacity-60' : status === 'Rejected' ? 'opacity-50' : ''
                }`}
                onClick={() => setSelectedApproval(a)}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  a.urgency === 'High' ? 'bg-red-100' : 'bg-yellow-100'
                }`}>
                  <AlertTriangle size={15} className={a.urgency === 'High' ? 'text-red-600' : 'text-yellow-600'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-xs font-semibold text-navy-700">{a.id}</span>
                    <Badge variant={a.urgency === 'High' ? 'danger' : 'warning'}>{a.urgency}</Badge>
                    <Badge variant="navy">{a.type}</Badge>
                  </div>
                  <div className="text-sm text-gray-800">{a.description}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">Project: {a.project}</span>
                    <span className="text-xs text-gray-400">Requested by: {a.requestedBy}</span>
                    <span className="text-xs text-gray-400">{a.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">${a.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Exposure</div>
                  </div>
                  <Badge variant={
                    status === 'Approved' ? 'success' :
                    status === 'Rejected' ? 'danger' : 'neutral'
                  }>
                    {status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Approval Detail Drawer */}
      <Drawer open={!!selectedApproval} onClose={() => setSelectedApproval(null)} title={`Approval Detail — ${selectedApproval?.id}`}>
        {selectedApproval && (
          <div className="p-5 space-y-4">
            {/* Type & Urgency */}
            <div className="flex items-center gap-2">
              <Badge variant={selectedApproval.urgency === 'High' ? 'danger' : 'warning'}>{selectedApproval.urgency} Priority</Badge>
              <Badge variant="navy">{selectedApproval.type}</Badge>
            </div>

            {/* Summary */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-sm font-semibold text-gray-900 mb-1">Description</div>
              <div className="text-sm text-gray-700">{selectedApproval.description}</div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Approval ID', value: selectedApproval.id },
                { label: 'Project', value: selectedApproval.project },
                { label: 'Financial Exposure', value: `$${selectedApproval.amount.toLocaleString()}` },
                { label: 'Requested By', value: selectedApproval.requestedBy },
                { label: 'Date Triggered', value: selectedApproval.date },
                { label: 'Current Status', value: getStatus(selectedApproval) },
              ].map(f => (
                <div key={f.label} className="bg-gray-50 rounded p-3">
                  <div className="text-xs text-gray-400">{f.label}</div>
                  <div className="font-semibold text-sm mt-0.5">{f.value}</div>
                </div>
              ))}
            </div>

            {/* Routing */}
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-2">ROUTING HISTORY</div>
              <div className="space-y-2">
                {[
                  { from: selectedApproval.requestedBy, to: 'Approvals Center', date: selectedApproval.date, note: 'Auto-escalated by ADE' },
                  { from: 'Approvals Center', to: 'D. Harmon (PM)', date: selectedApproval.date, note: 'Awaiting review' },
                ].map((r, i) => (
                  <div key={i} className="text-xs text-gray-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-navy-400 rounded-full" />
                    <span>{r.from} → {r.to}</span>
                    <span className="text-gray-400">{r.date}</span>
                    <span className="text-gray-400">· {r.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-1.5">ADD COMMENT (OPTIONAL)</div>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={2}
                placeholder="Enter reason for approval or rejection..."
                className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-navy-400 resize-none"
              />
            </div>

            {/* Actions */}
            {getStatus(selectedApproval) === 'Pending' ? (
              <div className="flex gap-2 pt-2 border-t border-gray-200">
                <Button
                  variant="primary"
                  className="flex-1 justify-center"
                  onClick={() => handleApprove(selectedApproval.id)}
                >
                  <CheckCircle size={14} /> Approve
                </Button>
                <Button
                  variant="danger"
                  className="flex-1 justify-center"
                  onClick={() => handleReject(selectedApproval.id)}
                >
                  <XCircle size={14} /> Reject
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 justify-center"
                  onClick={() => { showToast('Changes requested — returned to ADE', 'warning'); setSelectedApproval(null); }}
                >
                  <MessageSquare size={14} /> Request Changes
                </Button>
              </div>
            ) : (
              <div className={`p-3 rounded text-sm font-semibold text-center ${
                getStatus(selectedApproval) === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {getStatus(selectedApproval) === 'Approved' ? '✓ Approved' : '✗ Rejected'}
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};
