// Data Access Layer - localStorage-based persistence
// Seeds demo data on first run

const STORAGE_KEYS = {
  USERS: 'alnuman_users',
  INVITATIONS: 'alnuman_invitations',
  RSVP: 'alnuman_rsvp',
  HALLS: 'alnuman_halls',
  SERVICES: 'alnuman_services',
  INITIALIZED_V2: 'alnuman_initialized_v2',
};

// ========== Seed Data ==========
const SEED_USERS = [
  {
    id: 'admin_001',
    name: 'مدير النظام',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    phone: '0799523360',
    enabled: true,
    createdAt: '2026-01-01',
  },
  {
    id: 'cust_001',
    name: 'أحمد محمد العمري',
    username: 'ahmed2026',
    password: 'ahmed123',
    role: 'customer',
    phone: '0791234567',
    enabled: true,
    createdAt: '2026-08-01',
    invitationId: 'inv_001',
  },
  {
    id: 'cust_002',
    name: 'خالد سعيد الحسني',
    username: 'khaled2026',
    password: 'khaled123',
    role: 'customer',
    phone: '0799876543',
    enabled: true,
    createdAt: '2026-08-10',
    invitationId: 'inv_002',
  },
];

const SEED_INVITATIONS = [
  {
    id: 'inv_001',
    customerId: 'cust_001',
    templateId: 'classic-gold',
    slug: 'ahmed-fatima-2026',
    status: 'published',
    publishedAt: '2026-08-20T10:00:00',
    createdAt: '2026-08-01',
    updatedAt: '2026-08-20',
    weddingData: {
      groomName: 'يوسف',
      groomFullName: 'يوسف بن إبراهيم',
      brideName: 'دانة',
      brideFullName: 'دانة بنت خليفة',
      groomFather: 'إبراهيم الحمادي',
      groomMother: 'موزة المرزوقي',
      brideFather: 'خليفة الشامسي',
      brideMother: 'عائشة النعيمي',
      weddingDate: '2027-04-17',
      weddingTime: '19:30',
      venue: 'قاعة الملكية - قاعات النعمان',
      venueAddress: 'عمّان - شارع الجاردنز - دوار الواحة',
      mapUrl: 'https://maps.google.com/?q=31.9539,35.9106',
      invitationMessage: 'يتشرف يوسف ودانة بدعوتكم لحضور حفل زفافهما، ليكتمل فرحنا بحضوركم الكريم.',
      photos: [
        '/images/gallery/couple-1.jpg',
        '/images/halls/hall-royal.jpg',
        '/images/halls/hall-andalus.jpg',
        '/images/halls/hall-elegance.jpg'
      ],
      schedule: [
        { name: 'استقبال الضيوف', time: '17:30' },
        { name: 'بدء الحفل', time: '18:30' },
        { name: 'نخب وقطع الكعكة', time: '18:45' },
        { name: 'العشاء الرئيسي', time: '19:00' },
        { name: 'ختام الحفل', time: '21:00' },
      ],
    },
  },
  {
    id: 'inv_002',
    customerId: 'cust_002',
    templateId: 'soft-minimal',
    slug: '',
    status: 'draft',
    publishedAt: null,
    createdAt: '2026-08-10',
    updatedAt: '2026-08-15',
    weddingData: {
      groomName: 'سلطان',
      groomFullName: 'سلطان بن فيصل',
      brideName: 'شمس',
      brideFullName: 'شمس بنت عبدالله',
      groomFather: 'فيصل القحطاني',
      groomMother: 'منيرة الدوسري',
      brideFather: 'عبدالله الشمري',
      brideMother: 'لطيفة العتيبي',
      weddingDate: '2027-05-14',
      weddingTime: '19:30',
      venue: 'قاعة الأندلس - قاعات النعمان',
      venueAddress: 'عمّان، شارع الملكة رانيا',
      mapUrl: 'https://maps.google.com/?q=31.9539,35.9106',
      invitationMessage: 'يتشرف سلطان وشمس بدعوتكم لمشاركتهما فرحة زفافهما في أمسية مشرقة تكتمل بحضوركم الكريم.',
      photos: [
        '/images/gallery/couple-1.jpg',
        '/images/halls/hall-andalus.jpg',
        '/images/halls/hall-royal.jpg'
      ],
      schedule: [
        { name: 'استقبال الضيوف', time: '17:30' },
        { name: 'بدء الحفل', time: '18:30' },
        { name: 'نخب وقطع الكعكة', time: '18:45' },
        { name: 'العشاء الرئيسي', time: '19:00' },
        { name: 'ختام الحفل', time: '21:00' },
      ],
    },
  },
];

