
import React, { useState, useEffect } from 'react';
import './GladeDashboard.css';

export default function GladeDashboard() {
    const [activeTab, setActiveTab] = useState('cms');
    const [sidebarActive, setSidebarActive] = useState(false);
    const [notifActive, setNotifActive] = useState(false);
    const [authModalActive, setAuthModalActive] = useState(false);
    const [listingPageActive, setListingPageActive] = useState(false);

    const switchTab = (tab: string) => {
        setActiveTab(tab);
        setSidebarActive(false);
    };

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const toggleNotifications = (e: React.MouseEvent) => {
        e.stopPropagation();
        setNotifActive(!notifActive);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (notifActive && !target.closest('.nm-notification-popover') && !target.closest('.nm-notif-wrap')) {
                setNotifActive(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [notifActive]);

    return (
        <>
            <div className="nm-dash-wrapper" id="dashWrapper">
    
    <div className={`nm-sidebar-overlay ${sidebarActive ? 'active' : ''}`} id="dashOverlay" onClick={toggleSidebar}></div>

    <aside className={`nm-sidebar ${sidebarActive ? 'active' : ''}`} id="dashSidebar">
        <div className="nm-sidebar-header">
            <a href="#" className="nm-logo-wrap">
                <img src="https://willowandelm.co.zw/wp-content/uploads/2026/03/nextmove.-5.png.png" alt="nextmove Logo" />
                <div className="nm-site-title"><span className="title-black">next</span><span className="title-brand">move</span></div>
            </a>
            <button className="nm-close-sidebar" onClick={toggleSidebar}><i className="fa-solid fa-xmark"></i></button>
        </div>

        <div className="nm-sidebar-menu">
            <div className="nm-nav-label">The Glade</div>
            
            <a className={`nm-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => switchTab('overview')}>
                <i className="fa-solid fa-gauge-high"></i> Overview
            </a>
            <a className="nm-nav-item" onClick={() => switchTab('ecocash')}>
                <i className="fa-solid fa-money-bill-transfer"></i> EcoCash Queue
                <span className="nm-nav-badge">12</span>
            </a>
            <a className="nm-nav-item" onClick={() => switchTab('listings')}>
                <i className="fa-solid fa-house-flag"></i> Manage Listings
            </a>
            <a className="nm-nav-item" onClick={() => switchTab('users')}>
                <i className="fa-solid fa-users"></i> Manage Users
            </a>
            <a className="nm-nav-item" onClick={() => switchTab('cms')}>
                <i className="fa-solid fa-pen-ruler"></i> Homepage CMS
            </a>
        </div>

        <div className="nm-sidebar-footer">
            <div className="nm-sidebar-profile-card">
                <div className="nm-sp-avatar"><i className="fa-solid fa-bolt"></i></div>
                <div className="nm-sp-info">
                    <span className="nm-sp-name">System Admin</span>
                    <span className="nm-sp-role">Tinker Mode</span>
                </div>
            </div>
            
            <a href="#" className="nm-logout"><i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</a>
        </div>
    </aside>

    <main className="nm-main">
        
        <div className="we-header-wrapper">
            <header className="we-header">
                
                <div className="nm-header-left">
                    <button className="nm-mobile-hamburger" onClick={toggleSidebar}><i className="fa-solid fa-bars-staggered"></i></button>

                    <div className="nm-search-box">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Search system logs, IDs..." />
                    </div>
                </div>

                <div className="we-action-group nm-header-right">
                    
                    <div className="nm-notif-wrap">
                        <button className="nm-icon-btn" onClick={toggleNotifications}><i className="fa-regular fa-bell"></i></button>
                        
                        <div className="nm-notification-popover" id="notifPopover" onClick={() => { /* event.stopPropagation() */ }}>
                            <div className="nm-notif-header">
                                <h4>Notifications</h4>
                                <a href="#" className="nm-notif-mark">Mark all as read</a>
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
                                    <div className="nm-notif-icon" style={{"background":"rgba(16, 185, 129, 0.1)","color":"#10b981"}}><i className="fa-solid fa-check"></i></div>
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
                            <span className="nm-user-name">System Admin</span>
                            <span className="nm-user-role">Tinker Mode</span>
                        </div>
                        <div className="nm-user-img"><i className="fa-solid fa-bolt" style={{"fontSize":"16px"}}></i></div>
                    </div>
                </div>
            </header>
        </div>

        <div className="nm-content-scroll">
            
            <div id="viewOverview" className="nm-view" style={{ display: activeTab === 'overview' ? 'block' : 'none' }}>
                <div className="nm-page-header">
                    <div>
                        <h1>Command Center</h1>
                        <p>Platform overview and system health.</p>
                    </div>
                </div>

                <div className="nm-stats-grid">
                    <div className="nm-stat-card">
                        <div className="nm-stat-icon"><i className="fa-solid fa-sack-dollar"></i></div>
                        <div><div className="nm-stat-label">Monthly Revenue</div><div className="nm-stat-value">$4,250</div></div>
                        <div className="nm-stat-trend"><i className="fa-solid fa-arrow-trend-up"></i> 18%</div>
                    </div>
                    <div className="nm-stat-card highlight">
                        <div className="nm-stat-icon"><i className="fa-solid fa-money-bill-transfer"></i></div>
                        <div><div className="nm-stat-label">Pending Payments</div><div className="nm-stat-value">12</div></div>
                    </div>
                    <div className="nm-stat-card">
                        <div className="nm-stat-icon"><i className="fa-solid fa-house"></i></div>
                        <div><div className="nm-stat-label">Active Listings</div><div className="nm-stat-value">3,402</div></div>
                    </div>
                    <div className="nm-stat-card">
                        <div className="nm-stat-icon"><i className="fa-solid fa-users"></i></div>
                        <div><div className="nm-stat-label">Total Users</div><div className="nm-stat-value">892</div></div>
                    </div>
                </div>

                <div className="nm-bottom-grid">
                    <div>
                        <div className="nm-section-header"><h3>Recent System Activity</h3></div>
                        <div className="nm-table-card">
                            <table className="nm-table">
                                <thead><tr><th>Event</th><th>User / Agency</th><th>Date</th></tr></thead>
                                <tbody>
                                    <tr>
                                        <td data-label="Event"><div className="nm-info-text"><strong>New Listing Published</strong><span>Modern Villa, Borrowdale</span></div></td>
                                        <td data-label="User"><div className="nm-td-flex"><div className="nm-avatar initials" style={{"background":"rgba(31, 230, 212, 0.15)","color":"#0ba395"}}>WE</div><div className="nm-info-text"><strong>Willow & Elm</strong><span>Agency</span></div></div></td>
                                        <td data-label="Date"><div className="nm-info-text"><span>10 mins ago</span></div></td>
                                    </tr>
                                    <tr>
                                        <td data-label="Event"><div className="nm-info-text"><strong>New User Registration</strong><span>Account Created</span></div></td>
                                        <td data-label="User"><div className="nm-td-flex"><div className="nm-avatar initials" style={{"background":"var(--input-bg)","color":"var(--dark)"}}>JD</div><div className="nm-info-text"><strong>John Doe</strong><span>Basic User</span></div></div></td>
                                        <td data-label="Date"><div className="nm-info-text"><span>45 mins ago</span></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div>
                        <div className="nm-section-header"><h3>Quick Actions</h3></div>
                        <div className="nm-card">
                            <div className="nm-activity-row">
                                <div className="nm-activity-label"><div className="dot" style={{"background":"#1FE6D4"}}></div> Run Database Backup</div>
                                <button className="nm-action-btn"><i className="fa-solid fa-arrow-right"></i></button>
                            </div>
                            <div className="nm-activity-row">
                                <div className="nm-activity-label"><div className="dot" style={{"background":"#f59e0b"}}></div> Clear Cache</div>
                                <button className="nm-action-btn"><i className="fa-solid fa-arrow-right"></i></button>
                            </div>
                            <div className="nm-activity-row">
                                <div className="nm-activity-label"><div className="dot" style={{"background":"#10b981"}}></div> Platform Settings</div>
                                <button className="nm-action-btn"><i className="fa-solid fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="viewEcoCash" className="nm-view" style={{ display: activeTab === 'ecocash' ? 'block' : 'none' }}>
                <div className="nm-page-header">
                    <div>
                        <h1>EcoCash Approvals</h1>
                        <p>Verify transaction IDs against your merchant statement and approve upgrades.</p>
                    </div>
                </div>

                <div className="nm-table-card">
                    <table className="nm-table">
                        <thead><tr><th>User / Company</th><th>Requested Plan</th><th>EcoCash Txn ID</th><th>Actions</th></tr></thead>
                        <tbody>
                            <tr>
                                <td data-label="User"><div className="nm-td-flex"><div className="nm-avatar initials">JD</div><div className="nm-info-text"><strong>John Doe</strong><span>Individual Pro</span></div></div></td>
                                <td data-label="Plan"><strong>$9.99/mo</strong></td>
                                <td data-label="Txn ID"><span className="nm-txn-code">PP240318X9A</span></td>
                                <td data-label="Actions">
                                    <div className="nm-actions">
                                        <button className="nm-action-btn success" title="Approve"><i className="fa-solid fa-check"></i></button>
                                        <button className="nm-action-btn danger" title="Decline"><i className="fa-solid fa-xmark"></i></button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="User"><div className="nm-td-flex"><div className="nm-avatar initials" style={{"background":"rgba(245, 158, 11, 0.1)","color":"#f59e0b"}}>AR</div><div className="nm-info-text"><strong>Apex Realty</strong><span>Team Upgrade</span></div></div></td>
                                <td data-label="Plan"><strong>$19.99/mo</strong></td>
                                <td data-label="Txn ID"><span className="nm-txn-code">PP240318Z7B</span></td>
                                <td data-label="Actions">
                                    <div className="nm-actions">
                                        <button className="nm-action-btn success" title="Approve"><i className="fa-solid fa-check"></i></button>
                                        <button className="nm-action-btn danger" title="Decline"><i className="fa-solid fa-xmark"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="viewListings" className="nm-view" style={{ display: activeTab === 'listings' ? 'block' : 'none' }}>
                <div className="nm-page-header">
                    <div>
                        <h1>Global Listing Moderation</h1>
                        <p>Monitor, feature, or ban properties across the entire platform.</p>
                    </div>
                    <div className="nm-search-box" style={{"width":"250px"}}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Search by ID or Title..." />
                    </div>
                </div>

                <div className="nm-filter-slider-container">
                    <div className="nm-filter-pills">
                        <div className="nm-pill active"><i className="fa-solid fa-earth-africa"></i> All Listings</div>
                        <div className="nm-pill"><i className="fa-solid fa-house"></i> Residential</div>
                        <div className="nm-pill"><i className="fa-solid fa-vector-square"></i> Stands</div>
                        <div className="nm-pill"><i className="fa-solid fa-building"></i> Commercial</div>
                        <div className="nm-pill" style={{"borderColor":"#f59e0b","color":"#f59e0b"}}><i className="fa-solid fa-clock-rotate-left"></i> Pending Review</div>
                    </div>
                </div>

                <div className="nm-table-card">
                    <table className="nm-table">
                        <thead><tr><th>Property</th><th>Details</th><th>Lister</th><th>Status</th><th>Tinker Actions</th></tr></thead>
                        <tbody>
                            <tr>
                                <td data-label="Property">
                                    <div className="nm-td-flex">
                                        <div className="nm-thumb" style={{"backgroundImage":"url('https"}}></div>
                                        <div className="nm-info-text"><strong>The Glass Pavilion</strong><span>ID: #1042 • Borrowdale Brooke</span></div>
                                    </div>
                                </td>
                                <td data-label="Details">
                                    <div className="nm-info-text"><strong>$850,000</strong><span>Residential • Full house</span></div>
                                </td>
                                <td data-label="Lister">
                                    <div className="nm-td-flex">
                                        <div className="nm-avatar initials">WE</div>
                                        <div className="nm-info-text"><strong>Willow & Elm</strong><span>Agency</span></div>
                                    </div>
                                </td>
                                <td data-label="Status"><span className="nm-badge active">Active</span></td>
                                <td data-label="Tinker Actions">
                                    <div className="nm-actions">
                                        <button className="nm-action-btn warn" title="Pin to Top"><i className="fa-solid fa-star"></i></button>
                                        <button className="nm-action-btn success" title="Mark Featured"><i className="fa-solid fa-bolt"></i></button>
                                        <button className="nm-action-btn danger" title="Delete Listing"><i className="fa-regular fa-trash-can"></i></button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="Property">
                                    <div className="nm-td-flex">
                                        <div className="nm-thumb" style={{"backgroundImage":"url('https"}}></div>
                                        <div className="nm-info-text"><strong>Garden City Lofts</strong><span>ID: #1089 • Avondale</span></div>
                                    </div>
                                </td>
                                <td data-label="Details">
                                    <div className="nm-info-text"><strong>$1,500/mo</strong><span>Residential • Apartment</span></div>
                                </td>
                                <td data-label="Lister">
                                    <div className="nm-td-flex">
                                        <div className="nm-avatar initials" style={{"background":"var(--input-bg)","color":"var(--dark)"}}>JD</div>
                                        <div className="nm-info-text"><strong>John Doe</strong><span>Basic User</span></div>
                                    </div>
                                </td>
                                <td data-label="Status"><span className="nm-badge pending">Pending</span></td>
                                <td data-label="Tinker Actions">
                                    <div className="nm-actions">
                                        <button className="nm-action-btn warn" title="Pin to Top"><i className="fa-solid fa-star"></i></button>
                                        <button className="nm-action-btn success" title="Mark Featured"><i className="fa-solid fa-bolt"></i></button>
                                        <button className="nm-action-btn danger" title="Delete Listing"><i className="fa-regular fa-trash-can"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="viewCMS" className="nm-view" style={{ display: activeTab === 'cms' ? 'block' : 'none' }}>
                <div className="nm-page-header">
                    <div>
                        <h1>Homepage Builder</h1>
                        <p>Control the hero banner and rearrange pinned layouts on the public site.</p>
                    </div>
                    <button className="nm-btn-save"><i className="fa-solid fa-cloud-arrow-up"></i> Publish Changes</button>
                </div>

                <div className="nm-section-header" style={{"marginTop":"10px"}}><h3>1. Main Hero Section</h3></div>
                <div className="nm-editor-grid">
                    <div className="nm-card">
                        <label className="nm-form-label" style={{"textAlign":"center"}}>Hero Background (Optional)</label>
                        <div className="nm-upload-zone" style={{"padding":"30px 20px"}}>
                            <i className="fa-regular fa-image" style={{"fontSize":"24px","marginBottom":"5px"}}></i>
                            <p style={{"fontSize":"13px"}}>Upload Image</p>
                            <span style={{"fontSize":"11px"}}>1920 x 1080px</span>
                        </div>
                    </div>
                    <div className="nm-card">
                        <div className="nm-form-grid">
                            <div className="nm-form-group full">
                                <label className="nm-form-label">Trust Badge Text</label>
                                <input type="text" className="nm-form-input" value="2500+ Properties Sold" />
                            </div>
                            <div className="nm-form-group full">
                                <label className="nm-form-label">Primary Headline</label>
                                <input type="text" className="nm-form-input" value="Find your dream space." />
                            </div>
                            <div className="nm-form-group full">
                                <label className="nm-form-label">Sub-Headline</label>
                                <textarea className="nm-form-textarea" style={{"minHeight":"80px"}}>Premium residential stands and luxury plots across Harare’s most prestigious neighborhoods. Curated listings and verified title deeds.</textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nm-section-header" style={{"marginTop":"40px"}}>
                    <h3>2. Promo Carousel</h3>
                    <button className="nm-btn-outline"><i className="fa-solid fa-plus"></i> Add Promo Card</button>
                </div>
                <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit, minmax(300px, 1fr))","gap":"20px"}}>
                    
                    <div className="nm-card" style={{"padding":"20px"}}>
                        <div className="nm-form-group"><label className="nm-form-label">Tagline Badge</label><input type="text" className="nm-form-input" value="Featured" /></div>
                        <div className="nm-form-group"><label className="nm-form-label">Image URL</label><input type="text" className="nm-form-input" value="https://i.pinimg.com/...jpg" /></div>
                        <div className="nm-form-group"><label className="nm-form-label">Location</label><input type="text" className="nm-form-input" value="Greystone Park, Harare" /></div>
                        <div className="nm-form-group"><label className="nm-form-label">Title</label><input type="text" className="nm-form-input" value="Luxury Hillside Stands" /></div>
                        <div className="nm-form-group"><label className="nm-form-label">Price & Suffix</label>
                            <div style={{"display":"flex","gap":"10px"}}>
                                <input type="text" className="nm-form-input" value="$45" />
                                <input type="text" className="nm-form-input" value="/sqm" />
                            </div>
                        </div>
                        <div className="nm-form-group">
                            <label className="nm-form-label">Link URL</label>
                            <input type="text" className="nm-form-input" placeholder="https://..." value="/property/1042" />
                        </div>
                        <div className="nm-actions" style={{"marginTop":"15px"}}>
                            <button className="nm-action-btn"><i className="fa-solid fa-chevron-left"></i></button>
                            <button className="nm-action-btn"><i className="fa-solid fa-chevron-right"></i></button>
                            <button className="nm-action-btn danger"><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>

                    <div className="nm-card" style={{"padding":"20px"}}>
                        <div className="nm-form-group"><label className="nm-form-label">Tagline Badge</label><input type="text" className="nm-form-input" value="Reduced $" /></div>
                        <div className="nm-form-group"><label className="nm-form-label">Image URL</label><input type="text" className="nm-form-input" value="https://i.pinimg.com/...jpg" /></div>
                        <div className="nm-form-group"><label className="nm-form-label">Location</label><input type="text" className="nm-form-input" value="Avondale Heights, Harare" /></div>
                        <div className="nm-form-group"><label className="nm-form-label">Title</label><input type="text" className="nm-form-input" value="Luxury 2-Bed Apartments" /></div>
                        <div className="nm-form-group"><label className="nm-form-label">Price & Suffix</label>
                            <div style={{"display":"flex","gap":"10px"}}>
                                <input type="text" className="nm-form-input" value="$1,200" />
                                <input type="text" className="nm-form-input" value="/mo" />
                            </div>
                        </div>
                        <div className="nm-form-group">
                            <label className="nm-form-label">Link URL</label>
                            <input type="text" className="nm-form-input" placeholder="https://..." value="/property/1089" />
                        </div>
                        <div className="nm-actions" style={{"marginTop":"15px"}}>
                            <button className="nm-action-btn"><i className="fa-solid fa-chevron-left"></i></button>
                            <button className="nm-action-btn"><i className="fa-solid fa-chevron-right"></i></button>
                            <button className="nm-action-btn danger"><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>

                </div>

                <div className="nm-section-header" style={{"marginTop":"40px"}}><h3>3. Mid-Page Search Banner</h3></div>
                <div className="nm-card">
                    <div className="nm-form-grid">
                        <div className="nm-form-group">
                            <label className="nm-form-label">Banner Headline</label>
                            <input type="text" className="nm-form-input" value="Find your spot on the map." />
                        </div>
                        <div className="nm-form-group">
                            <label className="nm-form-label">Banner Subtitle</label>
                            <input type="text" className="nm-form-input" value="Search by neighborhood, soil type, or price range to find the perfect stand for your future home." />
                        </div>
                    </div>
                </div>

                <div className="nm-section-header" style={{"marginTop":"40px"}}><h3>4. Pinned Listing Carousels</h3></div>
                <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit, minmax(320px, 1fr))","gap":"25px"}}>
                    
                    <div className="nm-card">
                        <h3 style={{"fontFamily":"'Poppins'","fontSize":"16px","margin":"0 0 5px 0","color":"var(--dark)"}}>Section: Latest Listings</h3>
                        <input type="text" className="nm-form-input" value="Featured properties across all categories." style={{"marginBottom":"20px","fontSize":"12px"}} />
                        
                        <div style={{"display":"flex","gap":"10px","marginBottom":"20px"}}>
                            <input type="text" className="nm-form-input" placeholder="Paste Property ID (e.g. #1042)" style={{"flex":"1"}} />
                            <button className="nm-btn-save" style={{"borderRadius":"12px","padding":"10px 15px"}}><i className="fa-solid fa-plus"></i> Pin</button>
                        </div>
                        
                        <div className="nm-update-list-item">
                            <div className="nm-update-list-info">
                                <div className="nm-update-thumb" style={{"backgroundImage":"url('https"}}></div>
                                <div className="nm-update-text">
                                    <h4>The Glass Pavilion</h4>
                                    <p>ID: #1042</p>
                                </div>
                            </div>
                            <div className="nm-actions">
                                <button className="nm-action-btn"><i className="fa-solid fa-chevron-up"></i></button>
                                <button className="nm-action-btn"><i className="fa-solid fa-chevron-down"></i></button>
                                <button className="nm-action-btn danger"><i className="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>

                        <div className="nm-update-list-item">
                            <div className="nm-update-list-info">
                                <div className="nm-update-thumb" style={{"backgroundImage":"url('https"}}></div>
                                <div className="nm-update-text">
                                    <h4>Garden City Lofts</h4>
                                    <p>ID: #1089</p>
                                </div>
                            </div>
                            <div className="nm-actions">
                                <button className="nm-action-btn"><i className="fa-solid fa-chevron-up"></i></button>
                                <button className="nm-action-btn"><i className="fa-solid fa-chevron-down"></i></button>
                                <button className="nm-action-btn danger"><i className="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>
                    </div>

                    <div className="nm-card">
                        <h3 style={{"fontFamily":"'Poppins'","fontSize":"16px","margin":"0 0 5px 0","color":"var(--dark)"}}>Section: Premium Stands</h3>
                        <input type="text" className="nm-form-input" value="Investment-ready land with verified infrastructure." style={{"marginBottom":"20px","fontSize":"12px"}} />

                        <div style={{"display":"flex","gap":"10px","marginBottom":"20px"}}>
                            <input type="text" className="nm-form-input" placeholder="Paste Property ID (e.g. #2055)" style={{"flex":"1"}} />
                            <button className="nm-btn-save" style={{"borderRadius":"12px","padding":"10px 15px"}}><i className="fa-solid fa-plus"></i> Pin</button>
                        </div>
                        
                        <div className="nm-update-list-item">
                            <div className="nm-update-list-info">
                                <div className="nm-update-thumb" style={{"backgroundImage":"url('https"}}></div>
                                <div className="nm-update-text">
                                    <h4>Glen Lorne Extension</h4>
                                    <p>ID: #2055</p>
                                </div>
                            </div>
                            <div className="nm-actions">
                                <button className="nm-action-btn"><i className="fa-solid fa-chevron-up"></i></button>
                                <button className="nm-action-btn"><i className="fa-solid fa-chevron-down"></i></button>
                                <button className="nm-action-btn danger"><i className="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>
                    </div>

                    <div className="nm-card">
                        <h3 style={{"fontFamily":"'Poppins'","fontSize":"16px","margin":"0 0 5px 0","color":"var(--dark)"}}>Section: Recently Sold</h3>
                        <input type="text" className="nm-form-input" value="Properties that successfully found new owners." style={{"marginBottom":"20px","fontSize":"12px"}} />

                        <div style={{"display":"flex","gap":"10px","marginBottom":"20px"}}>
                            <input type="text" className="nm-form-input" placeholder="Paste Property ID (e.g. #3011)" style={{"flex":"1"}} />
                            <button className="nm-btn-save" style={{"borderRadius":"12px","padding":"10px 15px"}}><i className="fa-solid fa-plus"></i> Pin</button>
                        </div>
                        
                        <div className="nm-update-list-item">
                            <div className="nm-update-list-info">
                                <div className="nm-update-thumb" style={{"backgroundImage":"url('https"}}></div>
                                <div className="nm-update-text">
                                    <h4>Highlands Manor</h4>
                                    <p>ID: #3011</p>
                                </div>
                            </div>
                            <div className="nm-actions">
                                <button className="nm-action-btn"><i className="fa-solid fa-chevron-up"></i></button>
                                <button className="nm-action-btn"><i className="fa-solid fa-chevron-down"></i></button>
                                <button className="nm-action-btn danger"><i className="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div id="viewUsers" className="nm-view" style={{ display: activeTab === 'users' ? 'block' : 'none' }}>
                <div className="nm-page-header">
                    <div>
                        <h1>Manage Users</h1>
                        <p>Global directory of all registered accounts.</p>
                    </div>
                    <div className="nm-search-box" style={{"width":"250px"}}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Search by name or email..." />
                    </div>
                </div>

                <div className="nm-table-card">
                    <table className="nm-table">
                        <thead><tr><th>User</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            <tr>
                                <td data-label="User">
                                    <div className="nm-td-flex">
                                        <div className="nm-avatar initials" style={{"background":"rgba(31, 230, 212, 0.15)","color":"#0ba395"}}>WE</div>
                                        <div className="nm-info-text"><strong>Willow & Elm</strong><span>hello@willowelm.co.zw</span></div>
                                    </div>
                                </td>
                                <td data-label="Role">Agency Pro</td>
                                <td data-label="Status"><span className="nm-badge active">Active</span></td>
                                <td data-label="Actions">
                                    <div className="nm-actions">
                                        <button className="nm-action-btn"><i className="fa-solid fa-pen-to-square"></i></button>
                                        <button className="nm-action-btn warn" title="Suspend"><i className="fa-solid fa-ban"></i></button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="User">
                                    <div className="nm-td-flex">
                                        <div className="nm-avatar initials" style={{"background":"var(--input-bg)","color":"var(--dark)"}}>JD</div>
                                        <div className="nm-info-text"><strong>John Doe</strong><span>johndoe@gmail.com</span></div>
                                    </div>
                                </td>
                                <td data-label="Role">Basic User</td>
                                <td data-label="Status"><span className="nm-badge active">Active</span></td>
                                <td data-label="Actions">
                                    <div className="nm-actions">
                                        <button className="nm-action-btn"><i className="fa-solid fa-pen-to-square"></i></button>
                                        <button className="nm-action-btn warn" title="Suspend"><i className="fa-solid fa-ban"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </main>
</div>

<div className="we-modal-overlay" id="authModal" onClick={() => setAuthModalActive(false)}>
    <div className="we-auth-card" onClick={() => { /* event.stopPropagation() */ }}>
        <i className="fa-solid fa-xmark we-modal-close-icon" onClick={() => setAuthModalActive(false)}></i>
        <div className="we-auth-icon">
            <i className="fa-solid fa-house-medical"></i>
        </div>
        <h3 className="we-auth-title">List Your Property</h3>
        <p className="we-auth-desc">Join nextmove to connect with thousands of verified buyers and renters in Harare.</p>
        <button className="we-auth-btn we-auth-primary">Create Account</button>
        <button className="we-auth-btn we-auth-secondary">Sign In</button>
    </div>
</div>

<div className={`we-listing-page ${listingPageActive ? 'active' : ''}`} id="addListingPage">
    <div className="we-listing-header">
        <h2>Create New Listing</h2>
        <button className="we-listing-close" onClick={() => setListingPageActive(false)}><i className="fa-solid fa-xmark"></i></button>
    </div>
    
    <div className="we-form-container">
        <div className="we-form-grid">
            
            <div className="we-form-section-title"><i className="fa-solid fa-circle-info"></i> Section 1: Basic Info</div>
            
            <div className="we-form-group full">
                <label className="we-form-label">Property Title</label>
                <input type="text" className="we-form-input" placeholder="e.g. Modern Villa in Borrowdale Brooke" />
            </div>

            <div className="we-form-group">
                <label className="we-form-label">Category</label>
                <select className="we-form-select" id="catSelect" onChange={() => { /* updateFormStructure() */ }}>
                    <option value="">Select Category...</option>
                    <option value="residential">Residential</option>
                    <option value="stand">Stands / Land</option>
                    <option value="commercial">Commercial</option>
                </select>
            </div>

            <div className="we-form-group">
                <label className="we-form-label">Subtype</label>
                <select className="we-form-select" id="subSelect" onChange={() => { /* updateFormStructure() */ }} disabled>
                    <option value="">Select Category First</option>
                </select>
            </div>

            <div className="we-form-group">
                <label className="we-form-label">Listing Type</label>
                <select className="we-form-select">
                    <option>For Sale</option>
                    <option>For Rent</option>
                    <option>Short Stay</option>
                </select>
            </div>
            
            <div className="we-form-group">
                <label className="we-form-label">Availability</label>
                <select className="we-form-select" id="availSelect" onChange={() => { /* toggleAvailDate() */ }}>
                    <option value="now">Available Now</option>
                    <option value="date">Specific Date...</option>
                </select>
            </div>

            <div className="we-form-group dynamic-section" id="availDateGroup">
                <label className="we-form-label">Select Date</label>
                <input type="date" className="we-form-input" />
            </div>

            <div className="we-form-group">
                <label className="we-form-label">Price</label>
                <div style={{"display":"flex","gap":"10px"}}>
                    <select className="we-form-select" style={{"width":"35%"}}>
                        <option>USD</option>
                        <option>ZWG</option>
                    </select>
                    <input type="number" className="we-form-input" placeholder="0.00" style={{"width":"65%"}} />
                </div>
            </div>

            <div className="we-form-group">
                <label className="we-form-label">Total Size</label>
                <input type="number" className="we-form-input" placeholder="e.g. 2000 m²" />
            </div>

            <div className="we-form-group full">
                <label className="we-form-label">Description</label>
                <textarea className="we-form-textarea" placeholder="Describe the property..."></textarea>
            </div>

            <div className="we-form-group full">
                <label className="we-form-label">Photos</label>
                <div className="we-image-upload">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <p>Drag & drop property images here</p>
                    <span>Supports JPG, PNG (Max 5MB each)</span>
                </div>
            </div>

            <div id="details-residential" className="we-form-group full dynamic-section" style={{"display":"none"}}>
                <div className="we-form-section-title"><i className="fa-solid fa-house"></i> Section 2: Property Details (Residential)</div>
                <div className="we-form-grid">
                    <div className="we-form-group"><label className="we-form-label">Bedrooms</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Bathrooms</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Lounges</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Dining Rooms</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Kitchens</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Garages</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Floor Size (m²)</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Stand Size (m²)</label><input type="number" className="we-form-input" /></div>
                </div>

                <div id="sub-room" className="we-form-grid dynamic-section" style={{"marginTop":"20px","display":"none"}}>
                    <div className="we-form-group"><label className="we-form-label">Room Type</label>
                        <select className="we-form-select"><option>Private Room</option><option>Shared Room</option></select>
                    </div>
                    <div className="we-form-group"><label className="we-form-label">Bathroom</label>
                        <select className="we-form-select"><option>Ensuite</option><option>Shared</option></select>
                    </div>
                    <div className="we-form-group"><label className="we-form-label">Max Occupants</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Gender Pref</label>
                        <select className="we-form-select"><option>Any</option><option>Male Only</option><option>Female Only</option></select>
                    </div>
                </div>

                <div id="sub-apt" className="we-form-grid dynamic-section" style={{"marginTop":"20px","display":"none"}}>
                    <div className="we-form-group"><label className="we-form-label">Floor Level</label><input type="text" className="we-form-input" placeholder="e.g. 3rd Floor" /></div>
                    <div className="we-form-group"><label className="we-form-label">Complex Name</label><input type="text" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Levy ($)</label><input type="number" className="we-form-input" placeholder="0.00" /></div>
                </div>

                <div id="sub-cottage" className="we-form-grid dynamic-section" style={{"marginTop":"20px","display":"none"}}>
                    <div className="we-form-group"><label className="we-form-label">Separate Entrance?</label>
                        <select className="we-form-select"><option>Yes</option><option>No</option></select>
                    </div>
                    <div className="we-form-group"><label className="we-form-label">Yard Access?</label>
                        <select className="we-form-select"><option>Yes</option><option>No</option></select>
                    </div>
                </div>
            </div>

            <div id="details-stand" className="we-form-group full dynamic-section" style={{"display":"none"}}>
                <div className="we-form-section-title"><i className="fa-solid fa-earth-africa"></i> Section 2: Property Details (Land)</div>
                <div className="we-form-grid">
                    <div className="we-form-group"><label className="we-form-label">Land Size</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Unit of Measure</label>
                        <select className="we-form-select"><option>Square Meters (m²)</option><option>Hectares (ha)</option><option>Acres</option></select>
                    </div>
                    <div className="we-form-group"><label className="we-form-label">Terrain Type</label>
                        <select className="we-form-select"><option>Flat</option><option>Sloped / Hillside</option></select>
                    </div>
                    <div className="we-form-group"><label className="we-form-label">Corner Stand?</label>
                        <select className="we-form-select"><option>No</option><option>Yes</option></select>
                    </div>
                </div>
            </div>

            <div id="details-com" className="we-form-group full dynamic-section" style={{"display":"none"}}>
                <div className="we-form-section-title"><i className="fa-solid fa-building"></i> Section 2: Property Details (Commercial)</div>
                <div className="we-form-grid">
                    <div className="we-form-group"><label className="we-form-label">Floor Size (m²)</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Total Rooms</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Bathrooms</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Layout</label>
                        <select className="we-form-select"><option>Open Plan</option><option>Partitioned</option></select>
                    </div>
                </div>

                <div id="sub-office" className="we-form-grid dynamic-section" style={{"marginTop":"20px","display":"none"}}>
                    <div className="we-form-group"><label className="we-form-label">No. of Offices</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Boardrooms</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group full"><label className="we-form-label">Reception Area?</label>
                        <select className="we-form-select"><option>Yes</option><option>No</option></select>
                    </div>
                </div>

                <div id="sub-shop" className="we-form-grid dynamic-section" style={{"marginTop":"20px","display":"none"}}>
                    <div className="we-form-group"><label className="we-form-label">Location Type</label>
                        <select className="we-form-select"><option>Inside Mall</option><option>Street Facing</option></select>
                    </div>
                    <div className="we-form-group"><label className="we-form-label">Foot Traffic Level</label>
                        <select className="we-form-select"><option>High</option><option>Medium</option><option>Low</option></select>
                    </div>
                    <div className="we-form-group"><label className="we-form-label">Storage Room?</label>
                        <select className="we-form-select"><option>Yes</option><option>No</option></select>
                    </div>
                    <div className="we-form-group"><label className="we-form-label">Display Windows?</label>
                        <select className="we-form-select"><option>Yes</option><option>No</option></select>
                    </div>
                </div>

                <div id="sub-warehouse" className="we-form-grid dynamic-section" style={{"marginTop":"20px","display":"none"}}>
                    <div className="we-form-group"><label className="we-form-label">Ceiling Height (m)</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Yard Space (m²)</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Roller Shutter Doors</label><input type="number" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Truck Access?</label>
                        <select className="we-form-select"><option>Yes</option><option>No</option></select>
                    </div>
                </div>
            </div>

            <div id="features-res" className="we-form-group full dynamic-section" style={{"display":"none"}}>
                <div className="we-form-section-title"><i className="fa-solid fa-list-check"></i> Section 3: Features & Amenities</div>
                <div className="we-checkbox-grid">
                    <label className="we-check-label"><input type="checkbox" /> Built-in Cupboards</label>
                    <label className="we-check-label"><input type="checkbox" /> Parking Spaces</label>
                    <label className="we-check-label"><input type="checkbox" /> Garden</label>
                    <label className="we-check-label"><input type="checkbox" /> Swimming Pool</label>
                    <label className="we-check-label"><input type="checkbox" /> Borehole</label>
                    <label className="we-check-label"><input type="checkbox" /> Solar Installed</label>
                    <label className="we-check-label"><input type="checkbox" /> Backup Power</label>
                    <label className="we-check-label"><input type="checkbox" /> Staff Quarters</label>
                    <label className="we-check-label"><input type="checkbox" /> Furnished</label>
                    <label className="we-check-label"><input type="checkbox" /> Pet Friendly</label>
                    <label className="we-check-label"><input type="checkbox" /> Security / Guard</label>
                    <label className="we-check-label"><input type="checkbox" /> Wi-Fi / Internet</label>
                </div>
            </div>

            <div id="features-com" className="we-form-group full dynamic-section" style={{"display":"none"}}>
                <div className="we-form-section-title"><i className="fa-solid fa-list-check"></i> Section 3: Features & Amenities</div>
                <div className="we-checkbox-grid">
                    <label className="we-check-label"><input type="checkbox" /> Kitchenette</label>
                    <label className="we-check-label"><input type="checkbox" /> Parking</label>
                    <label className="we-check-label"><input type="checkbox" /> Furnished</label>
                    <label className="we-check-label"><input type="checkbox" /> Air Conditioning</label>
                    <label className="we-check-label"><input type="checkbox" /> Backup Power</label>
                    <label className="we-check-label"><input type="checkbox" /> Internet Ready</label>
                    <label className="we-check-label"><input type="checkbox" /> Security</label>
                    <label className="we-check-label"><input type="checkbox" /> Generator</label>
                    <label className="we-check-label"><input type="checkbox" /> Loading Bay</label>
                    <label className="we-check-label"><input type="checkbox" /> Elevator Access</label>
                    <label className="we-check-label"><input type="checkbox" /> 3-Phase Power</label>
                    <label className="we-check-label"><input type="checkbox" /> Operating Ready</label>
                </div>
            </div>

            <div id="legal-base" className="we-form-group full dynamic-section" style={{"display":"none"}}>
                <div className="we-form-section-title"><i className="fa-solid fa-map-location-dot"></i> Section 4: Location & Legal</div>
                <div className="we-form-grid">
                    <div className="we-form-group"><label className="we-form-label">City</label><input type="text" className="we-form-input" placeholder="e.g. Harare" /></div>
                    <div className="we-form-group"><label className="we-form-label">Area / Suburb</label><input type="text" className="we-form-input" placeholder="e.g. Borrowdale" /></div>
                    <div className="we-form-group full"><label className="we-form-label">Full Address / Street</label><input type="text" className="we-form-input" placeholder="Street name and number" /></div>
                </div>
            </div>

            <div id="legal-stand" className="we-form-group full dynamic-section" style={{"display":"none"}}>
                <div className="we-form-section-title"><i className="fa-solid fa-file-contract"></i> Section 4: Legal & Infrastructure</div>
                
                <div className="we-form-grid" style={{"marginBottom":"25px"}}>
                    <div className="we-form-group"><label className="we-form-label">City</label><input type="text" className="we-form-input" placeholder="e.g. Harare" /></div>
                    <div className="we-form-group"><label className="we-form-label">Area / Suburb</label><input type="text" className="we-form-input" /></div>
                    <div className="we-form-group"><label className="we-form-label">Zoning</label>
                        <select className="we-form-select"><option>Residential</option><option>Commercial</option><option>Agricultural</option><option>Industrial</option></select>
                    </div>
                    <div className="we-form-group"><label className="we-form-label">Legal Status (Title)</label>
                        <select className="we-form-select"><option>Title Deed</option><option>Cession</option><option>Council Allocation</option><option>Developer Agreement</option></select>
                    </div>
                </div>

                <label className="we-form-label" style={{"display":"block","marginBottom":"10px"}}>Services Available</label>
                <div className="we-checkbox-grid" style={{"marginBottom":"25px","background":"var(--input-bg)","padding":"15px","borderRadius":"12px","border":"1px solid var(--border-color)"}}>
                    <label className="we-check-label"><input type="checkbox" /> ZESA Power Available</label>
                    <label className="we-check-label"><input type="checkbox" /> Council Water</label>
                    <label className="we-check-label"><input type="checkbox" /> Main Sewer</label>
                    <label className="we-check-label"><input type="checkbox" /> Tarred Roads</label>
                    <label className="we-check-label"><input type="checkbox" /> Storm Drains</label>
                </div>

                <label className="we-form-label" style={{"display":"block","marginBottom":"10px"}}>Site Condition</label>
                <div className="we-checkbox-grid" style={{"background":"var(--input-bg)","padding":"15px","borderRadius":"12px","border":"1px solid var(--border-color)"}}>
                    <label className="we-check-label"><input type="radio" name="site_cond" /> Fully Serviced</label>
                    <label className="we-check-label"><input type="radio" name="site_cond" /> Partially Serviced</label>
                    <label className="we-check-label"><input type="radio" name="site_cond" /> Unserviced</label>
                    <label className="we-check-label"><input type="checkbox" /> Ready to Build</label>
                    <label className="we-check-label"><input type="checkbox" /> Gated Community</label>
                </div>
            </div>

        </div>

        <button className="we-submit-listing">Publish Listing</button>
    </div>
</div>


        </>
    );
}
