export const projects = [
  { id: 'P-2148', name: 'Riverside Commerce Center', manager: 'D. Harmon', budget: 485000, billed: 329800, status: 'Active' },
  { id: 'P-2201', name: 'Highland School District Phase 2', manager: 'T. Nguyen', budget: 312000, billed: 327600, status: 'At Risk' },
  { id: 'P-2315', name: 'Metro Transit Depot', manager: 'R. Castillo', budget: 198500, billed: 81000, status: 'Active' },
  { id: 'P-2402', name: 'Lakeside Medical Expansion', manager: 'S. Patel', budget: 641000, billed: 506300, status: 'Active' },
];

export const vendors = [
  { id: 'V-001', name: 'Graybar Electric', rating: 4.7, leadDays: 2, payTerms: 'Net 30', ytdSpend: 287400 },
  { id: 'V-002', name: 'Anixter / Wesco', rating: 4.5, leadDays: 3, payTerms: 'Net 30', ytdSpend: 194200 },
  { id: 'V-003', name: 'CED (Consolidated Electrical)', rating: 4.8, leadDays: 1, payTerms: 'Net 15', ytdSpend: 156700 },
  { id: 'V-004', name: 'Border States Electric', rating: 4.3, leadDays: 4, payTerms: 'Net 30', ytdSpend: 98300 },
];

export const purchaseOrders = [
  { id: 'PO-2148-01', project: 'P-2148', vendor: 'Graybar Electric', amount: 48500, billed: 32980, status: 'Active', date: '2026-01-15', manager: 'D. Harmon' },
  { id: 'PO-2201-07', project: 'P-2201', vendor: 'Anixter / Wesco', amount: 122000, billed: 126440, status: 'Overrun', date: '2025-11-08', manager: 'T. Nguyen' },
  { id: 'PO-2315-03', project: 'P-2315', vendor: 'CED', amount: 31200, billed: 12792, status: 'Active', date: '2026-02-01', manager: 'R. Castillo' },
  { id: 'PO-2402-02', project: 'P-2402', vendor: 'Border States Electric', amount: 87750, billed: 69322, status: 'Active', date: '2025-12-20', manager: 'S. Patel' },
  { id: 'PO-2148-04', project: 'P-2148', vendor: 'CED', amount: 22800, billed: 18240, status: 'Active', date: '2026-02-10', manager: 'D. Harmon' },
  { id: 'PO-2402-05', project: 'P-2402', vendor: 'Graybar Electric', amount: 54200, billed: 49862, status: 'Watch', date: '2026-01-28', manager: 'S. Patel' },
];

export const invoices = [
  { id: 'INV-8841', po: 'PO-2148-01', vendor: 'Graybar Electric', project: 'P-2148', amount: 8420.00, ordered: 7060.00, status: 'Anomaly', date: '2026-03-12', lineItems: [
    { desc: '4/0 THHN Copper Wire 500ft', qty: 10, uom: 'ft (x500)', unitOrdered: 2.18, unitInvoiced: 2.61, total: 13050 },
    { desc: '1" EMT Conduit 10ft', qty: 50, uom: 'stick', unitOrdered: 4.85, unitInvoiced: 4.85, total: 242.50 },
    { desc: '1" EMT Coupling', qty: 100, uom: 'ea', unitOrdered: 0.42, unitInvoiced: 0.42, total: 42.00 },
  ]},
  { id: 'INV-8902', po: 'PO-2201-07', vendor: 'Anixter / Wesco', project: 'P-2201', amount: 14880.00, ordered: 14880.00, status: 'Approved', date: '2026-03-10', lineItems: [
    { desc: '2" Rigid Steel Conduit', qty: 200, uom: 'stick', unitOrdered: 32.40, unitInvoiced: 32.40, total: 6480 },
    { desc: '2" RS Coupling', qty: 400, uom: 'ea', unitOrdered: 2.10, unitInvoiced: 2.10, total: 840 },
  ]},
  { id: 'INV-8955', po: 'PO-2315-03', vendor: 'CED', project: 'P-2315', amount: 4320.00, ordered: 4320.00, status: 'Pending', date: '2026-03-14', lineItems: [
    { desc: '#12 THHN Copper 500ft', qty: 24, uom: 'roll', unitOrdered: 180.00, unitInvoiced: 180.00, total: 4320 },
  ]},
  { id: 'INV-9001', po: 'PO-2402-02', vendor: 'Border States Electric', project: 'P-2402', amount: 11200.00, ordered: 10800.00, status: 'Anomaly', date: '2026-03-15', lineItems: [
    { desc: '200A Panel Board 42 Circuit', qty: 2, uom: 'ea', unitOrdered: 5400.00, unitInvoiced: 5600.00, total: 11200 },
  ]},
];

