import React, { useState } from 'react';
import { COLORS } from '../utils/colors';

const Support = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const recentTickets = [
    { id: 'TKT-992', subject: 'Payout delay for July 14th', status: 'Resolved', date: 'Jul 20, 2026' },
    { id: 'TKT-1004', subject: 'How to update shipping dimensions?', status: 'Pending', date: 'Aug 01, 2026' },
  ];

  const fieldStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px', border: `1px solid ${COLORS.border}`,
    boxSizing: 'border-box', fontSize: '14px', outline: 'none', fontFamily: 'inherit',
    color: COLORS.textPrimary, backgroundColor: COLORS.white, transition: 'border-color 0.2s ease',
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>Help & Support</h1>
        <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Our operations team typically responds within 24 hours.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Submit a Ticket */}
        <div style={{ backgroundColor: COLORS.white, padding: '32px', borderRadius: '16px', boxShadow: COLORS.shadow, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ color: COLORS.navy, marginTop: 0, marginBottom: '24px', fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '4px', height: '18px', backgroundColor: COLORS.coral, borderRadius: '2px' }}></span>
            Contact Bestiez Operations
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: COLORS.textSecondary, fontSize: '13px' }}>Subject</label>
            <input
              type="text" value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)}
              placeholder="e.g. Issue with order BSTZ-8X92A"
              style={fieldStyle}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: COLORS.textSecondary, fontSize: '13px' }}>Message</label>
            <textarea
              value={ticketMessage} onChange={(e) => setTicketMessage(e.target.value)}
              placeholder="Describe your issue in detail..." rows="5"
              style={{ ...fieldStyle, resize: 'vertical' }}
            />
          </div>
          <button style={{ width: '100%', backgroundColor: COLORS.coral, color: COLORS.white, border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(241, 96, 46, 0.25)' }}>
            Submit Ticket
          </button>
        </div>

        {/* Recent Tickets & FAQ */}
        <div>
          <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '16px', boxShadow: COLORS.shadow, border: `1px solid ${COLORS.border}`, marginBottom: '20px' }}>
            <h3 style={{ color: COLORS.navy, marginTop: 0, marginBottom: '8px', fontSize: '15px', fontWeight: '700' }}>Recent Tickets</h3>
            {recentTickets.map((t, idx) => (
              <div key={t.id} style={{ padding: '14px 0', borderBottom: idx < recentTickets.length - 1 ? `1px solid ${COLORS.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '600', color: COLORS.textPrimary, fontSize: '14px' }}>{t.subject}</div>
                  <div style={{ color: COLORS.textMuted, fontSize: '12px', marginTop: '4px' }}>{t.id} • {t.date}</div>
                </div>
                <span style={{
                  padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: '700',
                  backgroundColor: t.status === 'Resolved' ? COLORS.successBg : COLORS.warningBg,
                  color: t.status === 'Resolved' ? COLORS.success : COLORS.warning,
                }}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: COLORS.cream, padding: '24px', borderRadius: '16px', border: `1px solid ${COLORS.border}`, borderLeft: `4px solid ${COLORS.gold}` }}>
            <h3 style={{ color: COLORS.navy, marginTop: 0, marginBottom: '12px', fontSize: '15px', fontWeight: '700' }}>Quick FAQ</h3>
            <ul style={{ margin: 0, paddingLeft: '18px', color: COLORS.textPrimary, fontSize: '14px', lineHeight: '2' }}>
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
