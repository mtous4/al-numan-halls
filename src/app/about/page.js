'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';

function AboutContent() {
  return (
    <>
      <Header />
      <div className="page-banner">
        <div className="container">
          <h1>من نحن</h1>
          <p>ريادة في عالم الأفراح والمناسبات الفاخرة في المملكة الأردنية الهاشمية</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ maxWidth: 850, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-4)' }}>قصة قاعات النعمان</h2>
            <div className="gold-separator">
              <span className="gold-separator-icon">✦</span>
            </div>
            <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.9, color: 'var(--warm-gray-700)', marginBottom: 'var(--space-6)' }}>
              تأسست <strong>قاعات النعمان</strong> لتكون الوجهة الأولى لكل من ينشد التميز والفخامة في حفلات الزفاف والمناسبات الكبرى. انطلقنا من رؤية واضحة تهدف إلى الجمع بين كرم الضيافة العربية الأصيلة وأحدث المعايير الهندسية والتقنية في تصميم القاعات وصناعة الفرح.
            </p>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, color: 'var(--warm-gray-600)', marginBottom: 'var(--space-10)' }}>
              نفخر بتقديم خدمات متكاملة تشمل القاعات الرحبة، الديكورات الملكية، أنظمة الإضاءة والصوتيات الذكية، بالإضافة إلى منصتنا الرقمية الحديثة التي تتيح لعملائنا تصميم ومشاركة دعوات زفاف إلكترونية تليق بمناسبتهم السعيدة.
            </p>
          </div>

          <div className="grid grid-3" style={{ marginTop: 'var(--space-8)' }}>
            <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center', background: 'var(--off-white)', border: '1px solid var(--warm-gray-200)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>👑</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>رؤيتنا</h3>
              <p style={{ color: 'var(--warm-gray-600)', fontSize: 'var(--text-sm)', lineHeight: 1.7, margin: 0 }}>
                أن نكون الخيار الأول والأكثر موثوقية لكل عروسين يبحثان عن تجربة زفاف استثنائية تفوق التوقعات.
              </p>
            </div>
            <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center', background: 'var(--off-white)', border: '1px solid var(--warm-gray-200)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>💎</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>قيمنا</h3>
              <p style={{ color: 'var(--warm-gray-600)', fontSize: 'var(--text-sm)', lineHeight: 1.7, margin: 0 }}>
                الفخامة، الاهتمام بأدق التفاصيل، الالتزام بالمواعيد، والحرص على راحة وسعادة ضيوفنا الكرام.
              </p>
            </div>
            <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center', background: 'var(--off-white)', border: '1px solid var(--warm-gray-200)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>🌟</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>فريقنا</h3>
              <p style={{ color: 'var(--warm-gray-600)', fontSize: 'var(--text-sm)', lineHeight: 1.7, margin: 0 }}>
                نخبة من خبراء تنظيم الحفلات والضيافة وهندسة الصوت والإضاءة المكرسين لخدمتكم على مدار الساعة.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default function AboutPage() {
  return (
    <AuthProvider>
      <AboutContent />
    </AuthProvider>
  );
}
