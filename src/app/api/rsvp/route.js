import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'src', 'data');
const DB_FILE = path.join(DB_DIR, 'guestbook.json');

// Ensure data directory and file exist
function getMessages() {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([]), 'utf8');
      return [];
    }
    const content = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading guestbook db:', err);
    return [];
  }
}

function saveMessages(messages) {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(messages, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving guestbook db:', err);
  }
}

// GET: Return real messages for a specific invitation slug
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    const allMessages = getMessages();

    if (!slug) {
      return NextResponse.json({ success: true, data: allMessages });
    }

    const filtered = allMessages.filter(m => m.invitationSlug === slug && m.message?.trim());
    return NextResponse.json({ success: true, data: filtered });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ أثناء جلب الرسائل' }, { status: 500 });
  }
}

// POST: Save a new real guestbook message
export async function POST(request) {
  try {
    const body = await request.json();
    const { invitationSlug, guestName, attending, guestCount, message } = body;

    if (!guestName || !invitationSlug) {
      return NextResponse.json(
        { error: 'اسم الضيف والرابط مطلوبان' },
        { status: 400 }
      );
    }

    const rsvpRecord = {
      id: `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      invitationSlug,
      guestName: guestName.trim(),
      attending: Boolean(attending),
      guestCount: attending ? Number(guestCount || 1) : 0,
      message: (message || '').trim(),
      submittedAt: new Date().toISOString()
    };

    const allMessages = getMessages();
    // Add new message to the top
    allMessages.unshift(rsvpRecord);
    saveMessages(allMessages);

    return NextResponse.json({ success: true, data: rsvpRecord });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ أثناء معالجة الطلب' }, { status: 500 });
  }
}
