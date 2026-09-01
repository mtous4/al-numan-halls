// Event Album Data Layer & API integration adapter
// Supports both local persistence & external API bridge

const STORAGE_KEYS = {
  EVENTS: 'alnuman_events',
  EVENT_PHOTOS: 'alnuman_event_photos',
  ORGANIZER_REQUESTS: 'alnuman_organizer_requests',
  DEVICE_ID: 'alnuman_guest_device_id',
};

// Initial Seed Events
const SEED_EVENTS = [
  {
    id: 'evt_wedding_2027',
    code: 'NUMAN-2027',
    title: 'حفل زفاف يوسف ودانة المبارك',
    coverImage: '/images/gallery/couple-1.jpg',
    eventDate: '2027-04-17',
    venue: 'قاعة الملكية - قاعات النعمان',
    organizerId: 'cust_001',
    organizerEmail: 'altous4@gmail.com',
    maxGuests: 300,
    maxPhotosPerGuest: 25,
    isPublic: true, // true = all guests see gallery, false = only organizer
    status: 'active', // active, closed
    createdAt: '2026-08-20',
  },
  {
    id: 'evt_wedding_sultan',
    code: 'NUMAN-9921',
    title: 'حفل زفاف سلطان وشمس',
    coverImage: '/images/halls/hall-andalus.jpg',
    eventDate: '2027-05-14',
    venue: 'قاعة الأندلس - قاعات النعمان',
    organizerId: 'cust_002',
    organizerEmail: 'khaled@numan.com',
    maxGuests: 200,
    maxPhotosPerGuest: 20,
    isPublic: true,
    status: 'active',
    createdAt: '2026-08-22',
  },
];

const SEED_PHOTOS = [
  {
    id: 'ph_001',
    eventId: 'evt_wedding_2027',
    eventCode: 'NUMAN-2027',
    url: '/images/gallery/couple-1.jpg',
    caption: 'ألف مبروك للعروسين الغاليين 🎉',
    filter: 'Golden Glow',
    guestName: 'أحمد س.',
    deviceId: 'dev_sample_1',
    createdAt: '2026-08-25T19:30:00Z',
  },
  {
    id: 'ph_002',
    eventId: 'evt_wedding_2027',
    eventCode: 'NUMAN-2027',
    url: '/images/halls/hall-royal.jpg',
    caption: 'أجواء ملكية ساحرة في قاعات النعمان ✨',
    filter: 'Vintage',
    guestName: 'سارة م.',
    deviceId: 'dev_sample_2',
    createdAt: '2026-08-25T20:15:00Z',
  },
  {
    id: 'ph_003',
    eventId: 'evt_wedding_2027',
    eventCode: 'NUMAN-2027',
    url: '/images/halls/hall-andalus.jpg',
    caption: 'ليلة من ألف ليلة وليلة 🤍',
    filter: 'Romance',
    guestName: 'خالد ع.',
    deviceId: 'dev_sample_3',
    createdAt: '2026-08-25T21:00:00Z',
  }
];

function getItem(key, fallback = []) {
  if (typeof window === 'undefined') return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function setItem(key, val) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.error('Storage error:', err);
  }
}

// Ensure unique Guest Device ID
export function getOrCreateDeviceId() {
  if (typeof window === 'undefined') return 'server_guest';
  let devId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
  if (!devId) {
    devId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(STORAGE_KEYS.DEVICE_ID, devId);
  }
  return devId;
}

// ========== Events API Functions ==========

export function getEvents() {
  const stored = getItem(STORAGE_KEYS.EVENTS, null);
  if (!stored) {
    setItem(STORAGE_KEYS.EVENTS, SEED_EVENTS);
    return SEED_EVENTS;
  }
  return stored;
}

export function getEventByCode(code) {
  if (!code) return null;
  const events = getEvents();
  return events.find(e => e.code.toUpperCase() === code.toUpperCase()) || null;
}

