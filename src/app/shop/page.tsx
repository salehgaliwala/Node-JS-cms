import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/getContent';

export const revalidate = 0;

export default async function ShopPage() {
  const content = await getContent('/shop');

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      <Header content={content} />
      <main className="flex-1 max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-[820px] mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black mb-6">
            {content.shop_title || 'Our Eco Store'}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed font-light">
            {content.shop_intro ||
              'Explore our eco-friendly products made with sustainably sourced materials designed for your daily routine.'}
          </p>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-4">
            <div className="h-48 bg-gray-200 rounded-xl flex items-center justify-center font-medium text-gray-400">
              Bamboo Toilet Paper Box
            </div>
            <h2 className="text-xl font-bold">Bamboo Toilet Paper</h2>
            <p className="text-sm text-gray-600 font-light">100% organic, plastic-free packaging monthly subscription.</p>
            <button className="w-full bg-black text-white text-sm font-semibold py-2.5 rounded-full hover:bg-gray-800">
              Subscribe €12.99 / mo
            </button>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-4">
            <div className="h-48 bg-gray-200 rounded-xl flex items-center justify-center font-medium text-gray-400">
              Toothpaste Tablets Container
            </div>
            <h2 className="text-xl font-bold">Toothpaste Tablets</h2>
            <p className="text-sm text-gray-600 font-light">Fluoride toothpaste tablets in reusable tin jars.</p>
            <button className="w-full bg-black text-white text-sm font-semibold py-2.5 rounded-full hover:bg-gray-800">
              Subscribe €7.99 / mo
            </button>
          </div>
        </div>
      </main>
      <Footer content={content} />
    </div>
  );
}
