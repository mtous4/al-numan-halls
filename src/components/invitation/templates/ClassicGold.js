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

export default function ClassicGold({ weddingData = {}, slug = '', isPreview = false }) {
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
    venueAddress = 'عمّان - شارع الجاردنز - دوار الواحة',
    mapUrl = 'https://maps.google.com/?q=31.9539,35.9106',
    invitationMessage = 'يتشرف يوسف ودانة بدعوتكم لحضور حفل زفافهما، ليكتمل فرحنا بحضوركم الكريم.',
    photos = [
      '/images/gallery/couple-1.jpg',
      '/images/halls/hall-royal.jpg',
      '/images/halls/hall-andalus.jpg',
      '/images/halls/hall-elegance.jpg'
    ],
    schedule = [
      { name: 'استقبال الضيوف', time: '17:30' },
      { name: 'بدء الحفل', time: '18:30' },
      { name: 'نخب وقطع الكعكة', time: '18:45' },
      { name: 'العشاء الرئيسي', time: '19:00' },
      { name: 'ختام الحفل', time: '21:00' },
    ],
  } = weddingData;

  const primaryColor = '#B8944F';
  const currentUrl = typeof window !== 'undefined' && slug ? `${window.location.origin}/invite/${slug}` : 'https://numanhalls.net';

  const handleOpenInvitation = () => {
    playEnvelopeOpenSound();
    weddingSynth.start();
    setMusicPlaying(true);
    setOpening(true);
    setTimeout(() => {
      setOpened(true);
      setOpening(false);
      // Trigger guided auto-scroll tour for the visitor
      if (!isPreview) {
        startGuidedTour();
      }
    }, 600);
  };

  return (
    <div style={{
      background: '#FAFAF7',
      color: '#2C2417',
      minHeight: '100%',
      fontFamily: 'var(--font-body)',
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Audio Control Button */}
      {opened && (
        <FloatingAudioButton
          primaryColor={primaryColor}
          isPlaying={musicPlaying}
          onToggle={handleToggleMusic}
        />
      )}

      {/* Envelope / Cover Overlay */}
      {!opened && (
        <div style={{
          minHeight: isPreview ? '650px' : '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'var(--space-8)',
          background: 'linear-gradient(180deg, #FBF8F2 0%, #F3EBDD 100%)',
          border: '14px solid #E8DECC',
          position: 'relative',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: opening ? 'scale(0.9) translateY(-50px)' : 'scale(1)',
          opacity: opening ? 0 : 1
        }}>
          {/* Ornaments */}
          <div style={{ position: 'absolute', top: 16, right: 16, color: primaryColor, fontSize: '1.4rem' }}>✤</div>
          <div style={{ position: 'absolute', top: 16, left: 16, color: primaryColor, fontSize: '1.4rem' }}>✤</div>
          <div style={{ position: 'absolute', bottom: 16, right: 16, color: primaryColor, fontSize: '1.4rem' }}>✤</div>
          <div style={{ position: 'absolute', bottom: 16, left: 16, color: primaryColor, fontSize: '1.4rem' }}>✤</div>

          {/* Wax Seal */}
          <div style={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #B8944F, #D4AF37)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: '1.8rem',
            marginBottom: 'var(--space-6)',
            boxShadow: '0 10px 25px rgba(184, 148, 79, 0.4)'
          }}>
            💌
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            border: `2px solid ${primaryColor}44`,
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8) var(--space-6)',
            maxWidth: 340,
            width: '100%',
            boxShadow: '0 12px 30px rgba(0,0,0,0.06)'
          }}>
            <span style={{ fontSize: '0.8rem', color: '#8A7D6B', letterSpacing: '2px', display: 'block', marginBottom: 'var(--space-2)' }}>
              بطاقة دعوة زفاف
            </span>

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.5rem',
              color: primaryColor,
              lineHeight: 1.3,
              margin: '0 0 var(--space-2) 0'
            }}>
              {groomName}
            </h1>
            <span style={{ color: '#8A7D6B', fontSize: '1.2rem', display: 'block' }}>&</span>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.5rem',
              color: primaryColor,
              lineHeight: 1.3,
              margin: '0 0 var(--space-4) 0'
            }}>
              {brideName}
            </h1>

            <div style={{ height: 1, width: 60, background: primaryColor, margin: '0 auto var(--space-4)' }} />

            {weddingDate && (
              <p style={{ color: '#6B5F4F', fontSize: '0.9rem', marginBottom: 'var(--space-6)' }}>
                {new Date(weddingDate).toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            )}

            <button
              onClick={handleOpenInvitation}
              className="btn btn-primary"
              style={{
                padding: '0.8rem 2.5rem',
                borderRadius: '30px',
                fontSize: '1.1rem',
                boxShadow: '0 8px 25px rgba(184, 148, 79, 0.35)',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              افتح الدعوة ✉️
            </button>
          </div>
        </div>
      )}

      {/* Main Unfolded Invitation Body */}
      {opened && (
        <div style={{ animation: 'slideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <div style={{
            textAlign: 'center',
            padding: 'var(--space-6) var(--space-4)',
            borderBottom: '1px solid #E8DECC',
            background: '#FFFFFF'
          }}>
            <img src="/images/logo.png" alt="قاعات النعمان" style={{ height: 40, margin: '0 auto var(--space-1)' }} />
            <span style={{ fontSize: '0.75rem', color: '#A89B88' }}>قاعات النعمان — Al Numan Halls</span>
          </div>

          <div style={{ padding: 'var(--space-8) var(--space-4)' }}>
            <div style={{
              maxWidth: 440,
              margin: '0 auto',
              background: '#FFFFFF',
              border: `2px solid ${primaryColor}`,
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8) var(--space-6)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
              textAlign: 'center',
              position: 'relative'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                color: primaryColor,
                marginBottom: 'var(--space-6)'
              }}>
                معلومات الحفل
              </h3>

              {(groomFather || brideFather) && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-6)',
                  paddingBottom: 'var(--space-4)',
                  borderBottom: `1px solid ${primaryColor}22`,
                  fontSize: '0.85rem'
                }}>
                  {brideFather && (
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <span style={{ display: 'block', color: '#8A7D6B', fontSize: '0.75rem', marginBottom: 2 }}>السيد والسيدة</span>
                      <strong style={{ color: '#2C2417', display: 'block' }}>{brideFather}</strong>
                      {brideMother && <span style={{ color: '#6B5F4F', fontSize: '0.8rem' }}>{brideMother}</span>}
                    </div>
                  )}
                  <div style={{ width: 1, background: `${primaryColor}33`, margin: '0 var(--space-3)' }} />
                  {groomFather && (
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <span style={{ display: 'block', color: '#8A7D6B', fontSize: '0.75rem', marginBottom: 2 }}>السيد والسيدة</span>
                      <strong style={{ color: '#2C2417', display: 'block' }}>{groomFather}</strong>
                      {groomMother && <span style={{ color: '#6B5F4F', fontSize: '0.8rem' }}>{groomMother}</span>}
                    </div>
                  )}
                </div>
              )}

              <p style={{
                fontSize: '0.95rem',
                lineHeight: 1.9,
                color: '#4D4338',
                margin: '0 0 var(--space-6) 0',
                whiteSpace: 'pre-line'
              }}>
                {invitationMessage}
              </p>

              <div style={{ margin: 'var(--space-6) 0' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.4rem',
                  color: primaryColor,
                  margin: 0
                }}>
                  {groomFullName || groomName}
                </h2>
                <div style={{ color: '#8A7D6B', fontSize: '1.2rem', margin: '0.2rem 0' }}>&</div>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.4rem',
                  color: primaryColor,
                  margin: 0
                }}>
                  {brideFullName || brideName}
                </h2>
              </div>

              {weddingDate && (
                <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: `1px solid ${primaryColor}22` }}>
                  <div style={{ fontSize: '0.85rem', color: '#8A7D6B' }}>حفل الزفاف في</div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#2C2417', marginTop: 2 }}>
                    {new Date(weddingDate).toLocaleDateString('ar-SA', { weekday: 'long' })} في {weddingTime || '19:30'}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-3)',
                    marginTop: 'var(--space-2)'
                  }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: primaryColor, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                      {new Date(weddingDate).getDate()}
                    </div>
                    <div style={{ textAlign: 'right', borderRight: `2px solid ${primaryColor}44`, paddingRight: 'var(--space-2)' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#2C2417' }}>
                        {new Date(weddingDate).toLocaleDateString('ar-SA', { month: 'long' })}
                      </div>
                      <div style={{ color: '#8A7D6B', fontSize: '0.9rem' }}>
                        {new Date(weddingDate).getFullYear()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {weddingDate && <CountdownText targetDate={`${weddingDate}T${weddingTime || '19:30'}`} primaryColor={primaryColor} />}

          {weddingDate && <WeddingCalendar weddingDate={weddingDate} primaryColor={primaryColor} />}

          {/* 3D Coverflow Photo Album Stack with Auto-play */}
          {photos && photos.length > 0 && <PhotoAlbumStack photos={photos} primaryColor={primaryColor} />}

          {/* Section: Connected Timeline */}
          {schedule && schedule.length > 0 && (
            <div style={{
              background: '#FFFFFF',
              padding: 'var(--space-8) var(--space-4)',
              borderTop: '1px solid #E8DECC',
              borderBottom: '1px solid #E8DECC'
            }}>
              <h3 style={{
                textAlign: 'center',
                color: primaryColor,
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                marginBottom: 'var(--space-4)'
              }}>
                برنامج اليوم
              </h3>
              <ConnectedTimeline schedule={schedule} primaryColor={primaryColor} />
            </div>
          )}

          {/* Section: Location */}
          <div style={{
            background: '#F5EFE6',
            padding: 'var(--space-8) var(--space-4)',
            textAlign: 'center',
            borderTop: '1px solid #E8DECC',
            borderBottom: '1px solid #E8DECC'
          }}>
            <div style={{ fontSize: '2rem', color: primaryColor, marginBottom: 'var(--space-2)' }}>📍</div>
            <h3 style={{ color: '#2C2417', fontSize: '1.3rem', marginBottom: 'var(--space-1)' }}>
              {venue || 'قاعات النعمان'}
            </h3>
            <p style={{ color: '#6B5F4F', fontSize: '0.9rem', marginBottom: 'var(--space-4)' }}>
              {venueAddress || 'عمّان - الأردن'}
            </p>
            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '25px', background: '#FFFFFF', borderColor: primaryColor, color: primaryColor }}
              >
                🗺️ خريطة الموقع عبر Google Maps
              </a>
            )}
          </div>

          {/* Section: Guestbook (سجل التهاني) */}
          <GuestbookSection slug={slug} primaryColor={primaryColor} />

          {/* Section: QR Code & Footer */}
          <div style={{
            background: '#FFFFFF',
            padding: 'var(--space-8) var(--space-4)',
            textAlign: 'center',
            borderTop: '1px solid #E8DECC'
          }}>
            <span style={{ fontSize: '0.8rem', color: '#A89B88', display: 'block', marginBottom: 'var(--space-3)' }}>
              رمز الدعوة الإلكتروني
            </span>
            <div style={{ display: 'inline-block', padding: 12, background: '#FAFAF7', borderRadius: '12px', border: '1px solid #E8DECC' }}>
              <QRCodeSVG value={currentUrl} size={140} fgColor="#2C2417" />
            </div>
            <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid #F0ECE6' }}>
              <span style={{ fontSize: '0.75rem', color: '#A89B88' }}>
                قاعات النعمان — Al Numan Halls
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
