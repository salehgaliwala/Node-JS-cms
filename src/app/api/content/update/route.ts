import { NextResponse } from 'next/server';
import { db } from '@/db';
import { siteContent } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { updates } = body; // Array of { id: number, content_value: string } or { component_key: string, content_value: string }

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