export function getEventById(id) {
  if (!id) return null;
  const events = getEvents();
  return events.find(e => e.id === id) || null;
}

export function createEvent(eventData) {
  const events = getEvents();
  const randomCode = `NUMAN-${Math.floor(1000 + Math.random() * 9000)}`;
  const newEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    code: randomCode,
    maxPhotosPerGuest: 25,
    isPublic: true,
    status: 'active',
    createdAt: new Date().toISOString(),
    ...eventData,
  };
  events.unshift(newEvent);
  setItem(STORAGE_KEYS.EVENTS, events);
  return newEvent;
}

export function updateEvent(id, updates) {
  const events = getEvents();
  const index = events.findIndex(e => e.id === id);
  if (index === -1) return null;
  events[index] = { ...events[index], ...updates };
  setItem(STORAGE_KEYS.EVENTS, events);
  return events[index];
}

export function deleteEvent(id) {
  const events = getEvents().filter(e => e.id !== id);
  setItem(STORAGE_KEYS.EVENTS, events);
  // Also clean photos
  const photos = getEventPhotos().filter(p => p.eventId !== id);
  setItem(STORAGE_KEYS.EVENT_PHOTOS, photos);
  return true;
}

// ========== Photos API Functions ==========

export function getEventPhotos(eventIdOrCode) {
  const stored = getItem(STORAGE_KEYS.EVENT_PHOTOS, null);
  const allPhotos = stored || SEED_PHOTOS;
  if (!stored) {
    setItem(STORAGE_KEYS.EVENT_PHOTOS, SEED_PHOTOS);
  }

  if (!eventIdOrCode) return allPhotos;

  return allPhotos.filter(p => 
    p.eventId === eventIdOrCode || 
    p.eventCode?.toUpperCase() === eventIdOrCode?.toUpperCase()
  );
}

export function getGuestPhotoCount(eventIdOrCode, deviceId) {
  const photos = getEventPhotos(eventIdOrCode);
  return photos.filter(p => p.deviceId === deviceId).length;
}

export function uploadEventPhoto(photoData) {
  const photos = getEventPhotos();
  const newPhoto = {
    id: `ph_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    ...photoData,
  };
  photos.unshift(newPhoto);
  setItem(STORAGE_KEYS.EVENT_PHOTOS, photos);
  return newPhoto;
}

export function deleteEventPhoto(photoId) {
  const photos = getEventPhotos().filter(p => p.id !== photoId);
  setItem(STORAGE_KEYS.EVENT_PHOTOS, photos);
  return true;
}

// ========== Organizer Approvals / Requests ==========

export function getOrganizerRequests() {
  return getItem(STORAGE_KEYS.ORGANIZER_REQUESTS, [
    {
      id: 'req_001',
      name: 'محمود الطوس',
      email: 'altous4@gmail.com',
      phone: '0799523360',
      status: 'approved',
      approvedAt: '2026-08-01',
      eventsCount: 2,
    },
    {
      id: 'req_002',
      name: 'فندق وكوشات السلطان',
      email: 'sultan.events@numan.com',
      phone: '0791122334',
      status: 'pending',
      requestedAt: '2026-08-28',
      eventsCount: 0,
    }
  ]);
}

export function approveOrganizer(reqId) {
  const reqs = getOrganizerRequests();
  const idx = reqs.findIndex(r => r.id === reqId);
  if (idx !== -1) {
    reqs[idx].status = 'approved';
    reqs[idx].approvedAt = new Date().toISOString();
    setItem(STORAGE_KEYS.ORGANIZER_REQUESTS, reqs);
    return reqs[idx];
  }
  return null;
}

export function rejectOrganizer(reqId) {
  const reqs = getOrganizerRequests();
  const idx = reqs.findIndex(r => r.id === reqId);
  if (idx !== -1) {
    reqs[idx].status = 'rejected';
    setItem(STORAGE_KEYS.ORGANIZER_REQUESTS, reqs);
    return reqs[idx];
  }
  return null;
}
