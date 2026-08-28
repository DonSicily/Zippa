import React, { useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import { Card, StatusPill, TabBar, Button } from './ui';
import { COLORS } from '../utils/colors';

const CATEGORY_EMOJI = { Electronics: '🔌', Fashion: '👕', Beauty: '🧴', Home: '💡', Bags: '🎒' };

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'Approved', label: 'Live' },
  { key: 'Pending Review', label: 'Pending' },
  { key: 'Out of Stock', label: 'Out of Stock' },
];

const ProductList = ({ onAddNew }) => {
  const { products, loading, error, filters, pagination, setFilters, fetchProducts, removeProduct } = useProductStore();

  useEffect(() => { fetchProducts(); }, []); // eslint-disable-line

  const countFor = (key) => key === 'all'
    ? (pagination.totalItems || products.length)
    : products.filter(p => p.status === key).length;

  const handleDelete = (p) => {
    if (window.confirm(`Delete "${p.name}"?`)) removeProduct(p._id);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>My Products</h1>
          <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Manage your catalogue and stock levels.</p>
        </div>
        <Button onClick={onAddNew} style={{ borderRadius: '999px' }}>＋ Add Product</Button>
      </div>

      <TabBar
        tabs={TABS.map(t => ({ ...t, count: countFor(t.key) }))}
        activeTab={filters.status}
        onChange={(key) => setFilters({ status: key })}
      />
      <div style={{ color: COLORS.textMuted, fontSize: '12px', marginBottom: '24px' }}>
        Live: {countFor('Approved')} · Pending: {countFor('Pending Review')} · Out of Stock: {countFor('Out of Stock')}
      </div>

      {error && (
        <div style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '10px', backgroundColor: COLORS.dangerBg, color: COLORS.danger, fontSize: '13px', fontWeight: '600' }}>
          {error}
        </div>
      )}

      {loading && products.length === 0 ? (
        <div style={{ color: COLORS.textSecondary, fontSize: '14px', padding: '40px 0', textAlign: 'center' }}>Loading products…</div>
      ) : products.length === 0 ? (
        <Card style={{ padding: '60px 24px', textAlign: 'center', color: COLORS.textSecondary, fontSize: '14px' }}>No products in this view yet.</Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {products.map((p) => (
            <Card key={p._id} style={{ padding: '20px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '12px', backgroundColor: '#EFE7D8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0, overflow: 'hidden' }}>
                  {p.images?.[0]
                    ? <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : (CATEGORY_EMOJI[p.category] || '📦')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: COLORS.navy, fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>{p.name}</div>
                  <div style={{ color: COLORS.textSecondary, fontSize: '13px' }}>
                    {p.category} · <span style={{ color: COLORS.textPrimary, fontWeight: '600' }}>¥{p.retailPrice ?? p.price ?? 0}</span>
                  </div>
                </div>
                <StatusPill status={p.status} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${COLORS.border}`, marginTop: '16px', paddingTop: '14px' }}>
                <div style={{ color: COLORS.textSecondary, fontSize: '13px' }}>
                  {p.status === 'Pending Review' ? '—' : <>
                    {p.soldCount ?? p.sold ?? 0} sold{p.rating != null && <> · <span style={{ color: COLORS.gold, fontWeight: '700' }}>★ {p.rating}</span></>}
                  </>}
                  <span style={{ color: p.stock === 0 ? COLORS.danger : COLORS.textMuted }}> · Stock {p.stock ?? 0}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{ background: 'none', border: 'none', color: COLORS.navy, fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(p)} style={{ background: 'none', border: 'none', color: COLORS.danger, fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
