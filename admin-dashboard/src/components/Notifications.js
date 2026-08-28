import React, { useState } from 'react';
import { Bell, Send, Megaphone } from 'lucide-react';
import { COLORS, SHADOWS } from '../utils/colors';

const SEED_NOTES = [
  { id: 'N-1', title: 'Flash Sale: 20% off earbuds', body: 'Weekend flash sale now live on all campuses.', audience: 'All Users', time: '2h ago', status: 'Delivered' },
  { id: 'N-2', title: 'Ambassador onboarding', body: 'UI ambassador onboarding complete. Welcome kit sent.', audience: 'Ambassadors', time: '4h ago', status: 'Delivered' },
  { id: 'N-3', title: 'New payout window opens', body: 'Vendor payouts for Aug 1–15 are now processing.', audience: 'Vendors', time: '1d ago', status: 'Delivered' },
  { id: 'N-4', title: 'Semester drop announcement', body: 'Scheduled: new semester drops go live Friday 9AM.', audience: 'All Users', time: 'Fri 9:00 AM', status: 'Scheduled' },
];

const AUDIENCES = ['All Users', 'Vendors', 'Ambassadors'];

const Notifications = () => {
  const [notes, setNotes] = useState(SEED_NOTES);
  const [composeOpen, setComposeOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('All Users');

  const handleSend = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setNotes((n) => [{ id: `N-${Date.now()}`, title: title.trim(), body: body.trim(), audience, time: 'Just now', status: 'Delivered' }, ...n]);
    setTitle(''); setBody(''); setComposeOpen(false);
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${COLORS.border}`, fontSize: '14px', boxSizing: 'border-box', outline: 'none' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '24px', fontWeight: '700' }}>Push Notifications</h1>
          <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Broadcast announcements to students, vendors, and ambassadors.</p>
        </div>
        <button onClick={() => setComposeOpen(!composeOpen)} style={{ backgroundColor: COLORS.coral, color: COLORS.white, border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Send size={16} /> {composeOpen ? 'Close Composer' : 'Compose'}
        </button>
      </div>

      {composeOpen && (
        <form onSubmit={handleSend} style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: SHADOWS.modal, padding: '24px', marginBottom: '24px', border: `1px solid ${COLORS.gold}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textMain, fontSize: '13px' }}>Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Payday sale is live!" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textMain, fontSize: '13px' }}>Audience</label>
              <select value={audience} onChange={(e) => setAudience(e.target.value)} style={inputStyle}>
                {AUDIENCES.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textMain, fontSize: '13px' }}>Message</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={3} placeholder="Write the push message…" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
          <button type="submit" style={{ backgroundColor: COLORS.navy, color: COLORS.white, border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Send size={14} /> Send Broadcast
          </button>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notes.map((n) => (
          <div key={n.id} style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: SHADOWS.card, padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: COLORS.cream, padding: '10px', borderRadius: '8px', flexShrink: 0 }}>
              <Megaphone size={18} color={COLORS.coral} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontWeight: '700', color: COLORS.navy, fontSize: '15px' }}>{n.title}</span>
                <span style={{ color: COLORS.textMuted, fontSize: '12px' }}>{n.time}</span>
              </div>
              <p style={{ margin: '0 0 10px 0', color: COLORS.textMuted, fontSize: '13px', lineHeight: '1.5' }}>{n.body}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', backgroundColor: COLORS.infoBg, color: COLORS.info }}>{n.audience}</span>
                <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', backgroundColor: n.status === 'Delivered' ? COLORS.successBg : COLORS.warningBg, color: n.status === 'Delivered' ? COLORS.success : '#92400E' }}>
                  {n.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
