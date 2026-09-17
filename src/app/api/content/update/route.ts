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

    // Support array or object containing updates array
    const updatesList = Array.isArray(body) ? body : Array.isArray(body?.updates) ? body.updates : null;

    if (updatesList) {
      for (const item of updatesList) {
        if (item.page_route) {
          const existing = db.select().from(siteContent).where(eq(siteContent.page_route, item.page_route)).get();
          if (existing) {
            db.update(siteContent)
              .set({
                title: item.title !== undefined ? item.title : existing.title,
                content: item.content !== undefined ? item.content : existing.content,
                is_custom_content_enabled: item.is_custom_content_enabled !== undefined ? (item.is_custom_content_enabled ? 1 : 0) : existing.is_custom_content_enabled,
              })
              .where(eq(siteContent.page_route, item.page_route))
              .run();
          } else {
            db.insert(siteContent)
              .values({
                page_route: item.page_route,
                title: item.title || '',
                content: item.content || '',
                is_custom_content_enabled: item.is_custom_content_enabled ? 1 : 0,
              })
              .run();
          }
        } else if (item.id) {
          const existing = db.select().from(siteContent).where(eq(siteContent.id, item.id)).get();
          if (existing) {
            db.update(siteContent)
              .set({
                title: item.title !== undefined ? item.title : existing.title,
                content: item.content !== undefined ? item.content : (item.content_value !== undefined ? item.content_value : existing.content),
                is_custom_content_enabled: item.is_custom_content_enabled !== undefined ? (item.is_custom_content_enabled ? 1 : 0) : existing.is_custom_content_enabled,
              })
              .where(eq(siteContent.id, item.id))
              .run();
          }
        }
      }
      return NextResponse.json({ success: true, message: 'Content updated successfully' });
    }

    // Single update mode
    const { page_route, title, content, is_custom_content_enabled } = body || {};

    if (!page_route) {
      return NextResponse.json({ success: false, message: 'page_route is required' }, { status: 400 });
    }

    const existing = db.select().from(siteContent).where(eq(siteContent.page_route, page_route)).get();

    if (existing) {
      db.update(siteContent)
        .set({
          title: title !== undefined ? title : existing.title,
          content: content !== undefined ? content : existing.content,
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
    console.error('Content update API error:', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
