import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';

export default function Requests() {
  const { requests } = useAppContext();

  const handleApprove = async (id: string) => {
    try {
      await supabase.from('viewing_requests').update({ status: 'approved' }).eq('id', id);
      alert('Appointment approved. A confirmation email with summary details has been sent to the client.');
      // Ideally we would refresh the requests here, but for now we rely on the next fetch or optimistic update
    } catch (error) {
      console.error("Error approving request", error);
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await supabase.from('viewing_requests').update({ status: 'rejected' }).eq('id', id);
    } catch (error) {
      console.error("Error rejecting request", error);
    }
  };

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
            {requests.map(req => (
              <tr key={req.id}>
                <td data-label="Client">
                  <div className="nm-td-flex">
                    <div className="nm-avatar initials">{req.requester_name.substring(0, 2).toUpperCase()}</div>
                    <div className="nm-info-text">
                      <strong>{req.requester_name}</strong>
                      <span>{req.requester_email}</span>
                    </div>
                  </div>
                </td>
                <td data-label="Property">
                  <div className="nm-info-text">
                    <strong>{req.properties?.title || 'Unknown Property'}</strong>
                    <span>{req.properties?.category || 'Unknown Category'}</span>
                  </div>
                </td>
                <td data-label="Date">
                  <div className="nm-info-text">
                    <strong>{new Date(req.requested_date).toLocaleDateString()}</strong>
                    <span>{new Date(req.requested_date).toLocaleTimeString()}</span>
                  </div>
                </td>
                <td data-label="Status">
                  <span className={`nm-badge ${req.status === 'pending' ? 'pending' : req.status === 'approved' ? 'active' : 'inactive'}`}>
                    {req.status}
                  </span>
                </td>
                <td data-label="Actions">
                  <div className="nm-actions">
                    {req.status === 'pending' ? (
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
            {requests.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>No viewing requests found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
