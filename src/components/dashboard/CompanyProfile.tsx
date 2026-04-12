import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAppContext } from '../../context/AppContext';

interface CompanyProfileProps {
  currentRole: string;
}

export default function CompanyProfile({ currentRole }: CompanyProfileProps) {
  const { currentUser, setCurrentUser } = useAppContext();
  const isPro = currentRole === 'premium';
  const headerText = isPro ? "Profile Editor" : "Company Profile Editor";
  const descText = isPro ? "Customize how you appear to potential clients." : "Customize how your agency appears to potential clients.";

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    about: '',
    avatar_url: '',
    cover_url: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        first_name: currentUser.first_name || '',
        last_name: currentUser.last_name || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        about: currentUser.about || '',
        avatar_url: currentUser.avatar_url || '',
        cover_url: currentUser.cover_url || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const updates = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        address: formData.address,
        about: formData.about,
        avatar_url: formData.avatar_url,
        cover_url: formData.cover_url
      };

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', currentUser.id);

      if (error) throw error;
      
      // Update local context
      setCurrentUser({ ...currentUser, ...updates });
      
      alert("Profile updated successfully!");
    } catch (error: any) {
      alert("Error updating profile: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'avatar_url' | 'cover_url') => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setFormData(prev => ({ ...prev, [field]: url }));
    }
  };

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div>
          <h1>{headerText}</h1>
          <p>{descText}</p>
        </div>
        <button className="nm-btn-save" onClick={handleSave} disabled={isLoading}>
          {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-floppy-disk"></i>}
          {isLoading ? ' Saving...' : ' Save Changes'}
        </button>
      </div>

      <div className="nm-editor-grid">
        <div className="nm-card">
          <h3 style={{ fontFamily: 'Poppins', fontSize: '16px', margin: '0 0 20px 0', color: 'var(--dark)' }}>Brand Images</h3>
          <div className="nm-form-group" style={{ marginBottom: '25px' }}>
            <label className="nm-form-label" style={{ textAlign: 'center' }}>Logo / Profile Picture</label>
            <div 
              className="nm-avatar-upload" 
              style={{ backgroundImage: `url(${formData.avatar_url})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer' }}
              onClick={() => document.getElementById('profileAvatarUpload')?.click()}
            >
              {!formData.avatar_url && <i className="fa-solid fa-camera" style={{ fontSize: '24px', color: '#9ca3af' }}></i>}
            </div>
            <input type="file" id="profileAvatarUpload" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, 'avatar_url')} />
          </div>
          <div className="nm-form-group">
            <label className="nm-form-label">Profile Banner</label>
            <div 
              className="nm-upload-zone" 
              style={{ padding: '20px', backgroundImage: `url(${formData.cover_url})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer', position: 'relative' }}
              onClick={() => document.getElementById('profileCoverUpload')?.click()}
            >
              {!formData.cover_url && (
                <>
                  <i className="fa-regular fa-image" style={{ fontSize: '24px', marginBottom: '5px' }}></i>
                  <p style={{ fontSize: '13px' }}>Upload Banner</p>
                  <span style={{ fontSize: '11px' }}>1200 x 400px</span>
                </>
              )}
            </div>
            <input type="file" id="profileCoverUpload" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, 'cover_url')} />
          </div>
        </div>

        <div className="nm-card">
          <h3 style={{ fontFamily: 'Poppins', fontSize: '16px', margin: '0 0 20px 0', color: 'var(--dark)' }}>Basic Information</h3>
          <div className="nm-form-grid">
            <div className="nm-form-group">
              <label className="nm-form-label">First Name</label>
              <input type="text" name="first_name" className="nm-form-input" value={formData.first_name} onChange={handleChange} />
            </div>
            <div className="nm-form-group">
              <label className="nm-form-label">Last Name</label>
              <input type="text" name="last_name" className="nm-form-input" value={formData.last_name} onChange={handleChange} />
            </div>
            
            <div className="nm-form-group full">
              <label className="nm-form-label">Location / Address</label>
              <input type="text" name="address" className="nm-form-input" value={formData.address} onChange={handleChange} />
            </div>
            <div className="nm-form-group">
              <label className="nm-form-label">Phone / WhatsApp</label>
              <input type="tel" name="phone" className="nm-form-input" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="nm-form-group">
              <label className="nm-form-label">Public Email</label>
              <input type="email" className="nm-form-input" value={currentUser?.email || ''} disabled />
            </div>
            
            <div className="nm-form-group full">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="nm-form-label">Short Bio / About</label>
                <span style={{ fontSize: '11px', color: 'var(--gray-text)' }}>Max 500 chars</span>
              </div>
              <textarea name="about" className="nm-form-textarea" maxLength={500} style={{ minHeight: '100px' }} value={formData.about} onChange={handleChange}></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
