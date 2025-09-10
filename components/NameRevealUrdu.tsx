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
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isUrduPage = !pathname.startsWith('/en');
  const homeHref = isUrduPage ? '/' : '/en';
  const prefersReduced = useReducedMotion();

  // Timers for hover intent
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

  const spring = { type: 'spring', stiffness: 380, damping: 30, mass: 0.6 };

  return (
    <div
      ref={wrapRef}
      dir="rtl"
      className={['relative inline-flex items-center gap-4', className].join(' ')}
      onMouseEnter={openWithDelay}
      onMouseLeave={closeWithDelay}
    >
      {/* --- MODIFIED SECTION --- */}
      {/* This container now holds both the button and the revealed name */}
      <div className="relative flex items-center">
        {/* Revealed Name (positioned absolutely behind the button) */}
        <motion.span
          className="pointer-events-none absolute right-0 text-3xl font-extrabold font-urdu-heading whitespace-nowrap text-brand"
          style={{ originX: 1 }}
          initial={false}
          animate={{
            opacity: open ? 1 : 0,
            x: open ? '60px' : '0px', // Pushes the name out from behind the button
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          عبدالباسط ظفر
        </motion.span>
        
        {/* 'Ba' button is now always on top and only rotates */}
        <Link href={homeHref} aria-label="Homepage" className="relative z-10">
          <motion.div
            aria-haspopup="menu"
            aria-expanded={open}
            className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-brand/50"
            animate={{ rotate: open ? 360 : 0 }}
            transition={prefersReduced ? { duration: 0 } : spring}
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
            {/* Dropdown content remains the same */}
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