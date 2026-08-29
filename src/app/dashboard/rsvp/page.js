'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { getInvitationByCustomerId, getRSVPSummary } from '@/lib/data';

function RSVPContent() {
  const { user, isCustomer, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [invitation, setInvitation] = useState(null);
  const [summary, setSummary] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isCustomer)) {
      router.push('/login');
      return;
    }
    if (user) {
      const inv = getInvitationByCustomerId(user.id);
      if (inv) {
        setInvitation(inv);
        if (inv.slug) {
          setSummary(getRSVPSummary(inv.slug));
        }
      }
    }
  }, [user, loading, isAuthenticated, isCustomer]);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" /></div>;
  if (!user || !isCustomer) return null;

  const responses = summary?.responses || [];

  const filtered = responses.filter(r => {
    const term = searchTerm.toLowerCase();
    return (
      r.guestName?.toLowerCase().includes(term) ||
      r.message?.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <Header />
      <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: 'var(--off-white)' }}>
        <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
          {/* Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Link href="/dashboard" className="text-muted text-sm">لوحة التحكم</Link>
                <span className="text-muted text-sm">/</span>
                <span className="text-gold text-sm">سجل تهاني وتبريكات الضيوف</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: 'var(--space-1)', margin: 0 }}>
                سجل تهاني الضيوف
              </h2>
            </div>
            <Link href="/dashboard" className="btn btn-secondary btn-sm">
              الرجوع للرئيسية
            </Link>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ marginBottom: 'var(--space-8)', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div className="stat-card">
              <div className="stat-card-value" style={{ color: 'var(--gold-primary)' }}>{summary?.total || 0}</div>
              <div className="stat-card-label">إجمالي رسائل التهاني المستلمة</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-value" style={{ color: 'var(--success)' }}>{filtered.length}</div>
              <div className="stat-card-label">الرسائل المعروضة حالياً</div>
            </div>
          </div>

          {/* Search */}
          <div className="card" style={{ padding: 'var(--space-4) var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <input
              type="text"
              className="form-input"
              placeholder="🔍 بحث باسم الضيف أو نص التهنئة..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Responses Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>اسم المهنئ</th>
                  <th>نص التهنئة المباركة</th>
                  <th>تاريخ الإرسال</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 'bold', width: 220, color: 'var(--gold-dark)' }}>{item.guestName}</td>
                      <td style={{ color: 'var(--warm-gray-800)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                        {item.message || <span className="text-muted">لا يوجد نص</span>}
                      </td>
                      <td style={{ width: 180, fontSize: '0.8rem', color: 'var(--warm-gray-500)' }}>
                        {item.submittedAt ? new Date(item.submittedAt).toLocaleString('ar-SA', { dateStyle: 'short', timeStyle: 'short' }) : '—'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--warm-gray-500)' }}>
                      لا توجد رسائل تهنئة مسجلة حتى الآن
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default function RSVPPage() {
  return (
    <AuthProvider>
      <RSVPContent />
    </AuthProvider>
  );
}
