import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/profile.css';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('listings');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSlideIndex, setContactSlideIndex] = useState(0);

  const safetyTipsList = [
    "Never transfer funds before viewing a property and verifying documents.",
    "Always meet agents at the property or their official registered office.",
    "Request to see the title deed or mandate to sell before signing anything.",
    "If a deal sounds too good to be true, it probably is. Stay vigilant."
  ];

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
    <div className="nm-profile-wrapper">
      <div className="nm-profile-banner-container">
        <div className="nm-banner-img">
          <div className="nm-banner-actions" style={{ justifyContent: 'space-between', width: '100%', padding: '16px' }}>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'updates' && (
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

      {activeTab === 'info' && (
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
  );
}
