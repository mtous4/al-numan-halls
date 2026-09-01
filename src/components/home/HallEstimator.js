'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HallEstimator() {
  const [guests, setGuests] = useState(300);
  const [eventType, setEventType] = useState('wedding');

  const getRecommendedHall = () => {
    if (guests > 320) {
      return {
        name: 'قاعة الملكية',
        nameEn: 'The Royal Hall',
        capacity: 'تتسع حتى 500 ضيف',
        image: '/images/halls/hall-royal.jpg',
        badge: 'الخيار الأنسب للحفلات الكبرى',
        desc: 'ثريات كريستالية عملاقة وسقف ملكي مزخرف بالذهب مع مسرح مهيب وغرفة عروس VIP خاصة.'
      };
    } else if (guests > 220) {
      return {
        name: 'قاعة الأندلس',
        nameEn: 'Al Andalus Hall',
        capacity: 'تتسع حتى 300 ضيف',
        image: '/images/halls/hall-andalus.jpg',
        badge: 'طراز أندلسي فاخر بإطلالة حدائق',
        desc: 'نوافذ بانورامية طبيعية تجمع بين الأصالة العربية الكلاسيكية والتجهيزات العصرية الحديثة.'
      };
    } else {
      return {
        name: 'قاعة الفخامة',
        nameEn: 'The Elegance Hall',
        capacity: 'تتسع حتى 200 ضيف',
        image: '/images/halls/hall-elegance.jpg',
        badge: 'أجواء دافئة وحميمية راقية',
        desc: 'ديكور كلاسيكي راقٍ وإضاءة رومانسية مصممة خصيصاً للمناسبات العائلية وحفلات الزفاف الحميمية.'
      };
    }
  };

  const hall = getRecommendedHall();

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1A1612 0%, #2A2218 50%, #15110D 100%)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-10) var(--space-8)',
      color: '#FFFFFF',
      boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <span className="badge badge-gold" style={{ marginBottom: 'var(--space-2)', fontSize: '0.85rem' }}>
          ✦ مساعد اختيار القاعة الذكي
        </span>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', color: '#D4AF37', margin: 'var(--space-2) 0' }}>
          اختر حجم حفلكم لنقترح القاعة المثالية
        </h3>
        <p style={{ color: '#C9BBA8', fontSize: '0.95rem', maxWidth: 540, margin: '0 auto' }}>
          حدد عدد الضيوف المتوقع لنعرض لك القاعة الأكثر ملاءمة وفخامة لليلتكم الاستثنائية
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)', alignItems: 'center' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <label style={{ display: 'block', color: '#D4AF37', fontWeight: 'bold', marginBottom: 'var(--space-3)' }}>
            عدد الضيوف المتوقع: <span style={{ fontSize: '1.3rem', color: '#FFFFFF' }}>{guests} ضيف</span>
          </label>
          
          <input
            type="range"
            min="80"
            max="500"
            step="10"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#D4AF37',
              cursor: 'pointer',
              marginBottom: 'var(--space-6)'
            }}
          />

          <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
            {[150, 300, 480].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setGuests(num)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: guests === num ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.15)',
                  background: guests === num ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.05)',
                  color: guests === num ? '#D4AF37' : '#C9BBA8',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {num} ضيف
              </button>
            ))}
          </div>

          <label style={{ display: 'block', color: '#D4AF37', fontWeight: 'bold', marginBottom: 'var(--space-3)' }}>
            نوع المناسبة:
          </label>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {[
              { id: 'wedding', label: 'حفل زفاف ملكي' },
              { id: 'engagement', label: 'حفل خطوبة وملكة' },
              { id: 'private', label: 'مناسبة خاصة' }
            ].map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setEventType(t.id)}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: eventType === t.id ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.15)',
                  background: eventType === t.id ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.05)',
                  color: eventType === t.id ? '#D4AF37' : '#C9BBA8',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid rgba(212,175,55,0.4)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          transition: 'all 0.35s ease'
        }}>
          <div style={{ height: 180, position: 'relative', overflow: 'hidden' }}>
            <img
              src={hall.image}
              alt={hall.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <span style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              background: 'rgba(15, 12, 10, 0.85)',
              backdropFilter: 'blur(6px)',
              color: '#D4AF37',
              border: '1px solid rgba(212,175,55,0.5)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              {hall.badge}
            </span>
          </div>

          <div style={{ padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFFFFF', margin: 0 }}>
                {hall.name}
              </h4>
              <span style={{ color: '#D4AF37', fontSize: '0.85rem', fontWeight: 'bold' }}>
                👥 {hall.capacity}
              </span>
            </div>
            <p style={{ color: '#D4C8B8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
              {hall.desc}
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Link
                href="/contact"
                className="btn btn-primary btn-sm"
                style={{ flex: 1, textAlign: 'center', padding: '10px 16px', borderRadius: '25px' }}
              >
                حجز موعد للمعاينة ✦
              </Link>
              <Link
                href="/halls"
                className="btn btn-secondary btn-sm"
                style={{ padding: '10px 16px', borderRadius: '25px', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
              >
                استعراض الصور
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
