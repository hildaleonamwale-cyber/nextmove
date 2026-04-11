import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import { useAppContext } from '../context/AppContext';

import Overview from './dashboard/Overview';
import Listings from './dashboard/Listings';
import Requests from './dashboard/Requests';
import Paywall from './dashboard/Paywall';
import CompanyProfile from './dashboard/CompanyProfile';
import ManageStaff from './dashboard/ManageStaff';
import Billing from './dashboard/Billing';
import ContactCard from './dashboard/ContactCard';
import AddListingModal from './dashboard/AddListingModal';
import Wallet from './dashboard/Wallet';
import Forms from './dashboard/Forms';

const roles = ['admin', 'premium', 'worker', 'basic'];
const roleLabels = ['God Mode', 'Premium User', 'Staff Agent', 'Basic User'];

export default function Dashboard() {
  const { users, setCurrentUser } = useAppContext();
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
    } else if (currentRole === 'premium' && currentTab === 'staff') {
      setCurrentTab('overview');
    }
    
    // Update current user in context based on role
    const user = users.find(u => u.role === currentRole);
    if (user) {
      setCurrentUser(user);
    }
  }, [currentRole, currentTab, users, setCurrentUser]);

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
      case 'premium':
        return {
          name: "Sarah Jenkins", role: "Premium Agent",
          sideName: "Sarah Jenkins", sideRole: "Premium Plan",
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
            <i className="fa-solid fa-house"></i> {currentRole === 'admin' || currentRole === 'premium' ? 'All Listings' : 'My Listings'}
          </button>
          <button className={`nm-nav-item ${currentTab === 'requests' ? 'active' : ''}`} onClick={() => switchTab('requests')}>
            <i className="fa-regular fa-calendar-check"></i> Viewing Requests
          </button>
          {(currentRole === 'admin' || currentRole === 'premium') && (
            <button className={`nm-nav-item ${currentTab === 'forms' ? 'active' : ''}`} onClick={() => switchTab('forms')}>
              <i className="fa-solid fa-clipboard-list"></i> Form Submissions
            </button>
          )}
          <button className={`nm-nav-item ${currentTab === 'wallet' ? 'active' : ''}`} onClick={() => switchTab('wallet')}>
            <i className="fa-solid fa-wallet"></i> My Wallet
          </button>
          
          {(currentRole === 'admin' || currentRole === 'premium') && (
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
              <button className={`nm-nav-item ${currentTab === 'billing' ? 'active' : ''}`} onClick={() => switchTab('billing')}>
                <i className="fa-solid fa-credit-card"></i> Billing & Plan
              </button>
            </>
          )}
        </div>

        <div className="nm-sidebar-footer">
          {currentRole === 'basic' && (
            <button className="nm-upsell-btn" onClick={handleUpgradeClick}>⭐ Upgrade to Premium</button>
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
                <img src="https://image2url.com/r2/default/images/1775520819070-397d094c-92e4-4f64-af30-e2881143cc7e.png" alt="Menu" style={{ width: '35px', height: 'auto' }} />
              </button>
              <div className="nm-search-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search properties, settings..." />
              </div>
            </div>

          <div className="we-action-group">
            <button className="nm-mobile-search-btn">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
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
          {currentTab === 'forms' && <Forms />}
          {currentTab === 'company' && <CompanyProfile currentRole={currentRole} />}
          {currentTab === 'staff' && <ManageStaff />}
          {currentTab === 'billing' && <Billing currentRole={currentRole} onUpgradeClick={handleUpgradeClick} />}
          {currentTab === 'contact' && <ContactCard />}
          {currentTab === 'wallet' && <Wallet />}
        </div>
      </main>

      <AddListingModal isOpen={isAddListingOpen} onClose={() => setIsAddListingOpen(false)} />

      {isUpgradeModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000003, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(2,18,17,0.6)', backdropFilter: 'blur(8px)' }}>
          <div style={{ background: '#021211', borderRadius: '20px', maxWidth: '420px', width: '100%', padding: '36px 28px', textAlign: 'center', boxShadow: '0 24px 48px rgba(0,0,0,0.3)' }}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(232,85,16,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', color: '#E85510', fontSize: '24px' }}>
              <i className="fa-solid fa-rocket"></i>
            </div>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '21px', fontWeight: 800, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.4px' }}>
              Unlock the full platform
            </h3>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: '0 0 24px' }}>
              Upgrade to Pro for unlimited listings, viewing requests, team management, and priority support.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={requestProAccess} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#1FE6D4', color: '#021211', border: 'none', padding: '14px', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 6px 18px rgba(31,230,212,0.25)', transition: '0.2s' }}>
                <i className="fa-brands fa-whatsapp" style={{ fontSize: '18px' }}></i> Request Pro Access
              </button>
              <button onClick={() => setIsUpgradeModalOpen(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', padding: '13px', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13.5px', cursor: 'pointer', transition: '0.2s' }}>
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