const SEED_RSVP = [
  {
    id: 'rsvp_001',
    invitationSlug: 'ahmed-fatima-2026',
    guestName: 'محمد الأحمد',
    attending: true,
    message: 'ألف ألف مبروك للعروسين، بارك الله لكما وجمع بينكما في خير.',
    submittedAt: '2026-08-22T14:30:00',
  },
  {
    id: 'rsvp_002',
    invitationSlug: 'ahmed-fatima-2026',
    guestName: 'سارة القاسم',
    attending: true,
    message: 'مبارك الزفاف السعيد وبالرفاه والبنين إن شاء الله!',
    submittedAt: '2026-08-23T09:15:00',
  },
  {
    id: 'rsvp_003',
    invitationSlug: 'ahmed-fatima-2026',
    guestName: 'عمر الخطيب',
    attending: true,
    message: 'أجمل التهاني والتبريكات بمناسبة الزفاف الميمون.',
    submittedAt: '2026-08-24T18:00:00',
  },
  {
    id: 'rsvp_004',
    invitationSlug: 'ahmed-fatima-2026',
    guestName: 'ياسمين الحاج',
    attending: true,
    message: 'فرحتنا لا توصف بكم! تمنياتنا لكم بحياة ملؤها السعادة والتوفيق.',
    submittedAt: '2026-08-25T11:45:00',
  },
];

const SEED_HALLS = [
  {
    id: 'hall_001',
    name: 'قاعة الملكية',
    nameEn: 'The Royal Hall',
    image: '/images/halls/hall-royal.jpg',
    gallery: ['/images/halls/hall-royal.jpg'],
    description: 'قاعة الملكية هي أكبر قاعاتنا وأكثرها فخامة. بسقفها المزخرف بالذهب وثرياتها الكريستالية الضخمة، تمنحكم تجربة ملكية لا تُنسى في ليلة العمر.',
    capacity: 500,
    area: '800 م²',
    features: ['ثريات كريستالية', 'نظام صوت متطور', 'إضاءة ذكية', 'مسرح فاخر', 'غرفة عروس خاصة', 'مواقف سيارات VIP'],
    services: ['تنسيق الزهور', 'الضيافة والكوشة', 'التصوير الفوتوغرافي', 'DJ ومنسق حفلات'],
    priceRange: 'تبدأ من 3000 دينار',
    active: true,
  },
  {
    id: 'hall_002',
    name: 'قاعة الأندلس',
    nameEn: 'Al Andalus Hall',
    image: '/images/halls/hall-andalus.jpg',
    gallery: ['/images/halls/hall-andalus.jpg'],
    description: 'تجمع قاعة الأندلس بين الأصالة العربية والعصرية الحديثة. بنوافذها الكبيرة وإطلالتها على الحدائق، توفر أجواءً رومانسية فريدة مع لمسات من الفن الإسلامي.',
    capacity: 300,
    area: '500 م²',
    features: ['تصميم أندلسي عصري', 'إطلالة على الحدائق', 'نوافذ بانورامية', 'إضاءة طبيعية', 'غرفة تحضيرات', 'حديقة خارجية'],
    services: ['تنسيق الزهور', 'الضيافة', 'خدمة الكوشة', 'إضاءة ليزر'],
    priceRange: 'تبدأ من 2000 دينار',
    active: true,
  },
  {
    id: 'hall_003',
    name: 'قاعة الفخامة',
    nameEn: 'The Elegance Hall',
    image: '/images/halls/hall-elegance.jpg',
    gallery: ['/images/halls/hall-elegance.jpg'],
    description: 'لمن يبحث عن الخصوصية والدفء، قاعة الفخامة تقدّم تجربة حميمية راقية. بديكورها الكلاسيكي الدافئ وإضاءتها الرومانسية، ستكون ليلتكم استثنائية.',
    capacity: 200,
    area: '350 م²',
    features: ['ديكور كلاسيكي دافئ', 'إضاءة رومانسية', 'كوشة مميزة', 'أجواء حميمية', 'شاشة عرض كبيرة', 'غرفة VIP'],
    services: ['تنسيق الزهور الفاخر', 'الضيافة المتكاملة', 'كوشة فاخرة', 'منسق حفل'],
    priceRange: 'تبدأ من 1500 دينار',
    active: true,
  },
];

