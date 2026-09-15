import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/getContent';

export const revalidate = 0;

export default async function GenericPage({ routeKey }: { routeKey: string }) {
  const content = await getContent(routeKey);

  const cleanKey = routeKey.replace('/', '').replace('-', '_');
  const titleKey = `${cleanKey}_title`;
  const contentKey = `${cleanKey}_content`;
  const introKey = `${cleanKey}_intro`;

  const title = content[titleKey] || content.title || 'Daily-admin.com';
  const bodyText = content[contentKey] || content[introKey] || content.description || 'Structured page content.';

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      <Header content={content} />
      <main className="flex-1 max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black mb-6">
          {title}
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed font-light whitespace-pre-line">
          {bodyText}
        </p>
      </main>
      <Footer content={content} />
    </div>
  );
}
