import React, { useState } from 'react';

export default function Requests() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      clientName: 'John Doe',
      clientPhone: '077 123 4567',
      clientInitials: 'JD',
      propertyName: 'The Glass Pavilion',
      propertyLocation: 'Borrowdale Brooke',
      date: 'Mar 25, 2026',
      time: '10:00 AM',
      status: 'Pending'
    },
    {
      id: 2,
      clientName: 'Sarah Moyo',
      clientPhone: '071 987 6543',
      clientInitials: 'SM',
      propertyName: 'Garden City Lofts',
      propertyLocation: 'Avondale',
      date: 'Mar 28, 2026',
      time: '02:30 PM',
      status: 'Approved'
    }
  ]);

  const handleApprove = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    ));
    alert('Appointment approved. A confirmation email with summary details has been sent to the client.');
  };

  const handleDecline = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Declined' } : req
    ));
  };

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div>
          <h1>Inbound Inquiries</h1>
          <p>Process and manage viewing requests from prospective clients.</p>
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
            {requests.map(req => (
              <tr key={req.id} className={req.status === 'Pending' ? 'nm-row-pending' : ''}>
                <td data-label="Client">
                  <div className="nm-td-flex">
                    <div className="nm-avatar initials" style={req.id === 2 ? { background: 'var(--input-bg)', color: 'var(--dark)' } : {}}>{req.clientInitials}</div>
                    <div className="nm-info-text">
                      <strong>{req.clientName}</strong>
                      <span>{req.clientPhone}</span>
                    </div>
                  </div>
                </td>
                <td data-label="Property">
                  <div className="nm-info-text">
                    <strong>{req.propertyName}</strong>
                    <span>{req.propertyLocation}</span>
                  </div>
                </td>
                <td data-label="Date">
                  <div className="nm-info-text">
                    <strong>{req.date}</strong>
                    <span>{req.time}</span>
                  </div>
                </td>
                <td data-label="Status">
                  <span className={`nm-badge ${req.status === 'Pending' ? 'pending' : req.status === 'Approved' ? 'active' : 'inactive'}`}>
                    {req.status}
                  </span>
                </td>
                <td data-label="Actions">
                  <div className="nm-actions">
                    {req.status === 'Pending' ? (
                      <>
                        <button className="nm-action-btn success" title="Approve" onClick={() => handleApprove(req.id)}><i className="fa-solid fa-check"></i></button>
                        <button className="nm-action-btn danger" title="Decline" onClick={() => handleDecline(req.id)}><i className="fa-solid fa-xmark"></i></button>
                      </>
                    ) : (
                      <button className="nm-action-btn" title="View Details"><i className="fa-solid fa-eye"></i></button>
                    )}
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
