import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Calculator() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const [price, setPrice] = useState(500000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [interestRate, setInterestRate] = useState(5.5);
    const [loanTerm, setLoanTerm] = useState(30);

    const downPayment = (price * downPaymentPercent) / 100;
    const loanAmount = price - downPayment;
    
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = loanAmount > 0 && monthlyInterestRate > 0 
        ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
        : loanAmount > 0 ? loanAmount / numberOfPayments : 0;

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            {/* Header */}
            <div className="we-header-wrapper">
                <header className="we-header">
                    <Link to="/" className="we-logo-group">
                        <div className="we-left-logo">
                            <img src="https://image2url.com/r2/default/images/1775520731590-8a90e10a-4fd0-496d-96c7-6198caa6955e.png" alt="nextmove Logo" />
                        </div>
                        <div className="we-site-title">
                            <span className="title-black">next</span><span className="title-brand">move</span>
                        </div>
                    </Link>

                    <div className="we-action-group">
                        <nav className="we-nav-desktop">
                            <Link to="/">Home</Link>
                            <Link to="/search">Buy</Link>
                            <Link to="/search">Rent</Link>
                            <Link to="/login" className="we-cta-btn">AGENT PORTAL</Link>
                        </nav>

                        <button className="we-hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <img src="https://image2url.com/r2/default/images/1775520819070-397d094c-92e4-4f64-af30-e2881143cc7e.png" alt="Menu" />
                        </button>
                    </div>
                </header>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`we-overlay-bg ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className={`we-mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
                <i className="fa-solid fa-xmark we-close-btn" onClick={() => setIsMobileMenuOpen(false)}></i>
                <Link to="/">Home</Link>
                <Link to="/search">Buy</Link>
                <Link to="/search">Rent</Link>
                <Link to="/login" className="we-menu-contact-btn">AGENT PORTAL</Link>
            </div>

            {/* Calculator Content */}
            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: '#1A1C1E', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '16px' }}>
                        Installment <span style={{ color: 'var(--brand)' }}>Calculator</span>
                    </h1>
                    <p style={{ fontSize: '16px', color: '#6B7280', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                        Plan your future home with precision. Estimate your monthly mortgage payments, total interest, and more.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', alignItems: 'start' }}>
                    
                    {/* Input Section */}
                    <div style={{ background: '#f8fafc', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '24px', fontWeight: 700, marginBottom: '30px', color: '#1A1C1E' }}>
                            Loan Details
                        </h2>

                        {/* Property Price */}
                        <div style={{ marginBottom: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <label style={{ fontSize: '14px', fontWeight: 600, color: '#4b5563' }}>Property Price</label>
                                <span style={{ fontSize: '16px', fontWeight: 700, color: '#1A1C1E' }}>{formatCurrency(price)}</span>
                            </div>
                            <input 
                                type="range" 
                                min="50000" 
                                max="5000000" 
                                step="10000"
                                value={price} 
                                onChange={(e) => setPrice(Number(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--brand)', height: '6px', borderRadius: '4px', cursor: 'pointer' }}
                            />
                        </div>

                        {/* Down Payment */}
                        <div style={{ marginBottom: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <label style={{ fontSize: '14px', fontWeight: 600, color: '#4b5563' }}>Down Payment ({downPaymentPercent}%)</label>
                                <span style={{ fontSize: '16px', fontWeight: 700, color: '#1A1C1E' }}>{formatCurrency(downPayment)}</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                step="1"
                                value={downPaymentPercent} 
                                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--brand)', height: '6px', borderRadius: '4px', cursor: 'pointer' }}
                            />
                        </div>

                        {/* Interest Rate */}
                        <div style={{ marginBottom: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <label style={{ fontSize: '14px', fontWeight: 600, color: '#4b5563' }}>Interest Rate</label>
                                <span style={{ fontSize: '16px', fontWeight: 700, color: '#1A1C1E' }}>{interestRate}%</span>
                            </div>
                            <input 
                                type="range" 
                                min="0.1" 
                                max="15" 
                                step="0.1"
                                value={interestRate} 
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--brand)', height: '6px', borderRadius: '4px', cursor: 'pointer' }}
                            />
                        </div>

                        {/* Loan Term */}
                        <div style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <label style={{ fontSize: '14px', fontWeight: 600, color: '#4b5563' }}>Loan Term</label>
                                <span style={{ fontSize: '16px', fontWeight: 700, color: '#1A1C1E' }}>{loanTerm} Years</span>
                            </div>
                            <input 
                                type="range" 
                                min="5" 
                                max="40" 
                                step="1"
                                value={loanTerm} 
                                onChange={(e) => setLoanTerm(Number(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--brand)', height: '6px', borderRadius: '4px', cursor: 'pointer' }}
                            />
                        </div>
                    </div>

                    {/* Results Section */}
                    <div style={{ background: '#1A1C1E', padding: '40px', borderRadius: '24px', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                        <div>
                            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', fontWeight: 600, color: '#9CA3AF', marginBottom: '10px' }}>
                                Estimated Monthly Payment
                            </h2>
                            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 800, color: 'var(--brand)', lineHeight: 1, letterSpacing: '-2px', marginBottom: '40px' }}>
                                {formatCurrency(monthlyPayment)}<span style={{ fontSize: '20px', color: '#6B7280', fontWeight: 500, letterSpacing: '0' }}>/mo</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ color: '#9CA3AF', fontSize: '15px' }}>Principal Loan Amount</span>
                                    <span style={{ fontSize: '18px', fontWeight: 600 }}>{formatCurrency(loanAmount)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ color: '#9CA3AF', fontSize: '15px' }}>Total Interest Paid</span>
                                    <span style={{ fontSize: '18px', fontWeight: 600 }}>{formatCurrency(totalInterest)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#9CA3AF', fontSize: '15px' }}>Total Cost of Loan</span>
                                    <span style={{ fontSize: '18px', fontWeight: 600 }}>{formatCurrency(totalPayment)}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '50px' }}>
                            <div style={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', marginBottom: '15px' }}>
                                <div style={{ width: `${(loanAmount / totalPayment) * 100}%`, background: 'var(--brand)' }}></div>
                                <div style={{ width: `${(totalInterest / totalPayment) * 100}%`, background: '#4b5563' }}></div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--brand)' }}></div>
                                    <span style={{ color: '#9CA3AF' }}>Principal</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4b5563' }}></div>
                                    <span style={{ color: '#9CA3AF' }}>Interest</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
