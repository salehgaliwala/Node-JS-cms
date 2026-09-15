import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { siteContent } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('admin_auth');

  if (!authCookie || authCookie.value !== 'true') {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { updates } = body;

    if (!Array.isArray(updates)) {
      return NextResponse.json({ success: false, message: 'Invalid payload, expected updates array' }, { status: 400 });
    }

    for (const update of updates) {
      if (update.id) {
        db.update(siteContent)
          .set({ content_value: update.content_value })
          .where(eq(siteContent.id, update.id))
          .run();
      } else if (update.component_key) {
        db.update(siteContent)
          .set({ content_value: update.content_value })
          .where(eq(siteContent.component_key, update.component_key))
          .run();
      }
    }

    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
