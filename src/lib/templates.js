// Template Registry - Defines all available invitation templates

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
    id: 'emerald-botanica',
    name: 'الزمرد والأوراق النباتية',
    nameEn: 'Emerald Botanica',
    category: 'طبيعي',
    description: 'تصميم أوراق الطبيعة الخضراء والزمرد الفاخر بلمسات ذهبية عصرية',
    colors: {
      primary: '#1B4D3E',
      secondary: '#EDF4F0',
      accent: '#C9A96E',
      text: '#1B3B30',
      bg: '#F6F9F7',
    },
    previewImage: '/images/gallery/gallery-7.jpg',
    sections: ['cover', 'couple', 'family', 'date', 'countdown', 'schedule', 'gallery', 'location', 'rsvp', 'messages', 'qrcode'],
    active: true,
  },
  {
    id: 'blush-romance',
    name: 'الوردي الرومانسي',
    nameEn: 'Blush Romance',
    category: 'رومانسي',
    description: 'أجواء الورد والوردي الباستيل الرقيق مع لمسات من الذهب والشموع',
    colors: {
      primary: '#B35467',
      secondary: '#FFF0F3',
      accent: '#C9A96E',
      text: '#3B242B',
      bg: '#FFF9FA',
    },
    previewImage: '/images/gallery/gallery-5.jpg',
    sections: ['cover', 'couple', 'family', 'date', 'countdown', 'schedule', 'gallery', 'location', 'rsvp', 'messages', 'qrcode'],
    active: true,
  },
  {
    id: 'midnight-royale',
    name: 'الكحلي والذهب الملكي',
    nameEn: 'Midnight Royale',
    category: 'فاخر',
    description: 'سماء كحلية ملكية مرصعة بالنجوم مع أطر وتفاصيل ذهبية براقة',
    colors: {
      primary: '#D4AF37',
      secondary: '#141E30',
      accent: '#F3E5AB',
      text: '#E0E6ED',
      bg: '#0B1320',
    },
    previewImage: '/images/gallery/gallery-6.jpg',
    sections: ['cover', 'couple', 'family', 'date', 'countdown', 'schedule', 'gallery', 'location', 'rsvp', 'messages', 'qrcode'],
    active: true,
  },
  {
    id: 'crimson-velvet',
    name: 'العقيق الخمري الفاخر',
    nameEn: 'Crimson Velvet',
    category: 'فاخر',
    description: 'فخامة اللون الخمري الملكي والكرز المخملي مع الأختام والزخارف الذهبية',
    colors: {
      primary: '#540D1D',
      secondary: '#FCF8F5',
      accent: '#C9A96E',
      text: '#380B14',
      bg: '#FCF8F5',
    },
    previewImage: '/images/gallery/gallery-2.jpg',
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
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
}

export function getTemplateCategories() {
  const cats = [...new Set(TEMPLATES.filter(t => t.active).map(t => t.category))];
  return ['الكل', ...cats];
}