export const tools = [
  { id: 'T-001', name: 'Greenlee 555 Pipe Bender', category: 'Benders', status: 'In Field', location: 'P-2148', assignedDate: '2026-03-10', serialNo: 'GR555-0441' },
  { id: 'T-002', name: 'Greenlee 6810 Cable Puller', category: 'Pullers', status: 'In Field', location: 'P-2315', assignedDate: '2026-03-08', serialNo: 'GR6810-0219' },
  { id: 'T-003', name: 'Ridgid 300 Power Threader', category: 'Threaders', status: 'Warehouse', location: 'Warehouse', assignedDate: null, serialNo: 'RDG300-1002' },
  { id: 'T-004', name: 'Fluke 1587 Insulation Tester', category: 'Test Equipment', status: 'In Field', location: 'P-2402', assignedDate: '2026-03-12', serialNo: 'FL1587-0778' },
  { id: 'T-005', name: 'Hilti Rotary Hammer #1', category: 'Power Tools', status: 'In Field', location: 'P-2201', assignedDate: '2026-03-01', serialNo: 'HLT-RH-001' },
  { id: 'T-006', name: 'Hilti Rotary Hammer #2', category: 'Power Tools', status: 'In Field', location: 'P-2315', assignedDate: '2026-03-08', serialNo: 'HLT-RH-002' },
  { id: 'T-007', name: 'Hilti Rotary Hammer #3', category: 'Power Tools', status: 'Warehouse', location: 'Warehouse', assignedDate: null, serialNo: 'HLT-RH-003' },
  { id: 'T-008', name: 'JLG 40RTS Aerial Lift', category: 'Lifts', status: 'In Field', location: 'P-2402', assignedDate: '2026-02-28', serialNo: 'JLG40-7834' },
  { id: 'T-009', name: 'Milwaukee Hydraulic Knockout Set', category: 'Knockouts', status: 'In Field', location: 'P-2148', assignedDate: '2026-03-10', serialNo: 'MWK-HKO-004' },
  { id: 'T-010', name: 'Fluke 376 Clamp Meter #1', category: 'Test Equipment', status: 'In Field', location: 'P-2148', assignedDate: '2026-03-10', serialNo: 'FL376-001' },
  { id: 'T-011', name: 'Fluke 376 Clamp Meter #2', category: 'Test Equipment', status: 'In Field', location: 'P-2201', assignedDate: '2026-03-01', serialNo: 'FL376-002' },
  { id: 'T-012', name: 'Fluke 376 Clamp Meter #3', category: 'Test Equipment', status: 'Missing', location: 'Unknown', assignedDate: '2026-02-15', serialNo: 'FL376-003' },
  { id: 'T-013', name: 'Fluke 376 Clamp Meter #4', category: 'Test Equipment', status: 'Warehouse', location: 'Warehouse', assignedDate: null, serialNo: 'FL376-004' },
  { id: 'T-014', name: 'Fluke 376 Clamp Meter #5', category: 'Test Equipment', status: 'In Field', location: 'P-2315', assignedDate: '2026-03-08', serialNo: 'FL376-005' },
];

export const toolRequests = [
  { id: 'TR-0041', project: 'P-2148', supervisor: 'M. Torres', tool: 'Greenlee 6810 Cable Puller', needed: '2026-03-19', status: 'Pending', notes: 'Need for underground pull Monday AM' },
  { id: 'TR-0042', project: 'P-2402', supervisor: 'L. Reyes', tool: 'Ridgid 300 Power Threader', needed: '2026-03-18', status: 'Ready', notes: '' },
  { id: 'TR-0043', project: 'P-2201', supervisor: 'C. Wright', tool: 'Fluke 376 Clamp Meter', needed: '2026-03-19', status: 'Shortage', notes: 'All available units deployed' },
  { id: 'TR-0044', project: 'P-2315', supervisor: 'M. Torres', tool: 'JLG 40RTS Aerial Lift', needed: '2026-03-20', status: 'Pending', notes: 'Light fixture install, ceiling 28ft' },
];

