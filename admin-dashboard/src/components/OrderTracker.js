import React, { useEffect, useState } from 'react';
import { Download, Truck, CheckCircle } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { exportShipmentsCSV, schedulePickup } from '../services/adminService';
import ShipmentPipeline from './ShipmentPipeline';
import WorldMap from './WorldMap';
import { COLORS, SHADOWS } from '../utils/colors';

const SEED_PIPELINE = [
  { stage: 'Confirmed', count: 45, color: '#3B82F6' },
  { stage: 'China Hub', count: 120, color: '#8B5CF6' },
  { stage: 'SPEEDAF Transit', count: 85, color: COLORS.gold },
  { stage: 'Customs (Lagos)', count: 30, color: COLORS.success },
  { stage: 'Campus Pickup', count: 12, color: COLORS.coral },
];

const SEED_SHIPMENTS = [
  { id: 'SPD-9921', orders: 14, weight: '12.5kg', status: 'In Transit', eta: 'Nov 18, 2024', note: 'In Transit to Lagos' },
  { id: 'SPD-9922', orders: 8, weight: '5.4kg', status: 'Customs', eta: 'Nov 19, 2024', note: 'Customs Clearance' },
  { id: 'SPD-9923', orders: 20, weight: '18.2kg', status: 'Arrived', eta: 'Nov 17, 2024', note: 'Arrived at China Hub' },
  { id: 'SPD-9918', orders: 5, weight: '4.1kg', status: 'Confirmed', eta: 'Nov 16, 2024', note: 'Confirmed at Origin' },
];

const statusStyle = (s) => ({
  'In Transit': { bg: COLORS.warningBg, color: '#92400E' },
  'Customs': { bg: COLORS.successBg, color: COLORS.success },
  'Arrived': { bg: COLORS.infoBg, color: COLORS.info },
  'Confirmed': { bg: COLORS.infoBg, color: COLORS.info },
}[s] || { bg: COLORS.borderLight, color: COLORS.textMuted });

const RANGES = [{ id: '24h', label: 'Last 24h' }, { id: '7d', label: 'Last 7 days' }, { id: '30d', label: 'Last 30 days' }];

const OrderTracker = () => {
  const { logisticsPipeline, activeShipments, shipmentRange, setShipmentRange, fetchLogistics } = useAdminStore();
  const [rangeOpen, setRangeOpen] = useState(false);
  const [pickupDone, setPickupDone] = useState(false);

  useEffect(() => { fetchLogistics(); }, [fetchLogistics]);

  const pipeline = logisticsPipeline.length ? logisticsPipeline : SEED_PIPELINE;
  const shipments = activeShipments.length ? activeShipments : SEED_SHIPMENTS;

  const downloadBlob = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'bestiez-shipments.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = async () => {
    try {
      const res = await exportShipmentsCSV();
      downloadBlob(res.data);
    } catch (err) {
      const rows = [['SPEEDAF ID', 'Origin', 'Destination', 'Orders', 'Weight', 'Status', 'ETA'],
        ...shipments.map((s) => [s.id, 'China Hub', 'Lagos Hub', s.orders, s.weight, s.status, s.eta])];
      downloadBlob(new Blob([rows.map((r) => r.join(',')).join('\n')], { type: 'text/csv' }));
    }
  };

  const handleSchedulePickup = async () => {
    try { await schedulePickup({ hub: 'China Hub' }); } catch (err) { /* demo mode */ }
    setPickupDone(true);
    setTimeout(() => setPickupDone(false), 3000);
  };

  const cell = { padding: '16px', fontSize: '14px', color: COLORS.textMain };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '24px', fontWeight: '700' }}>Global Logistics</h1>
          <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Track cross-border shipments from China to Nigeria.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleExportCSV} style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: COLORS.textMain }}>
            <Download size={16} /> Export CSV
          </button>
          <button onClick={handleSchedulePickup} disabled={pickupDone} style={{ backgroundColor: pickupDone ? COLORS.success : COLORS.coral, color: COLORS.white, border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            {pickupDone ? <CheckCircle size={16} /> : <Truck size={16} />} {pickupDone ? 'Pickup Scheduled' : 'Schedule Pickup'}
          </button>
        </div>
      </div>

      {/* Pipeline (extracted) */}
      <ShipmentPipeline pipeline={pipeline} />

      {/* Map + Active Shipments list */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ backgroundColor: COLORS.white, padding: '20px', borderRadius: '12px', boxShadow: SHADOWS.card, border: `1px solid ${COLORS.gold}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: COLORS.navy }}>Active Shipments</h3>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setRangeOpen(!rangeOpen)} style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, padding: '6px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', color: COLORS.textMain }}>
                {RANGES.find((r) => r.id === shipmentRange)?.label || 'Last 24h'} ▾
              </button>
              {rangeOpen && (
                <div style={{ position: 'absolute', right: 0, top: '32px', backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: '8px', boxShadow: SHADOWS.modal, zIndex: 20, minWidth: '130px', overflow: 'hidden' }}>
                  {RANGES.map((r) => (
                    <div key={r.id} onClick={() => { setShipmentRange(r.id); setRangeOpen(false); }} style={{ padding: '8px 12px', fontSize: '13px', cursor: 'pointer', backgroundColor: r.id === shipmentRange ? COLORS.cream : COLORS.white }}>
                      {r.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <WorldMap />
        </div>

        <div style={{ backgroundColor: COLORS.white, padding: '20px', borderRadius: '12px', boxShadow: SHADOWS.card }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: COLORS.navy }}>Active Shipments</h3>
          {shipments.slice(0, 3).map((s) => {
            const st = statusStyle(s.status);
            return (
              <div key={s.id} style={{ border: `1px solid ${COLORS.border}`, borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                <div style={{ fontWeight: '700', fontSize: '14px', color: COLORS.navy }}>{s.id}</div>
                <div style={{ fontSize: '12px', color: COLORS.textMuted, margin: '4px 0 8px' }}>{s.orders} orders · {s.weight}</div>
                <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', backgroundColor: st.bg, color: st.color }}>{s.note || s.status}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shipments Table */}
      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: SHADOWS.card, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: `1px solid ${COLORS.border}` }}>
              {['SPEEDAF ID', 'Origin → Destination', 'Orders', 'Weight', 'Status', 'ETA', 'Action'].map((h) => (
                <th key={h} style={{ padding: '16px', color: COLORS.textMuted, fontSize: '12px', fontWeight: '600' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => {
              const st = statusStyle(s.status);
              return (
                <tr key={s.id} style={{ borderBottom: `1px solid ${COLORS.borderLight}` }}>
                  <td style={{ ...cell, fontWeight: '600', color: COLORS.navy }}>{s.id}</td>
                  <td style={cell}>China Hub → Lagos Hub</td>
                  <td style={cell}>{s.orders}</td>
                  <td style={cell}>{s.weight}</td>
                  <td style={cell}><span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', backgroundColor: st.bg, color: st.color }}>{s.status}</span></td>
                  <td style={cell}>{s.eta}</td>
                  <td style={cell}><a href="#" onClick={(e) => e.preventDefault()} style={{ color: COLORS.coral, fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>Track</a></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTracker;
