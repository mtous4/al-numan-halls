import { NextResponse } from 'next/server';

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
      guestName,
      attending: Boolean(attending),
      guestCount: attending ? Number(guestCount || 1) : 0,
      message: message || '',
      submittedAt: new Date().toISOString()
    };

    return NextResponse.json({ success: true, data: rsvpRecord });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ أثناء معالجة الطلب' }, { status: 500 });
  }
}
