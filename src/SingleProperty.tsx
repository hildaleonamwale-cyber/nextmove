import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const propTypes = ['residential', 'commercial', 'stand', 'room'];

const imgs: Record<string, string[]> = {
    residential: ['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=400'],
    commercial: ['https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=400'],
    stand: ['https://i.pinimg.com/736x/98/04/69/980469f630d50176a5ac8c663437e632.jpg', 'https://i.pinimg.com/736x/53/0f/1a/530f1ade4b644c91dfed9d53a072b905.jpg', 'https://images.pexels.com/photos/461960/pexels-photo-461960.jpeg?auto=compress&cs=tinysrgb&w=400'],
    room: ['https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=400']
};

const mockData: Record<string, any> = {
    residential: {
        title: "Modern Architectural Masterpiece",
        price: "$1,250,000",
        typeTag: "For Sale",
        ref: "NM-RES-001",
        location: "Borrowdale Brooke, Harare",
        desc: "Experience the pinnacle of luxury living in this stunning contemporary home. Featuring floor-to-ceiling windows, a private infinity pool, and state-of-the-art smart home integration. The open-concept design seamlessly blends indoor and outdoor spaces, perfect for entertaining.",
        company: "Willow & Elm",
        companyLogo: "https://willowandelm.co.zw/wp-content/uploads/2026/03/nextmove.-5.png.png",
        quick: [
            { label: "Bedrooms", icon: "fa-bed", val: "5 Bedrooms" },
            { label: "Bathrooms", icon: "fa-bath", val: "4 Bathrooms" },
            { label: "Floor Size", icon: "fa-vector-square", val: "450 m²" },
            { label: "Property Type", icon: "fa-house", val: "Villa" }
        ],
        full: [
            { label: "Lot Size", icon: "fa-ruler-combined", val: "2000 m²" },
            { label: "Parking", icon: "fa-car", val: "3 Covered Bays" },
            { label: "Lounges", icon: "fa-couch", val: "2" },
            { label: "Furnished", icon: "fa-chair", val: "No" }
        ],
        amenities: ["Borehole", "Swimming Pool", "Landscaped Garden", "Fitted Kitchen", "Dining Room", "Electric Fence", "CCTV", "Alarm System"]
    },
    commercial: {
        title: "Premium CBD Office Floor",
        price: "$4,500<span>/mo</span>",
        typeTag: "For Rent",
        ref: "NM-COM-089",
        location: "Nexus Tower, CBD, Harare",
        desc: "Entire 4th floor available in the highly sought-after Nexus Tower in the CBD. The space features a pristine modern reception, 8 private glass-partitioned offices, and a large open-plan central working area. High-speed fibre ready.",
        company: "Pam Golding",
        companyLogo: "https://i.pinimg.com/1200x/fb/32/27/fb3227a1d3765b94578c1514f9e26fb2.jpg",
        quick: [
            { label: "Floor Size", icon: "fa-vector-square", val: "850 m²" },
            { label: "Total Rooms", icon: "fa-door-open", val: "12 Rooms" },
            { label: "Layout", icon: "fa-layer-group", val: "Partitioned" },
            { label: "Property Type", icon: "fa-building", val: "Office Space" }
        ],
        full: [
            { label: "Private Offices", icon: "fa-door-closed", val: "8" },
            { label: "Boardrooms", icon: "fa-chalkboard-user", val: "2" },
            { label: "Bathrooms", icon: "fa-restroom", val: "4" },
            { label: "Reception Area", icon: "fa-bell-concierge", val: "Yes" }
        ],
        amenities: ["Kitchenette", "Basement Parking", "Air Conditioning", "Backup Power", "Internet Ready", "24/7 Security", "Elevator Access"]
    },
    stand: {
        title: "Borrowdale Brooke Phase 2 Plot",
        price: "$180,000",
        typeTag: "For Sale",
        ref: "NM-LND-202",
        location: "Borrowdale Brooke, Harare North",
        desc: "An incredible opportunity to build your dream home in the secure, gated community of Borrowdale Brooke Phase 2. This plot is perfectly flat, heavily wooded with mature indigenous trees, and fully serviced.",
        company: null,
        quick: [
            { label: "Land Size", icon: "fa-ruler-combined", val: "2500 m²" },
            { label: "Terrain", icon: "fa-mountain", val: "Flat" },
            { label: "Condition", icon: "fa-trowel-bricks", val: "Fully Serviced" },
            { label: "Property Type", icon: "fa-earth-africa", val: "Residential Stand" }
        ],
        full: [
            { label: "Corner Stand", icon: "fa-road", val: "No" },
            { label: "Legal Status", icon: "fa-file-contract", val: "Title Deed" },
            { label: "Zoning", icon: "fa-city", val: "Residential" },
            { label: "Gate Access", icon: "fa-door-closed", val: "Secure Boom" }
        ],
        amenities: ["ZESA Power Available", "Council Water", "Main Sewer Connected", "Tarred Roads", "Gated Community", "Ready to Build"]
    },
    room: {
        title: "Spacious Ensuite Room in Avondale",
        price: "$250<span>/mo</span>",
        typeTag: "For Rent",
        ref: "NM-ROM-044",
        location: "Avondale, Harare",
        desc: "Large private bedroom available in a quiet shared house in Avondale. The room features its own ensuite bathroom, built-in cupboards, and a private entrance leading directly to the garden.",
        company: null,
        quick: [
            { label: "Room Type", icon: "fa-bed", val: "Private Room" },
            { label: "Bathroom", icon: "fa-bath", val: "Ensuite" },
            { label: "Occupants", icon: "fa-user", val: "Max 1 Person" },
            { label: "Gender Pref", icon: "fa-venus-mars", val: "Any" }
        ],
        full: [
            { label: "Separate Entrance", icon: "fa-door-open", val: "Yes" },
            { label: "Yard Access", icon: "fa-tree", val: "Yes" },
            { label: "Security", icon: "fa-shield", val: "Walled & Gated" },
            { label: "Lease Term", icon: "fa-calendar-days", val: "Min 6 Months" }
        ],
        amenities: ["Built-in Cupboards", "Furnished (Optional)", "Wi-Fi Included", "Shared Kitchen", "Secure Parking", "Borehole Water"]
    }
};

