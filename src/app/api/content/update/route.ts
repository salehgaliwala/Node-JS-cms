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
    const { page_route, title, content, is_custom_content_enabled } = body;

    if (!page_route) {
      return NextResponse.json({ success: false, message: 'page_route is required' }, { status: 400 });
    }

    const existing = db.select().from(siteContent).where(eq(siteContent.page_route, page_route)).get();

    if (existing) {
      db.update(siteContent)
        .set({
          title: title ?? existing.title,
          content: content ?? existing.content,
          is_custom_content_enabled: is_custom_content_enabled !== undefined ? (is_custom_content_enabled ? 1 : 0) : existing.is_custom_content_enabled,
        })
        .where(eq(siteContent.page_route, page_route))
        .run();
    } else {
      db.insert(siteContent)
        .values({
          page_route,
          title: title || '',
          content: content || '',
          is_custom_content_enabled: is_custom_content_enabled ? 1 : 0,
        })
        .run();
    }

    return NextResponse.json({ success: true, message: 'Page content updated successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
