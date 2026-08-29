'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import { getInvitationByCustomerId, getRSVPSummary, publishInvitation, unpublishInvitation } from '@/lib/data';
import { getTemplateById } from '@/lib/templates';
import { QRCodeSVG } from 'qrcode.react';

function DashboardContent() {
  const { user, isCustomer, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [invitation, setInvitation] = useState(null);
  const [template, setTemplate] = useState(null);
  const [rsvpSummary, setRsvpSummary] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    if (!loading && !isCustomer) {
      router.push('/admin');
      return;
    }
    if (user) {
      loadData();
    }
  }, [user, loading]);

  const loadData = () => {
    const inv = getInvitationByCustomerId(user.id);
    if (inv) {
      setInvitation(inv);
      setTemplate(getTemplateById(inv.templateId));
      if (inv.slug) {
        setRsvpSummary(getRSVPSummary(inv.slug));
      }
    }
  };

  const handlePublish = () => {
    if (invitation) {
      publishInvitation(invitation.id);
      loadData();
    }
  };

  const handleUnpublish = () => {
    if (invitation) {
      unpublishInvitation(invitation.id);
      loadData();
    }
  };

  const getInvitationUrl = () => {
    if (typeof window === 'undefined' || !invitation?.slug) return '';
    return `${window.location.origin}/invite/${invitation.slug}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getInvitationUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const url = getInvitationUrl();
    const wd = invitation?.weddingData;
    const text = `دعوة زفاف ${wd?.groomName || ''} & ${wd?.brideName || ''}\n\n${url}`;
    if (navigator.share) {
      navigator.share({ title: 'دعوة زفاف', text, url });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" /></div>;
  if (!user || !isCustomer) return null;

  const wd = invitation?.weddingData;

  return (
    <>
      <Header />
      <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: 'var(--off-white)' }}>
        <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
          {/* Welcome */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <h2 style={{ marginBottom: 'var(--space-1)' }}>مرحبًا، {user.name}</h2>
              <p className="text-muted" style={{ margin: 0 }}>إدارة دعوة زفافك الإلكترونية</p>
            </div>
            <button onClick={logout} className="btn btn-secondary btn-sm">تسجيل الخروج</button>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ marginBottom: 'var(--space-8)' }}>
            <div className="stat-card">
              <div className="stat-card-value">{invitation?.status === 'published' ? '✅' : '📝'}</div>
              <div className="stat-card-label">حالة الدعوة: {invitation?.status === 'published' ? 'منشورة' : 'مسودة'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-value">{template?.name || '—'}</div>
              <div className="stat-card-label" style={{ fontSize: 'var(--text-xs)' }}>القالب المختار</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-value">{wd?.weddingDate || '—'}</div>
              <div className="stat-card-label">تاريخ الزفاف</div>
            </div>
            {rsvpSummary && (
              <div className="stat-card">
                <div className="stat-card-value">{rsvpSummary.totalGuests}</div>
                <div className="stat-card-label">إجمالي الضيوف المؤكدين</div>
              </div>
            )}
          </div>

          <div className="grid grid-2" style={{ gap: 'var(--space-6)' }}>
            {/* Invitation Card */}
            <div className="card" style={{ cursor: 'default' }}>
              <div className="card-body">
                <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-4)' }}>دعوتي</h3>

                {wd?.groomName && wd?.brideName ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-6)', background: 'var(--cream)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}>
                    <p style={{ fontFamily: 'var(--font-decorative)', fontSize: 'var(--text-3xl)', color: 'var(--gold-primary)', margin: 0, lineHeight: 1.5 }}>
                      {wd.groomName}
                      <span style={{ display: 'block', fontSize: 'var(--text-lg)', color: 'var(--gold-light)' }}>&</span>
                      {wd.brideName}
                    </p>
                    {wd.weddingDate && (
                      <p style={{ color: 'var(--warm-gray-500)', marginTop: 'var(--space-2)', margin: 'var(--space-2) 0 0' }}>
                        {new Date(wd.weddingDate).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    )}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: 'var(--space-8)', background: 'var(--cream)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}>
                    <p className="text-muted">لم يتم إدخال معلومات الزفاف بعد</p>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <Link href="/dashboard/editor" className="btn btn-primary" style={{ width: '100%' }}>✏️ تعديل الدعوة</Link>
                  <Link href="/dashboard/templates" className="btn btn-secondary" style={{ width: '100%' }}>🎨 تغيير القالب</Link>
                  {invitation?.status === 'draft' ? (
                    <button onClick={handlePublish} className="btn btn-primary" style={{ width: '100%', background: 'var(--success)', boxShadow: 'none' }}>🚀 نشر الدعوة</button>
                  ) : (
                    <button onClick={handleUnpublish} className="btn btn-secondary" style={{ width: '100%', borderColor: 'var(--error)', color: 'var(--error)' }}>إلغاء النشر</button>
                  )}
                  {invitation?.slug && invitation?.status === 'published' && (
                    <Link href={`/invite/${invitation.slug}`} target="_blank" className="btn btn-secondary" style={{ width: '100%' }}>👁️ معاينة الدعوة</Link>
                  )}
                </div>
              </div>
            </div>

            {/* Share / RSVP Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Share */}
              {invitation?.status === 'published' && invitation?.slug && (
                <div className="share-panel">
                  <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-4)' }}>مشاركة الدعوة</h4>
                  <div className="share-url-box">
                    <input className="share-url-input" value={getInvitationUrl()} readOnly />
                    <button onClick={handleCopy} className="btn btn-primary btn-sm">
                      {copied ? '✓ تم النسخ' : '📋 نسخ'}
                    </button>
                  </div>
                  <div className="share-buttons">
                    <button onClick={handleShare} className="btn btn-primary btn-sm" style={{ background: '#25D366' }}>📱 واتساب</button>
                    <button onClick={() => setShowQR(!showQR)} className="btn btn-secondary btn-sm">QR Code</button>
                  </div>
                  {showQR && (
                    <div className="qr-container" style={{ marginTop: 'var(--space-4)' }}>
                      <QRCodeSVG value={getInvitationUrl()} size={180} fgColor="#2C2417" />
                      <p className="text-sm text-muted" style={{ margin: 0 }}>امسح الرمز لفتح الدعوة</p>
                    </div>
                  )}
                </div>
              )}

              {/* RSVP Summary */}
              {rsvpSummary && rsvpSummary.total > 0 && (
                <div className="card" style={{ cursor: 'default' }}>
                  <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                      <h4 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>ردود الضيوف</h4>
                      <Link href="/dashboard/rsvp" className="text-gold text-sm">عرض الكل ←</Link>
                    </div>
                    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--fw-bold)', color: 'var(--success)' }}>{rsvpSummary.confirmed}</div>
                        <div className="text-sm text-muted">مؤكد</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--fw-bold)', color: 'var(--error)' }}>{rsvpSummary.declined}</div>
                        <div className="text-sm text-muted">اعتذر</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--fw-bold)', color: 'var(--gold-primary)' }}>{rsvpSummary.totalGuests}</div>
                        <div className="text-sm text-muted">ضيوف</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}
