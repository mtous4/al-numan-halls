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
    if (!loading && (!isAuthenticated || !isCustomer)) {
      router.push('/login');
      return;
    }
    if (user) {
      setTemplates(getTemplates());
      const inv = getInvitationByCustomerId(user.id);
      setInvitation(inv);
    }
  }, [user, loading, isAuthenticated, isCustomer]);

  const categories = getTemplateCategories();

  const filtered = selectedCategory === 'الكل'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const handleSelectTemplate = (templateId) => {
    if (invitation) {
      changeTemplate(invitation.id, templateId);
      setToastMessage('تم تغيير القالب بنجاح مع الاحتفاظ بكافة بياناتك!');
      setInvitation({ ...invitation, templateId });
      setTimeout(() => {
        setToastMessage('');
        router.push('/dashboard/editor');
      }, 1200);
    }
  };

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
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Link href="/dashboard" className="text-muted text-sm">لوحة التحكم</Link>
                <span className="text-muted text-sm">/</span>
                <span className="text-gold text-sm">مكتبة القوالب</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: 'var(--space-1)', margin: 0 }}>
                اختر تصميم دعوتك المفضّل
              </h2>
              <p className="text-muted" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
                يمكنك التبديل بين القوالب في أي وقت دون فقدان معلومات عرسك
              </p>
            </div>
            <Link href="/dashboard/editor" className="btn btn-secondary btn-sm">
              الرجوع لمحرر الدعوة
            </Link>
          </div>

          {/* Toast */}
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
                >
                  <div style={{
                    height: 380,
                    background: tmpl.colors.bg,
                    color: tmpl.colors.text,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'var(--space-6)',
                    textAlign: 'center',
                    borderBottom: `3px solid ${tmpl.colors.primary}`,
                    position: 'relative'
                  }}>
                    {isCurrent && (
                      <span
                        className="badge badge-success"
                        style={{ position: 'absolute', top: 12, right: 12, fontWeight: 'bold' }}
                      >
                        ✓ القالب الحالي
                      </span>
                    )}
                    <span className="badge badge-gold" style={{ position: 'absolute', top: 12, left: 12 }}>
                      {tmpl.category}
                    </span>

                    <div style={{ fontSize: '2.5rem', color: tmpl.colors.primary, marginBottom: 'var(--space-2)' }}>✦</div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: tmpl.colors.primary, marginBottom: 'var(--space-2)' }}>
                      {tmpl.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', opacity: 0.85, maxWidth: 220, margin: '0 0 var(--space-4) 0' }}>
                      {tmpl.description}
                    </p>

                    <div style={{ display: 'flex', gap: 6 }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: tmpl.colors.primary, border: '1px solid #fff' }} />
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: tmpl.colors.accent, border: '1px solid #fff' }} />
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: tmpl.colors.bg, border: '1px solid #bbb' }} />
                    </div>
                  </div>

                  <div className="template-card-body">
                    <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                      <button
                        onClick={() => setPreviewTemplate(tmpl)}
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1 }}
                      >
                        👁️ معاينة
                      </button>
                      <button
                        onClick={() => handleSelectTemplate(tmpl.id)}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1 }}
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
        <div className="modal-overlay" onClick={() => setPreviewTemplate(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: 460, maxHeight: '92vh', padding: 0, overflow: 'hidden', background: '#FFFFFF' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'var(--space-4) var(--space-6)',
              borderBottom: '1px solid var(--warm-gray-200)',
              background: 'var(--off-white)'
            }}>
              <div>
                <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--dark-brown)' }}>
                  معاينة: {previewTemplate.name}
                </h4>
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>محاكاة لشاشة الهاتف المحمول</span>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ height: '72vh', overflowY: 'auto' }}>
              <InvitationRenderer
                templateId={previewTemplate.id}
                weddingData={invitation?.weddingData || {}}
                slug={invitation?.slug || ''}
                isPreview={true}
              />
            </div>

            <div style={{
              padding: 'var(--space-3) var(--space-6)',
              borderTop: '1px solid var(--warm-gray-200)',
              display: 'flex',
              gap: 'var(--space-3)',
              background: 'var(--white)'
            }}>
              <button
                onClick={() => {
                  handleSelectTemplate(previewTemplate.id);
                  setPreviewTemplate(null);
                }}
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                ✓ اعتماد هذا القالب لدعوتي
              </button>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="btn btn-secondary btn-sm"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
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
