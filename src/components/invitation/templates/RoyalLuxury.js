'use client';
import { useState } from 'react';
import {
  CountdownText,
  WeddingCalendar,
  ConnectedTimeline,
  PhotoAlbumStack,
  GuestbookSection
} from '@/components/invitation/sections/SharedElements';
import { QRCodeSVG } from 'qrcode.react';

export default function RoyalLuxury({ weddingData = {}, slug = '', isPreview = false }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);

  const {
    groomName = 'يوسف',
    groomFullName = 'يوسف بن إبراهيم',
    brideName = 'دانة',
    brideFullName = 'دانة بنت خليفة',
    groomFather = 'إبراهيم الحمادي',
    groomMother = 'موزة المرزوقي',
    brideFather = 'خليفة الشامسي',
    brideMother = 'عائشة النعيمي',
    weddingDate = '2027-06-18',
    weddingTime = '20:00',
    venue = 'قاعة الملكية - قاعات النعمان',
    venueAddress = 'عمّان، شارع المدينة المنوّرة',
    mapUrl = 'https://maps.google.com/?q=31.9539,35.9106',
    invitationMessage = 'يتشرف يوسف ودانة بدعوتكم لمشاركتهما فرحة العمر في ليلة تزدان بحضوركم الكريم.',
    photos = [
      '/images/gallery/couple-1.jpg',
      '/images/halls/hall-royal.jpg',
      '/images/halls/hall-andalus.jpg',
      '/images/halls/hall-elegance.jpg'
    ],
    schedule = [
      { name: 'استقبال الضيوف', time: '19:30' },
      { name: 'بدء الحفل والزفة', time: '20:00' },
      { name: 'قطع الكعكة الملكية', time: '20:45' },
      { name: 'العشاء الرئيسي', time: '21:00' },
      { name: 'ختام الحفل', time: '23:00' },
    ],
  } = weddingData;

  const goldPrimary = '#D4AF37';
  const currentUrl = typeof window !== 'undefined' && slug ? `${window.location.origin}/invite/${slug}` : 'https://numanhalls.net';

  const handleOpenInvitation = () => {
    setOpening(true);
    setTimeout(() => {
      setOpened(true);
      setOpening(false);
    }, 600);
  };

  return (
    <div style={{
      background: '#0D0D14',
      color: '#E8E8EE',
      minHeight: '100%',
      fontFamily: 'var(--font-body)',
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Audio Indicator */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${goldPrimary}, #8B7340)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        zIndex: 50,
        cursor: 'pointer'
      }}>
        <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 16 }}>
          <span style={{ width: 3, height: 12, background: '#fff', borderRadius: 2 }} />
          <span style={{ width: 3, height: 16, background: '#fff', borderRadius: 2 }} />
          <span style={{ width: 3, height: 8, background: '#fff', borderRadius: 2 }} />
        </div>
      </div>

      {/* Cover Envelope */}
      {!opened && (
        <div style={{
          minHeight: isPreview ? '650px' : '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'var(--space-8)',
          background: 'radial-gradient(circle at center, #1F1D33 0%, #0D0D14 100%)',
          border: `10px solid ${goldPrimary}33`,
          position: 'relative',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: opening ? 'scale(0.9) translateY(-50px)' : 'scale(1)',
          opacity: opening ? 0 : 1
        }}>
          <div style={{
            fontSize: '3rem',
            color: goldPrimary,
            marginBottom: 'var(--space-4)',
            filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.5))',
            animation: 'float 3s ease-in-out infinite'
          }}>
            👑
          </div>

          <div style={{
            background: 'rgba(26, 26, 46, 0.85)',
            border: `2px solid ${goldPrimary}66`,
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8) var(--space-6)',
            maxWidth: 340,
            width: '100%',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <span style={{ fontSize: '0.8rem', color: goldPrimary, letterSpacing: '3px', display: 'block', marginBottom: 'var(--space-2)' }}>
              ROYAL WEDDING INVITATION
            </span>

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.5rem',
              color: '#FFFFFF',
              lineHeight: 1.3,
              margin: '0 0 var(--space-2) 0'
            }}>
              {groomName}
            </h1>
            <span style={{ color: goldPrimary, fontSize: '1.2rem', display: 'block' }}>&</span>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.5rem',
              color: '#FFFFFF',
              lineHeight: 1.3,
              margin: '0 0 var(--space-4) 0'
            }}>
              {brideName}
            </h1>

            <div style={{ height: 2, width: 80, background: `linear-gradient(90deg, transparent, ${goldPrimary}, transparent)`, margin: '0 auto var(--space-4)' }} />

            {weddingDate && (
              <p style={{ color: '#C4B8A8', fontSize: '0.9rem', marginBottom: 'var(--space-6)' }}>
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
                background: `linear-gradient(135deg, ${goldPrimary}, #997A15)`,
                color: '#000000',
                fontWeight: 'bold',
                boxShadow: '0 8px 30px rgba(212, 175, 55, 0.4)',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              فتح الدعوة الملكية ✨
            </button>
          </div>
        </div>
      )}

      {/* Main Unfolded Invitation */}
      {opened && (
        <div style={{ animation: 'slideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', padding: 'var(--space-6) var(--space-4)', borderBottom: '1px solid rgba(212,175,55,0.2)', background: '#12121D' }}>
            <img src="/images/logo.png" alt="قاعات النعمان" style={{ height: 36, margin: '0 auto var(--space-1)', filter: 'brightness(0) invert(1)' }} />
            <span style={{ fontSize: '0.75rem', color: goldPrimary }}>قاعات النعمان — أجنحة الفخامة الملكية</span>
          </div>

          {/* Section: Parents & Message Box */}
          <div style={{ padding: 'var(--space-8) var(--space-4)' }}>
            <div style={{
              maxWidth: 440,
              margin: '0 auto',
              background: 'linear-gradient(180deg, #1A192B 0%, #12121E 100%)',
              border: `2px solid ${goldPrimary}66`,
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8) var(--space-6)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                color: goldPrimary,
                marginBottom: 'var(--space-6)'
              }}>
                معلومات الحفل الملكي
              </h3>

              {/* Parents */}
              {(groomFather || brideFather) && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-6)',
                  paddingBottom: 'var(--space-4)',
                  borderBottom: '1px solid rgba(212,175,55,0.2)',
                  fontSize: '0.85rem'
                }}>
                  {brideFather && (
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <span style={{ display: 'block', color: goldPrimary, fontSize: '0.75rem', marginBottom: 2 }}>السيد والسيدة</span>
                      <strong style={{ color: '#FFFFFF', display: 'block' }}>{brideFather}</strong>
                      {brideMother && <span style={{ color: '#C4B8A8', fontSize: '0.8rem' }}>{brideMother}</span>}
                    </div>
                  )}
                  <div style={{ width: 1, background: 'rgba(212,175,55,0.2)', margin: '0 var(--space-3)' }} />
                  {groomFather && (
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <span style={{ display: 'block', color: goldPrimary, fontSize: '0.75rem', marginBottom: 2 }}>السيد والسيدة</span>
                      <strong style={{ color: '#FFFFFF', display: 'block' }}>{groomFather}</strong>
                      {groomMother && <span style={{ color: '#C4B8A8', fontSize: '0.8rem' }}>{groomMother}</span>}
                    </div>
                  )}
                </div>
              )}

              {/* Message */}
              <p style={{
                fontSize: '0.95rem',
                lineHeight: 2,
                color: '#D4C5A0',
                margin: '0 0 var(--space-6) 0',
                whiteSpace: 'pre-line'
              }}>
                {invitationMessage}
              </p>

              {/* Couple Names */}
              <div style={{ margin: 'var(--space-6) 0' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#FFFFFF', margin: 0 }}>
                  {groomFullName || groomName}
                </h2>
                <div style={{ color: goldPrimary, fontSize: '1.4rem', margin: '0.3rem 0' }}>✦</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#FFFFFF', margin: 0 }}>
                  {brideFullName || brideName}
                </h2>
              </div>

              {/* Date */}
              {weddingDate && (
                <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
                  <div style={{ fontSize: '0.85rem', color: goldPrimary }}>حفل الزفاف في</div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#FFFFFF', marginTop: 2 }}>
                    {new Date(weddingDate).toLocaleDateString('ar-SA', { weekday: 'long' })} في {weddingTime || '20:00'}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-3)',
                    marginTop: 'var(--space-2)'
                  }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: goldPrimary, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                      {new Date(weddingDate).getDate()}
                    </div>
                    <div style={{ textAlign: 'right', borderRight: `2px solid ${goldPrimary}66`, paddingRight: 'var(--space-2)' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#FFFFFF' }}>
                        {new Date(weddingDate).toLocaleDateString('ar-SA', { month: 'long' })}
                      </div>
                      <div style={{ color: '#C4B8A8', fontSize: '0.9rem' }}>
                        {new Date(weddingDate).getFullYear()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Countdown */}
          {weddingDate && <CountdownText targetDate={`${weddingDate}T${weddingTime || '20:00'}`} primaryColor={goldPrimary} />}

          {/* Calendar */}
          {weddingDate && <WeddingCalendar weddingDate={weddingDate} primaryColor={goldPrimary} dark={true} />}

          {/* 3D Photo Album Stack */}
          {photos && photos.length > 0 && <PhotoAlbumStack photos={photos} primaryColor={goldPrimary} />}

          {/* Connected Timeline */}
          {schedule && schedule.length > 0 && (
            <div style={{ background: '#12121E', padding: 'var(--space-8) var(--space-4)', borderTop: '1px solid rgba(212,175,55,0.2)', borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
              <h3 style={{ textAlign: 'center', color: goldPrimary, fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 'var(--space-4)' }}>
                برنامج اليوم
              </h3>
              <ConnectedTimeline schedule={schedule} primaryColor={goldPrimary} dark={true} />
            </div>
          )}

          {/* Location */}
          <div style={{ background: '#161524', padding: 'var(--space-8) var(--space-4)', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.2)', borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
            <div style={{ fontSize: '2rem', color: goldPrimary, marginBottom: 'var(--space-2)' }}>📍</div>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.3rem', marginBottom: 'var(--space-1)' }}>
              {venue || 'قاعات النعمان'}
            </h3>
            <p style={{ color: '#C4B8A8', fontSize: '0.9rem', marginBottom: 'var(--space-4)' }}>
              {venueAddress || 'عمّان - الأردن'}
            </p>
            {mapUrl && (
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: '25px', borderColor: goldPrimary, color: goldPrimary }}>
                🗺️ خريطة الموقع عبر Google Maps
              </a>
            )}
          </div>

          {/* Guestbook (سجل التهاني) */}
          <GuestbookSection slug={slug} primaryColor={goldPrimary} dark={true} />

          {/* QR */}
          <div style={{ background: '#12121E', padding: 'var(--space-8) var(--space-4)', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
            <span style={{ fontSize: '0.8rem', color: '#A89B88', display: 'block', marginBottom: 'var(--space-3)' }}>
              رمز الدعوة الإلكتروني المعتمد
            </span>
            <div style={{ display: 'inline-block', padding: 12, background: '#FFFFFF', borderRadius: '12px' }}>
              <QRCodeSVG value={currentUrl} size={140} fgColor="#0D0D14" />
            </div>
            <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '0.75rem', color: goldPrimary }}>
                قاعات النعمان — Al Numan Halls
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
