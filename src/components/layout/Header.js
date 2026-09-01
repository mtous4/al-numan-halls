'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
  { label: 'الرئيسية', href: '/' },
  { label: 'القاعات', href: '/halls' },
  { label: 'الخدمات', href: '/services' },
  { label: 'معرض الصور', href: '/gallery' },
  { label: 'الدعوات الإلكترونية', href: '/invitations' },
  { label: 'ألبوم الفعاليات 📸', href: '/events' },
  { label: 'من نحن', href: '/about' },
  { label: 'تواصل معنا', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <Link href="/">
            <img src="/images/logo.png" alt="قاعات النعمان" className="header-logo" />
          </Link>

          <nav>
            <ul className="header-nav">
              {NAV_ITEMS.map(item => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                {isAuthenticated ? (
                  <Link
                    href={isAdmin ? '/admin' : '/dashboard'}
                    className="btn btn-primary btn-sm"
                  >
                    {isAdmin ? 'لوحة التحكم' : 'حسابي'}
                  </Link>
                ) : (
                  <Link href="/login" className="btn btn-primary btn-sm">
                    تسجيل الدخول
                  </Link>
                )}
              </li>
            </ul>
          </nav>

          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} aria-label="فتح القائمة">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <img src="/images/logo.png" alt="قاعات النعمان" style={{ height: 40 }} />
          <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--dark-brown)' }}>✕</button>
        </div>
        <ul className="mobile-nav-links">
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</Link>
            </li>
          ))}
          <li style={{ marginTop: 'var(--space-4)' }}>
            {isAuthenticated ? (
              <>
                <Link href={isAdmin ? '/admin' : '/dashboard'} onClick={() => setMobileOpen(false)} className="btn btn-primary" style={{ width: '100%', marginBottom: 'var(--space-2)' }}>
                  {isAdmin ? 'لوحة التحكم' : 'حسابي'}
                </Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="btn btn-secondary" style={{ width: '100%' }}>
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="btn btn-primary" style={{ width: '100%' }}>
                تسجيل الدخول
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
