import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import { supabase } from './lib/supabase';

export default function SingleProperty({ onBack, propertyId }: { onBack: () => void, propertyId?: string }) {
    const { currentUser, properties } = useAppContext();
    const isFreePlan = currentUser?.role === 'basic';
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentLbIndex, setCurrentLbIndex] = useState(0);
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [appointmentStep, setAppointmentStep] = useState(1);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [appointmentData, setAppointmentData] = useState({
        date: '',
        time: '',
        name: '',
        email: '',
        phone: ''
    });

    const property = properties.find(p => p.id === propertyId);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'auto'; // Ensure overflow is auto when mounting
    }, []);

    if (!property) {
        return <div>Property not found</div>;
    }

    const lbImages = property.images && property.images.length > 0 ? property.images : ['https://via.placeholder.com/1200'];

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
        setTimeout(() => {
            setAppointmentStep(1);
            setBookingSuccess(false);
            setAppointmentData({ date: '', time: '', name: '', email: '', phone: '' });
        }, 300);
    };

    const submitAppointment = async () => {
        try {
            const { error } = await supabase.from('viewing_requests').insert({
                property_id: property.id,
                requester_name: appointmentData.name,
                requester_email: appointmentData.email,
                requested_date: new Date(`${appointmentData.date} ${appointmentData.time}`).toISOString(),
                status: 'pending'
            });

            if (error) throw error;
            setBookingSuccess(true);
        } catch (error) {
            console.error("Error submitting appointment:", error);
            alert("Failed to submit appointment. Please try again.");
        }
    };

    return (
        <>
            <div className="sp-wrapper">
                <div className="sp-content">
                    <button onClick={onBack} style={{ marginBottom: '20px', padding: '10px 20px', background: '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                        <i className="fa-solid fa-arrow-left"></i> Back
                    </button>
                    <div className="sp-gallery" id="dynGallery">
                        <div className="sp-main-img" style={{ backgroundImage: `url('${lbImages[currentLbIndex]}')` }} onClick={() => openLightbox(currentLbIndex)}>
                            <div className="sp-badges" id="dynTags">
                                {property.isSponsored && <div className="sp-badge featured"><i className="fa-solid fa-bolt"></i> Featured Listing</div>}
                                <div className="sp-badge type"><i className={`fa-solid ${property.status === 'available' ? 'fa-house-chimney' : 'fa-key'}`}></i> {property.status}</div>
                            </div>
                            <button className="sp-img-arrow left" onClick={(e) => { e.stopPropagation(); lbPrev(e); }}><i className="fa-solid fa-chevron-left"></i></button>
                            <button className="sp-img-arrow right" onClick={(e) => { e.stopPropagation(); lbNext(e); }}><i className="fa-solid fa-chevron-right"></i></button>
                        </div>
                        <div className="sp-thumbnails">
                            {lbImages.slice(0, 3).map((img, idx) => (
                                <div key={idx} className={`sp-thumb ${currentLbIndex === idx ? 'active' : ''}`} style={{ backgroundImage: `url('${img}')` }} onClick={() => setCurrentLbIndex(idx)}></div>
                            ))}
                            {lbImages.length > 3 && (
                                <div className="sp-thumb" style={{ background: 'var(--input-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)', fontWeight: 700, fontSize: '12px', border: '1px solid var(--border-color)' }} onClick={() => openLightbox(0)}>
                                    +{lbImages.length - 3} Photos
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="sp-price" id="dynPrice">
                        ${property.price?.toLocaleString()}
                    </div>
                    <h1 className="sp-title" id="dynTitle">{property.title}</h1>
                    <div className="sp-location"><i className="fa-solid fa-location-dot"></i> <span id="dynLocation">{property.category}</span></div>

                    <h2 className="sp-section-title">Property Description</h2>
                    <div className="sp-desc-box" id="dynDesc">
                        {property.description}
                    </div>

                    <h2 className="sp-section-title">Property Details</h2>
                    <div className="sp-grid" id="dynFullDetails">
                        <div className="sp-grid-box">
                            <div className="sp-grid-label">Size</div>
                            <div className="sp-grid-val"><i className="fa-solid fa-vector-square"></i> {property.size} {property.size_unit}</div>
                        </div>
                        <div className="sp-grid-box">
                            <div className="sp-grid-label">Bedrooms</div>
                            <div className="sp-grid-val"><i className="fa-solid fa-bed"></i> {property.bedrooms || 'N/A'}</div>
                        </div>
                        <div className="sp-grid-box">
                            <div className="sp-grid-label">Bathrooms</div>
                            <div className="sp-grid-val"><i className="fa-solid fa-bath"></i> {property.bathrooms || 'N/A'}</div>
                        </div>
                    </div>

                    {property.amenities && property.amenities.length > 0 && (
                        <>
                            <h2 className="sp-section-title">Amenities & Features</h2>
                            <div className="sp-amenities" id="dynAmenities">
                                {property.amenities.map((item: string, i: number) => (
                                    <div className="sp-amenity-pill" key={i}>{item}</div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="sp-sidebar">
                    <div className="sp-agent-card">
                        
                        <div className="sp-agent-card-body">
                            <div className="sp-agent-header">
                                <div className="sp-agent-avatar" style={{ backgroundImage: "url('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150')" }}></div>
                                <div className="sp-agent-info">
                                    <h4>Agent Name</h4>
                                    <p>Property Specialist</p>
                                    <div className="sp-pro-tag"><i className="fa-solid fa-circle-check"></i> <span id="agentRole">Verified Agent</span></div>
                                </div>
                            </div>

                            <p className="sp-agent-prompt">Interested in this listing? {isFreePlan ? 'Contact the agent directly for more information.' : 'Schedule an appointment or contact the agent directly for more information.'}</p>

                            {!isFreePlan && (
                                <button className="sp-btn sp-btn-brand" onClick={handleSchedule}><i className="fa-regular fa-calendar-check"></i> Schedule Appointment</button>
                            )}
                            <button className="sp-btn sp-btn-dark" onClick={handleWhatsApp}><i className="fa-brands fa-whatsapp" style={{ fontSize: '16px' }}></i> WhatsApp Agent</button>
                            <Link to="/profile" className="sp-btn sp-btn-outline" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}><i className="fa-regular fa-user"></i> {isFreePlan ? 'View All Listings' : 'View Profile'}</Link>

                            <div className="sp-meta" style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid var(--input-bg)' }}>
                                <div className="sp-meta-row"><span className="sp-meta-label">Response Time</span><span className="sp-meta-val">Usually within 1 hour</span></div>
                                <div className="sp-meta-row"><span className="sp-meta-label">Listing Ref</span><span className="sp-meta-val" id="dynRef">{property.id.substring(0, 8)}</span></div>
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

            {isAppointmentModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99999] flex items-center justify-center p-4" onClick={closeAppointmentModal}>
                    <div 
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col transform transition-all" 
                        onClick={e => e.stopPropagation()}
                        style={{ animation: 'modalSlideUp 0.3s ease-out forwards' }}
                    >
                        {/* Header */}
                        <div className="p-6 pb-5 border-b border-gray-100 flex justify-between items-center relative bg-gradient-to-r from-gray-50 to-white">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Schedule Appointment</h3>
                                {!bookingSuccess && <p className="text-sm text-gray-500 mt-1">Step {appointmentStep} of 6</p>}
                            </div>
                            <button onClick={closeAppointmentModal} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors cursor-pointer">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            {/* Progress Bar */}
                            {!bookingSuccess && (
                                <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full">
                                    <div className="h-full bg-teal-500 transition-all duration-500 ease-out" style={{ width: `${(appointmentStep / 6) * 100}%` }}></div>
                                </div>
                            )}
                        </div>

                        {/* Body */}
                        <div className="p-6 relative min-h-[340px] flex flex-col">
                            <div className="flex-1 flex flex-col justify-center transition-opacity duration-300">
                                {bookingSuccess ? (
                                    <div className="space-y-6 animate-fade-in h-full flex flex-col items-center justify-center text-center p-2">
                                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-2 shadow-lg shadow-green-100/50">
                                            <i className="fa-solid fa-check text-4xl"></i>
                                        </div>
                                        <h4 className="text-2xl font-bold text-gray-900">Booking Request Sent!</h4>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            An email link has been sent to <strong>{appointmentData.email}</strong> for you to verify your request.
                                        </p>
                                        <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mt-2 border border-blue-100 text-left flex items-start gap-3">
                                            <i className="fa-solid fa-circle-info mt-0.5 text-blue-500"></i>
                                            <span>After the agent confirms your appointment, you will receive another email with the summary details.</span>
                                        </div>
                                        <button 
                                            onClick={closeAppointmentModal}
                                            className="mt-4 px-8 py-3 rounded-xl font-semibold bg-gray-900 text-white hover:bg-black transition-colors shadow-lg shadow-gray-900/20 w-full"
                                        >
                                            Done
                                        </button>
                                    </div>
                                ) : appointmentStep === 1 ? (
                                    <div className="space-y-4 animate-fade-in">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Select a Date</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Today', 'Tomorrow', 'Wed, Oct 15', 'Thu, Oct 16', 'Fri, Oct 17', 'Sat, Oct 18'].map((d, i) => (
                                                <button 
                                                    key={i} 
                                                    onClick={() => setAppointmentData({...appointmentData, date: d})}
                                                    className={`p-4 rounded-2xl border-2 text-sm font-medium transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${appointmentData.date === d ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm' : 'border-gray-100 hover:border-teal-200 hover:bg-gray-50 text-gray-600'}`}
                                                >
                                                    <i className="fa-regular fa-calendar text-lg mb-1 opacity-70"></i>
                                                    {d}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : appointmentStep === 2 ? (
                                    <div className="space-y-4 animate-fade-in">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Select a Time</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'].map((t, i) => (
                                                <button 
                                                    key={i} 
                                                    onClick={() => setAppointmentData({...appointmentData, time: t})}
                                                    className={`p-4 rounded-2xl border-2 text-sm font-medium transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${appointmentData.time === t ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm' : 'border-gray-100 hover:border-teal-200 hover:bg-gray-50 text-gray-600'}`}
                                                >
                                                    <i className="fa-regular fa-clock text-lg mb-1 opacity-70"></i>
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : appointmentStep === 3 ? (
                                    <div className="space-y-4 animate-fade-in">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Your Full Name</h4>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                <i className="fa-regular fa-user"></i>
                                            </div>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Jane Doe" 
                                                value={appointmentData.name}
                                                onChange={e => setAppointmentData({...appointmentData, name: e.target.value})}
                                                className="w-full pl-11 p-4 rounded-2xl border-2 border-gray-100 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-lg bg-gray-50 focus:bg-white"
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                ) : appointmentStep === 4 ? (
                                    <div className="space-y-4 animate-fade-in">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Your Email</h4>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                <i className="fa-regular fa-envelope"></i>
                                            </div>
                                            <input 
                                                type="email" 
                                                placeholder="jane@example.com" 
                                                value={appointmentData.email}
                                                onChange={e => setAppointmentData({...appointmentData, email: e.target.value})}
                                                className="w-full pl-11 p-4 rounded-2xl border-2 border-gray-100 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-lg bg-gray-50 focus:bg-white"
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                ) : appointmentStep === 5 ? (
                                    <div className="space-y-4 animate-fade-in">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Your Phone Number</h4>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                <i className="fa-solid fa-phone"></i>
                                            </div>
                                            <input 
                                                type="tel" 
                                                placeholder="+1 (555) 000-0000" 
                                                value={appointmentData.phone}
                                                onChange={e => setAppointmentData({...appointmentData, phone: e.target.value})}
                                                className="w-full pl-11 p-4 rounded-2xl border-2 border-gray-100 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-lg bg-gray-50 focus:bg-white"
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                ) : appointmentStep === 6 ? (
                                    <div className="space-y-4 animate-fade-in h-full flex flex-col">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Review & Confirm</h4>
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 space-y-5 flex-1 border border-gray-200 shadow-inner">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-teal-600 shrink-0 border border-teal-100">
                                                    <i className="fa-regular fa-calendar-check text-xl"></i>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Date & Time</p>
                                                    <p className="font-semibold text-gray-900 text-lg">{appointmentData.date}</p>
                                                    <p className="text-teal-600 font-medium">{appointmentData.time}</p>
                                                </div>
                                            </div>
                                            <div className="h-px bg-gray-200 w-full"></div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-teal-600 shrink-0 border border-teal-100">
                                                    <i className="fa-regular fa-address-card text-xl"></i>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Your Details</p>
                                                    <p className="font-semibold text-gray-900">{appointmentData.name}</p>
                                                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-2"><i className="fa-regular fa-envelope opacity-50"></i> {appointmentData.email}</p>
                                                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-2"><i className="fa-solid fa-phone opacity-50"></i> {appointmentData.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        {/* Footer */}
                        {!bookingSuccess && (
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
                                        onClick={submitAppointment}
                                        className="px-8 py-3 rounded-xl font-semibold bg-gray-900 text-white hover:bg-black transition-colors shadow-lg shadow-gray-900/20 flex items-center gap-2 cursor-pointer"
                                    >
                                        Confirm Booking <i className="fa-solid fa-check text-sm"></i>
                                    </button>
                                )}
                            </div>
                        )}
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
