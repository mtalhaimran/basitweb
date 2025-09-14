'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Globe } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';
import NameRevealUrdu from './NameRevealUrdu';
import { useI18n, useChangeLocale, useCurrentLocale } from '../locales/client';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const t = useI18n();
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const isUrduPage = currentLocale === 'ur';

  const navLinks = [
    { name: t('nav.work'), href: '/work' },
    { name: t('nav.writing'), href: '/writing' },
    { name: t('nav.posts'), href: '/posts' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.bonn'), href: '/bonn-ka-banjara' }, // Added Bonn ka Banjara
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface shadow-sm border-b border-line">
      <div className="container mx-auto grid grid-cols-3 items-center py-2">
        <div className="justify-self-start">
          <button 
            onClick={() => changeLocale(isUrduPage ? 'en' : 'ur')} 
            className="flex items-center gap-2 p-2 text-sm font-medium text-ink-muted transition-colors rounded-lg hover:bg-surface-elevated hover:text-brand" 
            aria-label="Toggle Language"
          >
            <Globe className="h-5 w-5" />
            <span className="hidden sm:inline">{isUrduPage ? 'English' : 'اردو'}</span>
          </button>
        </div>

        <nav className={`hidden md:flex items-center justify-center gap-8 justify-self-center`}>
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className={`text-base font-semibold transition-colors hover:text-brand ${isUrduPage ? 'font-urdu-body' : 'font-sans'}`}>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="justify-self-end flex items-center gap-3">
          <NameRevealUrdu />
          <button onClick={() => setIsSearchOpen(true)} className="p-2 text-ink-muted hover:text-brand" aria-label={isUrduPage ? 'تلاش' : 'Search'}>
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}