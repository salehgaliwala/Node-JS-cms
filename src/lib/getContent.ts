import { db } from '@/db';
import { siteContent } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface PageContent {
  page_route: string;
  title: string;
  content: string;
  is_custom_content_enabled: boolean;
}

export async function getPageContent(route: string): Promise<PageContent> {
  try {
    const page = db.select().from(siteContent).where(eq(siteContent.page_route, route)).get();
    if (page) {
      return {
        page_route: page.page_route,
        title: page.title,
        content: page.content,
        is_custom_content_enabled: page.is_custom_content_enabled === 1,
      };
    }
  } catch (err) {
    console.error('getPageContent error:', err);
  }

  return {
    page_route: route,
    title: 'Daily Admin',
    content: '',
    is_custom_content_enabled: false,
  };
}
