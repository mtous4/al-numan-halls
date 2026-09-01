'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { initializeData, getHalls } from '@/lib/data';

function HallsContent() {
  const [halls, setHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);

  useEffect(() => {
    initializeData();
    setHalls(getHalls());
  }, []);

  return (
    <>
      <Header />
      <div className="page-banner">
        <div className="container">
          <h1>قاعاتنا الفاخرة</h1>
          <p>قاعات مجهزة بأعلى المعايير العالمية لتمنحكم ليلة زفاف استثنائية</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="grid grid-1" style={{ gap: 'var(--space-12)' }}>
            {halls.map((hall, index) => (
              <div
                key={hall.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                  flexWrap: 'wrap',
                  overflow: 'hidden',
                  cursor: 'default',
                  border: '1px solid var(--warm-gray-200)'
                }}
              >
                <div style={{ flex: '1 1 450px', minHeight: 350, position: 'relative' }}>
                  <img
                    src={hall.image}
                    alt={hall.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    className="badge badge-gold"
                    style={{
                      position: 'absolute',
                      top: 'var(--space-4)',
                      right: 'var(--space-4)',
                      fontSize: 'var(--text-sm)',
                      padding: 'var(--space-2) var(--space-4)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                  >
                    ✦ {hall.badge || hall.nameEn}
                  </span>
                </div>

                <div style={{ flex: '1 1 450px', padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', color: 'var(--dark-brown)', margin: 0 }}>
                      {hall.name}
                    </h2>
                    <span className="text-muted" style={{ fontSize: 'var(--text-sm)' }}>{hall.nameEn}</span>
                  </div>

                  <div className="gold-separator" style={{ margin: 'var(--space-3) 0 var(--space-4) 0', justifyContent: 'flex-start' }}>
                    <span className="gold-separator-icon" style={{ fontSize: '1rem' }}>✦</span>
                  </div>

                  <p style={{ color: 'var(--warm-gray-600)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                    {hall.description}
                  </p>

                  <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
                    <div style={{ background: 'var(--cream)', padding: 'var(--space-3) var(--space-5)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                      <span style={{ display: 'block', fontSize: 'var(--text-xl)', fontWeight: 'bold', color: 'var(--gold-primary)' }}>👥 {hall.capacity}</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--warm-gray-600)' }}>السعة الإجمالية</span>
                    </div>
                    <div style={{ background: 'var(--cream)', padding: 'var(--space-3) var(--space-5)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                      <span style={{ display: 'block', fontSize: 'var(--text-xl)', fontWeight: 'bold', color: 'var(--gold-primary)' }}>📐 {hall.area}</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--warm-gray-600)' }}>المساحة</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)', color: 'var(--dark-brown)' }}>المزايا والمرافق:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      {hall.features?.map((f, i) => (
                        <span key={i} className="badge badge-gold" style={{ fontSize: 'var(--text-xs)' }}>
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                    <Link href="/contact" className="btn btn-primary">
                      احجز موعد للمعاينة
                    </Link>
                    <a href="tel:0799523360" className="btn btn-secondary">
                      استفسار هاتفي
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default function HallsPage() {
  return (
    <AuthProvider>
      <HallsContent />
    </AuthProvider>
  );
}
