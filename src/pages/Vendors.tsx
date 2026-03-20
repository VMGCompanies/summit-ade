import React from 'react';
import { Star, TrendingUp } from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table, Thead, Th, Tbody, Tr, Td } from '../components/ui/Table';
import { vendors } from '../data/mockData';

export const Vendors = () => (
  <div className="p-6 space-y-5 fade-in">
    <div>
      <h1 className="text-xl font-bold text-gray-900">Vendors</h1>
      <p className="text-xs text-gray-500 mt-0.5">Approved supplier directory and performance scorecard</p>
    </div>
    <Card>
      <CardHeader>
        <h3 className="font-semibold text-sm text-gray-900">Approved Vendor List</h3>
      </CardHeader>
      <Table>
        <Thead>
          <tr>
            <Th>Vendor ID</Th>
            <Th>Name</Th>
            <Th>ADE Rating</Th>
            <Th>Lead Days</Th>
            <Th>Pay Terms</Th>
            <Th>YTD Spend</Th>
            <Th>Status</Th>
          </tr>
        </Thead>
        <Tbody>
          {vendors.map(v => (
            <Tr key={v.id}>
              <Td><span className="font-mono text-xs font-semibold text-navy-700">{v.id}</span></Td>
              <Td className="font-semibold text-sm">{v.name}</Td>
              <Td>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-300" />
                  <span className="text-sm font-semibold">{v.rating}</span>
                </div>
              </Td>
              <Td>{v.leadDays} day{v.leadDays !== 1 ? 's' : ''}</Td>
              <Td><Badge variant="neutral">{v.payTerms}</Badge></Td>
              <Td>
                <div className="flex items-center gap-1 text-sm font-semibold">
                  <TrendingUp size={12} className="text-green-500" />
                  ${v.ytdSpend.toLocaleString()}
                </div>
              </Td>
              <Td><Badge variant="success">Active</Badge></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Card>
  </div>
);
