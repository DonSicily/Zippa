import React from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#1A202C', textLight: '#718096', bg: '#F4F6F8' };

const StatCard = ({ title, value, subtext, color }) => (
  <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
    <div style={{ color: COLORS.textLight, fontSize: '14px', marginBottom: '8px' }}>{title}</div>
    <div style={{ color: color || COLORS.textDark, fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{value}</div>
    <div style={{ color: COLORS.textLight, fontSize: '12px' }}>{subtext}</div>
  </div>
);

const Dashboard = () => {
  return (
    <div>
      <h1 style={{ color: COLORS.textDark, marginBottom: '24px' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <StatCard title="Total Revenue" value="¥124,500" subtext="+12% from last month" color={COLORS.primary} />
        <StatCard title="Total Orders" value="1,240" subtext="85 completed this week" />
        <StatCard title="Pending Orders" value="14" subtext="Needs fulfillment" color={COLORS.accent} />
        <StatCard title="Payout Balance" value="¥45,200" subtext="Next payout: Friday" color="#38A169" />
      </div>

      <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ color: COLORS.textDark, marginBottom: '16px' }}>Recent Orders</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #EDF2F7' }}>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>ORDER ID</th>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>CUSTOMER</th>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>AMOUNT</th>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'BSTZ-8X92A', customer: 'John Doe', amount: '¥450', status: 'Pending' },
              { id: 'BSTZ-7Y81B', customer: 'Jane Smith', amount: '¥1,200', status: 'Shipped to Hub' },
              { id: 'BSTZ-6W70C', customer: 'Mike Johnson', amount: '¥890', status: 'Completed' },
            ].map((order, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #EDF2F7' }}>
                <td style={{ padding: '16px 0', fontWeight: 'bold', color: COLORS.primary }}>{order.id}</td>
                <td style={{ padding: '16px 0', color: COLORS.textDark }}>{order.customer}</td>
                <td style={{ padding: '16px 0', color: COLORS.textDark }}>{order.amount}</td>
                <td style={{ padding: '16px 0' }}>
                  <span style={{ 
                    padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: order.status === 'Completed' ? '#C6F6D5' : order.status === 'Pending' ? '#FEEBC8' : '#BEE3F8',
                    color: order.status === 'Completed' ? '#276749' : order.status === 'Pending' ? '#C05621' : '#2B6CB0'
                  }}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
