'use client';
import ClassicGold from '@/components/invitation/templates/ClassicGold';
import RoyalLuxury from '@/components/invitation/templates/RoyalLuxury';
import EmeraldBotanica from '@/components/invitation/templates/EmeraldBotanica';
import BlushRomance from '@/components/invitation/templates/BlushRomance';
import MidnightRoyale from '@/components/invitation/templates/MidnightRoyale';
import CrimsonVelvet from '@/components/invitation/templates/CrimsonVelvet';
import SoftMinimal from '@/components/invitation/templates/SoftMinimal';
import TraditionalArabic from '@/components/invitation/templates/TraditionalArabic';

const TEMPLATE_COMPONENTS = {
  'classic-gold': ClassicGold,
  'royal-luxury': RoyalLuxury,
  'emerald-botanica': EmeraldBotanica,
  'blush-romance': BlushRomance,
  'midnight-royale': MidnightRoyale,
  'crimson-velvet': CrimsonVelvet,
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
