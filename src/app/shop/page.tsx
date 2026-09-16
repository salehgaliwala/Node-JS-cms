import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPageContent } from '@/lib/getContent';
import { db } from '@/db';
import { products as productsTable } from '@/db/schema';

export const revalidate = 0;

export default async function ShopPage() {
  const pageData = await getPageContent('/shop');

  if (pageData.is_custom_content_enabled && pageData.content) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-black font-sans">
        <Header content={{}} />
        <main
          className="flex-1 w-full"
          dangerouslySetInnerHTML={{ __html: pageData.content }}
        />
        <Footer content={{}} />
      </div>
    );
  }

  const allProducts = db.select().from(productsTable).all();

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      <Header content={{}} />
      <main className="flex-1 max-w-[1140px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-[820px] mx-auto mb-12">
          <h1 className="font-roboto-slab text-4xl sm:text-5xl font-bold tracking-tight text-black mb-3">
            {pageData.title || 'Shop'}
          </h1>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Plastic-Free Products
          </h2>
          <p className="text-base text-gray-600 font-light">
            Our products are designed to avoid ending up in the ocean.
          </p>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-gray-100 shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <div className="aspect-square w-full mb-4 overflow-hidden rounded-lg bg-gray-100 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
                  {p.title}
                </h3>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">{p.price}</span>
                <button className="bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer content={{}} />
    </div>
  );
}
