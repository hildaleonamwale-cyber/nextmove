import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

interface ListingsProps {
  currentRole: string;
  onAddProperty?: () => void;
}

export default function Listings({ currentRole, onAddProperty }: ListingsProps) {
  const { properties, currentUser, updateProperty, updateUser } = useAppContext();
  const [promoteDays, setPromoteDays] = useState<number>(0);
  const [promotePropertyId, setPromotePropertyId] = useState<string | null>(null);

  const pageTitle = currentRole === 'admin' ? 'Company Portfolio' : 
                    currentRole === 'premium' ? 'My Portfolio' : 
                    currentRole === 'worker' ? 'My Portfolio' : 'My Properties';

  const handlePromote = (propertyId: string) => {
    const days = parseInt(window.prompt("How many days do you want to sponsor this post? ($1/day)") || "0");
    if (days > 0) {
      if (currentUser && currentUser.walletBalance >= days) {
        updateUser(currentUser.id, { walletBalance: currentUser.walletBalance - days });
        updateProperty(propertyId, { isSponsored: true, sponsorDaysLeft: days });
        alert(`Successfully sponsored for ${days} days!`);
      } else {
        alert("Insufficient funds. Please contact support to top up.");
      }
    }
  };

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
            <span className="nm-wallet-amount">${currentUser?.walletBalance || 0}</span>
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
            {properties.map(property => (
              <tr key={property.id}>
                <td data-label="Property">
                  <div className="nm-td-flex">
                    <div className="nm-thumb" style={{ backgroundImage: `url('${property.image}')` }}></div>
                    <div className="nm-info-text">
                      <strong>{property.title} {property.isSponsored && <span style={{ color: '#1FE6D4', fontSize: '12px', marginLeft: '5px' }}><i className="fa-solid fa-star"></i> Sponsored ({property.sponsorDaysLeft}d left)</span>}</strong>
                      <span>{property.location}</span>
                    </div>
                  </div>
                </td>
                <td data-label="Price"><strong>{property.price}</strong></td>
                <td data-label="Views">{property.views.toLocaleString()}</td>
                <td data-label="Status"><span className="nm-badge active">{property.status}</span></td>
                <td data-label="Actions">
                  <div className="nm-actions">
                    <button className="nm-action-btn" style={{ width: 'auto', padding: '0 10px', background: '#1FE6D4', color: '#1A1C1E', fontWeight: 'bold' }} onClick={() => handlePromote(property.id)}>
                      🚀 Promote ($1/day)
                    </button>
                    <button className="nm-action-btn"><i className="fa-regular fa-pen-to-square"></i></button>
                    <button className="nm-action-btn danger"><i className="fa-regular fa-trash-can"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
