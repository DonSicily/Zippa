import React, { useEffect, useState } from 'react';
import { UserCircle, GraduationCap } from 'lucide-react';
import { getAmbassadors } from '../services/adminService';
import { COLORS, SHADOWS } from '../utils/colors';

const Ambassadors = () => {
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAmbassadors();
        setAmbassadors(res.data || []);
      } catch (err) {
        console.error('Failed to load ambassadors', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount || 0);
  };

  const getStatusStyle = (status) => {
    if (status === 'Active') return { bg: COLORS.successBg, color: COLORS.success };
    if (status === 'Pending Payout') return { bg: COLORS.warningBg, color: '#92400E' };
    if (status === 'Suspended') return { bg: COLORS.dangerBg, color: COLORS.danger };
    return { bg: COLORS.borderLight, color: COLORS.textMuted };
  };

  const cell = { padding: '16px', fontSize: '14px', color: COLORS.textMain };

  return (
    <div style={{ opacity: loading ? 0.7 : 1 }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '24px', fontWeight: '700' }}>Campus Ambassadors</h1>
        <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>
          Student growth partners driving orders and referrals per campus.
        </p>
      </div>

      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: SHADOWS.card, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: `1px solid ${COLORS.border}` }}>
              {['Ambassador', 'Campus', 'Referrals', 'GMV Generated', 'Pending Payout', 'Status'].map((h) => (
                <th key={h} style={{ padding: '16px', color: COLORS.textMuted, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ambassadors.length === 0 && !loading && (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: COLORS.textMuted }}>
                  No ambassadors found.
                </td>
              </tr>
            )}
            {ambassadors.map((a) => {
              const st = getStatusStyle(a.status);
              return (
                <tr key={a._id} style={{ borderBottom: `1px solid ${COLORS.borderLight}` }}>
                  <td style={cell}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ backgroundColor: COLORS.cream, padding: '8px', borderRadius: '50%' }}>
                        <UserCircle size={20} color={COLORS.gold} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: COLORS.textMain }}>{a.name}</div>
                        <div style={{ color: COLORS.textMuted, fontSize: '12px' }}>{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={cell}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <GraduationCap size={14} color={COLORS.textMuted} />
                      {a.campus}
                    </div>
                  </td>
                  <td style={{ ...cell, fontWeight: '600' }}>{a.referrals}</td>
                  <td style={{ ...cell, fontWeight: '600', color: COLORS.success }}>{formatCurrency(a.gmv)}</td>
                  <td style={{ ...cell, fontWeight: '600', color: a.pendingPayout > 0 ? COLORS.warning : COLORS.textMuted }}>
                    {formatCurrency(a.pendingPayout)}
                  </td>
                  <td style={cell}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600',
                      backgroundColor: st.bg, color: st.color
                    }}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ambassadors;
