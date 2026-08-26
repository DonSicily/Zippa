import React from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#0F172A', textLight: '#64748B', success: '#10B981' };

const CampusHub = () => {
  const campuses = [
    { name: 'UNILAG', city: 'Lagos', students: '55,000', ambassadors: 12, orders: 450 },
    { name: 'OAU', city: 'Ile-Ife', students: '35,000', ambassadors: 8, orders: 210 },
    { name: 'UI', city: 'Ibadan', students: '40,000', ambassadors: 10, orders: 320 },
    { name: 'UNN', city: 'Nsukka', students: '45,000', ambassadors: 9, orders: 180 },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: COLORS.textDark, margin: 0, fontSize: '24px' }}>Campus & Ambassador Hub 🎓</h1>
          <p style={{ color: COLORS.textLight, margin: '4px 0 0 0', fontSize: '14px' }}>Manage campus activations, pickup points, and brand ambassadors.</p>
        </div>
        <button style={{ 
          backgroundColor: COLORS.accent, color: COLORS.white, border: 'none', 
          padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(255, 107, 53, 0.2)'
        }}>
          + Add New Campus
        </button>
      </div>

      {/* Push Notification Panel */}
      <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0', color: COLORS.primary, fontSize: '16px' }}>Send Campus Flash Drop 📢</h3>
          <p style={{ margin: 0, color: COLORS.textLight, fontSize: '13px' }}>Push a targeted notification to students at a specific campus.</p>
        </div>
        <button style={{ backgroundColor: COLORS.primary, color: COLORS.white, border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
          Compose Push
        </button>
      </div>

      {/* Campuses Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {campuses.map((c, idx) => (
          <div key={idx} style={{ backgroundColor: COLORS.white, borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, color: COLORS.textDark, fontSize: '18px' }}>{c.name}</h3>
                <div style={{ color: COLORS.textLight, fontSize: '13px', marginTop: '4px' }}>{c.city}, Nigeria</div>
              </div>
              <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>Active</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
              <div>
                <div style={{ color: COLORS.textLight, fontSize: '11px', textTransform: 'uppercase', fontWeight: '600' }}>Students</div>
                <div style={{ color: COLORS.textDark, fontSize: '16px', fontWeight: '700', marginTop: '4px' }}>{c.students}</div>
              </div>
              <div>
                <div style={{ color: COLORS.textLight, fontSize: '11px', textTransform: 'uppercase', fontWeight: '600' }}>Ambassadors</div>
                <div style={{ color: COLORS.textDark, fontSize: '16px', fontWeight: '700', marginTop: '4px' }}>{c.ambassadors}</div>
              </div>
              <div>
                <div style={{ color: COLORS.textLight, fontSize: '11px', textTransform: 'uppercase', fontWeight: '600' }}>Total Orders</div>
                <div style={{ color: COLORS.primary, fontSize: '16px', fontWeight: '700', marginTop: '4px' }}>{c.orders}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampusHub;
