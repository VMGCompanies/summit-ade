import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, FileText, Download, Flag } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Table, Thead, Th, Tbody, Tr, Td } from '../components/ui/Table';
import { ConfidenceMeter } from '../components/ui/ConfidenceMeter';
import { specItems, takeoffItems } from '../data/mockData';
import { showToast } from '../components/ui/Toast';

export const Estimating = () => {
  const [activeTab, setActiveTab] = useState('specs');
  const [activeTakeoff, setActiveTakeoff] = useState('lighting');

  const flaggedSpecs = specItems.filter(s => s.flag);

  return (
    <div className="p-6 space-y-5 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Estimating ADE</h1>
          <p className="text-xs text-gray-500 mt-0.5">Spec review · Cost impact analysis · Addendum comparison · Takeoff categorization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => showToast('Estimating review memo exported', 'success')}>
            <Download size={13} /> Export Memo
          </Button>
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded px-3 py-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full pulse-dot" />
            <span className="text-xs font-medium text-green-700">Reviewing P-2402</span>
          </div>
        </div>
      </div>

      {/* Cost impact summary alert */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Flag size={15} className="text-orange-600 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm font-bold text-orange-900">4 Cost-Impacting Spec Items Found — P-2402 Lakeside Medical Expansion</div>
            <div className="text-xs text-orange-700 mt-1">
              Division 26 spec review complete. Items outside standard inclusions identified. Estimated add: $18,400–$24,800 depending on takeoff quantities.
            </div>
          </div>
          <div className="text-xs text-gray-400">Confidence: <strong className="text-gray-700">91%</strong></div>
        </div>
        <div className="mt-3 w-full max-w-xs"><ConfidenceMeter score={91} /></div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {[
          { id: 'specs', label: 'Spec Risk Summary' },
          { id: 'addendum', label: 'Addendum Delta' },
          { id: 'takeoff', label: 'Takeoff Workspace' },
          { id: 'queue', label: 'Spec Intake Queue' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === t.id ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
            {t.id === 'specs' && flaggedSpecs.length > 0 && (
              <span className="ml-2 bg-orange-100 text-orange-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{flaggedSpecs.length}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'specs' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-gray-900">Division 26 Spec Risk Analysis — P-2402</h3>
                <Badge variant="warning">{flaggedSpecs.length} Items Flagged</Badge>
              </div>
            </CardHeader>
            <Table>
              <Thead>
                <tr>
                  <Th>Section</Th>
                  <Th>Title</Th>
                  <Th>Cost Impact</Th>
                  <Th>Flag</Th>
                  <Th>ADE Note</Th>
                </tr>
              </Thead>
              <Tbody>
                {specItems.map(s => (
                  <Tr key={s.section} className={s.flag ? 'bg-orange-50/50' : ''}>
                    <Td><span className="font-mono text-xs font-semibold text-navy-700">{s.section}</span></Td>
                    <Td className="font-medium text-sm">{s.title}</Td>
                    <Td>
                      <Badge variant={s.costImpact === 'High' ? 'danger' : s.costImpact === 'Medium' ? 'warning' : 'success'}>
                        {s.costImpact}
                      </Badge>
                    </Td>
                    <Td>
                      {s.flag
                        ? <Badge variant="orange"><Flag size={10} className="mr-1" />Flagged</Badge>
                        : <Badge variant="neutral"><CheckCircle size={10} className="mr-1" />Clear</Badge>}
                    </Td>
                    <Td className="text-xs text-gray-600 max-w-[280px]">{s.notes}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-sm text-gray-900">Cost Impact Summary</h3>
            </CardHeader>
            <CardBody className="space-y-3">
              {specItems.filter(s => s.flag).map(s => (
                <div key={s.section} className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-100 rounded-lg">
                  <AlertTriangle size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-gray-800">{s.section} — {s.title}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{s.notes}</div>
                  </div>
                  <Badge variant={s.costImpact === 'High' ? 'danger' : 'warning'}>{s.costImpact} Impact</Badge>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === 'addendum' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-900">Addendum 3 vs. Base Spec — Delta Analysis</h3>
              <Badge variant="warning">2 Changes Found</Badge>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            {[
              {
                section: '26 24 16 — Panelboards',
                change: 'Specification updated: Panel bus material changed from aluminum to copper bus bar throughout.',
                impact: 'High',
                delta: '+ $540 per panel (est.)',
                type: 'Added Scope',
              },
              {
                section: '26 51 00 — Interior Lighting',
                change: 'Emergency battery requirement increased from 10% to 15% of interior fixtures.',
                impact: 'Medium',
                delta: '+ ~$1,200 (est.)',
                type: 'Modified Scope',
              },
            ].map((c, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="text-xs text-gray-400 mb-1">BASE SPEC</div>
                  <div className="text-xs font-semibold text-gray-700 mb-2">{c.section}</div>
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">[Original spec language — no emergency backup change / aluminum bus]</div>
                </div>
                <div>
                  <div className="text-xs text-orange-600 font-semibold mb-1">ADDENDUM 3 CHANGE</div>
                  <div className="text-xs font-semibold text-gray-700 mb-2">{c.section}</div>
                  <div className="text-xs text-orange-800 bg-orange-50 border border-orange-200 p-2 rounded">{c.change}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={c.impact === 'High' ? 'danger' : 'warning'}>{c.impact} Impact</Badge>
                    <span className="text-xs font-semibold text-orange-700">{c.delta}</span>
                    <Badge variant="orange">{c.type}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      )}

      {activeTab === 'takeoff' && (
        <div className="space-y-4">
          <div className="flex gap-1">
            {['lighting', 'power', 'distribution'].map(t => (
              <button
                key={t}
                onClick={() => setActiveTakeoff(t)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors capitalize ${
                  activeTakeoff === t ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-gray-900">
                  Takeoff — {activeTakeoff.charAt(0).toUpperCase() + activeTakeoff.slice(1)} — P-2402
                </h3>
                <Button variant="secondary" size="sm" onClick={() => showToast('Takeoff exported', 'success')}>
                  <Download size={13} /> Export
                </Button>
              </div>
            </CardHeader>
            <Table>
              <Thead>
                <tr>
                  <Th>Item ID</Th>
                  <Th>Description</Th>
                  <Th>Qty</Th>
                  <Th>Unit</Th>
                  <Th>Notes</Th>
                </tr>
              </Thead>
              <Tbody>
                {(takeoffItems as any)[activeTakeoff].map((item: any) => (
                  <Tr key={item.id}>
                    <Td><span className="font-mono text-xs font-semibold text-navy-700">{item.id}</span></Td>
                    <Td className="font-medium text-sm">{item.desc}</Td>
                    <Td className="font-semibold">{item.qty}</Td>
                    <Td className="text-xs text-gray-500">{item.unit}</Td>
                    <Td>
                      {item.note
                        ? <span className="text-xs text-orange-700 bg-orange-50 px-2 py-0.5 rounded">{item.note}</span>
                        : <span className="text-xs text-gray-300">—</span>}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Card>
        </div>
      )}

      {activeTab === 'queue' && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-sm text-gray-900">Spec Intake Queue</h3>
          </CardHeader>
          <div className="divide-y divide-gray-100">
            {[
              { project: 'P-2402', name: 'Lakeside Medical — Division 26 Specs', date: '2026-03-14', status: 'Review Complete', pages: 184 },
              { project: 'P-2402', name: 'Addendum 3 — Lakeside Medical', date: '2026-03-16', status: 'Review Complete', pages: 12 },
              { project: 'P-2315', name: 'Metro Transit Depot — Division 16', date: '2026-03-17', status: 'In Review', pages: 98 },
              { project: 'P-2201', name: 'Highland School — Electrical Specs', date: '2026-03-10', status: 'Queued', pages: 142 },
            ].map((s, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-gray-50">
                <FileText size={14} className="text-navy-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.project} · {s.pages} pages · Uploaded {s.date}</div>
                </div>
                <Badge variant={s.status === 'Review Complete' ? 'success' : s.status === 'In Review' ? 'info' : 'neutral'}>
                  {s.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
