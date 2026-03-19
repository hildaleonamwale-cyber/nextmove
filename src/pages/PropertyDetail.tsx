import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROPERTIES, MOCK_AGENTS } from '../mockData';
import './PropertyDetail.css';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams();
  const property = MOCK_PROPERTIES.find(p => p.id === id) || MOCK_PROPERTIES[0];
  const agent = MOCK_AGENTS.find(a => a.id === property.agentId) || MOCK_AGENTS[0];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const dates = [
    { label: 'Mon 18', available: true },
    { label: 'Tue 19', available: false },
    { label: 'Wed 20', available: true },
    { label: 'Thu 21', available: false },
    { label: 'Fri 22', available: true },
    { label: 'Sat 23', available: true },
    { label: 'Sun 24', available: false },
    { label: 'Mon 25', available: true },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      setSelectedDate('');
      setIsSuccess(false);
    }, 300);
  };

  const handleConfirmBooking = () => {
    setIsSuccess(true);
  };

  // Cleanup overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="nm-page-wrapper">
      <section className="nm-gallery-v2">
        <div className="nm-gallery-main-wrap">
          <button className="nm-gallery-back" onClick={() => window.history.back()}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <img
            id="nmMainImage"
            className="nm-gallery-main-v2"
            src={property.images[activeImage] || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"}
            alt="Main property image"
            referrerPolicy="no-referrer"
          />
          
          <button 
            className="nm-gallery-nav prev" 
            onClick={() => setActiveImage(prev => prev > 0 ? prev - 1 : property.images.length - 1)}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button 
            className="nm-gallery-nav next" 
            onClick={() => setActiveImage(prev => prev < property.images.length - 1 ? prev + 1 : 0)}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          <div className="nm-thumb-carousel-wrap">
            <div className="nm-thumb-carousel" id="nmThumbCarousel">
              {property.images.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  className={`nm-thumb ${activeImage === idx ? 'active' : ''}`}
                  onClick={() => setActiveImage(idx)}
                  type="button"
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="nm-page">
        <div className="nm-breadcrumbs">
          <Link to="/" className="nm-crumb"><i className="fa-solid fa-house"></i> Home</Link>
          <Link to="/listings" className="nm-crumb"><i className="fa-solid fa-grid-2"></i> Listings</Link>
          <span className="nm-crumb"><i className="fa-solid fa-building"></i> {property.type || 'Residential'}</span>
          <span className="nm-crumb current"><i className="fa-solid fa-star"></i> {property.title}</span>
        </div>

        <section className="nm-content">
          <div className="nm-left">
            <div className="nm-status-row">
              {property.isFeatured && <span className="nm-pill"><i className="fa-solid fa-star"></i> Featured Listing</span>}
              <span className="nm-pill"><i className="fa-solid fa-house"></i> For Sale</span>
            </div>

            <div className="nm-price">${property.price.toLocaleString()}</div>
            <h1 className="nm-title">{property.title}</h1>

            <div className="nm-location">
              <i className="fa-solid fa-location-dot"></i>
              {property.location.suburb}, {property.location.city}
            </div>

            <div className="nm-facts">
              {property.category === 'House' && (
                <>
                  <div className="nm-fact">
                    <div className="nm-fact-label">Bedrooms</div>
                    <div className="nm-fact-value"><i className="fa-solid fa-bed"></i> {property.features.beds} Bedrooms</div>
                  </div>
                  <div className="nm-fact">
                    <div className="nm-fact-label">Bathrooms</div>
                    <div className="nm-fact-value"><i className="fa-solid fa-bath"></i> {property.features.baths} Bathrooms</div>
                  </div>
                  <div className="nm-fact">
                    <div className="nm-fact-label">Floor Size</div>
                    <div className="nm-fact-value"><i className="fa-solid fa-vector-square"></i> {property.features.sqft} m²</div>
                  </div>
                  <div className="nm-fact">
                    <div className="nm-fact-label">Property Type</div>
                    <div className="nm-fact-value"><i className="fa-solid fa-building"></i> {property.type || 'Villa'}</div>
                  </div>
                </>
              )}
              {property.category === 'Stand' && (
                <>
                  <div className="nm-fact">
                    <div className="nm-fact-label">Land Size</div>
                    <div className="nm-fact-value"><i className="fa-solid fa-vector-square"></i> {property.features.sqft} m²</div>
                  </div>
                  <div className="nm-fact">
                    <div className="nm-fact-label">Zoning</div>
                    <div className="nm-fact-value"><i className="fa-solid fa-map"></i> {property.features.zoning || 'Residential'}</div>
                  </div>
                  <div className="nm-fact">
                    <div className="nm-fact-label">Servicing</div>
                    <div className="nm-fact-value"><i className="fa-solid fa-road"></i> {property.features.servicingStatus || 'Unserviced'}</div>
                  </div>
                  <div className="nm-fact">
                    <div className="nm-fact-label">Property Type</div>
                    <div className="nm-fact-value"><i className="fa-solid fa-building"></i> {property.type || 'Land'}</div>
                  </div>
                </>
              )}
              {property.category === 'Commercial' && (
                <>
                  <div className="nm-fact">
                    <div className="nm-fact-label">Floor Size</div>
                    <div className="nm-fact-value"><i className="fa-solid fa-vector-square"></i> {property.features.sqft} m²</div>
                  </div>
                  <div className="nm-fact">
                    <div className="nm-fact-label">Rooms / Offices</div>
                    <div className="nm-fact-value"><i className="fa-solid fa-door-open"></i> {property.features.rooms || 0} Rooms</div>
                  </div>
                  <div className="nm-fact">
                    <div className="nm-fact-label">Building Grade</div>
                    <div className="nm-fact-value"><i className="fa-solid fa-building-shield"></i> Grade {property.features.buildingGrade || 'B'}</div>
                  </div>
                  <div className="nm-fact">
                    <div className="nm-fact-label">Property Type</div>
                    <div className="nm-fact-value"><i className="fa-solid fa-building"></i> {property.type || 'Office'}</div>
                  </div>
                </>
              )}
            </div>

            <section className="nm-section">
              <h2 className="nm-section-title">Property Description</h2>
              <div className="nm-description-box">
                <p>{property.description}</p>
              </div>
            </section>

            <section className="nm-section">
              <h2 className="nm-section-title">Property Details</h2>
              <div className="nm-details-grid">
                {property.category === 'House' && (
                  <>
                    <div className="nm-detail">
                      <div className="nm-detail-label">Lot Size</div>
                      <div className="nm-detail-value">{property.features.standSize ? `${property.features.standSize} m²` : 'N/A'}</div>
                    </div>
                    <div className="nm-detail">
                      <div className="nm-detail-label">Parking</div>
                      <div className="nm-detail-value">{property.features.parking || 0} Covered Bays</div>
                    </div>
                    <div className="nm-detail">
                      <div className="nm-detail-label">Lounges</div>
                      <div className="nm-detail-value">{property.features.lounges || 0}</div>
                    </div>
                    <div className="nm-detail">
                      <div className="nm-detail-label">Furnished</div>
                      <div className="nm-detail-value">{property.features.furnished ? 'Yes' : 'No'}</div>
                    </div>
                  </>
                )}
                {property.category === 'Stand' && (
                  <>
                    <div className="nm-detail">
                      <div className="nm-detail-label">Title Status</div>
                      <div className="nm-detail-value">{property.features.paperworkType || 'Cession'}</div>
                    </div>
                    <div className="nm-detail">
                      <div className="nm-detail-label">Soil Type</div>
                      <div className="nm-detail-value">{property.features.soilType || 'Mixed'}</div>
                    </div>
                    <div className="nm-detail">
                      <div className="nm-detail-label">Corner Stand</div>
                      <div className="nm-detail-value">{property.features.cornerStand ? 'Yes' : 'No'}</div>
                    </div>
                    <div className="nm-detail">
                      <div className="nm-detail-label">Ready to Build</div>
                      <div className="nm-detail-value">{property.features.readyToBuild ? 'Yes' : 'No'}</div>
                    </div>
                  </>
                )}
                {property.category === 'Commercial' && (
                  <>
                    <div className="nm-detail">
                      <div className="nm-detail-label">Meeting Rooms</div>
                      <div className="nm-detail-value">{property.features.meetingRooms || 0}</div>
                    </div>
                    <div className="nm-detail">
                      <div className="nm-detail-label">Parking</div>
                      <div className="nm-detail-value">{property.features.parking || 0} Bays</div>
                    </div>
                    <div className="nm-detail">
                      <div className="nm-detail-label">Furnished</div>
                      <div className="nm-detail-value">{property.features.furnished ? 'Yes' : 'No'}</div>
                    </div>
                    <div className="nm-detail">
                      <div className="nm-detail-label">Elevator Access</div>
                      <div className="nm-detail-value">{property.features.elevatorAccess ? 'Yes' : 'No'}</div>
                    </div>
                  </>
                )}
              </div>
            </section>

            <section className="nm-section">
              <h2 className="nm-section-title">Amenities & Features</h2>
              <div className="nm-features">
                {property.category === 'House' && (
                  <>
                    {property.features.borehole && <span className="nm-feature">Borehole</span>}
                    {property.features.swimmingPool && <span className="nm-feature">Swimming Pool</span>}
                    {property.features.garden && <span className="nm-feature">Landscaped Garden</span>}
                    {property.features.kitchen && <span className="nm-feature">Fitted Kitchen</span>}
                    {property.features.diningRoom && <span className="nm-feature">Dining Room</span>}
                    {property.features.securityFeatures?.map((feature, idx) => (
                      <span key={idx} className="nm-feature">{feature}</span>
                    ))}
                  </>
                )}
                {property.category === 'Stand' && (
                  <>
                    {property.features.electricity && <span className="nm-feature">Electricity Available</span>}
                    {property.features.water && <span className="nm-feature">Water Connected</span>}
                    {property.features.sewer && <span className="nm-feature">Sewer Connection</span>}
                    {property.features.tarredRoads && <span className="nm-feature">Tarred Roads</span>}
                  </>
                )}
                {property.category === 'Commercial' && (
                  <>
                    {property.features.receptionArea && <span className="nm-feature">Reception Area</span>}
                    {property.features.kitchenette && <span className="nm-feature">Kitchenette</span>}
                    {property.features.internet && <span className="nm-feature">High-Speed Internet</span>}
                    {property.features.airConditioning && <span className="nm-feature">Air Conditioning</span>}
                    {property.features.backupPower && <span className="nm-feature">Backup Power</span>}
                    {property.features.securityFeatures?.map((feature, idx) => (
                      <span key={idx} className="nm-feature">{feature}</span>
                    ))}
                  </>
                )}
              </div>
            </section>

            <section className="nm-section">
              <h2 className="nm-section-title">Location</h2>
              <div className="nm-map">
                Map preview block — {property.location.suburb}, {property.location.city}
              </div>
            </section>
          </div>

          <aside className="nm-right">
            <div className="nm-side-card">
              <div className="nm-agent-top">
                <img src={agent.photo || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"} alt={agent.name} referrerPolicy="no-referrer" />
                <div>
                  <h3 className="nm-agent-name">{agent.name}</h3>
                  <p className="nm-agent-meta">{agent.tagline || 'Residential Property Consultant'}</p>
                  {agent.isPro && (
                    <div className="nm-agent-badge">
                      <i className="fa-solid fa-circle-check"></i> Pro Agent
                    </div>
                  )}
                </div>
              </div>

              <p className="nm-side-copy">
                Interested in this listing? Schedule an appointment or contact the agent directly for more information.
              </p>

              <button className="nm-btn nm-btn-primary" onClick={handleOpenModal}>
                <i className="fa-solid fa-calendar-check"></i>
                Schedule Appointment
              </button>

              <button className="nm-btn nm-btn-dark">
                <i className="fa-brands fa-whatsapp"></i>
                WhatsApp Agent
              </button>

              <Link to={`/agent/${agent.id}`} className="nm-btn nm-btn-light">
                <i className="fa-solid fa-user"></i>
                View Profile
              </Link>

              <div className="nm-side-mini">
                <div className="nm-side-mini-row">
                  <span>Response Time</span>
                  <strong>Usually within 1 hour</strong>
                </div>
                <div className="nm-side-mini-row">
                  <span>Listing Ref</span>
                  <strong>NM-{property.id.padStart(5, '0')}</strong>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>

      {/* APPOINTMENT MODAL */}
      <div 
        className={`nm-modal-backdrop ${isModalOpen ? 'active' : ''}`} 
        onClick={(e) => {
          if (e.target === e.currentTarget) handleCloseModal();
        }}
      >
        <div className="nm-modal">
          <button className="nm-modal-close" onClick={handleCloseModal}>
            <i className="fa-solid fa-xmark"></i>
          </button>

          {!isSuccess ? (
            <div id="modalStep1">
              <h2 className="nm-modal-title">Schedule Appointment</h2>
              <p className="nm-modal-copy">
                Choose an available date to schedule your appointment. Unavailable dates are disabled. Once you select a date, continue to enter your details.
              </p>

              <div className="nm-date-grid">
                {dates.map((date, idx) => (
                  <button 
                    key={idx}
                    className={`nm-date-btn ${!date.available ? 'disabled' : ''} ${selectedDate === date.label ? 'active' : ''}`}
                    onClick={() => {
                      if (date.available) setSelectedDate(date.label);
                    }}
                    disabled={!date.available}
                  >
                    {date.label}
                    <small>{date.available ? 'Available' : 'Unavailable'}</small>
                  </button>
                ))}
              </div>

              <div className={`nm-form ${selectedDate ? 'active' : ''}`}>
                <div className="nm-form-row">
                  <input className="nm-field" type="text" placeholder="Full name" />
                  <input className="nm-field" type="email" placeholder="Email address" />
                </div>
                <div className="nm-form-row">
                  <input className="nm-field" type="tel" placeholder="Phone number" />
                  <input className="nm-field" type="text" value={selectedDate} placeholder="Selected date" readOnly />
                </div>
                <button className="nm-btn nm-btn-primary" type="button" onClick={handleConfirmBooking}>
                  <i className="fa-solid fa-check"></i>
                  Confirm Appointment
                </button>
              </div>
            </div>
          ) : (
            <div className="nm-success active">
              <div className="nm-success-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3>Appointment request sent</h3>
              <p>
                Your appointment request has been sent. Please keep in touch with the agent for any updates or changes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
