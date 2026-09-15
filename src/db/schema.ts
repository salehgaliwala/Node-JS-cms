import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const siteContent = sqliteTable('site_content', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  page_route: text('page_route').notNull(),
  component_key: text('component_key').notNull(),
  field_type: text('field_type').notNull(), // 'text' | 'textarea' | 'image'
  content_value: text('content_value').notNull(),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type NewSiteContent = typeof siteContent.$inferInsert;
