'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/AuthContext';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(username, password);
      if (result.success) {
        if (result.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src="/images/logo.png" alt="قاعات النعمان" />
        <h2>تسجيل الدخول</h2>
        <p className="text-muted">ادخل إلى حسابك في قاعات النعمان</p>

        <form onSubmit={handleSubmit} style={{ textAlign: 'right' }}>
          {error && (
            <div style={{
              background: '#FFEBEE',
              color: 'var(--error)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
            }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">اسم المستخدم</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="أدخل اسم المستخدم"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">كلمة المرور</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: 'var(--space-4)' }}
            disabled={loading}
          >
            {loading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-4)', background: 'var(--off-white)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--warm-gray-500)', textAlign: 'center' }}>
          <p style={{ margin: '0 0 var(--space-1)', fontWeight: 'var(--fw-medium)', color: 'var(--dark-brown)' }}>حسابات تجريبية:</p>
          <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.78rem', color: 'var(--gold-dark)', fontWeight: '500' }}>
            (اليسار: اسم المستخدم / اليمين: كلمة المرور)
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'center' }}>
            <div
              onClick={() => { setUsername('admin'); setPassword('admin123'); }}
              style={{
                cursor: 'pointer',
                padding: '6px 10px',
                background: '#FFFFFF',
                borderRadius: '6px',
                border: '1px solid #EBE5DB',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.85rem'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#EBE5DB'}
              title="اضغط للتعبئة التلقائية"
            >
              <span style={{ fontWeight: 'bold', color: 'var(--dark-brown)' }}>مدير:</span>
              <code style={{ direction: 'ltr', color: 'var(--gold-dark)', fontWeight: 'bold' }}>admin / admin123</code>
            </div>
            <div
              onClick={() => { setUsername('ahmed2026'); setPassword('ahmed123'); }}
              style={{
                cursor: 'pointer',
                padding: '6px 10px',
                background: '#FFFFFF',
                borderRadius: '6px',
                border: '1px solid #EBE5DB',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.85rem'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#EBE5DB'}
              title="اضغط للتعبئة التلقائية"
            >
              <span style={{ fontWeight: 'bold', color: 'var(--dark-brown)' }}>عميل:</span>
              <code style={{ direction: 'ltr', color: 'var(--gold-dark)', fontWeight: 'bold' }}>ahmed2026 / ahmed123</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}
