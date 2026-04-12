import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';

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

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, supabaseUser, isLoading } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('overview');
  
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !supabaseUser) {
      navigate('/login');
    }
  }, [supabaseUser, isLoading, navigate]);

  const currentRole = currentUser?.role || 'basic';

  // Smart routing when role changes
  useEffect(() => {
    if ((currentRole === 'worker' || currentRole === 'basic') && ['company', 'staff', 'billing'].includes(currentTab)) {
      setCurrentTab('overview');
    } else if (currentRole === 'premium' && currentTab === 'staff') {
      setCurrentTab('overview');
    }
  }, [currentRole, currentTab]);

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

  const profileData = {
    name: currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : "Loading...",
    role: currentRole === 'admin' ? 'Agency Admin' : currentRole === 'premium' ? 'Premium Agent' : currentRole === 'worker' ? 'Staff Agent' : 'Private Lister',
    sideName: currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : "Loading...",
    sideRole: currentRole === 'admin' ? 'Agency Pro' : currentRole === 'premium' ? 'Premium Plan' : currentRole === 'worker' ? 'Elite Realty' : 'Basic Plan',
    avatar: currentUser?.avatar_url ? `url('${currentUser.avatar_url}')` : "url('https://ui-avatars.com/api/?name=User&background=1FE6D4&color=021211')",
    sideAvatar: currentUser?.avatar_url ? `url('${currentUser.avatar_url}')` : "url('https://ui-avatars.com/api/?name=User&background=1FE6D4&color=021211')"
  };

  const handleUpgradeClick = () => {
    setIsUpgradeModalOpen(true);
  };

  const requestProAccess = () => {
    const message = encodeURIComponent("Hi Nextmove, I would like to request Pro Access for my agency to unlock unlimited listings and premium features.");
    window.open(`https://wa.me/263771234567?text=${message}`, '_blank');
    setIsUpgradeModalOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FE6D4]"></div></div>;
  }

  if (!supabaseUser) return null;

  return (
    <div className={`nm-dash-wrapper role-${currentRole}`}>
      <aside className={`nm-sidebar ${isSidebarOpen ? 'active' : ''}`} id="dashSidebar">
        <div className="nm-sidebar-header">
          <Link to="/" className="nm-logo-wrap">
            <img src="https://image2url.com/r2/bucket2/images/1775993105962-31e87a44-28d1-4cf3-a0e7-3d505b5a82bc.png" alt="Logo" />
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
          
          <button onClick={handleSignOut} className="nm-logout"><i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</button>
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
          {currentTab === 'wallet' && <Wallet />}
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
    </div>
  );
}