'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Globe } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isUrduPage = !pathname.startsWith('/en');

  // Effect for scroll and keyboard events
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Define navigation links for both languages
  const navLinks = isUrduPage
    ? [
        { name: 'کام', href: '/work' },
        { name: 'تحریریں', href: '/writing' },
        { name: 'میرے بارے میں', href: '/about' },
        { name: 'رابطہ', href: '/contact' },
      ]
    : [
        { name: 'Work', href: '/en/work' },
        { name: 'Writing', href: '/en/writing' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/en/contact' },
      ];

  const logoHref = isUrduPage ? '/' : '/en';
  const langToggleHref = isUrduPage ? '/en' : '/';

  return (
    <>
      <a href="#main-content" className="skip-link">
        {isUrduPage ? 'مرکزی مواد پر جائیں' : 'Skip to main content'}
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-line' : 'bg-transparent'
        }`}
        dir={isUrduPage ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Left Side: Logo */}
          <Link href={logoHref} className="text-2xl font-bold font-urdu-heading text-brand">
            {isUrduPage ? 'عبدالباسط' : 'Abdul Basit'}
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-brand ${isUrduPage ? 'font-urdu-body' : 'font-sans'}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-ink-muted hover:text-brand transition-colors"
              aria-label={isUrduPage ? 'تلاش' : 'Search'}
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href={langToggleHref}
              className="text-sm font-medium text-ink-muted hover:text-brand transition-colors"
              hrefLang={isUrduPage ? 'en' : 'ur'}
            >
              <Globe className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}