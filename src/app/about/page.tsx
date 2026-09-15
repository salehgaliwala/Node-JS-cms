import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/getContent';

export const revalidate = 0;

export default async function AboutPage() {
  const content = await getContent('/about');

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      <Header content={content} />
      <main className="flex-1 max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black mb-6">
          {content.about_title || 'About Daily-admin.com'}
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed font-light whitespace-pre-line">
          {content.about_intro ||
            'We are committed to making sustainable living simple, transparent, and actionable for everyone across Europe.'}
        </p>
      </main>
      <Footer content={content} />
    </div>
  );
}
