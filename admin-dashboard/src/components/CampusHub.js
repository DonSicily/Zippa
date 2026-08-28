import React, { useState } from 'react';
import { GraduationCap, Plus, X, MapPin, Users } from 'lucide-react';
import { createCampus } from '../services/adminService';
import { COLORS, SHADOWS } from '../utils/colors';

const SEED_CAMPUSES = [
  { _id: 'C-1', name: 'UNILAG', city: 'Lagos', share: 35, ambassadors: 12, status: 'Active' },
  { _id: 'C-2', name: 'OAU', city: 'Ile-Ife', share: 25, ambassadors: 9, status: 'Active' },
  { _id: 'C-3', name: 'UI', city: 'Ibadan', share: 20, ambassadors: 7, status: 'Active' },
  { _id: 'C-4', name: 'UNN', city: 'Nsukka', share: 20, ambassadors: 6, status: 'Active' },
];

const CampusHub = () => {
  const [campuses, setCampuses] = useState(SEED_CAMPUSES);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim() || !city.trim()) return;
    setSaving(true);
    try { await createCampus({ name: name.trim(), city: city.trim() }); } catch (err) { /* demo mode */ }
    setCampuses((c) => [...c, { _id: `C-${Date.now()}`, name: name.trim().toUpperCase(), city: city.trim(), share: 0, ambassadors: 0, status: 'Active' }]);
    setName(''); setCity(''); setOpen(false); setSaving(false);
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${COLORS.border}`, fontSize: '14px', boxSizing: 'border-box', outline: 'none' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '24px', fontWeight: '700' }}>Campus Hub</h1>
          <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Active campuses, order share, and ambassador coverage.</p>
        </div>
        <button onClick={() => setOpen(!open)} style={{ backgroundColor: COLORS.coral, color: COLORS.white, border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          {open ? <X size={16} /> : <Plus size={16} />} {open ? 'Cancel' : 'Add Campus'}
        </button>
      </div>

      {open && (
        <form onSubmit={handleAdd} style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: SHADOWS.modal, padding: '24px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'flex-end', border: `1px solid ${COLORS.gold}` }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textMain, fontSize: '13px' }}>Campus Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. FUTA" style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textMain, fontSize: '13px' }}>City</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Akure" style={inputStyle} />
          </div>
          <button type="submit" disabled={saving} style={{ backgroundColor: COLORS.navy, color: COLORS.white, border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Saving…' : 'Create Campus'}
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {campuses.map((c) => (
          <div key={c._id} style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: SHADOWS.card, borderTop: `3px solid ${COLORS.gold}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ backgroundColor: COLORS.navy, padding: '8px', borderRadius: '8px' }}><GraduationCap size={18} color={COLORS.gold} /></div>
              <div>
                <div style={{ fontWeight: '700', color: COLORS.navy, fontSize: '16px' }}>{c.name}</div>
                <div style={{ color: COLORS.textMuted, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={11} /> {c.city}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
              <span style={{ color: COLORS.textMuted }}>Order share</span>
              <span style={{ fontWeight: '700', color: COLORS.textMain }}>{c.share}%</span>
            </div>
            <div style={{ height: '8px', backgroundColor: COLORS.borderLight, borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
              <div style={{ width: `${c.share}%`, height: '100%', backgroundColor: COLORS.navy, borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: COLORS.textMuted }}><Users size={13} /> {c.ambassadors} ambassadors</span>
              <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', backgroundColor: COLORS.successBg, color: COLORS.success }}>{c.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampusHub;
