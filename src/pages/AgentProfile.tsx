import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PropertyCard } from '../components/cards';
import { MOCK_AGENTS, MOCK_PROPERTIES } from '../mockData';
import './AgentProfile.css';

export const AgentProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const agent = MOCK_AGENTS.find(a => a.id === id) || MOCK_AGENTS[0];
  const agentProperties = MOCK_PROPERTIES.filter(p => p.agentId === agent.id);
  
  const [activeTab, setActiveTab] = useState<'listings' | 'updates' | 'info'>('listings');
  const [filterType, setFilterType] = useState<'all' | 'sale' | 'rent'>('all');

  const filteredProperties = agentProperties.filter(p => {
    if (filterType === 'all') return true;
    if (filterType === 'sale') return p.status === 'active';
    if (filterType === 'rent') return p.status === 'rented';
    return true;
  });

  return (
    <div className="agent-profile-page pt-16">
      <div className="nm-cover-banner" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1500')` }}>
        <div className="nm-top-actions">
            <div className="nm-action-circle" title="Contact Agency">
                <i className="fa-regular fa-envelope"></i>
            </div>
            <div className="nm-action-circle" title="Share Profile">
                <i className="fa-solid fa-share-nodes"></i>
            </div>
        </div>
      </div>

      <div className="nm-profile-wrapper">
        <div className="nm-avatar-ring">
            <div className="nm-avatar-inner">
                <img src={agent.photo} className="nm-avatar-img" style={{ objectFit: 'cover' }} referrerPolicy="no-referrer" />
            </div>
            {agent.isVerified && (
              <div className="nm-verified-badge">
                  <div className="nm-ig-tick">
                      <i className="fa-solid fa-certificate"></i>
                      <i className="fa-solid fa-check" style={{ fontSize: '7px', color: 'white', position: 'absolute' }}></i>
                  </div>
              </div>
            )}
        </div>

        <h1 className="nm-profile-name">{agent.name}</h1>
        
        <div className="nm-profile-sub">
            <span className="nm-sub-handle">@{agent.name.replace(/\s+/g, '').toUpperCase()}</span> <span className="nm-sub-type">• REAL ESTATE AGENT</span>
        </div>
        <p className="nm-profile-bio">
            {agent.bio}
        </p>

        <div className="nm-tabs-pill">
            <div className={`nm-tab ${activeTab === 'listings' ? 'active' : ''}`} onClick={() => setActiveTab('listings')}>Listings</div>
            {agent.isPro && <div className={`nm-tab ${activeTab === 'updates' ? 'active' : ''}`} onClick={() => setActiveTab('updates')}>Updates</div>}
            <div className={`nm-tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>Info</div>
        </div>

        <div className={`nm-tab-content ${activeTab === 'listings' ? 'active' : ''}`}>
            <div className="we-stands-wrapper">
                <div className="we-section-header">
                    <h2>Our Portfolio</h2>
                    <p>Investment-ready land and homes in prime locations.</p>
                </div>

                <div className="we-tab-bleeder">
                    <div className="we-pill-tabs">
                        <div className={`we-pill ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}><i className="fa-solid fa-earth-africa"></i> All Properties</div>
                        <div className={`we-pill ${filterType === 'sale' ? 'active' : ''}`} onClick={() => setFilterType('sale')}><i className="fa-solid fa-tag"></i> For Sale</div>
                        <div className={`we-pill ${filterType === 'rent' ? 'active' : ''}`} onClick={() => setFilterType('rent')}><i className="fa-solid fa-key"></i> For Rent</div>
                    </div>
                </div>

                <div className="we-full-bleed-container">
                    <div className="we-listings">
                        {filteredProperties.map(property => (
                          <div key={property.id} style={{ minWidth: '280px', width: '75vw', maxWidth: '320px', flex: '0 0 auto' }}>
                            <PropertyCard 
                              image={property.images[0]}
                              tag={property.status === 'active' ? 'FOR SALE' : property.status.toUpperCase()}
                              price={`$${property.price.toLocaleString()}`}
                              title={property.title}
                              location={`${property.location.suburb}, ${property.location.city}`}
                              beds={`${property.features.beds || 0} Bed`}
                              baths={`${property.features.baths || 0} Bath`}
                              size={`${property.features.sqft || property.features.standSize || 0} m²`}
                              onClick={() => navigate(`/property/${property.id}`)}
                            />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {agent.isPro && (
          <div className={`nm-tab-content ${activeTab === 'updates' ? 'active' : ''}`}>
              <div className="nm-card">
                  <div className="nm-update-header-row">
                      <div className="nm-update-icon-bg">
                          <i className="fa-regular fa-bell"></i>
                      </div>
                      <div>
                          <div className="nm-update-title">New Phase Launch</div> 
                          <div className="nm-update-date">2 DAYS AGO</div> 
                      </div>
                  </div>
                  <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750" className="nm-update-img" referrerPolicy="no-referrer" />
                  <div className="nm-card-text">
                      Our highly anticipated Glen Lorne Extension is finally here. We've added 15 new prime stands with ready title deeds and flexible installment plans. Contact me to schedule a viewing.
                  </div>
              </div>
          </div>
        )}

        <div className={`nm-tab-content ${activeTab === 'info' ? 'active' : ''}`}>
            <div className="nm-card">
                <div className="nm-card-header">
                    <i className="fa-solid fa-clock-rotate-left"></i> OUR STORY
                </div>
                <div className="nm-card-text">
                    {agent.bio}
                </div>

                <div className="nm-card-header" style={{ marginTop: '30px' }}>
                    <i className="fa-solid fa-users"></i> OUR TEAM
                </div>
                <div className="nm-agent-list">
                    <div className="nm-agent-row">
                        <div className="nm-agent-info">
                            <img src={agent.photo} className="nm-agent-mini-img" referrerPolicy="no-referrer" />
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '12px' }}>{agent.name}</div>
                                <div style={{ fontSize: '9px', color: '#9CA3AF', fontWeight: 600 }}>Principal Agent</div>
                            </div>
                        </div>
                        <div className="nm-agent-actions">
                            <i className="fa-brands fa-whatsapp"></i>
                            <i className="fa-solid fa-phone"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
