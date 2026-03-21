import React from 'react';

interface CompanyProfileProps {
  currentRole: string;
}

export default function CompanyProfile({ currentRole }: CompanyProfileProps) {
  const isPro = currentRole === 'pro';
  const headerText = isPro ? "Profile Editor" : "Company Profile Editor";
  const descText = isPro ? "Customize how you appear to potential clients." : "Customize how your agency appears to potential clients.";

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div>
          <h1>{headerText}</h1>
          <p>{descText}</p>
        </div>
        <button className="nm-btn-save"><i className="fa-solid fa-floppy-disk"></i> Save Changes</button>
      </div>

      <div className="nm-editor-grid">
        <div className="nm-card">
          <h3 style={{ fontFamily: 'Poppins', fontSize: '16px', margin: '0 0 20px 0', color: 'var(--dark)' }}>Brand Images</h3>
          <div className="nm-form-group" style={{ marginBottom: '25px' }}>
            <label className="nm-form-label" style={{ textAlign: 'center' }}>Logo (Active Story)</label>
            <div className="nm-avatar-upload"></div>
          </div>
          <div className="nm-form-group">
            <label className="nm-form-label">Profile Banner</label>
            <div className="nm-upload-zone" style={{ padding: '20px' }}>
              <i className="fa-regular fa-image" style={{ fontSize: '24px', marginBottom: '5px' }}></i>
              <p style={{ fontSize: '13px' }}>Upload Banner</p>
              <span style={{ fontSize: '11px' }}>1200 x 400px</span>
            </div>
          </div>
        </div>

        <div className="nm-card">
          <h3 style={{ fontFamily: 'Poppins', fontSize: '16px', margin: '0 0 20px 0', color: 'var(--dark)' }}>Basic Information</h3>
          <div className="nm-form-grid">
            <div className="nm-form-group full">
              <label className="nm-form-label">Company Name</label>
              <input type="text" className="nm-form-input" defaultValue="Willow & Elm" />
            </div>
            <div className="nm-form-group">
              <label className="nm-form-label">Handle</label>
              <input type="text" className="nm-form-input" defaultValue="@WILLOWELM" />
            </div>
            
            <div className="nm-form-group">
              <label className="nm-form-label">Tagline / Type</label>
              <select className="nm-form-input" style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=%22%236B7280%22 height=%2224%22 viewBox=%220 0 24 24%22 width=%2224%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M7 10l5 5 5-5z%22/></svg>")', backgroundRepeat: 'no-repeat', backgroundPositionX: '95%', backgroundPositionY: 'center' }} defaultValue="agency">
                <option value="agency">Agency</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            <div className="nm-form-group">
              <label className="nm-form-label">Location</label>
              <input type="text" className="nm-form-input" defaultValue="Harare, Zimbabwe" />
            </div>
            <div className="nm-form-group">
              <label className="nm-form-label">Phone / WhatsApp</label>
              <input type="tel" className="nm-form-input" defaultValue="+263 77 000 0000" />
            </div>
            <div className="nm-form-group">
              <label className="nm-form-label">Public Email</label>
              <input type="email" className="nm-form-input" defaultValue="hello@willowelm.co.zw" />
            </div>
            
            <div className="nm-form-group full">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="nm-form-label">Short Bio</label>
                <span style={{ fontSize: '11px', color: 'var(--gray-text)' }}>Max 250 chars</span>
              </div>
              <textarea className="nm-form-textarea" maxLength={250} style={{ minHeight: '100px' }} defaultValue="Premium residential stands and luxury plots across Harare's most prestigious neighborhoods. Trusted by hundreds of families to find their dream home."></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="nm-card" style={{ marginBottom: '25px' }}>
        <h3 style={{ fontFamily: 'Poppins', fontSize: '16px', margin: '0 0 5px 0', color: 'var(--dark)' }}>History & Info</h3>
        <p style={{ fontSize: '13px', color: 'var(--gray-text)', margin: '0 0 20px 0' }}>This content appears on the "Info" tab of your public profile page.</p>
        <div className="nm-form-group full">
          <textarea className="nm-form-textarea" style={{ minHeight: '150px' }} defaultValue="Founded in 2018, Willow & Elm has grown to become one of the most trusted boutique real estate agencies in Harare. We specialize in premium residential properties, high-yield commercial spaces, and investment-grade land acquisitions."></textarea>
        </div>
      </div>

      <div className="nm-editor-bottom-grid">
        <div className="nm-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'Poppins', fontSize: '16px', margin: '0', color: 'var(--dark)' }}>Story Slides</h3>
          </div>
          <div className="nm-story-manager">
            <div className="nm-story-add">
              <i className="fa-solid fa-plus" style={{ fontSize: '20px', marginBottom: '5px' }}></i>
              <span style={{ fontSize: '10px', fontWeight: '600' }}>Add Slide</span>
            </div>
            <div className="nm-story-slide" style={{ backgroundImage: "url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300')" }}></div>
            <div className="nm-story-slide" style={{ backgroundImage: "url('https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=300')" }}></div>
          </div>
        </div>

        <div className="nm-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'Poppins', fontSize: '16px', margin: '0', color: 'var(--dark)' }}>Latest Updates</h3>
            <button className="nm-btn-outline"><i className="fa-solid fa-pen-to-square" style={{ marginRight: '5px' }}></i> New Post</button>
          </div>
          <div className="nm-update-list-item">
            <div className="nm-update-list-info">
              <div className="nm-update-thumb" style={{ backgroundImage: "url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=150')" }}></div>
              <div className="nm-update-text">
                <h4>Phase 2 of Borrowdale East is here!</h4>
                <p>Posted Mar 15, 2026</p>
              </div>
            </div>
            <button className="nm-action-btn danger"><i className="fa-regular fa-trash-can"></i></button>
          </div>
          <div className="nm-update-list-item">
            <div className="nm-update-list-info">
              <div className="nm-update-thumb" style={{ backgroundImage: "url('https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=150')" }}></div>
              <div className="nm-update-text">
                <h4>Awarded Top Agency of the Month</h4>
                <p>Posted Feb 28, 2026</p>
              </div>
            </div>
            <button className="nm-action-btn danger"><i className="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}
