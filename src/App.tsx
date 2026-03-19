import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import './home-override.css';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Home } from './pages/Home';
import { PropertyDetail } from './pages/PropertyDetail';
import { AgentProfile } from './pages/AgentProfile';
import { AgentDashboard } from './pages/AgentDashboard';
import { AgentListings } from './pages/AgentListings';
import { AgentRequests } from './pages/AgentRequests';
import { AgentProfileEditor } from './pages/AgentProfileEditor';
import { AgentStaff } from './pages/AgentStaff';
import { AgentWidget } from './pages/AgentWidget';
import { AgentBilling } from './pages/AgentBilling';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminAgentManagement } from './pages/AdminAgentManagement';
import { AdminHomepageManager } from './pages/AdminHomepageManager';
import { TierProvider } from './contexts/TierContext';

export default function App() {
  return (
    <TierProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/agent/:id" element={<AgentProfile />} />
            <Route path="/listings" element={<div className="pt-32 px-[var(--side-margin)] max-w-7xl mx-auto"><h1>All Listings</h1></div>} />
            <Route path="/agents" element={<div className="pt-32 px-[var(--side-margin)] max-w-7xl mx-auto"><h1>Our Agents</h1></div>} />
          </Route>

          {/* Agent Dashboard Routes */}
          <Route path="/agent" element={<DashboardLayout type="agent" />}>
            <Route path="dashboard" element={<AgentDashboard />} />
            <Route path="listings" element={<AgentListings />} />
            <Route path="requests" element={<AgentRequests />} />
            <Route path="profile-edit" element={<AgentProfileEditor />} />
            <Route path="staff" element={<AgentStaff />} />
            <Route path="widget" element={<AgentWidget />} />
            <Route path="billing" element={<AgentBilling />} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<DashboardLayout type="admin" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="listings" element={<div>Listings Moderation</div>} />
          <Route path="agents" element={<AdminAgentManagement />} />
          <Route path="homepage" element={<AdminHomepageManager />} />
          <Route path="settings" element={<div>Platform Settings</div>} />
        </Route>
      </Routes>
    </Router>
    </TierProvider>
  );
}
