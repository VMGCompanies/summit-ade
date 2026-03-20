import React from 'react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { showToast } from '../components/ui/Toast';

export const Settings = () => (
  <div className="p-6 space-y-5 fade-in">
    <div>
      <h1 className="text-xl font-bold text-gray-900">Settings</h1>
      <p className="text-xs text-gray-500 mt-0.5">ADE configuration, approval thresholds, and integrations</p>
    </div>
    {[
      { title: 'Approval Thresholds', fields: [
        { label: 'Order Approval Threshold', value: '$25,000' },
        { label: 'Invoice Variance Alert (%)', value: '10%' },
        { label: 'PO Overrun Alert (%)', value: '5%' },
      ]},
      { title: 'ADE Configuration', fields: [
        { label: 'Auto-Escalate Anomalies', value: 'Enabled' },
        { label: 'Weekly Summary Day', value: 'Monday' },
        { label: 'Demo Mode', value: 'Active' },
      ]},
    ].map(section => (
      <Card key={section.title}>
        <CardHeader><h3 className="font-semibold text-sm text-gray-900">{section.title}</h3></CardHeader>
        <CardBody>
          <div className="space-y-3">
            {section.fields.map(f => (
              <div key={f.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-700">{f.label}</span>
                <span className="text-sm font-semibold text-gray-900">{f.value}</span>
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="mt-3" onClick={() => showToast('Settings saved', 'success')}>Save Changes</Button>
        </CardBody>
      </Card>
    ))}
  </div>
);
