import React, { useEffect, useState } from 'react';
import { getDashboardStats, getPayoutHistory, requestPayout } from '../services/vendorService';
import { Card, StatusPill, Button } from './ui';
import { COLORS } from '../utils/colors';

const Payouts = () => {
  const [stats, setStats] = useState({});
  const [txns, setTxns] = useState([]);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = () => {
    getDashboardStats().then(b => setStats(b?.data || b || {})).catch(() => {});
    getPayoutHistory().then(b => setTxns(Array.isArray(b) ? b : (b?.data || []))).catch(() => {});
  };
  useEffect(load, []);

  const withdraw = async () => {
    setBusy(true); setNotice(null);
    try { await requestPayout(); setNotice({ ok: true, msg: 'Payout requested successfully.' }); load(); }
    catch (e) { setNotice({ ok: false, msg: e.response?.data?.message || 'Withdrawal failed.' }); }
    finally { setBusy(false); }
  };

  const balance = stats.availableBalance ?? stats.payoutBalance ?? 45200;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>Payouts & Earnings</h1>
        <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Manage your store balance and withdrawal history.</p>
      </div>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, #1A365D 100%)`, borderRadius: '20px', padding: '32px', color: COLORS.white, marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, ${COLORS.gold}40 0%, transparent 70%)` }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS.gold }}></span> Available Balance
          </div>
          <div style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-1px', marginBottom: '8px' }}>¥{Number(balance).toLocaleString()}</div>
          <div style={{ fontSize: '13px', opacity: 0.8 }}>Next automatic payout: <span style={{ color: COLORS.gold, fontWeight: 600 }}>Friday</span></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
          <Button onClick={withdraw} disabled={busy}>{busy ? 'Processing…' : 'Withdraw Now'}</Button>
          <button style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: COLORS.white, border: '1px solid rgba(255,255,255,0.2)', padding: '12px 28px', borderRadius: '12px', fontWeight: '500', fontSize: '14px', cursor: 'pointer' }}>
            View Breakdown
          </button>
        </div>
      </div>

      {notice && (
        <div style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '10px', backgroundColor: notice.ok ? COLORS.successBg : COLORS.dangerBg, color: notice.ok ? COLORS.success : COLORS.danger, fontSize: '13px', fontWeight: '600' }}>
          {notice.msg}
        </div>
      )}

      <Card>
        <h3 style={{ color: COLORS.navy, margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Transaction History</h3>
        {txns.length === 0
          ? <div style={{ color: COLORS.textMuted, fontSize: '13px', padding: '20px 0', textAlign: 'center' }}>No payouts yet.</div>
          : txns.map((t, idx) => (
            <div key={t._id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: idx < txns.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}>
              <div>
                <div style={{ fontWeight: '600', color: COLORS.navy, fontSize: '14px' }}>{t.method || t.channel || 'Alipay'} ····{String(t.accountLast4 || t._id).slice(-4)}</div>
                <div style={{ color: COLORS.textMuted, fontSize: '12px', marginTop: '4px' }}>{new Date(t.createdAt || t.date).toLocaleDateString()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '700', color: COLORS.success, fontSize: '14px', marginBottom: '4px' }}>+ ¥{Number(t.amount || 0).toLocaleString()}</div>
                <StatusPill status={t.status === 'Completed' ? 'Completed' : t.status} />
              </div>
            </div>
          ))}
      </Card>
    </div>
  );
};

export default Payouts;