const SEED_SERVICES = [
  {
    id: 'svc_001',
    name: 'تنسيق الزهور',
    icon: '🌸',
    description: 'تصاميم زهور فاخرة من أجود الأنواع لتزيين قاعتكم وكوشتكم بأجمل التنسيقات.',
  },
  {
    id: 'svc_002',
    name: 'التصوير والفيديو',
    icon: '📸',
    description: 'فريق تصوير محترف لتوثيق أجمل لحظاتكم بأحدث المعدات والتقنيات.',
  },
  {
    id: 'svc_003',
    name: 'الضيافة والطعام',
    icon: '🍽️',
    description: 'قوائم طعام متنوعة من المطبخ العربي والعالمي، مع خدمة ضيافة راقية.',
  },
  {
    id: 'svc_004',
    name: 'الدعوات الإلكترونية',
    icon: '💌',
    description: 'صمّم دعوة زفافك الإلكترونية بقوالب فاخرة وشاركها مع ضيوفك بسهولة.',
  },
  {
    id: 'svc_005',
    name: 'الكوشة والديكور',
    icon: '✨',
    description: 'تصاميم كوشات فاخرة وديكورات مبتكرة تناسب ذوقكم وتليق بليلة العمر.',
  },
  {
    id: 'svc_006',
    name: 'الموسيقى والإنارة',
    icon: '🎵',
    description: 'أنظمة صوت وإنارة متطورة مع DJ محترف لإضفاء أجواء مميزة على حفلكم.',
  },
];

// ========== Initialize Data ==========
export function initializeData() {
  if (typeof window === 'undefined') return;

  const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED_V2);
  if (initialized) return;

  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
  localStorage.setItem(STORAGE_KEYS.INVITATIONS, JSON.stringify(SEED_INVITATIONS));
  localStorage.setItem(STORAGE_KEYS.RSVP, JSON.stringify(SEED_RSVP));
  localStorage.setItem(STORAGE_KEYS.HALLS, JSON.stringify(SEED_HALLS));
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(SEED_SERVICES));
  localStorage.setItem(STORAGE_KEYS.INITIALIZED_V2, 'true');
}

// ========== Generic Helpers ==========
function getData(key) {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function setData(key, data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
}

// ========== Users / Auth ==========
export function getUsers() {
  return getData(STORAGE_KEYS.USERS);
}

export function getUserById(id) {
  return getUsers().find(u => u.id === id);
}

export function getUserByCredentials(username, password) {
  return getUsers().find(u => u.username === username && u.password === password && u.enabled);
}

export function createUser(userData) {
  const users = getUsers();
  const newUser = {
    id: generateId('cust'),
    role: 'customer',
    enabled: true,
    createdAt: new Date().toISOString().split('T')[0],
    ...userData,
  };

  const invId = generateId('inv');
  newUser.invitationId = invId;

  users.push(newUser);
  setData(STORAGE_KEYS.USERS, users);

  const invitations = getInvitations();
  invitations.push({
    id: invId,
    customerId: newUser.id,
    templateId: 'classic-gold',
    slug: '',
    status: 'draft',
    publishedAt: null,
    createdAt: newUser.createdAt,
    updatedAt: newUser.createdAt,
    weddingData: {
      groomName: '',
      groomFullName: '',
      brideName: '',
      brideFullName: '',
      groomFather: '',
      groomMother: '',
      brideFather: '',
      brideMother: '',
      weddingDate: '2027-04-17',
      weddingTime: '19:30',
      venue: 'قاعة الملكية - قاعات النعمان',
      venueAddress: 'عمّان - شارع الجاردنز - دوار الواحة',
      mapUrl: 'https://maps.google.com/?q=31.9539,35.9106',
      invitationMessage: 'يتشرف فلان وفلانة بدعوتكم لحضور حفل زفافهما، ليكتمل فرحنا بحضوركم الكريم.',
      photos: [
        '/images/gallery/couple-1.jpg',
        '/images/halls/hall-royal.jpg',
        '/images/halls/hall-andalus.jpg',
        '/images/halls/hall-elegance.jpg'
      ],
      schedule: [
        { name: 'استقبال الضيوف', time: '17:30' },
        { name: 'بدء الحفل', time: '18:30' },
        { name: 'نخب وقطع الكعكة', time: '18:45' },
        { name: 'العشاء الرئيسي', time: '19:00' },
        { name: 'ختام الحفل', time: '21:00' },
      ],
    },
  });
  setData(STORAGE_KEYS.INVITATIONS, invitations);

  return newUser;
}

export function updateUser(id, updates) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  setData(STORAGE_KEYS.USERS, users);
  return users[index];
}

