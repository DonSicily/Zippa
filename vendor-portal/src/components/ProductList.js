import React from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#1A202C', textLight: '#718096' };

const ProductList = ({ onAddNew }) => {
  const products = [
    { id: 1, name: 'Wireless Earbuds Pro', category: 'Electronics', price: '¥120', stock: 450, status: 'Approved' },
    { id: 2, name: 'Smart Fitness Watch', category: 'Electronics', price: '¥85', stock: 120, status: 'Approved' },
    { id: 3, name: 'Canvas Backpack', category: 'Bags', price: '¥45', stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'LED Desk Lamp', category: 'Home', price: '¥30', stock: 200, status: 'Pending Review' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: COLORS.textDark, margin: 0 }}>My Products</h1>
        <button 
          onClick={onAddNew}
          style={{ 
            backgroundColor: COLORS.accent, color: COLORS.white, border: 'none', 
            padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(255, 107, 53, 0.2)'
          }}
        >
          + Add New Product
        </button>
      </div>

      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #EDF2F7' }}>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>PRODUCT NAME</th>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>CATEGORY</th>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>PRICE</th>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>STOCK</th>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>STATUS</th>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                <td style={{ padding: '16px 0', fontWeight: 'bold', color: COLORS.textDark }}>{p.name}</td>
                <td style={{ padding: '16px 0', color: COLORS.textLight }}>{p.category}</td>
                <td style={{ padding: '16px 0', color: COLORS.textDark }}>{p.price}</td>
                <td style={{ padding: '16px 0', color: p.stock === 0 ? '#E53E3E' : COLORS.textDark }}>{p.stock}</td>
                <td style={{ padding: '16px 0' }}>
                  <span style={{ 
                    padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: p.status === 'Approved' ? '#C6F6D5' : p.status === 'Pending Review' ? '#FEEBC8' : '#FED7D7',
                    color: p.status === 'Approved' ? '#276749' : p.status === 'Pending Review' ? '#C05621' : '#C53030'
                  }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '16px 0' }}>
                  <button style={{ color: COLORS.primary, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px' }}>Edit</button>
                  <button style={{ color: '#E53E3E', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
