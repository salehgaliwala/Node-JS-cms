import { NextResponse } from 'next/server';
import { db } from '@/db';
import { siteContent, siteUploads } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const routeParam = searchParams.get('route');

  try {
    if (routeParam === 'all') {
      const rows = db.select().from(siteContent).all();
      const uploads = db.select().from(siteUploads).all();
      return NextResponse.json({ success: true, pages: rows, uploads });
    }

    if (routeParam === 'uploads') {
      const uploads = db.select().from(siteUploads).all();
      return NextResponse.json({ success: true, uploads });
    }

    const route = routeParam || '/';
    const page = db.select().from(siteContent).where(eq(siteContent.page_route, route)).get();

    if (!page) {
      return NextResponse.json({
        success: true,
        data: {
          page_route: route,
          title: '',
          content: '',
          is_custom_content_enabled: 0,
        },
      });
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
