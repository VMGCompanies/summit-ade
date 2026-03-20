import React, { useState } from 'react';
import { X, Zap, ShoppingCart, FileText, Wrench, Calculator } from 'lucide-react';
import { Button } from './ui/Button';
import { showToast } from './ui/Toast';

const ades = [
  { id: 'purchasing', label: 'PETRA — Purchasing', icon: ShoppingCart, desc: 'Vendor comparison, invoice review, material sourcing' },
  { id: 'po', label: 'PASCAL — PO Management', icon: FileText, desc: 'PO tracking, invoice reconciliation, overrun alerts' },
  { id: 'tools', label: 'TITAN — Tool Tracking', icon: Wrench, desc: 'Pick tickets, inventory, field requests' },
  { id: 'estimating', label: 'Estimating ADE', icon: Calculator, desc: 'Spec review, cost impact, addendum analysis' },
];

export const NewWorkflowModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedAde, setSelectedAde] = useState('');
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    showToast(`Workflow submitted to ${ades.find(a => a.id === selectedAde)?.label}`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl w-[540px] max-h-[90vh] overflow-hidden fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy-900">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-orange-400" />
            <h2 className="text-white font-semibold text-base">New Workflow</h2>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white"><X size={18} /></button>
        </div>

        <div className="px-6 py-5">
          {step === 1 && (
            <div>
              <p className="text-sm text-gray-500 mb-4">Select the ADE to handle this workflow</p>
              <div className="grid grid-cols-2 gap-3">
                {ades.map(ade => {
                  const Icon = ade.icon;
                  return (
                    <button
                      key={ade.id}
                      onClick={() => setSelectedAde(ade.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        selectedAde === ade.id
                          ? 'border-navy-900 bg-navy-50'
                          : 'border-gray-200 hover:border-navy-300'
                      }`}
                    >
                      <Icon size={20} className={selectedAde === ade.id ? 'text-navy-900' : 'text-gray-400'} />
                      <div className="mt-2 font-semibold text-sm text-gray-900">{ade.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{ade.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <select
                  value={project}
                  onChange={e => setProject(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-500"
                >
                  <option value="">Select project...</option>
                  <option>P-2148 — Riverside Commerce Center</option>
                  <option>P-2201 — Highland School District Phase 2</option>
                  <option>P-2315 — Metro Transit Depot</option>
                  <option>P-2402 — Lakeside Medical Expansion</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Describe the task</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={4}
                  placeholder="E.g. Compare vendor pricing for 4/0 THHN for P-2148 field request..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-500 resize-none"
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-700">
                <strong>ADE:</strong> {ades.find(a => a.id === selectedAde)?.label} — will process this request and generate a structured output with findings, recommendations, and audit trail.
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          {step === 2 ? (
            <Button variant="secondary" size="sm" onClick={() => setStep(1)}>Back</Button>
          ) : <div />}
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
            {step === 1 ? (
              <Button variant="primary" size="sm" disabled={!selectedAde} onClick={() => setStep(2)}>
                Next <span className="text-xs">→</span>
              </Button>
            ) : (
              <Button variant="orange" size="sm" disabled={!project || !description} onClick={handleSubmit}>
                <Zap size={13} /> Submit Workflow
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
