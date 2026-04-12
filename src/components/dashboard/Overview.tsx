import React from 'react';
import { useAppContext } from '../../context/AppContext';

interface OverviewProps {
  currentRole: string;
}

export default function Overview({ currentRole }: OverviewProps) {
  const { properties, requests, currentUser } = useAppContext();

  const activeListings = properties.length;
  const totalViews = properties.reduce((acc, p) => acc + (p.views || 0), 0);
  const newRequests = requests.length;
  const soldProperties = properties.filter(p => p.status === 'sold').length;

  const getRoleData = () => {
    switch (currentRole) {
      case 'admin':
        return {
          welcomeText: `Welcome back, ${currentUser?.first_name || 'Admin'}`,
          welcomeSub: "Here's what's happening with your entire company today.",
          stat1Label: "Company Active Listings", stat1Val: activeListings.toString(),
          stat2Label: "Total Company Views", stat2Val: totalViews.toString(),
          stat3Label: "Company New Requests", stat3Val: newRequests.toString(),
          stat4Label: "Company Sold Properties", stat4Val: soldProperties.toString(),
          tableTitle: "Recent Company Requests",
          rankText: "Your company is in the top 5% this month!"
        };
      case 'premium':
        return {
          welcomeText: `Welcome back, ${currentUser?.first_name || 'Agent'}`,
          welcomeSub: "Here's what's happening with your portfolio today.",
          stat1Label: "Active Listings", stat1Val: activeListings.toString(),
          stat2Label: "Total Views", stat2Val: totalViews.toString(),
          stat3Label: "New Requests", stat3Val: newRequests.toString(),
          stat4Label: "Sold Properties", stat4Val: soldProperties.toString(),
          tableTitle: "Recent Requests",
          rankText: "You are in the top 10% this month!"
        };
      case 'worker':
        return {
          welcomeText: `Hello, ${currentUser?.first_name || 'Agent'}`,
          welcomeSub: "Here is the performance of your assigned portfolio.",
          stat1Label: "My Active Listings", stat1Val: activeListings.toString(),
          stat2Label: "Total Profile Views", stat2Val: totalViews.toString(),
          stat3Label: "My New Requests", stat3Val: newRequests.toString(),
          stat4Label: "My Sold Properties", stat4Val: soldProperties.toString(),
          tableTitle: "My Recent Requests",
          rankText: "You are a top performing agent!"
        };
      case 'basic':
      default:
        return {
          welcomeText: `Welcome, ${currentUser?.first_name || 'User'}`,
          welcomeSub: "Manage your personal property listings.",
          stat1Label: "My Active Listings", stat1Val: activeListings.toString(),
          stat2Label: "Total Property Views", stat2Val: totalViews.toString(),
          stat3Label: "New Requests (Locked)", stat3Val: newRequests.toString(),
          stat4Label: "Sold Properties", stat4Val: soldProperties.toString(),
          tableTitle: "My Properties",
          rankText: "Upgrade to Premium to boost visibility!"
        };
    }
  };

  const data = getRoleData();

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div>
          <h1>{data.welcomeText}</h1>
          <p>{data.welcomeSub}</p>
        </div>
      </div>

      <div className="nm-stats-grid">
        <div className="nm-stat-card">
          <div className="nm-stat-icon"><i className="fa-solid fa-house"></i></div>
          <div>
            <div className="nm-stat-label">{data.stat1Label}</div>
            <div className="nm-stat-value">{data.stat1Val}</div>
          </div>
        </div>
        <div className="nm-stat-card">
          <div className="nm-stat-icon"><i className="fa-regular fa-eye"></i></div>
          <div>
            <div className="nm-stat-label">{data.stat2Label}</div>
            <div className="nm-stat-value">{data.stat2Val}</div>
          </div>
          <div className="nm-stat-trend"><i className="fa-solid fa-arrow-trend-up"></i> 12%</div>
        </div>
        <div className="nm-stat-card highlight">
          <div className="nm-stat-icon"><i className="fa-regular fa-calendar"></i></div>
          <div>
            <div className="nm-stat-label">{data.stat3Label}</div>
            <div className="nm-stat-value">{data.stat3Val}</div>
          </div>
          <div className="nm-stat-trend"><i className="fa-solid fa-arrow-trend-up"></i> 5%</div>
        </div>
        <div className="nm-stat-card">
          <div className="nm-stat-icon"><i className="fa-solid fa-chart-line"></i></div>
          <div>
            <div className="nm-stat-label">{data.stat4Label}</div>
            <div className="nm-stat-value">{data.stat4Val}</div>
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
                {requests.slice(0, 5).map((req: any) => (
                  <tr key={req.id}>
                    <td data-label="Client">
                      <div className="nm-td-flex">
                        <div className="nm-avatar initials">{req.requester_name.substring(0, 2).toUpperCase()}</div>
                        <div className="nm-info-text">
                          <strong>{req.requester_name}</strong>
                          <span>{req.requester_email}</span>
                        </div>
                      </div>
                    </td>
                    <td data-label="Property">
                      <div className="nm-info-text">
                        <strong>{req.properties?.title || 'Unknown Property'}</strong>
                        <span>{req.properties?.category || 'Unknown Category'}</span>
                      </div>
                    </td>
                    <td data-label="Date">
                      <div className="nm-info-text">
                        <strong>{new Date(req.requested_date).toLocaleDateString()}</strong>
                        <span>{new Date(req.requested_date).toLocaleTimeString()}</span>
                      </div>
                    </td>
                    <td data-label="Status"><span className={`nm-badge ${req.status === 'approved' ? 'brand' : 'pending'}`}>{req.status}</span></td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>No recent requests</td>
                  </tr>
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
