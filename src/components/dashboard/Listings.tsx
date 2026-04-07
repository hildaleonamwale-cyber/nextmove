import React from 'react';

interface ListingsProps {
  currentRole: string;
  onAddProperty?: () => void;
}

export default function Listings({ currentRole, onAddProperty }: ListingsProps) {
  const pageTitle = currentRole === 'admin' ? 'Company Portfolio' : 
                    currentRole === 'pro' ? 'My Portfolio' : 
                    currentRole === 'worker' ? 'My Portfolio' : 'My Properties';

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>{pageTitle}</h1>
          <p>Manage and track the performance of your properties.</p>
        </div>
        {onAddProperty && (
          <button className="we-cta-btn" onClick={onAddProperty} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-plus"></i> Add Property
          </button>
        )}
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
            <tr>
              <td data-label="Property">
                <div className="nm-td-flex">
                  <div className="nm-thumb" style={{ backgroundImage: "url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=150')" }}></div>
                  <div className="nm-info-text">
                    <strong>The Glass Pavilion</strong>
                    <span>Borrowdale Brooke</span>
                  </div>
                </div>
              </td>
              <td data-label="Price"><strong>$850,000</strong></td>
              <td data-label="Views">1,240</td>
              <td data-label="Status"><span className="nm-badge active">Active</span></td>
              <td data-label="Actions">
                <div className="nm-actions">
                  <button className="nm-action-btn"><i className="fa-regular fa-pen-to-square"></i></button>
                  <button className="nm-action-btn danger"><i className="fa-regular fa-trash-can"></i></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
