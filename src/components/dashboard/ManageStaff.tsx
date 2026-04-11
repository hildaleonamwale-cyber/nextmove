import React from 'react';

export default function ManageStaff() {
  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div>
          <h1>Team Management</h1>
          <p>Coordinate your agents, assign roles, and scale your real estate operations.</p>
        </div>
        <button className="nm-btn-save"><i className="fa-solid fa-user-plus"></i> Invite Agent</button>
      </div>
      <div className="nm-table-card">
        <table className="nm-table">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Role</th>
              <th>Listings</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Agent">
                <div className="nm-td-flex">
                  <div className="nm-avatar" style={{ backgroundImage: "url('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150')" }}></div>
                  <div className="nm-info-text">
                    <strong>Sarah Jenkins</strong>
                    <span>sarah@eliterealty.com</span>
                  </div>
                </div>
              </td>
              <td data-label="Role">Admin</td>
              <td data-label="Listings">45</td>
              <td data-label="Status"><span className="nm-badge active">Active</span></td>
              <td data-label="Actions">
                <div className="nm-actions">
                  <button className="nm-action-btn"><i className="fa-solid fa-gear"></i></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
