import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'src', 'data');
const EVENTS_FILE = path.join(DB_DIR, 'events.json');

function getStoredEvents() {
  try {
    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
    if (!fs.existsSync(EVENTS_FILE)) {
      const initial = [
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
          isPublic: true,
          status: 'active',
          createdAt: new Date().toISOString(),
        }
      ];
      fs.writeFileSync(EVENTS_FILE, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const content = fs.readFileSync(EVENTS_FILE, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading events:', err);
    return [];
  }
}

function saveEvents(events) {
  try {
    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving events:', err);
  }
}

// GET: Retrieve all events or filter by code
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    const events = getStoredEvents();
    if (code) {
      const found = events.find(e => e.code.toUpperCase() === code.toUpperCase());
      return NextResponse.json({ success: true, data: found || null });
    }
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST: Create a new event
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, coverImage, eventDate, venue, maxGuests, maxPhotosPerGuest, isPublic, organizerId, organizerEmail } = body;

    if (!title) {
      return NextResponse.json({ error: 'اسم الفعالية مطلوب' }, { status: 400 });
    }

    const randomCode = `NUMAN-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      code: randomCode,
      title: title.trim(),
      coverImage: coverImage || '/images/hero.jpg',
      eventDate: eventDate || new Date().toISOString().split('T')[0],
      venue: venue || 'قاعات النعمان',
      maxGuests: Number(maxGuests) || 300,
      maxPhotosPerGuest: Number(maxPhotosPerGuest) || 25,
      isPublic: isPublic !== false,
      status: 'active',
      organizerId: organizerId || 'admin',
      organizerEmail: organizerEmail || 'altous4@gmail.com',
      createdAt: new Date().toISOString(),
    };

    const events = getStoredEvents();
    events.unshift(newEvent);
    saveEvents(events);

    return NextResponse.json({ success: true, data: newEvent });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
