import React, { useState, useEffect } from 'react';
import { getProperties, getViewingRequests, getWallet } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface OverviewProps {
  currentRole: string;
}

export default function Overview({ currentRole }: OverviewProps) {
  const { user, profile } = useAuth();
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);
  const [requestsCount, setRequestsCount] = useState(0);
  const [soldCount, setSoldCount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user || !profile) return;
      try {
        const properties = await getProperties(user.id, profile.role);
        setPropertiesCount(properties.filter(p => p.status === 'active').length);
        setViewsCount(properties.reduce((sum, p) => sum + (p.views_count || 0), 0));
        setSoldCount(properties.filter(p => p.status === 'sold').length);

        const requests = await getViewingRequests(user.id, profile.role);
        setRequestsCount(requests.filter(r => r.status === 'pending').length);
        setRecentRequests(requests.slice(0, 2));

        const wallet = await getWallet(user.id);
        setWalletBalance(wallet?.balance || 0);
      } catch (error) {
        console.error('Failed to load overview data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, profile]);

  const getRoleData = () => {
    switch (currentRole) {
      case 'admin':
        return {
          welcomeText: "Command Center",
          welcomeSub: "Monitor your agency's performance metrics and recent activities in real-time.",
          stat1Label: "Company Active Listings", stat1Val: propertiesCount.toString(),
          stat2Label: "Total Company Views", stat2Val: viewsCount > 1000 ? (viewsCount / 1000).toFixed(1) + "k" : viewsCount.toString(),
          stat3Label: "Company New Requests", stat3Val: requestsCount.toString(),
          stat4Label: "Company Sold Properties", stat4Val: soldCount.toString(),
          tableTitle: "Recent Company Requests",
          rankText: "Your company is in the top 5% this month!"
        };
      case 'premium':
        return {
          welcomeText: "Command Center",
          welcomeSub: "Monitor your portfolio's performance metrics and recent activities in real-time.",
          stat1Label: "Active Listings", stat1Val: propertiesCount.toString(),
          stat2Label: "Total Views", stat2Val: viewsCount > 1000 ? (viewsCount / 1000).toFixed(1) + "k" : viewsCount.toString(),
          stat3Label: "New Requests", stat3Val: requestsCount.toString(),
          stat4Label: "Sold Properties", stat4Val: soldCount.toString(),
          tableTitle: "Recent Requests",
          rankText: "You are in the top 10% this month!"
        };
      case 'worker':
        return {
          welcomeText: "Command Center",
          welcomeSub: "Monitor your assigned portfolio's performance metrics and recent activities in real-time.",
          stat1Label: "My Active Listings", stat1Val: propertiesCount.toString(),
          stat2Label: "Total Profile Views", stat2Val: viewsCount > 1000 ? (viewsCount / 1000).toFixed(1) + "k" : viewsCount.toString(),
          stat3Label: "My New Requests", stat3Val: requestsCount.toString(),
          stat4Label: "My Sold Properties", stat4Val: soldCount.toString(),
          tableTitle: "My Recent Requests",
          rankText: "You are a top performing agent!"
        };
      case 'basic':
      default:
        return {
          welcomeText: "Command Center",
          welcomeSub: "Monitor your property performance metrics and recent activities in real-time.",
          stat1Label: "My Active Listings", stat1Val: propertiesCount.toString(),
          stat2Label: "Total Property Views", stat2Val: viewsCount.toString(),
          stat3Label: "New Requests", stat3Val: requestsCount.toString(),
          stat4Label: "Sold Properties", stat4Val: soldCount.toString(),
          tableTitle: "My Properties",
          rankText: "Upgrade to Premium to boost visibility!"
        };
    }
  };

  const data = getRoleData();

  if (loading) {
    return (
      <div className="nm-view" style={{ display: 'block' }}>
        <p style={{ textAlign: 'center', color: '#9CA3AF', padding: '40px' }}>Loading overview...</p>
      </div>
    );
  }

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div className="nm-page-header-text">
          <h1>{data.welcomeText}</h1>
          <p>{data.welcomeSub}</p>
        </div>
      </div>

      <div className="nm-stats-grid">
        <div className="nm-stat-card">
          <div className="nm-stat-header">
            <div className="nm-stat-icon"><i className="fa-solid fa-house"></i></div>
            <span className="nm-stat-trend"><i className="fa-solid fa-arrow-trend-up"></i> 8%</span>
          </div>
          <div className="nm-stat-value">{data.stat1Val}</div>
          <div className="nm-stat-footer">
            <span className="nm-stat-label">{data.stat1Label}</span>
            <span className="nm-stat-sub">this month</span>
          </div>
        </div>
        <div className="nm-stat-card">
          <div className="nm-stat-header">
            <div className="nm-stat-icon"><i className="fa-regular fa-eye"></i></div>
            <span className="nm-stat-trend"><i className="fa-solid fa-arrow-trend-up"></i> 12%</span>
          </div>
          <div className="nm-stat-value">{data.stat2Val}</div>
          <div className="nm-stat-footer">
            <span className="nm-stat-label">{data.stat2Label}</span>
            <span className="nm-stat-sub">this month</span>
          </div>
        </div>
        <div className="nm-stat-card accent-card">
          <div className="nm-stat-header">
            <div className="nm-stat-icon"><i className="fa-regular fa-calendar"></i></div>
            <span className="nm-stat-trend"><i className="fa-solid fa-arrow-trend-up"></i> 5%</span>
          </div>
          <div className="nm-stat-value">{data.stat3Val}</div>
          <div className="nm-stat-footer">
            <span className="nm-stat-label">{data.stat3Label}</span>
            <span className="nm-stat-sub">new</span>
          </div>
        </div>
        <div className="nm-stat-card highlight">
          <div className="nm-stat-header">
            <div className="nm-stat-icon"><i className="fa-solid fa-chart-line"></i></div>
            <span className="nm-stat-trend"><i className="fa-solid fa-arrow-trend-up"></i> 3%</span>
          </div>
          <div className="nm-stat-value">{data.stat4Val}</div>
          <div className="nm-stat-footer">
            <span className="nm-stat-label">{data.stat4Label}</span>
            <span className="nm-stat-sub">all time</span>
          </div>
        </div>
      </div>

      <div className="nm-bottom-grid">
        <div>
          <div className="nm-section-header"><h3>{data.tableTitle}</h3></div>
          <div className="nm-table-card">
            <table className="nm-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Property</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF' }}>
                      No recent requests
                    </td>
                  </tr>
                ) : (
                  recentRequests.map((req, idx) => {
                    const initials = req.client_name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
                    const createdDate = new Date(req.created_at);
                    const dateStr = createdDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                    const timeStr = createdDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    return (
                      <tr key={req.id} className={req.status === 'pending' ? 'nm-row-pending' : ''}>
                        <td data-label="Client">
                          <div className="nm-td-flex">
                            <div className="nm-avatar initials">{initials}</div>
                            <div className="nm-info-text">
                              <strong>{req.client_name}</strong>
                              <span>{req.client_phone}</span>
                            </div>
                          </div>
                        </td>
                        <td data-label="Property">
                          <div className="nm-info-text">
                            <strong>{req.property?.title || 'Property'}</strong>
                            <span>{req.property?.location || 'Location'}</span>
                          </div>
                        </td>
                        <td data-label="Date">
                          <div className="nm-info-text">
                            <strong>{dateStr}</strong>
                            <span>{timeStr}</span>
                          </div>
                        </td>
                        <td data-label="Status"><span className={`nm-badge ${req.status === 'approved' ? 'active' : req.status === 'pending' ? 'pending' : 'sold'}`}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="nm-section-header"><h3>Activity</h3></div>
          <div className="nm-card">
            <div className="nm-activity-row">
              <div className="nm-activity-label">
                <div className="dot" style={{ background: '#1FE6D4' }}></div> Profile Views
              </div>
              <div className="nm-activity-value">5,452</div>
            </div>
            <div className="nm-activity-row">
              <div className="nm-activity-label">
                <div className="dot" style={{ background: '#10b981' }}></div> Conversion Rate
              </div>
              <div className="nm-activity-value">3.2%</div>
            </div>
            <div className="nm-activity-row">
              <div className="nm-activity-label">
                <div className="dot" style={{ background: '#f59e0b' }}></div> Avg. Response
              </div>
              <div className="nm-activity-value">1.5h</div>
            </div>
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
              <p style={{ fontSize: '12px', color: 'var(--gray-text)', margin: '0 0 5px 0' }}>{data.rankText}</p>
              <div className="nm-progress-bg"><div className="nm-progress-fill"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
