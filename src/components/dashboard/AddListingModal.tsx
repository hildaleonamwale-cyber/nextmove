import React, { useState, useEffect } from 'react';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddListingModal({ isOpen, onClose }: AddListingModalProps) {
  const [category, setCategory] = useState('');
  const [subtype, setSubtype] = useState('');
  const [availability, setAvailability] = useState('now');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const subtypesMap: Record<string, string[]> = {
    residential: ['Full house', 'Apartment', 'Cottage', 'Room', 'Cluster house / townhouse'],
    stand: ['Residential stand', 'Commercial stand', 'Agricultural land', 'Industrial land'],
    commercial: ['Office', 'Shop / retail', 'Warehouse', 'Industrial property', 'Salon / studio space', 'Restaurant / hospitality space']
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className={`we-listing-page ${isOpen ? 'active' : ''}`} id="addListingPage">
      <div className="we-listing-header">
        <h2>Create New Listing</h2>
        <button className="we-listing-close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
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
            <select className="we-form-select" value={category} onChange={(e) => { setCategory(e.target.value); setSubtype(''); }}>
              <option value="">Select Category...</option>
              <option value="residential">Residential</option>
              <option value="stand">Stands / Land</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div className="we-form-group">
            <label className="we-form-label">Subtype</label>
            <select className="we-form-select" value={subtype} onChange={(e) => setSubtype(e.target.value)} disabled={!category}>
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
            <select className="we-form-select" value={availability} onChange={(e) => setAvailability(e.target.value)}>
              <option value="now">Available Now</option>
              <option value="date">Specific Date...</option>
            </select>
          </div>

          {availability === 'date' && (
            <div className="we-form-group dynamic-section active" style={{ display: 'flex' }}>
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
            <div 
              className="we-image-upload" 
              onClick={() => document.getElementById('imageUpload')?.click()}
              style={{ cursor: 'pointer' }}
            >
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <p>Click to upload or drag & drop property images here</p>
              <span>Supports JPG, PNG (Max 5MB each)</span>
              <input 
                type="file" 
                id="imageUpload" 
                multiple 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={(e) => {
                  if (e.target.files) {
                    const filesArray = Array.from(e.target.files);
                    setSelectedImages(prev => [...prev, ...filesArray]);
                    const newUrls = filesArray.map(file => URL.createObjectURL(file));
                    setImagePreviewUrls(prev => [...prev, ...newUrls]);
                  }
                }}
              />
            </div>
            
            {imagePreviewUrls.length > 0 && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                    <img src={url} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
                        setSelectedImages(prev => prev.filter((_, i) => i !== index));
                      }}
                      style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', fontSize: '14px' }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {category === 'residential' && (
            <div className="we-form-group full dynamic-section active" style={{ display: 'flex' }}>
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
                <div className="we-form-grid dynamic-section active" style={{ marginTop: '20px', display: 'grid' }}>
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
                <div className="we-form-grid dynamic-section active" style={{ marginTop: '20px', display: 'grid' }}>
                  <div className="we-form-group"><label className="we-form-label">Floor Level</label><input type="text" className="we-form-input" placeholder="e.g. 3rd Floor" /></div>
                  <div className="we-form-group"><label className="we-form-label">Complex Name</label><input type="text" className="we-form-input" /></div>
                  <div className="we-form-group"><label className="we-form-label">Levy ($)</label><input type="number" className="we-form-input" placeholder="0.00" /></div>
                </div>
              )}

              {subtype === 'Cottage' && (
                <div className="we-form-grid dynamic-section active" style={{ marginTop: '20px', display: 'grid' }}>
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
            <div className="we-form-group full dynamic-section active" style={{ display: 'flex' }}>
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
            <div className="we-form-group full dynamic-section active" style={{ display: 'flex' }}>
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
                <div className="we-form-grid dynamic-section active" style={{ marginTop: '20px', display: 'grid' }}>
                  <div className="we-form-group"><label className="we-form-label">No. of Offices</label><input type="number" className="we-form-input" /></div>
                  <div className="we-form-group"><label className="we-form-label">Boardrooms</label><input type="number" className="we-form-input" /></div>
                  <div className="we-form-group full"><label className="we-form-label">Reception Area?</label>
                    <select className="we-form-select"><option>Yes</option><option>No</option></select>
                  </div>
                </div>
              )}

              {subtype === 'Shop / retail' && (
                <div className="we-form-grid dynamic-section active" style={{ marginTop: '20px', display: 'grid' }}>
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
                <div className="we-form-grid dynamic-section active" style={{ marginTop: '20px', display: 'grid' }}>
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
            <div className="we-form-group full dynamic-section active" style={{ display: 'flex' }}>
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
            <div className="we-form-group full dynamic-section active" style={{ display: 'flex' }}>
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
            <div className="we-form-group full dynamic-section active" style={{ display: 'flex' }}>
              <div className="we-form-section-title"><i className="fa-solid fa-map-location-dot"></i> Section 4: Location & Legal</div>
              <div className="we-form-grid">
                <div className="we-form-group"><label className="we-form-label">City</label><input type="text" className="we-form-input" placeholder="e.g. Harare" /></div>
                <div className="we-form-group"><label className="we-form-label">Area / Suburb</label><input type="text" className="we-form-input" placeholder="e.g. Borrowdale" /></div>
                <div className="we-form-group full"><label className="we-form-label">Full Address / Street</label><input type="text" className="we-form-input" placeholder="Street name and number" /></div>
              </div>
            </div>
          )}

          {category === 'stand' && (
            <div className="we-form-group full dynamic-section active" style={{ display: 'flex' }}>
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

        <div style={{ paddingTop: '20px' }}>
          <button className="we-submit-listing">Publish Listing</button>
        </div>
      </div>
    </div>
  );
}
