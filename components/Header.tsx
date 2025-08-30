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
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  
  // Check if we're on the landing page (bilingual)
  const isLandingPage = pathname === '/' || pathname === '/en';
  const isUrduPage = !pathname.startsWith('/en');

  const navigation = [
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

  const navVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.3
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        {isUrduPage ? 'مین کنٹینٹ پر جائیں' : 'Skip to main content'}
      </a>

      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm' 
            : 'bg-transparent'
        }`}
        initial={{ y: shouldReduceMotion ? 0 : -100 }}
        animate={{ y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Logo with Name Reveal Animation */}
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
            >
              <Link href="/" className="focus-ring rounded-lg">
                <NameRevealUrdu className="text-ink" />
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
                    className="relative text-ink-muted hover:text-ink transition-colors duration-200 font-medium urdu-text group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand origin-right"
                      initial={{ scaleX: 0 }}
                      whileHover={shouldReduceMotion ? {} : { scaleX: 1 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Actions */}
            <motion.div 
              className="flex items-center space-x-4 space-x-reverse"
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.8 }}
            >
              {/* Language Toggle (only on landing page) */}
              {isLandingPage && (
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  <Link
                    href={isUrduPage ? '/en' : '/'}
                    className="flex items-center space-x-2 space-x-reverse px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors rounded-lg border border-line hover:border-brand group"
                    hrefLang={isUrduPage ? 'en' : 'ur'}
                  >
                    <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>{isUrduPage ? 'English' : 'اردو'}</span>
                  </Link>
                </motion.div>
              )}

              {/* Search Button */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 space-x-reverse px-3 py-2 text-ink-muted hover:text-ink transition-colors rounded-lg hover:bg-surface-muted group"
                aria-label={isUrduPage ? 'تلاش' : 'Search'}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline text-xs text-ink-muted urdu-text">
                  ⌘K
                </span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 text-ink-muted hover:text-ink transition-colors rounded-lg hover:bg-surface-muted"
                aria-label={isUrduPage ? 'مینو کھولیں' : 'Open menu'}
                aria-expanded={isMenuOpen}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: shouldReduceMotion ? 0 : -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: shouldReduceMotion ? 0 : 90, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: shouldReduceMotion ? 0 : 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: shouldReduceMotion ? 0 : -90, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav 
                className="lg:hidden border-t border-line bg-white/95 backdrop-blur-md"
                role="navigation"
                aria-label={isUrduPage ? 'موبائل نیویگیشن' : 'Mobile navigation'}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" }}
              >
                <div className="py-6 space-y-2 text-right">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-base font-medium text-ink-muted hover:text-ink hover:bg-surface-muted rounded-lg transition-all duration-200 focus-ring urdu-text group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <motion.span
                          className="relative"
                          whileHover={shouldReduceMotion ? {} : { x: -8 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}