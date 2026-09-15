import Link from 'next/link';

interface FooterProps {
  content?: Record<string, string>;
}

export default function Footer({ content }: FooterProps) {
  const copyright = content?.footer_copyright || '© Copyright';
  const companyInfo = content?.footer_company_info || 'Admin Charge SL · Marina 16, 27, 08005 Barcelona - contact@daily-admin.com';

  return (
    <footer>
      <div className="footer-links">
        <span>{copyright}</span>
        <Link href="/privacy-cookie">Privacy</Link>
        <Link href="/principles">Principles</Link>
        <Link href="/ethics">Ethics</Link>
        <Link href="/terms-support">Terms</Link>
      </div>
      <p>{companyInfo}</p>
    </footer>
  );
}
