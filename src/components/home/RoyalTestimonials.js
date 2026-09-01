'use client';

const TESTIMONIALS = [
  {
    couple: 'عبدالله & سارة',
    date: 'حفل زفاف - مايو 2026',
    hall: 'قاعة الملكية',
    quote: 'ليلة العمر كانت خيالية بكل تفاصيلها، التنظيم الملكي والديكور والإضاءة أبهرت جميع الحضور. شكراً لإدارة قاعات النعمان على هذا المستوى الاستثنائي!',
    rating: 5
  },
  {
    couple: 'طارق & ريم',
    date: 'حفل زفاف - يوليو 2026',
    hall: 'قاعة الأندلس',
    quote: 'الدعوة الإلكترونية والألبوم التفاعلي كانا حديث المعازيم! القاعة رائعة والخدمة والضيافة فاقت كل توقعاتنا.',
    rating: 5
  },
  {
    couple: 'فيصل & نور',
    date: 'حفل خطوبة - أغسطس 2026',
    hall: 'قاعة الفخامة',
    quote: 'أجواء حميمية راقية جداً، فريق العمل كان متواجداً معنا في كل لحظة لضمان راحة ضيوفنا وسير الحفل بسلاسة تامة.',
    rating: 5
  }
];

export default function RoyalTestimonials() {
  return (
    <div style={{
      background: 'linear-gradient(180deg, var(--off-white) 0%, #FFFFFF 100%)',
      padding: 'var(--space-12) var(--space-4)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--warm-gray-200)',
      textAlign: 'center',
      position: 'relative'
    }}>
      <span className="badge badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
        ✦ تجارب أصحاب السعادة
      </span>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--dark-brown)', marginBottom: 'var(--space-3)' }}>
        أعراس لا تُنسى في قاعات النعمان
      </h2>
      <p style={{ color: 'var(--warm-gray-600)', maxWidth: 580, margin: '0 auto var(--space-8)' }}>
        نفخر بكوننا جزءاً من أجمل ذكريات مئات العرسان وعائلاتهم في ليلة العمر
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)', maxWidth: 1100, margin: '0 auto' }}>
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              border: '1.5px solid #F0ECE4',
              boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'var(--gold-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#F0ECE4';
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <div style={{ color: '#D4AF37', fontSize: '1.1rem', letterSpacing: 2 }}>
                  {'★'.repeat(t.rating)}
                </div>
                <span className="badge badge-gold" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                  {t.hall}
                </span>
              </div>
              <p style={{ color: 'var(--warm-gray-700)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
                "{t.quote}"
              </p>
            </div>

            <div style={{ borderTop: '1px solid #F5F0E8', paddingTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ color: 'var(--dark-brown)', fontSize: '0.95rem' }}>{t.couple}</strong>
              <span style={{ color: 'var(--warm-gray-400)', fontSize: '0.78rem' }}>{t.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
