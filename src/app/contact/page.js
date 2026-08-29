'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';

function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    hall: 'قاعة الملكية',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <div className="page-banner">
        <div className="container">
          <h1>تواصل معنا</h1>
          <p>يسعدنا استقبال استفساراتكم وحجوزاتكم لمساعدتكم في التخطيط لليلتكم المميزة</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
            {/* Form */}
            <div style={{ flex: '1 1 500px' }}>
              <div className="card" style={{ padding: 'var(--space-8)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                  احجز موعد أو استفسر عن الأسعار
                </h2>
                <p style={{ color: 'var(--warm-gray-600)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
                  يرجى تعبئة النموذج وسيقوم فريق المبيعات بالتواصل معكم في أقرب وقت.
                </p>

                {submitted ? (
                  <div style={{ background: '#E8F5E9', border: '1px solid #C8E6C9', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', color: 'var(--success)' }}>✓</div>
                    <h3 style={{ color: 'var(--success)', margin: 'var(--space-2) 0' }}>تم استلام طلبكم بنجاح</h3>
                    <p style={{ color: 'var(--warm-gray-700)', fontSize: 'var(--text-sm)' }}>
                      شكراً لتواصلكم مع قاعات النعمان. سنتواصل معكم عبر الهاتف خلال ساعات العمل الرسمية.
                    </p>
                    <button className="btn btn-secondary btn-sm" onClick={() => setSubmitted(false)} style={{ marginTop: 'var(--space-4)' }}>
                      إرسال رسالة أخرى
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-2" style={{ gap: 'var(--space-4)' }}>
                      <div className="form-group">
                        <label className="form-label">الاسم الكامل *</label>
                        <input
                          type="text"
                          required
                          className="form-input"
                          placeholder="مثال: أحمد محمد"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">رقم الهاتف / واتساب *</label>
                        <input
                          type="tel"
                          required
                          className="form-input"
                          placeholder="079XXXXXXX"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-2" style={{ gap: 'var(--space-4)' }}>
                      <div className="form-group">
                        <label className="form-label">البريد الإلكتروني</label>
                        <input
                          type="email"
                          className="form-input"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">تاريخ الحفل المتوقع</label>
                        <input
                          type="date"
                          className="form-input"
                          value={formData.eventDate}
                          onChange={e => setFormData({ ...formData, eventDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">القاعة المفضلة</label>
                      <select
                        className="form-input form-select"
                        value={formData.hall}
                        onChange={e => setFormData({ ...formData, hall: e.target.value })}
                      >
                        <option value="قاعة الملكية">قاعة الملكية (حتى 500 ضيف)</option>
                        <option value="قاعة الأندلس">قاعة الأندلس (حتى 300 ضيف)</option>
                        <option value="قاعة الفخامة">قاعة الفخامة (حتى 200 ضيف)</option>
                        <option value="غير محدد بعد">غير محدد بعد (استشارة عامة)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">ملاحظات أو استفسارات إضافية</label>
                      <textarea
                        className="form-input"
                        placeholder="أخبرنا عن أي تفاصيل خاصة ترغب بها في حفل زفافك..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                      إرسال الطلب
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Direct Contact Details */}
            <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div className="card" style={{ padding: 'var(--space-6)', background: 'var(--white)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)', color: 'var(--gold-dark)' }}>
                  معلومات الاتصال المباشر
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                    <div style={{ fontSize: '1.4rem' }}>👤</div>
                    <div>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--warm-gray-500)', display: 'block' }}>مدير القاعات:</span>
                      <strong style={{ color: 'var(--dark-brown)' }}>أيمن القيسي (Ayman Alqaisi)</strong>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                    <div style={{ fontSize: '1.4rem' }}>📱</div>
                    <div>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--warm-gray-500)', display: 'block' }}>الهاتف المحمول / واتساب:</span>
                      <a href="tel:0799523360" style={{ fontWeight: 'bold' }}>0799523360</a>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                    <div style={{ fontSize: '1.4rem' }}>☎️</div>
                    <div>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--warm-gray-500)', display: 'block' }}>الهاتف الأرضي:</span>
                      <a href="tel:0655448969" style={{ fontWeight: 'bold' }}>0655448969 / 065548988</a>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                    <div style={{ fontSize: '1.4rem' }}>✉️</div>
                    <div>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--warm-gray-500)', display: 'block' }}>البريد الإلكتروني:</span>
                      <a href="mailto:info@numanhalls.net">info@numanhalls.net</a>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                    <div style={{ fontSize: '1.4rem' }}>📍</div>
                    <div>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--warm-gray-500)', display: 'block' }}>العنوان:</span>
                      <span style={{ color: 'var(--dark-brown)' }}>عمّان - شارع الجاردنز - دوار الواحة - مجمع النعمان</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: 'var(--space-6)', background: 'var(--cream)' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-2)' }}>ساعات العمل واستقبال الزيارات</h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--warm-gray-700)', margin: '0 0 var(--space-2) 0' }}>
                  يومياً من الساعة <strong>10:00 صباحاً</strong> وحتى <strong>10:00 مساءً</strong>
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--warm-gray-500)', margin: 0 }}>
                  نرحب بكم لمعاينة القاعات واختيار الأنسب لزفافكم برفقة مستشاري الحفلات لدينا.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default function ContactPage() {
  return (
    <AuthProvider>
      <ContactContent />
    </AuthProvider>
  );
}
