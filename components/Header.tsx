'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, Globe } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';

interface HeaderProps {
  lang?: 'en' | 'ur';
}

export function Header({ lang = 'en' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isUrdu = lang === 'ur';
  
  const navigation = isUrdu ? [
    { name: 'ہوم', href: '/ur' },
    { name: 'کام', href: '/ur/work' },
    { name: 'کتابیں', href: '/ur/books' },
    { name: 'بن کا بنجارہ', href: '/ur/bonn-ka-banjara' },
    { name: 'رابطہ', href: '/ur/contact' }
  ] : [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Books', href: '/books' },
    { name: 'Writing', href: '/writing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Skip link for accessibility */}
            <Link
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded"
            >
              {isUrdu ? 'مرکزی مواد پر جائیں' : 'Skip to main content'}
            </Link>

            {/* Logo */}
            <Link href={isUrdu ? '/ur' : '/'} className="text-xl font-semibold hover:opacity-80 transition-opacity">
              {isUrdu ? (
                <span className="urdu-heading">عبدالباسط ظفر</span>
              ) : (
                'Abdul Basit Zafar'
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    isUrdu ? 'urdu-text' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-accent rounded-md transition-colors"
                aria-label={isUrdu ? 'تلاش کریں' : 'Search'}
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Language Switcher */}
              <Link
                href={isUrdu ? '/' : '/ur'}
                className="flex items-center space-x-1 p-2 hover:bg-accent rounded-md transition-colors"
                aria-label={isUrdu ? 'Switch to English' : 'Switch to Urdu'}
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium">
                  {isUrdu ? 'EN' : 'اردو'}
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
                aria-label={isUrdu ? 'مینو کھولیں' : 'Open menu'}
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden border-t py-4">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium hover:text-primary transition-colors ${
                      isUrdu ? 'urdu-text text-right' : ''
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
        lang={lang}
      />
    </>
  );
}