'use client';
import { useState, useEffect } from 'react';
import {
  CountdownText,
  WeddingCalendar,
  ConnectedTimeline,
  PhotoAlbumStack,
  GuestbookSection,
  FloatingAudioButton,
  LuxuryMonogramSeal,
  formatArabicDate,
  startGuidedTour
} from '@/components/invitation/sections/SharedElements';
import { playEnvelopeOpenSound, weddingSynth } from '@/lib/weddingAudio';
import { QRCodeSVG } from 'qrcode.react';

export default function TraditionalArabic({ weddingData = {}, slug = '', isPreview = false }) {
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
    groomName = 'سلطان',
    groomFullName = 'سلطان بن فيصل',
    brideName = 'شمس',
    brideFullName = 'شمس بنت عبدالله',
    groomFather = 'فيصل القحطاني',
    groomMother = 'منيرة الدوسري',
    brideFather = 'عبدالله الشمري',
    brideMother = 'لطيفة العتيبي',
    weddingDate = '2027-05-14',
    weddingTime = '19:30',
    venue = 'قاعة الأندلس - قاعات النعمان',
    venueAddress = 'عمّان، شارع الملكة رانيا',
    mapUrl = 'https://maps.google.com/?q=31.9539,35.9106',
    invitationMessage = 'ببالغ الفرح والسرور، يتشرف فيصل القحطاني وعبدالله الشمري بدعوتكم لحضور حفل زفاف نجليهما سلطان وشمس.',
    photos = [
      '/images/gallery/couple-1.jpg',
      '/images/halls/hall-andalus.jpg',
      '/images/halls/hall-royal.jpg',
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

  const emeraldGreen = '#1E4D2B';
  const goldColor = '#C9A96E';
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
      if (!isPreview) {
        startGuidedTour();
      }
    }, 600);
  };

  return (
    <div style={{
      background: '#FAFBF8',
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
          primaryColor={emeraldGreen}
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
          background: 'linear-gradient(180deg, #F5F7F2 0%, #E8EFE8 100%)',
          border: `10px solid ${emeraldGreen}22`,
          position: 'relative',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: opening ? 'scale(0.9) translateY(-50px)' : 'scale(1)',
          opacity: opening ? 0 : 1
        }}>
          <div style={{ color: goldColor, fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>
            ﷽
          </div>

          <p style={{ fontFamily: 'var(--font-heading)', color: emeraldGreen, fontSize: '1.15rem', fontStyle: 'italic', marginBottom: 'var(--space-4)' }}>
            « بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ »
          </p>

          {/* Luxury Monogram Wax Seal */}
          <LuxuryMonogramSeal
            primaryColor={emeraldGreen}
            groomName={groomName}
            brideName={brideName}
            size={70}
          />

          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: `2px solid ${emeraldGreen}44`,
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8) var(--space-6)',
            maxWidth: 340,
            width: '100%',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
          }}>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.5rem',
              color: emeraldGreen,
              margin: '0 0 var(--space-2) 0'
            }}>
              {groomName}
            </h1>
            <span style={{ color: goldColor, fontSize: '1.2rem', display: 'block' }}>&</span>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.5rem',
              color: emeraldGreen,
              margin: '0 0 var(--space-4) 0'
            }}>
              {brideName}
            </h1>

            <div style={{ height: 2, width: 60, background: goldColor, margin: '0 auto var(--space-4)' }} />

            {weddingDate && (
              <p style={{ color: '#4A5568', fontSize: '0.95rem', marginBottom: 'var(--space-6)' }}>
                {dateInfo.fullDate}
              </p>
            )}

            <button
              onClick={handleOpenInvitation}
              className="btn btn-primary"
              style={{
                padding: '0.8rem 2.5rem',
                borderRadius: '30px',
                background: emeraldGreen,
                borderColor: goldColor,
                boxShadow: `0 8px 25px ${emeraldGreen}44`,
                width: '100%',
                cursor: 'pointer',
                color: '#FFFFFF',
                fontSize: '1.1rem'
              }}
            >
              افتح بطاقة الدعوة
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {opened && (
        <div style={{ animation: 'slideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <div style={{ textAlign: 'center', padding: 'var(--space-6) var(--space-4)', borderBottom: `1px solid ${emeraldGreen}22`, background: '#FFFFFF' }}>
            <img src="/images/logo.png" alt="قاعات النعمان" style={{ height: 36, margin: '0 auto var(--space-1)' }} />
            <span style={{ fontSize: '0.75rem', color: emeraldGreen, fontWeight: 'bold' }}>قاعات النعمان — Al Numan Halls</span>
          </div>

          {/* Section: Parents & Message Box */}
          <div style={{ padding: 'var(--space-8) var(--space-4)' }}>
            <div style={{
              maxWidth: 440,
              margin: '0 auto',
              background: '#FFFFFF',
              border: `2px solid ${emeraldGreen}33`,
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8) var(--space-6)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
              textAlign: 'center'
            }}>
              <div style={{ color: goldColor, fontSize: '1.8rem', marginBottom: 'var(--space-2)' }}>
                ﷽
              </div>

              {(groomFather || brideFather) && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-6)',
                  paddingBottom: 'var(--space-4)',
                  borderBottom: `1px solid ${emeraldGreen}22`,
                  fontSize: '0.85rem'
                }}>
                  {brideFather && (
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <span style={{ display: 'block', color: '#666', fontSize: '0.75rem', marginBottom: 2 }}>السيد والسيدة</span>
                      <strong style={{ color: emeraldGreen, display: 'block' }}>{brideFather}</strong>
                      {brideMother && <span style={{ color: '#888', fontSize: '0.8rem' }}>{brideMother}</span>}
                    </div>
                  )}
                  <div style={{ width: 1, background: `${emeraldGreen}22`, margin: '0 var(--space-3)' }} />
                  {groomFather && (
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <span style={{ display: 'block', color: '#666', fontSize: '0.75rem', marginBottom: 2 }}>السيد والسيدة</span>
                      <strong style={{ color: emeraldGreen, display: 'block' }}>{groomFather}</strong>
                      {groomMother && <span style={{ color: '#888', fontSize: '0.8rem' }}>{groomMother}</span>}
                    </div>
                  )}
                </div>
              )}

              <p style={{ fontSize: '0.95rem', lineHeight: 2, color: '#333333', margin: '0 0 var(--space-6) 0', whiteSpace: 'pre-line' }}>
                {invitationMessage}
              </p>

              <div style={{ margin: 'var(--space-6) 0' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: emeraldGreen, margin: 0 }}>
                  {groomFullName || groomName}
                </h2>
                <div style={{ color: goldColor, fontSize: '1.2rem', margin: '0.2rem 0' }}>✦</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: emeraldGreen, margin: 0 }}>
                  {brideFullName || brideName}
                </h2>
              </div>

              {weddingDate && (
                <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: `1px solid ${emeraldGreen}22` }}>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>حفل الزفاف في</div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#2C2417', marginTop: 2 }}>
                    {dateInfo.weekday} في {weddingTime || '19:30'}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-3)',
                    marginTop: 'var(--space-2)'
                  }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: emeraldGreen, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                      {dateInfo.day}
                    </div>
                    <div style={{ textAlign: 'right', borderRight: `2px solid ${emeraldGreen}44`, paddingRight: 'var(--space-2)' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#2C2417' }}>
                        {dateInfo.monthName}
                      </div>
                      <div style={{ color: '#666', fontSize: '0.9rem' }}>
                        {dateInfo.year}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {weddingDate && <CountdownText targetDate={`${weddingDate}T${weddingTime || '19:30'}`} primaryColor={emeraldGreen} />}

          {weddingDate && <WeddingCalendar weddingDate={weddingDate} primaryColor={emeraldGreen} />}

          {/* 3D Coverflow Photo Album Stack with Auto-play */}
          {photos && photos.length > 0 && <PhotoAlbumStack photos={photos} primaryColor={emeraldGreen} />}

          {schedule && schedule.length > 0 && (
            <div style={{ background: '#FFFFFF', padding: 'var(--space-8) var(--space-4)', borderTop: '1px solid #E8EFE8', borderBottom: '1px solid #E8EFE8' }}>
              <h3 style={{ textAlign: 'center', color: emeraldGreen, fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 'var(--space-4)' }}>
                برنامج اليوم
              </h3>
              <ConnectedTimeline schedule={schedule} primaryColor={emeraldGreen} />
            </div>
          )}

          <div style={{
            background: '#F4F7F4',
            padding: 'var(--space-8) var(--space-4)',
            textAlign: 'center',
            borderTop: '1px solid #C8E6C9',
            borderBottom: '1px solid #C8E6C9'
          }}>
            <div style={{ fontSize: '2rem', color: emeraldGreen, marginBottom: 'var(--space-2)' }}>📍</div>
            <h3 style={{ color: emeraldGreen, fontSize: '1.3rem', marginBottom: 'var(--space-1)' }}>
              {venue || 'قاعات النعمان'}
            </h3>
            <p style={{ color: '#555555', fontSize: '0.9rem', marginBottom: 'var(--space-4)' }}>
              {venueAddress || 'عمّان، الأردن'}
            </p>
            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '25px', borderColor: emeraldGreen, color: emeraldGreen, background: '#FFFFFF' }}
              >
                🗺️ فتح الموقع على Google Maps
              </a>
            )}
          </div>

          <GuestbookSection slug={slug} primaryColor={emeraldGreen} />

          <div style={{
            background: '#FFFFFF',
            padding: 'var(--space-8) var(--space-4)',
            textAlign: 'center',
            borderTop: '1px solid #E8EFE8'
          }}>
            <div style={{ display: 'inline-block', padding: 10, background: '#F4F7F4', border: '1px solid #C8E6C9', borderRadius: '12px' }}>
              <QRCodeSVG value={currentUrl} size={140} fgColor="#1B5E20" />
            </div>
            <p style={{ fontSize: '0.75rem', color: '#777', marginTop: 'var(--space-3)' }}>رمز الدعوة الإلكتروني</p>
            <div style={{ marginTop: 'var(--space-4)', fontSize: '0.75rem', color: emeraldGreen }}>قاعات النعمان — Al Numan Halls</div>
          </div>
        </div>
      )}
    </div>
  );
}
