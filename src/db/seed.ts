import { db } from './index';
import { siteContent } from './schema';

const initialContent = [
  // --- GLOBAL HEADER & FOOTER ---
  {
    page_route: 'global',
    component_key: 'header_logo_text',
    field_type: 'text',
    content_value: 'daily-admin.com',
  },
  {
    page_route: 'global',
    component_key: 'footer_copyright',
    field_type: 'text',
    content_value: '© Copyright Daily-admin.com',
  },
  {
    page_route: 'global',
    component_key: 'footer_company_info',
    field_type: 'text',
    content_value: 'Admin Charge SL - Marina 16, 27, 08005 Barcelona - contact@daily-admin.com',
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
    component_key: 'home_hero_badge',
    field_type: 'text',
    content_value: 'Green Choices',
  },
  {
    page_route: '/',
    component_key: 'home_hero_title',
    field_type: 'text',
    content_value: 'Where sustainability meets convenience.',
  },
  {
    page_route: '/',
    component_key: 'home_hero_description',
    field_type: 'textarea',
    content_value: 'Our carefully curated selection of sustainable goods aims to promote a more mindful approach to shopping, encouraging positive changes for a healthier planet.',
  },
  {
    page_route: '/',
    component_key: 'home_hero_cta',
    field_type: 'text',
    content_value: 'Our store',
  },
  {
    page_route: '/',
    component_key: 'home_hero_image',
    field_type: 'image',
    content_value: '/uploads/bottle.jpg',
  },
  {
    page_route: '/',
    component_key: 'home_climate_badge',
    field_type: 'text',
    content_value: 'Make Climate Action Count',
  },
  {
    page_route: '/',
    component_key: 'home_climate_description',
    field_type: 'textarea',
    content_value: 'With us, you can offset your carbon footprint either once or on a monthly basis. For example, you can spend 5 euros per month on carbon credits to offset your monthly driven kilometers, or you can choose to offset your flights either monthly or as a one-time action.',
  },
  {
    page_route: '/',
    component_key: 'home_climate_cta',
    field_type: 'text',
    content_value: 'Your climate journey',
  },
  {
    page_route: '/',
    component_key: 'home_climate_image',
    field_type: 'image',
    content_value: '/uploads/climate-banner.jpg',
  },
  {
    page_route: '/',
    component_key: 'home_about_section_title',
    field_type: 'text',
    content_value: 'About us',
  },
  {
    page_route: '/',
    component_key: 'home_about_q1',
    field_type: 'text',
    content_value: 'Who are we and what do we do?',
  },
  {
    page_route: '/',
    component_key: 'home_about_a1',
    field_type: 'textarea',
    content_value: 'Daily-admin.com is a sustainability-focused platform helping individuals and families reduce their environmental footprint in a simple and practical way. We offer monthly carbon offset subscriptions (Offset Journey) that allow you to offset emissions from daily activities, as well as eco-friendly product subscriptions (such as bamboo toilet paper and toothpaste tablets) delivered conveniently to your home. Our operations are fully transparent, legally structured, and designed to make sustainable living accessible to everyone.',
  },
  {
    page_route: '/',
    component_key: 'home_about_q2',
    field_type: 'text',
    content_value: 'Why do we do this?',
  },
  {
    page_route: '/',
    component_key: 'home_about_a2',
    field_type: 'textarea',
    content_value: 'We believe that living sustainably should be easy and affordable for everyone. Climate change and environmental challenges can feel overwhelming, and many people want to contribute positively but don’t know where to start. We created Daily-admin.com to provide a reliable, structured way to take daily action by offsetting your carbon footprint and replacing everyday products with environmentally friendly alternatives, without added complexity.',
  },
  {
    page_route: '/',
    component_key: 'home_about_q3',
    field_type: 'text',
    content_value: 'How do our subscriptions work?',
  },
  {
    page_route: '/',
    component_key: 'home_about_a3',
    field_type: 'textarea',
    content_value: 'Daily-admin.com offers monthly, recurring subscriptions that you can manage easily from your online account. For Offset Journey, your subscription automatically offsets your estimated monthly CO₂ emissions with verified climate projects. For product subscriptions, you receive high-quality, eco-friendly products delivered to your doorstep each month, with the option to adjust or cancel anytime. All payments are processed securely, and we comply with European regulations to ensure your data and transactions are protected.',
  },
  {
    page_route: '/',
    component_key: 'home_cta_banner_title',
    field_type: 'text',
    content_value: 'Combat climate change!',
  },
  {
    page_route: '/',
    component_key: 'home_cta_banner_subtitle',
    field_type: 'text',
    content_value: 'Join us.',
  },

  // --- ABOUT PAGE (`/about`) ---
  {
    page_route: '/about',
    component_key: 'about_title',
    field_type: 'text',
    content_value: 'About Daily-admin.com',
  },
  {
    page_route: '/about',
    component_key: 'about_intro',
    field_type: 'textarea',
    content_value: 'We are committed to making sustainable living simple, transparent, and actionable for everyone across Europe.',
  },

  // --- STORE / SHOP PAGE (`/shop`) ---
  {
    page_route: '/shop',
    component_key: 'shop_title',
    field_type: 'text',
    content_value: 'Our Eco Store',
  },
  {
    page_route: '/shop',
    component_key: 'shop_intro',
    field_type: 'textarea',
    content_value: 'Explore our eco-friendly products made with sustainably sourced materials designed for your daily routine.',
  },

  // --- JOURNEY PAGE (`/journey`) ---
  {
    page_route: '/journey',
    component_key: 'journey_title',
    field_type: 'text',
    content_value: 'Your Climate Journey',
  },
  {
    page_route: '/journey',
    component_key: 'journey_intro',
    field_type: 'textarea',
    content_value: 'Offset your carbon footprint with certified global climate projects through simple monthly plans.',
  },

  // --- SIGN UP PAGE (`/sign-up`) ---
  {
    page_route: '/sign-up',
    component_key: 'sign_up_title',
    field_type: 'text',
    content_value: 'Sign Up for Daily Action',
  },
  {
    page_route: '/sign-up',
    component_key: 'sign_up_intro',
    field_type: 'textarea',
    content_value: 'Create an account to manage your sustainability subscriptions and track your impact.',
  },

  // --- CAREERS PAGE (`/joinus`) ---
  {
    page_route: '/joinus',
    component_key: 'joinus_title',
    field_type: 'text',
    content_value: 'Careers at Daily-admin.com',
  },
  {
    page_route: '/joinus',
    component_key: 'joinus_intro',
    field_type: 'textarea',
    content_value: 'Join our passionate team dedicated to accelerating the shift toward sustainable living.',
  },

  // --- INQUIRIES PAGE (`/contact-2`) ---
  {
    page_route: '/contact-2',
    component_key: 'contact_2_title',
    field_type: 'text',
    content_value: 'Inquiries & Support',
  },
  {
    page_route: '/contact-2',
    component_key: 'contact_2_intro',
    field_type: 'textarea',
    content_value: 'Have questions? Contact our team at contact@daily-admin.com or fill out the inquiry form below.',
  },

  // --- FAQ PAGE (`/faq-2`) ---
  {
    page_route: '/faq-2',
    component_key: 'faq_2_title',
    field_type: 'text',
    content_value: 'Frequently Asked Questions',
  },
  {
    page_route: '/faq-2',
    component_key: 'faq_2_intro',
    field_type: 'textarea',
    content_value: 'Find clear answers regarding subscriptions, billing, delivery, and carbon offsetting integrity.',
  },

  // --- PRIVACY PAGE (`/privacy-cookie`) ---
  {
    page_route: '/privacy-cookie',
    component_key: 'privacy_cookie_title',
    field_type: 'text',
    content_value: 'Privacy & Cookie Policy',
  },
  {
    page_route: '/privacy-cookie',
    component_key: 'privacy_cookie_content',
    field_type: 'textarea',
    content_value: 'Daily-admin.com values your privacy and ensures compliant handling of personal data under GDPR.',
  },

  // --- PRINCIPLES PAGE (`/principles`) ---
  {
    page_route: '/principles',
    component_key: 'principles_title',
    field_type: 'text',
    content_value: 'Our Operating Principles',
  },
  {
    page_route: '/principles',
    component_key: 'principles_content',
    field_type: 'textarea',
    content_value: 'Transparency, measurable climate action, and high ethical standards guide all our product offerings.',
  },

  // --- ETHICS PAGE (`/ethics`) ---
  {
    page_route: '/ethics',
    component_key: 'ethics_title',
    field_type: 'text',
    content_value: 'Code of Ethics',
  },
  {
    page_route: '/ethics',
    component_key: 'ethics_content',
    field_type: 'textarea',
    content_value: 'We prioritize verified sustainability partners and fair labor standards throughout our supply chain.',
  },

  // --- TERMS PAGE (`/terms-support`) ---
  {
    page_route: '/terms-support',
    component_key: 'terms_support_title',
    field_type: 'text',
    content_value: 'Terms of Service',
  },
  {
    page_route: '/terms-support',
    component_key: 'terms_support_content',
    field_type: 'textarea',
    content_value: 'Review the legal terms governing use of Daily-admin.com services and product subscriptions.',
  },

  // --- CANCEL PAGE (`/cancel`) ---
  {
    page_route: '/cancel',
    component_key: 'cancel_title',
    field_type: 'text',
    content_value: 'Cancel Subscription',
  },
  {
    page_route: '/cancel',
    component_key: 'cancel_intro',
    field_type: 'textarea',
    content_value: 'You can modify or cancel your subscription at any time without hidden fees or lock-ins.',
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
