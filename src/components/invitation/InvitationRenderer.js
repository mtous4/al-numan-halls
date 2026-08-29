'use client';
import ClassicGold from '@/components/invitation/templates/ClassicGold';
import RoyalLuxury from '@/components/invitation/templates/RoyalLuxury';
import SoftMinimal from '@/components/invitation/templates/SoftMinimal';
import TraditionalArabic from '@/components/invitation/templates/TraditionalArabic';

const TEMPLATE_COMPONENTS = {
  'classic-gold': ClassicGold,
  'royal-luxury': RoyalLuxury,
  'soft-minimal': SoftMinimal,
  'traditional-arabic': TraditionalArabic,
};

export default function InvitationRenderer({ templateId = 'classic-gold', weddingData, slug, isPreview = false }) {
  const Component = TEMPLATE_COMPONENTS[templateId] || ClassicGold;

  return (
    <div className="invitation-renderer" style={{ width: '100%', height: '100%' }}>
      <Component weddingData={weddingData} slug={slug} isPreview={isPreview} />
    </div>
  );
}
