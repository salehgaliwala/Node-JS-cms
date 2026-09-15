import Link from 'next/link';

interface FooterProps {
  content?: Record<string, string>;
}

export default function Footer({ content }: FooterProps) {
  const copyright = content?.footer_copyright || '© Copyright Daily-admin.com';
  const companyInfo = content?.footer_company_info || 'Admin Charge SL - Marina 16, 27, 08005 Barcelona - contact@daily-admin.com';
  const email = content?.footer_email || 'info@daily-admin.com';

  return (
    <footer className="w-full bg-black text-white pt-16 pb-12 font-sans">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Links & Contact Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 border-b border-gray-800 gap-8">
          <div className="flex flex-wrap gap-6 text-sm font-semibold text-gray-300">
            <Link href="/journey" className="hover:text-white transition-colors">
              Climate journey
            </Link>
            <Link href="/shop" className="hover:text-white transition-colors">
              Green store
            </Link>
            <a href={`mailto:${email}`} className="hover:text-white transition-colors">
              {email}
            </a>
            <Link href="/cancel" className="hover:text-white transition-colors">
              Cancel subscription
            </Link>
          </div>
        </div>

        {/* Lower Legal Navigation & Details */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-gray-400 gap-4">
          <div className="flex flex-wrap gap-4">
            <span className="font-medium text-gray-300">{copyright}</span>
            <Link href="/privacy-cookie" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/principles" className="hover:text-white transition-colors">
              Principles
            </Link>
            <Link href="/ethics" className="hover:text-white transition-colors">
              Ethics
            </Link>
            <Link href="/terms-support" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>

          <p className="text-gray-500 text-xs">
            {companyInfo}
          </p>
        </div>
      </div>
    </footer>
  );
}
