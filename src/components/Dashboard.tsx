import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

import Overview from './dashboard/Overview';
import Listings from './dashboard/Listings';
import Requests from './dashboard/Requests';
import Paywall from './dashboard/Paywall';
import CompanyProfile from './dashboard/CompanyProfile';
import ManageStaff from './dashboard/ManageStaff';
import Billing from './dashboard/Billing';
import ContactCard from './dashboard/ContactCard';
import AddListingModal from './dashboard/AddListingModal';

const roles = ['admin', 'pro', 'worker', 'basic'];
const roleLabels = ['God Mode', 'Pro User', 'Staff Agent', 'Basic User'];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState('overview');
  
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const currentRole = roles[currentRoleIndex];

  // Smart routing when role changes
  useEffect(() => {
    if ((currentRole === 'worker' || currentRole === 'basic') && ['company', 'staff', 'billing'].includes(currentTab)) {
      setCurrentTab('overview');
    } else if (currentRole === 'pro' && currentTab === 'staff') {
      setCurrentTab('overview');
    }
  }, [currentRole, currentTab]);

  const cycleRole = () => {
    setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
  };

  const switchTab = (tab: string) => {
    setCurrentTab(tab);
    setIsSidebarOpen(false);
  };

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setIsNotifOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const getProfileData = () => {
    switch (currentRole) {
      case 'admin':
        return {
          name: "Sarah Jenkins", role: "Agency Admin",
          sideName: "Willow & Elm", sideRole: "Agency Pro",
          avatar: "url('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150')",
          sideAvatar: "url('https://image2url.com/r2/default/images/1775520731590-8a90e10a-4fd0-496d-96c7-6198caa6955e.png')"
        };
      case 'pro':
        return {
          name: "Sarah Jenkins", role: "Pro Agent",
          sideName: "Sarah Jenkins", sideRole: "Pro Plan",
          avatar: "url('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150')",
          sideAvatar: "url('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150')"
        };
      case 'worker':
        return {
          name: "Mike Ross", role: "Staff Agent",
          sideName: "Mike Ross", sideRole: "Elite Realty",
          avatar: "url('https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150')",
          sideAvatar: "url('https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150')"
        };
      case 'basic':
      default:
        return {
          name: "Jane Doe", role: "Private Lister",
          sideName: "Jane Doe", sideRole: "Basic Plan",
          avatar: "url('https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150')",
          sideAvatar: "url('https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150')"
        };
    }
  };

  const profileData = getProfileData();

  const handleUpgradeClick = () => {
    setIsUpgradeModalOpen(true);
  };

  const requestProAccess = () => {
    const message = encodeURIComponent("Hi Nextmove, I would like to request Pro Access for my agency to unlock unlimited listings and premium features.");
    window.open(`https://wa.me/263771234567?text=${message}`, '_blank');
    setIsUpgradeModalOpen(false);
  };

  return (
    <div className={`nm-dash-wrapper role-${currentRole}`}>
      <aside className={`nm-sidebar ${isSidebarOpen ? 'active' : ''}`} id="dashSidebar">
        <div className="nm-sidebar-header">
          <Link to="/" className="nm-logo-wrap">
            <img src="https://image2url.com/r2/default/images/1775520731590-8a90e10a-4fd0-496d-96c7-6198caa6955e.png" alt="Logo" />
            <div className="nm-site-title">
              <span className="title-black">next</span><span className="title-brand">move</span>
            </div>
          </Link>
          <button className="nm-close-sidebar" onClick={() => setIsSidebarOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="nm-sidebar-menu">
          <div className="nm-nav-label">Main Menu</div>
          <button className={`nm-nav-item ${currentTab === 'overview' ? 'active' : ''}`} onClick={() => switchTab('overview')}>
            <i className="fa-solid fa-border-all"></i> Overview
          </button>
          <button className={`nm-nav-item ${currentTab === 'listings' ? 'active' : ''}`} onClick={() => switchTab('listings')}>
            <i className="fa-solid fa-house"></i> {currentRole === 'admin' || currentRole === 'pro' ? 'All Listings' : 'My Listings'}
          </button>
          <button className={`nm-nav-item ${currentTab === 'requests' ? 'active' : ''}`} onClick={() => switchTab('requests')}>
            <i className="fa-regular fa-calendar-check"></i> Viewing Requests
          </button>
          
          {(currentRole === 'admin' || currentRole === 'pro') && (
            <>
              <div className="nm-nav-label">Settings</div>
              <button className={`nm-nav-item ${currentTab === 'company' ? 'active' : ''}`} onClick={() => switchTab('company')}>
                {currentRole === 'admin' ? <><i className="fa-solid fa-building-user"></i> Company Profile</> : <><i className="fa-solid fa-user-tie"></i> Profile Editor</>}
              </button>
              {currentRole === 'admin' && (
                <button className={`nm-nav-item ${currentTab === 'staff' ? 'active' : ''}`} onClick={() => switchTab('staff')}>
                  <i className="fa-solid fa-users-gear"></i> Manage Staff
                </button>
              )}
              <button className={`nm-nav-item ${currentTab === 'billing' ? 'active' : ''}`} onClick={() => switchTab('billing')}>
                <i className="fa-solid fa-credit-card"></i> Billing & Plan
              </button>
            </>
          )}

          {(currentRole === 'worker' || currentRole === 'basic') && (
            <>
              <div className="nm-nav-label">Settings</div>
              <button className={`nm-nav-item ${currentTab === 'contact' ? 'active' : ''}`} onClick={() => switchTab('contact')}>
                <i className="fa-regular fa-id-badge"></i> Contact Card
              </button>
            </>
          )}
        </div>

        <div className="nm-sidebar-footer">
          {currentRole === 'basic' && (
            <button className="nm-upsell-btn" onClick={handleUpgradeClick}>⭐ Upgrade to Pro</button>
          )}
          
          <div className="nm-sidebar-profile-card">
            <div className="nm-sp-avatar" style={{ backgroundImage: profileData.sideAvatar, backgroundColor: currentRole === 'admin' ? '#fff' : 'transparent' }}></div>
            <div className="nm-sp-info">
              <span className="nm-sp-name">{profileData.sideName}</span>
              <span className="nm-sp-role">{profileData.sideRole}</span>
            </div>
          </div>
          
          <Link to="/" className="nm-logout"><i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</Link>
        </div>
      </aside>

      <div className={`nm-sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} id="dashOverlay" onClick={() => setIsSidebarOpen(false)}></div>

      <main className="nm-main">
        <div className="we-header-wrapper">
          <header className="we-header">
            <div className="nm-header-left">
              <button className="nm-mobile-hamburger" onClick={() => setIsSidebarOpen(true)}>
                <i className="fa-solid fa-bars-staggered"></i>
              </button>
              <div className="nm-search-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search properties, settings..." />
              </div>
            </div>

          <div className="we-action-group">
            <div className="nm-notif-wrap">
              <button className="nm-icon-btn" onClick={(e) => { e.stopPropagation(); setIsNotifOpen(!isNotifOpen); }}>
                <i className="fa-regular fa-bell"></i>
              </button>
              
              <div className={`nm-notification-popover ${isNotifOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="nm-notif-header">
                  <h4>Notifications</h4>
                  <button className="nm-notif-mark">Mark all as read</button>
                </div>
                <div className="nm-notif-list">
                  <div className="nm-notif-item unread">
                    <div className="nm-notif-icon"><i className="fa-solid fa-calendar-check"></i></div>
                    <div className="nm-notif-text">
                      <p>New viewing request from John Doe for The Glass Pavilion.</p>
                      <span>10 mins ago</span>
                    </div>
                  </div>
                  <div className="nm-notif-item">
                    <div className="nm-notif-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><i className="fa-solid fa-check"></i></div>
                    <div className="nm-notif-text">
                      <p>Your listing "Willow Terrace" was successfully published.</p>
                      <span>2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="nm-user-profile">
              <div className="nm-user-text">
                <span className="nm-user-name">{profileData.name}</span>
                <span className="nm-user-role">{profileData.role}</span>
              </div>
              <div className="nm-user-img" style={{ backgroundImage: profileData.avatar }}></div>
            </div>
          </div>
        </header>
        </div>

        <div className="nm-content-scroll">
          {currentTab === 'overview' && <Overview currentRole={currentRole} />}
          {currentTab === 'listings' && <Listings currentRole={currentRole} onAddProperty={() => {
            if (currentRole === 'basic') {
              setIsUpgradeModalOpen(true);
            } else {
              setIsAddListingOpen(true);
            }
          }} />}
          {currentTab === 'requests' && (currentRole === 'basic' ? <Paywall onUpgradeClick={handleUpgradeClick} /> : <Requests />)}
          {currentTab === 'company' && <CompanyProfile currentRole={currentRole} />}
          {currentTab === 'staff' && <ManageStaff />}
          {currentTab === 'billing' && <Billing currentRole={currentRole} onUpgradeClick={handleUpgradeClick} />}
          {currentTab === 'contact' && <ContactCard />}
        </div>
      </main>

      <AddListingModal isOpen={isAddListingOpen} onClose={() => setIsAddListingOpen(false)} />

      {/* Upgrade Modal */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 overflow-hidden">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-50 mb-4">
                <i className="fa-solid fa-star text-yellow-500 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Want unlimited listings and premium features?</h3>
              <p className="text-gray-500">
                Upgrade to Pro to unlock unlimited listings, team management, and priority support.
              </p>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={requestProAccess}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-[#1A1C1E] bg-[#1FE6D4] hover:bg-[#15b8a9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FE6D4] transition-colors"
              >
                <i className="fa-brands fa-whatsapp mr-2 text-lg"></i> Request Pro Access
              </button>
              <button 
                onClick={() => setIsUpgradeModalOpen(false)}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FE6D4] transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      <button id="testModeBtn" className="test-toggle" onClick={cycleRole}>Test Mode: {roleLabels[currentRoleIndex]}</button>
    </div>
  );
}