export function getCustomers() {
  return getUsers().filter(u => u.role === 'customer');
}

// ========== Invitations ==========
export function getInvitations() {
  return getData(STORAGE_KEYS.INVITATIONS);
}

export function getInvitationById(id) {
  return getInvitations().find(i => i.id === id);
}

export function getInvitationByCustomerId(customerId) {
  return getInvitations().find(i => i.customerId === customerId);
}

export function getInvitationBySlug(slug) {
  return getInvitations().find(i => i.slug === slug && i.status === 'published');
}

export function saveInvitation(id, updates) {
  const invitations = getInvitations();
  const index = invitations.findIndex(i => i.id === id);
  if (index === -1) return null;
  invitations[index] = {
    ...invitations[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  setData(STORAGE_KEYS.INVITATIONS, invitations);
  return invitations[index];
}

export function updateWeddingData(invitationId, weddingData) {
  const invitations = getInvitations();
  const index = invitations.findIndex(i => i.id === invitationId);
  if (index === -1) return null;
  invitations[index].weddingData = { ...invitations[index].weddingData, ...weddingData };
  invitations[index].updatedAt = new Date().toISOString();
  setData(STORAGE_KEYS.INVITATIONS, invitations);
  return invitations[index];
}

export function changeTemplate(invitationId, templateId) {
  return saveInvitation(invitationId, { templateId });
}

export function publishInvitation(invitationId) {
  const invitation = getInvitationById(invitationId);
  if (!invitation) return null;

  const wd = invitation.weddingData;
  let slug = invitation.slug;
  if (!slug) {
    const groomSlug = (wd.groomName || 'groom').replace(/\s+/g, '-');
    const brideSlug = (wd.brideName || 'bride').replace(/\s+/g, '-');
    const year = wd.weddingDate ? new Date(wd.weddingDate).getFullYear() : new Date().getFullYear();
    slug = `${groomSlug}-${brideSlug}-${year}-${Math.random().toString(36).substr(2, 4)}`;
  }

  return saveInvitation(invitationId, {
    slug,
    status: 'published',
    publishedAt: new Date().toISOString(),
  });
}

export function unpublishInvitation(invitationId) {
  return saveInvitation(invitationId, {
    status: 'draft',
    publishedAt: null,
  });
}

// ========== RSVP / Guestbook Messages ==========
export function getRSVPResponses(slug) {
  return getData(STORAGE_KEYS.RSVP).filter(r => r.invitationSlug === slug);
}

export function getAllRSVP() {
  return getData(STORAGE_KEYS.RSVP);
}

export function submitRSVP(rsvpData) {
  const responses = getData(STORAGE_KEYS.RSVP);
  const newRSVP = {
    id: generateId('rsvp'),
    submittedAt: new Date().toISOString(),
    ...rsvpData,
  };
  responses.push(newRSVP);
  setData(STORAGE_KEYS.RSVP, responses);
  return newRSVP;
}

export function getRSVPSummary(slug) {
  const responses = getRSVPResponses(slug);
  return {
    total: responses.length,
    responses,
  };
}

// ========== Halls ==========
export function getHalls() {
  return getData(STORAGE_KEYS.HALLS).filter(h => h.active);
}

export function getAllHalls() {
  return getData(STORAGE_KEYS.HALLS);
}

export function getHallById(id) {
  return getData(STORAGE_KEYS.HALLS).find(h => h.id === id);
}

export function saveHall(id, updates) {
  const halls = getData(STORAGE_KEYS.HALLS);
  const index = halls.findIndex(h => h.id === id);
  if (index === -1) return null;
  halls[index] = { ...halls[index], ...updates };
  setData(STORAGE_KEYS.HALLS, halls);
  return halls[index];
}

// ========== Services ==========
export function getServices() {
  return getData(STORAGE_KEYS.SERVICES);
}
