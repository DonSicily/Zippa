import React, { useEffect, useState } from 'react';
import { getVendorOrders, updateOrderStatus } from '../services/vendorService';
import { Card, StatusPill, Button } from './ui';
import { COLORS } from '../utils/colors';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = () => {
    setLoading(true);
    getVendorOrders()
      .then(b => setOrders(Array.isArray(b) ? b : (b?.data || [])))
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const markShipped = async (o) => {
    setBusyId(o._id);
    try { await updateOrderStatus(o._id, 'Shipped to Hub'); load(); }
    catch (e) { window.alert(e.response?.data?.message || 'Failed to update order.'); }
    finally { setBusyId(null); }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>Order Management</h1>
          <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Fulfill and track your customer orders.</p>
        </div>
        <Button>📥 Export CSV</Button>
      </div>

      {loading ? (
        <div style={{ color: COLORS.textSecondary, fontSize: '14px', padding: '40px 0', textAlign: 'center' }}>Loading orders…</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {orders.map((o) => (
            <Card key={o._id} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', color: COLORS.navy, fontSize: '15px' }}>{o.orderNumber || String(o._id).slice(-6).toUpperCase()}</span>
                <StatusPill status={o.status} />
              </div>
              <div style={{ fontSize: '13px', color: COLORS.textSecondary }}>{new Date(o.createdAt || o.date).toLocaleDateString()}</div>
              <div style={{ fontSize: '15px', color: COLORS.textPrimary, fontWeight: '500' }}>
                {o.items?.map(i => `${i.name} (x${i.quantity})`).join(', ') || o.itemsSummary || '—'}
              </div>
              <div style={{ fontSize: '13px', color: COLORS.textSecondary, borderTop: `1px solid ${COLORS.border}`, paddingTop: '14px', display: 'flex', gap: '8px' }}>
                📍 <span>{o.shippingAddress?.campus || o.shippingAddress?.line1 || o.address || '—'}</span>
              </div>
              {o.status === 'Pending' && (
                <Button variant="secondary" disabled={busyId === o._id} onClick={() => markShipped(o)} style={{ marginTop: 'auto' }}>
                  {busyId === o._id ? 'Updating…' : 'Mark as Shipped to Hub'}
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManager;
