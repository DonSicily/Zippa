import React, { useState } from 'react';
import { COLORS } from '../utils/colors';

const STATUS_MAP = {
  'Approved':       { label: 'Live',         bg: COLORS.successBg, text: COLORS.success },
  'Pending Review': { label: 'Pending QC',   bg: COLORS.warningBg, text: COLORS.warning },
  'Out of Stock':   { label: 'Out of Stock', bg: COLORS.dangerBg,  text: COLORS.danger },
};

const TABS = [
  { key: 'All', status: null },
  { key: 'Live', status: 'Approved' },
  { key: 'Pending', status: 'Pending Review' },
  { key: 'Out of Stock', status: 'Out of Stock' },
];

const ProductList = ({ onAddNew }) => {
  const [activeTab, setActiveTab] = useState('All');

  const products = [
    { id: 1, name: 'Wireless Earbuds Pro', category: 'Electronics', price: '¥120', stock: 450, sold: 142, rating: 4.8, status: 'Approved', emoji: '🎧' },
    { id: 2, name: 'Smart Fitness Watch', category: 'Electronics', price: '¥85', stock: 120, sold: 98, rating: 4.7, status: 'Approved', emoji: '⌚' },
    { id: 3, name: 'Canvas Backpack', category: 'Bags', price: '¥45', stock: 0, sold: 76, rating: 4.6, status: 'Out of Stock', emoji: '🎒' },
    { id: 4, name: 'LED Desk Lamp', category: 'Home', price: '¥30', stock: 200, sold: 0, rating: null, status: 'Pending Review', emoji: '💡' },
  ];

  const countFor = (tab) => tab.status ? products.filter(p => p.status === tab.status).length : products.length;
  const activeStatus = TABS.find(t => t.key === activeTab)?.status;
  const visible = activeStatus ? products.filter(p => p.status === activeStatus) : products;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>My Products</h1>
          <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Manage your catalogue and stock levels.</p>
        </div>
        <button
          onClick={onAddNew}
          style={{
            backgroundColor: COLORS.coral, color: COLORS.white, border: 'none',
            padding: '12px 24px', borderRadius: '999px', fontWeight: '600', fontSize: '14px',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(241, 96, 46, 0.25)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
        >
          <span style={{ fontSize: '16px', lineHeight: 1 }}>＋</span> Add Product
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '28px', borderBottom: `1px solid ${COLORS.border}`, marginBottom: '8px' }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '12px 2px', cursor: 'pointer', fontSize: '14px',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? COLORS.navy : COLORS.textSecondary,
                borderBottom: isActive ? `3px solid ${COLORS.gold}` : '3px solid transparent',
                marginBottom: '-1px', transition: 'all 0.2s ease',
              }}
            >
              {tab.key} ({countFor(tab)})
            </div>
          );
        })}
      </div>
      <div style={{ color: COLORS.textMuted, fontSize: '12px', marginBottom: '24px' }}>
        Live: {countFor(TABS[1])} · Pending: {countFor(TABS[2])} · Out of Stock: {countFor(TABS[3])}
      </div>

      {/* Product Cards */}
      {visible.length === 0 ? (
        <div style={{ backgroundColor: COLORS.white, borderRadius: '16px', padding: '60px 24px', textAlign: 'center', border: `1px solid ${COLORS.border}`, color: COLORS.textSecondary, fontSize: '14px' }}>
          No products in this view yet.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {visible.map((p) => {
            const status = STATUS_MAP[p.status];
            return (
              <div key={p.id} style={{ backgroundColor: COLORS.white, borderRadius: '16px', padding: '20px', boxShadow: COLORS.shadow, border: `1px solid ${COLORS.border}` }}>
                {/* Top row: tile + name + pill */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '12px', backgroundColor: '#EFE7D8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>
                    {p.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: COLORS.navy, fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>{p.name}</div>
                    <div style={{ color: COLORS.textSecondary, fontSize: '13px' }}>{p.category} · <span style={{ color: COLORS.textPrimary, fontWeight: '600' }}>{p.price}</span></div>
                  </div>
                  <span style={{ padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: '700', backgroundColor: status.bg, color: status.text, whiteSpace: 'nowrap' }}>
                    {status.label}
                  </span>
                </div>

                {/* Bottom row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${COLORS.border}`, marginTop: '16px', paddingTop: '14px' }}>
                  <div style={{ color: COLORS.textSecondary, fontSize: '13px' }}>
                    {p.status === 'Pending Review'
                      ? '—'
                      : <>{p.sold} sold · <span style={{ color: COLORS.gold, fontWeight: '700' }}>★ {p.rating}</span></>}
                    <span style={{ color: COLORS.textMuted }}> · Stock {p.stock}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ background: 'none', border: 'none', color: COLORS.navy, fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Edit</button>
                    <button style={{ background: 'none', border: 'none', color: COLORS.danger, fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;
