import React, { useState, useEffect } from 'react';
import { getViewingRequests, updateViewingRequestStatus } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface ViewingRequest {
  id: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  property: {
    title: string;
    location: string;
    price: number;
  };
  status: string;
  created_at: string;
  scheduled_date: string;
}

export default function Requests() {
  const { user, profile } = useAuth();
  const [requests, setRequests] = useState<ViewingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      if (!user) return;
      try {
        const data = await getViewingRequests(user.id, profile?.role || 'basic');
        setRequests(data);
      } catch (error) {
        console.error('Failed to load requests:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, [user, profile?.role]);

  const handleApprove = async (id: string) => {
    try {
      await updateViewingRequestStatus(id, 'approved');
      setRequests(requests.map(req =>
        req.id === id ? { ...req, status: 'approved' } : req
      ));
      alert('Appointment approved. A confirmation email with summary details has been sent to the client.');
    } catch (error) {
      alert('Failed to approve request: ' + (error as Error).message);
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await updateViewingRequestStatus(id, 'declined');
      setRequests(requests.map(req =>
        req.id === id ? { ...req, status: 'declined' } : req
      ));
    } catch (error) {
      alert('Failed to decline request: ' + (error as Error).message);
    }
  };

  if (loading) {
    return (
      <div className="nm-view" style={{ display: 'block' }}>
        <p style={{ textAlign: 'center', color: '#9CA3AF', padding: '40px' }}>Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div className="nm-page-header-text">
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
            {requests.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF' }}>
                  No viewing requests yet
                </td>
              </tr>
            ) : (
              requests.map(req => {
                const initials = req.client_name.split(' ').map(n => n[0]).join('').toUpperCase();
                const createdDate = new Date(req.created_at);
                const dateStr = createdDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                const timeStr = createdDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                return (
                  <tr key={req.id} className={req.status === 'pending' ? 'nm-row-pending' : ''}>
                    <td data-label="Client">
                      <div className="nm-td-flex">
                        <div className="nm-avatar initials">{initials}</div>
                        <div className="nm-info-text">
                          <strong>{req.client_name}</strong>
                          <span>{req.client_phone}</span>
                        </div>
                      </div>
                    </td>
                    <td data-label="Property">
                      <div className="nm-info-text">
                        <strong>{req.property?.title || 'Property'}</strong>
                        <span>{req.property?.location || 'Location'}</span>
                      </div>
                    </td>
                    <td data-label="Date">
                      <div className="nm-info-text">
                        <strong>{dateStr}</strong>
                        <span>{timeStr}</span>
                      </div>
                    </td>
                    <td data-label="Status">
                      <span className={`nm-badge ${req.status === 'pending' ? 'pending' : req.status === 'approved' ? 'active' : 'sold'}`}>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
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
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
