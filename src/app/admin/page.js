'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { getCustomers, getInvitations, getAllRSVP, getHalls } from '@/lib/data';

function AdminContent() {
  const { user, isAdmin, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState({
    customers: 0,
    invitations: 0,
    published: 0,
    rsvps: 0,
    halls: 0
  });

  const [recentCustomers, setRecentCustomers] = useState([]);
  const [recentInvitations, setRecentInvitations] = useState([]);

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
      return;
    }
    if (user && isAdmin) {
      const custs = getCustomers();
      const invites = getInvitations();
      const rsvps = getAllRSVP();
      const halls = getHalls();

      setStats({
        customers: custs.length,
        invitations: invites.length,
        published: invites.filter(i => i.status === 'published').length,
        rsvps: rsvps.length,
        halls: halls.length
      });

      setRecentCustomers(custs.slice(0, 5));
      setRecentInvitations(invites.slice(0, 5));
    }
  }, [user, loading, isAuthenticated, isAdmin]);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" /></div>;
  if (!user || !isAdmin) return null;

  return (
    <>
      <Header />
      <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: 'var(--off-white)' }}>
        <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: 'var(--space-1)' }}>لوحة تحكم الإدارة</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>
                إدارة منصة قاعات النعمان
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Link href="/admin/customers" className="btn btn-primary btn-sm">
                + إضافة عميل جديد
              </Link>
              <button onClick={logout} className="btn btn-secondary btn-sm">
                تسجيل الخروج
              </button>
            </div>
          </div>

          {/* Quick Nav Cards */}
          <div className="grid grid-4" style={{ marginBottom: 'var(--space-8)', gap: 'var(--space-4)' }}>
            <Link href="/admin/customers" className="card" style={{ padding: 'var(--space-5)', textAlign: 'center', textDecoration: 'none' }}>
              <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>👥</div>
              <h4 style={{ color: 'var(--dark-brown)', margin: 0 }}>إدارة العملاء</h4>
              <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--gold-primary)' }}>{stats.customers}</span>
            </Link>

            <Link href="/admin/invitations" className="card" style={{ padding: 'var(--space-5)', textAlign: 'center', textDecoration: 'none' }}>
              <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>💌</div>
              <h4 style={{ color: 'var(--dark-brown)', margin: 0 }}>الدعوات المنشورة</h4>
              <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--success)' }}>{stats.published} / {stats.invitations}</span>
            </Link>

            <Link href="/admin/templates" className="card" style={{ padding: 'var(--space-5)', textAlign: 'center', textDecoration: 'none' }}>
              <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>🎨</div>
              <h4 style={{ color: 'var(--dark-brown)', margin: 0 }}>مكتبة القوالب</h4>
              <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--gold-dark)' }}>4 قوالب</span>
            </Link>

            <Link href="/admin/halls" className="card" style={{ padding: 'var(--space-5)', textAlign: 'center', textDecoration: 'none' }}>
              <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>🏛️</div>
              <h4 style={{ color: 'var(--dark-brown)', margin: 0 }}>إدارة القاعات</h4>
              <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--gold-primary)' }}>{stats.halls} قاعات</span>
            </Link>
          </div>

          <div className="grid grid-2" style={{ gap: 'var(--space-8)' }}>
            {/* Recent Customers */}
            <div className="card" style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', margin: 0 }}>أحدث حسابات العملاء</h3>
                <Link href="/admin/customers" className="text-gold text-sm">عرض الكل ←</Link>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>اسم المستخدم</th>
                      <th>الهاتف</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCustomers.map(c => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: '500' }}>{c.name}</td>
                        <td style={{ direction: 'ltr', textAlign: 'right' }}>{c.username}</td>
                        <td>{c.phone}</td>
                        <td>
                          {c.enabled ? (
                            <span className="badge badge-success">نشط</span>
                          ) : (
                            <span className="badge badge-error">معطل</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Invitations */}
            <div className="card" style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', margin: 0 }}>حالات الدعوات الإلكترونية</h3>
                <Link href="/admin/invitations" className="text-gold text-sm">عرض الكل ←</Link>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>العروسين</th>
                      <th>القالب</th>
                      <th>الحالة</th>
                      <th>الرابط</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInvitations.map(inv => {
                      const wd = inv.weddingData;
                      return (
                        <tr key={inv.id}>
                          <td>{wd?.groomName || '—'} & {wd?.brideName || '—'}</td>
                          <td><span className="badge badge-gold">{inv.templateId}</span></td>
                          <td>
                            {inv.status === 'published' ? (
                              <span className="badge badge-success">منشورة</span>
                            ) : (
                              <span className="badge badge-warning">مسودة</span>
                            )}
                          </td>
                          <td>
                            {inv.slug && inv.status === 'published' ? (
                              <Link href={`/invite/${inv.slug}`} target="_blank" className="text-gold" style={{ fontSize: '0.8rem' }}>
                                فتح الرابط ↗
                              </Link>
                            ) : '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
}
