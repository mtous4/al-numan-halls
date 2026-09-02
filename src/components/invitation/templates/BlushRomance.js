'use client';
import { useState, useEffect } from 'react';
import {
  CountdownText,
  WeddingCalendar,
  ConnectedTimeline,
  PhotoAlbumStack,
  GuestbookSection,
  FloatingAudioButton,
  RevealSection,
  LuxuryMonogramSeal,
  formatArabicDate,
  startGuidedTour
} from '@/components/invitation/sections/SharedElements';
import { playEnvelopeOpenSound, weddingSynth } from '@/lib/weddingAudio';
import { QRCodeSVG } from 'qrcode.react';

export default function BlushRomance({ weddingData = {}, slug = '', isPreview = false }) {
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
    venue = 'قاعة الفخامة - قاعات النعمان',
    venueAddress = 'عمّان - شارع الجاردنز - دوار الواحة',
    mapUrl = 'https://maps.google.com/?q=31.9539,35.9106',
    invitationMessage = 'في أجمل ليالي العمر الموشحة بعطر الورود، نتشرف بدعوتكم لمشاركتنا فرحتنا الكبرى.',
    photos = [
      '/images/gallery/gallery-5.jpg',
      '/images/gallery/gallery-7.jpg',
      '/images/gallery/gallery-3.jpg',
      '/images/gallery/gallery-4.jpg'
    ],
    schedule = [
      { name: 'استقبال الضيوف بالورود', time: '17:30' },
      { name: 'بدء الحفل والزفة', time: '18:30' },
      { name: 'قطع الكعكة والمباركة', time: '18:45' },
      { name: 'العشاء الرئيسي', time: '19:00' },
      { name: 'ختام الحفل المبارك', time: '21:00' },
    ],
  } = weddingData;

  const rose = '#B35467';
  const blush = '#E8A7B3';
  const gold = '#C9A96E';
  const currentUrl = typeof window !== 'undefined' && slug ? `${window.location.origin}/invite/${slug}` : 'https://numanhalls.net';
  const dateInfo = formatArabicDate(weddingDate);

  const handleOpenInvitation = () => {
    playEnvelopeOpenSound();
    weddingSynth.start();
    setMusicPlaying(true);
    setOpening(true);
    setTimeout(() => {
      setOpened(true);
      setOpening(false);
      startGuidedTour();
    }, 600);
  };

  return (
    <div style={{
      background: '#FFF9FA',
      color: '#3B242B',
      minHeight: '100%',
      fontFamily: 'var(--font-body)',
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Audio Control Button */}
      {opened && (
        <FloatingAudioButton
          primaryColor={rose}
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
          background: 'linear-gradient(135deg, #FFF0F3 0%, #FFE3E8 100%)',
          border: `10px solid ${blush}44`,
          position: 'relative',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: opening ? 'scale(0.9) translateY(-50px)' : 'scale(1)',
          opacity: opening ? 0 : 1
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: `1.5px solid ${blush}`,
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-8) var(--space-6)',
            maxWidth: 340,
            width: '100%',
            boxShadow: '0 15px 35px rgba(179,84,103,0.1)'
          }}>
            <span style={{ fontSize: '0.8rem', color: rose, letterSpacing: '3px', display: 'block', marginBottom: 'var(--space-2)' }}>
              BLUSH ROMANCE WEDDING
            </span>

            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', color: rose, margin: '0 0 var(--space-2) 0' }}>
              {groomName}
            </h1>
            <span style={{ color: gold, fontSize: '1.2rem', display: 'block' }}>&</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', color: rose, margin: '0 0 var(--space-4) 0' }}>
              {brideName}
            </h1>

            <div style={{ height: 2, width: 60, background: gold, margin: '0 auto var(--space-4)' }} />

            {weddingDate && (
              <p style={{ color: '#7E525E', fontSize: '0.9rem', marginBottom: 'var(--space-6)' }}>
                {dateInfo.fullDate}
              </p>
            )}

            <button
              onClick={handleOpenInvitation}
              className="btn btn-primary"
              style={{
                padding: '0.8rem 2.2rem',
                borderRadius: '30px',
                fontSize: '1.05rem',
                background: `linear-gradient(135deg, ${rose}, ${blush})`,
                borderColor: gold,
                color: '#FFFFFF',
                boxShadow: '0 8px 25px rgba(179,84,103,0.3)',
                width: '100%',
                cursor: 'pointer'
              }}
            >
              فتح بطاقة الدعوة
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {opened && (
        <div style={{ animation: 'slideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <div style={{ textAlign: 'center', padding: 'var(--space-6) var(--space-4)', borderBottom: `1px solid ${blush}44`, background: '#FFFFFF' }}>
            <img src="/images/logo.png" alt="قاعات النعمان" style={{ height: 36, margin: '0 auto var(--space-1)' }} />
            <span style={{ fontSize: '0.75rem', color: rose, fontWeight: 'bold' }}>قاعات النعمان — Al Numan Halls</span>
          </div>

          <div style={{ padding: 'var(--space-8) var(--space-4)' }}>
            <div style={{
              maxWidth: 440,
              margin: '0 auto',
              background: '#FFFFFF',
              border: `2px solid ${blush}`,
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-8) var(--space-6)',
              boxShadow: '0 10px 30px rgba(179,84,103,0.06)',
              textAlign: 'center'
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: rose, marginBottom: 'var(--space-6)' }}>
                معلومات الحفل
              </h3>

              {(groomFather || brideFather) && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-6)',
                  paddingBottom: 'var(--space-4)',
                  borderBottom: `1px solid ${blush}33`,
                  fontSize: '0.85rem'
                }}>
                  {brideFather && (
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <span style={{ display: 'block', color: '#888', fontSize: '0.75rem', marginBottom: 2 }}>السيد والسيدة</span>
                      <strong style={{ color: rose, display: 'block' }}>{brideFather}</strong>
                      {brideMother && <span style={{ color: '#7E525E', fontSize: '0.8rem' }}>{brideMother}</span>}
                    </div>
                  )}
                  <div style={{ width: 1, background: `${blush}44`, margin: '0 var(--space-3)' }} />
                  {groomFather && (
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <span style={{ display: 'block', color: '#888', fontSize: '0.75rem', marginBottom: 2 }}>السيد والسيدة</span>
                      <strong style={{ color: rose, display: 'block' }}>{groomFather}</strong>
                      {groomMother && <span style={{ color: '#7E525E', fontSize: '0.8rem' }}>{groomMother}</span>}
                    </div>
                  )}
                </div>
              )}

              <p style={{ fontSize: '0.95rem', lineHeight: 2, color: '#5A3D46', margin: '0 0 var(--space-6) 0', whiteSpace: 'pre-line' }}>
                {invitationMessage}
              </p>

              <div style={{ margin: 'var(--space-6) 0' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: rose, margin: 0 }}>
                  {groomFullName || groomName}
                </h2>
                <div style={{ color: gold, fontSize: '1.2rem', margin: '0.2rem 0' }}>✦</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: rose, margin: 0 }}>
                  {brideFullName || brideName}
                </h2>
              </div>

              {weddingDate && (
                <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: `1px solid ${blush}33` }}>
                  <div style={{ fontSize: '0.85rem', color: '#888' }}>حفل الزفاف في</div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: rose, marginTop: 2 }}>
                    {dateInfo.weekday} في {weddingTime || '19:30'}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-3)',
                    marginTop: 'var(--space-2)'
                  }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: rose, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                      {dateInfo.day}
                    </div>
                    <div style={{ textAlign: 'right', borderRight: `2px solid ${blush}`, paddingRight: 'var(--space-2)' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#3B242B' }}>
                        {dateInfo.monthName}
                      </div>
                      <div style={{ color: '#888', fontSize: '0.9rem' }}>
                        {dateInfo.year}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <RevealSection delay={0.1}>
            {weddingDate && <CountdownText targetDate={`${weddingDate}T${weddingTime || '19:30'}`} primaryColor={rose} />}
          </RevealSection>

          <RevealSection delay={0.1}>
            {weddingDate && <WeddingCalendar weddingDate={weddingDate} primaryColor={rose} />}
          </RevealSection>

          <RevealSection delay={0.1}>
            {photos && photos.length > 0 && <PhotoAlbumStack photos={photos} primaryColor={rose} />}
          </RevealSection>

          <RevealSection delay={0.1}>
            {schedule && schedule.length > 0 && (
            <div style={{ background: '#FFFFFF', padding: 'var(--space-8) var(--space-4)', borderTop: `1px solid ${blush}33`, borderBottom: `1px solid ${blush}33` }}>
              <h3 style={{ textAlign: 'center', color: rose, fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 'var(--space-4)' }}>
                برنامج اليوم
              </h3>
              <ConnectedTimeline schedule={schedule} primaryColor={rose} />
            </div>
          )}
          </RevealSection>

          <div style={{ background: '#FFF0F3', padding: 'var(--space-8) var(--space-4)', textAlign: 'center', borderTop: `1px solid ${blush}33`, borderBottom: `1px solid ${blush}33` }}>
            <div style={{ fontSize: '2rem', color: rose, marginBottom: 'var(--space-2)' }}>📍</div>
            <h3 style={{ color: rose, fontSize: '1.3rem', marginBottom: 'var(--space-1)' }}>
              {venue || 'قاعات النعمان'}
            </h3>
            <p style={{ color: '#7E525E', fontSize: '0.9rem', marginBottom: 'var(--space-4)' }}>
              {venueAddress || 'عمّان - الأردن'}
            </p>
            {mapUrl && (
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: '25px', borderColor: rose, color: rose, background: '#FFF' }}>
                🗺️ خريطة الموقع عبر Google Maps
              </a>
            )}
          </div>

          <RevealSection delay={0.1}>
            <GuestbookSection slug={slug} primaryColor={rose} />
          </RevealSection>

          <div style={{ background: '#FFFFFF', padding: 'var(--space-8) var(--space-4)', textAlign: 'center', borderTop: `1px solid ${blush}33` }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 'bold', color: rose, display: 'block', marginBottom: 'var(--space-3)' }}>
              امسحوا ال Qr Code وشاركونا الفرحة
            </span>
            <div style={{ display: 'inline-block', padding: 12, background: '#FFFFFF', borderRadius: '12px', border: `1px solid ${blush}`, boxShadow: '0 4px 15px rgba(179,84,103,0.06)' }}>
              <img src="/images/qr-code.png" alt="رمز QR للدعوة" style={{ width: 140, height: 140, objectFit: 'contain', display: 'block' }} />
            </div>
            <div style={{ marginTop: 'var(--space-4)', fontSize: '0.75rem', color: rose }}>قاعات النعمان — Al Numan Halls</div>
          </div>
        </div>
      )}
    </div>
  );
}
