'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Globe } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';
import { motion, useReducedMotion } from 'framer-motion';
import NameRevealUrdu from './NameRevealUrdu';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isUrduPage = !pathname.startsWith('/en');
  
  // Determine language toggle link based on current page
  const getLanguageToggleLink = () => {
    if (pathname === '/') return '/en';
    if (pathname === '/en') return '/';
    if (pathname === '/about') return '/en/about';
    if (pathname === '/en/about') return '/about';
    // For other pages, just toggle to the landing page
    return isUrduPage ? '/en' : '/';
  };
  
  const languageToggleLink = getLanguageToggleLink();
  const showLanguageToggle = pathname === '/' || pathname === '/en' || pathname === '/about' || pathname === '/en/about';

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
          <div className="flex items-center justify-between py-5">
            {/* Left side - Search and Language toggle */}
            <div className="flex items-center gap-3">
              {showLanguageToggle && (
                <Link
                  href={languageToggleLink}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand hover:text-white transition-colors rounded-lg border-2 border-brand hover:bg-brand"
                  hrefLang={isUrduPage ? "en" : "ur"}
                  title={isUrduPage ? "View in English" : "اردو میں دیکھیں"}
                >
                  <Globe className="w-4 h-4" />
                  <span>{isUrduPage ? 'English' : 'اردو'}</span>
                </Link>
              )}
              {isUrduPage && (
                <Link
                  href="/search"
                  className="p-3 text-brand hover:text-brand-hover transition-colors rounded-lg hover:bg-surface-elevated"
                  aria-label="تلاش"
                  title="تلاش (Ctrl+K)"
                >
                  <Search className="w-5 h-5" />
                </Link>
              )}
            </div>

            {/* Right side - NameReveal with dropdown for RTL (Urdu) */}
            <div className="flex items-center gap-3">
              <NameRevealUrdu className="text-brand" showDropdown={true} />
            </div>
          </div>
        </div>
      </motion.header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}