'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Globe, Menu } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';
import NameRevealUrdu from './NameRevealUrdu';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const isUrduPage = language === 'ur';

  const navLinks = isUrduPage
    ? [
        { name: 'کام', href: '/work' },
        { name: 'تحریریں', href: '/writing' },
        { name: 'پوسٹس', href: '/posts' },
        { name: 'میرے بارے میں', href: '/about' },
        { name: 'رابطہ', href: '/contact' },
      ]
    : [
        { name: 'Work', href: '/work' },
        { name: 'Writing', href: '/writing' },
        { name: 'Posts', href: '/posts' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
      ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        {isUrduPage ? 'مرکزی مواد پر جائیں' : 'Skip to main content'}
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 bg-surface shadow-sm border-b border-line">
        <div className="container mx-auto flex items-center justify-between py-2">
          <NameRevealUrdu />

          <nav className={`hidden md:flex items-center gap-8 ${isUrduPage ? 'flex-row-reverse' : ''}`}>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-semibold transition-colors hover:text-brand ${isUrduPage ? 'font-urdu-body' : 'font-sans'}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-ink-muted hover:text-brand" aria-label={isUrduPage ? 'تلاش' : 'Search'}>
              <Search className="h-5 w-5" />
            </button>
            <button onClick={toggleLanguage} className="p-2 text-ink-muted hover:text-brand" aria-label="Toggle Language">
              <Globe className="h-5 w-5" />
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-ink-muted hover:text-brand md:hidden" aria-label={isUrduPage ? 'مینو کھولیں' : 'Open menu'}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)}>
            <motion.div initial={{ y: '-100%' }} animate={{ y: '0%' }} exit={{ y: '-100%' }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="fixed top-0 left-0 right-0 bg-surface shadow-lg p-4 pt-20" onClick={(e) => e.stopPropagation()}>
              <nav className={`flex flex-col items-center gap-6 ${isUrduPage ? 'text-right' : 'text-left'}`}>
                {navLinks.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className={`text-lg font-semibold transition-colors hover:text-brand ${isUrduPage ? 'font-urdu-body' : 'font-sans'}`}>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}