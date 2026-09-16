import { db } from './index';
import { siteContent, products, siteUploads } from './schema';
import fs from 'fs';
import path from 'path';

const routes = [
  { page_route: '/', title: 'Home - Daily Admin', content: '', is_custom_content_enabled: 0 },
  { page_route: '/about', title: 'About Us - Daily Admin', content: '', is_custom_content_enabled: 0 },
  { page_route: '/journey', title: 'Your Climate Journey', content: '', is_custom_content_enabled: 0 },
  { page_route: '/shop', title: 'Eco Store', content: '', is_custom_content_enabled: 0 },
  { page_route: '/sign-up', title: 'Sign Up Subscription', content: '', is_custom_content_enabled: 0 },
  { page_route: '/joinus', title: 'Careers - Join Us', content: '', is_custom_content_enabled: 0 },
  { page_route: '/contact-2', title: 'Contact Us', content: '', is_custom_content_enabled: 0 },
  { page_route: '/faq-2', title: 'Frequently Asked Questions', content: '', is_custom_content_enabled: 0 },
  { page_route: '/privacy-cookie', title: 'Privacy & Cookie Policy', content: '', is_custom_content_enabled: 0 },
  { page_route: '/principles', title: 'Our Principles', content: '', is_custom_content_enabled: 0 },
  { page_route: '/ethics', title: 'Code of Ethics', content: '', is_custom_content_enabled: 0 },
  { page_route: '/terms-support', title: 'Terms of Service', content: '', is_custom_content_enabled: 0 },
  { page_route: '/cancel', title: 'Cancel Subscription', content: '', is_custom_content_enabled: 0 },
];

async function seed() {
  console.log('Clearing existing tables...');
  db.delete(siteContent).run();
  db.delete(products).run();
  db.delete(siteUploads).run();

  console.log('Seeding site_content...');
  for (const item of routes) {
    db.insert(siteContent).values(item).run();
  }

  // Import products if json exists
  const jsonPath = path.join(process.cwd(), 'src/data/shop_products.json');
  if (fs.existsSync(jsonPath)) {
    console.log('Seeding products from json...');
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const items = JSON.parse(rawData);
    for (const prod of items) {
      db.insert(products).values({
        title: prod.title || 'Eco Product',
        price: prod.price || '€0.00',
        image: prod.image || '/assets/placeholder.jpg',
        category: prod.category || 'General',
        description: prod.description || '',
        sku: prod.sku || '',
      }).run();
    }
  }

  console.log('Seeding completed successfully!');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
