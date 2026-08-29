'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { TEMPLATES } from '@/lib/templates';
import InvitationRenderer from '@/components/invitation/InvitationRenderer';

function AdminTemplatesContent() {
  const { user, isAdmin, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [previewTemplate, setPreviewTemplate] = useState(null);

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
    }
  }, [user, loading, isAuthenticated, isAdmin]);

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
                <span className="text-gold text-sm">إدارة قوالب الدعوات</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: 'var(--space-1)', margin: 0 }}>
                مكتبة وتصاميم القوالب
              </h2>
            </div>
            <Link href="/admin" className="btn btn-secondary btn-sm">الرجوع للإدارة</Link>
          </div>

          <div className="grid grid-4" style={{ gap: 'var(--space-6)' }}>
            {TEMPLATES.map(tmpl => (
              <div key={tmpl.id} className="card" style={{ overflow: 'hidden' }}>
                <div style={{
                  height: 320,
                  background: tmpl.colors.bg,
                  color: tmpl.colors.text,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'var(--space-6)',
                  textAlign: 'center',
                  borderBottom: `3px solid ${tmpl.colors.primary}`
                }}>
                  <div style={{ fontSize: '2.5rem', color: tmpl.colors.primary, marginBottom: 'var(--space-2)' }}>✦</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: tmpl.colors.primary, fontSize: '1.4rem' }}>{tmpl.name}</h3>
                  <span className="badge badge-gold" style={{ marginTop: 'var(--space-2)' }}>{tmpl.category}</span>
                </div>
                <div style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                  <button onClick={() => setPreviewTemplate(tmpl)} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                    👁️ معاينة القالب الكامل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {previewTemplate && (
        <div className="modal-overlay" onClick={() => setPreviewTemplate(null)}>
          <div className="modal-content" style={{ maxWidth: 450, maxHeight: '90vh', padding: 0, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid #ddd', background: 'var(--off-white)' }}>
              <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)' }}>معاينة القالب: {previewTemplate.name}</h4>
              <button onClick={() => setPreviewTemplate(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ height: '70vh', overflowY: 'auto' }}>
              <InvitationRenderer
                templateId={previewTemplate.id}
                weddingData={{
                  groomName: 'كريم',
                  groomFullName: 'كريم بن سعيد العيسى',
                  brideName: 'ليلى',
                  brideFullName: 'ليلى بنت أحمد الراشد',
                  groomFather: 'سعيد العيسى',
                  brideFather: 'أحمد الراشد',
                  weddingDate: '2026-11-20',
                  weddingTime: '20:00',
                  venue: 'قاعة الملكية - قاعات النعمان',
                  venueAddress: 'عمّان، شارع المدينة المنوّرة',
                  mapUrl: 'https://maps.google.com/?q=31.9539,35.9106',
                  invitationMessage: 'يسعدنا ويشرفنا دعوتكم لمشاركتنا فرحة العمر في ليلة زفافنا الميمون',
                  schedule: [
                    { name: 'الاستقبال', time: '18:30', icon: '✨' },
                    { name: 'مراسم الزفاف', time: '20:00', icon: '💍' },
                    { name: 'العشاء', time: '21:30', icon: '🍴' }
                  ],
                  rsvpEnabled: true
                }}
                slug="demo-preview"
                isPreview={true}
              />
            </div>
            <div style={{ padding: 'var(--space-3) var(--space-6)', borderTop: '1px solid #ddd', textAlign: 'left' }}>
              <button onClick={() => setPreviewTemplate(null)} className="btn btn-secondary btn-sm">إغلاق</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function AdminTemplatesPage() {
  return (
    <AuthProvider>
      <AdminTemplatesContent />
    </AuthProvider>
  );
}
