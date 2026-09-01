'use client';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function EventsLandingPage() {
  return (
    <>
      <Header />
      <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: '#FAFAF7', color: '#2C2417', direction: 'rtl' }}>

        {/* Hero Section */}
        <section style={{
          position: 'relative',
          padding: 'var(--space-16) var(--space-6)',
          backgroundImage: 'linear-gradient(180deg, rgba(20,18,15,0.7) 0%, rgba(20,18,15,0.92) 100%), url(/images/gallery/couple-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          color: '#FFFFFF'
        }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <span style={{ fontSize: '0.85rem', color: '#D4AF37', letterSpacing: '4px', textTransform: 'uppercase', display: 'block', marginBottom: 'var(--space-3)' }}>
              EXCLUSIVE EVENT ALBUM PLATFORM
            </span>

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: '#FFFFFF',
              lineHeight: 1.25,
              marginBottom: 'var(--space-4)'
            }}>
              ألبوم صور الحفل التفاعلي عبر رمز QR موحد
            </h1>

            <p style={{
              fontSize: '1.15rem',
              lineHeight: 1.8,
              color: '#E8DECC',
              marginBottom: 'var(--space-8)',
              maxWidth: 680,
              margin: '0 auto var(--space-8)'
            }}>
              منصة أنيقة بأسلوب الأعراس تتيح لك جمع كافة لحظات وصور ضيوفك في ألبوم جماعي فخم بمسحة QR Code واحدة — بدون الحاجة لأي تطبيق أو تسجيل حساب للضيوف!
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <Link href="/dashboard/events" className="btn btn-primary" style={{ padding: '0.85rem 2.2rem', fontSize: '1.05rem', borderRadius: '30px' }}>
                📸 إنشاء ألبوم لحفلك الآن
              </Link>
              <Link href="/album/NUMAN-2027" className="btn btn-secondary" style={{ padding: '0.85rem 2.2rem', fontSize: '1.05rem', borderRadius: '30px', borderColor: '#D4AF37', color: '#D4AF37' }}>
                👁️ تجربة استوديو الضيف الحي
              </Link>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section style={{ padding: 'var(--space-16) var(--space-6)', background: '#FFFFFF' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">طريقة العمل السلسة</span>
              <h2 className="section-title">كيف يعمل ألبوم الفعالية لضيوفك؟</h2>
              <div className="gold-divider" />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-8)',
              marginTop: 'var(--space-8)'
            }}>

              {/* Step 1 */}
              <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center', border: '1px solid #EBE5DB' }}>
                <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'var(--cream)', color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto var(--space-4)' }}>
                  📲
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-dark)', marginBottom: 'var(--space-2)' }}>
                  1. مسح رمز الـ QR
                </h3>
                <p style={{ color: 'var(--warm-gray-600)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  يطبع المنظم رمز الـ QR على بطاقات الطاولات أو الدعوة، فيمسحه الضيف بكاميرا هاتفه فوراً بدون الحاجة لتحميل أي برنامج.
                </p>
              </div>

              {/* Step 2 */}
              <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center', border: '1px solid #EBE5DB' }}>
                <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'var(--cream)', color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto var(--space-4)' }}>
                  🎨
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-dark)', marginBottom: 'var(--space-2)' }}>
                  2. التقاط وفلاتر وإطارات
                </h3>
                <p style={{ color: 'var(--warm-gray-600)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  تفتح الكاميرا للضيف مع فلاتر أعراس ملكية (عتيق، أبيض وأسود، غروب، بريق ذهبي)، مع إمكانية كتابة تهنئة لتُطبع داخل إطار فاخر.
                </p>
              </div>

              {/* Step 3 */}
              <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center', border: '1px solid #EBE5DB' }}>
                <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'var(--cream)', color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto var(--space-4)' }}>
                  📥
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-dark)', marginBottom: 'var(--space-2)' }}>
                  3. ألبوم حي وتحميل كامل
                </h3>
                <p style={{ color: 'var(--warm-gray-600)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  تتجمع الصور فوراً في معرض حي مشترك، ويستطيع العريس أو المنظم تحميل كافة صور الحفل بضغطة زر واحدة.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section style={{ padding: 'var(--space-16) var(--space-6)', background: '#FAFAF7' }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="card" style={{ padding: 'var(--space-10) var(--space-8)', border: '2px solid #C9A96E', boxShadow: '0 15px 40px rgba(0,0,0,0.04)' }}>
              <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#B8944F', margin: '0 0 var(--space-2) 0' }}>
                  ميزات ألبوم قاعات النعمان الحصري
                </h3>
                <p style={{ color: '#888' }}>كل ما تحتاجه لتوثيق ليلة العمر بعدسات جميع الحاضرين</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-6)' }}>
                {[
                  { title: 'بدون حسابات للضيوف', desc: 'تجربة فورية وسريعة بدون إدخال بريد أو كلمات مرور.' },
                  { title: 'تحكم بالخصوصية', desc: 'اختر بين ألبوم عام يراه الجميع، أو خاص بك وحدك.' },
                  { title: 'إطار ذهبي يحمل اسم الحفل', desc: 'كل صورة يتم ختمها بإطار كريمي ذهبي وشعار المناسبة.' },
                  { title: 'فلاتر سينمائية للأعراس', desc: 'مؤثرات إضاءة متطورة مصممة خصيصاً لأجواء صالات الأفراح.' },
                  { title: 'حماية وتحديد لعدد الصور', desc: 'تحديد الحد الأقصى لكل ضيف لمنع التكرار وحفظ الجودة.' },
                  { title: 'تحميل فوري بضغطة زر', desc: 'تنزيل الألبوم بالكامل بجودته العالية للاحتفاظ به مدى الحياة.' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                    <span style={{ color: '#B8944F', fontSize: '1.2rem', lineHeight: 1 }}>✦</span>
                    <div>
                      <strong style={{ display: 'block', color: '#2C2417', marginBottom: 2 }}>{item.title}</strong>
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid #EBE5DB' }}>
                <Link href="/dashboard/events" className="btn btn-primary" style={{ padding: '0.8rem 2.5rem', borderRadius: '25px' }}>
                  ابدأ إنشاء ألبومك الآن ✨
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
