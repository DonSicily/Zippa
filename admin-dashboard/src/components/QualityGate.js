import React, { useEffect, useState } from 'react';
import { Eye, CheckCircle, AlertTriangle, ChevronDown, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useQualityStore } from '../store/qualityStore';
import QualityScoreRing from './QualityScoreRing';
import { COLORS, SHADOWS } from '../utils/colors';

const TABS = [{ id: 'all', label: 'All' }, { id: 'pending', label: 'Pending' }, { id: 'flagged', label: 'Flagged' }];

const QualityGate = () => {
  const {
    pendingProducts, loading, actionLoading, qualityStats,
    filter, selectedIds, page, pageSize,
    setFilter, setPage, toggleSelect, toggleSelectAll,
    fetchPendingProducts, fetchQualityStats,
    handleApprove, handleReject, handleBulkAction,
  } = useQualityStore();
  const [bulkOpen, setBulkOpen] = useState(false);

  useEffect(() => {
    fetchPendingProducts();
    fetchQualityStats();
  }, [fetchPendingProducts, fetchQualityStats]);

  const filtered = filter === 'all'
    ? pendingProducts
    : pendingProducts.filter((p) => p.status.toLowerCase() === filter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const onReject = async (id) => {
    const reason = window.prompt('Reason for rejection (sent to vendor):');
    if (reason === null) return;
    await handleReject(id, reason || 'Did not meet quality standards');
  };

  const onBulk = async (action) => {
    setBulkOpen(false);
    if (!selectedIds.length) return;
    if (action === 'reject') {
      const reason = window.prompt(`Reason for rejecting ${selectedIds.length} product(s):`);
      if (reason === null) return;
      await handleBulkAction('reject', reason || 'Did not meet quality standards');
    } else {
      await handleBulkAction('approve');
    }
  };

  const pills = [
    { label: 'Pending', value: qualityStats.pending, bg: COLORS.warningBg, color: '#92400E', dot: COLORS.warning },
    { label: 'Approved today', value: qualityStats.approvedToday, bg: COLORS.successBg, color: COLORS.success, dot: COLORS.success },
    { label: 'Rejected today', value: qualityStats.rejectedToday, bg: COLORS.dangerBg, color: COLORS.danger, dot: COLORS.danger },
  ];

  const cell = { padding: '16px', fontSize: '14px', color: COLORS.textMain };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '24px', fontWeight: '700' }}>Quality Gate</h1>
          <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>{qualityStats.pending} items pending review</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: '8px', padding: '4px' }}>
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setFilter(t.id)} style={{ border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', backgroundColor: filter === t.id ? COLORS.infoBg : 'transparent', color: filter === t.id ? COLORS.info : COLORS.textMuted }}>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setBulkOpen(!bulkOpen)} style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, padding: '9px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: COLORS.textMain }}>
              Bulk Actions {selectedIds.length > 0 && `(${selectedIds.length})`} <ChevronDown size={14} />
            </button>
            {bulkOpen && (
              <div style={{ position: 'absolute', right: 0, top: '40px', backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: '8px', boxShadow: SHADOWS.modal, zIndex: 30, minWidth: '170px', overflow: 'hidden' }}>
                <div onClick={() => onBulk('approve')} style={{ padding: '10px 14px', fontSize: '13px', cursor: 'pointer', color: COLORS.success, fontWeight: '600' }}>Approve Selected</div>
                <div onClick={() => onBulk('reject')} style={{ padding: '10px 14px', fontSize: '13px', cursor: 'pointer', color: COLORS.danger, fontWeight: '600', borderTop: `1px solid ${COLORS.borderLight}` }}>Reject Selected</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status pills */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {pills.map((p, i) => (
          <span key={i} style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: COLORS.textMain, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: SHADOWS.card }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: p.dot }} />
            {p.label}
            <span style={{ backgroundColor: p.bg, color: p.color, padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>{p.value}</span>
          </span>
        ))}
      </div>

      {/* Table */}
      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: SHADOWS.card, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: `1px solid ${COLORS.border}` }}>
              <th style={{ padding: '16px', width: '40px' }}>
                <input type="checkbox" checked={pageItems.length > 0 && selectedIds.length === pageItems.length} onChange={() => toggleSelectAll(pageItems.map((p) => p._id))} />
              </th>
              {['Product', 'Vendor', 'Price', 'Submitted', 'Assets', 'Quality Score', 'Status', 'Actions'].map((h) => (
                <th key={h} style={{ padding: '16px', color: COLORS.textMuted, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageItems.map((p) => (
              <tr key={p._id} style={{ borderBottom: `1px solid ${COLORS.borderLight}` }}>
                <td style={{ padding: '16px' }}>
                  <input type="checkbox" checked={selectedIds.includes(p._id)} onChange={() => toggleSelect(p._id)} />
                </td>
                <td style={cell}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: COLORS.borderLight, borderRadius: '8px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '600', color: COLORS.textMain }}>{p.name}</div>
                      <div style={{ color: COLORS.textMuted, fontSize: '12px' }}>{p.sku}</div>
                    </div>
                  </div>
                </td>
                <td style={cell}>
                  <div style={{ fontWeight: '600' }}>{p.vendor}</div>
                  <div style={{ color: COLORS.textMuted, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={11} /> {p.loc}</div>
                </td>
                <td style={{ ...cell, fontWeight: '600' }}>{p.price}</td>
                <td style={{ ...cell, color: COLORS.textMuted }}>{p.submitted}</td>
                <td style={cell}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {p.assets} image{p.assets !== 1 ? 's' : ''}
                    {p.assetsOk
                      ? <CheckCircle size={14} color={COLORS.success} />
                      : <AlertTriangle size={14} color={p.assets <= 1 ? COLORS.danger : COLORS.warning} />}
                  </span>
                </td>
                <td style={cell}><QualityScoreRing score={p.score} /></td>
                <td style={cell}>
                  <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', backgroundColor: p.status === 'Pending' ? COLORS.warningBg : COLORS.dangerBg, color: p.status === 'Pending' ? '#92400E' : COLORS.danger }}>
                    {p.status}
                  </span>
                </td>
                <td style={cell}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button onClick={() => handleApprove(p._id)} disabled={actionLoading !== null} style={{ backgroundColor: COLORS.success, color: COLORS.white, border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', opacity: actionLoading !== null ? 0.6 : 1 }}>Approve</button>
                    <button onClick={() => onReject(p._id)} disabled={actionLoading !== null} style={{ backgroundColor: COLORS.white, color: COLORS.danger, border: `1px solid ${COLORS.danger}`, padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', opacity: actionLoading !== null ? 0.6 : 1 }}>Reject</button>
                    <Eye size={16} color={COLORS.textMuted} style={{ cursor: 'pointer' }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && pageItems.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: COLORS.textMuted }}>Loading review queue…</div>}
        {!loading && filtered.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: COLORS.textMuted }}>All caught up! No {filter !== 'all' ? filter : ''} products.</div>}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div style={{ padding: '16px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px', color: COLORS.textMuted, fontSize: '13px' }}>
            Showing {start + 1}–{Math.min(start + pageSize, filtered.length)} of {filtered.length}
            <div style={{ display: 'flex', gap: '6px' }}>
              <button disabled={safePage === 1} onClick={() => setPage(safePage - 1)} style={{ border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.white, borderRadius: '6px', padding: '4px 8px', cursor: safePage === 1 ? 'default' : 'pointer', opacity: safePage === 1 ? 0.5 : 1 }}><ChevronLeft size={14} /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)} style={{ border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '13px', cursor: 'pointer', backgroundColor: n === safePage ? COLORS.navy : COLORS.white, color: n === safePage ? COLORS.white : COLORS.textMain, fontWeight: n === safePage ? '700' : '400' }}>{n}</button>
              ))}
              <button disabled={safePage === totalPages} onClick={() => setPage(safePage + 1)} style={{ border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.white, borderRadius: '6px', padding: '4px 8px', cursor: safePage === totalPages ? 'default' : 'pointer', opacity: safePage === totalPages ? 0.5 : 1 }}><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QualityGate;
