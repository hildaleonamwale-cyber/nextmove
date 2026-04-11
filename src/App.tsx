import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import AgentPortal from './components/auth/AgentPortal';
import ProfileSetup from './components/auth/ProfileSetup';
import GladeDashboard from './components/glade/GladeDashboard';
import SearchResults from './components/SearchResults';
import Calculator from './components/Calculator';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/login" element={<AgentPortal />} />
            <Route path="/setup" element={<ProfileSetup />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/glade" element={<GladeDashboard />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}
