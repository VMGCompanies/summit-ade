import React, { useState } from 'react';
import { Wrench, AlertTriangle, CheckCircle, Package, MapPin, Plus } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Table, Thead, Th, Tbody, Tr, Td } from '../components/ui/Table';
import { Drawer } from '../components/ui/Drawer';
import { tools, toolRequests, projects } from '../data/mockData';
import { showToast } from '../components/ui/Toast';
import { WorkflowRunner } from '../components/WorkflowRunner';
import { titanSteps } from '../data/workflowSteps';

export const ToolTracking = () => {
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('inventory');

  const inField = tools.filter(t => t.status === 'In Field').length;
  const inWarehouse = tools.filter(t => t.status === 'Warehouse').length;
  const missing = tools.filter(t => t.status === 'Missing').length;

  const filteredTools = filterStatus === 'All' ? tools : tools.filter(t => t.status === filterStatus);

  const handlePickTicket = () => {
    showToast('Daily pick ticket generated for March 18, 2026', 'success');
  };

  return (
    <div className="p-6 space-y-5 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">TITAN <span className="text-gray-400 font-normal text-base">— Tool Tracking ADE</span></h1>
          <p className="text-xs text-gray-500 mt-0.5">Tool Inventory Tracking & Allocation Network · Inventory · Field requests · Pick tickets · Location tracking</p>
        </div>
        <Button variant="orange" size="sm" onClick={() => showToast('Tool registration form opened', 'success')}>
          <Plus size={13} /> Add Tool
        </Button>
      </div>

      {/* Workflow Runner */}
      <WorkflowRunner
        adeName="TITAN"
        adeColor="orange"
        triggerLabel="Run TITAN Daily Dispatch Cycle"
        triggerDescription="TITAN will process all pending tool requests, check inventory availability, generate pick tickets, flag shortages, alert for overdue or missing tools, and compile the driver dispatch summary."
        steps={titanSteps}
        completionSummary="4 requests processed · 1 pick ticket issued · 2 shortage alerts · 1 loss report filed"
      />

      {/* Missing alert */}
      {missing > 0 && (
        <div className="bg-red-50 border border-red-300 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-bold text-red-900">Missing Tool Alert — Fluke 376 Clamp Meter #3 (FL376-003)</div>
            <div className="text-xs text-red-700 mt-0.5">Last assigned to P-2148 on Feb 15, 2026. Not returned — 31 days overdue. Estimated replacement value: $680. Manager notified.</div>
          </div>
          <Button variant="danger" size="sm" onClick={() => showToast('Loss report filed', 'success')}>File Loss Report</Button>
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Tools', value: tools.length, color: 'bg-navy-900', sub: 'In inventory' },
          { label: 'In Field', value: inField, color: 'bg-blue-600', sub: `${projects.length} projects` },
          { label: 'In Warehouse', value: inWarehouse, color: 'bg-green-600', sub: 'Available' },
          { label: 'Missing', value: missing, color: 'bg-red-500', sub: 'Action required', alert: true },
        ].map(k => (
          <Card key={k.label}>
            <CardBody className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg ${k.color} flex items-center justify-center`}>
                <Wrench size={16} className="text-white" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${k.alert && k.value > 0 ? 'text-red-600' : 'text-gray-900'}`}>{k.value}</div>
                <div className="text-[10px] text-gray-400">{k.label}</div>
                <div className="text-[10px] text-gray-400">{k.sub}</div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {['inventory', 'requests', 'pickticket', 'returns'].map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors capitalize ${
              activeTab === t ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'pickticket' ? 'Pick Ticket' : t === 'returns' ? 'Returns' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'inventory' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-900">Master Tool Inventory</h3>
              <div className="flex gap-1">
                {['All', 'In Field', 'Warehouse', 'Missing'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilterStatus(f)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      filterStatus === f ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <Table>
            <Thead>
              <tr>
                <Th>Tool ID</Th>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Serial No.</Th>
                <Th>Status</Th>
                <Th>Location</Th>
                <Th>Assigned</Th>
              </tr>
            </Thead>
            <Tbody>
              {filteredTools.map(t => (
                <Tr key={t.id} onClick={() => setSelectedTool(t)}>
                  <Td><span className="font-mono text-xs font-semibold text-navy-700">{t.id}</span></Td>
                  <Td><span className="font-medium text-sm">{t.name}</span></Td>
                  <Td><Badge variant="neutral">{t.category}</Badge></Td>
                  <Td className="font-mono text-xs text-gray-500">{t.serialNo}</Td>
                  <Td>
                    <Badge variant={t.status === 'In Field' ? 'info' : t.status === 'Missing' ? 'danger' : 'success'}>
                      {t.status}
                    </Badge>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1 text-xs">
                      {t.status === 'In Field' && <MapPin size={11} className="text-blue-500" />}
                      <span>{t.location}</span>
                    </div>
                  </Td>
                  <Td className="text-xs text-gray-400">{t.assignedDate || '—'}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Card>
      )}

      {activeTab === 'requests' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-900">Field Tool Requests</h3>
              <Badge variant="info">{toolRequests.length} Requests</Badge>
            </div>
          </CardHeader>
          <Table>
            <Thead>
              <tr>
                <Th>Request ID</Th>
                <Th>Project</Th>
                <Th>Supervisor</Th>
                <Th>Tool Requested</Th>
                <Th>Needed By</Th>
                <Th>Notes</Th>
                <Th>Status</Th>
                <Th></Th>
              </tr>
            </Thead>
            <Tbody>
              {toolRequests.map(r => (
                <Tr key={r.id}>
                  <Td><span className="font-mono text-xs font-semibold text-navy-700">{r.id}</span></Td>
                  <Td><span className="font-medium">{r.project}</span></Td>
                  <Td>{r.supervisor}</Td>
                  <Td className="text-sm">{r.tool}</Td>
                  <Td className="text-xs text-gray-500">{r.needed}</Td>
                  <Td className="text-xs text-gray-500 max-w-[160px] truncate">{r.notes || '—'}</Td>
                  <Td>
                    <Badge variant={r.status === 'Shortage' ? 'danger' : r.status === 'Ready' ? 'success' : 'neutral'}>
                      {r.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Button variant="ghost" size="sm" onClick={() => showToast(`${r.tool} confirmed for ${r.project}`, 'success')}>
                      Confirm
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Card>
      )}

      {activeTab === 'pickticket' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-900">Daily Pick Ticket — March 18, 2026</h3>
              <Button variant="secondary" size="sm" onClick={() => showToast('Pick ticket exported to PDF', 'success')}>Export PDF</Button>
            </div>
          </CardHeader>
          <CardBody>
            {projects.slice(0, 2).map((proj, pi) => (
              <div key={proj.id} className={`${pi > 0 ? 'mt-5 pt-5 border-t border-gray-200' : ''}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-navy-900 rounded-full" />
                  <span className="text-sm font-bold text-navy-900">{proj.id} — {proj.name}</span>
                  <Badge variant="neutral">{proj.manager}</Badge>
                </div>
                <Table>
                  <Thead>
                    <tr>
                      <Th>Tool</Th>
                      <Th>Serial No.</Th>
                      <Th>Category</Th>
                      <Th>Dispatch Status</Th>
                    </tr>
                  </Thead>
                  <Tbody>
                    {tools.filter(t => t.location === proj.id).map(t => (
                      <Tr key={t.id}>
                        <Td className="font-medium text-sm">{t.name}</Td>
                        <Td className="font-mono text-xs text-gray-500">{t.serialNo}</Td>
                        <Td><Badge variant="neutral">{t.category}</Badge></Td>
                        <Td><Badge variant="success"><CheckCircle size={10} className="mr-1" />Dispatched</Badge></Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            ))}
          </CardBody>
        </Card>
      )}

      {activeTab === 'returns' && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-sm text-gray-900">Warehouse Return Log</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {[
                { tool: 'JLG 40RTS Aerial Lift', from: 'P-2148', date: '2026-03-14', driver: 'K. Park', condition: 'Good' },
                { tool: 'Greenlee 555 Pipe Bender', from: 'P-2315', date: '2026-03-11', driver: 'M. Torres', condition: 'Good' },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded border border-gray-100">
                  <CheckCircle size={16} className="text-green-500" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{r.tool}</div>
                    <div className="text-xs text-gray-500">Returned from {r.from} · {r.date} · Driver: {r.driver}</div>
                  </div>
                  <Badge variant="success">{r.condition}</Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Tool Detail Drawer */}
      <Drawer open={!!selectedTool} onClose={() => setSelectedTool(null)} title={`Tool Detail — ${selectedTool?.id}`}>
        {selectedTool && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Name', value: selectedTool.name },
                { label: 'Category', value: selectedTool.category },
                { label: 'Serial No.', value: selectedTool.serialNo },
                { label: 'Status', value: selectedTool.status },
                { label: 'Location', value: selectedTool.location },
                { label: 'Assigned Date', value: selectedTool.assignedDate || 'N/A' },
              ].map(f => (
                <div key={f.label} className="bg-gray-50 rounded p-3">
                  <div className="text-xs text-gray-400">{f.label}</div>
                  <div className="font-semibold text-sm mt-0.5">{f.value}</div>
                </div>
              ))}
            </div>
            {selectedTool.status === 'Missing' && (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <div className="text-sm font-bold text-red-900">⚠ Missing — Action Required</div>
                <div className="text-xs text-red-700 mt-1">31 days since last assignment. Replacement value: $680</div>
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="primary" size="sm" className="flex-1 justify-center" onClick={() => showToast('Tool checked out', 'success')}>
                Check Out
              </Button>
              <Button variant="secondary" size="sm" className="flex-1 justify-center" onClick={() => { showToast('Tool checked in', 'success'); setSelectedTool(null); }}>
                Check In
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
