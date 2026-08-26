import React, { useState } from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#0F172A', textLight: '#64748B', success: '#10B981' };

const Notifications = () => {
  const [formData, setFormData] = useState({ title: '', message: '', campus: 'all' });
  
  const sentNotifications = [
    { id: 'N-001', title: 'Flash Drop: Tech Gadgets', campus: 'UNILAG', sentAt: 'Aug 02, 10:00 AM', recipients: '55,000' },
    { id: 'N-002', title: 'Welcome to Bestiez!', campus: 'All Campuses', sentAt: 'Jul 28, 09:00 AM', recipients: '158,000' },
  ];

  const handleSend = (e) => {
    e.preventDefault();
    alert(`Push notification "${formData.title}" sent successfully!`);
    setFormData({ title: '', message: '', campus: 'all' });
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: COLORS.textDark, margin: 0, fontSize: '24px' }}>Push Notifications 📢</h1>
        <p style={{ color: COLORS.textLight, margin: '4px 0 0 0', fontSize: '14px' }}>Send targeted marketing drops and updates to students.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Compose Form */}
        <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 20px 0', color: COLORS.textDark, fontSize: '16px' }}>Compose New Push</h3>
          <form onSubmit={handleSend}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textDark, fontSize: '13px' }}>Target Audience</label>
              <select 
                value={formData.campus} 
                onChange={(e) => setFormData({...formData, campus: e.target.value})}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', boxSizing: 'border-box', fontSize: '14px' }}
              >
                <option value="all">All Campuses (158,000 students)</option>
                <option value="unilag">UNILAG (55,000 students)</option>
                <option value="oau">OAU (35,000 students)</option>
                <option value="ui">UI (40,000 students)</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textDark, fontSize: '13px' }}>Notification Title</label>
              <input 
                type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. 🔥 Flash Drop: 50% Off Hoodies!" required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', boxSizing: 'border-box', fontSize: '14px' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textDark, fontSize: '13px' }}>Message Body</label>
              <textarea 
                value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Get them before they're gone..." rows="4" required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', boxSizing: 'border-box', fontSize: '14px', resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit"
              style={{ 
                width: '100%', backgroundColor: COLORS.accent, color: COLORS.white, border: 'none', 
                padding: '14px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer' 
              }}
            >
              Send Push Notification
            </button>
          </form>
        </div>

        {/* History */}
        <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 20px 0', color: COLORS.textDark, fontSize: '16px' }}>Sent History</h3>
          {sentNotifications.map((n) => (
            <div key={n.id} style={{ padding: '16px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600', color: COLORS.textDark, fontSize: '14px' }}>{n.title}</span>
                <span style={{ fontSize: '12px', color: COLORS.textLight }}>{n.sentAt}</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: COLORS.textLight }}>
                <span>Target: {n.campus}</span>
                <span>Recipients: {n.recipients}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
