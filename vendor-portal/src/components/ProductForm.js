import React, { useRef, useState } from 'react';
import { useProductStore } from '../store/productStore';
import { updateVendorProduct } from '../services/vendorService';
import { Card, Button, Input, SectionHeader } from './ui';
import { COLORS } from '../utils/colors';

const ProductForm = ({ onClose, editData }) => {
  const { addProduct, loading, fetchProducts } = useProductStore();
  const fileRef = useRef(null);
  const [images, setImages] = useState([]);
  const [formError, setFormError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: editData?.name || '',
    category: editData?.category || 'Electronics',
    description: editData?.description || '',
    factoryPrice: editData?.factoryPrice || '',
    retailPrice: editData?.retailPrice || '',
    origin: editData?.origin || 'Guangzhou',
  });

  const isEditing = Boolean(editData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    images.forEach((f) => fd.append('images', f));

    try {
      if (isEditing) {
        await updateVendorProduct(editData._id, fd);
      } else {
        const res = await addProduct(fd);
        if (!res.success) throw new Error(res.message || 'Failed to submit product.');
      }
      
      // Refresh the list to show changes immediately
      fetchProducts();
      onClose();
    } catch (err) {
      setFormError(err.message || 'An error occurred while saving.');
    }
  };

  const selectStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px', border: `1px solid ${COLORS.border}`,
    fontSize: '14px', boxSizing: 'border-box', outline: 'none', backgroundColor: COLORS.white,
    fontFamily: 'inherit', color: COLORS.textPrimary, marginBottom: '16px',
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>
            {isEditing ? 'Update product details and pricing.' : 'Submitted items go through Bestiez QC before going Live.'}
          </p>
        </div>
        <button onClick={onClose} style={{ width: '40px', height: '40px', borderRadius: '50%', border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.white, fontSize: '18px', cursor: 'pointer', color: COLORS.textSecondary }}>×</button>
      </div>

      <Card style={{ padding: '32px' }}>
        {formError && (
          <div style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '10px', backgroundColor: COLORS.dangerBg, color: COLORS.danger, fontSize: '13px', fontWeight: '600' }}>
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <SectionHeader color={COLORS.coral}>Product Details</SectionHeader>
          <Input label="Product Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Wireless Earbuds Pro" />

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: COLORS.textSecondary, fontSize: '13px' }}>Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={selectStyle}>
                <option>Electronics</option><option>Fashion</option><option>Beauty</option><option>Home</option><option>Bags</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: COLORS.textSecondary, fontSize: '13px' }}>Ship From</label>
              <select value={formData.origin} onChange={(e) => setFormData({ ...formData, origin: e.target.value })} style={selectStyle}>
                <option>Guangzhou</option><option>Shenzhen</option><option>Yiwu</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: COLORS.textSecondary, fontSize: '13px' }}>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the product features..." rows="4" style={{ ...selectStyle, resize: 'vertical', marginBottom: 0 }} />
          </div>

          <SectionHeader color={COLORS.gold}>Pricing</SectionHeader>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}><Input label="Factory Price (¥)" type="number" value={formData.factoryPrice} onChange={(e) => setFormData({ ...formData, factoryPrice: e.target.value })} placeholder="0.00" /></div>
            <div style={{ flex: 1 }}><Input label="Retail Price (¥)" type="number" value={formData.retailPrice} onChange={(e) => setFormData({ ...formData, retailPrice: e.target.value })} placeholder="0.00" /></div>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: COLORS.textSecondary, fontSize: '13px' }}>Product Images</label>
            <div onClick={() => fileRef.current.click()} style={{ border: `2px dashed ${COLORS.gold}`, borderRadius: '12px', padding: '28px', textAlign: 'center', color: COLORS.textSecondary, cursor: 'pointer', backgroundColor: COLORS.cream, fontSize: '13px' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📷</div>
              {images.length > 0 ? `${images.length} new image(s) selected` : (isEditing ? 'Click to upload new images (or leave blank to keep existing)' : 'Click to upload images (Max 5)')}
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => setImages(Array.from(e.target.files).slice(0, 5))} />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Saving…' : (isEditing ? 'Save Changes' : 'Submit for Approval')}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;
