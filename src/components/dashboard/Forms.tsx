import React from 'react';

export default function Forms() {
  const submissions = [
    { id: 1, name: 'Michael Chen', email: 'm.chen@example.com', phone: '077 111 2222', message: 'I am interested in selling my property in Borrowdale.', date: 'Today, 09:30 AM', status: 'New' },
    { id: 2, name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '071 333 4444', message: 'Looking for a 3-bedroom house to rent in Avondale. Budget is $1500.', date: 'Yesterday, 14:15 PM', status: 'Read' },
    { id: 3, name: 'David Ndlovu', email: 'davidn@example.com', phone: '078 555 6666', message: 'Can we schedule a meeting to discuss property management services?', date: '10 Apr, 11:00 AM', status: 'Replied' },
  ];

  return (
    <div className="nm-view" style={{ display: 'block' }}>
      <div className="nm-page-header">
        <div>
          <h1>Form Submissions</h1>
          <p>Review and manage inquiries submitted through your profile contact form.</p>
        </div>
      </div>

      <div className="nm-table-card">
        <table className="nm-table">
          <thead>
            <tr>
              <th>Contact Info</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(sub => (
              <tr key={sub.id} className={sub.status === 'New' ? 'nm-row-pending' : ''}>
                <td data-label="Contact Info">
                  <div className="nm-info-text">
                    <strong>{sub.name}</strong>
                    <span>{sub.email} • {sub.phone}</span>
                  </div>
                </td>
                <td data-label="Message">
                  <div className="nm-info-text" style={{ maxWidth: '300px', whiteSpace: 'normal' }}>
                    <span style={{ color: sub.status === 'New' ? '#fff' : 'var(--dark)' }}>{sub.message}</span>
                  </div>
                </td>
                <td data-label="Date">
                  <div className="nm-info-text">
                    <strong>{sub.date.split(',')[0]}</strong>
                    <span>{sub.date.split(',')[1] || ''}</span>
                  </div>
                </td>
                <td data-label="Status">
                  <span className={`nm-badge ${sub.status === 'New' ? 'pending' : sub.status === 'Replied' ? 'active' : 'inactive'}`}>
                    {sub.status}
                  </span>
                </td>
                <td data-label="Actions">
                  <div className="nm-actions">
                    <button className="nm-action-btn" title="Reply to Message"><i className="fa-solid fa-reply"></i></button>
                    <button className="nm-action-btn danger" title="Delete"><i className="fa-regular fa-trash-can"></i></button>
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
