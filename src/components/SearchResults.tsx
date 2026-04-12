import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import SingleProperty from '../SingleProperty';
import { useAppContext } from '../context/AppContext';

const safetyTipsList = [
    "Never transfer funds before viewing a property and verifying documents.",
    "Always meet agents at the property or their official registered office.",
    "Request to see the title deed or mandate to sell before signing anything.",
    "If a deal sounds too good to be true, it probably is. Stay vigilant."
];

const subtypesMap: Record<string, string[]> = {
    residential: [
        'House', 'Apartment', 'Townhouse', 'Cottage', 'Room', 'Duplex', 'Simplex', 'Cluster House', 'Flatlet'
    ],
    stand: [
        'Residential Land', 'Commercial Land', 'Industrial Land', 'Agricultural Land', 'Farm'
    ],
    commercial: [
        'Office', 'Shop / retail', 'Warehouse', 'Industrial property', 'Commercial property', 'Guest house', 'Lodge', 'Hotel'
    ]
};

export default function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isPropertyPageOpen, setIsPropertyPageOpen] = useState(false);
    const [selectedPropertyType, setSelectedPropertyType] = useState('residential');

    // Header & Modal state
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isListingPageOpen, setIsListingPageOpen] = useState(false);
    const [isSafetyPopoverOpen, setIsSafetyPopoverOpen] = useState(false);
    const [isMobileMapOpen, setIsMobileMapOpen] = useState(false);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [category, setCategory] = useState('');
    const [subtype, setSubtype] = useState('');
    const [availability, setAvailability] = useState('now');

    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q') || '';
    const searchCategory = queryParams.get('category') || 'all';
    const searchStatus = queryParams.get('status') || 'all';
    const searchMinPrice = queryParams.get('minPrice') || '';
    const searchMaxPrice = queryParams.get('maxPrice') || '';
    const searchBeds = queryParams.get('beds') || 'all';

    const handlePlusClick = () => {
        if (isUserLoggedIn) {
            setIsListingPageOpen(true);
        } else {
            setIsAuthModalOpen(true);
        }
    };

    const closeListingPage = () => {
        setIsListingPageOpen(false);
    };

    const toggleSafetyPopover = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isSafetyPopoverOpen) {
            setCurrentTipIndex(0);
        }
        setIsSafetyPopoverOpen(!isSafetyPopoverOpen);
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

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (isSafetyPopoverOpen && !target.closest('.we-safety-popover') && !target.closest('.we-info-trigger')) {
                setIsSafetyPopoverOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isSafetyPopoverOpen]);

    useEffect(() => {
        if (isMobileMenuOpen || isAuthModalOpen || isListingPageOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMobileMenuOpen, isAuthModalOpen, isListingPageOpen]);

    const [savedProperties, setSavedProperties] = useState<Record<string, boolean>>({ '1': true }); // ID 1 is saved by default
    const { properties } = useAppContext();

    // Filter states
    const [priceFilter, setPriceFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [bedsFilter, setBedsFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredProperties = properties.filter(prop => {
        const text = `${prop.title} ${prop.location} ${prop.tag} ${prop.icons.map(i => i.text).join(' ')}`.toLowerCase();
        let isMatch = true;

        if (searchQuery && !text.includes(searchQuery.toLowerCase())) {
            isMatch = false;
        }

        // Apply UI filters
        if (typeFilter !== 'all' && prop.type !== typeFilter) isMatch = false;
        if (statusFilter !== 'all') {
            if (statusFilter === 'sale' && !prop.tag.toLowerCase().includes('sale')) isMatch = false;
            if (statusFilter === 'rent' && !prop.tag.toLowerCase().includes('rent')) isMatch = false;
        }
        if (bedsFilter !== 'all') {
            const bedIcon = prop.icons.find(i => i.icon === 'fa-bed');
            if (!bedIcon || !bedIcon.text.includes(bedsFilter)) isMatch = false;
        }
        if (priceFilter !== 'all') {
            const [min, max] = priceFilter.split('-').map(Number);
            if (max) {
                if (prop.priceNum < min || prop.priceNum > max) isMatch = false;
            } else {
                if (prop.priceNum < min) isMatch = false;
            }
        }

        return isMatch;
    }).sort((a, b) => {
        if (a.isSponsored && !b.isSponsored) return -1;
        if (!a.isSponsored && b.isSponsored) return 1;
        return 0;
    });

    const toggleSave = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setSavedProperties(prev => ({ ...prev, [id]: !prev[id] }));
    };

    if (isPropertyPageOpen) {
        return <SingleProperty onBack={() => setIsPropertyPageOpen(false)} propertyType={selectedPropertyType} />;
    }

    return (
        <div className="we-wrapper">
            <div className="we-header-wrapper">
                <header className="we-header">
                    <a href="#home" className="we-logo-group">
                        <div className="we-left-logo">
                            <img src="https://image2url.com/r2/bucket2/images/1775993105962-31e87a44-28d1-4cf3-a0e7-3d505b5a82bc.png" alt="nextmove Logo" />
                        </div>
                        <div className="we-site-title">
                            <span className="title-black">next</span><span className="title-brand">move</span>
                        </div>
                    </a>

                    <div className="we-search-bar">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Search properties..." />
                    </div>

                    <div className="we-action-group">
                        <nav className="we-nav-desktop">
                            <a href="#home">Home</a>
                            <a href="#buy">Buy</a>
                            <a href="#rent">Rent</a>
                            <a href="#sell" className="we-cta-btn">AGENT PORTAL</a>
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
                            <img src="https://image2url.com/r2/bucket1/images/1775993028818-ae7af098-78ac-4636-a411-d90c53188867.png" alt="Menu" />
                        </button>
                    </div>
                </header>
            </div>

            <div className="sr-layout">
                <div className="sr-left">
                    <div className="sr-filter-bar">
                        <button className="sr-filter-btn"><i className="fa-solid fa-sliders"></i> Filters</button>
                        <select className="sr-filter-btn" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                            <option value="all">Any Price</option>
                            <option value="0-50000">$0 - $50k</option>
                            <option value="50000-150000">$50k - $150k</option>
                            <option value="150000-500000">$150k - $500k</option>
                            <option value="500000">$500k+</option>
                        </select>
                        <select className="sr-filter-btn" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                            <option value="all">Property Type</option>
                            <option value="residential">Residential</option>
                            <option value="stand">Stands / Land</option>
                            <option value="commercial">Commercial</option>
                        </select>
                        <select className="sr-filter-btn" value={bedsFilter} onChange={(e) => setBedsFilter(e.target.value)}>
                            <option value="all">Beds & Baths</option>
                            <option value="1">1+ Bed</option>
                            <option value="2">2+ Bed</option>
                            <option value="3">3+ Bed</option>
                            <option value="4">4+ Bed</option>
                        </select>
                        <button className={`sr-filter-btn ${statusFilter === 'sale' ? 'active' : ''}`} onClick={() => setStatusFilter(statusFilter === 'sale' ? 'all' : 'sale')}>For Sale</button>
                        <button className={`sr-filter-btn ${statusFilter === 'rent' ? 'active' : ''}`} onClick={() => setStatusFilter(statusFilter === 'rent' ? 'all' : 'rent')}>For Rent</button>
                    </div>

                    <div className="sr-header-text">
                        <h1>{searchQuery ? `Results for "${searchQuery}"` : '142 Homes in Harare'}</h1>
                        <button className="sr-sort"><span>Sort by:</span> Newest <i className="fa-solid fa-chevron-down"></i></button>
                    </div>

                    <div className="sr-grid">
                        {filteredProperties.map(prop => (
                            <div key={prop.id} className={`we-card ${prop.featured || prop.isSponsored ? 'featured' : ''} ${prop.status.toLowerCase() === 'sold' ? 'sold' : ''}`} onClick={() => { setSelectedPropertyType(prop.type); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: `url('${prop.image}')`}}>
                                    {prop.status.toLowerCase() === 'sold' && (
                                        <div className="we-sold-overlay">
                                            <div className="we-sold-badge">SOLD</div>
                                        </div>
                                    )}
                                    <span className="we-tag" style={prop.tagStyle}>{prop.tag}</span>
                                    {prop.isSponsored ? (
                                        <span className="we-featured-tag" style={{ background: '#1FE6D4', color: '#1A1C1E' }}><i className="fa-solid fa-star"></i> Sponsored</span>
                                    ) : prop.featured ? (
                                        <span className="we-featured-tag"><i className="fa-solid fa-bolt"></i> Featured</span>
                                    ) : null}
                                    <div className="we-lister-badge"><i className="fa-solid fa-building-circle-check"></i> Elite Realty</div>
                                </div>
                                <div className="we-body">
                                    <div className="we-price">{prop.price}</div>
                                    <div className="we-title">{prop.title}</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> {prop.location}</div>
                                    <div className="we-icons-row">
                                        {prop.icons.map((icon, index) => (
                                            <div key={index} className="we-icon-item">
                                                {icon.icon && <i className={`fa-solid ${icon.icon}`}></i>}
                                                {icon.label && <span className="we-service-label">{icon.label}</span>}
                                                {' '}{icon.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
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
                <a href="#portal" className="we-menu-contact-btn">AGENT PORTAL</a>
            </div>

            <div className={`we-modal-overlay ${isAuthModalOpen ? 'active' : ''}`} id="authModal" onClick={() => setIsAuthModalOpen(false)}>
                <div className="we-auth-card" onClick={(e) => e.stopPropagation()}>
                    <i className="fa-solid fa-xmark we-modal-close-icon" onClick={() => setIsAuthModalOpen(false)}></i>
                    <div className="we-auth-icon">
                        <i className="fa-solid fa-house-medical"></i>
                    </div>
                    <h3 className="we-auth-title">List Your Property</h3>
                    <p className="we-auth-desc">Join nextmove to connect with thousands of verified buyers and renters in Harare.</p>
                    <button className="we-auth-btn we-auth-primary">Create Account</button>
                    <button className="we-auth-btn we-auth-secondary">Sign In</button>
                </div>
            </div>

            <div className={`we-listing-page ${isListingPageOpen ? 'active' : ''}`} id="addListingPage">
                <div className="we-listing-header">
                    <h2>Create New Listing</h2>
                    <button className="we-listing-close" onClick={closeListingPage}><i className="fa-solid fa-xmark"></i></button>
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
                                {category && subtypesMap[category]?.map(s => (
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
        </div>
    );
}
