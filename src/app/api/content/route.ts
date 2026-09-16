import { NextResponse } from 'next/server';
import { db } from '@/db';
import { siteContent } from '@/db/schema';
import { eq, or } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const routeParam = searchParams.get('route');

  try {
    let rows;
    if (routeParam === 'all') {
      rows = db.select().from(siteContent).all();
    } else {
      const route = routeParam || '/';
      // Fetch content for the requested route plus global elements
      rows = db
        .select()
        .from(siteContent)
        .where(or(eq(siteContent.page_route, route), eq(siteContent.page_route, 'global')))
        .all();
    }

    const flattened: Record<string, string> = {};
    for (const row of rows) {
      flattened[row.component_key] = row.content_value;
    }

    return NextResponse.json({ success: true, data: flattened, raw: rows });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
