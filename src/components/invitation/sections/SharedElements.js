'use client';
import { useState, useEffect } from 'react';

// ========== Live Arabic Text Countdown ==========
export function CountdownText({ targetDate, primaryColor = '#B8944F' }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate) return;

    const calculate = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div style={{ textAlign: 'center', margin: 'var(--space-6) 0' }}>
      <div style={{ fontSize: '0.85rem', color: '#8A7D6B', marginBottom: 'var(--space-2)' }}>العد التنازلي</div>
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.25rem',
        color: primaryColor,
        fontWeight: 'bold',
        direction: 'rtl'
      }}>
        {timeLeft.days} يوم {timeLeft.hours} ساعة {timeLeft.minutes} دقيقة {timeLeft.seconds} ثانية
      </div>
    </div>
  );
}

// ========== Wedding Calendar Widget with Heart on Day ==========
export function WeddingCalendar({ weddingDate, primaryColor = '#B8944F', dark = false }) {
  const dateObj = weddingDate ? new Date(weddingDate) : new Date(2027, 3, 17);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();

  const monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  // Days calculation
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun, 6 = Sat
  // Adjust for Arabic week starting Saturday: Sat(0), Sun(1), Mon(2), Tue(3), Wed(4), Thu(5), Fri(6)
  const arabicFirstDay = (firstDay + 1) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weekHeaders = ['سب', 'أح', 'إث', 'ثل', 'أر', 'خم', 'جم'];
  const calendarCells = [];

  for (let i = 0; i < arabicFirstDay; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('حفل زفاف');
    const start = dateObj.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${start}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{
      maxWidth: 360,
      margin: 'var(--space-6) auto',
      background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(255, 255, 255, 0.95)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-6) var(--space-4)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
      border: `1px solid ${primaryColor}33`,
      textAlign: 'center'
    }}>
      {/* Month & Year Title */}
      <h4 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.4rem',
        color: primaryColor,
        marginBottom: 'var(--space-4)',
        fontWeight: 'bold'
      }}>
        {monthNames[month]} {year}
      </h4>

      {/* Weekday Headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 'var(--space-3)', borderBottom: `1px solid ${primaryColor}22`, paddingBottom: 6 }}>
        {weekHeaders.map((w, i) => (
          <span key={i} style={{ fontSize: '0.8rem', color: dark ? '#A89B88' : '#8A7D6B', fontWeight: '500' }}>{w}</span>
        ))}
      </div>

      {/* Days Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
        {calendarCells.map((d, index) => {
          if (!d) return <div key={index} />;
          const isWeddingDay = d === day;
          return (
            <div
              key={index}
              style={{
                height: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                position: 'relative',
                fontWeight: isWeddingDay ? 'bold' : 'normal',
                color: isWeddingDay ? '#FFFFFF' : (dark ? '#E0D8CC' : '#2C2417')
              }}
            >
              {isWeddingDay && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, ${primaryColor}, #8B7340)`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 12px ${primaryColor}55`
                }}>
                  <span style={{ position: 'relative', zIndex: 2, fontSize: '0.85rem' }}>{d}</span>
                  <span style={{
                    position: 'absolute',
                    top: -4,
                    right: -2,
                    fontSize: '10px'
                  }}>🤍</span>
                </div>
              )}
              {!isWeddingDay && d}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)', borderTop: `1px solid ${primaryColor}15` }}>
        <button
          type="button"
          onClick={handleAddToCalendar}
          style={{
            background: 'none',
            border: 'none',
            color: primaryColor,
            fontSize: '0.85rem',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontFamily: 'var(--font-body)'
          }}
        >
          📅 أضف إلى التقويم
        </button>
      </div>
    </div>
  );
}

// ========== Vertical Connected Timeline without Emojis ==========
export function ConnectedTimeline({ schedule = [], primaryColor = '#B8944F', dark = false }) {
  if (!schedule || schedule.length === 0) return null;

  return (
    <div style={{ maxWidth: 360, margin: 'var(--space-6) auto', position: 'relative', padding: 'var(--space-4) var(--space-6)' }}>
      {/* Central Connecting Vertical Line */}
      <div style={{
        position: 'absolute',
        top: 24,
        bottom: 24,
        left: '50%',
        width: 2,
        background: primaryColor,
        transform: 'translateX(-50%)',
        opacity: 0.4
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', position: 'relative', zIndex: 2 }}>
        {schedule.map((item, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative'
          }}>
            {/* Title */}
            <div style={{
              width: '42%',
              textAlign: 'right',
              fontSize: '0.95rem',
              fontWeight: '500',
              color: dark ? '#FFFFFF' : '#2C2417'
            }}>
              {item.name}
            </div>

            {/* Central Node Dot */}
            <div style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: primaryColor,
              border: `3px solid ${dark ? '#0D0D14' : '#FFFFFF'}`,
              boxShadow: `0 0 0 2px ${primaryColor}66`,
              flexShrink: 0
            }} />

            {/* Time */}
            <div style={{
              width: '42%',
              textAlign: 'left',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-heading)',
              color: primaryColor,
              fontWeight: 'bold',
              direction: 'ltr'
            }}>
              {item.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== 3D Stack / Interactive Photo Album Carousel ==========
export function PhotoAlbumStack({ photos = [], primaryColor = '#B8944F' }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div style={{ margin: 'var(--space-8) 0', textAlign: 'center' }}>
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        color: primaryColor,
        fontSize: '1.4rem',
        marginBottom: 'var(--space-4)'
      }}>
        ألبوم الزفاف
      </h3>

      {/* 3D Stack View */}
      <div style={{
        position: 'relative',
        width: 270,
        height: 360,
        margin: '0 auto',
        perspective: 1000
      }}>
        {photos.map((photo, index) => {
          const offset = (index - currentIndex + photos.length) % photos.length;
          // Only render active, previous, and next
          if (offset > 2 && offset < photos.length - 1) return null;

          let transform = 'scale(0.8) translateY(20px)';
          let zIndex = 1;
          let opacity = 0.4;

          if (offset === 0) {
            transform = 'scale(1) translateY(0)';
            zIndex = 10;
            opacity = 1;
          } else if (offset === 1) {
            transform = 'scale(0.88) translateX(-35px) translateY(10px) rotate(-4deg)';
            zIndex = 5;
            opacity = 0.7;
          } else if (offset === photos.length - 1) {
            transform = 'scale(0.88) translateX(35px) translateY(10px) rotate(4deg)';
            zIndex = 5;
            opacity = 0.7;
          }

          return (
            <div
              key={index}
              onClick={offset !== 0 ? handleNext : undefined}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: offset === 0 ? '0 20px 40px rgba(0,0,0,0.25)' : '0 10px 20px rgba(0,0,0,0.15)',
                transform,
                zIndex,
                opacity,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
            >
              <img
                src={photo}
                alt={`صورة ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          );
        })}
      </div>

      {/* Indicator Counter (e.g., 1 / 5) */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
        <button
          onClick={handlePrev}
          style={{
            background: 'none',
            border: 'none',
            color: primaryColor,
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: 4
          }}
        >
          ❮
        </button>

        <span style={{ fontSize: '0.9rem', color: '#8A7D6B', fontWeight: 'bold' }}>
          {photos.length} / {currentIndex + 1}
        </span>

        <button
          onClick={handleNext}
          style={{
            background: 'none',
            border: 'none',
            color: primaryColor,
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: 4
          }}
        >
          ❯
        </button>
      </div>
    </div>
  );
}

// ========== Guestbook / سجل التهاني (Simple Name + Note Only) ==========
export function GuestbookSection({ slug, primaryColor = '#B8944F', dark = false }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && slug) {
      const stored = localStorage.getItem('alnuman_rsvp');
      if (stored) {
        try {
          const list = JSON.parse(stored).filter(r => r.invitationSlug === slug && r.message);
          setRecentMessages(list);
        } catch {}
      }
    }
  }, [slug, submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitationSlug: slug || 'demo',
          guestName: name,
          attending: true,
          guestCount: 1,
          message
        })
      });

      if (res.ok) {
        setSubmitted(true);
        // Also persist locally
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('alnuman_rsvp') || '[]';
          const list = JSON.parse(stored);
          list.push({
            id: `rsvp_${Date.now()}`,
            invitationSlug: slug || 'demo',
            guestName: name,
            attending: true,
            message,
            submittedAt: new Date().toISOString()
          });
          localStorage.setItem('alnuman_rsvp', JSON.stringify(list));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 440, margin: 'var(--space-8) auto', padding: '0 var(--space-4)' }}>
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        color: primaryColor,
        fontSize: '1.5rem',
        textAlign: 'center',
        marginBottom: 'var(--space-6)'
      }}>
        سجل التهاني
      </h3>

      {submitted ? (
        <div style={{
          background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.95)',
          padding: 'var(--space-6)',
          borderRadius: 'var(--radius-xl)',
          border: `1px solid ${primaryColor}`,
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease'
        }}>
          <div style={{ fontSize: '2.5rem', color: primaryColor, marginBottom: 'var(--space-2)' }}>✨</div>
          <h4 style={{ color: primaryColor, marginBottom: 'var(--space-2)' }}>تم إرسال تهنئتكم بنجاح</h4>
          <p style={{ fontSize: 'var(--text-sm)', color: dark ? '#C4B8A8' : '#4D4338', margin: 0 }}>
            شكراً لمشاعركم الصادقة ودعواتكم الطيبة للعروسين.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{
          background: dark ? 'rgba(255,255,255,0.05)' : '#FFFFFF',
          padding: 'var(--space-6)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: `1px solid ${primaryColor}33`,
          textAlign: 'right'
        }}>
          <div className="form-group">
            <input
              type="text"
              required
              className="form-input"
              placeholder="أدخل اسمك *"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                borderColor: `${primaryColor}44`,
                background: dark ? 'rgba(255,255,255,0.07)' : '#FAFAF7',
                color: dark ? '#FFFFFF' : '#2C2417',
                padding: 'var(--space-3)'
              }}
            />
          </div>

          <div className="form-group">
            <textarea
              required
              className="form-input"
              placeholder="اكتب تهنئتك *"
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{
                borderColor: `${primaryColor}44`,
                background: dark ? 'rgba(255,255,255,0.07)' : '#FAFAF7',
                color: dark ? '#FFFFFF' : '#2C2417',
                padding: 'var(--space-3)',
                minHeight: 90
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${primaryColor}, #8B7340)`,
              border: 'none',
              padding: '0.8rem',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {loading ? 'جارٍ الإرسال...' : 'إرسال التهنئة'}
          </button>
        </form>
      )}

      {/* List of Recent Congratulations */}
      {recentMessages.length > 0 && (
        <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {recentMessages.slice(0, 4).map((msg, i) => (
            <div key={i} style={{
              background: dark ? 'rgba(255,255,255,0.04)' : '#F5EFE6',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              borderRight: `3px solid ${primaryColor}`,
              textAlign: 'right'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.85rem', color: primaryColor }}>{msg.guestName}</div>
              <div style={{ fontSize: '0.85rem', color: dark ? '#D4C5A0' : '#4D4338', marginTop: 2 }}>{msg.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
