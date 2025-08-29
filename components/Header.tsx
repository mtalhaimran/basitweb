'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Menu, X, Globe, Home, BookOpen, PenTool, User, Mail } from 'lucide-react';
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
    { name: 'بن کا بنجارہ', href: '/ur/bonn-ka-banjara', icon: PenTool },
    { name: 'تعارف', href: '/ur/about', icon: User },
    { name: 'رابطہ', href: '/ur/contact', icon: Mail }
  ] : [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Work', href: '/work', icon: PenTool },
    { name: 'Books', href: '/books', icon: BookOpen },
    { name: 'Writing', href: '/writing', icon: PenTool },
    { name: 'About', href: '/about', icon: User },
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
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Skip link for accessibility */}
            <Link
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus-ring"
            >
              {isUrdu ? 'مرکزی مواد پر جائیں' : 'Skip to main content'}
            </Link>

            {/* Logo */}
            <Link 
              href={isUrdu ? '/ur' : '/'} 
              className={`text-xl font-bold hover:text-primary transition-colors focus-ring rounded-md ${
                isUrdu ? 'font-urdu-heading' : ''
              }`}
            >
              {isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1" role="navigation">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors focus-ring ${
                      isUrdu ? 'flex-row-reverse space-x-reverse font-urdu-body' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className={`flex items-center space-x-2 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-muted hover:bg-accent rounded-md transition-colors focus-ring"
                aria-label={isUrdu ? 'تلاش کریں' : 'Search'}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline text-xs text-muted-foreground">
                  {isUrdu ? 'Ctrl+K' : 'Ctrl+K'}
                </span>
              </button>

              {/* Language Switcher */}
              <Link
                href={isUrdu ? '/' : '/ur'}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-muted hover:bg-accent rounded-md transition-colors focus-ring"
                aria-label={isUrdu ? 'Switch to English' : 'اردو میں دیکھیں'}
                hrefLang={isUrdu ? 'en' : 'ur'}
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium">
                  {isUrdu ? 'EN' : 'اردو'}
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-accent rounded-md transition-colors focus-ring"
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
              className="md:hidden border-t bg-background/95 backdrop-blur-md"
              role="navigation"
              aria-label={isUrdu ? 'موبائل نیویگیشن' : 'Mobile navigation'}
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium hover:bg-accent rounded-md transition-colors focus-ring ${
                        isUrdu ? 'flex-row-reverse space-x-reverse font-urdu-body text-right' : ''
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