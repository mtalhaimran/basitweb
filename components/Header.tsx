'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';

interface HeaderProps {
  lang?: 'en' | 'ur';
}
export function Header() { // Removed lang prop as site is now primarily Urdu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigation = isUrdu ? [
    { name: 'ہوم', href: '/' },
    { name: 'کام', href: '/work' },
    { name: 'کتابیں', href: '/books' },
    { name: 'تحریریں', href: '/writing' },
    { name: 'بن کا بنجارہ', href: '/bonn-ka-banjara' },
    { name: 'تعارف', href: '/about' },
    { name: 'رابطہ', href: '/contact' }
  ] : [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Books', href: '/books' },
    { name: 'Writing', href: '/writing' },
    { name: 'Bonn Ka Banjara', href: '/bonn-ka-banjara' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true); // Keep search shortcut
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

  return (
    <>
      <a href="#main-content" className="skip-link">
        {isUrdu ? 'مین کنٹینٹ پر جائیں' : 'Skip to main content'}
      </a>

      <header className={`minimal-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container"> {/* Use new container styling */}
          <div className={`flex h-20 items-center justify-between flex-row-reverse`}> {/* Always RTL */}
            {/* Logo */}
            <Link 
              href="/" 
              className={`text-2xl font-bold text-ink hover:text-primary transition-colors duration-200 focus-ring rounded-lg urdu-heading`} // Use new ink/primary colors
            >
              {/* Always Urdu */}
            >
              {isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
            </Link>

            {/* Desktop Navigation */}
            <nav className={`hidden lg:flex items-center ${isUrdu ? 'space-x-reverse space-x-8' : 'space-x-8'}`} role="navigation">
              {navigation.map((item) => (
                <Link
                  key={item.href} // Use new nav-link styling
                  href={item.href}
                  className={`nav-link ${isUrdu ? 'urdu-text' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className={`flex items-center space-x-reverse space-x-4`}> {/* Always RTL */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="btn-ghost p-3 rounded-lg group"
                aria-label={'تلاش'} // Always Urdu
              >
                <Search className="w-5 h-5" />
                <span className={`hidden sm:inline text-xs text-gray-500 ${isUrdu ? 'mr-2 urdu-text' : 'ml-2'}`}>
                  ⌘K
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden btn-ghost p-3 rounded-lg"
                aria-label={'مینو کھولیں'} // Always Urdu
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav 
              className="lg:hidden border-t border-gray-200 glass-effect animate-slide-up"
              role="navigation" // Use new mobile nav styling
              aria-label={'موبائل نیویگیشن'} // Always Urdu
            >
              <div className={`py-6 space-y-2 text-right`}> {/* Always RTL */}
                {navigation.map((item) => (
                  <Link // Use new mobile nav link styling
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-lg transition-colors focus-ring ${
                      isUrdu ? 'urdu-text' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        lang="ur" // Search overlay is always Urdu
      />
    </>
  );
}