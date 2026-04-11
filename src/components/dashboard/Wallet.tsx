import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Wallet as WalletIcon, ArrowUpRight, History, CreditCard, Info } from 'lucide-react';

export default function Wallet() {
  const { currentUser } = useAppContext();

  const handleTopUpRequest = () => {
    const message = encodeURIComponent(`Hi Nextmove, I would like to top up my wallet balance. My account ID is ${currentUser?.id}.`);
    window.open(`https://wa.me/263771234567?text=${message}`, '_blank');
  };

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div>
          <h1>Financial Hub</h1>
          <p>Manage your advertising budget, sponsored campaigns, and subscription funds.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* Balance Card */}
        <div className="nm-card" style={{ padding: '32px', background: '#021211', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05, color: '#1FE6D4' }}>
            <WalletIcon size={150} />
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#9ca3af', fontWeight: 500 }}>Available Balance</p>
            <h2 style={{ fontSize: '48px', fontWeight: 700, margin: '0 0 24px 0', color: '#1FE6D4' }}>
              ${currentUser?.walletBalance?.toFixed(2) || '0.00'}
            </h2>
            <button 
              onClick={handleTopUpRequest}
              style={{ background: '#1FE6D4', color: '#111827', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              <ArrowUpRight size={18} />
              Request Top Up
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="nm-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: '#F3F4F6', padding: '12px', borderRadius: '12px', color: '#4B5563' }}>
              <Info size={24} />
            </div>
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#111827' }}>What is the Wallet used for?</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7280', lineHeight: 1.5 }}>
                Your wallet balance can be used to instantly pay for <strong>Sponsored Posts</strong> to boost your listings to the top of search results, or to seamlessly <strong>renew your membership plan</strong> without waiting for manual payment approvals.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ background: '#F3F4F6', padding: '12px', borderRadius: '12px', color: '#4B5563' }}>
              <CreditCard size={24} />
            </div>
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#111827' }}>How to Top Up</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7280', lineHeight: 1.5 }}>
                Click "Request Top Up" to contact our support team via WhatsApp. Once you transfer the funds via EcoCash or Bank Transfer, your wallet will be credited immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="nm-section-header">
        <h3><History size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} /> Recent Wallet Activity</h3>
      </div>
      <div className="nm-table-card">
        <table className="nm-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder for transactions. In a real app, this would be mapped from user's transaction history */}
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', padding: '40px 20px', color: '#6B7280' }}>
                <WalletIcon size={32} style={{ opacity: 0.2, marginBottom: '12px' }} />
                <p style={{ margin: 0 }}>No recent transactions found.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
