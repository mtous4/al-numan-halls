'use client';
import { useState, useEffect } from 'react';
import {
  CountdownText,
  WeddingCalendar,
  ConnectedTimeline,
  PhotoAlbumStack,
  GuestbookSection,
  FloatingAudioButton,
  startGuidedTour
} from '@/components/invitation/sections/SharedElements';
import { playEnvelopeOpenSound, weddingSynth } from '@/lib/weddingAudio';
import { QRCodeSVG } from 'qrcode.react';

export default function MidnightRoyale({ weddingData = {}, slug = '', isPreview = false }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    return () => {
      weddingSynth.stop();
    };
  }, []);

  const handleToggleMusic = () => {
    if (musicPlaying) {
      weddingSynth.stop();
      setMusicPlaying(false);
    } else {
      weddingSynth.start();
      setMusicPlaying(true);
    }
  };

  const {
    groomName = 'يوسف',
    groomFullName = 'يوسف بن إبراهيم',
    brideName = 'دانة',
    brideFullName = 'دانة بنت خليفة',
    groomFather = 'إبراهيم الحمادي',
    groomMother = 'موزة المرزوقي',
    brideFather = 'خليفة الشامسي',
    brideMother = 'عائشة النعيمي',
    weddingDate = '2027-04-17',
    weddingTime = '19:30',
    venue = 'قاعة رويال هول - قاعات النعمان',
    venueAddress = 'عمّان - شارع المدينة المنوّرة',
    mapUrl = 'https://maps.google.com/?q=31.9539,35.9106',
    invitationMessage = 'تحت سماء تتلألأ بالنجوم وتفيض بالمحبة، يشرفنا حضوركم لتكتمل بهجة ليلة العمر.',
    photos = [
      '/images/gallery/gallery-6.jpg',
      '/images/gallery/gallery-8.jpg',
      '/images/gallery/gallery-3.jpg',
      '/images/gallery/gallery-5.jpg'
    ],
    schedule = [
      { name: 'استقبال كبار الشخصيات والضيوف', time: '17:30' },
      { name: 'مراسم الدخول والزفة الملكية', time: '18:30' },
      { name: 'تقطيع الكعكة الملكية', time: '18:45' },
      { name: 'العشاء الملكي الفاخر', time: '19:00' },
      { name: 'ختام الحفل المبارك', time: '21:00' },
    ],
  } = weddingData;

  const midnight = '#0B1320';
  const navyCard = '#141E30';
  const gold = '#D4AF37';
  const goldLight = '#F3E5AB';
  const currentUrl = typeof window !== 'undefined' && slug ? `${window.location.origin}/invite/${slug}` : 'https://numanhalls.net';

  const handleOpenInvitation = () => {
    playEnvelopeOpenSound();
    weddingSynth.start();
    setMusicPlaying(true);
    setOpening(true);
    setTimeout(() => {
      setOpened(true);
      setOpening(false);
      if (!isPreview) {
        startGuidedTour();
      }
    }, 600);
  };

  return (
    <div style={{
      background: midnight,
      color: '#E0E6ED',
      minHeight: '100%',
      fontFamily: 'var(--font-body)',
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Audio Control Button */}
      {opened && (
        <FloatingAudioButton
          primaryColor={gold}
          isPlaying={musicPlaying}
          onToggle={handleToggleMusic}
        />
      )}

      {/* Cover */}
      {!opened && (
        <div style={{
          minHeight: isPreview ? '650px' : '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'var(--space-8)',
          background: 'radial-gradient(ellipse at center, #1B2A47 0%, #080D17 100%)',
          border: `10px solid ${gold}33`,
          position: 'relative',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: opening ? 'scale(0.9) translateY(-50px)' : 'scale(1)',
          opacity: opening ? 0 : 1
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>👑</div>

          <div style={{
            background: 'rgba(20, 30, 48, 0.95)',
            border: `2px solid ${gold}`,
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-8) var(--space-6)',
            maxWidth: 340,
            width: '100%',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}>
            <span style={{ fontSize: '0.8rem', color: gold, letterSpacing: '4px', display: 'block', marginBottom: 'var(--space-2)' }}>
              MIDNIGHT ROYALE
            </span>

            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', color: '#FFFFFF', margin: '0 0 var(--space-2) 0' }}>
              {groomName}
            </h1>
            <span style={{ color: gold, fontSize: '1.2rem', display: 'block' }}>&</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', color: '#FFFFFF', margin: '0 0 var(--space-4) 0' }}>
              {brideName}
            </h1>

            <div style={{ height: 2, width: 60, background: gold, margin: '0 auto var(--space-4)' }} />

            {weddingDate && (
              <p style={{ color: goldLight, fontSize: '0.9rem', marginBottom: 'var(--space-6)' }}>
                {new Date(weddingDate).toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            )}

            <button
              onClick={handleOpenInvitation}
              className="btn btn-primary"
              style={{
                padding: '0.8rem 2.2rem',
                borderRadius: '30px',
                fontSize: '1.05rem',
                background: `linear-gradient(135deg, ${gold}, #9C7A28)`,
                borderColor: goldLight,
                color: '#0B1320',
                fontWeight: 'bold',
                boxShadow: '0 8px 25px rgba(212,175,55,0.3)',
                width: '100%',
                cursor: 'pointer'
              }}
            >
              افتح الدعوة الملكية ✨
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {opened && (
        <div style={{ animation: 'slideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <div style={{ textAlign: 'center', padding: 'var(--space-6) var(--space-4)', borderBottom: `1px solid ${gold}33`, background: '#080D17' }}>
            <img src="/images/logo-transparent.png" alt="قاعات النعمان" style={{ height: 40, margin: '0 auto var(--space-1)', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }} />
            <span style={{ fontSize: '0.75rem', color: gold, fontWeight: 'bold' }}>قاعات النعمان — Al Numan Halls</span>
          </div>

          <div style={{ padding: 'var(--space-8) var(--space-4)' }}>
            <div style={{
              maxWidth: 440,
              margin: '0 auto',
              background: navyCard,
              border: `2px solid ${gold}`,
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-8) var(--space-6)',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
              textAlign: 'center'
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: gold, marginBottom: 'var(--space-6)' }}>
                معلومات الحفل
              </h3>

              {(groomFather || brideFather) && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-6)',
                  paddingBottom: 'var(--space-4)',
                  borderBottom: `1px solid ${gold}33`,
                  fontSize: '0.85rem'
                }}>
                  {brideFather && (
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <span style={{ display: 'block', color: '#8E9BAE', fontSize: '0.75rem', marginBottom: 2 }}>السيد والسيدة</span>
                      <strong style={{ color: goldLight, display: 'block' }}>{brideFather}</strong>
                      {brideMother && <span style={{ color: '#BAC7D5', fontSize: '0.8rem' }}>{brideMother}</span>}
                    </div>
                  )}
                  <div style={{ width: 1, background: `${gold}44`, margin: '0 var(--space-3)' }} />
                  {groomFather && (
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <span style={{ display: 'block', color: '#8E9BAE', fontSize: '0.75rem', marginBottom: 2 }}>السيد والسيدة</span>
                      <strong style={{ color: goldLight, display: 'block' }}>{groomFather}</strong>
                      {groomMother && <span style={{ color: '#BAC7D5', fontSize: '0.8rem' }}>{groomMother}</span>}
                    </div>
                  )}
                </div>
              )}

              <p style={{ fontSize: '0.95rem', lineHeight: 2, color: '#C8D3E0', margin: '0 0 var(--space-6) 0', whiteSpace: 'pre-line' }}>
                {invitationMessage}
              </p>

              <div style={{ margin: 'var(--space-6) 0' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#FFFFFF', margin: 0 }}>
                  {groomFullName || groomName}
                </h2>
                <div style={{ color: gold, fontSize: '1.3rem', margin: '0.2rem 0' }}>✦</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#FFFFFF', margin: 0 }}>
                  {brideFullName || brideName}
                </h2>
              </div>

              {weddingDate && (
                <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: `1px solid ${gold}33` }}>
                  <div style={{ fontSize: '0.85rem', color: '#8E9BAE' }}>حفل الزفاف في</div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: gold, marginTop: 2 }}>
                    {new Date(weddingDate).toLocaleDateString('ar-SA', { weekday: 'long' })} في {weddingTime || '19:30'}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-3)',
                    marginTop: 'var(--space-2)'
                  }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: gold, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                      {new Date(weddingDate).getDate()}
                    </div>
                    <div style={{ textAlign: 'right', borderRight: `2px solid ${gold}`, paddingRight: 'var(--space-2)' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#FFFFFF' }}>
                        {new Date(weddingDate).toLocaleDateString('ar-SA', { month: 'long' })}
                      </div>
                      <div style={{ color: '#8E9BAE', fontSize: '0.9rem' }}>
                        {new Date(weddingDate).getFullYear()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {weddingDate && <CountdownText targetDate={`${weddingDate}T${weddingTime || '19:30'}`} primaryColor={gold} isDark={true} />}

          {weddingDate && <WeddingCalendar weddingDate={weddingDate} primaryColor={gold} isDark={true} />}

          {photos && photos.length > 0 && <PhotoAlbumStack photos={photos} primaryColor={gold} isDark={true} />}

          {schedule && schedule.length > 0 && (
            <div style={{ background: '#080D17', padding: 'var(--space-8) var(--space-4)', borderTop: `1px solid ${gold}33`, borderBottom: `1px solid ${gold}33` }}>
              <h3 style={{ textAlign: 'center', color: gold, fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 'var(--space-4)' }}>
                برنامج اليوم الملكي
              </h3>
              <ConnectedTimeline schedule={schedule} primaryColor={gold} isDark={true} />
            </div>
          )}

          <div style={{ background: navyCard, padding: 'var(--space-8) var(--space-4)', textAlign: 'center', borderTop: `1px solid ${gold}33`, borderBottom: `1px solid ${gold}33` }}>
            <div style={{ fontSize: '2rem', color: gold, marginBottom: 'var(--space-2)' }}>📍</div>
            <h3 style={{ color: gold, fontSize: '1.3rem', marginBottom: 'var(--space-1)' }}>
              {venue || 'قاعات النعمان'}
            </h3>
            <p style={{ color: '#BAC7D5', fontSize: '0.9rem', marginBottom: 'var(--space-4)' }}>
              {venueAddress || 'عمّان - الأردن'}
            </p>
            {mapUrl && (
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: '25px', borderColor: gold, color: gold, background: '#0B1320' }}>
                🗺️ خريطة الموقع عبر Google Maps
              </a>
            )}
          </div>

          <GuestbookSection slug={slug} primaryColor={gold} isDark={true} />

          <div style={{ background: '#080D17', padding: 'var(--space-8) var(--space-4)', textAlign: 'center', borderTop: `1px solid ${gold}33` }}>
            <div style={{ display: 'inline-block', padding: 12, background: '#FFFFFF', borderRadius: '12px', border: `2px solid ${gold}` }}>
              <QRCodeSVG value={currentUrl} size={140} fgColor="#0B1320" />
            </div>
            <div style={{ marginTop: 'var(--space-4)', fontSize: '0.75rem', color: gold }}>قاعات النعمان — Al Numan Halls</div>
          </div>
        </div>
      )}
    </div>
  );
}
