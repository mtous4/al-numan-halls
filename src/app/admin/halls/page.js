'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { getAllHalls, saveHall } from '@/lib/data';

function AdminHallsContent() {
  const { user, isAdmin, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [halls, setHalls] = useState([]);
  const [editingHall, setEditingHall] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    capacity: 500,
    area: '',
    priceRange: '',
    description: '',
  });

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
      return;
    }
    if (user && isAdmin) {
      loadHalls();
    }
  }, [user, loading, isAuthenticated, isAdmin]);

  const loadHalls = () => {
    setHalls(getAllHalls());
  };

  const handleOpenEdit = (hall) => {
    setEditingHall(hall);
    setFormData({
      name: hall.name,
      nameEn: hall.nameEn,
      capacity: hall.capacity,
      area: hall.area,
      priceRange: hall.priceRange,
      description: hall.description,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingHall) {
      saveHall(editingHall.id, formData);
      setEditingHall(null);
      loadHalls();
    }
  };

  const handleToggleActive = (hall) => {
    saveHall(hall.id, { active: !hall.active });
    loadHalls();
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" /></div>;
  if (!user || !isAdmin) return null;

  return (
    <>
      <Header />
      <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: 'var(--off-white)' }}>
        <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Link href="/admin" className="text-muted text-sm">لوحة الإدارة</Link>
                <span className="text-muted text-sm">/</span>
                <span className="text-gold text-sm">إدارة القاعات</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: 'var(--space-1)', margin: 0 }}>
                قاعات النعمان ومواصفاتها
              </h2>
            </div>
            <Link href="/admin" className="btn btn-secondary btn-sm">الرجوع للإدارة</Link>
          </div>

          <div className="grid grid-3" style={{ gap: 'var(--space-6)' }}>
            {halls.map(hall => (
              <div key={hall.id} className="card">
                <img src={hall.image} alt={hall.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                <div style={{ padding: 'var(--space-5)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>{hall.name}</h3>
                    <span className="badge badge-gold">{hall.priceRange}</span>
                  </div>
                  <p style={{ color: 'var(--warm-gray-600)', fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                    {hall.description.substring(0, 90)}...
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', fontSize: '0.8rem', color: 'var(--warm-gray-700)' }}>
                    <span>👥 السعة: {hall.capacity}</span>
                    <span>•</span>
                    <span>📐 {hall.area}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button onClick={() => handleOpenEdit(hall)} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                      ✏️ تعديل
                    </button>
                    <button
                      onClick={() => handleToggleActive(hall)}
                      className="btn btn-secondary btn-sm"
                      style={{
                        color: hall.active ? 'var(--error)' : 'var(--success)',
                        borderColor: hall.active ? 'var(--error)' : 'var(--success)'
                      }}
                    >
                      {hall.active ? 'إخفاء' : 'إظهار'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingHall && (
        <div className="modal-overlay" onClick={() => setEditingHall(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)' }}>تعديل قاعة: {editingHall.name}</h3>
              <button onClick={() => setEditingHall(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">اسم القاعة *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">الاسم بالإنجليزية</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.nameEn}
                    onChange={e => setFormData({ ...formData, nameEn: e.target.value })}
                  />
                </div>
                <div className="grid grid-2" style={{ gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label">السعة القصوى</label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.capacity}
                      onChange={e => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">المساحة</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.area}
                      onChange={e => setFormData({ ...formData, area: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">نطاق السعر التقديري</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.priceRange}
                    onChange={e => setFormData({ ...formData, priceRange: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">الوصف التفصيلي</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">حفظ التغييرات</button>
                <button type="button" onClick={() => setEditingHall(null)} className="btn btn-secondary">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function AdminHallsPage() {
  return (
    <AuthProvider>
      <AdminHallsContent />
    </AuthProvider>
  );
}
