import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { COLORS, SHADOWS } from '../utils/colors';

const SEED_LOGS = [
  { id: 'L-1', time: 'Aug 28, 2026 · 14:32', actor: 'daniel@bestiez.com', event: 'Auth', detail: 'Successful 2FA sign-in from Lagos, NG', ip: '102.89.49.12', severity: 'info' },
  { id: 'L-2', time: 'Aug 28, 2026 · 13:05', actor: 'daniel@bestiez.com', event: 'Approval', detail: 'Approved product BZ-101 (Aero Pro Wireless Earbuds Pro)', ip: '102.89.49.12', severity: 'success' },
  { id: 'L-3', time: 'Aug 28, 2026 · 11:47', actor: 'system', event: 'Payout', detail: 'Payout PO-203 moved to Processing', ip: '—', severity: 'info' },
  { id: 'L-4', time: 'Aug 27, 2026 · 18:20', actor: 'daniel@bestiez.com', event: 'Settings', detail: 'Raised minimum quality score to 70', ip: '102.89.49.12', severity: 'warning' },
  { id: 'L-5', time: 'Aug 27, 2026 · 09:12', actor: 'unknown', event: 'Auth', detail: 'Failed sign-in attempt — rate limited', ip: '45.132.77.9', severity: 'danger' },
  { id: 'L-6', time: 'Aug 26, 2026 · 16:40', actor: 'daniel@bestiez.com', event: 'Approval', detail: 'Rejected product BZ-097 (insufficient images)', ip: '102.89.49.12', severity: 'danger' },
  { id: 'L-7', time: 'Aug 26, 2026 · 10:03', actor: 'system', event: 'Logistics', detail: 'SPEEDAF webhook: SPD-9921 departed China Hub', ip: '—', severity: 'info' },
  { id: 'L-8', time: 'Aug 25, 2026 · 15:26', actor: 'daniel@bestiez.com', event: 'Payout', detail: 'Processed payout PO-204 ($1,460) to Dongguan Bags Ltd', ip: '102.89.49.12', severity: 'success' },
];

const EVENT_TYPES = ['All Events', 'Auth', 'Approval', 'Payout', 'Settings', 'Logistics'];

const severityDot = (s) => ({ info: COLORS.info, success: COLORS.success, warning: COLORS.warning, danger: COLORS.danger }[s] || COLORS.textMuted);

const AuditLogs = () => {
  const [filter, setFilter] = useState('All Events');
  const logs = filter === 'All Events' ? SEED_LOGS : SEED_LOGS.filter((l) => l.event === filter);

  const handleExport = () => {
    const rows = [['Timestamp', 'Actor', 'Event', 'Detail', 'IP'], ...logs.map((l) => [l.time, l.actor, l.event, l.detail, l.ip])];
    const blob = new Blob([rows.map((r) => r.join(',')).join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'bestiez-audit-logs.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const cell = { padding: '14px 16px', fontSize: '13px', color: COLORS.textMain };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '24px', fontWeight: '700' }}>Audit Logs</h1>
          <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Immutable record of every sensitive admin action.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, padding: '9px 12px', borderRadius: '8px', fontSize: '13px', color: COLORS.textMain, outline: 'none' }}>
            {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <button onClick={handleExport} style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: COLORS.textMain }}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: SHADOWS.card, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: `1px solid ${COLORS.border}` }}>
              {['Timestamp', 'Actor', 'Event', 'Detail', 'IP Address'].map((h) => (
                <th key={h} style={{ padding: '16px', color: COLORS.textMuted, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id} style={{ borderBottom: `1px solid ${COLORS.borderLight}` }}>
                <td style={{ ...cell, color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{l.time}</td>
                <td style={{ ...cell, fontWeight: '600' }}>{l.actor}</td>
                <td style={cell}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', backgroundColor: COLORS.borderLight, color: COLORS.textMain }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: severityDot(l.severity) }} /> {l.event}
                  </span>
                </td>
                <td style={cell}>{l.detail}</td>
                <td style={{ ...cell, color: COLORS.textMuted, fontFamily: 'monospace', fontSize: '12px' }}>{l.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: COLORS.textMuted }}>No {filter} events in this window.</div>}
      </div>
    </div>
  );
};

export default AuditLogs;
