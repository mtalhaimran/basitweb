'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Menu, X, Globe, Home, BookOpen, PenTool, User, Mail, FileText } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';

interface HeaderProps {
  lang?: 'en' | 'ur';
}

export function Header({ lang = 'en' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isUrdu = lang === 'ur';
  
  const navigation = isUrdu ? [
    { name: 'ہوم', href: '/ur', icon: Home },
    { name: 'کام', href: '/ur/work', icon: PenTool },
    { name: 'کتابیں', href: '/ur/books', icon: BookOpen },
    { name: 'تحریریں', href: '/ur/writing', icon: FileText },
    { name: 'بن کا بنجارہ', href: '/ur/bonn-ka-banjara', icon: PenTool },
    { name: 'تعارف', href: '/ur/about', icon: User },
    { name: 'رابطہ', href: '/ur/contact', icon: Mail }
  ] : [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Work', href: '/work', icon: PenTool },
    { name: 'Books', href: '/books', icon: BookOpen },
    { name: 'Writing', href: '/writing', icon: FileText },
    { name: 'About', href: '/about', icon: User },
    { name: 'Newsletter', href: '/newsletter', icon: Mail },
    { name: 'Contact', href: '/contact', icon: Mail }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

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

  return (
    <>
      <a href="#main-content" className="skip-link">
        {isUrdu ? 'مرکزی مواد پر جائیں' : 'Skip to main content'}
      </a>

      <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled 
          ? 'bg-surface/95 backdrop-blur-md border-b border-line shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link 
              href={isUrdu ? '/ur' : '/'} 
              className={`text-xl font-semibold hover:text-brand transition-colors focus-ring rounded-md ${
                isUrdu ? 'urdu-heading-3' : ''
              }`}
            >
              {isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" role="navigation">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link ${isUrdu ? 'flex-row-reverse urdu-body-sm' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className={isUrdu ? 'mr-2' : 'ml-2'}>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className={`flex items-center space-x-2 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="btn btn-ghost"
                aria-label={isUrdu ? 'تلاش کریں' : 'Search'}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline text-xs text-ink-muted ml-2">
                  ⌘K
                </span>
              </button>

              {/* Language Switcher */}
              <Link
                href={isUrdu ? '/' : '/ur'}
                className="btn btn-ghost"
                aria-label={isUrdu ? 'Switch to English' : 'اردو میں دیکھیں'}
                hrefLang={isUrdu ? 'en' : 'ur'}
              >
                <Globe className="w-4 h-4" />
                <span className={`text-xs font-medium ${isUrdu ? 'mr-2' : 'ml-2'}`}>
                  {isUrdu ? 'EN' : 'اردو'}
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden btn btn-ghost"
                aria-label={isUrdu ? 'مینو کھولیں' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav 
              className="lg:hidden border-t border-line bg-surface/95 backdrop-blur-md animate-slide-up"
              role="navigation"
              aria-label={isUrdu ? 'موبائل نیویگیشن' : 'Mobile navigation'}
            >
              <div className="py-4 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium hover:bg-subtle rounded-md transition-colors focus-ring ${
                        isUrdu ? 'flex-row-reverse space-x-reverse urdu-body-sm text-right' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          )}
        </div>
      </header>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        lang={lang}
      />
    </>
  );
}