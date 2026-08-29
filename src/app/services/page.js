'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { initializeData, getServices } from '@/lib/data';

function ServicesContent() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    initializeData();
    setServices(getServices());
  }, []);

  const extraPackages = [
    {
      title: 'باقة الفخامة المتكاملة',
      price: 'باقة مخصصة',
      badge: 'الأكثر طلباً',
      features: ['حجز قاعة الملكية كاملة', 'تصميم كوشة ملكية مخصصة', 'بوفيه عشاء عربي وغربي فاخر لـ 500 ضيف', 'خدمة الضيافة والمشروبات الملكية', 'فريق تصوير فيديو وفوتوغرافي كامل + ألبوم فاخر', 'دعوة زفاف إلكترونية مع خدمة RSVP وإدارة الحضور', 'منسق حفل خاص (Wedding Planner)']
    },
    {
      title: 'باقة الأناقة العصرية',
      price: 'باقة مميزة',
      badge: 'عصرية',
      features: ['حجز قاعة الأندلس', 'تنسيق زهور طبيعية وتزيين الطاولات', 'بوفيه عشاء فاخر لـ 300 ضيف', 'نظام إضاءة ديجيتال ومؤثرات خاصة', 'تصوير فوتوغرافي وفيديو احترافي', 'دعوة إلكترونية مخصصة بقوالب النعمان', 'DJ محترف مع هندسة صوت متقدمة']
    },
    {
      title: 'باقة الذهب الحميمية',
      price: 'باقة راقية',
      badge: 'حميمية',
      features: ['حجز قاعة الفخامة', 'كوشة وتنسيق ديكور أنيق', 'بوفيه ضيافة راقي لـ 200 ضيف', 'تصوير عالي الدقة', 'دعوة زفاف إلكترونية متجاوبة', 'خدمة صف سيارات مجانية للضيوف']
    }
  ];

  return (
    <>
      <Header />
      <div className="page-banner">
        <div className="container">
          <h1>خدماتنا المتكاملة</h1>
          <p>نعتني بأدق التفاصيل لتستمتعوا بكل لحظة في ليلة العمر</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <h2 className="section-title">كل ما تحتاجه في مكان واحد</h2>
          <div className="gold-separator">
            <span className="gold-separator-icon">✦</span>
          </div>
          <p className="section-subtitle">نوفر لكم منظومة متكاملة من خدمات الأعراس بأعلى درجات الاحترافية والذوق الرفيع</p>

          <div className="grid grid-3">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="card"
                style={{
                  padding: 'var(--space-8)',
                  textAlign: 'center',
                  background: 'var(--off-white)',
                  border: '1px solid var(--warm-gray-200)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>{svc.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>
                  {svc.name}
                </h3>
                <p style={{ color: 'var(--warm-gray-600)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                  {svc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Packages */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <h2 className="section-title">باقات الأعراس المميزة</h2>
          <div className="gold-separator">
            <span className="gold-separator-icon">✦</span>
          </div>
          <p className="section-subtitle">اختر الباقة الأنسب لزفاف أحلامك مع إمكانية التخصيص الكامل</p>

          <div className="grid grid-3">
            {extraPackages.map((pkg, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: 'var(--space-8)',
                  background: 'var(--white)',
                  position: 'relative',
                  border: idx === 0 ? '2px solid var(--gold-primary)' : '1px solid var(--warm-gray-200)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                    <span className="badge badge-gold">{pkg.badge}</span>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gold-dark)', fontWeight: 'bold' }}>{pkg.price}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)' }}>
                    {pkg.title}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-8) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} style={{ fontSize: 'var(--text-sm)', color: 'var(--warm-gray-700)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                        <span style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact" className={`btn ${idx === 0 ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%', textAlign: 'center' }}>
                  طلب استشارة وحجز
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default function ServicesPage() {
  return (
    <AuthProvider>
      <ServicesContent />
    </AuthProvider>
  );
}
