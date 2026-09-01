'use client';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { TEMPLATES } from '@/lib/templates';
import TemplateCoverArtwork from '@/components/invitation/TemplateCoverArtwork';

function InvitationsLandingContent() {
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
              <div key={tmpl.id} className="template-card" style={{ background: 'var(--white)' }}>
                <div style={{ position: 'relative', overflow: 'hidden', borderBottom: `3px solid ${tmpl.colors.primary}` }}>
                  <TemplateCoverArtwork templateId={tmpl.id} height={380} />
                  <span className="badge badge-gold" style={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}>
                    {tmpl.category}
                  </span>
                </div>
                <div style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                  <Link href="/login" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                    استخدم هذا القالب
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
