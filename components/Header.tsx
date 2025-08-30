'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Menu, X, Globe } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import NameRevealUrdu from './NameRevealUrdu';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isUrduPage = !pathname.startsWith('/en');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigation = [
    { name: 'کام', href: '/work' },
    { name: 'کتابیں', href: '/books' },
    { name: 'تحریریں', href: '/writing' },
    { name: 'تعارف', href: '/about' },
    { name: 'رابطہ', href: '/contact' }
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        {isUrduPage ? 'مین کنٹینٹ پر جائیں' : 'Skip to main content'}
      </a>
      <motion.header
        className={`template-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-surface/95 backdrop-blur-md shadow-sm' : 'bg-surface'
        }`}
        initial={{ y: shouldReduceMotion ? 0 : -100 }}
        animate={{ y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }}
      >
        <div className="container">
          <div className={`flex items-center justify-between py-5 ${isUrduPage ? 'flex-row-reverse' : ''}`}>
            {/* Logo */}
            <Link href="/" className="focus-ring rounded-lg">
              <NameRevealUrdu className="text-brand" />
            </Link>

            {/* Desktop Navigation */}
            <nav className={`hidden lg:flex items-center ${isUrduPage ? 'flex-row-reverse gap-10' : 'gap-10'}`}>
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="template-nav-link urdu-text">
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className={`flex items-center gap-4 ${isUrduPage ? 'flex-row-reverse' : ''}`}>
              {/* Menu button for mobile */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 text-brand hover:text-brand-hover transition-colors rounded-lg hover:bg-surface-elevated"
                aria-label={isUrduPage ? 'مینو کھولیں' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-3 text-brand hover:text-brand-hover transition-colors rounded-lg hover:bg-surface-elevated"
                aria-label={isUrduPage ? 'تلاش' : 'Search'}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Language toggle */}
              <Link
                href={isUrduPage ? '/en' : '/'}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand hover:text-white transition-colors rounded-lg border-2 border-brand hover:bg-brand"
                hrefLang={isUrduPage ? 'en' : 'ur'}
              >
                <Globe className="w-4 h-4" />
                <span>{isUrduPage ? 'English' : 'اردو'}</span>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                className="lg:hidden border-t border-line bg-surface-elevated/95 backdrop-blur-md mt-5"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeOut' }}
              >
                <div className="py-6 space-y-2 text-right">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 text-base font-medium text-brand hover:text-brand-hover hover:bg-surface-white rounded-lg transition-all duration-200 focus-ring urdu-text"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
