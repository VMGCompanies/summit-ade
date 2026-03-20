import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ToastProvider } from './components/ui/Toast';
import { Dashboard } from './pages/Dashboard';
import { Purchasing } from './pages/Purchasing';
import { POCompliance } from './pages/POCompliance';
import { ToolTracking } from './pages/ToolTracking';
import { Estimating } from './pages/Estimating';
import { Approvals } from './pages/Approvals';
import { AuditTrail } from './pages/AuditTrail';
import { Vendors } from './pages/Vendors';
import { Projects } from './pages/Projects';
import { Documents } from './pages/Documents';
import { Settings } from './pages/Settings';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="purchasing" element={<Purchasing />} />
            <Route path="po-compliance" element={<POCompliance />} />
            <Route path="tool-tracking" element={<ToolTracking />} />
            <Route path="estimating" element={<Estimating />} />
            <Route path="approvals" element={<Approvals />} />
            <Route path="documents" element={<Documents />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="projects" element={<Projects />} />
            <Route path="audit" element={<AuditTrail />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
