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
            { label: "Bedrooms", icon: "fa-bed", val: "5" },
            { label: "Bathrooms", icon: "fa-bath", val: "4" },
            { label: "Floor Size", icon: "fa-vector-square", val: "450 m²" },
            { label: "Stand Size", icon: "fa-ruler-combined", val: "2000 m²" }
        ],
        full: [
            { label: "Lounges", icon: "fa-couch", val: "2" },
            { label: "Dining Rooms", icon: "fa-utensils", val: "1" },
            { label: "Kitchens", icon: "fa-kitchen-set", val: "1" },
            { label: "Garages", icon: "fa-warehouse", val: "3" }
        ],
        amenities: ["Borehole", "Swimming Pool", "Landscaped Garden", "Fitted Kitchen", "Electric Fence", "CCTV", "Alarm System"]
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
            { label: "Total Rooms", icon: "fa-door-open", val: "12" },
            { label: "Bathrooms", icon: "fa-restroom", val: "4" },
            { label: "Layout", icon: "fa-layer-group", val: "Partitioned" }
        ],
        full: [
            { label: "Private Offices", icon: "fa-door-closed", val: "8" },
            { label: "Boardrooms", icon: "fa-chalkboard-user", val: "2" },
            { label: "Reception Area", icon: "fa-bell-concierge", val: "Yes" },
            { label: "Property Type", icon: "fa-building", val: "Office Space" }
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
            { label: "Land Size", icon: "fa-ruler-combined", val: "2500" },
            { label: "Unit of Measure", icon: "fa-ruler", val: "Square Meters (m²)" },
            { label: "Terrain Type", icon: "fa-mountain", val: "Flat" },
            { label: "Corner Stand", icon: "fa-road", val: "No" }
        ],
        full: [
            { label: "Legal Status", icon: "fa-file-contract", val: "Title Deed" },
            { label: "Zoning", icon: "fa-city", val: "Residential" },
            { label: "Gate Access", icon: "fa-door-closed", val: "Secure Boom" },
            { label: "Property Type", icon: "fa-earth-africa", val: "Residential Stand" }
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
            { label: "Max Occupants", icon: "fa-users", val: "1" },
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

export default function SingleProperty({ onBack, propertyType = 'residential' }: { onBack: () => void, propertyType?: string }) {
    const initialIndex = propTypes.indexOf(propertyType) !== -1 ? propTypes.indexOf(propertyType) : 0;
    const [propIndex, setPropIndex] = useState(initialIndex);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentLbIndex, setCurrentLbIndex] = useState(0);
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [appointmentStep, setAppointmentStep] = useState(1);
    const [appointmentData, setAppointmentData] = useState({
        date: '',
        time: '',
        name: '',
        email: '',
        phone: ''
    });

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
        setIsAppointmentModalOpen(true);
        setAppointmentStep(1);
        setAppointmentData({ date: '', time: '', name: '', email: '', phone: '' });
        document.body.style.overflow = 'hidden';
    };

    const closeAppointmentModal = () => {
        setIsAppointmentModalOpen(false);
        document.body.style.overflow = 'auto';
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

                            <div className="sp-meta" style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid var(--input-bg)' }}>
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

            {isAppointmentModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99999] flex items-center justify-center p-4" onClick={closeAppointmentModal}>
                    <div 
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col transform transition-all" 
                        onClick={e => e.stopPropagation()}
                        style={{ animation: 'modalSlideUp 0.3s ease-out forwards' }}
                    >
                        {/* Header */}
                        <div className="p-6 pb-4 border-b border-gray-100 flex justify-between items-center relative">
                            <h3 className="text-xl font-semibold text-gray-900">Schedule Appointment</h3>
                            <button onClick={closeAppointmentModal} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors cursor-pointer">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full">
                                <div className="h-full bg-teal-500 transition-all duration-500 ease-out" style={{ width: `${(appointmentStep / 6) * 100}%` }}></div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 relative min-h-[340px] flex flex-col">
                            <div className="flex-1 flex flex-col justify-center transition-opacity duration-300">
                                {appointmentStep === 1 && (
                                    <div className="space-y-4 animate-fade-in">
                                        <h4 className="text-lg font-medium text-gray-800 mb-2">Select a Date</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Today', 'Tomorrow', 'Wed, Oct 15', 'Thu, Oct 16', 'Fri, Oct 17', 'Sat, Oct 18'].map((d, i) => (
                                                <button 
                                                    key={i} 
                                                    onClick={() => setAppointmentData({...appointmentData, date: d})}
                                                    className={`p-4 rounded-2xl border-2 text-sm font-medium transition-all cursor-pointer ${appointmentData.date === d ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-100 hover:border-teal-200 text-gray-600'}`}
                                                >
                                                    {d}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {appointmentStep === 2 && (
                                    <div className="space-y-4 animate-fade-in">
                                        <h4 className="text-lg font-medium text-gray-800 mb-2">Select a Time</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'].map((t, i) => (
                                                <button 
                                                    key={i} 
                                                    onClick={() => setAppointmentData({...appointmentData, time: t})}
                                                    className={`p-4 rounded-2xl border-2 text-sm font-medium transition-all cursor-pointer ${appointmentData.time === t ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-100 hover:border-teal-200 text-gray-600'}`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {appointmentStep === 3 && (
                                    <div className="space-y-4 animate-fade-in">
                                        <h4 className="text-lg font-medium text-gray-800 mb-2">Your Full Name</h4>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Jane Doe" 
                                            value={appointmentData.name}
                                            onChange={e => setAppointmentData({...appointmentData, name: e.target.value})}
                                            className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-teal-500 focus:ring-0 outline-none transition-all text-lg bg-gray-50 focus:bg-white"
                                            autoFocus
                                        />
                                    </div>
                                )}
                                {appointmentStep === 4 && (
                                    <div className="space-y-4 animate-fade-in">
                                        <h4 className="text-lg font-medium text-gray-800 mb-2">Your Email</h4>
                                        <input 
                                            type="email" 
                                            placeholder="jane@example.com" 
                                            value={appointmentData.email}
                                            onChange={e => setAppointmentData({...appointmentData, email: e.target.value})}
                                            className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-teal-500 focus:ring-0 outline-none transition-all text-lg bg-gray-50 focus:bg-white"
                                            autoFocus
                                        />
                                    </div>
                                )}
                                {appointmentStep === 5 && (
                                    <div className="space-y-4 animate-fade-in">
                                        <h4 className="text-lg font-medium text-gray-800 mb-2">Your Phone Number</h4>
                                        <input 
                                            type="tel" 
                                            placeholder="+1 (555) 000-0000" 
                                            value={appointmentData.phone}
                                            onChange={e => setAppointmentData({...appointmentData, phone: e.target.value})}
                                            className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-teal-500 focus:ring-0 outline-none transition-all text-lg bg-gray-50 focus:bg-white"
                                            autoFocus
                                        />
                                    </div>
                                )}
                                {appointmentStep === 6 && (
                                    <div className="space-y-4 animate-fade-in h-full flex flex-col">
                                        <h4 className="text-lg font-medium text-gray-800 mb-2">Review & Confirm</h4>
                                        <div className="bg-gray-50 rounded-2xl p-6 space-y-5 flex-1 border border-gray-100">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                                                    <i className="fa-regular fa-calendar"></i>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Date & Time</p>
                                                    <p className="font-semibold text-gray-900">{appointmentData.date} at {appointmentData.time}</p>
                                                </div>
                                            </div>
                                            <div className="h-px bg-gray-200 w-full"></div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                                                    <i className="fa-regular fa-user"></i>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Your Details</p>
                                                    <p className="font-semibold text-gray-900">{appointmentData.name}</p>
                                                    <p className="text-sm text-gray-600 mt-0.5">{appointmentData.email}</p>
                                                    <p className="text-sm text-gray-600 mt-0.5">{appointmentData.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                            {appointmentStep > 1 ? (
                                <button 
                                    onClick={() => setAppointmentStep(s => s - 1)}
                                    className="px-6 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                                >
                                    Back
                                </button>
                            ) : <div></div>}
                            
                            {appointmentStep < 6 ? (
                                <button 
                                    onClick={() => setAppointmentStep(s => s + 1)}
                                    disabled={
                                        (appointmentStep === 1 && !appointmentData.date) ||
                                        (appointmentStep === 2 && !appointmentData.time) ||
                                        (appointmentStep === 3 && !appointmentData.name) ||
                                        (appointmentStep === 4 && !appointmentData.email) ||
                                        (appointmentStep === 5 && !appointmentData.phone)
                                    }
                                    className="px-8 py-3 rounded-xl font-semibold bg-teal-500 text-white hover:bg-teal-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                                >
                                    Next <i className="fa-solid fa-arrow-right text-sm"></i>
                                </button>
                            ) : (
                                <button 
                                    onClick={() => {
                                        alert('Appointment confirmed!');
                                        closeAppointmentModal();
                                    }}
                                    className="px-8 py-3 rounded-xl font-semibold bg-gray-900 text-white hover:bg-black transition-colors shadow-lg shadow-gray-900/20 flex items-center gap-2 cursor-pointer"
                                >
                                    Confirm Booking <i className="fa-solid fa-check text-sm"></i>
                                </button>
                            )}
                        </div>
                    </div>
                    <style>{`
                        @keyframes modalSlideUp {
                            from { opacity: 0; transform: translateY(20px) scale(0.98); }
                            to { opacity: 1; transform: translateY(0) scale(1); }
                        }
                        .animate-fade-in {
                            animation: fadeIn 0.3s ease-out forwards;
                        }
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateX(10px); }
                            to { opacity: 1; transform: translateX(0); }
                        }
                    `}</style>
                </div>
            )}
        </>
    );
}
