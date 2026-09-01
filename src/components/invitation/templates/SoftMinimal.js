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

export default function SoftMinimal({ weddingData = {}, slug = '', isPreview = false }) {
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
    invitationMessage = 'يتشرف سلطان وشمس بدعوتكم لمشاركتهما فرحة زفافهما في أمسية مشرقة تكتمل بحضوركم الكريم.',
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

  const softGold = '#C9A96E';
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
      background: '#FFFFFF',
      color: '#333333',
      minHeight: '100%',
      fontFamily: 'var(--font-body)',
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Audio Control Button */}
      {opened && (
        <FloatingAudioButton
          primaryColor={softGold}
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
          background: '#FAF8F5',
          position: 'relative',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: opening ? 'scale(0.9) translateY(-50px)' : 'scale(1)',
          opacity: opening ? 0 : 1
        }}>
          {/* Luxury Monogram Wax Seal */}
          <LuxuryMonogramSeal
            primaryColor={softGold}
            groomName={groomName}
            brideName={brideName}
            size={70}
          />

          <div style={{
            background: '#FFFFFF',
            border: `1px solid ${softGold}`,
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8) var(--space-6)',
            maxWidth: 340,
            width: '100%',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            <span style={{ fontSize: '0.8rem', color: softGold, letterSpacing: '4px', display: 'block', marginBottom: 'var(--space-4)' }}>
              WEDDING INVITATION
            </span>

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.6rem',
              fontWeight: 'normal',
              color: '#2C2417',
              margin: '0 0 var(--space-2) 0'
            }}>
              {groomName}
            </h1>
            <span style={{ color: softGold, fontSize: '1.4rem', display: 'block' }}>and</span>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.6rem',
              fontWeight: 'normal',
              color: '#2C2417',
              margin: '0 0 var(--space-4) 0'
            }}>
              {brideName}
            </h1>

            <div style={{ width: 40, height: 1, background: softGold, margin: '0 auto var(--space-4)' }} />

            {weddingDate && (
              <p style={{ color: '#8A7D6B', fontSize: '0.9rem', marginBottom: 'var(--space-6)' }}>
                {dateInfo.fullDate}
              </p>
            )}

            <button
              onClick={handleOpenInvitation}
              className="btn btn-secondary"
              style={{
                padding: '0.7rem 2rem',
                borderRadius: '25px',
                borderColor: softGold,
                color: '#2C2417',
                fontSize: '0.95rem',
                width: '100%',
                cursor: 'pointer'
              }}
            >
              افتح الدعوة
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {opened && (
        <div style={{ animation: 'slideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <div style={{ textAlign: 'center', padding: 'var(--space-6) var(--space-4)', borderBottom: '1px solid #E0D8CC', background: '#FAF8F5' }}>
            <img src="/images/logo.png" alt="قاعات النعمان" style={{ height: 36, margin: '0 auto var(--space-1)' }} />
            <span style={{ fontSize: '0.75rem', color: softGold }}>قاعات النعمان — Al Numan Halls</span>
          </div>

          <div style={{ padding: 'var(--space-8) var(--space-4)' }}>
            <div style={{
              maxWidth: 440,
              margin: '0 auto',
              background: '#FFFFFF',
              border: '1px solid #E0D8CC',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8) var(--space-6)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
              textAlign: 'center'
            }}>
              <span style={{ color: softGold, fontSize: '0.8rem', letterSpacing: '2px', display: 'block', marginBottom: 'var(--space-4)' }}>
                تفاصيل الحفل
              </span>

              <p style={{ fontSize: '0.95rem', lineHeight: 2, color: '#555', margin: '0 0 var(--space-6) 0', whiteSpace: 'pre-line' }}>
                {invitationMessage}
              </p>

              <div style={{ margin: 'var(--space-6) 0' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: '#2C2417', margin: 0, fontWeight: 'normal' }}>
                  {groomFullName || groomName}
                </h2>
                <div style={{ color: softGold, fontSize: '1.3rem', margin: '0.2rem 0' }}>&</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: '#2C2417', margin: 0, fontWeight: 'normal' }}>
                  {brideFullName || brideName}
                </h2>
              </div>

              {weddingDate && (
                <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: `1px solid #E0D8CC` }}>
                  <div style={{ fontSize: '0.85rem', color: '#888' }}>حفل الزفاف في</div>
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
                    <div style={{ fontSize: '3.5rem', fontWeight: 'normal', color: softGold, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                      {dateInfo.day}
                    </div>
                    <div style={{ textAlign: 'right', borderRight: `2px solid ${softGold}`, paddingRight: 'var(--space-2)' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#2C2417' }}>
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

          {weddingDate && <CountdownText targetDate={`${weddingDate}T${weddingTime || '19:30'}`} primaryColor={softGold} />}

          {weddingDate && <WeddingCalendar weddingDate={weddingDate} primaryColor={softGold} />}

          {/* 3D Coverflow Photo Album Stack with Auto-play */}
          {photos && photos.length > 0 && <PhotoAlbumStack photos={photos} primaryColor={softGold} />}

          {schedule && schedule.length > 0 && (
            <div style={{ background: '#FAFAF7', padding: 'var(--space-8) var(--space-4)', borderTop: '1px solid #EBE5DB', borderBottom: '1px solid #EBE5DB' }}>
              <h3 style={{ textAlign: 'center', color: '#2C2417', fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: 'var(--space-4)', fontWeight: 'normal' }}>
                برنامج اليوم
              </h3>
              <ConnectedTimeline schedule={schedule} primaryColor={softGold} />
            </div>
          )}

          <div style={{ padding: 'var(--space-8) var(--space-4)', textAlign: 'center', background: '#FAFAF7', borderTop: '1px solid #EBE5DB' }}>
            <h3 style={{ color: '#2C2417', fontSize: '1.2rem', marginBottom: 'var(--space-1)', fontWeight: 'normal' }}>
              {venue || 'قاعات النعمان'}
            </h3>
            <p style={{ color: '#888888', fontSize: '0.85rem', marginBottom: 'var(--space-4)' }}>
              {venueAddress || 'عمّان، الأردن'}
            </p>
            {mapUrl && (
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ borderColor: softGold, color: softGold }}>
                خريطة الموقع Google Maps
              </a>
            )}
          </div>

          <GuestbookSection slug={slug} primaryColor={softGold} />

          <div style={{ padding: 'var(--space-8) var(--space-4)', textAlign: 'center', borderTop: '1px solid #F0ECE6' }}>
            <div style={{ display: 'inline-block', padding: 8, background: '#FFFFFF', border: '1px solid #EBE5DB', borderRadius: '8px' }}>
              <QRCodeSVG value={currentUrl} size={130} fgColor="#2C2417" />
            </div>
            <p style={{ fontSize: '0.75rem', color: '#999', marginTop: 'var(--space-2)' }}>رمز الدعوة الرقمية</p>
            <div style={{ marginTop: 'var(--space-4)', fontSize: '0.75rem', color: '#AAA' }}>قاعات النعمان — Al Numan Halls</div>
          </div>
        </div>
      )}
    </div>
  );
}