export const materialRequests = [
  { id: 'MR-0118', project: 'P-2148', supervisor: 'M. Torres', items: [
    { desc: '4/0 THHN Copper Wire', qty: '5000 ft', urgency: 'Standard' },
    { desc: '1" EMT Conduit', qty: '200 sticks', urgency: 'Standard' },
  ], status: 'Sourcing', date: '2026-03-15' },
  { id: 'MR-0119', project: 'P-2315', supervisor: 'C. Wright', items: [
    { desc: '200A 3-Phase Panel', qty: '3 ea', urgency: 'Rush' },
    { desc: '#2 THHN Green Ground', qty: '1000 ft', urgency: 'Rush' },
  ], status: 'Approval Required', date: '2026-03-16' },
  { id: 'MR-0120', project: 'P-2402', supervisor: 'L. Reyes', items: [
    { desc: 'LED Troffer 2x4 3500K', qty: '48 ea', urgency: 'Standard' },
    { desc: 'J-Box 4" Square', qty: '96 ea', urgency: 'Standard' },
  ], status: 'Complete', date: '2026-03-14' },
];

export const vendorComparisons = [
  { vendor: 'Graybar Electric', price: 2.61, stock: 'In Stock', leadDays: 2, score: 82, recommended: false },
  { vendor: 'CED', price: 2.14, stock: 'In Stock', leadDays: 1, score: 96, recommended: true },
  { vendor: 'Anixter / Wesco', price: 2.28, stock: 'Limited', leadDays: 3, score: 87, recommended: false },
  { vendor: 'Border States Electric', price: 2.35, stock: 'In Stock', leadDays: 4, score: 78, recommended: false },
];

export const approvals = [
  { id: 'APR-0091', type: 'Invoice Anomaly', project: 'P-2148', description: 'INV-8841 — 4/0 THHN price variance 19.7% above PO rate', amount: 1360, urgency: 'High', requestedBy: 'PETRA', date: '2026-03-12', status: 'Pending' },
  { id: 'APR-0092', type: 'PO Overrun', project: 'P-2201', description: 'PO-2201-07 billed $126,440 against $122,000 approved — 3.6% over', amount: 4440, urgency: 'High', requestedBy: 'PASCAL', date: '2026-03-14', status: 'Pending' },
  { id: 'APR-0093', type: 'Split Order', project: 'P-2315', description: 'MR-0119 split order total $27,400 exceeds $25,000 threshold', amount: 27400, urgency: 'Standard', requestedBy: 'PETRA', date: '2026-03-16', status: 'Pending' },
  { id: 'APR-0094', type: 'Tool Loss', project: 'Unknown', description: 'Fluke 376 Clamp Meter #3 (FL376-003) not returned — 31 days overdue', amount: 680, urgency: 'High', requestedBy: 'TITAN', date: '2026-03-17', status: 'Pending' },
  { id: 'APR-0090', type: 'Invoice Anomaly', project: 'P-2402', description: 'INV-9001 — 200A Panel Board unit price variance $200/unit above PO', amount: 400, urgency: 'Standard', requestedBy: 'PETRA', date: '2026-03-15', status: 'Pending' },
];

export const auditTrail = [
  { id: 'AUD-1041', timestamp: '2026-03-18 09:14:22', ade: 'PETRA', action: 'Invoice anomaly detected — INV-8841 price variance flagged', project: 'P-2148', user: 'System', status: 'Escalated' },
  { id: 'AUD-1040', timestamp: '2026-03-18 08:52:07', ade: 'TITAN', action: 'Pick ticket generated for P-2315 — 3 tools dispatched', project: 'P-2315', user: 'System', status: 'Completed' },
  { id: 'AUD-1039', timestamp: '2026-03-17 16:44:18', ade: 'PASCAL', action: 'PO-2201-07 overrun alert triggered — 3.6% over budget', project: 'P-2201', user: 'System', status: 'Escalated' },
  { id: 'AUD-1038', timestamp: '2026-03-17 14:30:05', ade: 'PETRA', action: 'Vendor comparison completed for MR-0119 — CED recommended', project: 'P-2315', user: 'System', status: 'Completed' },
  { id: 'AUD-1037', timestamp: '2026-03-17 11:22:44', ade: 'Estimating ADE', action: 'Division 26 spec review completed — 4 cost-impact items found', project: 'P-2402', user: 'System', status: 'Completed' },
  { id: 'AUD-1036', timestamp: '2026-03-17 09:05:31', ade: 'TITAN', action: 'Missing tool alert — Fluke 376 #3 unreturned 31 days', project: 'N/A', user: 'System', status: 'Escalated' },
  { id: 'AUD-1035', timestamp: '2026-03-16 15:48:19', ade: 'PETRA', action: 'MR-0119 split order routed for approval — exceeds $25K threshold', project: 'P-2315', user: 'System', status: 'Pending Approval' },
  { id: 'AUD-1034', timestamp: '2026-03-16 13:10:02', ade: 'PASCAL', action: 'Weekly PO burn report generated — all 4 managers notified', project: 'All', user: 'T. Nguyen', status: 'Completed' },
  { id: 'AUD-1033', timestamp: '2026-03-15 10:30:55', ade: 'Estimating ADE', action: 'Addendum 3 comparison completed vs. base spec — 2 scope changes', project: 'P-2402', user: 'System', status: 'Completed' },
  { id: 'AUD-1032', timestamp: '2026-03-14 08:15:40', ade: 'TITAN', action: 'Inventory updated — JLG 40RTS returned and checked in', project: 'P-2148', user: 'Driver K. Park', status: 'Completed' },
];

