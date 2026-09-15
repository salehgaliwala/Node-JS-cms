import { db } from '@/db';
import { siteContent } from '@/db/schema';
import { eq, or } from 'drizzle-orm';

export async function getContent(route: string): Promise<Record<string, string>> {
  try {
    const rows = db
      .select()
      .from(siteContent)
      .where(or(eq(siteContent.page_route, route), eq(siteContent.page_route, 'global')))
      .all();

    const flattened: Record<string, string> = {};
    for (const row of rows) {
      flattened[row.component_key] = row.content_value;
    }
    return flattened;
  } catch (err) {
    console.error('getContent error:', err);
    return {};
  }
}
