import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="nm-dash-wrapper">
      <div className={`nm-sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="nm-sidebar-header">
          <Link to="/" className="nm-logo-wrap">
            <img src="https://willowandelm.co.zw/wp-content/uploads/2026/03/nextmove.-5.png.png" alt="Logo" />
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
          <a href="#" className="nm-nav-item active">
            <i className="fa-solid fa-chart-pie"></i> Overview
          </a>
          <a href="#" className="nm-nav-item">
            <i className="fa-solid fa-house"></i> Properties
          </a>
          <a href="#" className="nm-nav-item">
            <i className="fa-solid fa-users"></i> Leads
          </a>
          <a href="#" className="nm-nav-item">
            <i className="fa-solid fa-chart-line"></i> Analytics
          </a>
          <div className="nm-nav-label">Settings</div>
          <a href="#" className="nm-nav-item">
            <i className="fa-solid fa-user"></i> Profile
          </a>
          <a href="#" className="nm-nav-item">
            <i className="fa-solid fa-gear"></i> Preferences
          </a>
        </div>

        <div className="nm-sidebar-footer">
          <a href="#" className="nm-upsell-btn">Upgrade to Pro</a>
          <Link to="/profile" className="nm-sidebar-profile-card">
            <div className="nm-sp-avatar" style={{ backgroundImage: "url('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150')" }}></div>
            <div className="nm-sp-info">
              <div className="nm-sp-name">Sarah Jenkins</div>
              <div className="nm-sp-role">Principal Agent</div>
            </div>
          </Link>
          <Link to="/" className="nm-logout">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out
          </Link>
        </div>
      </div>

      <div className={`nm-sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>

      <div className="nm-main">
        <div className="we-header-wrapper">
          <header className="we-header">
            <div className="nm-header-left">
              <button className="nm-mobile-hamburger" onClick={() => setIsSidebarOpen(true)}>
                <i className="fa-solid fa-bars"></i>
              </button>
              <div className="nm-search-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search properties, leads..." />
              </div>
            </div>

            <div className="we-action-group">
              <div className="nm-notif-wrap">
                <button className="nm-icon-btn">
                  <i className="fa-regular fa-bell"></i>
                </button>
              </div>
              <button className="we-plus-circle">
                <i className="fa-solid fa-plus"></i>
              </button>
              <div className="nm-user-profile">
                <div className="nm-user-text">
                  <div className="nm-user-name">Sarah Jenkins</div>
                  <div className="nm-user-role">Principal Agent</div>
                </div>
                <div className="nm-user-img"></div>
              </div>
            </div>
          </header>
        </div>

        <div className="nm-content-scroll">
          <div className="nm-page-header">
            <div>
              <h1>Dashboard Overview</h1>
              <p>Welcome back, Sarah. Here's what's happening today.</p>
            </div>
            <button className="nm-btn-save">
              <i className="fa-solid fa-download"></i> Export Report
            </button>
          </div>

          <div className="nm-stats-grid">
            <div className="nm-stat-card highlight">
              <div className="nm-stat-icon">
                <i className="fa-solid fa-house"></i>
              </div>
              <div className="nm-stat-label">Active Listings</div>
              <div className="nm-stat-value">24</div>
              <div className="nm-stat-trend"><i className="fa-solid fa-arrow-up"></i> 12%</div>
            </div>
            <div className="nm-stat-card">
              <div className="nm-stat-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <div className="nm-stat-label">New Leads</div>
              <div className="nm-stat-value">156</div>
              <div className="nm-stat-trend"><i className="fa-solid fa-arrow-up"></i> 8%</div>
            </div>
            <div className="nm-stat-card">
              <div className="nm-stat-icon">
                <i className="fa-solid fa-eye"></i>
              </div>
              <div className="nm-stat-label">Profile Views</div>
              <div className="nm-stat-value">1.2k</div>
              <div className="nm-stat-trend"><i className="fa-solid fa-arrow-up"></i> 24%</div>
            </div>
            <div className="nm-stat-card">
              <div className="nm-stat-icon">
                <i className="fa-solid fa-check-double"></i>
              </div>
              <div className="nm-stat-label">Properties Sold</div>
              <div className="nm-stat-value">8</div>
            </div>
          </div>

          <div className="nm-bottom-grid">
            <div className="nm-table-card">
              <div className="nm-section-header" style={{ padding: '25px 25px 0 25px' }}>
                <h3>Recent Properties</h3>
                <button className="nm-btn-outline">View All</button>
              </div>
              <div className="nm-table-wrapper">
                <table className="nm-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Status</th>
                      <th>Price</th>
                      <th>Date Added</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-label="Property">
                        <div className="nm-td-flex">
                          <div className="nm-thumb" style={{ backgroundImage: "url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800')" }}></div>
                          <div className="nm-info-text">
                            <strong>The Glass Pavilion</strong>
                            <span>Borrowdale Brooke</span>
                          </div>
                        </div>
                      </td>
                      <td data-label="Status"><span className="nm-badge active">Active</span></td>
                      <td data-label="Price"><strong>$850,000</strong></td>
                      <td data-label="Date Added">Mar 15, 2026</td>
                      <td data-label="Actions">
                        <div className="nm-actions">
                          <button className="nm-action-btn"><i className="fa-solid fa-pen"></i></button>
                          <button className="nm-action-btn danger"><i className="fa-solid fa-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td data-label="Property">
                        <div className="nm-td-flex">
                          <div className="nm-thumb" style={{ backgroundImage: "url('https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800')" }}></div>
                          <div className="nm-info-text">
                            <strong>The Nexus Tower</strong>
                            <span>CBD, Harare</span>
                          </div>
                        </div>
                      </td>
                      <td data-label="Status"><span className="nm-badge pending">Pending</span></td>
                      <td data-label="Price"><strong>$2,500/mo</strong></td>
                      <td data-label="Date Added">Mar 12, 2026</td>
                      <td data-label="Actions">
                        <div className="nm-actions">
                          <button className="nm-action-btn"><i className="fa-solid fa-pen"></i></button>
                          <button className="nm-action-btn danger"><i className="fa-solid fa-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td data-label="Property">
                        <div className="nm-td-flex">
                          <div className="nm-thumb" style={{ backgroundImage: "url('https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800')" }}></div>
                          <div className="nm-info-text">
                            <strong>Willow Terrace</strong>
                            <span>Greendale</span>
                          </div>
                        </div>
                      </td>
                      <td data-label="Status"><span className="nm-badge sold">Sold</span></td>
                      <td data-label="Price"><strong>$450,000</strong></td>
                      <td data-label="Date Added">Mar 01, 2026</td>
                      <td data-label="Actions">
                        <div className="nm-actions">
                          <button className="nm-action-btn"><i className="fa-solid fa-pen"></i></button>
                          <button className="nm-action-btn danger"><i className="fa-solid fa-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="nm-card" id="activityCol">
              <div className="nm-section-header">
                <h3>Recent Activity</h3>
              </div>
              <div className="nm-activity-row">
                <div className="nm-activity-label">
                  <div className="dot" style={{ background: '#10b981' }}></div>
                  New Lead: John Doe
                </div>
                <div className="nm-activity-value">2m ago</div>
              </div>
              <div className="nm-activity-row">
                <div className="nm-activity-label">
                  <div className="dot" style={{ background: '#f59e0b' }}></div>
                  Viewing Scheduled
                </div>
                <div className="nm-activity-value">1h ago</div>
              </div>
              <div className="nm-activity-row">
                <div className="nm-activity-label">
                  <div className="dot" style={{ background: 'var(--brand)' }}></div>
                  Property Updated
                </div>
                <div className="nm-activity-value">3h ago</div>
              </div>
              <div className="nm-activity-row">
                <div className="nm-activity-label">
                  <div className="dot" style={{ background: '#6b7280' }}></div>
                  Message Received
                </div>
                <div className="nm-activity-value">1d ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
