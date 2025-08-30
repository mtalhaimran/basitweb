'use client';

import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type MenuItem = { label: string; href: string };
type Section = { title: string; items: MenuItem[] };

type Props = {
  className?: string;
};

// Updated sections to include "بن کا بنجارہ"
const DEFAULT_SECTIONS: Section[] = [
  {
    title: 'صفحہ جات',
    items: [
      { label: 'ہوم', href: '/' },
      { label: 'کام', href: '/work' },
      { label: 'تحریریں', href: '/writing' },
      { label: 'پوسٹس', href: '/posts' },
      { label: 'کتابیں', href: '/books' },
      { label: 'میرے بارے میں', href: '/about' },
      { label: 'رابطہ', href: '/contact' }
    ]
  },
  {
    title: 'نمایاں',
    items: [{ label: 'بن کا بنجارہ', href: '/bonn-ka-banjara' }] // Corrected link
  }
];

export default function NameRevealUrdu({ className }: Props) {
  const [open, setOpen] = useState(false);
  const [textW, setTextW] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // measure full name width for animation
  useEffect(() => {
    const measure = () => {
      const el = textRef.current;
      if (el) setTextW(el.getBoundingClientRect().width);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // open/close with hover intent
  const openTimer = useRef<NodeJS.Timeout>();
  const closeTimer = useRef<NodeJS.Timeout>();

  const openWithDelay = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setOpen(true), 80);
  };
  const closeWithDelay = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const spring = { type: 'spring', stiffness: 380, damping: 30, mass: 0.6 };
  const duration = prefersReduced ? 0 : 0.28;
  const circleTravel = prefersReduced ? 0 : -(textW + 12); // RTL: negative X

  return (
    <div
      ref={wrapRef}
      dir="rtl"
      className={['relative inline-flex items-center gap-3 select-none', className].filter(Boolean).join(' ')}
      onMouseEnter={openWithDelay}
      onMouseLeave={closeWithDelay}
    >
      {/* trigger: circular ب */}
      <motion.button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative grid place-items-center rounded-full bg-brand text-white font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        style={{ width: 48, height: 48 }}
        animate={prefersReduced ? {} : { x: open ? circleTravel : 0, rotate: open ? 360 : 0 }}
        transition={prefersReduced ? { duration: 0 } : spring}
      >
        <span className="text-xl leading-none font-urdu-heading">ب</span>
      </motion.button>

      {/* full name reveal */}
      <div className="overflow-hidden pr-3">
        <motion.span
          ref={textRef}
          className="inline-block text-3xl md:text-4xl font-extrabold font-urdu-heading whitespace-nowrap"
          style={{ originX: 1 }}
          initial={false}
          animate={prefersReduced ? { opacity: 1, scaleX: open ? 1 : 0 } : { opacity: open ? 1 : 0.2, scaleX: open ? 1 : 0, filter: open ? 'blur(0px)' : 'blur(0.8px)', letterSpacing: open ? '0.02em' : '0.1em' }}
          transition={{ duration, ...spring }}
        >
          عبدالباسط ظفر
        </motion.span>
      </div>

      {/* Dropdown Menu: Positioned relative to the button */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-3 z-50 w-[min(92vw,400px)] origin-top-right rounded-2xl border border-line bg-surface-white shadow-xl ring-1 ring-black/5"
          >
            <div className="h-1.5 w-full bg-gradient-to-l from-brand/30 via-brand/15 to-transparent" />
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DEFAULT_SECTIONS.map((section) => (
                  <div key={section.title}>
                    <h4 className="mb-2 text-sm font-semibold text-ink/80 urdu-text">{section.title}</h4>
                    <ul className="space-y-1">
                      {section.items.map((it) => (
                        <li key={it.href}>
                          <Link
                            role="menuitem"
                            href={it.href}
                            onClick={() => setOpen(false)}
                            className="group urdu-text block rounded-lg px-3 py-1.5 text-base text-ink hover:bg-surface-elevated hover:text-brand"
                          >
                            <span>{it.label}</span>
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