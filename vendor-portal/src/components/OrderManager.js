import React from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#1A202C', textLight: '#718096' };

const OrderManager = () => {
  const orders = [
    { id: 'BSTZ-8X92A', date: '2026-08-01', items: 'Wireless Earbuds (x1)', address: 'UNILAG Campus Hub, Lagos', status: 'Pending' },
    { id: 'BSTZ-7Y81B', date: '2026-08-01', items: 'Smart Watch (x2)', address: 'OAU Campus Hub, Ile-Ife', status: 'Pending' },
    { id: 'BSTZ-6W70C', date: '2026-07-31', items: 'LED Desk Lamp (x1)', address: 'UI Campus Hub, Ibadan', status: 'Shipped to Hub' },
  ];

  return (
    <div>
      <h1 style={{ color: COLORS.textDark, marginBottom: '24px' }}>Order Management</h1>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {orders.map((order) => (
          <div key={order.id} style={{ backgroundColor: COLORS.white, borderRadius: '12px', padding: '24px', width: 'calc(33.333% - 14px)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontWeight: 'bold', color: COLORS.primary }}>{order.id}</span>
              <span style={{ 
                padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                backgroundColor: order.status === 'Pending' ? '#FEEBC8' : '#BEE3F8',
                color: order.status === 'Pending' ? '#C05621' : '#2B6CB0'
              }}>
                {order.status}
              </span>
            </div>
            <div style={{ fontSize: '13px', color: COLORS.textLight, marginBottom: '8px' }}>{order.date}</div>
            <div style={{ fontSize: '14px', color: COLORS.textDark, marginBottom: '16px', minHeight: '40px' }}>{order.items}</div>
            <div style={{ fontSize: '12px', color: COLORS.textLight, marginBottom: '20px', borderTop: '1px solid #EDF2F7', paddingTop: '12px' }}>
               {order.address}
            </div>
            {order.status === 'Pending' && (
              <button style={{ 
                width: '100%', backgroundColor: COLORS.primary, color: COLORS.white, border: 'none', 
                padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' 
              }}>
                Mark as Shipped to Hub
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManager;
