'use client';
import { useState, useEffect, useRef } from 'react';

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

  const firstDay = new Date(year, month, 1).getDay();
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
      <h4 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.4rem',
        color: primaryColor,
        marginBottom: 'var(--space-4)',
        fontWeight: 'bold'
      }}>
        {monthNames[month]} {year}
      </h4>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 'var(--space-3)', borderBottom: `1px solid ${primaryColor}22`, paddingBottom: 6 }}>
        {weekHeaders.map((w, i) => (
          <span key={i} style={{ fontSize: '0.8rem', color: dark ? '#A89B88' : '#8A7D6B', fontWeight: '500' }}>{w}</span>
        ))}
      </div>

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
            <div style={{
              width: '42%',
              textAlign: 'right',
              fontSize: '0.95rem',
              fontWeight: '500',
              color: dark ? '#FFFFFF' : '#2C2417'
            }}>
              {item.name}
            </div>

            <div style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: primaryColor,
              border: `3px solid ${dark ? '#0D0D14' : '#FFFFFF'}`,
              boxShadow: `0 0 0 2px ${primaryColor}66`,
              flexShrink: 0
            }} />

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

// ========== Guaranteed Auto-Playing 3D Coverflow Photo Album Carousel ==========
const DEFAULT_FALLBACK_PHOTOS = [
  '/images/gallery/couple-1.jpg',
  '/images/halls/hall-royal.jpg',
  '/images/halls/hall-andalus.jpg',
  '/images/halls/hall-elegance.jpg'
];

export function PhotoAlbumStack({ photos, primaryColor = '#B8944F' }) {
  const displayPhotos = (photos && photos.length > 0) ? photos : DEFAULT_FALLBACK_PHOTOS;
  // If only 1 photo provided, duplicate it so 3D rotation works nicely
  const activePhotos = displayPhotos.length === 1
    ? [displayPhotos[0], ...DEFAULT_FALLBACK_PHOTOS.slice(1)]
    : displayPhotos;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Unstoppable active interval autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activePhotos.length);
    }, 2200);

    return () => clearInterval(timer);
  }, [activePhotos.length]);

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % activePhotos.length);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(prev => (prev - 1 + activePhotos.length) % activePhotos.length);
  };

  return (
    <div style={{ margin: 'var(--space-8) 0', textAlign: 'center', position: 'relative', overflow: 'hidden', padding: 'var(--space-4) 0' }}>
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        color: primaryColor,
        fontSize: '1.5rem',
        marginBottom: 'var(--space-6)'
      }}>
        ألبوم الزفاف
      </h3>

      {/* 3D Coverflow Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 520,
        height: 380,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px'
      }}>
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          type="button"
          aria-label="Previous"
          style={{
            position: 'absolute',
            left: 8,
            zIndex: 35,
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'rgba(30, 24, 15, 0.75)',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            cursor: 'pointer',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}
        >
          ❮
        </button>

        <button
          onClick={handleNext}
          type="button"
          aria-label="Next"
          style={{
            position: 'absolute',
            right: 8,
            zIndex: 35,
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'rgba(30, 24, 15, 0.75)',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            cursor: 'pointer',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}
        >
          ❯
        </button>

        {/* 3D Angled Photos */}
        {activePhotos.map((photo, index) => {
          const total = activePhotos.length;
          let diff = (index - currentIndex) % total;
          if (diff < -Math.floor(total / 2)) diff += total;
          if (diff > Math.floor(total / 2)) diff -= total;

          const isCenter = diff === 0;
          const isLeft = diff === -1 || (total === 2 && diff === 1);
          const isRight = diff === 1;
          const isFarLeft = diff < -1;
          const isFarRight = diff > 1;

          let transform = '';
          let zIndex = 1;
          let opacity = 0;
          let filter = 'brightness(0.6)';

          if (isCenter) {
            transform = 'translateX(0) scale(1) rotateY(0deg)';
            zIndex = 25;
            opacity = 1;
            filter = 'brightness(1)';
          } else if (isLeft) {
            transform = 'translateX(-95px) scale(0.82) rotateY(35deg)';
            zIndex = 15;
            opacity = 0.85;
            filter = 'brightness(0.65)';
          } else if (isRight) {
            transform = 'translateX(95px) scale(0.82) rotateY(-35deg)';
            zIndex = 15;
            opacity = 0.85;
            filter = 'brightness(0.65)';
          } else if (isFarLeft) {
            transform = 'translateX(-165px) scale(0.65) rotateY(48deg)';
            zIndex = 5;
            opacity = 0.4;
          } else if (isFarRight) {
            transform = 'translateX(165px) scale(0.65) rotateY(-48deg)';
            zIndex = 5;
            opacity = 0.4;
          }

          return (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                position: 'absolute',
                width: 250,
                height: 350,
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: isCenter ? '0 25px 50px rgba(0,0,0,0.4)' : '0 15px 30px rgba(0,0,0,0.2)',
                transform,
                zIndex,
                opacity,
                filter,
                transition: 'all 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
                cursor: 'pointer',
                transformStyle: 'preserve-3d'
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

      {/* Dots Indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 'var(--space-4)' }}>
        {activePhotos.map((_, dotIdx) => (
          <div
            key={dotIdx}
            onClick={() => setCurrentIndex(dotIdx)}
            style={{
              width: dotIdx === currentIndex ? 26 : 8,
              height: 8,
              borderRadius: 4,
              background: dotIdx === currentIndex ? primaryColor : '#D4C5A0',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ========== Slower, Ultra-Smooth Guided Tour ==========
export function startGuidedTour() {
  setTimeout(() => {
    const scrollTarget = document.documentElement || document.body;
    let currentY = window.scrollY || 0;
    const targetY = scrollTarget.scrollHeight - window.innerHeight - 80;

    if (targetY <= 50) return;

    // Much slower, smoother pace: 320 steps over ~20 seconds
    let step = 0;
    const totalSteps = 350;
    const scrollDistance = (targetY - currentY) / totalSteps;

    const tourInterval = setInterval(() => {
      currentY += scrollDistance;
      window.scrollTo(0, currentY);
      step++;

      if (step >= totalSteps || (window.innerHeight + window.scrollY) >= (scrollTarget.scrollHeight - 50)) {
        clearInterval(tourInterval);
      }
    }, 55);

    // Stop gracefully if user touches or scrolls
    const stopTour = () => {
      clearInterval(tourInterval);
      window.removeEventListener('wheel', stopTour);
      window.removeEventListener('touchstart', stopTour);
      window.removeEventListener('keydown', stopTour);
    };

    window.addEventListener('wheel', stopTour, { passive: true });
    window.addEventListener('touchstart', stopTour, { passive: true });
    window.addEventListener('keydown', stopTour, { passive: true });
  }, 1200);
}

// ========== Guestbook / سجل التهاني ==========
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
