import React from 'react';

export default function ContactCard() {
  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div>
          <h1>Contact Card</h1>
          <p>This information appears on your property listings.</p>
        </div>
        <button className="nm-btn-save"><i className="fa-solid fa-floppy-disk"></i> Save Profile</button>
      </div>
      <div className="nm-card" style={{ maxWidth: '600px' }}>
        <div className="nm-form-grid">
          <div className="nm-form-group full" style={{ alignItems: 'center', textAlign: 'center', paddingBottom: '25px', borderBottom: '1px solid var(--border-color)', marginBottom: '15px' }}>
            <div className="nm-avatar" style={{ width: '110px', height: '110px', backgroundImage: "url('https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150')", marginBottom: '15px' }}></div>
            <button className="nm-action-btn" style={{ width: 'auto', padding: '0 15px' }}><i className="fa-solid fa-camera" style={{ marginRight: '5px' }}></i> Change Photo</button>
          </div>
          <div className="nm-form-group full">
            <label className="nm-form-label">Full Name</label>
            <input type="text" className="nm-form-input" defaultValue="Mike Ross" />
          </div>
          <div className="nm-form-group">
            <label className="nm-form-label">WhatsApp Number</label>
            <input type="tel" className="nm-form-input" defaultValue="+263 71 000 0000" />
          </div>
          <div className="nm-form-group">
            <label className="nm-form-label">Direct Line</label>
            <input type="tel" className="nm-form-input" defaultValue="+263 71 000 0000" />
          </div>
        </div>
      </div>
    </div>
  );
}
