import React, { useState } from 'react';
import { Download, CreditCard, CheckCircle2, Clock, AlertCircle, X, Copy, AlertTriangle, Check } from 'lucide-react';

interface BillingProps {
  currentRole: string;
  onUpgradeClick?: () => void;
}

export default function Billing({ currentRole, onUpgradeClick }: BillingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [txn, setTxn] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoState, setDemoState] = useState<'active' | 'expiring' | 'expired'>('expiring');

  const planName = currentRole === 'admin' ? 'Agency' : currentRole === 'pro' ? 'Individual Pro' : 'Basic';
  const planPrice = currentRole === 'admin' ? 250 : currentRole === 'pro' ? 9.99 : 0;

  const getStatusDetails = () => {
    const today = new Date();
    let endDate = new Date();
    let statusLabel = '';
    let statusColor = '';
    let statusBg = '';
    
    if (demoState === 'active') {
      endDate.setDate(today.getDate() + 15);
      statusLabel = 'Active';
      statusColor = '#10B981';
      statusBg = 'rgba(16, 185, 129, 0.1)';
    } else if (demoState === 'expiring') {
      endDate.setDate(today.getDate() + 4);
      statusLabel = 'Expiring Soon';
      statusColor = '#F59E0B';
      statusBg = 'rgba(245, 158, 11, 0.1)';
    } else {
      endDate.setDate(today.getDate() - 2);
      statusLabel = 'Expired';
      statusColor = '#EF4444';
      statusBg = 'rgba(239, 68, 68, 0.1)';
    }
    
    return { endDate, statusLabel, statusColor, statusBg };
  };

  const { endDate, statusLabel, statusColor, statusBg } = getStatusDetails();

  const handleCopy = () => {
    navigator.clipboard.writeText('*153*1*1*077 123 4567');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      localStorage.setItem('pending_payment', JSON.stringify({
        id: Date.now().toString(),
        agentName: currentRole === 'admin' ? 'Willow & Elm' : 'Sarah Jenkins',
        tier: currentRole === 'admin' ? 'TEAM' : 'SOLO_PRO',
        phone: phone,
        ref: txn,
        amount: `$${planPrice.toFixed(2)}`,
        status: 'pending',
        date: new Date().toISOString()
      }));
      setPhone('');
      setTxn('');
      setDemoState('active'); // Switch to active to simulate successful renewal
    }, 1500);
  };

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div>
          <h1>Billing & Subscription</h1>
          <p>Manage your plan and EcoCash payments.</p>
        </div>
      </div>
      
      {/* Dev Toggle for Demo Purposes */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', background: '#F3F4F6', padding: '10px', borderRadius: '8px', width: 'fit-content' }}>
        <span style={{ fontSize: '12px', color: '#6B7280', alignSelf: 'center', fontWeight: 600, marginRight: '10px' }}>TEST STATES:</span>
        <button onClick={() => setDemoState('active')} style={{ padding: '4px 12px', fontSize: '12px', borderRadius: '4px', border: 'none', background: demoState === 'active' ? '#111827' : 'transparent', color: demoState === 'active' ? '#fff' : '#6B7280', cursor: 'pointer' }}>Active</button>
        <button onClick={() => setDemoState('expiring')} style={{ padding: '4px 12px', fontSize: '12px', borderRadius: '4px', border: 'none', background: demoState === 'expiring' ? '#111827' : 'transparent', color: demoState === 'expiring' ? '#fff' : '#6B7280', cursor: 'pointer' }}>Expiring Soon</button>
        <button onClick={() => setDemoState('expired')} style={{ padding: '4px 12px', fontSize: '12px', borderRadius: '4px', border: 'none', background: demoState === 'expired' ? '#111827' : 'transparent', color: demoState === 'expired' ? '#fff' : '#6B7280', cursor: 'pointer' }}>Expired</button>
      </div>

      <div style={{ marginBottom: '40px', maxWidth: '800px' }}>
        <div className="nm-card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', margin: 0 }}>{planName} Plan</h2>
                <span style={{ background: statusBg, color: statusColor, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>{statusLabel}</span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>
                {demoState === 'expired' ? `Expired on ${endDate.toLocaleDateString()}` : `Renews on ${endDate.toLocaleDateString()}`}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--brand)', lineHeight: 1 }}>${planPrice.toFixed(2)}<span style={{ fontSize: '16px', color: '#6B7280', fontWeight: 500 }}>/mo</span></div>
            </div>
          </div>
          
          {/* Expiry Message */}
          {demoState !== 'active' && (
            <div style={{ marginTop: '24px', padding: '16px', borderRadius: '8px', background: demoState === 'expired' ? '#FEF2F2' : '#FFFBEB', border: `1px solid ${demoState === 'expired' ? '#FCA5A5' : '#FCD34D'}` }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                {demoState === 'expired' ? <AlertCircle color="#EF4444" size={20} style={{ marginTop: '2px' }} /> : <AlertTriangle color="#F59E0B" size={20} style={{ marginTop: '2px' }} />}
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600, color: demoState === 'expired' ? '#991B1B' : '#92400E' }}>
                    {demoState === 'expired' ? 'Plan Expired' : 'Plan Expiring Soon'}
                  </h4>
                  <p style={{ margin: 0, fontSize: '13px', color: demoState === 'expired' ? '#B91C1C' : '#B45309', lineHeight: 1.5 }}>
                    {demoState === 'expired' 
                      ? `Your plan expired on ${endDate.toLocaleDateString()}. Please pay your invoice to restore full access to your dashboard and listings.` 
                      : `Your plan will expire in 4 days on ${endDate.toLocaleDateString()}. Renew now to avoid any interruption to your services.`}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#6B7280', fontWeight: 500 }}>Upcoming Invoice</p>
              <p style={{ margin: 0, fontSize: '16px', color: '#111827', fontWeight: 600 }}>${planPrice.toFixed(2)} <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 400 }}>due {endDate.toLocaleDateString()}</span></p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{ background: '#111827', color: '#fff', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#000'}
              onMouseOut={(e) => e.currentTarget.style.background = '#111827'}
            >
              Pay Invoice
            </button>
          </div>
        </div>
      </div>

      <div className="nm-section-header" style={{ marginTop: '40px' }}><h3>Upgrade Your Plan</h3></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        
        <div className="nm-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '18px', margin: '0 0 5px 0', color: 'var(--dark)' }}>Individual Pro</h3>
          <h2 style={{ fontFamily: 'Poppins', fontSize: '32px', color: 'var(--brand)', margin: '0 0 15px 0' }}>$9.99<span style={{ fontSize: '13px', color: 'var(--gray-text)' }}>/mo</span></h2>
          <p style={{ fontSize: '13px', color: 'var(--gray-text)', marginBottom: '20px', lineHeight: '1.6', flex: 1 }}>Instant access to Pro features. Direct viewing requests unlocked.</p>
          <button className="nm-btn-save" onClick={onUpgradeClick} style={{ width: '100%', justifyContent: 'center', background: '#F3F4F6', color: '#111827', boxShadow: 'none' }}>
            Request Pro Access
          </button>
        </div>

        <div className="nm-card" style={{ padding: '30px', border: '2px solid var(--brand)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <span className="nm-badge brand" style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--brand)', color: '#000', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', fontSize: '10px', letterSpacing: '0.5px' }}>1-MONTH FREE TRIAL</span>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '18px', margin: '0 0 5px 0', color: 'var(--dark)' }}>Team</h3>
          <h2 style={{ fontFamily: 'Poppins', fontSize: '32px', color: 'var(--brand)', margin: '0 0 15px 0' }}>$19.99<span style={{ fontSize: '13px', color: 'var(--gray-text)' }}>/mo + Seats</span></h2>
          <p style={{ fontSize: '13px', color: 'var(--gray-text)', marginBottom: '20px', lineHeight: '1.6', flex: 1 }}>Includes 'Manage Staff' functionality. Build your real estate team.</p>
          <button className="nm-btn-save" onClick={onUpgradeClick} style={{ width: '100%', justifyContent: 'center', background: '#111827', color: '#fff' }}>Request Pro Access</button>
        </div>

        <div className="nm-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '18px', margin: '0 0 5px 0', color: 'var(--dark)' }}>Agency</h3>
          <h2 style={{ fontFamily: 'Poppins', fontSize: '32px', color: 'var(--brand)', margin: '0 0 15px 0' }}>$250<span style={{ fontSize: '13px', color: 'var(--gray-text)' }}>/mo</span></h2>
          <p style={{ fontSize: '13px', color: 'var(--gray-text)', marginBottom: '20px', lineHeight: '1.6', flex: 1 }}>+$500 Setup. Bespoke API integration and full concierge onboarding.</p>
          <button className="nm-btn-save" onClick={onUpgradeClick} style={{ width: '100%', justifyContent: 'center', background: '#25D366', color: '#fff', boxShadow: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
            Talk to a Human
          </button>
        </div>
      </div>

      <div className="nm-section-header" style={{ marginTop: '40px' }}><h3>Invoices & Billing History</h3></div>
      <div className="nm-table-card">
        <table className="nm-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Receipt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Invoice">
                <div className="nm-info-text">
                  <strong>INV-2026-003</strong>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <CreditCard size={12} /> Visa ending in 4242
                  </span>
                </div>
              </td>
              <td data-label="Amount"><strong>$250.00</strong></td>
              <td data-label="Date">
                <div className="nm-info-text"><span>Mar 18, 2026</span></div>
              </td>
              <td data-label="Status">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '500', color: '#F59E0B', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                  <Clock size={14} /> Pending
                </span>
              </td>
              <td data-label="Receipt" style={{ textAlign: 'right' }}>
                <button className="nm-btn-outline" style={{ padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Download size={14} /> PDF
                </button>
              </td>
            </tr>
            <tr>
              <td data-label="Invoice">
                <div className="nm-info-text">
                  <strong>INV-2026-002</strong>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <CreditCard size={12} /> Visa ending in 4242
                  </span>
                </div>
              </td>
              <td data-label="Amount"><strong>$250.00</strong></td>
              <td data-label="Date">
                <div className="nm-info-text"><span>Feb 18, 2026</span></div>
              </td>
              <td data-label="Status">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '500', color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                  <CheckCircle2 size={14} /> Paid
                </span>
              </td>
              <td data-label="Receipt" style={{ textAlign: 'right' }}>
                <button className="nm-btn-outline" style={{ padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Download size={14} /> PDF
                </button>
              </td>
            </tr>
            <tr>
              <td data-label="Invoice">
                <div className="nm-info-text">
                  <strong>INV-2026-001</strong>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <CreditCard size={12} /> Visa ending in 4242
                  </span>
                </div>
              </td>
              <td data-label="Amount"><strong>$250.00</strong></td>
              <td data-label="Date">
                <div className="nm-info-text"><span>Jan 18, 2026</span></div>
              </td>
              <td data-label="Status">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '500', color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                  <CheckCircle2 size={14} /> Paid
                </span>
              </td>
              <td data-label="Receipt" style={{ textAlign: 'right' }}>
                <button className="nm-btn-outline" style={{ padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Download size={14} /> PDF
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '440px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#111827' }}>Pay via EcoCash</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}><X size={20} /></button>
            </div>
            
            <div style={{ padding: '24px' }}>
              <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#4B5563', lineHeight: 1.5 }}>
                Complete your payment using the EcoCash merchant code below, then enter your details to verify.
              </p>
              
              <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500 }}>Merchant Name</span>
                  <span style={{ fontSize: '13px', color: '#111827', fontWeight: 600 }}>Nextmove PTD</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500 }}>Merchant Code</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <code style={{ background: 'rgba(31, 230, 212, 0.15)', color: '#0ba395', padding: '6px 10px', borderRadius: '6px', fontSize: '14px', fontWeight: 700 }}>*153*1*1*077 123 4567</code>
                    <button onClick={handleCopy} style={{ background: '#fff', border: '1px solid #E5E7EB', cursor: 'pointer', color: '#4B5563', padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handlePaymentSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>EcoCash Phone Number</label>
                  <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="077 123 4567" style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>Transaction ID (TXN)</label>
                  <input type="text" required value={txn} onChange={e => setTxn(e.target.value)} placeholder="MP240326.1042" style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', textTransform: 'uppercase', outline: 'none' }} />
                </div>
                
                <button type="submit" disabled={isSubmitting} style={{ width: '100%', background: 'var(--brand)', color: '#111827', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? <Clock size={18} style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} /> : null}
                  {isSubmitting ? 'Submitting...' : 'Submit Payment'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
