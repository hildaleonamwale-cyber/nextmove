import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SingleProperty from '../SingleProperty';

export default function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isPropertyPageOpen, setIsPropertyPageOpen] = useState(false);
    const [selectedPropertyType, setSelectedPropertyType] = useState('residential');
    
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q') || '';
    const searchCategory = queryParams.get('category') || 'all';
    const searchStatus = queryParams.get('status') || 'all';
    const searchMinPrice = queryParams.get('minPrice') || '';
    const searchMaxPrice = queryParams.get('maxPrice') || '';
    const searchBeds = queryParams.get('beds') || 'all';

    useEffect(() => {
        const cards = document.querySelectorAll('.we-card');
        cards.forEach((card: any) => {
            const text = card.innerText.toLowerCase();
            let isMatch = true;

            if (searchQuery && !text.includes(searchQuery.toLowerCase())) {
                isMatch = false;
            }

            if (searchCategory !== 'all') {
                if (searchCategory === 'residential' && !text.includes('bed')) isMatch = false;
                if (searchCategory === 'commercial' && !text.includes('office') && !text.includes('retail')) isMatch = false;
                if (searchCategory === 'stand' && !text.includes('stand')) isMatch = false;
            }

            if (searchStatus !== 'all') {
                if (searchStatus === 'sale' && !text.includes('for sale')) isMatch = false;
                if (searchStatus === 'rent' && !text.includes('for rent') && !text.includes('for lease')) isMatch = false;
            }

            if (searchBeds !== 'all') {
                if (!text.includes(`${searchBeds} bed`)) isMatch = false;
            }

            if (searchMinPrice || searchMaxPrice) {
                const priceMatch = text.match(/\$([\d,]+)/);
                if (priceMatch) {
                    const price = parseInt(priceMatch[1].replace(/,/g, ''), 10);
                    if (searchMinPrice && price < parseInt(searchMinPrice, 10)) isMatch = false;
                    if (searchMaxPrice && price > parseInt(searchMaxPrice, 10)) isMatch = false;
                }
            }

            if (isMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }, [searchQuery, searchCategory, searchStatus, searchMinPrice, searchMaxPrice, searchBeds]);

    if (isPropertyPageOpen) {
        return <SingleProperty onBack={() => setIsPropertyPageOpen(false)} propertyType={selectedPropertyType} />;
    }

    return (
        <div className="we-wrapper">
            <header className="we-header">
                <div className="we-logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
                    <div className="we-logo-icon"></div>
                    nextmove.
                </div>
                <div className="we-nav">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
                    <a href="#">Buy</a>
                    <a href="#">Rent</a>
                    <a href="#">Commercial</a>
                    <a href="#">Agents</a>
                </div>
                <div className="we-header-actions">
                    <button className="we-btn-outline" onClick={() => navigate('/login')}>Sign In</button>
                    <button className="we-btn-primary">List Property</button>
                </div>
            </header>

            <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#f9fafb' }}>
                <div className="we-full-bleed-container" style={{ padding: '40px 20px' }}>
                    <div style={{ marginBottom: '30px' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#111827' }}>Search Results</h1>
                        <p style={{ color: '#6b7280', marginTop: '10px' }}>
                            Showing results for {searchQuery ? `"${searchQuery}"` : 'all properties'}
                        </p>
                    </div>

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
                                <div className="we-location"><i className="fa-solid fa-location-dot"></i> CBD</div>
                                <div className="we-icons-row">
                                    <div className="we-icon-item"><i className="fa-solid fa-building"></i> Office</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 150 m²</div>
                                </div>
                            </div>
                        </div>

                        <div className="we-card" onClick={() => { setSelectedPropertyType('room'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                            <div className="we-img" style={{backgroundImage: "url('https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800')"}}>
                                <span className="we-tag">FOR RENT</span>
                            </div>
                            <div className="we-body">
                                <div className="we-price">$250/mo</div>
                                <div className="we-title">Spacious Room Avondale</div>
                                <div className="we-location"><i className="fa-solid fa-location-dot"></i> Avondale</div>
                                <div className="we-icons-row">
                                    <div className="we-icon-item"><i className="fa-solid fa-bed"></i> 1 Bed</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-bath"></i> Shared</div>
                                </div>
                            </div>
                        </div>

                        <div className="we-card" onClick={() => { setSelectedPropertyType('commercial'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                            <div className="we-img" style={{backgroundImage: "url('https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800')"}}>
                                <span className="we-tag">FOR LEASE</span>
                            </div>
                            <div className="we-body">
                                <div className="we-price">$1,200/mo</div>
                                <div className="we-title">Highlands Retail Space</div>
                                <div className="we-location"><i className="fa-solid fa-location-dot"></i> Highlands</div>
                                <div className="we-icons-row">
                                    <div className="we-icon-item"><i className="fa-solid fa-shop"></i> Retail</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 80 m²</div>
                                </div>
                            </div>
                        </div>

                        <div className="we-card" onClick={() => { setSelectedPropertyType('residential'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                            <div className="we-img" style={{backgroundImage: "url('https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800')"}}>
                                <span className="we-tag">FOR SALE</span>
                            </div>
                            <div className="we-body">
                                <div className="we-price">$320,000</div>
                                <div className="we-title">Willow Terrace</div>
                                <div className="we-location"><i className="fa-solid fa-location-dot"></i> Mount Pleasant</div>
                                <div className="we-icons-row">
                                    <div className="we-icon-item"><i className="fa-solid fa-bed"></i> 4 Bed</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-bath"></i> 3 Bath</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 180 m²</div>
                                </div>
                            </div>
                        </div>

                        <div className="we-card featured" onClick={() => { setSelectedPropertyType('stand'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                            <div className="we-img" style={{backgroundImage: "url('https://i.pinimg.com/736x/98/04/69/980469f630d50176a5ac8c663437e632.jpg')"}}>
                                <span className="we-tag">FOR SALE</span>
                                <span className="we-featured-tag"><i className="fa-solid fa-bolt"></i> Featured</span>
                            </div>
                            <div className="we-body">
                                <div className="we-price">$180,000</div>
                                <div className="we-title">Borrowdale East Phase 2</div>
                                <div className="we-location"><i className="fa-solid fa-location-dot"></i> Borrowdale</div>
                                <div className="we-icons-row">
                                    <div className="we-icon-item"><i className="fa-solid fa-earth-africa"></i> Stand</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 2500 m²</div>
                                </div>
                            </div>
                        </div>

                        <div className="we-card" onClick={() => { setSelectedPropertyType('stand'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                            <div className="we-img" style={{backgroundImage: "url('https://i.pinimg.com/736x/53/0f/1a/530f1ade4b644c91dfed9d53a072b905.jpg')"}}>
                                <span className="we-tag">FOR SALE</span>
                            </div>
                            <div className="we-body">
                                <div className="we-price">$120,000</div>
                                <div className="we-title">Glen Lorne Extension</div>
                                <div className="we-location"><i className="fa-solid fa-location-dot"></i> Glen Lorne</div>
                                <div className="we-icons-row">
                                    <div className="we-icon-item"><i className="fa-solid fa-earth-africa"></i> Stand</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 1800 m²</div>
                                </div>
                            </div>
                        </div>

                        <div className="we-card" onClick={() => { setSelectedPropertyType('stand'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                            <div className="we-img" style={{backgroundImage: "url('https://i.pinimg.com/736x/c5/4d/9d/c54d9d10e141a5474d284f183c50f443.jpg')"}}>
                                <span className="we-tag">FOR SALE</span>
                            </div>
                            <div className="we-body">
                                <div className="we-price">$450,000</div>
                                <div className="we-title">Highlands Luxury Estate</div>
                                <div className="we-location"><i className="fa-solid fa-location-dot"></i> Highlands</div>
                                <div className="we-icons-row">
                                    <div className="we-icon-item"><i className="fa-solid fa-earth-africa"></i> Stand</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 4000 m²</div>
                                </div>
                            </div>
                        </div>

                        <div className="we-card" onClick={() => { setSelectedPropertyType('stand'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                            <div className="we-img" style={{backgroundImage: "url('https://i.pinimg.com/736x/8b/f5/66/8bf56616053f4d6d6a50672e8c201d4a.jpg')"}}>
                                <span className="we-tag">FOR SALE</span>
                            </div>
                            <div className="we-body">
                                <div className="we-price">$65,000</div>
                                <div className="we-title">Mabelreign Garden Plot</div>
                                <div className="we-location"><i className="fa-solid fa-location-dot"></i> Mabelreign</div>
                                <div className="we-icons-row">
                                    <div className="we-icon-item"><i className="fa-solid fa-earth-africa"></i> Stand</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 1000 m²</div>
                                </div>
                            </div>
                        </div>

                        <div className="we-card sold" onClick={() => { setSelectedPropertyType('residential'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                            <div className="we-img" style={{backgroundImage: "url('https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800')"}}>
                                <span className="we-tag">SOLD</span>
                            </div>
                            <div className="we-body">
                                <div className="we-price">$1,100,000</div>
                                <div className="we-title">The Azure Villa</div>
                                <div className="we-location"><i className="fa-solid fa-location-dot"></i> Glen Lorne</div>
                                <div className="we-icons-row">
                                    <div className="we-icon-item"><i className="fa-solid fa-bed"></i> 5 Bed</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-bath"></i> 4 Bath</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 500 m²</div>
                                </div>
                            </div>
                        </div>

                        <div className="we-card sold" onClick={() => { setSelectedPropertyType('residential'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                            <div className="we-img" style={{backgroundImage: "url('https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=800')"}}>
                                <span className="we-tag">SOLD</span>
                            </div>
                            <div className="we-body">
                                <div className="we-price">$420,000</div>
                                <div className="we-title">Modern Terrace</div>
                                <div className="we-location"><i className="fa-solid fa-location-dot"></i> Avondale</div>
                                <div className="we-icons-row">
                                    <div className="we-icon-item"><i className="fa-solid fa-bed"></i> 3 Bed</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-bath"></i> 2 Bath</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 180 m²</div>
                                </div>
                            </div>
                        </div>

                        <div className="we-card sold" onClick={() => { setSelectedPropertyType('residential'); setIsPropertyPageOpen(true); }} style={{cursor: 'pointer'}}>
                            <div className="we-img" style={{backgroundImage: "url('https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800')"}}>
                                <span className="we-tag">SOLD</span>
                            </div>
                            <div className="we-body">
                                <div className="we-price">$890,000</div>
                                <div className="we-title">Highlands Manor</div>
                                <div className="we-location"><i className="fa-solid fa-location-dot"></i> Highlands</div>
                                <div className="we-icons-row">
                                    <div className="we-icon-item"><i className="fa-solid fa-bed"></i> 4 Bed</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-bath"></i> 3 Bath</div>
                                    <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> 350 m²</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
