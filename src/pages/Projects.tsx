import React from 'react';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table, Thead, Th, Tbody, Tr, Td } from '../components/ui/Table';
import { projects } from '../data/mockData';

export const Projects = () => (
  <div className="p-6 space-y-5 fade-in">
    <div>
      <h1 className="text-xl font-bold text-gray-900">Projects</h1>
      <p className="text-xs text-gray-500 mt-0.5">Active construction project register</p>
    </div>
    <Card>
      <CardHeader><h3 className="font-semibold text-sm text-gray-900">Project Register</h3></CardHeader>
      <Table>
        <Thead>
          <tr>
            <Th>Project ID</Th>
            <Th>Name</Th>
            <Th>Manager</Th>
            <Th>Budget</Th>
            <Th>Billed</Th>
            <Th>% Used</Th>
            <Th>Status</Th>
          </tr>
        </Thead>
        <Tbody>
          {projects.map(p => {
            const pct = Math.round((p.billed / p.budget) * 100);
            return (
              <Tr key={p.id}>
                <Td><span className="font-mono text-xs font-semibold text-navy-700">{p.id}</span></Td>
                <Td className="font-semibold text-sm">{p.name}</Td>
                <Td>{p.manager}</Td>
                <Td className="font-mono text-xs">${p.budget.toLocaleString()}</Td>
                <Td className="font-mono text-xs font-semibold">${p.billed.toLocaleString()}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${pct > 100 ? 'bg-red-500' : pct > 85 ? 'bg-orange-400' : 'bg-navy-600'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                    <span className={`text-xs font-semibold ${pct > 100 ? 'text-red-600' : 'text-gray-600'}`}>{pct}%</span>
                  </div>
                </Td>
                <Td><Badge variant={p.status === 'At Risk' ? 'danger' : 'success'}>{p.status}</Badge></Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  </div>
);
