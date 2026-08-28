import React, { useState } from 'react';
import { COLORS } from '../utils/colors';

const inputStyle = (focused) => ({
  width: '100%', padding: '12px 16px', borderRadius: '10px',
  border: `1px solid ${focused ? COLORS.gold : COLORS.border}`,
  fontSize: '14px', boxSizing: 'border-box', outline: 'none',
  backgroundColor: COLORS.white, transition: 'border-color 0.2s ease',
  fontFamily: 'inherit', color: COLORS.textPrimary,
});

const Label = ({ children }) => (
  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: COLORS.textSecondary, fontSize: '13px' }}>{children}</label>
);

const SectionHeader = ({ color, children }) => (
  <h3 style={{ color: COLORS.navy, margin: '0 0 20px 0', fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
    <span style={{ width: '4px', height: '18px', backgroundColor: color, borderRadius: '2px' }}></span>
    {children}
  </h3>
);

const ProductForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '', category: 'Electronics', description: '', factoryPrice: '', retailPrice: '', origin: 'Guangzhou',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Product submitted for Bestiez Quality Check!');
    onClose();
  };

  const TextInput = ({ label, type = 'text', value, onChange, placeholder }) => {
    const [focused, setFocused] = useState(false);
    return (
      <div style={{ marginBottom: '16px' }}>
        <Label>{label}</Label>
        <input type={type} value={value} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={inputStyle(focused)} />
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>Add New Product</h1>
          <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Submitted items go through Bestiez QC before going Live.</p>
        </div>
        <button onClick={onClose} style={{ width: '40px', height: '40px', borderRadius: '50%', border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.white, fontSize: '18px', cursor: 'pointer', color: COLORS.textSecondary }}>×</button>
      </div>

      <form onSubmit={handleSubmit} style={{ backgroundColor: COLORS.white, padding: '32px', borderRadius: '16px', boxShadow: COLORS.shadow, border: `1px solid ${COLORS.border}` }}>
        <SectionHeader color={COLORS.coral}>Product Details</SectionHeader>
        <TextInput label="Product Name" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} placeholder="e.g. Wireless Earbuds Pro" />

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, marginBottom: '16px' }}>
            <Label>Category</Label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={inputStyle(false)}>
              <option>Electronics</option><option>Fashion</option><option>Beauty</option><option>Home</option><option>Bags</option>
            </select>
          </div>
          <div style={{ flex: 1, marginBottom: '16px' }}>
            <Label>Ship From</Label>
            <select value={formData.origin} onChange={(e) => setFormData({ ...formData, origin: e.target.value })} style={inputStyle(false)}>
              <option>Guangzhou</option><option>Shenzhen</option><option>Yiwu</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Label>Description</Label>
          <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the product features..." rows="4" style={{ ...inputStyle(false), resize: 'vertical' }} />
        </div>

        <SectionHeader color={COLORS.gold}>Pricing</SectionHeader>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <TextInput label="Factory Price (¥)" type="number" value={formData.factoryPrice} onChange={(v) => setFormData({ ...formData, factoryPrice: v })} placeholder="0.00" />
          </div>
          <div style={{ flex: 1 }}>
            <TextInput label="Retail Price (¥)" type="number" value={formData.retailPrice} onChange={(v) => setFormData({ ...formData, retailPrice: v })} placeholder="0.00" />
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <Label>Product Images</Label>
          <div style={{ border: `2px dashed ${COLORS.gold}`, borderRadius: '12px', padding: '32px', textAlign: 'center', color: COLORS.textSecondary, cursor: 'pointer', backgroundColor: COLORS.cream, fontSize: '13px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📷</div>
            Click to upload images <span style={{ color: COLORS.textMuted }}>(Max 5)</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} style={{ backgroundColor: COLORS.white, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}`, padding: '13px 24px', borderRadius: '12px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
            Cancel
          </button>
          <button type="submit" style={{ backgroundColor: COLORS.coral, color: COLORS.white, border: 'none', padding: '13px 28px', borderRadius: '12px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(241, 96, 46, 0.25)' }}>
            Submit for Approval
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
