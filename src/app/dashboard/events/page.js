'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { getEvents, createEvent, updateEvent, deleteEvent, getEventPhotos } from '@/lib/eventAlbum';
import { QRCodeSVG } from 'qrcode.react';

function EventsDashboardContent() {
  const { user, isCustomer, isAuthenticated, loading } = useAuth();

  const [events, setEvents] = useState([]);
  const [photosMap, setPhotosMap] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEventForQR, setSelectedEventForQR] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('/images/hero.jpg');
  const [eventDate, setEventDate] = useState('2027-04-17');
  const [venue, setVenue] = useState('قاعة الملكية - قاعات النعمان');
  const [maxGuests, setMaxGuests] = useState(300);
  const [maxPhotosPerGuest, setMaxPhotosPerGuest] = useState(25);
  const [isPublic, setIsPublic] = useState(true);

  const qrRef = useRef(null);

  const loadData = () => {
    const allEvts = getEvents();
    setEvents(allEvts);

    // Count photos for each event
    const map = {};
    allEvts.forEach(ev => {
      map[ev.code] = getEventPhotos(ev.code);
    });
    setPhotosMap(map);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    createEvent({
      title: title.trim(),
      coverImage: coverImage || '/images/hero.jpg',
      eventDate,
      venue,
      maxGuests: Number(maxGuests),
      maxPhotosPerGuest: Number(maxPhotosPerGuest),
      isPublic: Boolean(isPublic),
      organizerId: user?.id || 'admin',
      organizerEmail: user?.username || 'altous4@gmail.com'
    });

    setIsCreateModalOpen(false);
    setTitle('');
    loadData();
  };

  const handleToggleStatus = (ev) => {
    const nextStatus = ev.status === 'active' ? 'closed' : 'active';
    updateEvent(ev.id, { status: nextStatus });
    loadData();
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الفعالية وكافة صورها؟')) {
      deleteEvent(id);
      loadData();
    }
  };

  // Download QR Code as PNG
  const downloadQRCode = (code, title) => {
    const svg = document.getElementById(`qr-svg-${code}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 600;
      canvas.height = 750;

      // Cream background
      ctx.fillStyle = '#FAFAF7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gold border
      ctx.strokeStyle = '#C9A96E';
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Title & instruction
      ctx.fillStyle = '#2C2417';
      ctx.font = 'bold 30px "Amiri", serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, canvas.width / 2, 70);

      ctx.fillStyle = '#8A7D6B';
      ctx.font = '20px sans-serif';
      ctx.fillText('امسح الرمز بكاميرا هاتفك لمشاركة صورك التذكارية', canvas.width / 2, 110);

      // Draw QR Code
      ctx.drawImage(img, 100, 150, 400, 400);

      // Bottom Branding
      ctx.fillStyle = '#B8944F';
      ctx.font = 'bold 24px "Amiri", serif';
      ctx.fillText('قاعات النعمان — Al Numan Halls', canvas.width / 2, 600);

      ctx.fillStyle = '#999';
      ctx.font = '16px sans-serif';
      ctx.fillText(`رمز الفعالية: ${code}`, canvas.width / 2, 640);

      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `QR-Event-${code}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  // Bulk Download All Photos
  const handleBulkDownload = (evCode, evTitle) => {
    const evPhotos = photosMap[evCode] || [];
    if (evPhotos.length === 0) {
      alert('لا توجد صور لتحميلها في هذه الفعالية حتى الآن.');
      return;
    }

    // Trigger sequential download
    evPhotos.forEach((ph, i) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = ph.url;
        link.download = `${evTitle}-${i + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, i * 350);
    });
  };

  const totalPhotosCount = Object.values(photosMap).reduce((acc, curr) => acc + curr.length, 0);

  return (
    <>
      <Header />
      <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: 'var(--off-white)' }}>
        <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>

          {/* Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Link href="/dashboard" className="text-muted text-sm">لوحة التحكم</Link>
                <span className="text-muted text-sm">/</span>
                <span className="text-gold text-sm">ألبوم الفعاليات وصور الضيوف (Event Album)</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: 'var(--space-1)', margin: 0 }}>
                إدارة ألبومات الفعاليات ورموز الـ QR
              </h2>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button onClick={() => setIsCreateModalOpen(true)} className="btn btn-primary">
                + إنشاء فعالية وألبوم QR جديد
              </button>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="stats-grid" style={{ marginBottom: 'var(--space-8)' }}>
            <div className="stat-card">
              <div className="stat-card-value" style={{ color: 'var(--gold-primary)' }}>{events.length}</div>
              <div className="stat-card-label">إجمالي الفعاليات المنشأة</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-value" style={{ color: 'var(--success)' }}>{totalPhotosCount}</div>
              <div className="stat-card-label">إجمالي صور الضيوف المرفوعة</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-value" style={{ color: 'var(--gold-dark)' }}>
                {(totalPhotosCount * 0.45).toFixed(1)} MB
              </div>
              <div className="stat-card-label">حجم التخزين المستهلك</div>
            </div>
          </div>

          {/* Events List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {events.map((ev) => {
              const evPhotos = photosMap[ev.code] || [];
              const origin = typeof window !== 'undefined' ? window.location.origin : '';
              const albumUrl = `${origin}/album/${ev.code}`;

              return (
                <div key={ev.id} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', justifyContent: 'space-between', alignItems: 'center' }}>

                  {/* Left: Info */}
                  <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flex: 1, minWidth: 280 }}>
                    <div style={{ width: 100, height: 100, borderRadius: 'var(--radius-lg)', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--warm-gray-200)' }}>
                      <img src={ev.coverImage || '/images/hero.jpg'} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0, fontSize: '1.3rem' }}>{ev.title}</h3>
                        <span className={`badge ${ev.status === 'active' ? 'badge-gold' : 'badge-muted'}`}>
                          {ev.status === 'active' ? '● نشط' : 'مغلق'}
                        </span>
                        <span className="badge" style={{ background: ev.isPublic ? 'var(--cream)' : 'var(--warm-gray-200)', color: 'var(--dark-brown)' }}>
                          {ev.isPublic ? '🌐 ألبوم عام' : '🔒 خاص بالمنظم'}
                        </span>
                      </div>

                      <p style={{ color: 'var(--warm-gray-600)', fontSize: '0.85rem', margin: '0 0 var(--space-2) 0' }}>
                        {ev.venue} • {ev.eventDate} • رمز الفعالية: <strong style={{ color: 'var(--gold-dark)' }}>{ev.code}</strong>
                      </p>

                      <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: '0.85rem', color: 'var(--gold-dark)' }}>
                        <span>📸 {evPhotos.length} صورة مرفوعة</span>
                        <span>👥 حد الصور للضيف: {ev.maxPhotosPerGuest || 25}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center: QR Code Mini View */}
                  <div style={{ textAlign: 'center', background: '#FAFAF7', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--warm-gray-200)' }}>
                    <div id={`qr-container-${ev.code}`}>
                      <QRCodeSVG id={`qr-svg-${ev.code}`} value={albumUrl} size={90} fgColor="#2C2417" />
                    </div>
                    <button
                      onClick={() => downloadQRCode(ev.code, ev.title)}
                      className="btn btn-secondary btn-sm"
                      style={{ marginTop: 'var(--space-2)', padding: '2px 8px', fontSize: '0.75rem', width: '100%' }}
                    >
                      📥 تنزيل QR للطباعة
                    </button>
                  </div>

                  {/* Right: Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', minWidth: 160 }}>
                    <Link href={`/album/${ev.code}`} target="_blank" className="btn btn-primary btn-sm" style={{ textAlign: 'center' }}>
                      🔗 فتح الألبوم التفاعلي
                    </Link>

                    <button
                      onClick={() => handleBulkDownload(ev.code, ev.title)}
                      className="btn btn-secondary btn-sm"
                    >
                      📦 تحميل كافة الصور ({evPhotos.length})
                    </button>

                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button
                        onClick={() => handleToggleStatus(ev)}
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1, fontSize: '0.75rem', padding: '4px' }}
                      >
                        {ev.status === 'active' ? 'إغلاق الفعالية' : 'إعادة فتح'}
                      </button>
                      <button
                        onClick={() => handleDelete(ev.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ color: 'var(--error)', borderColor: 'var(--error)', padding: '4px 8px' }}
                        title="حذف الفعالية"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* ========================================================= */}
        {/* Create Event Modal */}
        {/* ========================================================= */}
        {isCreateModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-4)'
          }}>
            <div className="card" style={{ maxWidth: 500, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>إنشاء فعالية وألبوم صور جديد</h3>
                <button onClick={() => setIsCreateModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              <form onSubmit={handleCreateEvent}>
                <div className="form-group">
                  <label className="form-label">اسم الفعالية / حفل الزفاف *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="مثال: حفل زفاف يوسف ودانة المبارك"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">القاعة / الموقع *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="قاعة الملكية - قاعات النعمان"
                    value={venue}
                    onChange={e => setVenue(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                  <div className="form-group">
                    <label className="form-label">تاريخ الحفل *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={eventDate}
                      onChange={e => setEventDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">الحد الأقصى للصور للضيف</label>
                    <input
                      type="number"
                      className="form-input"
                      min={1}
                      max={100}
                      value={maxPhotosPerGuest}
                      onChange={e => setMaxPhotosPerGuest(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">خصوصية الألبوم</label>
                  <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="privacy"
                        checked={isPublic}
                        onChange={() => setIsPublic(true)}
                      />
                      <span>🌐 ألبوم عام (يراه كل الضيوف)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="privacy"
                        checked={!isPublic}
                        onChange={() => setIsPublic(false)}
                      />
                      <span>🔒 خاص (المنظم فقط يرى الصور)</span>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                  <button type="button" onClick={() => setIsCreateModalOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                    إلغاء
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                    توليد الـ QR وإنشاء الألبوم ✨
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default function EventsDashboardPage() {
  return (
    <AuthProvider>
      <EventsDashboardContent />
    </AuthProvider>
  );
}
