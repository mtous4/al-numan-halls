'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';

const GALLERY_ITEMS = [
  { id: 1, title: 'واجهة وبناء قاعات النعمان الفاخرة', category: 'halls', image: '/images/gallery/gallery-1.jpg' },
  { id: 2, title: 'زفة العروسين على الدرج الملكي', category: 'zaffeh', image: '/images/gallery/gallery-2.jpg' },
  { id: 3, title: 'كوشة العروسين الملكية مع الإضاءة الليزرية', category: 'kosha', image: '/images/gallery/gallery-3.jpg' },
  { id: 4, title: 'تنسيق طاولات الضيافة والسنتربيس الذهبي', category: 'decor', image: '/images/gallery/gallery-4.jpg' },
  { id: 5, title: 'منصة الحفل ومؤثرات الدخان والإنارة الذكية', category: 'kosha', image: '/images/gallery/gallery-5.jpg' },
  { id: 6, title: 'قاعة رويال هول الكبرى مع الكراسي الذهبية', category: 'halls', image: '/images/gallery/gallery-6.jpg' },
  { id: 7, title: 'طاولة الشرف VIP مع ثريا الورد المضيئة', category: 'halls', image: '/images/gallery/gallery-7.jpg' },
  { id: 8, title: 'بهو واستقبال قاعة رويال هول الفخمة', category: 'halls', image: '/images/gallery/gallery-8.jpg' },
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
      <div className="page-banner" style={{ background: 'linear-gradient(180deg, rgba(20,18,15,0.7) 0%, rgba(20,18,15,0.9) 100%), url(/images/gallery/gallery-6.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-6)' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', color: '#FFFFFF', fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>
            معرض صور قاعات النعمان
          </h1>
          <p style={{ color: '#D4AF37', fontSize: '1.05rem', margin: 0 }}>
            شاهد لقطات حية وتفاصيل أصيلة من صالات الأفراح والكوشات والزفات الملكية
          </p>
        </div>
      </div>

      <section className="section" style={{ background: '#FAFAF7' }}>
        <div className="container">
          {/* Filters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
            {[
              { id: 'all', label: 'كافة الصور (8)' },
              { id: 'halls', label: 'القاعات والمداخل' },
              { id: 'zaffeh', label: 'الزفات والدرج الملكي' },
              { id: 'kosha', label: 'الكوشات والمسرح' },
              { id: 'decor', label: 'الديكور وطاولات الضيوف' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`btn btn-sm ${selectedFilter === f.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: '20px', padding: '6px 18px' }}
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
                style={{
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid #EBE5DB',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onClick={() => setLightboxImg(item)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 35px rgba(184, 148, 79, 0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.04)';
                }}
              >
                <div style={{ height: 320, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="gallery-hover-img"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(20, 18, 15, 0.85) 0%, transparent 60%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: 'var(--space-4)'
                    }}
                  >
                    <div>
                      <span style={{ color: '#D4AF37', fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: 2 }}>
                        قاعات النعمان
                      </span>
                      <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontFamily: 'var(--font-heading)' }}>
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="modal-overlay" onClick={() => setLightboxImg(null)} style={{ background: 'rgba(0,0,0,0.92)' }}>
          <div className="modal-content" style={{ maxWidth: 850, background: 'transparent', boxShadow: 'none' }} onClick={e => e.stopPropagation()}>
            <img
              src={lightboxImg.image}
              alt={lightboxImg.title}
              style={{ width: '100%', maxHeight: '82vh', objectFit: 'contain', borderRadius: 'var(--radius-xl)', border: '2px solid #C9A96E' }}
            />
            <div style={{ textAlign: 'center', marginTop: 'var(--space-4)', color: '#FFFFFF' }}>
              <h3 style={{ color: '#D4AF37', fontFamily: 'var(--font-heading)', margin: '0 0 var(--space-2) 0' }}>{lightboxImg.title}</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setLightboxImg(null)} style={{ borderRadius: '20px', borderColor: '#D4AF37', color: '#FFF' }}>
                ✕ إغلاق الصورة
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
