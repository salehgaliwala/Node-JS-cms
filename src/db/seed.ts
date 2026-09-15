import { db } from './index';
import { siteContent } from './schema';

const initialContent = [
  // --- GLOBAL HEADER & FOOTER ---
  {
    page_route: 'global',
    component_key: 'header_brand_mark',
    field_type: 'text',
    content_value: '◢',
  },
  {
    page_route: 'global',
    component_key: 'header_brand_title',
    field_type: 'text',
    content_value: 'daily admin',
  },
  {
    page_route: 'global',
    component_key: 'hero_title_line1',
    field_type: 'text',
    content_value: 'IMPACT',
  },
  {
    page_route: 'global',
    component_key: 'hero_title_line2',
    field_type: 'text',
    content_value: 'PRODUCTS',
  },
  {
    page_route: 'global',
    component_key: 'footer_copyright',
    field_type: 'text',
    content_value: '© Copyright',
  },
  {
    page_route: 'global',
    component_key: 'footer_company_info',
    field_type: 'text',
    content_value: 'Admin Charge SL · Marina 16, 27, 08005 Barcelona - contact@daily-admin.com',
  },
  {
    page_route: 'global',
    component_key: 'footer_email',
    field_type: 'text',
    content_value: 'info@daily-admin.com',
  },

  // --- HOME PAGE (`/`) ---
  {
    page_route: '/',
    component_key: 'green_choices_title',
    field_type: 'text',
    content_value: 'Green Choices',
  },
  {
    page_route: '/',
    component_key: 'green_choices_bold',
    field_type: 'text',
    content_value: 'sustainability meets convenience.',
  },
  {
    page_route: '/',
    component_key: 'green_choices_text',
    field_type: 'textarea',
    content_value: 'Where sustainability meets convenience. Our carefully curated selection of sustainable goods aims to promote a more mindful approach to shopping, encouraging positive changes for a healthier planet.',
  },
  {
    page_route: '/',
    component_key: 'green_choices_btn',
    field_type: 'text',
    content_value: 'Our store',
  },
  {
    page_route: '/',
    component_key: 'green_choices_img',
    field_type: 'image',
    content_value: '/assets/wooden-product.jpg',
  },
  {
    page_route: '/',
    component_key: 'climate_title',
    field_type: 'text',
    content_value: 'Make Climate Action Count',
  },
  {
    page_route: '/',
    component_key: 'climate_bold',
    field_type: 'text',
    content_value: 'offset your carbon footprint',
  },
  {
    page_route: '/',
    component_key: 'climate_text',
    field_type: 'textarea',
    content_value: 'With us, you can offset your carbon footprint either once or on a monthly basis. For example, you can spend 5 euros per month on carbon credits to offset your monthly driven kilometers, or you can choose to offset your flights either monthly or as a one-time action.',
  },
  {
    page_route: '/',
    component_key: 'climate_btn',
    field_type: 'text',
    content_value: 'Your climate journey',
  },
  {
    page_route: '/',
    component_key: 'climate_img',
    field_type: 'image',
    content_value: '/assets/wind-turbine.jpg',
  },
  {
    page_route: '/',
    component_key: 'about_title',
    field_type: 'text',
    content_value: 'About us',
  },
  {
    page_route: '/',
    component_key: 'faq1_q',
    field_type: 'text',
    content_value: 'Who are we and what do we do?',
  },
  {
    page_route: '/',
    component_key: 'faq1_a',
    field_type: 'textarea',
    content_value: 'Daily-admin.com is a sustainability-focused platform helping individuals and families reduce their environmental footprint in a simple and practical way. We offer monthly carbon offset subscriptions (Offset Journey) that allow you to offset emissions from daily activities, as well as eco-friendly product subscriptions (such as bamboo toilet paper and toothpaste tablets) delivered conveniently to your home. Our operations are fully transparent, legally structured, and designed to make sustainable living accessible to everyone.',
  },
  {
    page_route: '/',
    component_key: 'faq2_q',
    field_type: 'text',
    content_value: 'Why do we do this?',
  },
  {
    page_route: '/',
    component_key: 'faq2_a',
    field_type: 'textarea',
    content_value: 'We want to make meaningful climate action simple, practical and accessible in everyday life.',
  },
  {
    page_route: '/',
    component_key: 'faq3_q',
    field_type: 'text',
    content_value: 'How do our subscriptions work?',
  },
  {
    page_route: '/',
    component_key: 'faq3_a',
    field_type: 'textarea',
    content_value: 'Choose a subscription, select the option that fits your lifestyle, and we take care of the recurring delivery or offset contribution.',
  },
  {
    page_route: '/',
    component_key: 'cta_h2',
    field_type: 'text',
    content_value: 'Combat climate change!',
  },
  {
    page_route: '/',
    component_key: 'cta_h3',
    field_type: 'text',
    content_value: 'Join us.',
  },
  {
    page_route: '/',
    component_key: 'cta_btn1',
    field_type: 'text',
    content_value: 'Climate journey',
  },
  {
    page_route: '/',
    component_key: 'cta_btn2',
    field_type: 'text',
    content_value: 'info@daily-admin.com',
  },
  {
    page_route: '/',
    component_key: 'cta_btn3',
    field_type: 'text',
    content_value: 'Green store',
  },
  {
    page_route: '/',
    component_key: 'cta_btn4',
    field_type: 'text',
    content_value: 'Cancel subscription',
  },

  // --- SUBPAGES ---
  {
    page_route: '/about',
    component_key: 'about_title',
    field_type: 'text',
    content_value: 'About Daily-admin.com',
  },
  {
    page_route: '/shop',
    component_key: 'shop_title',
    field_type: 'text',
    content_value: 'Our Eco Store',
  },
  {
    page_route: '/journey',
    component_key: 'journey_title',
    field_type: 'text',
    content_value: 'Your Climate Journey',
  },
  {
    page_route: '/sign-up',
    component_key: 'sign_up_title',
    field_type: 'text',
    content_value: 'Sign Up for Daily Action',
  },
  {
    page_route: '/joinus',
    component_key: 'joinus_title',
    field_type: 'text',
    content_value: 'Careers at Daily-admin.com',
  },
  {
    page_route: '/contact-2',
    component_key: 'contact_2_title',
    field_type: 'text',
    content_value: 'Inquiries & Support',
  },
  {
    page_route: '/faq-2',
    component_key: 'faq_2_title',
    field_type: 'text',
    content_value: 'Frequently Asked Questions',
  },
  {
    page_route: '/privacy-cookie',
    component_key: 'privacy_cookie_title',
    field_type: 'text',
    content_value: 'Privacy & Cookie Policy',
  },
  {
    page_route: '/principles',
    component_key: 'principles_title',
    field_type: 'text',
    content_value: 'Our Operating Principles',
  },
  {
    page_route: '/ethics',
    component_key: 'ethics_title',
    field_type: 'text',
    content_value: 'Code of Ethics',
  },
  {
    page_route: '/terms-support',
    component_key: 'terms_support_title',
    field_type: 'text',
    content_value: 'Terms of Service',
  },
  {
    page_route: '/cancel',
    component_key: 'cancel_title',
    field_type: 'text',
    content_value: 'Cancel Subscription',
  },
];

async function seed() {
  console.log('Seeding site_content...');
  db.delete(siteContent).run();
  for (const item of initialContent) {
    db.insert(siteContent).values(item).run();
  }
  console.log('Successfully seeded site_content table!');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
