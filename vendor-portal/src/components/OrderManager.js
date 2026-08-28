import React from 'react';
import { COLORS } from '../utils/colors';

const OrderManager = () => {
  const orders = [
    { id: 'BSTZ-8X92A', date: '2026-08-01', items: 'Wireless Earbuds (x1)', address: 'UNILAG Campus Hub, Lagos', status: 'Pending' },
    { id: 'BSTZ-7Y81B', date: '2026-08-01', items: 'Smart Watch (x2)', address: 'OAU Campus Hub, Ile-Ife', status: 'Pending' },
    { id: 'BSTZ-6W70C', date: '2026-07-31', items: 'LED Desk Lamp (x1)', address: 'UI Campus Hub, Ibadan', status: 'Shipped to Hub' },
  ];

  const getStatusStyle = (status) => {
    if (status === 'Pending') return { bg: COLORS.warningBg, text: COLORS.warning };
    if (status === 'Shipped to Hub') return { bg: COLORS.infoBg, text: COLORS.info };
    return { bg: COLORS.successBg, text: COLORS.success };
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>Order Management</h1>
          <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Fulfill and track your customer orders.</p>
        </div>
        <button style={{ 
          backgroundColor: COLORS.coral, 
          color: COLORS.white, 
          border: 'none', 
          padding: '12px 20px', 
          borderRadius: '10px', 
          fontWeight: '600', 
          fontSize: '14px', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>📥</span> Export CSV
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {orders.map((order) => {
          const statusStyle = getStatusStyle(order.status);
          return (
            <div key={order.id} style={{ 
              backgroundColor: COLORS.white, 
              borderRadius: '16px', 
              padding: '24px', 
              boxShadow: COLORS.shadow,
              border: `1px solid ${COLORS.border}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', color: COLORS.navy, fontSize: '15px' }}>{order.id}</span>
                <span style={{ 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '12px', 
                  fontWeight: '600',
                  backgroundColor: statusStyle.bg,
                  color: statusStyle.text
                }}>
                  {order.status}
                </span>
              </div>
              
              <div style={{ fontSize: '13px', color: COLORS.textSecondary }}>{order.date}</div>
              
              <div style={{ fontSize: '15px', color: COLORS.textPrimary, fontWeight: '500' }}>{order.items}</div>
              
              <div style={{ 
                fontSize: '13px', 
                color: COLORS.textSecondary, 
                borderTop: `1px solid ${COLORS.border}`, 
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <span>📍</span>
                <span>{order.address}</span>
              </div>

              {order.status === 'Pending' && (
                <button style={{ 
                  width: '100%', 
                  backgroundColor: COLORS.navy, 
                  color: COLORS.white, 
                  border: 'none', 
                  padding: '12px', 
                  borderRadius: '10px', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  marginTop: 'auto',
                  fontSize: '14px'
                }}>
                  Mark as Shipped to Hub
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderManager;
