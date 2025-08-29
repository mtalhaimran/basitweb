'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';
import { motion } from 'framer-motion';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigation = [
    { name: 'ہوم', href: '/' },
    { name: 'کام', href: '/work' },
    { name: 'کتابیں', href: '/books' },
    { name: 'تحریریں', href: '/writing' },
    { name: 'بن کا بنجارہ', href: '/ur/bonn-ka-banjara' },
    { name: 'تعارف', href: '/about' },
    { name: 'رابطہ', href: '/contact' }
  ];

  useEffect(() => {
    setIsLoaded(true);
    
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

  // Animation variants for the logo
  const logoVariants = {
    hidden: { 
      opacity: 0, 
      x: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }
    }
  };

  // Stagger animation for navigation items
  const navVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        مین کنٹینٹ پر جائیں
      </a>

      <motion.header 
        className={`minimal-nav ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container">
          <div className="flex h-20 items-center justify-between">
            {/* Logo with Animation */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              <Link 
                href="/" 
                className="text-2xl font-bold text-ink hover:text-primary transition-colors duration-200 focus-ring rounded-lg urdu-heading"
              >
                عبدالباسط ظفر
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav 
              className="hidden lg:flex items-center space-x-8 space-x-reverse" 
              role="navigation"
              variants={navVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              {navigation.map((item) => (
                <motion.div key={item.href} variants={navItemVariants}>
                  <Link
                    href={item.href}
                    className="nav-link urdu-text"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Actions */}
            <motion.div 
              className="flex items-center space-x-4 space-x-reverse"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <button
                onClick={() => setIsSearchOpen(true)}
                className="btn-ghost p-3 rounded-lg group"
                aria-label="تلاش"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline text-xs text-gray-500 mr-2 urdu-text">
                  ⌘K
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden btn-ghost p-3 rounded-lg"
                aria-label="مینو کھولیں"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav 
              className="lg:hidden border-t border-gray-200 glass-effect"
              role="navigation"
              aria-label="موبائل نیویگیشن"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-6 space-y-2 text-right">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-lg transition-colors focus-ring urdu-text"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </div>
      </motion.header>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}