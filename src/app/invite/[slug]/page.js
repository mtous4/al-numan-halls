'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getInvitationBySlug, initializeData } from '@/lib/data';
import InvitationRenderer from '@/components/invitation/InvitationRenderer';
import Link from 'next/link';

export default function PublicInvitePage() {
  const params = useParams();
  const slug = params?.slug;
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeData();
    if (slug) {
      const inv = getInvitationBySlug(slug);
      setInvitation(inv);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAF7' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!invitation) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAFAF7',
        textAlign: 'center',
        padding: 'var(--space-6)',
        direction: 'rtl'
      }}>
        <img src="/images/logo.png" alt="قاعات النعمان" style={{ height: 60, marginBottom: 'var(--space-6)' }} />
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark-brown)', marginBottom: 'var(--space-2)' }}>
          عذراً، لم يتم العثور على الدعوة
        </h2>
        <p style={{ color: 'var(--warm-gray-600)', maxWidth: 400, marginBottom: 'var(--space-6)' }}>
          قد تكون هذه الدعوة غير منشورة بعد، أو أن الرابط المستخدم غير صحيح.
        </p>
        <Link href="/" className="btn btn-primary">
          العودة للرئيسية — قاعات النعمان
        </Link>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', maxWidth: 640, margin: '0 auto', boxShadow: '0 0 30px rgba(0,0,0,0.08)' }}>
      <InvitationRenderer
        templateId={invitation.templateId}
        weddingData={invitation.weddingData}
        slug={invitation.slug}
        isPreview={false}
      />
    </main>
  );
}