export default function SingleProperty({ onBack }: { onBack: () => void }) {
    const [propIndex, setPropIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentLbIndex, setCurrentLbIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'auto'; // Ensure overflow is auto when mounting
        
        return () => {
            document.body.style.overflow = 'auto'; // Cleanup
        };
    }, []);

    const currentType = propTypes[propIndex];
    const data = mockData[currentType];
    const lbImages = imgs[currentType];

    const cycleProperty = () => {
        setPropIndex((prev) => (prev + 1) % propTypes.length);
    };

    const openLightbox = (index: number) => {
        setCurrentLbIndex(index);
        setIsLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const lbNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentLbIndex((prev) => (prev + 1) % lbImages.length);
    };

    const lbPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentLbIndex((prev) => (prev - 1 + lbImages.length) % lbImages.length);
    };

    const handleWhatsApp = () => {
        window.open('https://wa.me/1234567890?text=I%20am%20interested%20in%20this%20property', '_blank');
    };

    const handleSchedule = () => {
        window.location.href = 'mailto:agent@example.com?subject=Schedule%20Appointment&body=I%20would%20like%20to%20schedule%20an%20appointment%20for%20this%20property.';
    };

    return (
        <>
            <div className="sp-wrapper">
                <div className="sp-content">
                    <button onClick={onBack} style={{ marginBottom: '20px', background: 'none', border: 'none', color: 'var(--brand)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <i className="fa-solid fa-arrow-left"></i> Back to Home
                    </button>
                    <div className="sp-gallery" id="dynGallery">
                        <div className="sp-main-img" style={{ backgroundImage: `url('${lbImages[0]}')` }} onClick={() => openLightbox(0)}>
                            <div className="sp-badges" id="dynTags">
                                <div className="sp-badge featured"><i className="fa-solid fa-bolt"></i> Featured Listing</div>
                                <div className="sp-badge type"><i className={`fa-solid ${data.typeTag === 'For Sale' ? 'fa-house-chimney' : 'fa-key'}`}></i> {data.typeTag}</div>
                            </div>
                            <button className="sp-img-arrow left" onClick={(e) => { e.stopPropagation(); lbPrev(e); }}><i className="fa-solid fa-chevron-left"></i></button>
                            <button className="sp-img-arrow right" onClick={(e) => { e.stopPropagation(); lbNext(e); }}><i className="fa-solid fa-chevron-right"></i></button>
                        </div>
                        <div className="sp-thumbnails">
                            <div className="sp-thumb active" style={{ backgroundImage: `url('${lbImages[0]}')` }} onClick={() => openLightbox(0)}></div>
                            <div className="sp-thumb" style={{ backgroundImage: `url('${lbImages[1]}')` }} onClick={() => openLightbox(1)}></div>
                            <div className="sp-thumb" style={{ backgroundImage: `url('${lbImages[2]}')` }} onClick={() => openLightbox(2)}></div>
                            <div className="sp-thumb" style={{ background: 'var(--input-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)', fontWeight: 700, fontSize: '12px', border: '1px solid var(--border-color)' }} onClick={() => openLightbox(0)}>
                                +{Math.max(0, lbImages.length - 3)} Photos
                            </div>
                        </div>
                    </div>

                    <div className="sp-price" id="dynPrice" dangerouslySetInnerHTML={{ __html: data.price }}></div>
                    <h1 className="sp-title" id="dynTitle">{data.title}</h1>
                    <div className="sp-location"><i className="fa-solid fa-location-dot"></i> <span id="dynLocation">{data.location}</span></div>

                    <h2 className="sp-section-title">Property Overview</h2>
                    <div className="sp-grid" id="dynQuickDetails">
                        {data.quick.map((item: any, i: number) => (
                            <div className="sp-grid-box" key={i}>
                                <div className="sp-grid-label">{item.label}</div>
                                <div className="sp-grid-val"><i className={`fa-solid ${item.icon}`}></i> {item.val}</div>
                            </div>
                        ))}
                    </div>

                    <h2 className="sp-section-title">Property Description</h2>
                    <div className="sp-desc-box" id="dynDesc">
                        {data.desc}
                    </div>

                    <h2 className="sp-section-title">Property Details</h2>
                    <div className="sp-grid" id="dynFullDetails">
                        {data.full.map((item: any, i: number) => (
                            <div className="sp-grid-box" key={i}>
                                <div className="sp-grid-label">{item.label}</div>
                                <div className="sp-grid-val"><i className={`fa-solid ${item.icon}`}></i> {item.val}</div>
                            </div>
                        ))}
                    </div>

                    <h2 className="sp-section-title">Amenities & Features</h2>
                    <div className="sp-amenities" id="dynAmenities">
                        {data.amenities.map((item: string, i: number) => (
                            <div className="sp-amenity-pill" key={i}>{item}</div>
                        ))}
                    </div>

                    <h2 className="sp-section-title">Location</h2>
                    <div className="sp-map-box" style={{ backgroundImage: "url('https://www.mapquest.com/mq/maps/mapUrl?size=1200,600&zoom=13&center=-17.753,31.082')" }}>
                        <div className="sp-map-overlay">
                            <button className="sp-map-btn"><i className="fa-solid fa-map-location-dot"></i> Map preview block — <span id="mapLoc">{data.location}</span></button>
                        </div>
                    </div>
                </div>

                <div className="sp-sidebar">
                    <div className="sp-agent-card">
                        
                        {data.company && (
                            <a href="/profile.html" style={{textDecoration: 'none'}}>
                                <div className="sp-company-banner" id="dynCompanyBanner">
                                    <img id="dynCompanyLogo" src={data.companyLogo} alt="Company Logo" />
                                    <span>Listed by <strong id="dynCompanyName">{data.company}</strong></span>
                                </div>
                            </a>
                        )}

                        <div className="sp-agent-card-body">
                            <div className="sp-agent-header">
                                <div className="sp-agent-avatar" style={{ backgroundImage: "url('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150')" }}></div>
                                <div className="sp-agent-info">
                                    <h4>Sarah Jenkins</h4>
                                    <p>Property Specialist</p>
                                    <div className="sp-pro-tag"><i className="fa-solid fa-circle-check"></i> <span id="agentRole">{data.company ? 'Staff Agent' : 'Private Agent'}</span></div>
                                </div>
                            </div>

                            <p className="sp-agent-prompt">Interested in this listing? Schedule an appointment or contact the agent directly for more information.</p>

                            <button className="sp-btn sp-btn-brand" onClick={handleSchedule}><i className="fa-regular fa-calendar-check"></i> Schedule Appointment</button>
                            <button className="sp-btn sp-btn-dark" onClick={handleWhatsApp}><i className="fa-brands fa-whatsapp" style={{ fontSize: '16px' }}></i> WhatsApp Agent</button>
                            <Link to="/profile" className="sp-btn sp-btn-outline" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}><i className="fa-regular fa-user"></i> View Profile</Link>

                            <div className="sp-meta">
                                <div className="sp-meta-row"><span className="sp-meta-label">Response Time</span><span className="sp-meta-val">Usually within 1 hour</span></div>
                                <div className="sp-meta-row"><span className="sp-meta-label">Listing Ref</span><span className="sp-meta-val" id="dynRef">{data.ref}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`nm-lightbox ${isLightboxOpen ? 'active' : ''}`} id="lightbox" onClick={closeLightbox}>
                <button className="nm-lb-close" onClick={closeLightbox}>&times;</button>
                <button className="nm-lb-nav nm-lb-prev" onClick={lbPrev}><i className="fa-solid fa-chevron-left"></i></button>
                <img className="nm-lb-img" id="lbImg" src={lbImages[currentLbIndex]} onClick={(e) => e.stopPropagation()} alt="Lightbox" />
                <button className="nm-lb-nav nm-lb-next" onClick={lbNext}><i className="fa-solid fa-chevron-right"></i></button>
                <div className="nm-lb-counter" id="lbCounter">{currentLbIndex + 1} / {lbImages.length}</div>
            </div>

            <button className="test-toggle" onClick={cycleProperty} id="testModeBtn">
                Test View: {currentType.charAt(0).toUpperCase() + currentType.slice(1)}
            </button>
        </>
    );
}
