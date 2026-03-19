import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const toggleWeMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="we-header-wrapper">
          <div className="we-top-bar">
              <div className="we-top-left">
                  <a href="tel:+263700000000"><i className="fa-solid fa-phone" style={{color: 'var(--brand)'}}></i> <span>+263 7XX XXX</span></a>
                  <a href="mailto:info@nextmove.co.zw"><i className="fa-solid fa-envelope" style={{color: 'var(--brand)'}}></i> <span>Email</span></a>
              </div>
              <div className="we-top-right">
                  <a href="#"><i className="fa-brands fa-instagram"></i></a>
                  <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
          </div>

          <header className="we-header">
              <Link to="/" className="we-logo-group">
                  <div className="we-left-logo">
                      <img src="https://willowandelm.co.zw/wp-content/uploads/2026/01/nextmove.-3.png.png" alt="Nextmove Logo" />
                  </div>
                  <div className="we-site-title">
                      <span className="title-black">next</span><span className="title-brand">move</span>
                  </div>
              </Link>

              <div className="we-action-group">
                  <nav className="we-nav-desktop">
                      <Link to="/">Home</Link>
                      <Link to="/listings?type=buy">Buy</Link>
                      <Link to="/listings?type=rent">Rent</Link>
                      <Link to="/agent/dashboard" className="we-cta-btn">AGENT PORTAL</Link>
                  </nav>

                  <Link to="/listings" className="we-plus-circle">
                      <i className="fa-solid fa-plus"></i>
                  </Link>

                  <button className="we-hamburger" onClick={toggleWeMenu}>
                      <img src="https://willowandelm.co.zw/wp-content/uploads/2026/01/nextmove.zip-17.png" alt="Menu" />
                  </button>
              </div>
          </header>
      </div>

      <div className={`we-overlay-bg ${isMobileMenuOpen ? 'active' : ''}`} id="weMenuBg" onClick={toggleWeMenu}></div>
      <div className={`we-mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`} id="weMobileMenu">
          <div className="we-close-btn" onClick={toggleWeMenu}>&times;</div>
          <Link to="/" onClick={toggleWeMenu}><i className="fa-solid fa-house we-menu-icon"></i> Home</Link>
          <Link to="/listings?type=buy" onClick={toggleWeMenu}><i className="fa-solid fa-house-chimney we-menu-icon"></i> Buy</Link>
          <Link to="/listings?type=rent" onClick={toggleWeMenu}><i className="fa-solid fa-key we-menu-icon"></i> Rent</Link>
          <Link to="/agent/dashboard" onClick={toggleWeMenu} className="we-menu-contact-btn">Agent Portal</Link>
      </div>
    </>
  );
};
