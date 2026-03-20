import React from 'react';
import { FileText, FileCheck, Package, BookOpen } from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { invoices, purchaseOrders } from '../data/mockData';

const DocRow = ({ icon: Icon, name, type, project, date, status }: any) => (
  <div className="px-5 py-3 flex items-center gap-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0">
    <Icon size={16} className="text-navy-500 flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <div className="text-sm font-medium text-gray-900 truncate">{name}</div>
      <div className="text-xs text-gray-500">{type} · {project} · {date}</div>
    </div>
    <Badge variant={status === 'Anomaly' ? 'danger' : status === 'Approved' ? 'success' : 'neutral'}>{status}</Badge>
  </div>
);

export const Documents = () => (
  <div className="p-6 space-y-5 fade-in">
    <div>
      <h1 className="text-xl font-bold text-gray-900">Documents</h1>
      <p className="text-xs text-gray-500 mt-0.5">Invoices, purchase orders, packing slips, specs, and artifacts</p>
    </div>
    <Card>
      <CardHeader><h3 className="font-semibold text-sm text-gray-900">Recent Documents</h3></CardHeader>
      {invoices.map(inv => (
        <DocRow key={inv.id} icon={FileText} name={`Invoice ${inv.id} — ${inv.vendor}`} type="Invoice" project={inv.project} date={inv.date} status={inv.status} />
      ))}
      {purchaseOrders.slice(0, 3).map(po => (
        <DocRow key={po.id} icon={FileCheck} name={`Purchase Order ${po.id}`} type="Purchase Order" project={po.project} date={po.date} status={po.status} />
      ))}
    </Card>
  </div>
);
