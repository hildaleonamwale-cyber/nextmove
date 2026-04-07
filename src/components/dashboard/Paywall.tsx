import React from 'react';

interface PaywallProps {
  onUpgradeClick?: () => void;
}

export default function Paywall({ onUpgradeClick }: PaywallProps) {
  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div>
          <h1>Viewing Requests</h1>
        </div>
      </div>
      <div className="nm-paywall-container">
        <div className="nm-paywall-bg"></div>
        <div className="nm-paywall-overlay">
          <div className="nm-paywall-card">
            <div className="nm-paywall-icon"><i className="fa-solid fa-lock"></i></div>
            <h2 className="nm-paywall-title">Unlock Direct Requests</h2>
            <p className="nm-paywall-desc">Upgrade to a Pro account to instantly see and manage tour requests from verified buyers.</p>
            <button className="nm-paywall-btn" onClick={onUpgradeClick}>⭐ Upgrade to Pro</button>
          </div>
        </div>
      </div>
    </div>
  );
}
