'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { getInvitations, getUsers, saveInvitation } from '@/lib/data';
import InvitationRenderer from '@/components/invitation/InvitationRenderer';

function InvitationsManagementContent() {
  const { user, isAdmin, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [invitations, setInvitations] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [previewInv, setPreviewInv] = useState(null);

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
      return;
    }
    if (user && isAdmin) {
      loadData();
    }
  }, [user, loading, isAuthenticated, isAdmin]);

  const loadData = () => {
    const invites = getInvitations();
    const users = getUsers();
    const uMap = {};
    users.forEach(u => { uMap[u.id] = u; });
    setUsersMap(uMap);
    setInvitations(invites);
  };

  const handleTogglePublish = (inv) => {
    const newStatus = inv.status === 'published' ? 'draft' : 'published';
    saveInvitation(inv.id, {
      status: newStatus,
      publishedAt: newStatus === 'published' ? new Date().toISOString() : null
    });
    loadData();
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" /></div>;
  if (!user || !isAdmin) return null;

  const filtered = invitations.filter(inv => {
    const wd = inv.weddingData;
    const cust = usersMap[inv.customerId];
    return (
      wd?.groomName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wd?.brideName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.slug?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Header />
      <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: 'var(--off-white)' }}>
        <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
          {/* Top */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Link href="/admin" className="text-muted text-sm">لوحة الإدارة</Link>
                <span className="text-muted text-sm">/</span>
                <span className="text-gold text-sm">إدارة كافة الدعوات</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: 'var(--space-1)', margin: 0 }}>
                سجل الدعوات الإلكترونية
              </h2>
            </div>
            <Link href="/admin" className="btn btn-secondary btn-sm">
              الرجوع للإدارة
            </Link>
          </div>

          {/* Search */}
          <div className="card" style={{ padding: 'var(--space-4) var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <input
              type="text"
              className="form-input"
              placeholder="🔍 بحث باسم العريس، العروس، العميل، أو الرابط..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>صاحب الحساب (العميل)</th>
                  <th>العروسين</th>
                  <th>القالب المختار</th>
                  <th>تاريخ الزفاف</th>
                  <th>حالة النشر</th>
                  <th>الرابط الفريد (Slug)</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inv => {
                  const cust = usersMap[inv.customerId];
                  const wd = inv.weddingData;
                  return (
                    <tr key={inv.id}>
                      <td><strong>{cust?.name || 'غير معروف'}</strong></td>
                      <td>{wd?.groomName || '—'} & {wd?.brideName || '—'}</td>
                      <td><span className="badge badge-gold">{inv.templateId}</span></td>
                      <td>{wd?.weddingDate || '—'}</td>
                      <td>
                        {inv.status === 'published' ? (
                          <span className="badge badge-success">منشورة ومتاحة</span>
                        ) : (
                          <span className="badge badge-warning">مسودة</span>
                        )}
                      </td>
                      <td style={{ direction: 'ltr', textAlign: 'right' }}>
                        {inv.slug ? (
                          <Link href={`/invite/${inv.slug}`} target="_blank" className="text-gold" style={{ fontSize: '0.85rem' }}>
                            /invite/{inv.slug}
                          </Link>
                        ) : '—'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                          <button
                            onClick={() => setPreviewInv(inv)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                          >
                            👁️ معاينة
                          </button>
                          <button
                            onClick={() => handleTogglePublish(inv)}
                            className="btn btn-secondary btn-sm"
                            style={{
                              padding: '2px 8px',
                              fontSize: '0.75rem',
                              color: inv.status === 'published' ? 'var(--error)' : 'var(--success)',
                              borderColor: inv.status === 'published' ? 'var(--error)' : 'var(--success)'
                            }}
                          >
                            {inv.status === 'published' ? 'إلغاء النشر' : 'نشر'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewInv && (
        <div className="modal-overlay" onClick={() => setPreviewInv(null)}>
          <div className="modal-content" style={{ maxWidth: 450, maxHeight: '90vh', padding: 0, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid #ddd', background: 'var(--off-white)' }}>
              <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)' }}>
                معاينة الدعوة: {previewInv.weddingData?.groomName} & {previewInv.weddingData?.brideName}
              </h4>
              <button onClick={() => setPreviewInv(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ height: '70vh', overflowY: 'auto' }}>
              <InvitationRenderer
                templateId={previewInv.templateId}
                weddingData={previewInv.weddingData}
                slug={previewInv.slug}
                isPreview={true}
              />
            </div>
            <div style={{ padding: 'var(--space-3) var(--space-6)', borderTop: '1px solid #ddd', textAlign: 'left', background: 'var(--white)' }}>
              <button onClick={() => setPreviewInv(null)} className="btn btn-secondary btn-sm">إغلاق</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function InvitationsManagementPage() {
  return (
    <AuthProvider>
      <InvitationsManagementContent />
    </AuthProvider>
  );
}
