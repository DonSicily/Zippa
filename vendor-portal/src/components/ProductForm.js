import React, { useState } from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#1A202C', textLight: '#718096', bg: '#F4F6F8' };

const ProductForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '', category: 'Electronics', description: '', factoryPrice: '', retailPrice: '', origin: 'Guangzhou'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Product submitted for Bestiez Quality Check!');
    onClose();
  };

  const InputGroup = ({ label, type, value, onChange, placeholder }) => (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: COLORS.textDark, fontSize: '14px' }}>{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder}
        style={{ 
          width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', 
          fontSize: '14px', boxSizing: 'border-box', outline: 'none'
        }} 
      />
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: COLORS.textDark, margin: 0 }}>Add New Product</h1>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: COLORS.textLight }}>×</button>
      </div>

      <form onSubmit={handleSubmit} style={{ backgroundColor: COLORS.white, padding: '30px', borderRadius: '12px', maxWidth: '600px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <InputGroup label="Product Name" type="text" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} placeholder="e.g. Wireless Earbuds Pro" />
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: COLORS.textDark, fontSize: '14px' }}>Category</label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}
            >
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Beauty</option>
              <option>Home</option>
              <option>Bags</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: COLORS.textDark, fontSize: '14px' }}>Ship From</label>
            <select 
              value={formData.origin} 
              onChange={(e) => setFormData({...formData, origin: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}
            >
              <option>Guangzhou</option>
              <option>Shenzhen</option>
              <option>Yiwu</option>
            </select>
          </div>
        </div>

        <InputGroup label="Description" type="text" value={formData.description} onChange={(v) => setFormData({...formData, description: v})} placeholder="Describe the product features..." />
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <InputGroup label="Factory Price (¥)" type="number" value={formData.factoryPrice} onChange={(v) => setFormData({...formData, factoryPrice: v})} placeholder="0.00" />
          </div>
          <div style={{ flex: 1 }}>
            <InputGroup label="Retail Price (¥)" type="number" value={formData.retailPrice} onChange={(v) => setFormData({...formData, retailPrice: v})} placeholder="0.00" />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: COLORS.textDark, fontSize: '14px' }}>Product Images</label>
          <div style={{ border: '2px dashed #E2E8F0', borderRadius: '8px', padding: '30px', textAlign: 'center', color: COLORS.textLight, cursor: 'pointer' }}>
            Click to upload images (Max 5)
          </div>
        </div>

        <button 
          type="submit" 
          style={{ 
            width: '100%', backgroundColor: COLORS.accent, color: COLORS.white, border: 'none', 
            padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' 
          }}
        >
          Submit for Approval
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
