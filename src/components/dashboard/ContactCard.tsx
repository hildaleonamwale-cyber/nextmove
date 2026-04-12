import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAppContext } from '../../context/AppContext';

export default function ContactCard() {
  const { currentUser, setCurrentUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    avatar_url: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        first_name: currentUser.first_name || '',
        last_name: currentUser.last_name || '',
        phone: currentUser.phone || '',
        avatar_url: currentUser.avatar_url || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        avatar_url: formData.avatar_url
      };

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', currentUser.id);

      if (error) throw error;
      
      setCurrentUser({ ...currentUser, ...updates });
      alert("Profile updated successfully!");
    } catch (error: any) {
      alert("Error updating profile: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setFormData(prev => ({ ...prev, avatar_url: url }));
    }
  };

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div>
          <h1>Contact Card</h1>
          <p>This information appears on your property listings.</p>
        </div>
        <button className="nm-btn-save" onClick={handleSave} disabled={isLoading}>
          {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-floppy-disk"></i>}
          {isLoading ? ' Saving...' : ' Save Profile'}
        </button>
      </div>
      <div className="nm-card" style={{ maxWidth: '600px' }}>
        <div className="nm-form-grid">
          <div className="nm-form-group full" style={{ alignItems: 'center', textAlign: 'center', paddingBottom: '25px', borderBottom: '1px solid var(--border-color)', marginBottom: '15px' }}>
            <div className="nm-avatar" style={{ width: '110px', height: '110px', backgroundImage: `url(${formData.avatar_url || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'})`, marginBottom: '15px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <button className="nm-action-btn" style={{ width: 'auto', padding: '0 15px' }} onClick={() => document.getElementById('contactAvatarUpload')?.click()}>
              <i className="fa-solid fa-camera" style={{ marginRight: '5px' }}></i> Change Photo
            </button>
            <input type="file" id="contactAvatarUpload" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
          </div>
          <div className="nm-form-group">
            <label className="nm-form-label">First Name</label>
            <input type="text" name="first_name" className="nm-form-input" value={formData.first_name} onChange={handleChange} />
          </div>
          <div className="nm-form-group">
            <label className="nm-form-label">Last Name</label>
            <input type="text" name="last_name" className="nm-form-input" value={formData.last_name} onChange={handleChange} />
          </div>
          <div className="nm-form-group full">
            <label className="nm-form-label">WhatsApp Number</label>
            <input type="tel" name="phone" className="nm-form-input" value={formData.phone} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
