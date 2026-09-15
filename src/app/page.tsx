import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getContent } from '@/lib/getContent';

export const revalidate = 0;

export default async function HomePage() {
  const content = await getContent('/');

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      <Header content={content} />

      <main className="flex-1">
        {/* HERO SECTION 1: Green Choices */}
        <section className="py-16 md:py-24 max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block text-sm font-semibold text-gray-500 uppercase tracking-widest">
                {content.home_hero_badge || 'Green Choices'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight">
                {content.home_hero_title || 'Where sustainability meets convenience.'}
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed max-w-xl font-light">
                {content.home_hero_description ||
                  'Our carefully curated selection of sustainable goods aims to promote a more mindful approach to shopping, encouraging positive changes for a healthier planet.'}
              </p>
              <div>
                <Link
                  href="/shop"
                  className="inline-block bg-black text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors shadow-sm"
                >
                  {content.home_hero_cta || 'Our store'}
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-[4/3]">
              {content.home_hero_video || content.home_hero_image?.endsWith('.mp4') || content.home_hero_image?.endsWith('.webm') ? (
                <video
                  src={content.home_hero_video || content.home_hero_image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={content.home_hero_image || '/uploads/bottle.jpg'}
                  alt="Green Choices"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </section>

        {/* HERO SECTION 2: Make Climate Action Count */}
        <section className="py-16 md:py-24 bg-brand-cardBg">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <span className="inline-block text-sm font-semibold text-gray-500 uppercase tracking-widest">
                  {content.home_climate_badge || 'Make Climate Action Count'}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight">
                  Offset your footprint easily.
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                  {content.home_climate_description ||
                    'With us, you can offset your carbon footprint either once or on a monthly basis. For example, you can spend 5 euros per month on carbon credits to offset your monthly driven kilometers, or you can choose to offset your flights either monthly or as a one-time action.'}
                </p>
                <div>
                  <Link
                    href="/journey"
                    className="inline-block bg-black text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors shadow-sm"
                  >
                    {content.home_climate_cta || 'Your climate journey'}
                  </Link>
                </div>
              </div>

              <div className="order-1 lg:order-2 relative rounded-2xl overflow-hidden shadow-lg bg-gray-200 aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={content.home_climate_image || '/uploads/climate-banner.jpg'}
                  alt="Climate Action"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT US ACCORDION / FAQ SECTION */}
        <section className="py-20 max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-black mb-12 text-center">
            {content.home_about_section_title || 'About us'}
          </h2>

          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-3">
                {content.home_about_q1 || 'Who are we and what do we do?'}
              </h3>
              <p className="text-gray-700 leading-relaxed font-light">
                {content.home_about_a1}
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-3">
                {content.home_about_q2 || 'Why do we do this?'}
              </h3>
              <p className="text-gray-700 leading-relaxed font-light">
                {content.home_about_a2}
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-3">
                {content.home_about_q3 || 'How do our subscriptions work?'}
              </h3>
              <p className="text-gray-700 leading-relaxed font-light">
                {content.home_about_a3}
              </p>
            </div>
          </div>
        </section>

        {/* BANNER CTA */}
        <section className="py-20 bg-black text-white text-center">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {content.home_cta_banner_title || 'Combat climate change!'}
            </h2>
            <p className="text-2xl text-gray-300 font-serif">
              {content.home_cta_banner_subtitle || 'Join us.'}
            </p>
            <div className="pt-6 flex justify-center space-x-4">
              <Link
                href="/journey"
                className="bg-brand-teal text-black text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-teal-300 transition-colors"
              >
                Climate journey
              </Link>
              <Link
                href="/shop"
                className="bg-white text-black text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                Green store
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer content={content} />
    </div>
  );
}
