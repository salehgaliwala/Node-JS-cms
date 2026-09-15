import Link from 'next/link';

interface HeaderProps {
  content?: Record<string, string>;
}

export default function Header({ content }: HeaderProps) {
  const logoText = content?.header_logo_text || 'daily-admin.com';

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight text-black font-sans">
            {logoText}
          </span>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-[15px] font-semibold text-black">
          <Link href="/about" className="hover:text-brand-teal transition-colors">
            About
          </Link>
          <Link href="/shop" className="hover:text-brand-teal transition-colors">
            Store
          </Link>
          <Link href="/journey" className="hover:text-brand-teal transition-colors">
            Journey
          </Link>
          <Link href="/sign-up" className="hover:text-brand-teal transition-colors">
            Sign up
          </Link>
          <Link href="/joinus" className="hover:text-brand-teal transition-colors">
            Careers
          </Link>
          <Link href="/contact-2" className="hover:text-brand-teal transition-colors">
            Inquiries
          </Link>
          <Link href="/faq-2" className="hover:text-brand-teal transition-colors">
            Faq
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-4">
          <Link
            href="/shop"
            className="bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
          >
            Our store
          </Link>
        </div>
      </div>
    </header>
  );
}
