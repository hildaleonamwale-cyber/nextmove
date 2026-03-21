import React from 'react';

export default function Requests() {
  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div>
          <h1>Viewing Requests</h1>
          <p>Manage tour requests from potential buyers and renters.</p>
        </div>
      </div>
      <div className="nm-table-card">
        <table className="nm-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Property</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Client">
                <div className="nm-td-flex">
                  <div className="nm-avatar initials">JD</div>
                  <div className="nm-info-text">
                    <strong>John Doe</strong>
                    <span>077 123 4567</span>
                  </div>
                </div>
              </td>
              <td data-label="Property">
                <div className="nm-info-text">
                  <strong>The Glass Pavilion</strong>
                  <span>Borrowdale Brooke</span>
                </div>
              </td>
              <td data-label="Date">
                <div className="nm-info-text">
                  <strong>Mar 25, 2026</strong>
                  <span>10:00 AM</span>
                </div>
              </td>
              <td data-label="Status"><span className="nm-badge pending">Pending</span></td>
              <td data-label="Actions">
                <div className="nm-actions">
                  <button className="nm-action-btn success" title="Approve"><i className="fa-solid fa-check"></i></button>
                  <button className="nm-action-btn danger" title="Decline"><i className="fa-solid fa-xmark"></i></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
