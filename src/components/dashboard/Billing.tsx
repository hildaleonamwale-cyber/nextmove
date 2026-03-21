import React from 'react';

interface BillingProps {
  currentRole: string;
  onOpenEcoCashModal: (reason: string, amount: string) => void;
}

export default function Billing({ currentRole, onOpenEcoCashModal }: BillingProps) {
  const renderCurrentPlan = () => {
    switch (currentRole) {
      case 'admin':
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
              <div>
                <span className="nm-badge brand" style={{ marginBottom: '12px', background: 'rgba(31, 230, 212, 0.2)' }}>Current Plan</span>
                <h2 style={{ fontFamily: 'Poppins', fontSize: '26px', margin: '0', color: '#fff' }}>Agency</h2>
              </div>
              <h2 style={{ fontFamily: 'Poppins', fontSize: '32px', color: 'var(--brand)', margin: '0' }}>$250<span style={{ fontSize: '15px', color: '#9CA3AF' }}>/mo</span></h2>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '0', lineHeight: '1.6' }}>Includes unlimited agents, premium homepage placements, and priority concierge support.</p>
          </>
        );
      case 'pro':
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
              <div>
                <span className="nm-badge brand" style={{ marginBottom: '12px', background: 'rgba(31, 230, 212, 0.2)' }}>Current Plan</span>
                <h2 style={{ fontFamily: 'Poppins', fontSize: '26px', margin: '0', color: '#fff' }}>Individual Pro</h2>
              </div>
              <h2 style={{ fontFamily: 'Poppins', fontSize: '32px', color: 'var(--brand)', margin: '0' }}>$9.99<span style={{ fontSize: '15px', color: '#9CA3AF' }}>/mo</span></h2>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '0', lineHeight: '1.6' }}>Direct viewing requests enabled. Pending EcoCash verification: Account fully active.</p>
          </>
        );
      case 'basic':
      default:
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
              <div>
                <span className="nm-badge" style={{ marginBottom: '12px', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Current Plan</span>
                <h2 style={{ fontFamily: 'Poppins', fontSize: '26px', margin: '0', color: '#fff' }}>Basic</h2>
              </div>
              <h2 style={{ fontFamily: 'Poppins', fontSize: '32px', color: '#fff', margin: '0' }}>Free</h2>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '0', lineHeight: '1.6' }}>Limited visibility. Viewing requests locked. Pay to upgrade.</p>
          </>
        );
    }
  };

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div>
          <h1>Billing & Subscription</h1>
          <p>Manage your plan and EcoCash payments.</p>
        </div>
      </div>
      
      <div className="nm-editor-bottom-grid" style={{ marginBottom: '25px' }}>
        <div className="nm-card nm-dark-card">
          {renderCurrentPlan()}
        </div>

        <div className="nm-card">
          <h3 style={{ fontFamily: 'Poppins', fontSize: '16px', margin: '0 0 15px 0', color: 'var(--dark)' }}>How to Pay via EcoCash</h3>
          <div style={{ background: 'var(--input-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '15px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--gray-text)', fontWeight: '600' }}>Merchant Name:</span>
              <strong style={{ fontSize: '13px', color: 'var(--dark)' }}>Nextmove</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--gray-text)', fontWeight: '600' }}>Biller Code:</span>
              <strong style={{ fontSize: '14px', color: 'var(--brand)', fontFamily: 'monospace', background: 'rgba(31, 230, 212, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>*151*2*2*123456*AMOUNT#</strong>
            </div>
          </div>
          <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '12px', color: 'var(--gray-text)', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '5px' }}>Dial the code above on your phone.</li>
            <li style={{ marginBottom: '5px' }}>Enter the exact amount and complete the transaction.</li>
            <li>Click <strong>Pay Invoice</strong> or <strong>Select Plan</strong> and enter your EcoCash TXN ID to verify.</li>
          </ul>
        </div>
      </div>

      <div className="nm-section-header" style={{ marginTop: '40px' }}><h3>Upgrade Your Plan</h3></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        
        <div className="nm-card" style={{ padding: '30px' }}>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '18px', margin: '0 0 5px 0', color: 'var(--dark)' }}>Individual Pro</h3>
          <h2 style={{ fontFamily: 'Poppins', fontSize: '32px', color: 'var(--brand)', margin: '0 0 15px 0' }}>$9.99<span style={{ fontSize: '13px', color: 'var(--gray-text)' }}>/mo</span></h2>
          <p style={{ fontSize: '13px', color: 'var(--gray-text)', marginBottom: '20px', lineHeight: '1.6' }}>Instant access to Pro features. Direct viewing requests unlocked.</p>
          <button className="nm-btn-save" style={{ width: '100%', justifyContent: 'center', background: 'var(--input-bg)', color: 'var(--dark)', boxShadow: 'none' }} onClick={() => onOpenEcoCashModal('Individual Pro Plan', '$9.99')}>Select Plan</button>
        </div>

        <div className="nm-card" style={{ padding: '30px', border: '2px solid var(--brand)', position: 'relative' }}>
          <span className="nm-badge brand" style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}>1-MONTH FREE TRIAL</span>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '18px', margin: '0 0 5px 0', color: 'var(--dark)' }}>Team</h3>
          <h2 style={{ fontFamily: 'Poppins', fontSize: '32px', color: 'var(--brand)', margin: '0 0 15px 0' }}>$19.99<span style={{ fontSize: '13px', color: 'var(--gray-text)' }}>/mo + Seats</span></h2>
          <p style={{ fontSize: '13px', color: 'var(--gray-text)', marginBottom: '20px', lineHeight: '1.6' }}>Includes 'Manage Staff' functionality. Build your real estate team.</p>
          <button className="nm-btn-save" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onOpenEcoCashModal('Team Plan (1st Month Free)', '$19.99')}>Start Free Trial</button>
        </div>

        <div className="nm-card" style={{ padding: '30px' }}>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '18px', margin: '0 0 5px 0', color: 'var(--dark)' }}>Agency</h3>
          <h2 style={{ fontFamily: 'Poppins', fontSize: '32px', color: 'var(--brand)', margin: '0 0 15px 0' }}>$250<span style={{ fontSize: '13px', color: 'var(--gray-text)' }}>/mo</span></h2>
          <p style={{ fontSize: '13px', color: 'var(--gray-text)', marginBottom: '20px', lineHeight: '1.6' }}>+$500 Setup. Bespoke API integration and full concierge onboarding.</p>
          <a href="https://wa.me/263770000000" target="_blank" rel="noreferrer" className="nm-btn-save whatsapp" style={{ width: '100%', justifyContent: 'center', boxSizing: 'border-box' }}><i className="fa-brands fa-whatsapp"></i> Talk to a Specialist</a>
        </div>
      </div>

      <div className="nm-section-header" style={{ marginTop: '40px' }}><h3>Invoices & Billing History</h3></div>
      <div className="nm-table-card">
        <table className="nm-table">
          <thead><tr><th>Invoice For</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            <tr>
              <td data-label="Invoice For">
                <div className="nm-info-text"><strong>Agency Pro Plan</strong><span>Monthly Subscription</span></div>
              </td>
              <td data-label="Amount"><strong>$250.00</strong></td>
              <td data-label="Date">
                <div className="nm-info-text"><span>Mar 18, 2026</span></div>
              </td>
              <td data-label="Status">
                <span className="nm-badge pending" style={{ marginBottom: '4px' }}>Pending</span>
                <div style={{ fontSize: '10px', color: 'var(--gray-text)' }}>Txn: PP240318X9A</div>
              </td>
            </tr>
            <tr>
              <td data-label="Invoice For">
                <div className="nm-info-text"><strong>Individual Pro Plan</strong><span>Monthly Subscription</span></div>
              </td>
              <td data-label="Amount"><strong>$9.99</strong></td>
              <td data-label="Date">
                <div className="nm-info-text"><span>Feb 18, 2026</span></div>
              </td>
              <td data-label="Status"><span className="nm-badge brand">Paid</span></td>
            </tr>
            <tr>
              <td data-label="Invoice For">
                <div className="nm-info-text"><strong>Team Upgrade</strong><span>Seat Expansion</span></div>
              </td>
              <td data-label="Amount"><strong>$10.00</strong></td>
              <td data-label="Date">
                <div className="nm-info-text"><span>Apr 18, 2026</span></div>
              </td>
              <td data-label="Status">
                <button className="nm-btn-outline" onClick={() => onOpenEcoCashModal('Team Upgrade - Seat Expansion', '$10.00')}>Pay Invoice</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
