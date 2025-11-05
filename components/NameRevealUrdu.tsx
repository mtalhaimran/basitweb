'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface NameRevealUrduProps {
  className?: string;
  showDropdown?: boolean;
}

export default function NameRevealUrdu({ className = '', showDropdown = false }: NameRevealUrduProps) {
  const [open, setOpen] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const homeHref = '/';
  const pathname = usePathname();
  const isUrduPage = !pathname.startsWith('/en');

  const navUrdu = [
    { name: 'کام', href: '/work' },
    { name: 'تحریریں', href: '/writing' },
    { name: 'مضامین', href: '/snippets' },
    { name: 'کتابیں', href: '/books' },
    { name: 'گیلری', href: '/gallery' },
    { name: 'بون کا بنجارہ', href: '/bonn-ka-banjara' },
    { name: 'میرے بارے میں', href: '/about' },
    { name: 'رابطہ', href: '/contact' }
  ];

  const navEnglish = [
    { name: 'Work', href: '/work' },
    { name: 'Writing', href: '/writing' },
    { name: 'Snippets', href: '/snippets' },
    { name: 'Books', href: '/books' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Bonn ka Banjara', href: '/bonn-ka-banjara' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const navigation = isUrduPage ? navUrdu : navEnglish;

  useEffect(() => {
    const measure = () => {
      if (textRef.current) {
        const width = textRef.current.getBoundingClientRect().width;
        setTextWidth(width + 20);
      }
    };
    
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    } else {
      setTimeout(measure, 500);
    }
    
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const openTimer = useRef<NodeJS.Timeout>();
  const closeTimer = useRef<NodeJS.Timeout>();
  
  const openWithDelay = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setOpen(true), 100);
  };
  
  const closeWithDelay = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  };

  const transition = { duration: 0.4, ease: [0.4, 0, 0.2, 1] };

  return (
    <div
      className={`relative flex items-center ${className}`}
      onMouseEnter={openWithDelay}
      onMouseLeave={closeWithDelay}
      onTouchStart={openWithDelay}
      style={{ zIndex: 200 }}
    >
      <div className={`flex items-center gap-4 ${isUrduPage ? 'flex-row' : 'flex-row-reverse'}`}>
        <motion.div
          style={{ 
            width: open ? textWidth : 0, 
            zIndex: 150,
            position: 'absolute',
            [isUrduPage ? 'right' : 'left']: '60px'
          }}
          className="overflow-visible"
          animate={{ opacity: open ? 1 : 0 }}
          transition={transition}
        >
          <span
            ref={textRef}
            className={`block text-3xl font-extrabold font-urdu-heading whitespace-nowrap ${isUrduPage ? 'text-right' : 'text-left'}`}
            style={{ color: 'inherit' }}
          >
            عبدالباسط ظفر
          </span>
        </motion.div>
        
        <Link href={homeHref} aria-label="Homepage" className="relative z-10">
          <motion.div
            aria-haspopup="menu"
            aria-expanded={open}
            className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white font-bold shadow-md cursor-pointer flex-shrink-0"
            animate={{ rotate: open ? 360 : 0 }}
            transition={transition}
          >
            <span className="text-xl leading-none font-urdu-heading">ب</span>
          </motion.div>
        </Link>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full mt-2 bg-surface-white rounded-lg shadow-lg border border-line overflow-hidden min-w-[220px] ${
                isUrduPage ? 'left-0' : 'right-0'
              }`}
              style={{ zIndex: 100 }}
            >
              <nav className="py-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-6 py-3 text-ink hover:bg-surface hover:text-brand transition-colors ${
                      isUrduPage ? 'text-right font-urdu-body' : 'text-left'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}