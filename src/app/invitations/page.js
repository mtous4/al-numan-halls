'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { TEMPLATES } from '@/lib/templates';
import InvitationRenderer from '@/components/invitation/InvitationRenderer';

function InvitationsLandingContent() {
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const steps = [
    { step: 1, title: 'استلام الحساب', desc: 'تزويدك ببيانات تسجيل الدخول الخاصة بك من إدارة قاعات النعمان' },
    { step: 2, title: 'اختيار القالب', desc: 'تصفح تشكيلة قوالبنا الملكية والعصرية المتنوعة لاختيار ما يناسب ذوقك' },
    { step: 3, title: 'إدخال تفاصيل العرس', desc: 'كتابة أسماء العروسين، التاريخ، التوقيت، ومعلومات العائلة' },
    { step: 4, title: 'إضافة الصور والبرنامج', desc: 'رفع صور الخطوبة أو العروسين وتحديد الجدول الزمني للحفل' },
    { step: 5, title: 'معاينة حية للدعوة', desc: 'رؤية كيف ستظهر دعوتك بدقة على هواتف ضيوفك والتأكد من كل التفاصيل' },
    { step: 6, title: 'نشر وتوليد الرابط', desc: 'ضغطة زر واحدة لتوليد رابط فريد لدعوتك مع رمز QR Code عالي الدقة' },
    { step: 7, title: 'مشاركة واستقبال الردود', desc: 'إرسال الرابط عبر واتساب ومتابعة إحصائيات تأكيد حضور الضيوف لحظياً' }
  ];

  return (
    <>
      <Header />
      <div className="page-banner" style={{ background: 'linear-gradient(135deg, var(--dark-brown), #3D3020)' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: 'var(--space-4)' }}>منصة الدعوات الإلكترونية المتطورة</span>
          <h1>صمّم دعوة زفافك الملكية</h1>
          <p>بديل رقمي فائق الأناقة للدعوات الورقية التقليدية، مع إدارة ذكية للحضور ورمز QR خاص</p>
          <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
            <Link href="/login" className="btn btn-primary btn-lg">
              الدخول لمنشئ الدعوات
            </Link>
            <Link href="#templates-preview" className="btn btn-secondary btn-lg" style={{ color: 'var(--white)', borderColor: 'var(--gold-light)' }}>
              استعراض القوالب
            </Link>
          </div>
        </div>
      </div>

      {/* 7-Step Journey */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <h2 className="section-title">رحلة تصميم دعوتك في 7 خطوات سهلة</h2>
          <div className="gold-separator">
            <span className="gold-separator-icon">✦</span>
          </div>
          <p className="section-subtitle">لا تحتاج لأي خبرة في التصميم، المنصة مصممة لتكون سلسة وسريعة</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-10)' }}>
            {steps.map((s) => (
              <div
                key={s.step}
                className="card"
                style={{
                  padding: 'var(--space-6)',
                  textAlign: 'center',
                  background: 'var(--off-white)',
                  border: '1px solid var(--warm-gray-200)',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--gold-primary)',
                    color: 'var(--white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    margin: '0 auto var(--space-4)'
                  }}
                >
                  {s.step}
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                  {s.title}
                </h4>
                <p style={{ color: 'var(--warm-gray-600)', fontSize: 'var(--text-sm)', lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section id="templates-preview" className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <h2 className="section-title">مكتبة القوالب الحصرية</h2>
          <div className="gold-separator">
            <span className="gold-separator-icon">✦</span>
          </div>
          <p className="section-subtitle">قوالب مصممة خصيصاً لهوية قاعات النعمان، يمكنك تبديل القالب في أي وقت مع الاحتفاظ ببياناتك</p>

          <div className="grid grid-4" style={{ gap: 'var(--space-6)' }}>
            {TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className="template-card"
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid #EBE5DB',
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

                  <span className="badge badge-gold" style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                    {tmpl.category}
                  </span>
                </div>

                <div style={{ padding: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)' }}>
                  <button
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, borderRadius: '20px' }}
                  >
                    👁️ معاينة
                  </button>
                  <Link
                    href="/login"
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, borderRadius: '20px', textAlign: 'center' }}
                  >
                    استخدم القالب
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px' }}>
              <img
                src="/images/invitation-promo.jpg"
                alt="مميزات الدعوة الإلكترونية"
                style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)' }}
              />
            </div>
            <div style={{ flex: '1 1 450px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-4)' }}>
                لماذا تختار الدعوة الإلكترونية من قاعات النعمان؟
              </h2>
              <div className="gold-separator" style={{ justifyContent: 'flex-start' }}>
                <span className="gold-separator-icon">✦</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <div style={{ fontSize: '1.8rem', color: 'var(--gold-primary)' }}>📱</div>
                  <div>
                    <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>متجاوبة تماماً مع شاشات الهواتف</h4>
                    <p style={{ color: 'var(--warm-gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>مظهر مريح وسهل التصفح بنسبة 100% لمستخدمي واتساب والأجهزة الذكية.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <div style={{ fontSize: '1.8rem', color: 'var(--gold-primary)' }}>📊</div>
                  <div>
                    <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>نظام إدارة وتأكيد الحضور (RSVP)</h4>
                    <p style={{ color: 'var(--warm-gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>تعرّف بدقة على عدد المدعوين المؤكدين والاعتذارات والتهاني المباشرة من الضيوف.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <div style={{ fontSize: '1.8rem', color: 'var(--gold-primary)' }}>📍</div>
                  <div>
                    <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>توجيه فوري عبر Google Maps</h4>
                    <p style={{ color: 'var(--warm-gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>زر مخصص ينقل الضيوف فوراً إلى موقع قاعات النعمان على الخريطة لتسهيل الوصول.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <div style={{ fontSize: '1.8rem', color: 'var(--gold-primary)' }}>🔄</div>
                  <div>
                    <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>تغيير القالب بضغطة زر</h4>
                    <p style={{ color: 'var(--warm-gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>غيّر تصميم القالب في أي وقت دون أن تفقد كلمة واحدة من بيانات عرسك المدخلة.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                weddingData={{
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
                slug="preview"
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
              <Link
                href="/login"
                className="btn btn-primary btn-sm"
                style={{ borderRadius: '20px' }}
              >
                استخدم هذا القالب ✨
              </Link>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default function InvitationsLandingPage() {
  return (
    <AuthProvider>
      <InvitationsLandingContent />
    </AuthProvider>
  );
}
