import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Star, RefreshCw, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Table, Thead, Th, Tbody, Tr, Td } from '../components/ui/Table';
import { Drawer } from '../components/ui/Drawer';
import { ConfidenceMeter } from '../components/ui/ConfidenceMeter';
import { materialRequests, vendorComparisons, invoices } from '../data/mockData';
import { showToast } from '../components/ui/Toast';
import { WorkflowRunner } from '../components/WorkflowRunner';
import { petraSteps } from '../data/workflowSteps';

const WorkflowSteps = ({ current }: { current: number }) => {
  const steps = ['Intake', 'Parsing', 'Classification', 'ADE Assigned', 'Cross-Check', 'Exception', 'Output'];
  return (
    <div className="flex items-center gap-1 py-3 overflow-x-auto">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap ${
            i < current ? 'bg-green-100 text-green-700' :
            i === current ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-400'
          }`}>
            {i < current && <CheckCircle size={10} />}
            {i === current && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full pulse-dot" />}
            {s}
          </div>
          {i < steps.length - 1 && <div className={`w-4 h-px flex-shrink-0 ${i < current ? 'bg-green-300' : 'bg-gray-200'}`} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Purchasing = () => {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('requests');
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);

  const anomalyInvoices = invoices.filter(i => i.status === 'Anomaly');

  return (
    <div className="p-6 space-y-5 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">PETRA <span className="text-gray-400 font-normal text-base">— Purchasing ADE</span></h1>
          <p className="text-xs text-gray-500 mt-0.5">Procurement Evaluation & Transaction Routing Agent · Vendor comparison · Invoice review · Material sourcing · Returns & credits</p>
        </div>
        <div className="text-xs text-gray-400">Confidence: <strong className="text-gray-800">94%</strong></div>
      </div>

      {/* Workflow Runner */}
      <WorkflowRunner
        adeName="PETRA"
        adeColor="orange"
        triggerLabel="Run PETRA Procurement Cycle"
        triggerDescription="PETRA will scan the inbox for material requests, perform vendor comparisons, generate purchase orders, review invoices for pricing anomalies, and route escalations — autonomously."
        steps={petraSteps}
        completionSummary="1 PO set pending approval · 1 invoice anomaly escalated · 1 invoice approved"
      />

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {[
          { id: 'requests', label: 'Material Requests' },
          { id: 'vendors', label: 'Vendor Comparison' },
          { id: 'invoices', label: 'Invoice Review' },
          { id: 'returns', label: 'Returns & Credits' },
          { id: 'email', label: 'Email Drafts' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === t.id ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Material Requests Tab */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-gray-900">Incoming Material Requests</h3>
                <Badge variant="info">{materialRequests.length} Requests</Badge>
              </div>
            </CardHeader>
            <Table>
              <Thead>
                <tr>
                  <Th>Request ID</Th>
                  <Th>Project</Th>
                  <Th>Supervisor</Th>
                  <Th>Items</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </tr>
              </Thead>
              <Tbody>
                {materialRequests.map(r => (
                  <Tr key={r.id} onClick={() => setSelectedRequest(r)}>
                    <Td><span className="font-mono text-xs text-navy-700 font-semibold">{r.id}</span></Td>
                    <Td><span className="font-medium">{r.project}</span></Td>
                    <Td>{r.supervisor}</Td>
                    <Td>{r.items.length} line items</Td>
                    <Td className="text-gray-400 text-xs">{r.date}</Td>
                    <Td>
                      <Badge variant={r.status === 'Complete' ? 'success' : r.status === 'Approval Required' ? 'warning' : 'info'}>
                        {r.status}
                      </Badge>
                    </Td>
                    <Td><ChevronDown size={14} className="text-gray-400" /></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Card>
        </div>
      )}

      {/* Vendor Comparison Tab */}
      {activeTab === 'vendors' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <RefreshCw size={14} className="text-blue-600 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-blue-900">Active Comparison: MR-0118 — 4/0 THHN Copper Wire (5,000 ft)</div>
                <div className="text-xs text-blue-700 mt-0.5">P-2148 · Riverside Commerce Center · Requested by M. Torres</div>
              </div>
            </div>
            <WorkflowSteps current={6} />
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-gray-900">Vendor Comparison Matrix — 4/0 THHN Copper (5,000 ft)</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">ADE Confidence:</span>
                  <div className="w-24"><ConfidenceMeter score={94} /></div>
                </div>
              </div>
            </CardHeader>
            <Table>
              <Thead>
                <tr>
                  <Th>Vendor</Th>
                  <Th>Unit Price /ft</Th>
                  <Th>Total (5,000ft)</Th>
                  <Th>Stock</Th>
                  <Th>Lead Days</Th>
                  <Th>ADE Score</Th>
                  <Th>Recommendation</Th>
                </tr>
              </Thead>
              <Tbody>
                {vendorComparisons.map(v => (
                  <Tr key={v.vendor} className={v.recommended ? 'bg-green-50' : ''}>
                    <Td>
                      <div className="flex items-center gap-2">
                        {v.recommended && <Star size={12} className="text-green-600 fill-green-400" />}
                        <span className="font-medium">{v.vendor}</span>
                      </div>
                    </Td>
                    <Td>
                      <span className={`font-mono font-semibold ${v.recommended ? 'text-green-700' : v.vendor === 'Graybar Electric' ? 'text-red-600' : 'text-gray-700'}`}>
                        ${v.price.toFixed(2)}
                      </span>
                    </Td>
                    <Td className="font-semibold">${(v.price * 5000).toLocaleString()}</Td>
                    <Td>
                      <Badge variant={v.stock === 'In Stock' ? 'success' : 'warning'}>{v.stock}</Badge>
                    </Td>
                    <Td>{v.leadDays} day{v.leadDays !== 1 ? 's' : ''}</Td>
                    <Td>
                      <div className="w-20"><ConfidenceMeter score={v.score} /></div>
                    </Td>
                    <Td>
                      {v.recommended
                        ? <Badge variant="success">✓ Recommended</Badge>
                        : <span className="text-xs text-gray-400">—</span>}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <CardBody className="bg-green-50 border-t border-green-100">
              <div className="flex items-start gap-3">
                <CheckCircle size={16} className="text-green-600 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-green-900">Recommendation: CED — Save $2,350 vs. current Graybar pricing</div>
                  <div className="text-xs text-green-700 mt-0.5">In stock · 1-day lead · 19.7% price advantage · Invoice INV-8841 Graybar anomaly already flagged</div>
                </div>
                <Button variant="primary" size="sm" onClick={() => showToast('Split order recommendation sent for approval', 'success')}>
                  Approve & Order
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-sm text-gray-900">Approval Threshold Check</h3>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded p-3">
                  <div className="text-xs text-gray-400">Order Total</div>
                  <div className="text-lg font-bold text-gray-900 mt-1">$10,700</div>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <div className="text-xs text-gray-400">Approval Threshold</div>
                  <div className="text-lg font-bold text-gray-900 mt-1">$25,000</div>
                </div>
                <div className="bg-green-50 rounded p-3 border border-green-200">
                  <div className="text-xs text-gray-400">Status</div>
                  <div className="text-sm font-bold text-green-700 mt-1 flex items-center gap-1"><CheckCircle size={14} /> Below Threshold</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Invoice Review Tab */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          {anomalyInvoices.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle size={16} className="text-red-600 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-red-900">{anomalyInvoices.length} Invoice Anomalies Detected</div>
                <div className="text-xs text-red-700 mt-0.5">Pricing deviates materially from PO rates. Approval required before payment.</div>
              </div>
            </div>
          )}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-gray-900">Invoice Accuracy Review</h3>
                <Badge variant="info">{invoices.length} Invoices</Badge>
              </div>
            </CardHeader>
            <Table>
              <Thead>
                <tr>
                  <Th>Invoice</Th>
                  <Th>Vendor</Th>
                  <Th>Project</Th>
                  <Th>PO</Th>
                  <Th>Ordered</Th>
                  <Th>Invoiced</Th>
                  <Th>Variance</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </tr>
              </Thead>
              <Tbody>
                {invoices.map(inv => {
                  const variance = inv.amount - inv.ordered;
                  const pct = ((variance / inv.ordered) * 100).toFixed(1);
                  return (
                    <React.Fragment key={inv.id}>
                      <Tr onClick={() => setExpandedInvoice(expandedInvoice === inv.id ? null : inv.id)}>
                        <Td><span className="font-mono text-xs font-semibold text-navy-700">{inv.id}</span></Td>
                        <Td>{inv.vendor}</Td>
                        <Td>{inv.project}</Td>
                        <Td className="text-xs text-gray-500">{inv.po}</Td>
                        <Td className="font-mono text-xs">${inv.ordered.toLocaleString()}</Td>
                        <Td className="font-mono text-xs font-semibold">${inv.amount.toLocaleString()}</Td>
                        <Td>
                          {variance !== 0 ? (
                            <span className={`text-xs font-semibold ${variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {variance > 0 ? '+' : ''}{Number(pct)}% (${Math.abs(variance).toLocaleString()})
                            </span>
                          ) : <span className="text-xs text-gray-400">—</span>}
                        </Td>
                        <Td>
                          <Badge variant={inv.status === 'Anomaly' ? 'danger' : inv.status === 'Approved' ? 'success' : 'neutral'}>
                            {inv.status}
                          </Badge>
                        </Td>
                        <Td>{expandedInvoice === inv.id ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}</Td>
                      </Tr>
                      {expandedInvoice === inv.id && (
                        <tr>
                          <td colSpan={9} className="px-4 py-4 bg-gray-50">
                            <div className="text-xs font-semibold text-gray-600 mb-2">Line Item Detail</div>
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="text-gray-500">
                                  <th className="text-left pb-1">Description</th>
                                  <th className="text-right pb-1">Qty</th>
                                  <th className="text-right pb-1">UOM</th>
                                  <th className="text-right pb-1">PO Unit $</th>
                                  <th className="text-right pb-1">Inv Unit $</th>
                                  <th className="text-right pb-1">Variance</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {inv.lineItems.map((li: any, idx: number) => {
                                  const v = li.unitInvoiced - li.unitOrdered;
                                  return (
                                    <tr key={idx} className={v > 0 ? 'bg-red-50' : ''}>
                                      <td className="py-1.5 pr-4">{li.desc}</td>
                                      <td className="text-right">{li.qty}</td>
                                      <td className="text-right text-gray-400">{li.uom}</td>
                                      <td className="text-right font-mono">${li.unitOrdered.toFixed(2)}</td>
                                      <td className="text-right font-mono font-semibold">${li.unitInvoiced.toFixed(2)}</td>
                                      <td className={`text-right font-semibold ${v > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                                        {v > 0 ? `+$${v.toFixed(2)}` : '—'}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </Tbody>
            </Table>
          </Card>
        </div>
      )}

      {/* Returns Tab */}
      {activeTab === 'returns' && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-sm text-gray-900">Returns & Credits Tracker</h3>
          </CardHeader>
          <CardBody>
            <div className="text-center py-8 text-gray-400">
              <RefreshCw size={24} className="mx-auto mb-2 opacity-40" />
              <div className="text-sm">No open return requests at this time</div>
              <div className="text-xs mt-1">Returns and credit memos will appear here when initiated</div>
              <Button variant="secondary" size="sm" className="mt-3" onClick={() => showToast('Return request form opened', 'success')}>
                Initiate Return Request
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Email Drafts Tab */}
      {activeTab === 'email' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-900">Vendor Email Draft — INV-8841 Dispute</h3>
              <Button variant="secondary" size="sm">
                <Mail size={13} /> Send via Email
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs text-gray-700 whitespace-pre-line leading-relaxed">
{`To: accounts@graybarelectric.com
CC: d.harmon@summitelectrical.com
Subject: Pricing Discrepancy — Invoice INV-8841 / PO-2148-01

Graybar Team,

We have reviewed Invoice INV-8841 dated March 12, 2026, and identified a pricing discrepancy on line item 4/0 THHN Copper Wire:

  - PO-2148-01 Unit Rate: $2.18/ft
  - Invoiced Unit Rate: $2.61/ft
  - Variance: +$0.43/ft (+19.7%)
  - Quantity: 5,000 ft
  - Total Overbill: $2,150.00

Please issue a corrected invoice or credit memo for $2,150.00 at your earliest convenience. We are placing the invoice on hold pending resolution.

Reference: PO-2148-01 · INV-8841 · Project P-2148

Thank you,
Summit Electrical — Purchasing Department`}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Material Request Drawer */}
      <Drawer open={!!selectedRequest} onClose={() => setSelectedRequest(null)} title={`Material Request — ${selectedRequest?.id}`}>
        {selectedRequest && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded p-3"><div className="text-xs text-gray-400">Project</div><div className="font-semibold mt-0.5">{selectedRequest.project}</div></div>
              <div className="bg-gray-50 rounded p-3"><div className="text-xs text-gray-400">Supervisor</div><div className="font-semibold mt-0.5">{selectedRequest.supervisor}</div></div>
              <div className="bg-gray-50 rounded p-3"><div className="text-xs text-gray-400">Date</div><div className="font-semibold mt-0.5">{selectedRequest.date}</div></div>
              <div className="bg-gray-50 rounded p-3"><div className="text-xs text-gray-400">Status</div><div className="font-semibold mt-0.5">{selectedRequest.status}</div></div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700 mb-2">Line Items</div>
              {selectedRequest.items.map((item: any, i: number) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                  <div className="text-sm text-gray-800">{item.desc}</div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{item.qty}</span>
                    <Badge variant={item.urgency === 'Rush' ? 'danger' : 'neutral'}>{item.urgency}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs font-semibold text-gray-500 mb-2 mt-4">Workflow Status</div>
            <WorkflowSteps current={3} />
            <Button variant="orange" className="w-full justify-center" onClick={() => { showToast('Vendor comparison initiated', 'success'); setSelectedRequest(null); }}>
              Run Vendor Comparison
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
};
