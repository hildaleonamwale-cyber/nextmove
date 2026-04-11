import React, { useState } from 'react';
import '../../styles/profile.css';

interface CompanyProfileProps {
  currentRole: string;
}

export default function CompanyProfile({ currentRole }: CompanyProfileProps) {
  const isPro = currentRole === 'premium';
  const headerText = isPro ? "Profile Editor" : "Company Profile Editor";
  const descText = isPro ? "Customize how you appear to potential clients." : "Customize how your agency appears to potential clients.";

  const [activeTab, setActiveTab] = useState('listings');
  const [activeFilter, setActiveFilter] = useState('all');

  const [properties, setProperties] = useState([
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
      tag: 'SOLD',
      status: 'sold',
      featured: false,
      price: '$450,000',
      title: 'Willow Terrace',
      location: 'Greendale',
      beds: 4,
      baths: 3,
      area: '320 m²'
    }
  ]);

  const filteredProperties = properties.filter(p => activeFilter === 'all' || p.category === activeFilter);

  const moveProperty = (index: number, direction: 'up' | 'down') => {
    const newProperties = [...properties];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newProperties.length) {
      const temp = newProperties[index];
      newProperties[index] = newProperties[targetIndex];
      newProperties[targetIndex] = temp;
      setProperties(newProperties);
    }
  };

  const EditBtn = ({ style }: { style?: React.CSSProperties }) => (
    <button style={{
      position: 'absolute',
      background: '#021211',
      color: '#1FE6D4',
      border: 'none',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 8px 20px rgba(2,18,17,0.2)',
      zIndex: 10,
      transition: 'transform 0.2s',
      ...style
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <i className="fa-solid fa-pen" style={{ fontSize: '14px' }}></i>
    </button>
  );

  const AddBtn = ({ text, style }: { text: string, style?: React.CSSProperties }) => (
    <button style={{
      background: '#021211',
      color: '#1FE6D4',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '50px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      boxShadow: '0 8px 20px rgba(2,18,17,0.2)',
      fontSize: '13px',
      fontWeight: 600,
      transition: 'transform 0.2s',
      ...style
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <i className="fa-solid fa-plus"></i> {text}
    </button>
  );

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div className="nm-page-header-text">
          <h1>Brand Identity</h1>
          <p>Customize your public-facing agency profile and brand presence.</p>
        </div>
        <div className="nm-page-header-actions">
          <button className="nm-btn-primary"><i className="fa-solid fa-floppy-disk"></i> Save Changes</button>
        </div>
      </div>

      <div className="nm-profile-wrapper" style={{ padding: 0, margin: 0, maxWidth: '100%' }}>
        
        <div className="nm-profile-banner-container">
          <div className="nm-banner-img">
            <EditBtn style={{ top: '20px', right: '20px' }} />
          </div>
          <div className="nm-avatar-wrapper">
            <div className="nm-profile-pic has-story">
              <div className="nm-verified-badge">
                <i className="fa-solid fa-check"></i>
              </div>
            </div>
            <EditBtn style={{ bottom: '0', right: '0' }} />
          </div>
        </div>

        <div className="nm-profile-info" style={{ position: 'relative' }}>
          <EditBtn style={{ top: '0', right: '20px' }} />
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
            <div className={`nm-tab ${activeTab === 'listings' ? 'active' : ''}`} onClick={() => setActiveTab('listings')}>LISTINGS</div>
            <div className={`nm-tab ${activeTab === 'updates' ? 'active' : ''}`} onClick={() => setActiveTab('updates')}>UPDATES</div>
            <div className={`nm-tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>INFO</div>
          </div>
        </div>

        {activeTab === 'listings' && (
          <div className="nm-tab-content active" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', paddingRight: '20px' }}>
              <AddBtn text="Add Listing" />
            </div>
            <div className="nm-filter-slider-container">
              <div className="nm-filter-pills">
                <div className={`nm-pill ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}><i className="fa-solid fa-earth-africa"></i> All Properties</div>
                <div className={`nm-pill ${activeFilter === 'house' ? 'active' : ''}`} onClick={() => setActiveFilter('house')}><i className="fa-solid fa-house"></i> Houses</div>
                <div className={`nm-pill ${activeFilter === 'stand' ? 'active' : ''}`} onClick={() => setActiveFilter('stand')}><i className="fa-solid fa-vector-square"></i> Stands</div>
                <div className={`nm-pill ${activeFilter === 'commercial' ? 'active' : ''}`} onClick={() => setActiveFilter('commercial')}><i className="fa-solid fa-building"></i> Commercial</div>
              </div>
            </div>

            <div className="nm-grid" id="propertyGrid">
              {filteredProperties.map((property, idx) => (
                <div key={property.id} className={`we-card ${property.featured ? 'featured' : ''} ${property.status?.toLowerCase() === 'sold' ? 'sold' : ''}`} style={{ position: 'relative' }}>
                  <EditBtn style={{ top: '10px', right: '10px' }} />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, display: 'flex', gap: '5px' }}>
                    <button onClick={() => moveProperty(idx, 'up')} disabled={idx === 0} style={{ background: '#021211', color: '#1FE6D4', border: 'none', width: '28px', height: '28px', borderRadius: '50%', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                      <i className="fa-solid fa-arrow-up" style={{ fontSize: '12px' }}></i>
                    </button>
                    <button onClick={() => moveProperty(idx, 'down')} disabled={idx === filteredProperties.length - 1} style={{ background: '#021211', color: '#1FE6D4', border: 'none', width: '28px', height: '28px', borderRadius: '50%', cursor: idx === filteredProperties.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === filteredProperties.length - 1 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                      <i className="fa-solid fa-arrow-down" style={{ fontSize: '12px' }}></i>
                    </button>
                  </div>
                  <div className="we-img" style={{ backgroundImage: `url('${property.image}')` }}>
                    {property.status?.toLowerCase() === 'sold' && (
                      <div className="we-sold-overlay">
                        <div className="we-sold-badge">SOLD</div>
                      </div>
                    )}
                    <span className="we-tag">{property.tag}</span>
                    {property.featured && <span className="we-featured-tag"><i className="fa-solid fa-bolt"></i> Featured</span>}
                    <div className="we-lister-badge"><i className="fa-solid fa-building-circle-check"></i> Elite Realty</div>
                  </div>
                  <div className="we-body">
                    <div className="we-price">{property.price}</div>
                    <div className="we-title">{property.title}</div>
                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> {property.location}</div>
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
                      {property.features && property.features.map((feature, fIdx) => (
                        <div key={fIdx} className="we-icon-item">
                          {fIdx === 0 && property.category === 'commercial' && <i className="fa-solid fa-layer-group"></i>}
                          {fIdx === 1 && property.category === 'commercial' && <i className="fa-solid fa-snowflake"></i>}
                          {fIdx === 2 && property.category === 'commercial' && <i className="fa-solid fa-vector-square"></i>}
                          {fIdx === 0 && property.category === 'stand' && <i className="fa-solid fa-ruler-combined"></i>}
                          {fIdx === 1 && property.category === 'stand' && <i className="fa-solid fa-file-signature"></i>}
                          {fIdx === 2 && property.category === 'stand' && <span className="we-service-label"></span>}
                          {fIdx === 0 && property.category === 'house' && !property.beds && <i className="fa-solid fa-bed"></i>}
                          {fIdx === 1 && property.category === 'house' && !property.baths && <i className="fa-solid fa-bath"></i>}
                          {fIdx === 2 && property.category === 'house' && !property.area && <i className="fa-solid fa-door-open"></i>}
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
          <div className="nm-tab-content active" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', paddingRight: '20px' }}>
              <AddBtn text="New Update" />
            </div>
            <div className="nm-updates-container">
              <div className="nm-update-card" style={{ position: 'relative' }}>
                <EditBtn style={{ top: '20px', right: '20px' }} />
                <div className="nm-update-date"><i className="fa-regular fa-clock"></i> March 15, 2026</div>
                <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1000" className="nm-update-img" alt="Update" />
                <h3 className="nm-update-title">Phase 2 of Borrowdale East is finally here!</h3>
                <p className="nm-update-text">We are thrilled to announce that Phase 2 stands are now officially open for viewing. All roads are fully tarred and compliance certificates have been issued.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="nm-tab-content active" style={{ position: 'relative' }}>
            <div className="nm-info-container">
              <div className="nm-info-box" style={{ position: 'relative' }}>
                <EditBtn style={{ top: '20px', right: '20px' }} />
                <h3>About Willow & Elm</h3>
                <p>Founded in 2018, Willow & Elm has grown to become one of the most trusted boutique real estate agencies in Harare. We specialize in premium residential properties, high-yield commercial spaces, and investment-grade land acquisitions.</p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', marginBottom: '20px' }}>
                <h3 className="nm-staff-header" style={{ margin: 0 }}><i className="fa-solid fa-users"></i> Meet Our Team</h3>
                <AddBtn text="Add Member" />
              </div>
              
              <div className="nm-staff-full-bleed">
                <div className="nm-staff-carousel">
                  <div className="nm-staff-card" style={{ position: 'relative' }}>
                    <EditBtn style={{ top: '10px', right: '10px' }} />
                    <div className="nm-staff-avatar" style={{ backgroundImage: "url('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150')" }}></div>
                    <h4 className="nm-staff-name">Sarah Jenkins</h4>
                    <div className="nm-staff-role">Principal Agent</div>
                  </div>
                  <div className="nm-staff-card" style={{ position: 'relative' }}>
                    <EditBtn style={{ top: '10px', right: '10px' }} />
                    <div className="nm-staff-avatar" style={{ backgroundImage: "url('https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150')" }}></div>
                    <h4 className="nm-staff-name">Mike Ross</h4>
                    <div className="nm-staff-role">Commercial Specialist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
