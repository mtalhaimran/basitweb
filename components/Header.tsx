'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Menu, X, Home, BookOpen, PenTool, User, Mail, FileText } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Work', href: '/work', icon: PenTool },
    { name: 'Books', href: '/books', icon: BookOpen },
    { name: 'Writing', href: '/writing', icon: FileText },
    { name: 'Bonn Ka Banjara', href: '/bonn-ka-banjara', icon: PenTool },
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
        Skip to main content
      </a>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-2xl font-black text-gray-900 hover:text-red-600 transition-colors duration-200 focus-ring rounded-lg"
            >
              Abdul Basit Zafar
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" role="navigation">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-link flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="btn-ghost p-3 rounded-lg"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline text-xs text-gray-500 ml-2">
                  ⌘K
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden btn-ghost p-3 rounded-lg"
                aria-label="Open menu"
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
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="py-6 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-lg transition-colors focus-ring"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{item.name}</span>
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
      />
    </>
  );
}