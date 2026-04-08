import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
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
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/login" element={<AgentPortal />} />
          <Route path="/setup" element={<ProfileSetup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/glade" element={<GladeDashboard />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
