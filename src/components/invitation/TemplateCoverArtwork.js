'use client';

export default function TemplateCoverArtwork({ templateId, height = 380 }) {
  switch (templateId) {
    case 'classic-gold':
      return (
        <div style={{
          height,
          width: '100%',
          background: 'linear-gradient(135deg, #FAF7F0 0%, #F3ECE0 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 20px',
          boxSizing: 'border-box',
          color: '#2C2417'
        }}>
          {/* Gold Decorative Corner Ornaments */}
          <div style={{ position: 'absolute', top: 10, left: 10, width: 28, height: 28, borderTop: '2px solid #C9A96E', borderLeft: '2px solid #C9A96E' }} />
          <div style={{ position: 'absolute', top: 10, right: 10, width: 28, height: 28, borderTop: '2px solid #C9A96E', borderRight: '2px solid #C9A96E' }} />
          <div style={{ position: 'absolute', bottom: 10, left: 10, width: 28, height: 28, borderBottom: '2px solid #C9A96E', borderLeft: '2px solid #C9A96E' }} />
          <div style={{ position: 'absolute', bottom: 10, right: 10, width: 28, height: 28, borderBottom: '2px solid #C9A96E', borderRight: '2px solid #C9A96E' }} />

          {/* Arched Inner Border */}
          <div style={{
            position: 'absolute',
            inset: 16,
            border: '1px solid #D4AF37',
            borderRadius: '120px 120px 16px 16px',
            pointerEvents: 'none'
          }} />

          {/* Top Header */}
          <div style={{ textAlign: 'center', zIndex: 2, marginTop: 12 }}>
            <div style={{ color: '#C9A96E', fontSize: '1.2rem', marginBottom: 2 }}>﷽</div>
            <span style={{ fontSize: '0.65rem', color: '#8B7340', letterSpacing: '2px', textTransform: 'uppercase' }}>
              دعوة زفاف كلاسيكية
            </span>
          </div>

          {/* Center Card */}
          <div style={{
            zIndex: 2,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid #E8D5A3',
            borderRadius: '80px 80px 16px 16px',
            padding: '20px 16px',
            width: '82%',
            boxShadow: '0 8px 20px rgba(184, 148, 79, 0.12)'
          }}>
            <div style={{ fontSize: '0.75rem', color: '#8B7340', marginBottom: 4 }}>حفل زفاف الأستاذ</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#B8944F', fontSize: '1.4rem', margin: '0 0 2px 0' }}>
              يوسف المبارك
            </h4>
            <div style={{ color: '#D4AF37', fontSize: '0.9rem' }}>✦ & ✦</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#B8944F', fontSize: '1.4rem', margin: '2px 0 6px 0' }}>
              دانة الشامسي
            </h4>
            <div style={{ height: 1.5, width: 40, background: '#D4AF37', margin: '6px auto' }} />
            <div style={{ fontSize: '0.7rem', color: '#666' }}>قاعة الملكية — قاعات النعمان</div>
          </div>

          {/* Bottom Seal */}
          <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37, #9C7A28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontSize: '0.75rem',
              boxShadow: '0 3px 8px rgba(184, 148, 79, 0.35)'
            }}>
              ⚜️
            </div>
            <span style={{ fontSize: '0.7rem', color: '#8B7340', fontWeight: 'bold' }}>CLASSIC GOLD</span>
          </div>
        </div>
      );

    case 'royal-luxury':
      return (
        <div style={{
          height,
          width: '100%',
          background: 'radial-gradient(ellipse at center, #1E1B2E 0%, #0A0914 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 20px',
          boxSizing: 'border-box',
          color: '#FFFFFF'
        }}>
          {/* Sparkles and Stars */}
          <div style={{ position: 'absolute', top: 20, left: 30, color: '#D4AF37', fontSize: '0.8rem', opacity: 0.6 }}>✦</div>
          <div style={{ position: 'absolute', top: 40, right: 35, color: '#D4AF37', fontSize: '0.6rem', opacity: 0.8 }}>✨</div>
          <div style={{ position: 'absolute', bottom: 60, left: 25, color: '#D4AF37', fontSize: '0.7rem', opacity: 0.7 }}>✦</div>

          {/* Ornate Gold Filigree Border */}
          <div style={{
            position: 'absolute',
            inset: 14,
            border: '1.5px solid #D4AF37',
            borderRadius: '130px 130px 20px 20px',
            boxShadow: 'inset 0 0 15px rgba(212, 175, 55, 0.2)'
          }} />

          {/* Top Crown */}
          <div style={{ textAlign: 'center', zIndex: 2, marginTop: 10 }}>
            <div style={{ fontSize: '1.5rem', color: '#D4AF37', marginBottom: 2 }}>👑</div>
            <span style={{ fontSize: '0.65rem', color: '#E8D5A3', letterSpacing: '3px', textTransform: 'uppercase' }}>
              ROYAL LUXURY NIGHT
            </span>
          </div>

          {/* Center Royal Card */}
          <div style={{
            zIndex: 2,
            textAlign: 'center',
            background: 'rgba(26, 26, 46, 0.85)',
            border: '1px solid #D4AF37',
            borderRadius: '90px 90px 16px 16px',
            padding: '20px 16px',
            width: '84%',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#D4AF37', letterSpacing: 1 }}>حفل الزفاف الملكي</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#FFFFFF', fontSize: '1.4rem', margin: '4px 0 2px 0' }}>
              يوسف المبارك
            </h4>
            <div style={{ color: '#D4AF37', fontSize: '0.85rem' }}>✨ & ✨</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#FFFFFF', fontSize: '1.4rem', margin: '2px 0 6px 0' }}>
              دانة الشامسي
            </h4>
            <div style={{ height: 1, width: 50, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', margin: '6px auto' }} />
            <div style={{ fontSize: '0.7rem', color: '#BAC7D5' }}>قاعة رويال هول — النعمان</div>
          </div>

          {/* Bottom Royal Medallion */}
          <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37, #7A5E1C)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A0914',
              fontSize: '0.85rem',
              fontWeight: 'bold'
            }}>
              ♚
            </div>
            <span style={{ fontSize: '0.7rem', color: '#E8D5A3', fontWeight: 'bold' }}>ROYAL LUXURY</span>
          </div>
        </div>
      );

    case 'emerald-botanica':
      return (
        <div style={{
          height,
          width: '100%',
          background: 'linear-gradient(180deg, #EDF5F1 0%, #DFECE5 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 20px',
          boxSizing: 'border-box',
          color: '#1B3B30'
        }}>
          {/* Eucalyptus & Leaf Silhouettes */}
          <div style={{ position: 'absolute', top: -5, left: -5, fontSize: '2.2rem', opacity: 0.7, transform: 'rotate(-25deg)' }}>🌿</div>
          <div style={{ position: 'absolute', top: -5, right: -5, fontSize: '2.2rem', opacity: 0.7, transform: 'rotate(25deg)' }}>🍃</div>
          <div style={{ position: 'absolute', bottom: -5, left: -5, fontSize: '2rem', opacity: 0.6, transform: 'rotate(45deg)' }}>🌱</div>
          <div style={{ position: 'absolute', bottom: -5, right: -5, fontSize: '2rem', opacity: 0.6, transform: 'rotate(-45deg)' }}>🌿</div>

          {/* Sage Botanical Arch */}
          <div style={{
            position: 'absolute',
            inset: 14,
            border: '1.5px solid #87A99C',
            borderRadius: '130px 130px 20px 20px'
          }} />

          {/* Top Header */}
          <div style={{ textAlign: 'center', zIndex: 2, marginTop: 10 }}>
            <div style={{ fontSize: '1.4rem', color: '#1B4D3E', marginBottom: 2 }}>🌿</div>
            <span style={{ fontSize: '0.65rem', color: '#1B4D3E', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
              BOTANICAL GARDEN
            </span>
          </div>

          {/* Center Card */}
          <div style={{
            zIndex: 2,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #87A99C',
            borderRadius: '90px 90px 16px 16px',
            padding: '20px 16px',
            width: '84%',
            boxShadow: '0 10px 25px rgba(27, 77, 62, 0.1)'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#4A6B5D' }}>دعوة زفاف طبيعية</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#1B4D3E', fontSize: '1.4rem', margin: '4px 0 2px 0' }}>
              يوسف المبارك
            </h4>
            <div style={{ color: '#C9A96E', fontSize: '0.9rem' }}>🍃 & 🍃</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#1B4D3E', fontSize: '1.4rem', margin: '2px 0 6px 0' }}>
              دانة الشامسي
            </h4>
            <div style={{ height: 1.5, width: 40, background: '#C9A96E', margin: '6px auto' }} />
            <div style={{ fontSize: '0.7rem', color: '#4A6B5D' }}>قاعة الأندلس — قاعات النعمان</div>
          </div>

          {/* Bottom Seal */}
          <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1B4D3E, #2D6A56)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontSize: '0.85rem'
            }}>
              🍃
            </div>
            <span style={{ fontSize: '0.7rem', color: '#1B4D3E', fontWeight: 'bold' }}>EMERALD BOTANICA</span>
          </div>
        </div>
      );

    case 'blush-romance':
      return (
        <div style={{
          height,
          width: '100%',
          background: 'linear-gradient(180deg, #FFF0F3 0%, #FCE4E8 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 20px',
          boxSizing: 'border-box',
          color: '#3B242B'
        }}>
          {/* Rose Petals & Flowers */}
          <div style={{ position: 'absolute', top: -6, left: -6, fontSize: '2.2rem', opacity: 0.75 }}>🌸</div>
          <div style={{ position: 'absolute', top: -6, right: -6, fontSize: '2.2rem', opacity: 0.75 }}>🌺</div>
          <div style={{ position: 'absolute', bottom: -6, left: -6, fontSize: '2rem', opacity: 0.7 }}>🌷</div>
          <div style={{ position: 'absolute', bottom: -6, right: -6, fontSize: '2rem', opacity: 0.7 }}>🌸</div>

          {/* Rose Blush Arched Frame */}
          <div style={{
            position: 'absolute',
            inset: 14,
            border: '1.5px solid #E8A7B3',
            borderRadius: '130px 130px 20px 20px'
          }} />

          {/* Top Header */}
          <div style={{ textAlign: 'center', zIndex: 2, marginTop: 10 }}>
            <div style={{ fontSize: '1.4rem', color: '#B35467', marginBottom: 2 }}>🌸</div>
            <span style={{ fontSize: '0.65rem', color: '#B35467', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
              BLUSH ROSE GARDEN
            </span>
          </div>

          {/* Center Card */}
          <div style={{
            zIndex: 2,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #E8A7B3',
            borderRadius: '90px 90px 16px 16px',
            padding: '20px 16px',
            width: '84%',
            boxShadow: '0 10px 25px rgba(179, 84, 103, 0.12)'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#7E525E' }}>فرحة العمر الميمونة</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#B35467', fontSize: '1.4rem', margin: '4px 0 2px 0' }}>
              يوسف المبارك
            </h4>
            <div style={{ color: '#C9A96E', fontSize: '0.9rem' }}>🌸 & 🌸</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#B35467', fontSize: '1.4rem', margin: '2px 0 6px 0' }}>
              دانة الشامسي
            </h4>
            <div style={{ height: 1.5, width: 40, background: '#E8A7B3', margin: '6px auto' }} />
            <div style={{ fontSize: '0.7rem', color: '#7E525E' }}>قاعة الفخامة — النعمان</div>
          </div>

          {/* Bottom Seal */}
          <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #B35467, #E8A7B3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontSize: '0.85rem'
            }}>
              🌺
            </div>
            <span style={{ fontSize: '0.7rem', color: '#B35467', fontWeight: 'bold' }}>BLUSH ROMANCE</span>
          </div>
        </div>
      );

    case 'midnight-royale':
      return (
        <div style={{
          height,
          width: '100%',
          background: 'radial-gradient(ellipse at center, #14213D 0%, #080D17 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 20px',
          boxSizing: 'border-box',
          color: '#FFFFFF'
        }}>
          {/* Celestial Constellation Stars */}
          <div style={{ position: 'absolute', top: 18, left: 24, color: '#D4AF37', fontSize: '0.9rem' }}>⭐</div>
          <div style={{ position: 'absolute', top: 35, right: 28, color: '#F3E5AB', fontSize: '0.65rem' }}>✦</div>
          <div style={{ position: 'absolute', bottom: 50, right: 30, color: '#D4AF37', fontSize: '0.75rem' }}>✨</div>

          {/* Gold Starry Arch */}
          <div style={{
            position: 'absolute',
            inset: 14,
            border: '1.5px solid #D4AF37',
            borderRadius: '130px 130px 20px 20px',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.25)'
          }} />

          {/* Top Starry Motif */}
          <div style={{ textAlign: 'center', zIndex: 2, marginTop: 10 }}>
            <div style={{ fontSize: '1.5rem', color: '#D4AF37', marginBottom: 2 }}>🌌</div>
            <span style={{ fontSize: '0.65rem', color: '#F3E5AB', letterSpacing: '3px', textTransform: 'uppercase' }}>
              MIDNIGHT CELESTIAL
            </span>
          </div>

          {/* Center Card */}
          <div style={{
            zIndex: 2,
            textAlign: 'center',
            background: 'rgba(20, 30, 48, 0.9)',
            border: '1px solid #D4AF37',
            borderRadius: '90px 90px 16px 16px',
            padding: '20px 16px',
            width: '84%',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8)'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#D4AF37' }}>حفل الزفاف الباهر</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#FFFFFF', fontSize: '1.4rem', margin: '4px 0 2px 0' }}>
              يوسف المبارك
            </h4>
            <div style={{ color: '#D4AF37', fontSize: '0.85rem' }}>⭐ & ⭐</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#FFFFFF', fontSize: '1.4rem', margin: '2px 0 6px 0' }}>
              دانة الشامسي
            </h4>
            <div style={{ height: 1, width: 50, background: '#D4AF37', margin: '6px auto' }} />
            <div style={{ fontSize: '0.7rem', color: '#BAC7D5' }}>قاعة رويال هول — النعمان</div>
          </div>

          {/* Bottom Seal */}
          <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37, #9C7A28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#080D17',
              fontSize: '0.85rem'
            }}>
              🌟
            </div>
            <span style={{ fontSize: '0.7rem', color: '#F3E5AB', fontWeight: 'bold' }}>MIDNIGHT ROYALE</span>
          </div>
        </div>
      );

    case 'crimson-velvet':
      return (
        <div style={{
          height,
          width: '100%',
          background: 'linear-gradient(180deg, #540D1D 0%, #350812 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 20px',
          boxSizing: 'border-box',
          color: '#FFFFFF'
        }}>
          {/* Gold Filigree Ornaments */}
          <div style={{ position: 'absolute', top: 10, left: 10, color: '#C9A96E', fontSize: '1.1rem' }}>⚜️</div>
          <div style={{ position: 'absolute', top: 10, right: 10, color: '#C9A96E', fontSize: '1.1rem' }}>⚜️</div>
          <div style={{ position: 'absolute', bottom: 10, left: 10, color: '#C9A96E', fontSize: '1.1rem' }}>⚜️</div>
          <div style={{ position: 'absolute', bottom: 10, right: 10, color: '#C9A96E', fontSize: '1.1rem' }}>⚜️</div>

          {/* Gold Velvet Border */}
          <div style={{
            position: 'absolute',
            inset: 14,
            border: '1.5px solid #C9A96E',
            borderRadius: '130px 130px 20px 20px',
            boxShadow: 'inset 0 0 15px rgba(201, 169, 110, 0.2)'
          }} />

          {/* Top Header */}
          <div style={{ textAlign: 'center', zIndex: 2, marginTop: 10 }}>
            <div style={{ fontSize: '1.5rem', color: '#C9A96E', marginBottom: 2 }}>⚜️</div>
            <span style={{ fontSize: '0.65rem', color: '#F0D499', letterSpacing: '3px', textTransform: 'uppercase' }}>
              CRIMSON VELVET WEDDING
            </span>
          </div>

          {/* Center Card */}
          <div style={{
            zIndex: 2,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.96)',
            border: '1.5px solid #C9A96E',
            borderRadius: '90px 90px 16px 16px',
            padding: '20px 16px',
            width: '84%',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#540D1D' }}>دعوة زفاف فاخرة</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#540D1D', fontSize: '1.4rem', margin: '4px 0 2px 0' }}>
              يوسف المبارك
            </h4>
            <div style={{ color: '#C9A96E', fontSize: '0.85rem' }}>⚜️ & ⚜️</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#540D1D', fontSize: '1.4rem', margin: '2px 0 6px 0' }}>
              دانة الشامسي
            </h4>
            <div style={{ height: 1.5, width: 40, background: '#C9A96E', margin: '6px auto' }} />
            <div style={{ fontSize: '0.7rem', color: '#6A2E3B' }}>قاعة الملكية — النعمان</div>
          </div>

          {/* Bottom Seal */}
          <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C9A96E, #8C6A2E)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#380B14',
              fontSize: '0.85rem'
            }}>
              ⚜️
            </div>
            <span style={{ fontSize: '0.7rem', color: '#F0D499', fontWeight: 'bold' }}>CRIMSON VELVET</span>
          </div>
        </div>
      );

    case 'soft-minimal':
      return (
        <div style={{
          height,
          width: '100%',
          background: '#FAF9F6',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 20px',
          boxSizing: 'border-box',
          color: '#333333'
        }}>
          {/* Subtle Blind Embossed Border */}
          <div style={{
            position: 'absolute',
            inset: 14,
            border: '1px solid #E5E0D8',
            borderRadius: '130px 130px 20px 20px'
          }} />

          {/* Top Line Art Icon */}
          <div style={{ textAlign: 'center', zIndex: 2, marginTop: 12 }}>
            <div style={{ fontSize: '1.4rem', color: '#C9A96E', marginBottom: 2 }}>🕊️</div>
            <span style={{ fontSize: '0.65rem', color: '#888', letterSpacing: '3px', textTransform: 'uppercase' }}>
              SOFT MINIMAL ELEGANCE
            </span>
          </div>

          {/* Center Card */}
          <div style={{
            zIndex: 2,
            textAlign: 'center',
            background: '#FFFFFF',
            border: '1px solid #ECE7E1',
            borderRadius: '90px 90px 16px 16px',
            padding: '20px 16px',
            width: '84%',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#999', letterSpacing: 1 }}>SAVE THE DATE</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#2C2417', fontSize: '1.4rem', margin: '4px 0 2px 0' }}>
              يوسف المبارك
            </h4>
            <div style={{ color: '#C9A96E', fontSize: '0.85rem' }}>— & —</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#2C2417', fontSize: '1.4rem', margin: '2px 0 6px 0' }}>
              دانة الشامسي
            </h4>
            <div style={{ height: 1, width: 35, background: '#C9A96E', margin: '6px auto' }} />
            <div style={{ fontSize: '0.7rem', color: '#888' }}>قاعات النعمان الكبرى</div>
          </div>

          {/* Bottom Seal */}
          <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: '#F0ECE6',
              border: '1px solid #D5CEBE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C9A96E',
              fontSize: '0.75rem'
            }}>
              ✧
            </div>
            <span style={{ fontSize: '0.7rem', color: '#888', fontWeight: 'bold' }}>SOFT MINIMAL</span>
          </div>
        </div>
      );

    case 'traditional-arabic':
      return (
        <div style={{
          height,
          width: '100%',
          background: 'linear-gradient(180deg, #F9F7F0 0%, #EFE9D9 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 20px',
          boxSizing: 'border-box',
          color: '#1B5E20'
        }}>
          {/* Islamic Star Corner Ornaments */}
          <div style={{ position: 'absolute', top: 10, left: 10, color: '#1B5E20', fontSize: '1.1rem' }}>۞</div>
          <div style={{ position: 'absolute', top: 10, right: 10, color: '#1B5E20', fontSize: '1.1rem' }}>۞</div>
          <div style={{ position: 'absolute', bottom: 10, left: 10, color: '#1B5E20', fontSize: '1.1rem' }}>۞</div>
          <div style={{ position: 'absolute', bottom: 10, right: 10, color: '#1B5E20', fontSize: '1.1rem' }}>۞</div>

          {/* Arabesque Arch Frame */}
          <div style={{
            position: 'absolute',
            inset: 14,
            border: '2px solid #B8944F',
            borderRadius: '130px 130px 20px 20px'
          }} />

          {/* Top Lantern Header */}
          <div style={{ textAlign: 'center', zIndex: 2, marginTop: 10 }}>
            <div style={{ fontSize: '1.5rem', color: '#B8944F', marginBottom: 2 }}>🏮</div>
            <span style={{ fontSize: '0.65rem', color: '#1B5E20', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
              أصالة وتراث عربي
            </span>
          </div>

          {/* Center Card */}
          <div style={{
            zIndex: 2,
            textAlign: 'center',
            background: '#FFFFFF',
            border: '1.5px solid #1B5E20',
            borderRadius: '90px 90px 16px 16px',
            padding: '20px 16px',
            width: '84%',
            boxShadow: '0 10px 25px rgba(27, 94, 32, 0.12)'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#1B5E20' }}>بارك الله لهما وبارك عليهما</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#1B5E20', fontSize: '1.4rem', margin: '4px 0 2px 0' }}>
              يوسف المبارك
            </h4>
            <div style={{ color: '#B8944F', fontSize: '0.85rem' }}>۞ & ۞</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#1B5E20', fontSize: '1.4rem', margin: '2px 0 6px 0' }}>
              دانة الشامسي
            </h4>
            <div style={{ height: 1.5, width: 40, background: '#B8944F', margin: '6px auto' }} />
            <div style={{ fontSize: '0.7rem', color: '#555' }}>قاعة الأندلس — النعمان</div>
          </div>

          {/* Bottom Seal */}
          <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1B5E20, #0D3813)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#B8944F',
              fontSize: '0.85rem'
            }}>
              ۞
            </div>
            <span style={{ fontSize: '0.7rem', color: '#1B5E20', fontWeight: 'bold' }}>TRADITIONAL ARABIC</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
