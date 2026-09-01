'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { getTemplates, getTemplateCategories } from '@/lib/templates';
import { getInvitationByCustomerId, changeTemplate } from '@/lib/data';
import InvitationRenderer from '@/components/invitation/InvitationRenderer';

function TemplatesContent() {
  const { user, isCustomer, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [invitation, setInvitation] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

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
    setTemplates(getTemplates());
    const inv = getInvitationByCustomerId(user.id);
    if (inv) {
      setInvitation(inv);
    }
  };

  const handleSelectTemplate = (templateId) => {
    if (!invitation) return;
    changeTemplate(invitation.id, templateId);
    setToastMessage('تم تغيير القالب بنجاح!');
    loadData();
    setTimeout(() => setToastMessage(''), 3000);
  };

  const categories = getTemplateCategories();
  const filtered = selectedCategory === 'الكل'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" /></div>;
  if (!user || !isCustomer) return null;

  return (
    <>
      <Header />
      <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: 'var(--off-white)' }}>
        <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <Link href="/dashboard" className="text-gold text-sm" style={{ display: 'inline-block', marginBottom: 'var(--space-2)' }}>
                → العودة إلى لوحة التحكم
              </Link>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)' }}>قوالب الدعوات الإلكترونية</h2>
              <p className="text-muted" style={{ margin: 'var(--space-1) 0 0' }}>
                اختر القالب الأنسب لزفافك. يمكنك تبديل القالب في أي وقت مع الاحتفاظ بكافة بياناتك وتفاصيلك.
              </p>
            </div>
            {invitation?.slug && (
              <Link href={`/invite/${invitation.slug}`} target="_blank" className="btn btn-secondary btn-sm">
                👁️ معاينة دعوتك الحالية
              </Link>
            )}
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div style={{
              position: 'fixed',
              bottom: 'var(--space-8)',
              right: '50%',
              transform: 'translateX(50%)',
              background: 'var(--dark-brown)',
              color: 'var(--gold-light)',
              padding: 'var(--space-4) var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xl)',
              zIndex: 1000,
              fontSize: 'var(--text-sm)'
            }}>
              ✓ {toastMessage}
            </div>
          )}

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-8)', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: '20px', padding: '6px 18px' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="template-grid">
            {filtered.map((tmpl) => {
              const isCurrent = invitation?.templateId === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  className={`template-card ${isCurrent ? 'selected' : ''}`}
                  style={{
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    border: isCurrent ? '2px solid var(--gold-primary)' : '1px solid #EBE5DB',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  <div
                    style={{ position: 'relative', height: 420, overflow: 'hidden', cursor: 'pointer' }}
                    onClick={() => setPreviewTemplate(tmpl)}
                  >
                    <img
                      src={tmpl.previewImage}
                      alt={tmpl.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      className="gallery-hover-img"
                    />

                    {/* Gradient Overlay with Title */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(20, 18, 15, 0.85) 0%, rgba(20, 18, 15, 0.2) 50%, transparent 80%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: 'var(--space-5)'
                    }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: '#FFFFFF', fontSize: '1.4rem', margin: '0 0 4px 0' }}>
                        {tmpl.name}
                      </h3>
                      <p style={{ color: '#E8DECC', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                        {tmpl.description}
                      </p>
                    </div>

                    {isCurrent && (
                      <span
                        className="badge badge-success"
                        style={{ position: 'absolute', top: 12, right: 12, fontWeight: 'bold', zIndex: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
                      >
                        ✓ القالب الحالي
                      </span>
                    )}
                    <span className="badge badge-gold" style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                      {tmpl.category}
                    </span>
                  </div>

                  <div className="template-card-body" style={{ padding: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button
                        onClick={() => setPreviewTemplate(tmpl)}
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1, borderRadius: '20px' }}
                      >
                        👁️ معاينة
                      </button>
                      <button
                        onClick={() => handleSelectTemplate(tmpl.id)}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, borderRadius: '20px' }}
                        disabled={isCurrent}
                      >
                        {isCurrent ? 'مفعل حالياً' : 'استخدام القالب'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Template Preview Modal */}
      {previewTemplate && (
        <div className="modal-overlay" onClick={() => setPreviewTemplate(null)} style={{ background: 'rgba(0,0,0,0.85)' }}>
          <div
            className="modal-content"
            style={{ maxWidth: 480, maxHeight: '92vh', padding: 0, overflow: 'hidden', background: '#FFFFFF', borderRadius: 'var(--radius-2xl)', border: '2px solid #C9A96E' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'var(--space-4) var(--space-6)',
              borderBottom: '1px solid var(--warm-gray-200)',
              background: '#FAFAF7'
            }}>
              <div>
                <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--dark-brown)' }}>
                  معاينة حية: {previewTemplate.name}
                </h4>
                <span className="text-xs text-muted">اضغط "فتح الدعوة" لتجربة الجولة التلقائية والألبوم التفاعلي</span>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--dark-brown)' }}
              >
                ✕
              </button>
            </div>

            <div style={{ height: '70vh', overflowY: 'auto' }}>
              <InvitationRenderer
                templateId={previewTemplate.id}
                weddingData={invitation?.weddingData || {
                  groomName: 'يوسف',
                  groomFullName: 'يوسف بن إبراهيم المبارك',
                  brideName: 'دانة',
                  brideFullName: 'دانة بنت خليفة الشامسي',
                  groomFather: 'إبراهيم المبارك',
                  groomMother: 'موزة المرزوقي',
                  brideFather: 'خليفة الشامسي',
                  brideMother: 'عائشة النعيمي',
                  weddingDate: '2027-04-17',
                  weddingTime: '19:30',
                  venue: 'قاعة الملكية - قاعات النعمان',
                  venueAddress: 'عمّان، شارع المدينة المنوّرة',
                  mapUrl: 'https://maps.google.com/?q=31.9539,35.9106',
                  invitationMessage: 'يتشرف يوسف ودانة بدعوتكم لمشاركتهما فرحة العمر في ليلة تكتمل بحضوركم الكريم.',
                  photos: [
                    '/images/gallery/gallery-6.jpg',
                    '/images/gallery/gallery-2.jpg',
                    '/images/gallery/gallery-7.jpg',
                    '/images/gallery/gallery-3.jpg'
                  ],
                  schedule: [
                    { name: 'استقبال المهنئين', time: '17:30' },
                    { name: 'الزفة الملكية', time: '18:30' },
                    { name: 'نخب وقطع الكعكة', time: '18:45' },
                    { name: 'العشاء الرئيسي', time: '19:00' },
                    { name: 'ختام الحفل', time: '21:00' },
                  ]
                }}
                slug={invitation?.slug || 'preview'}
                isPreview={true}
              />
            </div>

            <div style={{
              padding: 'var(--space-4) var(--space-6)',
              borderTop: '1px solid var(--warm-gray-200)',
              display: 'flex',
              gap: 'var(--space-3)',
              justifyContent: 'flex-end',
              background: '#FAFAF7'
            }}>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '20px' }}
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  handleSelectTemplate(previewTemplate.id);
                  setPreviewTemplate(null);
                }}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: '20px' }}
                disabled={invitation?.templateId === previewTemplate.id}
              >
                {invitation?.templateId === previewTemplate.id ? 'القالب مفعل' : 'اختيار هذا القالب'}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default function TemplatesPage() {
  return (
    <AuthProvider>
      <TemplatesContent />
    </AuthProvider>
  );
}
