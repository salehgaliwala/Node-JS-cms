import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPageContent } from '@/lib/getContent';

export const revalidate = 0;

export default async function GenericPage({ routeKey }: { routeKey: string }) {
  const pageData = await getPageContent(routeKey);

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

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      <Header content={{}} />
      <main className="flex-1 max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black mb-6">
          {pageData.title || 'Daily-admin.com'}
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed font-light whitespace-pre-line">
          Welcome to {pageData.title || 'Daily-admin.com'}. Explore our sustainable offerings and impact initiatives.
        </p>
      </main>
      <Footer content={{}} />
    </div>
  );
}
