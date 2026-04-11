import React, { useState } from 'react';
import { Download, CreditCard, CheckCircle2, Clock, AlertCircle, X, Copy, AlertTriangle, Check, Wallet } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface BillingProps {
  currentRole: string;
  onUpgradeClick?: () => void;
}

export default function Billing({ currentRole, onUpgradeClick }: BillingProps) {
  const { currentUser, updateUser } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [txn, setTxn] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoState, setDemoState] = useState<'active' | 'expiring' | 'expired'>('expiring');

  const planName = currentRole === 'admin' ? 'Agency' : currentRole === 'premium' ? 'Individual Premium' : 'Basic';
  const planPrice = currentRole === 'admin' ? 250 : currentRole === 'premium' ? 9.99 : 0;

  const handleWalletPayment = () => {
    if (currentUser && currentUser.walletBalance >= planPrice) {
      updateUser(currentUser.id, { walletBalance: currentUser.walletBalance - planPrice });
      setDemoState('active');
      alert(`Successfully renewed ${planName} plan using wallet balance!`);
    } else {
      alert("Insufficient wallet balance. Please top up or use another payment method.");
    }
  };

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
          <h1>Billing & Plans</h1>
          <p>Manage your subscription tier, billing history, and payment methods.</p>
        </div>
      </div>
      
      {/* Dev Toggle for Demo Purposes */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', background: '#F3F4F6', padding: '10px', borderRadius: '8px', width: 'fit-content' }}>
        <span style={{ fontSize: '12px', color: '#6B7280', alignSelf: 'center', fontWeight: 600, marginRight: '10px' }}>TEST STATES:</span>
        <button onClick={() => setDemoState('active')} style={{ padding: '4px 12px', fontSize: '12px', borderRadius: '4px', border: 'none', background: demoState === 'active' ? '#111827' : 'transparent', color: demoState === 'active' ? '#fff' : '#6B7280', cursor: 'pointer' }}>Active</button>
        <button onClick={() => setDemoState('expiring')} style={{ padding: '4px 12px', fontSize: '12px', borderRadius: '4px', border: 'none', background: demoState === 'expiring' ? '#111827' : 'transparent', color: demoState === 'expiring' ? '#fff' : '#6B7280', cursor: 'pointer' }}>Expiring Soon</button>
        <button onClick={() => setDemoState('expired')} style={{ padding: '4px 12px', fontSize: '12px', borderRadius: '4px', border: 'none', background: demoState === 'expired' ? '#111827' : 'transparent', color: demoState === 'expired' ? '#fff' : '#6B7280', cursor: 'pointer' }}>Expired</button>
      </div>

      <div style={{ marginBottom: '40px', maxWidth: '900px' }}>
        <div className="nm-card" style={{ padding: '0', overflow: 'hidden', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
          {/* Main Plan Card - Dark Gradient Style */}
          <div style={{ padding: '40px', background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05, color: 'white' }}>
              <CreditCard size={200} />
            </div>
            
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'white', margin: 0 }}>{planName}</h2>
                  <span style={{ 
                    background: demoState === 'active' ? 'rgba(16, 185, 129, 0.2)' : demoState === 'expiring' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', 
                    color: demoState === 'active' ? '#34D399' : demoState === 'expiring' ? '#FBBF24' : '#F87171', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    border: `1px solid ${demoState === 'active' ? 'rgba(16, 185, 129, 0.3)' : demoState === 'expiring' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                  }}>
                    {statusLabel}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '15px', color: '#9ca3af', fontWeight: 500 }}>
                  {demoState === 'expired' ? `Subscription ended on ${endDate.toLocaleDateString()}` : `Next billing date: ${endDate.toLocaleDateString()}`}
                </p>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--brand)', lineHeight: 1 }}>
                  ${planPrice.toFixed(2)}
                  <span style={{ fontSize: '16px', color: '#9ca3af', fontWeight: 500, marginLeft: '4px' }}>/month</span>
                </div>
              </div>
            </div>

            {/* Expiry Alert Section - Integrated into Dark Card */}
            {demoState !== 'active' && (
              <div style={{ 
                marginTop: '32px',
                padding: '20px 24px', 
                background: 'rgba(0, 0, 0, 0.25)', 
                borderRadius: '16px',
                border: `1px solid ${demoState === 'expired' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`,
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
                backdropFilter: 'blur(8px)'
              }}>
                <div style={{ 
                  background: demoState === 'expired' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)', 
                  padding: '10px', 
                  borderRadius: '10px',
                  color: demoState === 'expired' ? '#F87171' : '#FBBF24'
                }}>
                  {demoState === 'expired' ? <AlertCircle size={20} /> : <AlertTriangle size={20} />}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: '15px', fontWeight: 700, color: 'white' }}>
                    {demoState === 'expired' ? 'Action Required: Subscription Expired' : 'Heads up! Your plan is expiring soon'}
                  </h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af', lineHeight: 1.5 }}>
                    {demoState === 'expired' 
                      ? `Your access was suspended on ${endDate.toLocaleDateString()}. Please settle your outstanding invoice.` 
                      : `Your current cycle ends soon. Renew before ${endDate.toLocaleDateString()} to keep your listings live.`}
                  </p>
                </div>
              </div>
            )}

            <div style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setIsModalOpen(true)}
                style={{ background: 'var(--brand)', color: '#111827', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 14px 0 rgba(31, 230, 212, 0.39)' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Renew Subscription
              </button>
              <button 
                onClick={handleWalletPayment}
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px 24px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(4px)' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                <Wallet size={18} />
                Pay with Wallet
              </button>
            </div>
          </div>
          
          {/* Wallet Balance Info */}
          <div style={{ padding: '20px 40px', background: '#F9FAFB', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(31, 230, 212, 0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'var(--brand)' }}>
                <Wallet size={16} style={{ margin: 'auto' }} />
              </div>
              <span style={{ fontSize: '14px', color: '#4B5563', fontWeight: 500 }}>Your Wallet Balance: <strong style={{ color: '#111827' }}>${currentUser?.walletBalance?.toFixed(2) || '0.00'}</strong></span>
            </div>
            <a href="#" style={{ fontSize: '13px', color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}>Top up wallet →</a>
          </div>
        </div>
      </div>

      <div className="nm-section-header" style={{ marginTop: '60px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Choose the Perfect Plan</h3>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
        
        {/* Individual Pro Card */}
        <div className="nm-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', border: '1px solid #E5E7EB', transition: 'all 0.3s' }}>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ background: '#F3F4F6', color: '#4B5563', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>For Solo Agents</span>
            <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '12px 0 8px 0', color: '#111827' }}>Individual Pro</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#111827' }}>$9.99</span>
              <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: 500 }}>/month</span>
            </div>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', flex: 1 }}>
            {['Unlimited Listings', 'Direct Viewing Requests', 'Pro Badge on Profile', 'Basic Analytics'].map((feat, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: '#4B5563' }}>
                <CheckCircle2 size={18} color="#10B981" /> {feat}
              </li>
            ))}
          </ul>
          
          <button onClick={onUpgradeClick} style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#F3F4F6', color: '#111827', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
            Get Started
          </button>
        </div>

        {/* Team Card - Featured */}
        <div className="nm-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', border: '2px solid var(--brand)', position: 'relative', boxShadow: '0 20px 25px -5px rgba(31, 230, 212, 0.1)' }}>
          <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--brand)', color: '#111827', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Most Popular
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <span style={{ background: 'rgba(31, 230, 212, 0.1)', color: '#0ba395', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>For Growing Teams</span>
            <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '12px 0 8px 0', color: '#111827' }}>Team Pro</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#111827' }}>$19.99</span>
              <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: 500 }}>/month + seats</span>
            </div>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', flex: 1 }}>
            {['Everything in Pro', 'Manage up to 5 Staff', 'Shared Team Wallet', 'Advanced Lead Tracking', 'Priority Support'].map((feat, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: '#4B5563' }}>
                <CheckCircle2 size={18} color="#10B981" /> {feat}
              </li>
            ))}
          </ul>
          
          <button onClick={onUpgradeClick} style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#111827', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
            Start Free Trial
          </button>
        </div>

        {/* Agency Card */}
        <div className="nm-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', border: '1px solid #E5E7EB' }}>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ background: '#F3F4F6', color: '#4B5563', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>For Large Agencies</span>
            <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '12px 0 8px 0', color: '#111827' }}>Agency Enterprise</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#111827' }}>$250</span>
              <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: 500 }}>/month</span>
            </div>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', flex: 1 }}>
            {['Unlimited Staff Seats', 'Custom API Integration', 'Dedicated Account Manager', 'White-label Reports', 'Concierge Onboarding'].map((feat, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: '#4B5563' }}>
                <CheckCircle2 size={18} color="#10B981" /> {feat}
              </li>
            ))}
          </ul>
          
          <button onClick={onUpgradeClick} style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#25D366', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
            Contact Sales
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
