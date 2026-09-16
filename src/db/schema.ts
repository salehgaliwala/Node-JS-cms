import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const siteContent = sqliteTable('site_content', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  page_route: text('page_route').notNull().unique(),
  title: text('title').notNull().default(''),
  content: text('content').notNull().default(''),
  is_custom_content_enabled: integer('is_custom_content_enabled').notNull().default(0), // 0: template, 1: custom HTML/CSS
});

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  price: text('price').notNull(),
  image: text('image').notNull(),
  category: text('category').default('General'),
  description: text('description').default(''),
  sku: text('sku').default(''),
});

export const subscriptions = sqliteTable('subscriptions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull(),
  name: text('name').default(''),
  plan: text('plan').default('Monthly Offset'),
  status: text('status').notNull().default('active'), // 'active' | 'cancelled'
  created_at: text('created_at').notNull(),
  cancelled_at: text('cancelled_at'),
  cancel_reason: text('cancel_reason'),
});

export const siteUploads = sqliteTable('site_uploads', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  filename: text('filename').notNull(),
  url: text('url').notNull(),
  uploaded_at: text('uploaded_at').notNull(),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type NewSiteContent = typeof siteContent.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;

export type SiteUpload = typeof siteUploads.$inferSelect;
export type NewSiteUpload = typeof siteUploads.$inferInsert;
