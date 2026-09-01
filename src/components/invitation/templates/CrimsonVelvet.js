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

export default function CrimsonVelvet({ weddingData = {}, slug = '', isPreview = false }) {
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
    venue = 'قاعة الملكية - قاعات النعمان',
    venueAddress = 'عمّان - شارع المدينة المنوّرة',
    mapUrl = 'https://maps.google.com/?q=31.9539,35.9106',
    invitationMessage = 'بأسمى آيات الفرح والسرور، يشرفنا دعوتكم لحضور حفل زفافنا الميمون، ومشاركتنا أبهى لحظات العمر.',
    photos = [
      '/images/gallery/gallery-2.jpg',
      '/images/gallery/gallery-6.jpg',
      '/images/gallery/gallery-5.jpg',
      '/images/gallery/gallery-7.jpg'
    ],
    schedule = [
      { name: 'استقبال المهنئين الكرام', time: '17:30' },
      { name: 'زفة العروسين الملكية', time: '18:30' },
      { name: 'مراسم قطع الكعكة', time: '18:45' },
      { name: 'مأدبة العشاء الفاخرة', time: '19:00' },
      { name: 'ختام الحفل المبارك', time: '21:00' },
    ],
  } = weddingData;

  const burgundy = '#540D1D';
  const crimson = '#78172C';
  const gold = '#C9A96E';
  const goldLight = '#F0D499';
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
      background: '#FCF8F5',
      color: '#380B14',
      minHeight: '100%',
      fontFamily: 'var(--font-body)',
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Audio Control Button */}
      {opened && (
        <FloatingAudioButton
          primaryColor={burgundy}
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
          background: 'linear-gradient(180deg, #540D1D 0%, #350812 100%)',
          border: `10px solid ${gold}44`,
          position: 'relative',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: opening ? 'scale(0.9) translateY(-50px)' : 'scale(1)',
          opacity: opening ? 0 : 1
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.96)',
            border: `2px solid ${gold}`,
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-8) var(--space-6)',
            maxWidth: 340,
            width: '100%',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}>
            <span style={{ fontSize: '0.8rem', color: burgundy, letterSpacing: '4px', display: 'block', marginBottom: 'var(--space-2)' }}>
              CRIMSON VELVET WEDDING
            </span>

            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', color: burgundy, margin: '0 0 var(--space-2) 0' }}>
              {groomName}
            </h1>
            <span style={{ color: gold, fontSize: '1.2rem', display: 'block' }}>&</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', color: burgundy, margin: '0 0 var(--space-4) 0' }}>
              {brideName}
            </h1>

            <div style={{ height: 2, width: 60, background: gold, margin: '0 auto var(--space-4)' }} />

            {weddingDate && (
              <p style={{ color: '#6A2E3B', fontSize: '0.9rem', marginBottom: 'var(--space-6)' }}>
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
                background: `linear-gradient(135deg, ${burgundy}, ${crimson})`,
                borderColor: gold,
                color: '#FFFFFF',
                boxShadow: '0 8px 25px rgba(84,13,29,0.3)',
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
          <div style={{ textAlign: 'center', padding: 'var(--space-6) var(--space-4)', borderBottom: `1px solid ${gold}33`, background: '#FFFFFF' }}>
            <img src="/images/logo.png" alt="قاعات النعمان" style={{ height: 36, margin: '0 auto var(--space-1)' }} />
            <span style={{ fontSize: '0.75rem', color: burgundy, fontWeight: 'bold' }}>قاعات النعمان — Al Numan Halls</span>
          </div>

          <div style={{ padding: 'var(--space-8) var(--space-4)' }}>
            <div style={{
              maxWidth: 440,
              margin: '0 auto',
              background: '#FFFFFF',
              border: `2px solid ${gold}`,
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-8) var(--space-6)',
              boxShadow: '0 10px 30px rgba(84,13,29,0.06)',
              textAlign: 'center'
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: burgundy, marginBottom: 'var(--space-6)' }}>
                معلومات الحفل
              </h3>

              {(groomFather || brideFather) && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-6)',
                  paddingBottom: 'var(--space-4)',
                  borderBottom: `1px solid ${gold}22`,
                  fontSize: '0.85rem'
                }}>
                  {brideFather && (
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <span style={{ display: 'block', color: '#888', fontSize: '0.75rem', marginBottom: 2 }}>السيد والسيدة</span>
                      <strong style={{ color: burgundy, display: 'block' }}>{brideFather}</strong>
                      {brideMother && <span style={{ color: '#6A2E3B', fontSize: '0.8rem' }}>{brideMother}</span>}
                    </div>
                  )}
                  <div style={{ width: 1, background: `${gold}33`, margin: '0 var(--space-3)' }} />
                  {groomFather && (
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <span style={{ display: 'block', color: '#888', fontSize: '0.75rem', marginBottom: 2 }}>السيد والسيدة</span>
                      <strong style={{ color: burgundy, display: 'block' }}>{groomFather}</strong>
                      {groomMother && <span style={{ color: '#6A2E3B', fontSize: '0.8rem' }}>{groomMother}</span>}
                    </div>
                  )}
                </div>
              )}

              <p style={{ fontSize: '0.95rem', lineHeight: 2, color: '#4D242D', margin: '0 0 var(--space-6) 0', whiteSpace: 'pre-line' }}>
                {invitationMessage}
              </p>

              <div style={{ margin: 'var(--space-6) 0' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: burgundy, margin: 0 }}>
                  {groomFullName || groomName}
                </h2>
                <div style={{ color: gold, fontSize: '1.2rem', margin: '0.2rem 0' }}>✦</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: burgundy, margin: 0 }}>
                  {brideFullName || brideName}
                </h2>
              </div>

              {weddingDate && (
                <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: `1px solid ${gold}33` }}>
                  <div style={{ fontSize: '0.85rem', color: '#888' }}>حفل الزفاف في</div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: burgundy, marginTop: 2 }}>
                    {dateInfo.weekday} في {weddingTime || '19:30'}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-3)',
                    marginTop: 'var(--space-2)'
                  }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: burgundy, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                      {dateInfo.day}
                    </div>
                    <div style={{ textAlign: 'right', borderRight: `2px solid ${gold}`, paddingRight: 'var(--space-2)' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#380B14' }}>
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
            {weddingDate && <CountdownText targetDate={`${weddingDate}T${weddingTime || '19:30'}`} primaryColor={burgundy} />}
          </RevealSection>

          <RevealSection delay={0.1}>
            {weddingDate && <WeddingCalendar weddingDate={weddingDate} primaryColor={burgundy} />}
          </RevealSection>

          <RevealSection delay={0.1}>
            {photos && photos.length > 0 && <PhotoAlbumStack photos={photos} primaryColor={burgundy} />}
          </RevealSection>

          <RevealSection delay={0.1}>
            {schedule && schedule.length > 0 && (
            <div style={{ background: '#FFFFFF', padding: 'var(--space-8) var(--space-4)', borderTop: `1px solid ${gold}33`, borderBottom: `1px solid ${gold}33` }}>
              <h3 style={{ textAlign: 'center', color: burgundy, fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 'var(--space-4)' }}>
                برنامج اليوم
              </h3>
              <ConnectedTimeline schedule={schedule} primaryColor={burgundy} />
            </div>
          )}
          </RevealSection>

          <div style={{ background: '#F7EBEF', padding: 'var(--space-8) var(--space-4)', textAlign: 'center', borderTop: `1px solid ${gold}33`, borderBottom: `1px solid ${gold}33` }}>
            <div style={{ fontSize: '2rem', color: burgundy, marginBottom: 'var(--space-2)' }}>📍</div>
            <h3 style={{ color: burgundy, fontSize: '1.3rem', marginBottom: 'var(--space-1)' }}>
              {venue || 'قاعات النعمان'}
            </h3>
            <p style={{ color: '#6A2E3B', fontSize: '0.9rem', marginBottom: 'var(--space-4)' }}>
              {venueAddress || 'عمّان - الأردن'}
            </p>
            {mapUrl && (
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: '25px', borderColor: burgundy, color: burgundy, background: '#FFF' }}>
                🗺️ خريطة الموقع عبر Google Maps
              </a>
            )}
          </div>

          <RevealSection delay={0.1}>
            <GuestbookSection slug={slug} primaryColor={burgundy} />
          </RevealSection>

          <div style={{ background: '#FFFFFF', padding: 'var(--space-8) var(--space-4)', textAlign: 'center', borderTop: `1px solid ${gold}33` }}>
            <span style={{ fontSize: '0.8rem', color: burgundy, display: 'block', marginBottom: 'var(--space-3)' }}>
              رمز الدعوة الإلكتروني
            </span>
            <div style={{ display: 'inline-block', padding: 12, background: '#FFFFFF', borderRadius: '12px', border: `1px solid ${gold}`, boxShadow: '0 4px 15px rgba(84,13,29,0.06)' }}>
              <img src="/images/qr-code.png" alt="رمز QR للدعوة" style={{ width: 140, height: 140, objectFit: 'contain', display: 'block' }} />
            </div>
            <div style={{ marginTop: 'var(--space-4)', fontSize: '0.75rem', color: burgundy }}>قاعات النعمان — Al Numan Halls</div>
          </div>
        </div>
      )}
    </div>
  );
}
