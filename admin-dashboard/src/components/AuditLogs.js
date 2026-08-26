import React from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#0F172A', textLight: '#64748B', success: '#10B981', danger: '#EF4444', warning: '#F59E0B' };

const AuditLogs = () => {
  const logs = [
    { id: 1, user: 'Super Admin', action: 'Approved Product', target: 'Wireless Earbuds Pro (P-101)', time: '2 mins ago', type: 'success' },
    { id: 2, user: 'Super Admin', action: 'Rejected Vendor', target: 'Yiwu Home Goods (V-03)', time: '1 hour ago', type: 'danger' },
    { id: 3, user: 'System', action: 'Processed Payout', target: '¥12,500 to Shenzhen Tech', time: '5 hours ago', type: 'info' },
    { id: 4, user: 'Super Admin', action: 'Updated Commission', target: 'Platform rate changed to 15%', time: '1 day ago', type: 'warning' },
    { id: 5, user: 'System', action: 'Failed Login Attempt', target: 'IP: 192.168.1.45', time: '2 days ago', type: 'danger' },
  ];

  const getTypeColor = (type) => {
    switch(type) {
      case 'success': return { bg: '#D1FAE5', text: '#065F46' };
      case 'danger': return { bg: '#FEE2E2', text: '#991B1B' };
      case 'warning': return { bg: '#FEF3C7', text: '#92400E' };
      default: return { bg: '#DBEAFE', text: '#1E40AF' };
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: COLORS.textDark, margin: 0, fontSize: '24px' }}>System Audit Logs 🔒</h1>
        <p style={{ color: COLORS.textLight, margin: '4px 0 0 0', fontSize: '14px' }}>Track all administrative actions and system events for security.</p>
      </div>

      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>TIMESTAMP</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>USER</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>ACTION</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>TARGET</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => {
              const typeStyle = getTypeColor(log.type);
              return (
                <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px', color: COLORS.textLight, fontSize: '13px' }}>{log.time}</td>
                  <td style={{ padding: '16px', fontWeight: '600', color: COLORS.textDark, fontSize: '13px' }}>{log.user}</td>
                  <td style={{ padding: '16px', color: COLORS.textDark, fontSize: '13px' }}>{log.action}</td>
                  <td style={{ padding: '16px', color: COLORS.textLight, fontSize: '13px' }}>{log.target}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', backgroundColor: typeStyle.bg, color: typeStyle.text }}>
                      {log.type.toUpperCase()}
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

export default AuditLogs;
