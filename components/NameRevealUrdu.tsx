'use client';

import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type MenuItem = { label: string; href: string };
type Section = { title: string; items: MenuItem[] };

type NameRevealProps = {
  className?: string;
  /** Force reduced motion (otherwise we follow the user's OS setting) */
  reducedMotion?: boolean;
  /** Optional: override the default sitemap sections */
  sections?: Section[];
};

// Default sitemap (edit labels/links here)
const DEFAULT_SECTIONS: Section[] = [
  {
    title: 'صفحہ جات',
    items: [
      { label: 'ہوم', href: '/' },
      { label: 'کام', href: '/work' },
      { label: 'تحریریں', href: '/writing' },
      { label: 'کتابیں', href: '/books' },
      { label: 'میرے بارے میں', href: '/about' },
      { label: 'رابطہ', href: '/contact' }
    ]
  },
  {
    title: 'سیریز',
    items: [{ label: 'بن کا بنجارہ', href: '/bonn-ka-banjara' }]
  },
  {
    title: 'زبانیں',
    items: [
      { label: 'اردو', href: '/' },
      { label: 'English', href: '/en' }
    ]
  }
];

export default function NameRevealUrdu({
  className,
  reducedMotion,
  sections = DEFAULT_SECTIONS
}: NameRevealProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Respect prefers-reduced-motion if not explicitly overridden
  const prefersReduced =
    reducedMotion ?? useReducedMotion();

  // Measure full-name width (to move the circle across that distance)
  useEffect(() => {
    const measure = () => {
      const el = textRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setTextWidth(rect.width);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Close on outside click & Escape
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // Animation settings
  const duration = prefersReduced ? 0 : 0.28;
  const spring = { type: 'spring', stiffness: 380, damping: 30, mass: 0.6 };
  const circleTravel = prefersReduced ? 0 : -(textWidth + 12); // RTL: negative X

  return (
    <div
      ref={wrapRef}
      dir="rtl"
      className={['relative inline-flex items-center gap-3 select-none', className].filter(Boolean).join(' ')}
      // Hover (desktop) + focus open/close
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setIsOpen(false);
      }}
    >
      {/* Trigger: circular 'ب' badge (button for a11y + mobile tap) */}
      <motion.button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="name-sitemap-menu"
        onClick={() => setIsOpen((v) => !v)} // tap/click toggle
        className="relative grid place-items-center rounded-full bg-brand text-white font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        style={{ width: 44, height: 44 }}
        animate={prefersReduced ? { x: 0 } : { x: isOpen ? circleTravel : 0 }}
        transition={prefersReduced ? { duration: 0 } : spring}
      >
        <span className="text-xl leading-none font-urdu-heading">ب</span>
      </motion.button>

      {/* Full name (revealed on hover/tap) */}
      <div className="overflow-hidden pr-3">
        <motion.span
          ref={textRef}
          className="inline-block text-3xl font-extrabold font-urdu-heading whitespace-nowrap"
          style={{ originX: 1 }} // RTL: reveal from right edge
          initial={false}
          animate={
            prefersReduced
              ? { opacity: 1, scaleX: isOpen ? 1 : 0 }
              : {
                  opacity: isOpen ? 1 : 0.2,
                  scaleX: isOpen ? 1 : 0,
                  filter: isOpen ? 'blur(0px)' : 'blur(0.8px)',
                  letterSpacing: isOpen ? '0.02em' : '0.1em'
                }
          }
          transition={{ duration, ...spring }}
        >
          عبدالباسط ظفر
        </motion.span>
      </div>

      {/* Dropdown sitemap (mega-menu style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="name-sitemap-menu"
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18 } }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.12 } }}
            className="absolute top-full mt-3 right-0 z-50 w-[min(92vw,680px)] rounded-2xl border border-black/10 bg-white shadow-xl ring-1 ring-black/5 p-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-semibold text-ink/80 mb-2 urdu-text">{section.title}</h4>
                  <ul className="space-y-1.5">
                    {section.items.map((it) => (
                      <li key={it.href}>
                        <Link
                          role="menuitem"
                          href={it.href}
                          className="group urdu-text inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[15px] text-ink hover:bg-[rgba(0,0,0,0.035)] hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="inline-block translate-y-[0.5px]">•</span>
                          <span>{it.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}