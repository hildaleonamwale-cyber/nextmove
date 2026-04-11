import React, { useState, useEffect } from 'react';
import { getProperties, promoteProperty } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface ListingsProps {
  currentRole: string;
  onAddProperty?: () => void;
}

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  image_url: string;
  status: string;
  views_count: number;
  is_promoted: boolean;
  promoted_until: string;
}

export default function Listings({ currentRole, onAddProperty }: ListingsProps) {
  const { user, profile } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      try {
        const props = await getProperties(user.id, profile?.role || 'basic');
        setProperties(props);
      } catch (error) {
        console.error('Failed to load properties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, profile?.role]);

  const handlePromote = async (propertyId: string) => {
    if (!user) return;
    const days = parseInt(window.prompt("How many days do you want to sponsor this post? ($1/day)") || "0");
    if (days > 0) {
      try {
        await promoteProperty(user.id, propertyId, days);
        // Reload properties
        const props = await getProperties(user.id, profile?.role || 'basic');
        setProperties(props);
        alert(`Successfully sponsored for ${days} days!`);
      } catch (error) {
        alert("Failed to promote property. " + (error as Error).message);
      }
    }
  };

  if (loading) {
    return (
      <div className="nm-view" style={{ display: 'block' }}>
        <p style={{ textAlign: 'center', color: '#9CA3AF', padding: '40px' }}>Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div className="nm-page-header-text">
          <h1>Property Portfolio</h1>
          <p>Manage, optimize, and track the performance of your real estate assets.</p>
        </div>
        <div className="nm-page-header-actions">
          <div className="nm-wallet-chip">
            <i className="fa-solid fa-wallet"></i>
            <span className="nm-wallet-label">Balance</span>
            <span className="nm-wallet-amount">${walletBalance}</span>
          </div>
          {onAddProperty && (
            <button className="nm-btn-primary" onClick={onAddProperty}>
              <i className="fa-solid fa-plus"></i> Add Property
            </button>
          )}
        </div>
      </div>

      <div className="nm-filter-slider-container">
        <div className="nm-filter-pills">
          <div className="nm-pill active"><i className="fa-solid fa-earth-africa"></i> All Properties</div>
          <div className="nm-pill"><i className="fa-solid fa-house"></i> Houses</div>
          <div className="nm-pill"><i className="fa-solid fa-vector-square"></i> Stands</div>
          <div className="nm-pill"><i className="fa-solid fa-building"></i> Commercial</div>
        </div>
      </div>

      <div className="nm-table-card">
        <table className="nm-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Price</th>
              <th>Views</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF' }}>
                  No properties yet. {onAddProperty && <a onClick={onAddProperty} style={{ cursor: 'pointer', color: '#1FE6D4', textDecoration: 'underline' }}>Create one</a>}
                </td>
              </tr>
            ) : (
              properties.map(property => (
                <tr key={property.id}>
                  <td data-label="Property">
                    <div className="nm-td-flex">
                      <div className="nm-thumb" style={{ backgroundImage: `url('${property.image_url || 'https://via.placeholder.com/60x40'}')` }}></div>
                      <div className="nm-info-text">
                        <strong>{property.title} {property.is_promoted && <span style={{ color: '#1FE6D4', fontSize: '12px', marginLeft: '5px' }}><i className="fa-solid fa-star"></i> Sponsored</span>}</strong>
                        <span>{property.location}</span>
                      </div>
                    </div>
                  </td>
                  <td data-label="Price"><strong>${property.price.toLocaleString()}</strong></td>
                  <td data-label="Views">{property.views_count.toLocaleString()}</td>
                  <td data-label="Status"><span className="nm-badge active">{property.status}</span></td>
                  <td data-label="Actions">
                    <div className="nm-actions">
                      <button className="nm-action-btn" style={{ width: 'auto', padding: '0 10px', background: '#1FE6D4', color: '#021211', fontWeight: 'bold', fontSize: '12px' }} onClick={() => handlePromote(property.id)}>
                        🚀 Promote
                      </button>
                      <button className="nm-action-btn"><i className="fa-regular fa-pen-to-square"></i></button>
                      <button className="nm-action-btn danger"><i className="fa-regular fa-trash-can"></i></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
