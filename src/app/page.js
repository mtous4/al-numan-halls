'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { initializeData, getHalls, getServices } from '@/lib/data';

function HomeContent() {
  const halls = typeof window !== 'undefined' ? getHalls() : [];
  const services = typeof window !== 'undefined' ? getServices() : [];

  useEffect(() => {
    initializeData();
    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img src="/images/hero.jpg" alt="قاعات النعمان" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <img src="/images/logo.png" alt="قاعات النعمان" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
          <h1>ليلة العمر تبدأ من هنا</h1>
          <p>اكتشف قاعات النعمان الفاخرة وصمّم دعوة زفافك الإلكترونية بأناقة لا مثيل لها</p>
          <div className="hero-actions">
            <Link href="/halls" className="btn btn-primary btn-lg">استكشف القاعات</Link>
            <Link href="/invitations" className="btn btn-white btn-lg">صمّم دعوتك الإلكترونية</Link>
          </div>
        </div>
      </section>

      {/* Halls Preview */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <h2 className="section-title reveal">قاعاتنا</h2>
          <div className="gold-separator reveal">
            <span className="gold-separator-icon">✦</span>
          </div>
          <p className="section-subtitle reveal">اختر من بين أجمل القاعات لتكون ليلتكم استثنائية</p>

          <div className="grid grid-3">
            {halls.map((hall, i) => (
              <div key={hall.id} className="card reveal" style={{ animationDelay: `${i * 0.15}s` }}>
                <img src={hall.image} alt={hall.name} className="card-image" />
                <div className="card-body">
                  <h3 className="card-title">{hall.name}</h3>
                  <p className="card-text">{hall.description.substring(0, 100)}...</p>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
                    <span className="badge badge-gold">👥 {hall.capacity} شخص</span>
                    <span className="badge badge-gold">📐 {hall.area}</span>
                  </div>
                  <Link href="/halls" className="btn btn-secondary btn-sm" style={{ marginTop: 'var(--space-4)' }}>
                    عرض التفاصيل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Invitation Promo */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--dark-brown), #3D3020)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 300 }} className="reveal">
              <span className="badge badge-gold" style={{ marginBottom: 'var(--space-4)', display: 'inline-block' }}>✨ خدمة جديدة</span>
              <h2 style={{ color: 'var(--white)', marginBottom: 'var(--space-4)' }}>صمّم دعوتك الإلكترونية</h2>
              <p style={{ color: 'var(--gold-light)', fontSize: 'var(--text-lg)', lineHeight: 1.8 }}>
                شارك فرحتك مع أحبّتك من خلال دعوة زفاف رقمية أنيقة.
                اختر من بين قوالب فاخرة، أدخل تفاصيل عرسك، وشارك الرابط مع ضيوفك.
              </p>
              <ul style={{ listStyle: 'none', margin: 'var(--space-6) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {['قوالب فاخرة متعددة التصاميم', 'معاينة حية مباشرة', 'مشاركة عبر رابط أو QR Code', 'تأكيد حضور الضيوف (RSVP)', 'معرض صور العرس'].map((item, i) => (
                  <li key={i} style={{ color: 'var(--gold-muted)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span style={{ color: 'var(--gold-primary)', fontSize: 'var(--text-lg)' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/invitations" className="btn btn-primary btn-lg">اكتشف الخدمة</Link>
            </div>
            <div style={{ flex: 1, minWidth: 300, display: 'flex', justifyContent: 'center' }} className="reveal">
              <img
                src="/images/invitation-promo.jpg"
                alt="دعوات إلكترونية"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  maxWidth: 480,
                  width: '100%',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">خدماتنا</h2>
          <div className="gold-separator reveal">
            <span className="gold-separator-icon">✦</span>
          </div>
          <p className="section-subtitle reveal">نقدّم لكم كل ما تحتاجونه لليلة مثالية</p>

          <div className="grid grid-3">
            {services.map((service, i) => (
              <div key={service.id} className="reveal" style={{
                textAlign: 'center',
                padding: 'var(--space-8)',
                background: 'var(--off-white)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--warm-gray-100)',
                transition: 'all var(--transition-base)',
                animationDelay: `${i * 0.1}s`,
              }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 'var(--space-4)' }}>{service.icon}</span>
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-3)' }}>{service.name}</h4>
                <p className="card-text">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <h2 className="section-title reveal">كيف تصمّم دعوتك؟</h2>
          <div className="gold-separator reveal">
            <span className="gold-separator-icon">✦</span>
          </div>
          <p className="section-subtitle reveal">خطوات بسيطة لإنشاء دعوة زفافك الإلكترونية</p>

          <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 900, margin: '0 auto' }}>
            {[
              { step: '١', title: 'تسجيل الدخول', desc: 'ادخل إلى حسابك المقدّم من قاعات النعمان' },
              { step: '٢', title: 'اختر القالب', desc: 'تصفّح مكتبة القوالب واختر التصميم المناسب' },
              { step: '٣', title: 'أدخل التفاصيل', desc: 'أضف معلومات العرس والصور ونص الدعوة' },
              { step: '٤', title: 'معاينة ونشر', desc: 'راجع الدعوة ثم انشرها وشاركها مع الضيوف' },
            ].map((item, i) => (
              <div key={i} className="reveal" style={{
                flex: '1 1 200px',
                maxWidth: 220,
                textAlign: 'center',
                padding: 'var(--space-6)',
              }}>
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-light))',
                  color: 'var(--white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--fw-bold)',
                  margin: '0 auto var(--space-4)',
                  fontFamily: 'var(--font-heading)',
                }}>
                  {item.step}
                </div>
                <h5 style={{ marginBottom: 'var(--space-2)', fontFamily: 'var(--font-heading)' }}>{item.title}</h5>
                <p className="text-muted text-sm" style={{ margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container reveal">
          <h2 className="section-title">ابدأ التخطيط لليلة أحلامك</h2>
          <div className="gold-separator">
            <span className="gold-separator-icon">✦</span>
          </div>
          <p className="section-subtitle">تواصل معنا اليوم واحجز قاعتك المفضّلة</p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">تواصل معنا</Link>
            <a href="tel:0799523360" className="btn btn-secondary btn-lg">📞 اتصل الآن</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default function HomePage() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}
