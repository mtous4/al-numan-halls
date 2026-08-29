import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/images/logo.png" alt="قاعات النعمان" style={{ height: 60, filter: 'brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(15deg) brightness(0.85)', marginBottom: 'var(--space-2)' }} />
            <p>
              قاعات النعمان — تجربة أعراس فاخرة تليق بأجمل مناسباتكم.
              نقدّم لكم قاعات بمواصفات عالمية وخدمات متكاملة لتكون ليلة العمر استثنائية.
            </p>
          </div>

          <div>
            <h4 className="footer-title">روابط سريعة</h4>
            <ul className="footer-links">
              <li><Link href="/halls">القاعات</Link></li>
              <li><Link href="/services">الخدمات</Link></li>
              <li><Link href="/gallery">معرض الصور</Link></li>
              <li><Link href="/invitations">الدعوات الإلكترونية</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">المزيد</h4>
            <ul className="footer-links">
              <li><Link href="/about">من نحن</Link></li>
              <li><Link href="/contact">تواصل معنا</Link></li>
              <li><Link href="/login">تسجيل الدخول</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">تواصل معنا</h4>
            <ul className="footer-links">
              <li>📞 0799523360</li>
              <li>📞 0655448969</li>
              <li>✉️ info@numanhalls.net</li>
              <li>📍 عمّان، الأردن</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} قاعات النعمان — جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
