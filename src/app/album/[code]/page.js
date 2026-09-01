'use client';
import { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import { 
  getEventByCode, 
  getEventPhotos, 
  getGuestPhotoCount, 
  getOrCreateDeviceId, 
  uploadEventPhoto 
} from '@/lib/eventAlbum';

const WEDDING_FILTERS = [
  { id: 'none', name: 'عادي (Natural)', css: 'none', canvasFilter: 'none' },
  { id: 'vintage', name: 'عتيق كلاسيكي (Vintage)', css: 'sepia(0.4) contrast(1.1) brightness(0.95)', canvasFilter: 'sepia(40%) contrast(110%)' },
  { id: 'bw', name: 'أبيض وأسود ملكي (B&W)', css: 'grayscale(1) contrast(1.2)', canvasFilter: 'grayscale(100%) contrast(120%)' },
  { id: 'sunset', name: 'غروب دافئ (Sunset)', css: 'sepia(0.25) saturate(1.4) hue-rotate(-15deg)', canvasFilter: 'sepia(25%) saturate(140%)' },
  { id: 'romance', name: 'رومانسية ناعمة (Romance)', css: 'brightness(1.05) contrast(0.95) saturate(1.15)', canvasFilter: 'brightness(105%) contrast(95%)' },
  { id: 'golden', name: 'بريق ذهبي (Golden Glow)', css: 'sepia(0.3) saturate(1.3) brightness(1.05)', canvasFilter: 'sepia(30%) saturate(130%) brightness(105%)' },
];

export default function GuestAlbumPage({ params }) {
  // Unwrap params in Next.js
  const unwrappedParams = use(params);
  const eventCode = unwrappedParams?.code || '';

  const [event, setEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [deviceId, setDeviceId] = useState('');
  const [guestPhotoCount, setGuestPhotoCount] = useState(0);

  // Camera & Capture State
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' (front) or 'environment' (back)
  const [activeFilter, setActiveFilter] = useState(WEDDING_FILTERS[0]);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [guestName, setGuestName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [cameraError, setCameraError] = useState('');

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load Event & Photos
  const loadData = () => {
    const devId = getOrCreateDeviceId();
    setDeviceId(devId);

    const evt = getEventByCode(eventCode);
    if (evt) {
      setEvent(evt);
      const evPhotos = getEventPhotos(evt.code);
      setPhotos(evPhotos);
      const count = getGuestPhotoCount(evt.code, devId);
      setGuestPhotoCount(count);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 4000); // Live poll for new guest photos
    return () => clearInterval(interval);
  }, [eventCode]);

  // Start Camera Stream
  const startCamera = async (mode = facingMode) => {
    setCameraError('');
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    try {
      const constraints = {
        video: {
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('لم نتمكن من فتح الكاميرا مباشرة. يمكنك اختيار صورة من ألبوم هاتفك.');
    }
  };

  // Switch Front / Back Camera
  const toggleCamera = () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Open Camera Modal
  const handleOpenStudio = () => {
    setIsCameraOpen(true);
    setCapturedImage(null);
    setCaption('');
    setTimeout(() => startCamera(facingMode), 100);
  };

  // Close Camera Modal
  const handleCloseStudio = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
    setCapturedImage(null);
  };

  // Snap Photo from Video Stream
  const handleCapture = () => {
    if (!videoRef.current) return;

    // Flash simulation effect
    if (flashEnabled) {
      const flashEl = document.getElementById('camera-flash-overlay');
      if (flashEl) {
        flashEl.style.opacity = '1';
        setTimeout(() => { flashEl.style.opacity = '0'; }, 180);
      }
    }

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1080;
    canvas.height = video.videoHeight || 1440;
    const ctx = canvas.getContext('2d');

    // Draw video frame
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1); // mirror selfie
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Data = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(base64Data);

    // Stop video stream while previewing/editing
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  // Fallback Upload from Phone Gallery
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvt) => {
      setCapturedImage(uploadEvt.target?.result);
      setIsCameraOpen(true);
    };
    reader.readAsDataURL(file);
  };

  // Render Gold Wedding Frame & Caption on Canvas, then Upload
  const handleFinalizeAndUpload = async () => {
    if (!capturedImage || !event) return;

    if (guestPhotoCount >= (event.maxPhotosPerGuest || 25)) {
      alert(`لقد وصلت للحد الأقصى المسموح (${event.maxPhotosPerGuest} صورة). شكراً لمشاركتك!`);
      return;
    }

    setUploading(true);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = capturedImage;

      await new Promise((resolve) => { img.onload = resolve; });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Create framed photo canvas
      const framePadding = 40;
      const bottomBarHeight = 110;
      canvas.width = img.width + (framePadding * 2);
      canvas.height = img.height + (framePadding * 2) + bottomBarHeight;

      // Cream Luxury Background
      ctx.fillStyle = '#FAFAF7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gold Outer & Inner Border
      ctx.strokeStyle = '#C9A96E';
      ctx.lineWidth = 6;
      ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#D4AF3788';
      ctx.strokeRect(framePadding - 8, framePadding - 8, img.width + 16, img.height + 16);

      // Apply Selected Wedding Filter
      if (activeFilter.canvasFilter && activeFilter.canvasFilter !== 'none') {
        ctx.filter = activeFilter.canvasFilter;
      }
      ctx.drawImage(img, framePadding, framePadding, img.width, img.height);
      ctx.filter = 'none'; // reset filter for text

      // Bottom Branding & Caption Bar
      ctx.textAlign = 'center';
      ctx.fillStyle = '#B8944F';
      ctx.font = 'bold 26px "Amiri", serif';
      ctx.fillText(event.title || 'قاعات النعمان — Al Numan Halls', canvas.width / 2, canvas.height - 75);

      if (caption.trim()) {
        ctx.fillStyle = '#2C2417';
        ctx.font = 'italic 22px "Amiri", sans-serif';
        ctx.fillText(`« ${caption.trim()} »`, canvas.width / 2, canvas.height - 40);
      }

      ctx.fillStyle = '#8A7D6B';
      ctx.font = '16px sans-serif';
      const dateStr = new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
      ctx.fillText(`قاعات النعمان • ${dateStr}`, canvas.width / 2, canvas.height - 15);

      const finalFramedDataUrl = canvas.toDataURL('image/jpeg', 0.90);

      // Upload to Data layer / API
      uploadEventPhoto({
        eventId: event.id,
        eventCode: event.code,
        url: finalFramedDataUrl,
        caption: caption.trim(),
        filter: activeFilter.name,
        guestName: guestName.trim() || 'ضيف كريم',
        deviceId: deviceId,
      });

      setUploading(false);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        handleCloseStudio();
        loadData();
      }, 1500);

    } catch (err) {
      console.error('Error generating photo frame:', err);
      setUploading(false);
      alert('حدث خطأ أثناء حفظ الصورة، يرجى المحاولة مرة أخرى.');
    }
  };

  if (!event) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FAFAF7', padding: 'var(--space-6)', textAlign: 'center', direction: 'rtl' }}>
        <div style={{ fontSize: '3rem', color: '#B8944F', marginBottom: 'var(--space-4)' }}>📸</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: '#2C2417', marginBottom: 'var(--space-2)' }}>جاري البحث عن ألبوم الفعالية...</h2>
        <p style={{ color: '#888', marginBottom: 'var(--space-6)' }}>تأكد من صحة رمز الـ QR Code الخاص بالقاعة أو المناسبة ({eventCode}).</p>
        <Link href="/" className="btn btn-secondary">العودة للرئيسية</Link>
      </div>
    );
  }

  const maxQuota = event.maxPhotosPerGuest || 25;
  const remainingQuota = Math.max(0, maxQuota - guestPhotoCount);

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', color: '#2C2417', direction: 'rtl', fontFamily: 'var(--font-body)' }}>

      {/* Top Header */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #EAE4D9',
        padding: 'var(--space-3) var(--space-4)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <img src="/images/logo.png" alt="قاعات النعمان" style={{ height: 32 }} />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#2C2417' }}>{event.title}</div>
            <div style={{ fontSize: '0.75rem', color: '#B8944F' }}>رمز الفعالية: {event.code}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '15px', background: '#F4ECE0', color: '#8B7340', fontWeight: 'bold' }}>
            متبقي لك: {remainingQuota} صور
          </span>
        </div>
      </header>

      {/* Hero Welcome Banner */}
      <div style={{
        position: 'relative',
        height: 240,
        backgroundImage: `linear-gradient(180deg, rgba(20,18,15,0.4) 0%, rgba(20,18,15,0.85) 100%), url(${event.coverImage || '/images/hero.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--space-4)',
        color: '#FFFFFF'
      }}>
        <span style={{ fontSize: '0.8rem', color: '#D4AF37', letterSpacing: '3px', marginBottom: 'var(--space-1)', textTransform: 'uppercase' }}>
          LIVE EVENT PHOTO ALBUM
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', margin: '0 0 var(--space-2) 0', color: '#FFFFFF' }}>
          {event.title}
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#E8DECC', margin: 0 }}>
          {event.venue} • {event.eventDate ? new Date(event.eventDate).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
        </p>

        {/* Floating Action Button for Taking Photos */}
        <div style={{ marginTop: 'var(--space-4)' }}>
          <button
            onClick={handleOpenStudio}
            className="btn btn-primary"
            style={{
              padding: '0.8rem 2.2rem',
              borderRadius: '30px',
              fontSize: '1.05rem',
              fontWeight: 'bold',
              boxShadow: '0 10px 30px rgba(184, 148, 79, 0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}
          >
            <span>📸</span>
            <span>التقط صورة واصنع ذكرى مع الجميع</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ padding: 'var(--space-6) var(--space-4)', maxWidth: 1000 }}>

        {/* Upload options row */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-4) var(--space-6)',
          border: '1px solid #EAE4D9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-6)'
        }}>
          <div>
            <div style={{ fontWeight: 'bold', color: '#2C2417', fontSize: '0.95rem' }}>
              معرض ذكريات الحفل التفاعلي
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>
              {event.isPublic ? 'الصور معروضة لجميع الضيوف مباشرة' : 'الألبوم خاص — المنظم فقط يستعرض الصور'} ({photos.length} صورة)
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <button
              onClick={handleOpenStudio}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '20px' }}
            >
              📷 فتح الكاميرا
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '20px', borderColor: '#B8944F', color: '#B8944F' }}
            >
              📁 رفع من الألبوم
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Public Gallery Grid */}
        {event.isPublic ? (
          photos.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 'var(--space-4)'
            }}>
              {photos.map((ph, idx) => (
                <div
                  key={ph.id || idx}
                  onClick={() => setLightboxIndex(idx)}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid #EBE5DB',
                    boxShadow: '0 6px 15px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.04)';
                  }}
                >
                  <div style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={ph.url}
                      alt={ph.caption || 'صورة الحفل'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    {ph.filter && ph.filter !== 'عادي (Natural)' && (
                      <span style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'rgba(0,0,0,0.6)',
                        color: '#FFFFFF',
                        fontSize: '0.65rem',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        backdropFilter: 'blur(4px)'
                      }}>
                        {ph.filter}
                      </span>
                    )}
                  </div>

                  <div style={{ padding: 'var(--space-3)' }}>
                    {ph.caption && (
                      <p style={{ margin: '0 0 var(--space-1) 0', fontSize: '0.85rem', fontWeight: '500', color: '#2C2417', lineHeight: 1.4 }}>
                        {ph.caption}
                      </p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#8A7D6B' }}>
                      <span>{ph.guestName || 'ضيف'}</span>
                      <span>{ph.createdAt ? new Date(ph.createdAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-12) var(--space-6)',
              textAlign: 'center',
              border: '1px solid #EBE5DB'
            }}>
              <div style={{ fontSize: '3.5rem', color: '#B8944F', marginBottom: 'var(--space-3)' }}>✨</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', color: '#2C2417', marginBottom: 'var(--space-2)' }}>كن أول من يشارك صورة في هذا الألبوم!</h3>
              <p style={{ color: '#888', marginBottom: 'var(--space-6)' }}>اضغط على زر الكاميرا والتقط أول صورة تذكارية لتظهر هنا للجميع.</p>
              <button onClick={handleOpenStudio} className="btn btn-primary">
                📸 التقاط صورة الآن
              </button>
            </div>
          )
        ) : (
          <div style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8) var(--space-6)',
            textAlign: 'center',
            border: '1px solid #EBE5DB'
          }}>
            <div style={{ fontSize: '2.5rem', color: '#B8944F', marginBottom: 'var(--space-2)' }}>🔒</div>
            <h4 style={{ color: '#2C2417', marginBottom: 'var(--space-1)' }}>هذا الألبوم مخصص للمنظم فقط</h4>
            <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>
              يمكنك التقاط ورفع صورك، وسيتم حفظها مباشرة في ألبوم المنظم الخاص.
            </p>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* Interactive Camera Studio Modal with Live Wedding Filters & Canvas Editor */}
      {/* ========================================================================= */}
      {isCameraOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.92)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-3)'
        }}>

          {/* Flash Simulation Overlay */}
          <div
            id="camera-flash-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: '#FFFFFF',
              opacity: 0,
              pointerEvents: 'none',
              transition: 'opacity 0.15s ease',
              zIndex: 1010
            }}
          />

          <div style={{
            width: '100%',
            maxWidth: 480,
            background: '#1A1815',
            borderRadius: 'var(--radius-2xl)',
            overflow: 'hidden',
            border: '1px solid rgba(212,175,55,0.4)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column'
          }}>

            {/* Studio Header Controls */}
            <div style={{
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.4)',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>✨</span>
                <span>استوديو تصوير الأعراس</span>
              </div>

              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {!capturedImage && (
                  <>
                    <button
                      onClick={() => setFlashEnabled(!flashEnabled)}
                      style={{
                        background: flashEnabled ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                        color: flashEnabled ? '#000' : '#FFF',
                        border: 'none',
                        borderRadius: '50%',
                        width: 34,
                        height: 34,
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                      title="فلاش الكاميرا"
                    >
                      ⚡
                    </button>
                    <button
                      onClick={toggleCamera}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '50%',
                        width: 34,
                        height: 34,
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                      title="تبديل الكاميرا (أمامية/خلفية)"
                    >
                      🔄
                    </button>
                  </>
                )}
                <button
                  onClick={handleCloseStudio}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '50%',
                    width: 34,
                    height: 34,
                    cursor: 'pointer',
                    fontSize: '1.1rem'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Viewfinder / Preview Frame */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '3/4',
              background: '#000',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {!capturedImage ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: activeFilter.css,
                      transform: facingMode === 'user' ? 'scaleX(-1)' : 'none'
                    }}
                  />
                  {cameraError && (
                    <div style={{ position: 'absolute', padding: 20, textAlign: 'center', color: '#FFF', background: 'rgba(0,0,0,0.8)' }}>
                      <p style={{ fontSize: '0.9rem', marginBottom: 12 }}>{cameraError}</p>
                      <button onClick={() => fileInputRef.current?.click()} className="btn btn-primary btn-sm">
                        📁 اختر صورة من هاتفك
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src={capturedImage}
                    alt="Captured"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: activeFilter.css
                    }}
                  />
                  {/* Luxury Cream Frame Preview Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 12,
                    border: '2px solid rgba(212,175,55,0.7)',
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 12,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)'
                  }}>
                    <div style={{ color: '#D4AF37', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
                      {event.title}
                    </div>
                    {caption && (
                      <div style={{ color: '#FFFFFF', fontSize: '0.8rem', fontStyle: 'italic', textAlign: 'center', marginTop: 2 }}>
                        « {caption} »
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Filter Selector Bar */}
            <div style={{
              padding: '10px 14px',
              background: '#121110',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              overflowX: 'auto',
              display: 'flex',
              gap: 8,
              scrollbarWidth: 'none'
            }}>
              {WEDDING_FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '16px',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    border: activeFilter.id === f.id ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                    background: activeFilter.id === f.id ? 'linear-gradient(135deg, #B8944F, #8B7340)' : 'rgba(255,255,255,0.05)',
                    color: activeFilter.id === f.id ? '#FFF' : '#C4B8A8',
                    cursor: 'pointer',
                    fontWeight: activeFilter.id === f.id ? 'bold' : 'normal'
                  }}
                >
                  {f.name}
                </button>
              ))}
            </div>

            {/* Editing Inputs & Action Trigger */}
            <div style={{ padding: '14px 16px', background: '#1A1815' }}>
              {!capturedImage ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '6px 0' }}>
                  <button
                    onClick={handleCapture}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      border: '4px solid #D4AF37',
                      boxShadow: '0 0 25px rgba(212,175,55,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '1.8rem'
                    }}
                    title="التقاط الصورة"
                  >
                    📸
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: 10 }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="✍️ اكتب تعليقاً أو تهنئة لطيفة على الصورة..."
                      value={caption}
                      onChange={e => setCaption(e.target.value)}
                      style={{ background: '#25221E', color: '#FFF', borderColor: 'rgba(212,175,55,0.4)', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="اسمك (اختياري)..."
                      value={guestName}
                      onChange={e => setGuestName(e.target.value)}
                      style={{ background: '#25221E', color: '#FFF', borderColor: 'rgba(212,175,55,0.4)', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => {
                        setCapturedImage(null);
                        startCamera(facingMode);
                      }}
                      className="btn btn-secondary"
                      style={{ flex: 1, borderColor: '#666', color: '#AAA', padding: '0.7rem' }}
                    >
                      🔄 إعادة الالتقاط
                    </button>

                    <button
                      onClick={handleFinalizeAndUpload}
                      disabled={uploading}
                      className="btn btn-primary"
                      style={{
                        flex: 2,
                        padding: '0.7rem',
                        background: 'linear-gradient(135deg, #D4AF37, #997A15)',
                        color: '#000',
                        fontWeight: 'bold'
                      }}
                    >
                      {uploading ? 'جارٍ إضافة الإطار والرفع...' : '✨ حفظ ومشاركة الصورة'}
                    </button>
                  </div>

                  {uploadSuccess && (
                    <div style={{ marginTop: 10, textAlign: 'center', color: '#4CAF50', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      ✓ تم نشر صورتك في ألبوم الحفل بنجاح!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* Lightbox Modal with Zoom & Previous/Next Navigation */}
      {/* ========================================================================= */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.94)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-4)'
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255,255,255,0.2)',
              color: '#FFF',
              border: 'none',
              borderRadius: '50%',
              width: 44,
              height: 44,
              fontSize: '1.4rem',
              cursor: 'pointer',
              zIndex: 2010
            }}
          >
            ✕
          </button>

          {/* Prev / Next buttons */}
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
                }}
                style={{
                  position: 'absolute',
                  left: 20,
                  background: 'rgba(255,255,255,0.2)',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: 46,
                  height: 46,
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  zIndex: 2010
                }}
              >
                ❮
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % photos.length);
                }}
                style={{
                  position: 'absolute',
                  right: 20,
                  background: 'rgba(255,255,255,0.2)',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: 46,
                  height: 46,
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  zIndex: 2010
                }}
              >
                ❯
              </button>
            </>
          )}

          {/* Main Photo & Caption */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 680,
              maxHeight: '90vh',
              background: '#FAFAF7',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              border: '2px solid #C9A96E',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ maxHeight: '72vh', overflow: 'hidden' }}>
              <img
                src={photos[lightboxIndex].url}
                alt={photos[lightboxIndex].caption || 'صورة الحفل'}
                style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
              />
            </div>
            <div style={{ padding: 'var(--space-4)', textAlign: 'center', background: '#FAFAF7' }}>
              {photos[lightboxIndex].caption && (
                <p style={{ margin: '0 0 var(--space-2) 0', fontSize: '1rem', fontWeight: 'bold', color: '#2C2417' }}>
                  « {photos[lightboxIndex].caption} »
                </p>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#8A7D6B' }}>
                <span>بواسطة: {photos[lightboxIndex].guestName || 'ضيف كريم'}</span>
                <a
                  href={photos[lightboxIndex].url}
                  download={`al-numan-photo-${lightboxIndex + 1}.jpg`}
                  className="btn btn-secondary btn-sm"
                  style={{ borderRadius: '15px', padding: '2px 10px', fontSize: '0.75rem' }}
                >
                  📥 تنزيل الصورة
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
