import React, { useEffect } from 'react';

interface EcoCashModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: string;
  amount: string;
}

export default function EcoCashModal({ isOpen, onClose, reason, amount }: EcoCashModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className={`we-modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="we-auth-card" style={{ maxWidth: '400px', padding: '40px 30px' }} onClick={(e) => e.stopPropagation()}>
        <i className="fa-solid fa-xmark we-modal-close-icon" onClick={onClose}></i>
        
        <div style={{ width: '60px', height: '60px', background: 'rgba(31, 230, 212, 0.1)', color: 'var(--brand)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 20px' }}>
          <i className="fa-solid fa-mobile-screen-button"></i>
        </div>
        
        <h3 style={{ fontFamily: '"Poppins", sans-serif', fontSize: '22px', fontWeight: '800', color: 'var(--dark)', margin: '0 0 15px 0' }}>EcoCash Payment</h3>
        
        <p style={{ fontSize: '14px', color: 'var(--gray-text)', lineHeight: '1.6', margin: '0 0 25px 0', background: 'var(--input-bg)', padding: '15px', borderRadius: '12px' }}>
          You are paying for:<br />
          <strong style={{ color: 'var(--dark)', fontSize: '15px', display: 'block', marginTop: '5px' }}>{reason}</strong>
          <strong style={{ color: 'var(--brand)', fontSize: '22px', fontFamily: 'Poppins', display: 'block' }}>{amount}</strong>
        </p>
        
        <div style={{ textAlign: 'left', marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--dark)' }}>EcoCash Transaction ID</label>
          <input type="text" style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--border-color)', borderRadius: '12px', fontFamily: '"Inter", sans-serif', fontSize: '14px', color: 'var(--dark)', background: 'var(--input-bg)', outline: 'none', transition: 'all 0.2s ease', boxSizing: 'border-box' }} placeholder="e.g. PP123456789" />
        </div>
        
        <button className="nm-btn-save" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}><i className="fa-solid fa-paper-plane"></i> Submit for Verification</button>
      </div>
    </div>
  );
}