export const weeklyWorkflowData = [
  { week: 'Feb 24', purchasing: 12, po: 8, tools: 15, estimating: 5 },
  { week: 'Mar 3', purchasing: 18, po: 11, tools: 21, estimating: 7 },
  { week: 'Mar 10', purchasing: 14, po: 9, tools: 18, estimating: 4 },
  { week: 'Mar 17', purchasing: 22, po: 14, tools: 24, estimating: 9 },
];

export const specItems = [
  { section: '26 05 00', title: 'Common Work Results for Electrical', costImpact: 'Low', flag: false, notes: 'Standard spec — no unusual inclusions' },
  { section: '26 05 19', title: 'Low-Voltage Electrical Power Conductors', costImpact: 'High', flag: true, notes: 'Spec requires listed AL-CU rated lugs on all terminations — non-standard' },
  { section: '26 24 16', title: 'Panelboards', costImpact: 'Medium', flag: true, notes: 'Copper bus required on all panels — adds ~$180/panel vs. standard AL bus' },
  { section: '26 27 26', title: 'Wiring Devices', costImpact: 'Low', flag: false, notes: 'Spec calls commercial grade — standard inclusion' },
  { section: '26 51 00', title: 'Interior Lighting', costImpact: 'High', flag: true, notes: 'Emergency battery backup required on 15% of fixtures — typically excluded in base bid' },
  { section: '26 56 00', title: 'Exterior Lighting', costImpact: 'Medium', flag: true, notes: 'Photocell AND timer control required on all exterior — dual control not standard' },
];

export const takeoffItems = {
  lighting: [
    { id: 'LT-001', desc: '2x4 LED Troffer 3500K', qty: 48, unit: 'ea', note: 'Emg battery on 8 units' },
    { id: 'LT-002', desc: '2x2 LED Panel 4000K', qty: 22, unit: 'ea', note: '' },
    { id: 'LT-003', desc: 'LED Wall Pack 40W', qty: 14, unit: 'ea', note: 'Dual control required' },
    { id: 'LT-004', desc: 'Exit Sign LED', qty: 18, unit: 'ea', note: '' },
  ],
  power: [
    { id: 'PW-001', desc: '20A Duplex Receptacle', qty: 124, unit: 'ea', note: '' },
    { id: 'PW-002', desc: '20A GFCI Receptacle', qty: 32, unit: 'ea', note: '' },
    { id: 'PW-003', desc: '30A Dryer Circuit', qty: 4, unit: 'ea', note: '' },
    { id: 'PW-004', desc: '50A EV Charging Circuit', qty: 6, unit: 'ea', note: 'Verify load schedule' },
  ],
  distribution: [
    { id: 'DS-001', desc: '200A 42-Ckt Panel (Copper Bus)', qty: 3, unit: 'ea', note: 'AL-CU lugs required' },
    { id: 'DS-002', desc: '100A Subpanel', qty: 2, unit: 'ea', note: '' },
    { id: 'DS-003', desc: '400A Service Entrance', qty: 1, unit: 'ea', note: '' },
    { id: 'DS-004', desc: '3" RGS Conduit Feeders', qty: 280, unit: 'ft', note: '' },
  ],
};
