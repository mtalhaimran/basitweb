'use client';

import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

type MenuItem = { label: string; href: string };
type Section = { title: string; items: MenuItem[] };

const DEFAULT_SECTIONS: Section[] = [
  {
    title: 'صفحہ جات',
    items: [
      { label: 'کام', href: '/work' },
      { label: 'تحریریں', href: '/writing' },
      { label: 'پوسٹس', href: '/posts' },
      { label: 'کتابیں', href: '/books' },
      { label: 'میرے بارے میں', href: '/about' },
      { label: 'رابطہ', href: '/contact' },
    ],
  },
  {
    title: 'نمایاں',
    items: [{ label: 'بن کا بنجارہ', href: '/bonn-ka-banjara' }],
  },
];

export default function NameRevealUrdu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isUrduPage = !pathname.startsWith('/en');
  const homeHref = isUrduPage ? '/' : '/';
  const prefersReduced = useReducedMotion();

  // Accurately measure the text width after custom fonts have loaded
  useEffect(() => {
    const measure = () => {
      if (textRef.current) {
        setTextWidth(textRef.current.getBoundingClientRect().width);
      }
    };
    // Ensure fonts are loaded before the final measurement
    document.fonts.ready.then(measure);
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

  // Define a single, shared transition for perfectly synced animations
  const transition = { duration: 0.4, ease: [0.4, 0, 0.2, 1] };

  // Calculate the distance the button needs to travel
  const buttonTravelDistance = prefersReduced ? 0 : -(textWidth + 16); // 16px is for gap-4

  return (
    <div
      ref={wrapRef}
      dir="rtl"
      className={['relative flex items-center', className].join(' ')}
      onMouseEnter={openWithDelay}
      onMouseLeave={closeWithDelay}
    >
      {/* Container for the animated elements */}
      <div className="flex items-center gap-4">
        {/* Revealed Name */}
        <motion.span
          ref={textRef}
          className="block text-3xl font-extrabold font-urdu-heading whitespace-nowrap text-brand"
          style={{ originX: 1 }} // Animates scale from the right
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: open ? 1 : 0,
            scaleX: open ? 1 : 0,
          }}
          transition={transition}
        >
          عبدالباسط ظفر
        </motion.span>

        {/* 'Ba' button */}
        <Link href={homeHref} aria-label="Homepage" className="relative z-10">
          <motion.div
            aria-haspopup="menu"
            aria-expanded={open}
            className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-brand/50"
            initial={{ x: 0, rotate: 0 }}
            animate={{
              x: open ? buttonTravelDistance : 0,
              rotate: open ? 360 : 0,
            }}
            transition={transition}
          >
            <span className="text-xl leading-none font-urdu-heading">ب</span>
          </motion.div>
        </Link>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-3 z-[60] w-[min(90vw,450px)] origin-top-right rounded-2xl border border-line bg-surface-white/80 backdrop-blur-lg shadow-2xl ring-1 ring-black/5"
          >
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {DEFAULT_SECTIONS.map((section) => (
                  <div key={section.title}>
                    <h4 className="mb-3 text-sm font-semibold text-ink/70 urdu-text tracking-wider">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            role="menuitem"
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="group urdu-text block rounded-lg px-3 py-2 text-base font-medium text-ink transition-colors hover:bg-brand-light hover:text-brand"
                          >
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}