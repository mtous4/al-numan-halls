'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { getCustomers, createUser, updateUser } from '@/lib/data';

function CustomerManagementContent() {
  const { user, isAdmin, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    phone: '',
  });

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
      return;
    }
    if (user && isAdmin) {
      loadCustomers();
    }
  }, [user, loading, isAuthenticated, isAdmin]);

  const loadCustomers = () => {
    setCustomers(getCustomers());
  };

  const handleOpenCreate = () => {
    setEditCustomer(null);
    setFormData({ name: '', username: '', password: '', phone: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (cust) => {
    setEditCustomer(cust);
    setFormData({
      name: cust.name,
      username: cust.username,
      password: cust.password,
      phone: cust.phone || '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editCustomer) {
      updateUser(editCustomer.id, formData);
    } else {
      createUser(formData);
    }
    setShowModal(false);
    loadCustomers();
  };

  const handleToggleStatus = (cust) => {
    updateUser(cust.id, { enabled: !cust.enabled });
    loadCustomers();
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" /></div>;
  if (!user || !isAdmin) return null;

  const filtered = customers.filter(c =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm)
  );

  return (
    <>
      <Header />
      <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: 'var(--off-white)' }}>
        <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
          {/* Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Link href="/admin" className="text-muted text-sm">لوحة الإدارة</Link>
                <span className="text-muted text-sm">/</span>
                <span className="text-gold text-sm">إدارة حسابات العملاء</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: 'var(--space-1)', margin: 0 }}>
                حسابات العملاء المشتركين
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <button onClick={handleOpenCreate} className="btn btn-primary btn-sm">
                + إنشاء حساب عميل جديد
              </button>
              <Link href="/admin" className="btn btn-secondary btn-sm">
                الرجوع للإدارة
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="card" style={{ padding: 'var(--space-4) var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <input
              type="text"
              className="form-input"
              placeholder="🔍 بحث بالاسم، اسم المستخدم، أو رقم الهاتف..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>اسم العميل</th>
                  <th>اسم المستخدم (Login)</th>
                  <th>كلمة المرور</th>
                  <th>الهاتف</th>
                  <th>تاريخ الإنشاء</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 'bold' }}>{c.name}</td>
                    <td style={{ direction: 'ltr', textAlign: 'right' }}><code>{c.username}</code></td>
                    <td style={{ direction: 'ltr', textAlign: 'right' }}><code>{c.password}</code></td>
                    <td>{c.phone || '—'}</td>
                    <td>{c.createdAt}</td>
                    <td>
                      {c.enabled ? (
                        <span className="badge badge-success">نشط ومفعل</span>
                      ) : (
                        <span className="badge badge-error">معطل</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <button
                          onClick={() => handleOpenEdit(c)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                        >
                          ✏️ تعديل
                        </button>
                        <button
                          onClick={() => handleToggleStatus(c)}
                          className="btn btn-secondary btn-sm"
                          style={{
                            padding: '2px 8px',
                            fontSize: '0.75rem',
                            color: c.enabled ? 'var(--error)' : 'var(--success)',
                            borderColor: c.enabled ? 'var(--error)' : 'var(--success)'
                          }}
                        >
                          {c.enabled ? 'تعطيل' : 'تفعيل'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)' }}>
                {editCustomer ? 'تعديل بيانات العميل' : 'إنشاء حساب عميل جديد'}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">اسم العميل الكامل *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="مثال: أحمد محمد القيسي"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">اسم المستخدم لتسجيل الدخول *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="مثال: ahmed2026"
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    style={{ direction: 'ltr', textAlign: 'right' }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">كلمة المرور *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="كلمة مرور الدخول"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    style={{ direction: 'ltr', textAlign: 'right' }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">رقم الهاتف للتواصل</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="079XXXXXXX"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  {editCustomer ? 'حفظ التعديلات' : 'إنشاء الحساب وتفعيل الدعوة'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function CustomerManagementPage() {
  return (
    <AuthProvider>
      <CustomerManagementContent />
    </AuthProvider>
  );
}
