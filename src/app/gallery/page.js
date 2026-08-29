'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';

const GALLERY_ITEMS = [
  { id: 1, title: 'قاعة الملكية - الديكور الملكي', category: 'halls', image: '/images/halls/hall-royal.jpg' },
  { id: 2, title: 'قاعة الأندلس - الإطلالة والحدائق', category: 'halls', image: '/images/halls/hall-andalus.jpg' },
  { id: 3, title: 'قاعة الفخامة - الأجواء الحميمية', category: 'halls', image: '/images/halls/hall-elegance.jpg' },
  { id: 4, title: 'إعدادات الحفل والزهور الفاخرة', category: 'decor', image: '/images/hero.jpg' },
  { id: 5, title: 'جلسة تصوير العروسين', category: 'couples', image: '/images/gallery/couple-1.jpg' },
  { id: 6, title: 'دعوة زفاف رقمية متكاملة', category: 'invites', image: '/images/invitation-promo.jpg' },
];

function GalleryContent() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [lightboxImg, setLightboxImg] = useState(null);

  const filtered = selectedFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedFilter);

  return (
    <>
      <Header />
      <div className="page-banner">
        <div className="container">
          <h1>معرض الصور</h1>
          <p>شاهد لقطات حية من أبهى اللحظات والتفاصيل الفاخرة في قاعات النعمان</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          {/* Filters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
            {[
              { id: 'all', label: 'الكل' },
              { id: 'halls', label: 'القاعات الفاخرة' },
              { id: 'decor', label: 'الديكور والزهور' },
              { id: 'couples', label: 'العرائس والمناسبات' },
              { id: 'invites', label: 'الدعوات الرقمية' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`btn btn-sm ${selectedFilter === f.id ? 'btn-primary' : 'btn-secondary'}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-3" style={{ gap: 'var(--space-6)' }}>
            {filtered.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}
                onClick={() => setLightboxImg(item)}
              >
                <div style={{ height: 280, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    className="gallery-hover-img"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(44, 36, 23, 0.8), transparent 60%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: 'var(--space-4)'
                    }}
                  >
                    <span style={{ color: 'var(--white)', fontSize: 'var(--text-base)', fontFamily: 'var(--font-heading)' }}>
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="modal-overlay" onClick={() => setLightboxImg(null)}>
          <div className="modal-content" style={{ maxWidth: 800, background: 'transparent', boxShadow: 'none' }} onClick={e => e.stopPropagation()}>
            <img
              src={lightboxImg.image}
              alt={lightboxImg.title}
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 'var(--radius-lg)' }}
            />
            <div style={{ textAlign: 'center', marginTop: 'var(--space-4)', color: 'var(--white)' }}>
              <h3 style={{ color: 'var(--gold-light)' }}>{lightboxImg.title}</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setLightboxImg(null)} style={{ marginTop: 'var(--space-2)' }}>
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default function GalleryPage() {
  return (
    <AuthProvider>
      <GalleryContent />
    </AuthProvider>
  );
}
