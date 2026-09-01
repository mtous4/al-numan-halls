'use client';
import { useState } from 'react';

export default function RoyalConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 9999, direction: 'rtl' }}>
      {isOpen && (
        <div style={{
          background: 'linear-gradient(135deg, #1C1814 0%, #2B231B 100%)',
          border: '1.5px solid #D4AF37',
          borderRadius: '16px',
          padding: '18px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          color: '#FFFFFF',
          width: 280,
          marginBottom: 12,
          animation: 'slideUp 0.3s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 8 }}>
            <span style={{ fontWeight: 'bold', color: '#D4AF37', fontSize: '0.9rem' }}>👑 كونسيرج النعمان</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', fontSize: '1.1rem' }}
            >
              ✕
            </button>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#DDD', lineHeight: 1.5, marginBottom: 14 }}>
            أهلاً بكم في قاعات النعمان. يسعدنا الرد على استفساراتكم وحجز مواعيد المعاينة المباشرة.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a
              href="https://wa.me/962790000000?text=مرحباً، أود الاستفسار عن حجز قاعات النعمان"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: '#25D366',
                color: '#FFFFFF',
                padding: '9px 12px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}
            >
              <span>💬 محادثة عبر واتساب</span>
            </a>
            <a
              href="tel:+96265000000"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                padding: '9px 12px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                textDecoration: 'none'
              }}
            >
              <span>📞 اتصال مباشر: 06 500 0000</span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'linear-gradient(135deg, #D4AF37, #8B7340)',
          color: '#FFFFFF',
          border: '2px solid rgba(255,255,255,0.5)',
          borderRadius: '30px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: '0.88rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 6px 25px rgba(0,0,0,0.35)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ fontSize: '1.1rem' }}>💬</span>
        <span>تواصل سريع</span>
      </button>
    </div>
  );
}
