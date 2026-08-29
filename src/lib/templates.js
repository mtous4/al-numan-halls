// Template Registry - Defines available invitation templates

export const TEMPLATES = [
  {
    id: 'classic-gold',
    name: 'كلاسيكي ذهبي',
    nameEn: 'Classic Gold',
    category: 'كلاسيكي',
    description: 'تصميم كلاسيكي أنيق بألوان الذهب والأبيض مع زخارف عربية تقليدية',
    colors: {
      primary: '#B8944F',
      secondary: '#F5F0E8',
      accent: '#8B7340',
      text: '#2C2417',
      bg: '#FAFAF7',
    },
    previewImage: '/images/templates/classic-gold.jpg',
    sections: ['cover', 'couple', 'family', 'date', 'countdown', 'schedule', 'gallery', 'location', 'rsvp', 'messages', 'qrcode'],
    active: true,
  },
  {
    id: 'royal-luxury',
    name: 'الفخامة الملكية',
    nameEn: 'Royal Luxury',
    category: 'فاخر',
    description: 'تصميم ملكي فاخر بألوان داكنة وذهبية مع لمسات ديكور عصرية',
    colors: {
      primary: '#D4AF37',
      secondary: '#1A1A2E',
      accent: '#E8D5A3',
      text: '#F5F0E8',
      bg: '#0F0F1A',
    },
    previewImage: '/images/templates/royal-luxury.jpg',
    sections: ['cover', 'couple', 'family', 'date', 'countdown', 'schedule', 'gallery', 'location', 'rsvp', 'messages', 'qrcode'],
    active: true,
  },
  {
    id: 'soft-minimal',
    name: 'الأناقة الناعمة',
    nameEn: 'Soft Minimal',
    category: 'ناعم',
    description: 'تصميم بسيط وأنيق بألوان ناعمة وخطوط نظيفة',
    colors: {
      primary: '#C9A96E',
      secondary: '#FFFFFF',
      accent: '#E8D5A3',
      text: '#4A4A4A',
      bg: '#FFFFFF',
    },
    previewImage: '/images/templates/soft-minimal.jpg',
    sections: ['cover', 'couple', 'date', 'countdown', 'gallery', 'location', 'rsvp', 'messages', 'qrcode'],
    active: true,
  },
  {
    id: 'traditional-arabic',
    name: 'تراثي عربي',
    nameEn: 'Traditional Arabic',
    category: 'عربي',
    description: 'تصميم تراثي بزخارف إسلامية وألوان الزمرد والذهب',
    colors: {
      primary: '#1B5E20',
      secondary: '#F5F0E8',
      accent: '#B8944F',
      text: '#2C2417',
      bg: '#FAFAF7',
    },
    previewImage: '/images/templates/traditional-arabic.jpg',
    sections: ['cover', 'couple', 'family', 'date', 'countdown', 'schedule', 'gallery', 'location', 'rsvp', 'messages', 'qrcode'],
    active: true,
  },
];

export function getTemplates() {
  return TEMPLATES.filter(t => t.active);
}

export function getTemplateById(id) {
  return TEMPLATES.find(t => t.id === id);
}

export function getTemplateCategories() {
  const cats = [...new Set(TEMPLATES.filter(t => t.active).map(t => t.category))];
  return ['الكل', ...cats];
}
