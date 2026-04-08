import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/profile.css';
import { useAppContext } from '../context/AppContext';

export default function Profile() {
  const { currentUser } = useAppContext();
  const isFreePlan = currentUser?.role === 'basic';
  const [activeTab, setActiveTab] = useState('listings');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSlideIndex, setContactSlideIndex] = useState(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isListingPageOpen, setIsListingPageOpen] = useState(false);
  const [isSafetyPopoverOpen, setIsSafetyPopoverOpen] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [category, setCategory] = useState('');
  const [subtype, setSubtype] = useState('');
  const [availability, setAvailability] = useState('now');

  const safetyTipsList = [
    "Never transfer funds before viewing a property and verifying documents.",
    "Always meet agents at the property or their official registered office.",
    "Request to see the title deed or mandate to sell before signing anything.",
    "If a deal sounds too good to be true, it probably is. Stay vigilant."
  ];

  const toggleSafetyPopover = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSafetyPopoverOpen(!isSafetyPopoverOpen);
    if (!isSafetyPopoverOpen) {
      setCurrentTipIndex(0);
    }
  };

  const nextSafetyTip = () => {
    if (currentTipIndex < safetyTipsList.length - 1) {
      setCurrentTipIndex(currentTipIndex + 1);
    }
  };

  const prevSafetyTip = () => {
    if (currentTipIndex > 0) {
      setCurrentTipIndex(currentTipIndex - 1);
    }
  };

  const handlePlusClick = () => {
    if (isUserLoggedIn) {
      setIsListingPageOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isSafetyPopoverOpen && !target.closest('.we-safety-popover') && !target.closest('.we-info-trigger')) {
        setIsSafetyPopoverOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSafetyPopoverOpen]);

  React.useEffect(() => {
    if (isMobileMenuOpen || isAuthModalOpen || isListingPageOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen, isAuthModalOpen, isListingPageOpen]);

  const subtypes: Record<string, string[]> = {
    residential: ['Full house', 'Apartment', 'Cottage', 'Room', 'Cluster house / townhouse'],
    stand: ['Residential stand', 'Commercial stand', 'Agricultural land', 'Industrial land'],
    commercial: ['Office', 'Shop / retail', 'Warehouse', 'Industrial property', 'Salon / studio space', 'Restaurant / hospitality space']
  };

  const properties = [
    {
      id: 1,
      category: 'house',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'FOR SALE',
      featured: true,
      price: '$850,000',
      title: 'The Glass Pavilion',
      location: 'Borrowdale Brooke',
      beds: 3,
      baths: 2,
      area: '220 m²'
    },
    {
      id: 2,
      category: 'commercial',
      image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'FOR LEASE',
      featured: false,
      price: '$2,500/mo',
      title: 'The Nexus Tower',
      location: 'CBD, Harare',
      features: ['Open Plan', 'Air Con', '850 m²']
    },
    {
      id: 3,
      category: 'stand',
      image: 'https://i.pinimg.com/736x/98/04/69/980469f630d50176a5ac8c663437e632.jpg',
      tag: '50% DEPOSIT',
      featured: false,
      price: '$28,000',
      title: 'Glen Lorne Extension',
      location: 'Harare North',
      features: ['1200 m²', 'Cession', 'Service: 60%']
    },
    {
      id: 4,
      category: 'house',
      image: 'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'FOR RENT',
      featured: false,
      price: '$1,500/mo',
      title: 'Garden City Lofts',
      location: 'Avondale',
      beds: 2,
      baths: 1,
      area: '110 m²'
    },
    {
      id: 5,
      category: 'house',
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'FOR RENT',
      featured: false,
      price: '$150/mo',
      title: 'Spacious Room Avondale',
      location: 'Avondale',
      features: ['Private Room', 'Shared Bath', 'Own Entrance']
    },
    {
      id: 6,
      category: 'house',
      image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'FOR SALE',
      featured: false,
      price: '$450,000',
      title: 'Willow Terrace',
      location: 'Greendale',
      beds: 4,
      baths: 3,
      area: '320 m²'
    }
  ];

  const filteredProperties = properties.filter(p => activeFilter === 'all' || p.category === activeFilter);

  return (
    <>
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
              <a href="#home">Home</a>
              <a href="#buy">Buy</a>
              <a href="#rent">Rent</a>
              <Link to="/login" className="we-cta-btn">AGENT PORTAL</Link>
            </nav>

            <div className="we-info-trigger" onClick={toggleSafetyPopover}>
              <i className="fa-solid fa-circle-info"></i>
            </div>

            <div className={`we-safety-popover ${isSafetyPopoverOpen ? 'active' : ''}`} id="safetyPopover" onClick={(e) => e.stopPropagation()}>
              <div className="we-safety-header">
                <div className="we-safety-title-wrap">
                  <i className="fa-solid fa-shield-halved"></i> Safety Tips
                </div>
                <a href="#safety-guide" className="we-safety-learn">Learn More</a>
              </div>
              
              <div className="we-story-indicators" id="safetyIndicators">
                {safetyTipsList.map((_, i) => (
                  <div key={i} className="we-story-bar">
                    <div className="we-story-progress" style={{ width: i <= currentTipIndex ? '100%' : '0%' }}></div>
                  </div>
                ))}
              </div>
              <div className="we-safety-content" id="safetyText">
                {safetyTipsList[currentTipIndex]}
              </div>
              <div className="we-safety-nav">
                <button id="safetyPrev" onClick={prevSafetyTip} disabled={currentTipIndex === 0}><i className="fa-solid fa-chevron-left"></i> Prev</button>
                <button id="safetyNext" onClick={nextSafetyTip} disabled={currentTipIndex === safetyTipsList.length - 1}>Next <i className="fa-solid fa-chevron-right"></i></button>
              </div>
            </div>

            <button className="we-plus-circle" onClick={handlePlusClick}>
              <i className="fa-solid fa-plus"></i>
            </button>

            <button className="we-hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <img src="https://image2url.com/r2/default/images/1775520819070-397d094c-92e4-4f64-af30-e2881143cc7e.png" alt="Menu" />
            </button>
          </div>
        </header>
      </div>

    <div className="nm-profile-wrapper">
      <div className="nm-profile-banner-container">
        <div className="nm-banner-img">
          <div className="nm-banner-actions">
            <Link to="/" className="nm-b-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="nm-b-btn" onClick={() => setIsContactModalOpen(true)}>
                <i className="fa-regular fa-envelope"></i>
              </button>
              <button className="nm-b-btn">
                <i className="fa-solid fa-share-nodes"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="nm-avatar-wrapper">
          <div className="nm-profile-pic">
            <div className="nm-verified-badge">
              <i className="fa-solid fa-check"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="nm-profile-info">
        <h1 className="nm-profile-name">Willow & Elm</h1>
        <div className="nm-profile-meta">
          <span className="nm-meta-handle">@WILLOWELM</span>
          <span className="nm-meta-dot">•</span>
          <span className="nm-meta-type">Real Estate Agency</span>
        </div>
        <p className="nm-profile-bio">
          Premium residential stands and luxury plots across Harare's most prestigious neighborhoods. Trusted by hundreds of families to find their dream home.
        </p>
      </div>

      <div className="nm-tabs-container">
        <div className="nm-main-tabs">
          <div
            className={`nm-tab ${activeTab === 'listings' ? 'active' : ''}`}
            onClick={() => setActiveTab('listings')}
          >
            LISTINGS
          </div>
          {!isFreePlan && (
            <>
              <div
                className={`nm-tab ${activeTab === 'updates' ? 'active' : ''}`}
                onClick={() => setActiveTab('updates')}
              >
                UPDATES
              </div>
              <div
                className={`nm-tab ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => setActiveTab('info')}
              >
                INFO
              </div>
            </>
          )}
        </div>
      </div>

      {activeTab === 'listings' && (
        <div id="tab-listings" className="nm-tab-content active">
          <div className="nm-filter-slider-container">
            <div className="nm-filter-pills">
              <div
                className={`nm-pill ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                <i className="fa-solid fa-earth-africa"></i> All Properties
              </div>
              <div
                className={`nm-pill ${activeFilter === 'house' ? 'active' : ''}`}
                onClick={() => setActiveFilter('house')}
              >
                <i className="fa-solid fa-house"></i> Houses
              </div>
              <div
                className={`nm-pill ${activeFilter === 'stand' ? 'active' : ''}`}
                onClick={() => setActiveFilter('stand')}
              >
                <i className="fa-solid fa-vector-square"></i> Stands
              </div>
              <div
                className={`nm-pill ${activeFilter === 'commercial' ? 'active' : ''}`}
                onClick={() => setActiveFilter('commercial')}
              >
                <i className="fa-solid fa-building"></i> Commercial
              </div>
            </div>
          </div>

          <div className="nm-grid" id="propertyGrid">
            {filteredProperties.map((property) => (
              <div key={property.id} className={`we-card ${property.featured ? 'featured' : ''}`}>
                <div
                  className="we-img"
                  style={{ backgroundImage: `url('${property.image}')` }}
                >
                  <span className="we-tag">{property.tag}</span>
                  {property.featured && (
                    <span className="we-featured-tag">
                      <i className="fa-solid fa-bolt"></i> Featured
                    </span>
                  )}
                </div>
                <div className="we-body">
                  <div className="we-price">{property.price}</div>
                  <div className="we-title">{property.title}</div>
                  <div className="we-location">
                    <i className="fa-solid fa-location-dot"></i> {property.location}
                  </div>
                  <div className="we-icons-row">
                    {property.beds !== undefined && (
                      <div className="we-icon-item">
                        <i className="fa-solid fa-bed"></i> {property.beds} Bed
                      </div>
                    )}
                    {property.baths !== undefined && (
                      <div className="we-icon-item">
                        <i className="fa-solid fa-bath"></i> {property.baths} Bath
                      </div>
                    )}
                    {property.area !== undefined && (
                      <div className="we-icon-item">
                        <i className="fa-solid fa-vector-square"></i> {property.area}
                      </div>
                    )}
                    {property.features && property.features.map((feature, idx) => (
                      <div key={idx} className="we-icon-item">
                        {idx === 0 && property.category === 'commercial' && <i className="fa-solid fa-layer-group"></i>}
                        {idx === 1 && property.category === 'commercial' && <i className="fa-solid fa-snowflake"></i>}
                        {idx === 2 && property.category === 'commercial' && <i className="fa-solid fa-vector-square"></i>}
                        {idx === 0 && property.category === 'stand' && <i className="fa-solid fa-ruler-combined"></i>}
                        {idx === 1 && property.category === 'stand' && <i className="fa-solid fa-file-signature"></i>}
                        {idx === 2 && property.category === 'stand' && <span className="we-service-label"></span>}
                        {idx === 0 && property.category === 'house' && !property.beds && <i className="fa-solid fa-bed"></i>}
                        {idx === 1 && property.category === 'house' && !property.baths && <i className="fa-solid fa-bath"></i>}
                        {idx === 2 && property.category === 'house' && !property.area && <i className="fa-solid fa-door-open"></i>}
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="we-card-actions" style={{ display: 'flex', gap: '10px', marginTop: '15px', borderTop: '1px solid #F3F4F6', paddingTop: '15px' }}>
                      <button className="we-action-btn" style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#fff', color: '#4B5563', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s' }} onClick={(e) => { e.stopPropagation(); window.location.href = 'mailto:agent@example.com'; }} onMouseOver={(e) => e.currentTarget.style.background = '#F9FAFB'} onMouseOut={(e) => e.currentTarget.style.background = '#fff'}><i className="fa-regular fa-envelope"></i> Email</button>
                      <button className="we-action-btn" style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#fff', color: '#4B5563', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s' }} onClick={(e) => { e.stopPropagation(); window.location.href = 'tel:+1234567890'; }} onMouseOver={(e) => e.currentTarget.style.background = '#F9FAFB'} onMouseOut={(e) => e.currentTarget.style.background = '#fff'}><i className="fa-solid fa-phone"></i> Phone</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isFreePlan && activeTab === 'updates' && (
        <div id="tab-updates" className="nm-tab-content active">
          <div className="nm-updates-container">
            <div className="nm-update-card">
              <div className="nm-update-date">
                <i className="fa-regular fa-clock"></i> March 15, 2026
              </div>
              <img
                src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1000"
                className="nm-update-img"
                alt="Update Image"
              />
              <h3 className="nm-update-title">Phase 2 of Borrowdale East is finally here!</h3>
              <p className="nm-update-text">
                We are thrilled to announce that Phase 2 stands are now officially open for viewing. All roads are fully tarred and compliance certificates have been issued. Secure your plot today with only a 50% deposit.
              </p>
            </div>
            <div className="nm-update-card">
              <div className="nm-update-date">
                <i className="fa-regular fa-clock"></i> February 28, 2026
              </div>
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1000"
                className="nm-update-img"
                alt="Update Image"
              />
              <h3 className="nm-update-title">Awarded Top Agency of the Month</h3>
              <p className="nm-update-text">
                A massive thank you to all our clients! Willow & Elm has just been recognized as the top performing real estate agency in the Northern Suburbs for February.
              </p>
            </div>
          </div>
        </div>
      )}

      {!isFreePlan && activeTab === 'info' && (
        <div id="tab-info" className="nm-tab-content active">
          <div className="nm-info-container">
            <div className="nm-info-box">
              <h3>About Willow & Elm</h3>
              <p>
                Founded in 2018, Willow & Elm has grown to become one of the most trusted boutique real estate agencies in Harare. We specialize in premium residential properties, high-yield commercial spaces, and investment-grade land acquisitions.
              </p>
              <p>
                Our philosophy is simple: complete transparency, rigorous property vetting, and a highly personalized client experience. Whether you are buying your first home or expanding a commercial portfolio, our dedicated team of certified agents is here to guide you every step of the way.
              </p>
            </div>
            <h3 className="nm-staff-header">
              <i className="fa-solid fa-users"></i> Meet Our Team
            </h3>
            <div className="nm-staff-full-bleed">
              <div className="nm-staff-carousel">
                <div className="nm-staff-card">
                  <div
                    className="nm-staff-avatar"
                    style={{ backgroundImage: "url('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150')" }}
                  ></div>
                  <h4 className="nm-staff-name">Sarah Jenkins</h4>
                  <div className="nm-staff-role">Principal Agent</div>
                  <div className="nm-staff-actions">
                    <a href="#" className="nm-staff-btn">
                      <i className="fa-solid fa-phone"></i>
                    </a>
                    <a href="#" className="nm-staff-btn">
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
                <div className="nm-staff-card">
                  <div
                    className="nm-staff-avatar"
                    style={{ backgroundImage: "url('https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150')" }}
                  ></div>
                  <h4 className="nm-staff-name">Mike Ross</h4>
                  <div className="nm-staff-role">Commercial Specialist</div>
                  <div className="nm-staff-actions">
                    <a href="#" className="nm-staff-btn">
                      <i className="fa-solid fa-phone"></i>
                    </a>
                    <a href="#" className="nm-staff-btn">
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
                <div className="nm-staff-card">
                  <div
                    className="nm-staff-avatar"
                    style={{ backgroundImage: "url('https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150')" }}
                  ></div>
                  <h4 className="nm-staff-name">Lisa Chivandire</h4>
                  <div className="nm-staff-role">Residential Agent</div>
                  <div className="nm-staff-actions">
                    <a href="#" className="nm-staff-btn">
                      <i className="fa-solid fa-phone"></i>
                    </a>
                    <a href="#" className="nm-staff-btn">
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
                <div className="nm-staff-card">
                  <div
                    className="nm-staff-avatar"
                    style={{ backgroundImage: "url('https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150')" }}
                  ></div>
                  <h4 className="nm-staff-name">David Moyo</h4>
                  <div className="nm-staff-role">Land Acquisitions</div>
                  <div className="nm-staff-actions">
                    <a href="#" className="nm-staff-btn">
                      <i className="fa-solid fa-phone"></i>
                    </a>
                    <a href="#" className="nm-staff-btn">
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <div
        className={`nm-contact-modal ${isContactModalOpen ? 'active' : ''}`}
        onClick={() => setIsContactModalOpen(false)}
      >
        <div className="nm-contact-card" onClick={(e) => e.stopPropagation()}>
          <div className="nm-contact-header">
            <h3>Contact Willow & Elm</h3>
            <button className="nm-contact-close" onClick={() => setIsContactModalOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div
            className="nm-contact-slider"
            style={{ transform: `translateX(-${contactSlideIndex * 33.333}%)` }}
          >
            <div className="nm-contact-slide">
              <a href="tel:+263770000000" className="nm-cd-row">
                <div className="nm-cd-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="nm-cd-text">
                  <strong>Call Us</strong>
                  <span>+263 77 000 0000</span>
                </div>
              </a>
              <a href="https://wa.me/263770000000" className="nm-cd-row">
                <div className="nm-cd-icon">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <div className="nm-cd-text">
                  <strong>WhatsApp</strong>
                  <span>Message us directly</span>
                </div>
              </a>
              <div style={{ textAlign: 'center', margin: '10px 0' }}>
                <span style={{ fontSize: '12px', color: 'var(--gray-text)', fontWeight: 600 }}>OR</span>
              </div>
              <button className="nm-contact-btn" onClick={() => setContactSlideIndex(1)}>
                <i className="fa-regular fa-envelope"></i> Send a Message
              </button>
            </div>

            <div className="nm-contact-slide">
              <div>
                <label className="nm-form-label">Full Name</label>
                <input type="text" className="nm-form-input" placeholder="Enter your name" />
              </div>
              <div>
                <label className="nm-form-label">Phone Number</label>
                <input type="tel" className="nm-form-input" placeholder="Enter your phone number" />
              </div>
              <button className="nm-contact-btn" onClick={() => setContactSlideIndex(2)}>
                Next Step <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button className="nm-contact-btn back" onClick={() => setContactSlideIndex(0)}>
                Back
              </button>
            </div>

            <div className="nm-contact-slide">
              <div>
                <label className="nm-form-label">Email Address</label>
                <input type="email" className="nm-form-input" placeholder="Enter your email" />
              </div>
              <div>
                <label className="nm-form-label">Your Message</label>
                <textarea className="nm-form-textarea" placeholder="How can we help you?"></textarea>
              </div>
              <button className="nm-contact-btn" onClick={() => setIsContactModalOpen(false)}>
                <i className="fa-regular fa-paper-plane"></i> Send Message
              </button>
              <button className="nm-contact-btn back" onClick={() => setContactSlideIndex(1)}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={`we-overlay-bg ${isMobileMenuOpen ? 'active' : ''}`} id="weMenuBg" onClick={() => setIsMobileMenuOpen(false)}></div>
    <div className={`we-mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`} id="weMobileMenu">
        <div className="we-close-btn" onClick={() => setIsMobileMenuOpen(false)}>&times;</div>
        <a href="#home" className="active-page"><i className="fa-solid fa-house we-menu-icon"></i> Home</a>
        <a href="#buy"><i className="fa-solid fa-house-chimney we-menu-icon"></i> Buy a Home</a>
        <a href="#rent"><i className="fa-solid fa-key we-menu-icon"></i> Rent a Home</a>
        <a href="#sell"><i className="fa-solid fa-file-invoice-dollar we-menu-icon"></i> Sell Property</a>
        <Link to="/login" className="we-menu-contact-btn">AGENT PORTAL</Link>
    </div>

    <div className={`we-modal-overlay ${isAuthModalOpen ? 'active' : ''}`} id="authModal" onClick={() => setIsAuthModalOpen(false)}>
        <div className="we-auth-card" onClick={(e) => e.stopPropagation()}>
            <i className="fa-solid fa-xmark we-modal-close-icon" onClick={() => setIsAuthModalOpen(false)}></i>
            <div className="we-auth-icon">
                <i className="fa-solid fa-house-medical"></i>
            </div>
            <h3 className="we-auth-title">List Your Property</h3>
            <p className="we-auth-desc">Join nextmove to connect with thousands of verified buyers and renters in Harare.</p>
            <Link to="/login" className="we-auth-btn we-auth-primary block text-center" style={{textDecoration: 'none'}}>Create Account</Link>
            <Link to="/login" className="we-auth-btn we-auth-secondary block text-center mt-3" style={{textDecoration: 'none'}}>Sign In</Link>
        </div>
    </div>

    <div className={`we-listing-page ${isListingPageOpen ? 'active' : ''}`} id="addListingPage">
        <div className="we-listing-header">
            <h2>Create New Listing</h2>
            <button className="we-listing-close" onClick={() => setIsListingPageOpen(false)}><i className="fa-solid fa-xmark"></i></button>
        </div>
        
        <div className="we-form-container">
            <div className="we-form-grid">
                
                <div className="we-form-section-title"><i className="fa-solid fa-circle-info"></i> Section 1: Basic Info</div>
                
                <div className="we-form-group full">
                    <label className="we-form-label">Property Title</label>
                    <input type="text" className="we-form-input" placeholder="e.g. Modern Villa in Borrowdale Brooke" />
                </div>

                <div className="we-form-group">
                    <label className="we-form-label">Category</label>
                    <select className="we-form-select" id="catSelect" value={category} onChange={(e) => { setCategory(e.target.value); setSubtype(''); }}>
                        <option value="">Select Category...</option>
                        <option value="residential">Residential</option>
                        <option value="stand">Stands / Land</option>
                        <option value="commercial">Commercial</option>
                    </select>
                </div>

                <div className="we-form-group">
                    <label className="we-form-label">Subtype</label>
                    <select className="we-form-select" id="subSelect" value={subtype} onChange={(e) => setSubtype(e.target.value)} disabled={!category}>
                        <option value="">Select Category First</option>
                        {category && subtypes[category]?.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="we-form-group">
                    <label className="we-form-label">Listing Type</label>
                    <select className="we-form-select">
                        <option>For Sale</option>
                        <option>For Rent</option>
                        <option>Short Stay</option>
                    </select>
                </div>
                
                <div className="we-form-group">
                    <label className="we-form-label">Availability</label>
                    <select className="we-form-select" id="availSelect" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                        <option value="now">Available Now</option>
                        <option value="date">Specific Date...</option>
                    </select>
                </div>

                {availability === 'date' && (
                    <div className="we-form-group dynamic-section active" id="availDateGroup">
                        <label className="we-form-label">Select Date</label>
                        <input type="date" className="we-form-input" />
                    </div>
                )}

                <div className="we-form-group">
                    <label className="we-form-label">Price</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select className="we-form-select" style={{ width: '35%' }}>
                            <option>USD</option>
                            <option>ZWG</option>
                        </select>
                        <input type="number" className="we-form-input" placeholder="0.00" style={{ width: '65%' }} />
                    </div>
                </div>

                <div className="we-form-group">
                    <label className="we-form-label">Total Size</label>
                    <input type="number" className="we-form-input" placeholder="e.g. 2000 m²" />
                </div>

                <div className="we-form-group full">
                    <label className="we-form-label">Description</label>
                    <textarea className="we-form-textarea" placeholder="Describe the property..."></textarea>
                </div>

                <div className="we-form-group full">
                    <label className="we-form-label">Photos</label>
                    <div className="we-image-upload">
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                        <p>Drag & drop property images here</p>
                        <span>Supports JPG, PNG (Max 5MB each)</span>
                    </div>
                </div>

                {category === 'residential' && (
                    <div id="details-residential" className="we-form-group full dynamic-section active">
                        <div className="we-form-section-title"><i className="fa-solid fa-house"></i> Section 2: Property Details (Residential)</div>
                        <div className="we-form-grid">
                            <div className="we-form-group"><label className="we-form-label">Bedrooms</label><input type="number" className="we-form-input" /></div>
                            <div className="we-form-group"><label className="we-form-label">Bathrooms</label><input type="number" className="we-form-input" /></div>
                            <div className="we-form-group"><label className="we-form-label">Lounges</label><input type="number" className="we-form-input" /></div>
                            <div className="we-form-group"><label className="we-form-label">Dining Rooms</label><input type="number" className="we-form-input" /></div>
                            <div className="we-form-group"><label className="we-form-label">Kitchens</label><input type="number" className="we-form-input" /></div>
                            <div className="we-form-group"><label className="we-form-label">Garages</label><input type="number" className="we-form-input" /></div>
                            <div className="we-form-group"><label className="we-form-label">Floor Size (m²)</label><input type="number" className="we-form-input" /></div>
                            <div className="we-form-group"><label className="we-form-label">Stand Size (m²)</label><input type="number" className="we-form-input" /></div>
                        </div>

                        {subtype === 'Room' && (
                            <div id="sub-room" className="we-form-grid dynamic-section active" style={{ marginTop: '20px' }}>
                                <div className="we-form-group"><label className="we-form-label">Room Type</label>
                                    <select className="we-form-select"><option>Private Room</option><option>Shared Room</option></select>
                                </div>
                                <div className="we-form-group"><label className="we-form-label">Bathroom</label>
                                    <select className="we-form-select"><option>Ensuite</option><option>Shared</option></select>
                                </div>
                                <div className="we-form-group"><label className="we-form-label">Max Occupants</label><input type="number" className="we-form-input" /></div>
                                <div className="we-form-group"><label className="we-form-label">Gender Pref</label>
                                    <select className="we-form-select"><option>Any</option><option>Male Only</option><option>Female Only</option></select>
                                </div>
                            </div>
                        )}

                        {subtype === 'Apartment' && (
                            <div id="sub-apt" className="we-form-grid dynamic-section active" style={{ marginTop: '20px' }}>
                                <div className="we-form-group"><label className="we-form-label">Floor Level</label><input type="text" className="we-form-input" placeholder="e.g. 3rd Floor" /></div>
                                <div className="we-form-group"><label className="we-form-label">Complex Name</label><input type="text" className="we-form-input" /></div>
                                <div className="we-form-group"><label className="we-form-label">Levy ($)</label><input type="number" className="we-form-input" placeholder="0.00" /></div>
                            </div>
                        )}

                        {subtype === 'Cottage' && (
                            <div id="sub-cottage" className="we-form-grid dynamic-section active" style={{ marginTop: '20px' }}>
                                <div className="we-form-group"><label className="we-form-label">Separate Entrance?</label>
                                    <select className="we-form-select"><option>Yes</option><option>No</option></select>
                                </div>
                                <div className="we-form-group"><label className="we-form-label">Yard Access?</label>
                                    <select className="we-form-select"><option>Yes</option><option>No</option></select>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {category === 'stand' && (
                    <div id="details-stand" className="we-form-group full dynamic-section active">
                        <div className="we-form-section-title"><i className="fa-solid fa-earth-africa"></i> Section 2: Property Details (Land)</div>
                        <div className="we-form-grid">
                            <div className="we-form-group"><label className="we-form-label">Land Size</label><input type="number" className="we-form-input" /></div>
                            <div className="we-form-group"><label className="we-form-label">Unit of Measure</label>
                                <select className="we-form-select"><option>Square Meters (m²)</option><option>Hectares (ha)</option><option>Acres</option></select>
                            </div>
                            <div className="we-form-group"><label className="we-form-label">Terrain Type</label>
                                <select className="we-form-select"><option>Flat</option><option>Sloped / Hillside</option></select>
                            </div>
                            <div className="we-form-group"><label className="we-form-label">Corner Stand?</label>
                                <select className="we-form-select"><option>No</option><option>Yes</option></select>
                            </div>
                        </div>
                    </div>
                )}

                {category === 'commercial' && (
                    <div id="details-com" className="we-form-group full dynamic-section active">
                        <div className="we-form-section-title"><i className="fa-solid fa-building"></i> Section 2: Property Details (Commercial)</div>
                        <div className="we-form-grid">
                            <div className="we-form-group"><label className="we-form-label">Floor Size (m²)</label><input type="number" className="we-form-input" /></div>
                            <div className="we-form-group"><label className="we-form-label">Total Rooms</label><input type="number" className="we-form-input" /></div>
                            <div className="we-form-group"><label className="we-form-label">Bathrooms</label><input type="number" className="we-form-input" /></div>
                            <div className="we-form-group"><label className="we-form-label">Layout</label>
                                <select className="we-form-select"><option>Open Plan</option><option>Partitioned</option></select>
                            </div>
                        </div>

                        {subtype === 'Office' && (
                            <div id="sub-office" className="we-form-grid dynamic-section active" style={{ marginTop: '20px' }}>
                                <div className="we-form-group"><label className="we-form-label">No. of Offices</label><input type="number" className="we-form-input" /></div>
                                <div className="we-form-group"><label className="we-form-label">Boardrooms</label><input type="number" className="we-form-input" /></div>
                                <div className="we-form-group full"><label className="we-form-label">Reception Area?</label>
                                    <select className="we-form-select"><option>Yes</option><option>No</option></select>
                                </div>
                            </div>
                        )}

                        {subtype === 'Shop / retail' && (
                            <div id="sub-shop" className="we-form-grid dynamic-section active" style={{ marginTop: '20px' }}>
                                <div className="we-form-group"><label className="we-form-label">Location Type</label>
                                    <select className="we-form-select"><option>Inside Mall</option><option>Street Facing</option></select>
                                </div>
                                <div className="we-form-group"><label className="we-form-label">Foot Traffic Level</label>
                                    <select className="we-form-select"><option>High</option><option>Medium</option><option>Low</option></select>
                                </div>
                                <div className="we-form-group"><label className="we-form-label">Storage Room?</label>
                                    <select className="we-form-select"><option>Yes</option><option>No</option></select>
                                </div>
                                <div className="we-form-group"><label className="we-form-label">Display Windows?</label>
                                    <select className="we-form-select"><option>Yes</option><option>No</option></select>
                                </div>
                            </div>
                        )}

                        {(subtype === 'Warehouse' || subtype === 'Industrial property') && (
                            <div id="sub-warehouse" className="we-form-grid dynamic-section active" style={{ marginTop: '20px' }}>
                                <div className="we-form-group"><label className="we-form-label">Ceiling Height (m)</label><input type="number" className="we-form-input" /></div>
                                <div className="we-form-group"><label className="we-form-label">Yard Space (m²)</label><input type="number" className="we-form-input" /></div>
                                <div className="we-form-group"><label className="we-form-label">Roller Shutter Doors</label><input type="number" className="we-form-input" /></div>
                                <div className="we-form-group"><label className="we-form-label">Truck Access?</label>
                                    <select className="we-form-select"><option>Yes</option><option>No</option></select>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {category === 'residential' && (
                    <div id="features-res" className="we-form-group full dynamic-section active">
                        <div className="we-form-section-title"><i className="fa-solid fa-list-check"></i> Section 3: Features & Amenities</div>
                        <div className="we-checkbox-grid">
                            <label className="we-check-label"><input type="checkbox" /> Built-in Cupboards</label>
                            <label className="we-check-label"><input type="checkbox" /> Parking Spaces</label>
                            <label className="we-check-label"><input type="checkbox" /> Garden</label>
                            <label className="we-check-label"><input type="checkbox" /> Swimming Pool</label>
                            <label className="we-check-label"><input type="checkbox" /> Borehole</label>
                            <label className="we-check-label"><input type="checkbox" /> Solar Installed</label>
                            <label className="we-check-label"><input type="checkbox" /> Backup Power</label>
                            <label className="we-check-label"><input type="checkbox" /> Staff Quarters</label>
                            <label className="we-check-label"><input type="checkbox" /> Furnished</label>
                            <label className="we-check-label"><input type="checkbox" /> Pet Friendly</label>
                            <label className="we-check-label"><input type="checkbox" /> Security / Guard</label>
                            <label className="we-check-label"><input type="checkbox" /> Wi-Fi / Internet</label>
                        </div>
                    </div>
                )}

                {category === 'commercial' && (
                    <div id="features-com" className="we-form-group full dynamic-section active">
                        <div className="we-form-section-title"><i className="fa-solid fa-list-check"></i> Section 3: Features & Amenities</div>
                        <div className="we-checkbox-grid">
                            <label className="we-check-label"><input type="checkbox" /> Kitchenette</label>
                            <label className="we-check-label"><input type="checkbox" /> Parking</label>
                            <label className="we-check-label"><input type="checkbox" /> Furnished</label>
                            <label className="we-check-label"><input type="checkbox" /> Air Conditioning</label>
                            <label className="we-check-label"><input type="checkbox" /> Backup Power</label>
                            <label className="we-check-label"><input type="checkbox" /> Internet Ready</label>
                            <label className="we-check-label"><input type="checkbox" /> Security</label>
                            <label className="we-check-label"><input type="checkbox" /> Generator</label>
                            <label className="we-check-label"><input type="checkbox" /> Loading Bay</label>
                            <label className="we-check-label"><input type="checkbox" /> Elevator Access</label>
                            <label className="we-check-label"><input type="checkbox" /> 3-Phase Power</label>
                            <label className="we-check-label"><input type="checkbox" /> Operating Ready</label>
                        </div>
                    </div>
                )}

                {(category === 'residential' || category === 'commercial') && (
                    <div id="legal-base" className="we-form-group full dynamic-section active">
                        <div className="we-form-section-title"><i className="fa-solid fa-map-location-dot"></i> Section 4: Location & Legal</div>
                        <div className="we-form-grid">
                            <div className="we-form-group"><label className="we-form-label">City</label><input type="text" className="we-form-input" placeholder="e.g. Harare" /></div>
                            <div className="we-form-group"><label className="we-form-label">Area / Suburb</label><input type="text" className="we-form-input" placeholder="e.g. Borrowdale" /></div>
                            <div className="we-form-group full"><label className="we-form-label">Full Address / Street</label><input type="text" className="we-form-input" placeholder="Street name and number" /></div>
                        </div>
                    </div>
                )}

                {category === 'stand' && (
                    <div id="legal-stand" className="we-form-group full dynamic-section active">
                        <div className="we-form-section-title"><i className="fa-solid fa-file-contract"></i> Section 4: Legal & Infrastructure</div>
                        
                        <div className="we-form-grid" style={{ marginBottom: '25px' }}>
                            <div className="we-form-group"><label className="we-form-label">City</label><input type="text" className="we-form-input" placeholder="e.g. Harare" /></div>
                            <div className="we-form-group"><label className="we-form-label">Area / Suburb</label><input type="text" className="we-form-input" /></div>
                            <div className="we-form-group"><label className="we-form-label">Zoning</label>
                                <select className="we-form-select"><option>Residential</option><option>Commercial</option><option>Agricultural</option><option>Industrial</option></select>
                            </div>
                            <div className="we-form-group"><label className="we-form-label">Legal Status (Title)</label>
                                <select className="we-form-select"><option>Title Deed</option><option>Cession</option><option>Council Allocation</option><option>Developer Agreement</option></select>
                            </div>
                        </div>

                        <label className="we-form-label" style={{ display: 'block', marginBottom: '10px' }}>Services Available</label>
                        <div className="we-checkbox-grid" style={{ marginBottom: '25px', background: 'var(--input-bg)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                            <label className="we-check-label"><input type="checkbox" /> ZESA Power Available</label>
                            <label className="we-check-label"><input type="checkbox" /> Council Water</label>
                            <label className="we-check-label"><input type="checkbox" /> Main Sewer</label>
                            <label className="we-check-label"><input type="checkbox" /> Tarred Roads</label>
                            <label className="we-check-label"><input type="checkbox" /> Storm Drains</label>
                        </div>

                        <label className="we-form-label" style={{ display: 'block', marginBottom: '10px' }}>Site Condition</label>
                        <div className="we-checkbox-grid" style={{ background: 'var(--input-bg)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                            <label className="we-check-label"><input type="radio" name="site_cond" /> Fully Serviced</label>
                            <label className="we-check-label"><input type="radio" name="site_cond" /> Partially Serviced</label>
                            <label className="we-check-label"><input type="radio" name="site_cond" /> Unserviced</label>
                            <label className="we-check-label"><input type="checkbox" /> Ready to Build</label>
                            <label className="we-check-label"><input type="checkbox" /> Gated Community</label>
                        </div>
                    </div>
                )}

            </div>

            <button className="we-submit-listing">Publish Listing</button>
        </div>
    </div>

    <button 
        className="test-toggle" 
        onClick={() => setIsUserLoggedIn(!isUserLoggedIn)}
        style={{
            background: isUserLoggedIn ? "#1FE6D4" : "#1A1C1E",
            color: isUserLoggedIn ? "#1A1C1E" : "#ffffff"
        }}
    >
        {isUserLoggedIn ? "Test Mode: Logged IN" : "Test Mode: Logged OUT"}
    </button>
    </>
  );
}
