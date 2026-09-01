import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'src', 'data');
const PHOTOS_FILE = path.join(DB_DIR, 'event_photos.json');

function getStoredPhotos() {
  try {
    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
    if (!fs.existsSync(PHOTOS_FILE)) {
      fs.writeFileSync(PHOTOS_FILE, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    const content = fs.readFileSync(PHOTOS_FILE, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading event photos:', err);
    return [];
  }
}

function savePhotos(photos) {
  try {
    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
    fs.writeFileSync(PHOTOS_FILE, JSON.stringify(photos, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving event photos:', err);
  }
}

// GET: Retrieve photos for a specific event
export async function GET(request, { params }) {
  try {
    const { code } = await params;
    const allPhotos = getStoredPhotos();
    const eventPhotos = allPhotos.filter(p => p.eventCode?.toUpperCase() === code?.toUpperCase());
    return NextResponse.json({ success: true, data: eventPhotos });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
}

// POST: Upload a framed photo with caption and filter
export async function POST(request, { params }) {
  try {
    const { code } = await params;
    const body = await request.json();
    const { url, caption, filter, guestName, deviceId } = body;

    if (!url) {
      return NextResponse.json({ error: 'بيانات الصورة مطلوبة' }, { status: 400 });
    }

    const newPhoto = {
      id: `ph_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      eventCode: code,
      url,
      caption: (caption || '').trim(),
      filter: filter || 'Natural',
      guestName: (guestName || 'ضيف').trim(),
      deviceId: deviceId || 'unknown_device',
      createdAt: new Date().toISOString()
    };

    const photos = getStoredPhotos();
    photos.unshift(newPhoto);
    savePhotos(photos);

    return NextResponse.json({ success: true, data: newPhoto });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload photo' }, { status: 500 });
  }
}
