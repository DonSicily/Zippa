import React, { useState } from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#1A202C', textLight: '#718096', bg: '#F4F6F8', border: '#E2E8F0' };

const Support = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const recentTickets = [
    { id: 'TKT-992', subject: 'Payout delay for July 14th', status: 'Resolved', date: 'Jul 20, 2026' },
    { id: 'TKT-1004', subject: 'How to update shipping dimensions?', status: 'Pending', date: 'Aug 01, 2026' },
  ];

  return (
    <div>
      <h1 style={{ color: COLORS.textDark, marginBottom: '24px' }}>Help & Support 🎧</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Submit a Ticket */}
        <div style={{ backgroundColor: COLORS.white, padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: COLORS.textDark, marginTop: 0, marginBottom: '20px' }}>Contact Bestiez Operations</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textDark, fontSize: '14px' }}>Subject</label>
            <input 
              type="text" value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)}
              placeholder="e.g. Issue with order BSTZ-8X92A"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${COLORS.border}`, boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textDark, fontSize: '14px' }}>Message</label>
            <textarea 
              value={ticketMessage} onChange={(e) => setTicketMessage(e.target.value)}
              placeholder="Describe your issue in detail..."
              rows="5"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${COLORS.border}`, boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          <button style={{ 
            width: '100%', backgroundColor: COLORS.primary, color: COLORS.white, border: 'none', 
            padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' 
          }}>
            Submit Ticket
          </button>
        </div>

        {/* Recent Tickets & FAQ */}
        <div>
          <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
            <h3 style={{ color: COLORS.textDark, marginTop: 0, marginBottom: '16px' }}>Recent Tickets</h3>
            {recentTickets.map((t) => (
              <div key={t.id} style={{ padding: '12px 0', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '600', color: COLORS.textDark, fontSize: '14px' }}>{t.subject}</div>
                  <div style={{ color: COLORS.textLight, fontSize: '12px', marginTop: '4px' }}>{t.id} • {t.date}</div>
                </div>
                <span style={{ 
                  padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                  backgroundColor: t.status === 'Resolved' ? '#C6F6D5' : '#FEEBC8',
                  color: t.status === 'Resolved' ? '#276749' : '#C05621'
                }}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#EBF8FF', padding: '24px', borderRadius: '12px', border: '1px solid #BEE3F8' }}>
            <h3 style={{ color: COLORS.primary, marginTop: 0, marginBottom: '12px', fontSize: '16px' }}>Quick FAQ</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: COLORS.textDark, fontSize: '14px', lineHeight: '1.8' }}>
              <li>How do I mark an order as shipped to the hub?</li>
              <li>What are the packaging requirements?</li>
              <li>When is my next payout scheduled?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
