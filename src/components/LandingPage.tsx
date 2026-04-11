import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SingleProperty from '../SingleProperty';

const safetyTipsList = [
    "Never transfer funds before viewing a property and verifying documents.",
    "Always meet agents at the property or their official registered office.",
    "Request to see the title deed or mandate to sell before signing anything.",
    "If a deal sounds too good to be true, it probably is. Stay vigilant."
];

const subtypesMap: Record<string, string[]> = {
    residential: ['Full house', 'Apartment', 'Cottage', 'Room', 'Cluster house / townhouse'],
    stand: ['Residential stand', 'Commercial stand', 'Agricultural land', 'Industrial land'],
    commercial: ['Office', 'Shop / retail', 'Warehouse', 'Industrial property', 'Salon / studio space', 'Restaurant / hospitality space']
};

export default function LandingPage() {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isListingPageOpen, setIsListingPageOpen] = useState(false);
    const [isPropertyPageOpen, setIsPropertyPageOpen] = useState(false);
    const [selectedPropertyType, setSelectedPropertyType] = useState('residential');
    const [isSafetyPopoverOpen, setIsSafetyPopoverOpen] = useState(false);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    const [category, setCategory] = useState('');
    const [subtype, setSubtype] = useState('');
    const [availability, setAvailability] = useState('now');

    const [isAdvSearchOpen, setIsAdvSearchOpen] = useState(false);
    const [searchCategory, setSearchCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchStatus, setSearchStatus] = useState('all');
    const [searchMinPrice, setSearchMinPrice] = useState('');
    const [searchMaxPrice, setSearchMaxPrice] = useState('');
    const [searchBeds, setSearchBeds] = useState('all');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.append('q', searchQuery);
        if (searchCategory !== 'all') params.append('category', searchCategory);
        if (searchStatus !== 'all') params.append('status', searchStatus);
        if (searchMinPrice) params.append('minPrice', searchMinPrice);
        if (searchMaxPrice) params.append('maxPrice', searchMaxPrice);
        if (searchBeds !== 'all') params.append('beds', searchBeds);
        
        navigate(`/search?${params.toString()}`);
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

    const handlePlusClick = () => {
        if (isUserLoggedIn) {
            setIsListingPageOpen(true);
        } else {
            setIsAuthModalOpen(true);
        }
    };

    const closeListingPage = () => {
        setIsListingPageOpen(false);
        setCategory('');
        setSubtype('');
        setAvailability('now');
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

            {isPropertyPageOpen ? (
                <SingleProperty onBack={() => setIsPropertyPageOpen(false)} propertyType={selectedPropertyType} />
            ) : (
                <>
                    <section className="we-hero-clean">
                <div className="we-trust-badge">
                    <i className="fa-solid fa-circle-check"></i> 
                    <span>2500+ Properties Sold</span>
                </div>

                <h1 className="we-hero-h1">
                    Find your<br />dream space.
                </h1>

                <p className="we-hero-p">
                    Premium residential stands and luxury plots across Harare’s most prestigious neighborhoods. Curated listings and verified title deeds.
                </p>
                
                <div className="we-hero-actions">
                    <a href="#list-property" className="we-btn-hero btn-enquire">
                        <i className="fa-solid fa-house"></i> List my property
                    </a>
                    
                    <Link to="/calculator" className="we-btn-hero btn-valuation">
                        <i className="fa-solid fa-calculator"></i> Installment calculator
                    </Link>
                </div>
            </section>

            <div className="we-promo-wrapper">
                <div className="we-full-bleed-carousel">
                    <div className="we-promo-carousel-inner">
                        
                        <div className="we-promo-card">
                            <div className="we-promo-tag">Featured</div>
                            <img src="https://i.pinimg.com/736x/4e/65/3d/4e653d0f65e59c69be6b692415537455.jpg" alt="Greystone Park" />
                            <div className="we-promo-glass">
                                <span className="we-promo-location">Greystone Park, Harare</span>
                                <div className="we-promo-title">Luxury Hillside Stands</div>
                                <div className="we-promo-price">$45 <span>/sqm</span></div>
                            </div>
                        </div>

                        <div className="we-promo-card">
                            <div className="we-promo-tag">Reduced $</div>
                            <img src="https://i.pinimg.com/736x/0f/a3/12/0fa312e5ca0465a866c90842d4f931ad.jpg" alt="Avondale Heights" />
                            <div className="we-promo-glass">
                                <span className="we-promo-location">Avondale Heights, Harare</span>
                                <div className="we-promo-title">Luxury 2-Bed Apartments</div>
                                <div className="we-promo-price">$1,200 <span>/mo</span></div>
                            </div>
                        </div>

                        <div className="we-promo-card">
                            <div className="we-promo-tag">Waitlist Open</div>
                            <img src="https://i.pinimg.com/736x/d3/f4/f5/d3f4f5ba0f31fde11bf4032470ea0bd9.jpg" alt="Borrowdale Brooke" />
                            <div className="we-promo-glass">
                                <span className="we-promo-location">Borrowdale Brooke, Harare</span>
                                <div className="we-promo-title">Premium Cluster Homes</div>
                                <div className="we-promo-price">$180k <span>Starting</span></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <section className="we-search-hero">
                <div className="we-search-icon-wrapper">
                    <i className="fa-solid fa-magnifying-glass-location"></i>
                </div>

                <h1 className="we-search-title">Find your spot<br />on the map.</h1>
                <p className="we-search-subtitle">Search by neighborhood, soil type, or price range to find the perfect stand for your future home.</p>
            </section>

            <div className="we-app-wrapper">
                <div className="we-content-align">
                    
                    <div className="we-search-card">
                        
                        <div className="we-search-primary">
                            <div className="we-search-input-wrap">
                                <i className="fa-solid fa-location-dot"></i>
                                <input 
                                    type="text" 
                                    className="we-s-input" 
                                    placeholder="Search by city, neighborhood, or street..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div className="we-search-grid-base">
                            <div className="we-search-input-wrap">
                                <i className="fa-solid fa-building"></i>
                                <select 
                                    id="mainSearchCat" 
                                    className="we-s-select" 
                                    value={searchCategory}
                                    onChange={(e) => setSearchCategory(e.target.value)}
                                >
                                    <option value="all">Any Category</option>
                                    <option value="residential">Residential</option>
                                    <option value="stand">Stands / Land</option>
                                    <option value="commercial">Commercial</option>
                                </select>
                            </div>
                            <div className="we-search-input-wrap">
                                <i className="fa-solid fa-tag"></i>
                                <select 
                                    className="we-s-select"
                                    value={searchStatus}
                                    onChange={(e) => setSearchStatus(e.target.value)}
                                >
                                    <option value="all">Any Status</option>
                                    <option value="sale">For Sale</option>
                                    <option value="rent">For Rent</option>
                                    <option value="short">Short Stay</option>
                                </select>
                            </div>
                        </div>

                        <button 
                            className="we-advanced-toggle" 
                            onClick={() => setIsAdvSearchOpen(!isAdvSearchOpen)} 
                            id="advBtnToggle"
                        >
                            {isAdvSearchOpen ? (
                                <><i className="fa-solid fa-chevron-up"></i> Hide Advanced Filters</>
                            ) : (
                                <><i className="fa-solid fa-sliders"></i> Show Advanced Filters</>
                            )}
                        </button>

                        <div className={`we-adv-panel ${isAdvSearchOpen ? 'active' : ''}`} id="advPanel">
                            <div className="we-search-adv-grid">
                                <div className="we-search-input-wrap">
                                    <i className="fa-solid fa-list"></i>
                                    <select id="mainSearchSub" className="we-s-select" disabled={searchCategory === 'all' || !searchCategory}>
                                        <option value="all">Any Subtype</option>
                                        {searchCategory !== 'all' && subtypesMap[searchCategory]?.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="we-search-input-wrap">
                                    <i className="fa-solid fa-dollar-sign"></i>
                                    <input 
                                        type="number" 
                                        className="we-s-input" 
                                        placeholder="Min Price" 
                                        value={searchMinPrice}
                                        onChange={(e) => setSearchMinPrice(e.target.value)}
                                    />
                                </div>
                                <div className="we-search-input-wrap">
                                    <i className="fa-solid fa-dollar-sign"></i>
                                    <input 
                                        type="number" 
                                        className="we-s-input" 
                                        placeholder="Max Price" 
                                        value={searchMaxPrice}
                                        onChange={(e) => setSearchMaxPrice(e.target.value)}
                                    />
                                </div>
                                <div className="we-search-input-wrap">
                                    <i className="fa-solid fa-bed"></i>
                                    <select 
                                        className="we-s-select"
                                        value={searchBeds}
                                        onChange={(e) => setSearchBeds(e.target.value)}
                                    >
                                        <option value="all">Bedrooms</option>
                                        <option value="1">1+</option>
                                        <option value="2">2+</option>
                                        <option value="3">3+</option>
                                        <option value="4">4+</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button className="we-search-submit" onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i> Search Properties</button>
                        
                    </div>


                    <div className="we-section-header">
                        <div className="we-header-text-group">
                            <h2>Latest Listings</h2>
                            <p>Featured properties across all categories.</p>
                        </div>
                        <Link to="/search" className="we-see-all">See All <i className="fa-solid fa-arrow-right"></i></Link>
                    </div>
                    <div className="we-full-bleed-container">
                        <div className="we-listings">
                            
                            <div className="we-card featured" onClick={() => { setSelectedPropertyType('residential'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: "url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800')"}}>
                                    <span className="we-tag">FOR SALE</span>
                                    <span className="we-featured-tag"><i className="fa-solid fa-bolt"></i> Featured</span>
                                    <div className="we-lister-badge"><i className="fa-solid fa-building-circle-check"></i> Elite Realty</div>
                                </div>
                                <div className="we-body">
                                    <div className="we-price">$850,000</div>
                                    <div className="we-title">The Glass Pavilion</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> Borrowdale Brooke</div>
                                    <div className="we-icons-row">
                                        <div className="we-icon-item"><i className="fa-solid fa-bed"></i> 3 Bed</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-bath"></i> 2 Bath</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 220 m²</div>
                                    </div>
                                </div>
                            </div>

                            <div className="we-card" onClick={() => { setSelectedPropertyType('residential'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: "url('https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=800')"}}>
                                    <span className="we-tag">FOR RENT</span>
                                    <div className="we-lister-badge"><i className="fa-solid fa-building-circle-check"></i> Rawson</div>
                                </div>
                                <div className="we-body">
                                    <div className="we-price">$1,500/mo</div>
                                    <div className="we-title">Garden City Lofts</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> Avondale</div>
                                    <div className="we-icons-row">
                                        <div className="we-icon-item"><i className="fa-solid fa-bed"></i> 2 Bed</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-bath"></i> 1 Bath</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 110 m²</div>
                                    </div>
                                </div>
                            </div>

                            <div className="we-card" onClick={() => { setSelectedPropertyType('commercial'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: "url('https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800')"}}>
                                    <span className="we-tag">FOR LEASE</span>
                                    <div className="we-lister-badge"><i className="fa-solid fa-building-circle-check"></i> Pam Golding</div>
                                </div>
                                <div className="we-body">
                                    <div className="we-price">$2,500/mo</div>
                                    <div className="we-title">The Nexus Tower</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> CBD, Harare</div>
                                    <div className="we-icons-row">
                                        <div className="we-icon-item"><i className="fa-solid fa-layer-group"></i> Open Plan</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-snowflake"></i> Air Con</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 850 m²</div>
                                    </div>
                                </div>
                            </div>

                            <div className="we-card" onClick={() => { setSelectedPropertyType('room'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: "url('https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800')"}}>
                                    <span className="we-tag">FOR RENT</span>
                                </div>
                                <div className="we-body">
                                    <div className="we-price">$150/mo</div>
                                    <div className="we-title">Spacious Room Avondale</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> Avondale</div>
                                    <div className="we-icons-row">
                                        <div className="we-icon-item"><i className="fa-solid fa-bed"></i> Private Room</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-bath"></i> Shared Bath</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-door-open"></i> Own Entrance</div>
                                    </div>
                                </div>
                            </div>

                            <div className="we-card" onClick={() => { setSelectedPropertyType('commercial'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: "url('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg?auto=compress&cs=tinysrgb&w=800')"}}>
                                    <span className="we-tag">FOR RENT</span>
                                </div>
                                <div className="we-body">
                                    <div className="we-price">$1,800/mo</div>
                                    <div className="we-title">Highlands Retail Space</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> Highlands</div>
                                    <div className="we-icons-row">
                                        <div className="we-icon-item"><i className="fa-solid fa-store"></i> Street Facing</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-users"></i> High Traffic</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 120 m²</div>
                                    </div>
                                </div>
                            </div>

                            <div className="we-card" onClick={() => { setSelectedPropertyType('residential'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: "url('https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800')"}}><span className="we-tag">FOR SALE</span></div>
                                <div className="we-body">
                                    <div className="we-price">$450,000</div>
                                    <div className="we-title">Willow Terrace</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> Greendale</div>
                                    <div className="we-icons-row">
                                        <div className="we-icon-item"><i className="fa-solid fa-bed"></i> 4 Bed</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-bath"></i> 3 Bath</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 320 m²</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="we-section-header" style={{marginTop: '45px'}}>
                        <div className="we-header-text-group">
                            <h2>Premium Stands</h2>
                            <p>Investment-ready land with verified infrastructure.</p>
                        </div>
                        <Link to="/search?category=stand" className="we-see-all">See All <i className="fa-solid fa-arrow-right"></i></Link>
                    </div>
                    <div className="we-full-bleed-container">
                        <div className="we-listings" id="standGrid">
                            
                            <div className="we-card featured" onClick={() => { setSelectedPropertyType('stand'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: "url('https://i.pinimg.com/736x/53/0f/1a/530f1ade4b644c91dfed9d53a072b905.jpg')"}}>
                                    <span className="we-tag">TITLE DEEDS</span>
                                    <span className="we-featured-tag"><i className="fa-solid fa-bolt"></i> Featured</span>
                                    <div className="we-lister-badge"><i className="fa-solid fa-building-circle-check"></i> Pam Golding</div>
                                </div>
                                <div className="we-body">
                                    <div className="we-price">$45,000</div>
                                    <div className="we-title">Borrowdale East Phase 2</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> Harare North</div>
                                    <div className="we-icons-row">
                                        <div className="we-icon-item"><i className="fa-solid fa-ruler-combined"></i> 2000 m²</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-file-contract"></i> Title Deed</div>
                                        <div className="we-icon-item"><span className="we-service-label">Service:</span> 80%</div>
                                    </div>
                                </div>
                            </div>

                            <div className="we-card" onClick={() => { setSelectedPropertyType('stand'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: "url('https://i.pinimg.com/736x/98/04/69/980469f630d50176a5ac8c663437e632.jpg')"}}><span className="we-tag">50% DEPOSIT</span></div>
                                <div className="we-body">
                                    <div className="we-price">$28,000</div>
                                    <div className="we-title">Glen Lorne Extension</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> Harare North</div>
                                    <div className="we-icons-row">
                                        <div className="we-icon-item"><i className="fa-solid fa-ruler-combined"></i> 1200 m²</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-file-signature"></i> Cession</div>
                                        <div className="we-icon-item"><span className="we-service-label">Service:</span> 60%</div>
                                    </div>
                                </div>
                            </div>

                            <div className="we-card" onClick={() => { setSelectedPropertyType('stand'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: "url('https://i.pinimg.com/736x/ac/24/2b/ac242b20bb7872b1b839290d319adc79.jpg')"}}><span className="we-tag">NEW RELEASE</span></div>
                                <div className="we-body">
                                    <div className="we-price">$120,000</div>
                                    <div className="we-title">Highlands Luxury Estate</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> Harare East</div>
                                    <div className="we-icons-row">
                                        <div className="we-icon-item"><i className="fa-solid fa-ruler-combined"></i> 4000 m²</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-file-contract"></i> Title Deed</div>
                                        <div className="we-icon-item"><span className="we-service-label">Service:</span> 100%</div>
                                    </div>
                                </div>
                            </div>

                            <div className="we-card" onClick={() => { setSelectedPropertyType('stand'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: "url('https://i.pinimg.com/736x/84/38/17/8438172e4fa57040c32c5a62f290dd8a.jpg')"}}><span className="we-tag">SOLD FAST</span></div>
                                <div className="we-body">
                                    <div className="we-price">$18,000</div>
                                    <div className="we-title">Mabelreign Garden Plot</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> Mabelreign</div>
                                    <div className="we-icons-row">
                                        <div className="we-icon-item"><i className="fa-solid fa-ruler-combined"></i> 800 m²</div>
                                        <div className="we-icon-item"><i className="fa-solid fa-file-signature"></i> Cession</div>
                                        <div className="we-icon-item"><span className="we-service-label">Service:</span> 40%</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="we-section-header" style={{marginTop: '45px'}}>
                        <div className="we-header-text-group">
                            <h2>Recently Sold</h2>
                            <p>Properties that successfully found new owners.</p>
                        </div>
                        <Link to="/search?status=sold" className="we-see-all">See All <i className="fa-solid fa-arrow-right"></i></Link>
                    </div>
                    <div className="we-full-bleed-container">
                        <div className="we-listings">
                            
                            <div className="we-card sold" onClick={() => { setSelectedPropertyType('residential'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: "url('https://i.pinimg.com/1200x/58/75/a4/5875a4552941b69103b105da039155fe.jpg')"}}>
                                    <div className="we-sold-overlay">
                                        <div className="we-sold-badge">SOLD</div>
                                    </div>
                                </div>
                                <div className="we-body">
                                    <div className="we-price" style={{textDecoration: 'line-through', opacity: 0.6}}>$950,000</div>
                                    <div className="we-title">The Azure Villa</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> Borrowdale Brooke</div>
                                    <div className="we-icons-row">
                                        <div className="we-icon-item" style={{color: 'var(--gray-text)'}}>Closed 2 days ago</div>
                                    </div>
                                </div>
                            </div>

                            <div className="we-card sold" onClick={() => { setSelectedPropertyType('residential'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: "url('https://i.pinimg.com/1200x/e7/89/16/e78916a958980deeec5ca032bdff3247.jpg')"}}>
                                    <div className="we-sold-overlay">
                                        <div className="we-sold-badge">SOLD</div>
                                    </div>
                                </div>
                                <div className="we-body">
                                    <div className="we-price" style={{textDecoration: 'line-through', opacity: 0.6}}>$320,000</div>
                                    <div className="we-title">Modern Terrace</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> Avondale</div>
                                    <div className="we-icons-row">
                                        <div className="we-icon-item" style={{color: 'var(--gray-text)'}}>Closed 1 week ago</div>
                                    </div>
                                </div>
                            </div>

                            <div className="we-card sold" onClick={() => { setSelectedPropertyType('residential'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                                <div className="we-img" style={{backgroundImage: "url('https://i.pinimg.com/1200x/fb/32/27/fb3227a1d3765b94578c1514f9e26fb2.jpg')"}}>
                                    <div className="we-sold-overlay">
                                        <div className="we-sold-badge">SOLD</div>
                                    </div>
                                </div>
                                <div className="we-body">
                                    <div className="we-price" style={{textDecoration: 'line-through', opacity: 0.6}}>$1.1M</div>
                                    <div className="we-title">Highlands Manor</div>
                                    <div className="we-location"><i className="fa-solid fa-location-dot"></i> Highlands</div>
                                    <div className="we-icons-row">
                                        <div className="we-icon-item" style={{color: 'var(--gray-text)'}}>Closed Oct 2025</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

                </>
            )}

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
        </>
    );
}
