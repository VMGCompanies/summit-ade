import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, TrendingUp, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Table, Thead, Th, Tbody, Tr, Td } from '../components/ui/Table';
import { Drawer } from '../components/ui/Drawer';
import { purchaseOrders, invoices, projects } from '../data/mockData';
import { showToast } from '../components/ui/Toast';
import { WorkflowRunner } from '../components/WorkflowRunner';
import { pascalSteps } from '../data/workflowSteps';

export const POCompliance = () => {
  const [selectedPO, setSelectedPO] = useState<any>(null);

  const billedByProject = projects.map(p => ({
    name: p.id,
    budget: p.budget / 1000,
    billed: p.billed / 1000,
    pct: Math.round((p.billed / p.budget) * 100),
  }));

  return (
    <div className="p-6 space-y-5 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">PASCAL <span className="text-gray-400 font-normal text-base">— PO Management ADE</span></h1>
          <p className="text-xs text-gray-500 mt-0.5">Purchase Order Supervisory Control & Ledger · PO tracking · Invoice reconciliation · Overrun detection · Weekly reports</p>
        </div>
      </div>

      {/* Workflow Runner */}
      <WorkflowRunner
        adeName="PASCAL"
        adeColor="orange"
        triggerLabel="Run PASCAL Budget Monitoring Cycle"
        triggerDescription="PASCAL will review all active POs against their authorized amounts, flag overruns and 80% threshold warnings, escalate to the responsible managers, and distribute the weekly PO status report."
        steps={pascalSteps}
        completionSummary="6 POs reviewed · 3 escalations sent · 1 weekly report distributed"
      />

      {/* Overrun Alert */}
      <div className="bg-red-50 border border-red-300 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <div className="text-sm font-bold text-red-900">PO Overrun Alert — PO-2201-07</div>
          <div className="text-xs text-red-700 mt-0.5">
            Billed $126,440 against $122,000 approved PO. Overrun: $4,440 (3.6%). Manager T. Nguyen notified. Approval required to continue billing.
          </div>
        </div>
        <Button variant="danger" size="sm" onClick={() => showToast('Escalation sent to T. Nguyen', 'success')}>Escalate</Button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* PO Register */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-gray-900">PO Register</h3>
                <Badge variant="info">{purchaseOrders.length} Active POs</Badge>
              </div>
            </CardHeader>
            <Table>
              <Thead>
                <tr>
                  <Th>PO Number</Th>
                  <Th>Project</Th>
                  <Th>Vendor</Th>
                  <Th>Manager</Th>
                  <Th>PO Amount</Th>
                  <Th>Billed</Th>
                  <Th>% Used</Th>
                  <Th>Status</Th>
                </tr>
              </Thead>
              <Tbody>
                {purchaseOrders.map(po => {
                  const pct = Math.round((po.billed / po.amount) * 100);
                  return (
                    <Tr key={po.id} onClick={() => setSelectedPO(po)}>
                      <Td><span className="font-mono text-xs font-semibold text-navy-700">{po.id}</span></Td>
                      <Td><span className="font-medium">{po.project}</span></Td>
                      <Td className="text-xs">{po.vendor}</Td>
                      <Td className="text-xs">{po.manager}</Td>
                      <Td className="font-mono text-xs">${po.amount.toLocaleString()}</Td>
                      <Td className="font-mono text-xs font-semibold">${po.billed.toLocaleString()}</Td>
                      <Td>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${pct > 100 ? 'bg-red-500' : pct > 85 ? 'bg-orange-400' : 'bg-navy-600'}`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                          <span className={`text-xs font-semibold ${pct > 100 ? 'text-red-600' : 'text-gray-600'}`}>{pct}%</span>
                        </div>
                      </Td>
                      <Td>
                        <Badge variant={po.status === 'Overrun' ? 'danger' : po.status === 'Watch' ? 'warning' : 'success'}>
                          {po.status}
                        </Badge>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Card>
        </div>

        {/* Summary KPIs */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {[
            { label: 'Total PO Value', value: '$366,450', icon: FileText, color: 'text-navy-900' },
            { label: 'Total Billed', value: '$309,394', icon: TrendingUp, color: 'text-blue-600' },
            { label: 'Overrun Exposure', value: '$4,440', icon: AlertTriangle, color: 'text-red-600' },
          ].map(k => (
            <Card key={k.label}>
              <CardBody className="flex items-center gap-3">
                <k.icon size={18} className={k.color} />
                <div>
                  <div className="text-xs text-gray-400">{k.label}</div>
                  <div className={`text-lg font-bold ${k.color}`}>{k.value}</div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Billed by Project Chart */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-sm text-gray-900">Billed-to-Date by Project (in $K)</h3>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={billedByProject} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v: any, name: any) => [`$${(v * 1000).toLocaleString()}`, name === 'budget' ? 'Budget' : 'Billed']}
                contentStyle={{ fontSize: 11, borderRadius: 6 }}
              />
              <Bar dataKey="budget" name="Budget" fill="#e2e8f0" radius={[3, 3, 0, 0]} />
              <Bar dataKey="billed" name="Billed" radius={[3, 3, 0, 0]}>
                {billedByProject.map((entry, i) => (
                  <Cell key={i} fill={entry.pct > 100 ? '#ef4444' : entry.pct > 85 ? '#f97316' : '#1B2E5E'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* Invoice to PO Reconciliation */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-sm text-gray-900">Invoice-to-PO Reconciliation</h3>
        </CardHeader>
        <Table>
          <Thead>
            <tr>
              <Th>Invoice</Th>
              <Th>PO</Th>
              <Th>Vendor</Th>
              <Th>PO Amount</Th>
              <Th>Invoice Amount</Th>
              <Th>Variance $</Th>
              <Th>Variance %</Th>
              <Th>Match</Th>
            </tr>
          </Thead>
          <Tbody>
            {invoices.map(inv => {
              const po = purchaseOrders.find(p => p.id === inv.po);
              const variance = inv.amount - inv.ordered;
              const pct = ((variance / inv.ordered) * 100).toFixed(1);
              return (
                <Tr key={inv.id}>
                  <Td><span className="font-mono text-xs font-semibold text-navy-700">{inv.id}</span></Td>
                  <Td className="text-xs text-gray-500">{inv.po}</Td>
                  <Td className="text-xs">{inv.vendor}</Td>
                  <Td className="font-mono text-xs">${inv.ordered.toLocaleString()}</Td>
                  <Td className="font-mono text-xs font-semibold">${inv.amount.toLocaleString()}</Td>
                  <Td className={`font-mono text-xs font-semibold ${variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {variance > 0 ? '+' : ''}${variance.toLocaleString()}
                  </Td>
                  <Td className={`text-xs font-semibold ${variance > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                    {variance !== 0 ? `${variance > 0 ? '+' : ''}${pct}%` : '—'}
                  </Td>
                  <Td>
                    {variance === 0
                      ? <Badge variant="success"><CheckCircle size={10} className="mr-1" />Matched</Badge>
                      : <Badge variant="danger"><AlertTriangle size={10} className="mr-1" />Variance</Badge>}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Card>

      {/* PO Detail Drawer */}
      <Drawer open={!!selectedPO} onClose={() => setSelectedPO(null)} title={`PO Detail — ${selectedPO?.id}`}>
        {selectedPO && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: 'Project', value: selectedPO.project },
                { label: 'Vendor', value: selectedPO.vendor },
                { label: 'Manager', value: selectedPO.manager },
                { label: 'Date', value: selectedPO.date },
                { label: 'PO Amount', value: `$${selectedPO.amount.toLocaleString()}` },
                { label: 'Billed', value: `$${selectedPO.billed.toLocaleString()}` },
              ].map(f => (
                <div key={f.label} className="bg-gray-50 rounded p-3">
                  <div className="text-xs text-gray-400">{f.label}</div>
                  <div className="font-semibold mt-0.5">{f.value}</div>
                </div>
              ))}
            </div>
            {selectedPO.status === 'Overrun' && (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <div className="text-sm font-bold text-red-900">⚠ Overrun Detected</div>
                <div className="text-xs text-red-700 mt-1">
                  Overbilled by ${(selectedPO.billed - selectedPO.amount).toLocaleString()} ({Math.round(((selectedPO.billed - selectedPO.amount) / selectedPO.amount) * 100)}%)
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="primary" size="sm" className="flex-1 justify-center" onClick={() => showToast('Backup package assembled', 'success')}>
                Assemble Backup Package
              </Button>
              <Button variant="secondary" size="sm" className="flex-1 justify-center" onClick={() => showToast('Manager notified', 'success')}>
                Notify Manager
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
