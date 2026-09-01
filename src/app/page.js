'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroParticles from '@/components/layout/HeroParticles';
import RoyalConcierge from '@/components/layout/RoyalConcierge';
import HallEstimator from '@/components/home/HallEstimator';
import RoyalTestimonials from '@/components/home/RoyalTestimonials';
import { AuthProvider } from '@/context/AuthContext';
import { initializeData, getHalls, getServices } from '@/lib/data';

function HomeContent() {
  const halls = typeof window !== 'undefined' ? getHalls() : [];
  const services = typeof window !== 'undefined' ? getServices() : [];

  useEffect(() => {
    initializeData();
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

      {/* Hero Section: Focused on The Majestic Halls */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '85vh' }}>
        <div className="hero-bg">
          <img src="/images/hero.jpg" alt="قاعات النعمان للأفراح" />
        </div>
        <div className="hero-overlay" />
        <HeroParticles />

        <div className="hero-content" style={{ position: 'relative', zIndex: 10 }}>
          <img src="/images/logo-transparent.png" alt="قاعات النعمان" className="hero-logo" />
          <h1 style={{ textShadow: '0 4px 25px rgba(0,0,0,0.7)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            قاعات النعمان للأفراح والمناسبات الفاخرة
          </h1>
          <p style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)', maxWidth: 680, margin: '0 auto var(--space-6)', fontSize: '1.15rem', lineHeight: 1.8 }}>
            ثلاث قاعات ملكية استثنائية في قلب عمّان، تجمع بين فخامة الديكور، كرم الضيافة الأصيل، وأحدث تقنيات الإضاءة والصوت لليلة زفاف أسطورية لا تُنسى.
          </p>
          <div className="hero-actions">
            <Link href="/halls" className="btn btn-primary btn-lg" style={{ boxShadow: '0 8px 30px rgba(212,175,55,0.4)' }}>
              استكشف القاعات الملكية ✦
            </Link>
            <Link href="/contact" className="btn btn-white btn-lg">
              احجز موعداً للمعاينة
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Strip */}
      <div style={{ background: '#1A1612', borderTop: '1px solid rgba(212,175,55,0.3)', borderBottom: '1px solid rgba(212,175,55,0.3)', padding: 'var(--space-6) 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)', color: '#FFFFFF', textAlign: 'center' }}>
          <div>
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--gold-primary)', display: 'block', fontFamily: 'var(--font-heading)' }}>٣ قاعات</span>
            <span style={{ fontSize: '0.85rem', color: '#D4C8B8' }}>خيارات تناسب مختلف الأحجام</span>
          </div>
          <div style={{ width: 1, height: 35, background: 'rgba(212,175,55,0.25)' }} />
          <div>
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--gold-primary)', display: 'block', fontFamily: 'var(--font-heading)' }}>٥٠٠+ ضيف</span>
            <span style={{ fontSize: '0.85rem', color: '#D4C8B8' }}>سعة القاعة الكبرى الملكية</span>
          </div>
          <div style={{ width: 1, height: 35, background: 'rgba(212,175,55,0.25)' }} />
          <div>
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--gold-primary)', display: 'block', fontFamily: 'var(--font-heading)' }}>١٥+ عاماً</span>
            <span style={{ fontSize: '0.85rem', color: '#D4C8B8' }}>من الخبرة والتميز والريادة</span>
          </div>
          <div style={{ width: 1, height: 35, background: 'rgba(212,175,55,0.25)' }} />
          <div>
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--gold-primary)', display: 'block', fontFamily: 'var(--font-heading)' }}>مواقف VIP</span>
            <span style={{ fontSize: '0.85rem', color: '#D4C8B8' }}>خدمة اصطفاف وفاليه متكاملة</span>
          </div>
        </div>
      </div>

      {/* Main Halls Showcase Section */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <h2 className="section-title reveal">قاعاتنا الفاخرة</h2>
          <div className="gold-separator reveal">
            <span className="gold-separator-icon">✦</span>
          </div>
          <p className="section-subtitle reveal">
            صُممت كل قاعة بطابع معماري فريد لتلبي تطلعاتكم وتمنح ضيوفكم تجربة ضيافة استثنائية
          </p>

          <div className="grid grid-3" style={{ marginBottom: 'var(--space-12)' }}>
            {halls.map((hall, i) => (
              <div
                key={hall.id}
                className="card reveal"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  border: '1px solid #EBE5DB',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(184,148,79,0.18)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                }}
              >
                <div>
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img src={hall.image} alt={hall.name} className="card-image" style={{ height: 240, width: '100%', objectFit: 'cover' }} />
                    <span className="badge badge-gold" style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.95)' }}>
                      ✦ {hall.badge || hall.nameEn}
                    </span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{hall.name}</h3>
                    <p className="card-text">{hall.description}</p>
                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
                      <span className="badge badge-gold">👥 تتسع لـ {hall.capacity} شخص</span>
                      <span className="badge badge-gold">📐 المساحة: {hall.area}</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '0 var(--space-6) var(--space-6) var(--space-6)' }}>
                  <Link href="/halls" className="btn btn-secondary btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                    استعراض صور وتفاصيل القاعة ✦
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Smart Hall Estimator / Capacity Calculator */}
          <div className="reveal">
            <HallEstimator />
          </div>
        </div>
      </section>

      {/* Visual Gallery of Hall Ambiance & Real Setups */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <h2 className="section-title reveal">أجواء وفخامة قاعات النعمان</h2>
          <div className="gold-separator reveal">
            <span className="gold-separator-icon">✦</span>
          </div>
          <p className="section-subtitle reveal">لقطات حية من ديكورات القاعات، الكوش الملكية، وهندسة الإضاءة الساحرة</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            {[
              { img: '/images/halls/hall-royal.jpg', title: 'قاعة الملكية - الثريات الكريستالية' },
              { img: '/images/gallery/couple-1.jpg', title: 'زفة العروسين والمسرح الملكي' },
              { img: '/images/halls/hall-andalus.jpg', title: 'قاعة الأندلس - الإطلالة البانورامية' },
              { img: '/images/halls/hall-elegance.jpg', title: 'قاعة الفخامة - الديكور الكلاسيكي' },
            ].map((item, index) => (
              <div key={index} className="reveal" style={{ position: 'relative', height: 260, overflow: 'hidden', borderRadius: '12px' }}>
                <img
                  src={item.img}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                  padding: '16px 12px 10px 12px',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {item.title}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link href="/gallery" className="btn btn-secondary btn-lg">
              استكشف معرض الصور الكامل ✦
            </Link>
          </div>
        </div>
      </section>

      {/* Royal Services */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <h2 className="section-title reveal">خدماتنا الملكية الشاملة</h2>
          <div className="gold-separator reveal">
            <span className="gold-separator-icon">✦</span>
          </div>
          <p className="section-subtitle reveal">نقدّم لكم باقات متكاملة تشمل كافة تفاصيل الحفل لتتفرغوا للاحتفال بفرحتكم</p>

          <div className="grid grid-3">
            {services.map((service, i) => (
              <div key={service.id} className="reveal" style={{
                textAlign: 'center',
                padding: 'var(--space-8)',
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--warm-gray-200)',
                transition: 'all var(--transition-base)',
                animationDelay: `${i * 0.1}s`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 'var(--space-4)' }}>{service.icon}</span>
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-3)', color: 'var(--dark-brown)' }}>{service.name}</h4>
                <p className="card-text">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONLY ONE Single Elegant VIP Feature Banner for Digital Invitation & Guest Album */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #1C1813 0%, #2D251A 100%)', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 300 }} className="reveal">
              <span className="badge badge-gold" style={{ marginBottom: 'var(--space-3)', display: 'inline-block' }}>
                👑 ميزة حصرية خاصة لعملاء قاعات النعمان
              </span>
              <h2 style={{ color: 'var(--white)', marginBottom: 'var(--space-4)', fontSize: '2.2rem' }}>
                بطاقة دعوة إلكترونية فاخرة وألبوم صور حي لضيوفكم
              </h2>
              <p style={{ color: 'var(--gold-light)', fontSize: 'var(--text-lg)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                نقدم لكل عريس وعروس يحجزون في قاعات النعمان خدمة تصميم بطاقة دعوة إلكترونية تفاعلية مجانية متكاملة (مع جولة موسيقية، عد تنازلي، تأكيد الحضور، وألبوم صور مباشر يشارك فيه الضيوف لحظات الحفل).
              </p>
              
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <Link href="/invitations" className="btn btn-primary btn-lg" style={{ boxShadow: '0 6px 20px rgba(212,175,55,0.3)' }}>
                  معاينة نماذج وقوالب الدعوات ✦
                </Link>
                <Link href="/login" className="btn btn-secondary btn-lg" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#FFFFFF' }}>
                  دخول العميل للمحرر
                </Link>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 300, display: 'flex', justifyContent: 'center' }} className="reveal">
              <img
                src="/images/invitation-promo.jpg"
                alt="خدمة الدعوات الإلكترونية لعملاء القاعات"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  maxWidth: 460,
                  width: '100%',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  border: '2px solid rgba(212,175,55,0.3)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Real Testimonials Showcase */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container reveal">
          <RoyalTestimonials />
        </div>
      </section>

      {/* Book a Viewing / Contact CTA */}
      <section className="section" style={{ textAlign: 'center', background: '#FFFFFF' }}>
        <div className="container reveal">
          <h2 className="section-title">ابدأ التخطيط لليلة العمر في قاعات النعمان</h2>
          <div className="gold-separator">
            <span className="gold-separator-icon">✦</span>
          </div>
          <p className="section-subtitle">يسعدنا استقبالكم واستعراض القاعات مباشرة مع مستشاري حفلات الزفاف لدينا</p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg" style={{ boxShadow: '0 8px 25px rgba(184,148,79,0.35)' }}>
              احجز موعد للمعاينة الميدانية ✦
            </Link>
            <a href="tel:065000000" className="btn btn-secondary btn-lg">
              📞 اتصل بإدارة القاعات: 06 500 0000
            </a>
          </div>
        </div>
      </section>

      {/* Floating Royal Concierge Quick Action */}
      <RoyalConcierge />

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
