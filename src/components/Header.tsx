'use client';

import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  content?: Record<string, string>;
  showHeroTitle?: boolean;
}

export default function Header({ content, showHeroTitle = true }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const brandMark = content?.header_brand_mark || '◢';
  const brandTitle = content?.header_brand_title || 'daily admin';
  const heroLine1 = content?.hero_title_line1 || 'IMPACT';
  const heroLine2 = content?.hero_title_line2 || 'PRODUCTS';

  return (
    <header className="hero">
      <nav className="nav container">
        <Link className="brand" href="/">
          <span className="brand-mark">{brandMark}</span>
          <span>{brandTitle}</span>
        </Link>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)}>Store</Link>
          <Link href="/journey" onClick={() => setMenuOpen(false)}>Journey</Link>
          <Link href="/sign-up" onClick={() => setMenuOpen(false)}>Sign up</Link>
          <Link href="/joinus" onClick={() => setMenuOpen(false)}>Careers</Link>
          <Link href="/contact-2" onClick={() => setMenuOpen(false)}>Inquiries</Link>
          <Link href="/faq-2" onClick={() => setMenuOpen(false)}>Faq</Link>
        </div>
        <button
          className="menu-toggle"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {showHeroTitle && (
        <div className="hero-title">
          <h1>
            {heroLine1}
            <br />
            {heroLine2}
          </h1>
        </div>
      )}
    </header>
  );
}
