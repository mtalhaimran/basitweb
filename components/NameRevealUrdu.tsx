'use client';

import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
// Optional icons for nicer list items (feel free to remove if you don't use them)
import { BookOpen, PenLine, Layers, User2, Mail, Sparkles } from 'lucide-react';

type MenuItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;     // optional: <Icon className="w-3.5 h-3.5" />
  thumb?: string;             // optional: /thumbs/xyz.jpg
  badge?: string;             // optional: e.g. "New"
};
type Section = { title: string; items: MenuItem[] };

type NameRevealProps = {
  className?: string;
  reducedMotion?: boolean;
  sections?: Section[];       // override the defaults if you want
};

/** Curated, minimal sitemap (no Languages block) */
const DEFAULT_SECTIONS: Section[] = [
  {
    title: 'صفحہ جات',
    items: [
      { label: 'Home', href: '/', icon: <Sparkles className="w-3.5 h-3.5" /> },
      { label: 'Work', href: '/work', icon: <Layers className="w-3.5 h-3.5" /> },
      { label: 'Writing', href: '/writing', icon: <PenLine className="w-3.5 h-3.5" /> },
      { label: 'Books', href: '/books', icon: <BookOpen className="w-3.5 h-3.5" /> },
      { label: 'About', href: '/about', icon: <User2 className="w-3.5 h-3.5" /> },
      { label: 'Contact', href: '/contact', icon: <Mail className="w-3.5 h-3.5" /> }
    ]
  },
  {
    title: 'نمایاں',
    items: [
      { label: 'Bonn-ka-Banjara', href: '/bonn-ka-banjara' },
      // مزید نمایاں سیریز/پروجیکٹس یہاں شامل کریں
    ]
  }
];

export default function NameRevealUrdu({
  className,
  reducedMotion,
  sections = DEFAULT_SECTIONS
}: NameRevealProps) {
  const [open, setOpen] = useState(false);
  const [textW, setTextW] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const prefersReduced = reducedMotion ?? useReducedMotion();

  // Measure the full-name width so the badge can travel that distance
  useEffect(() => {
    const measure = () => {
      const el = textRef.current;
      if (!el) return;
      setTextW(el.getBoundingClientRect().width);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Close on outside click / Escape
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
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
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => { if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false); }}
    >
      {/* Trigger: round badge with 'ب' — spins 360° + slides when opening */}
      <motion.button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="name-sitemap-menu"
        onClick={() => setOpen(v => !v)}
        className="relative grid place-items-center rounded-full bg-brand text-white font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        style={{ width: 48, height: 48 }}
        animate={
          prefersReduced
            ? { x: 0, rotate: 0 }
            : { x: open ? circleTravel : 0, rotate: open ? 360 : 0 }
        }
        transition={prefersReduced ? { duration: 0 } : spring}
      >
        <span className="text-xl leading-none font-urdu-heading">ب</span>
      </motion.button>

      {/* Full name reveal */}
      <div className="overflow-hidden pr-3">
        <motion.span
          ref={textRef}
          className="inline-block text-3xl md:text-4xl font-extrabold font-urdu-heading whitespace-nowrap"
          style={{ originX: 1 }} // reveal from right edge (RTL)
          initial={false}
          animate={
            prefersReduced
              ? { opacity: 1, scaleX: open ? 1 : 0 }
              : { opacity: open ? 1 : 0.2, scaleX: open ? 1 : 0, filter: open ? 'blur(0px)' : 'blur(0.8px)', letterSpacing: open ? '0.02em' : '0.1em' }
          }
          transition={{ duration, ...spring }}
        >
          عبدالباسط ظفر
        </motion.span>
      </div>

      {/* Dropdown mega-menu (polished look) */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="name-sitemap-menu"
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18 } }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.12 } }}
            className="absolute top-full mt-3 right-0 z-50 w-[min(92vw,760px)] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl ring-1 ring-black/5"
          >
            {/* Decorative header strip */}
            <div className="h-1.5 w-full bg-gradient-to-l from-brand/30 via-brand/15 to-transparent" />

            <div className="p-4 md:p-5 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sections.map((section) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.18 } }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-ink/80 urdu-text">{section.title}</h4>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-muted text-ink/70">{section.items.length}</span>
                    </div>

                    <ul className="space-y-1.5">
                      {section.items.map((it) => (
                        <li key={it.href}>
                          <Link
                            role="menuitem"
                            href={it.href}
                            onClick={() => setOpen(false)}
                            className="group urdu-text w-full inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[15px] text-ink hover:bg-[rgba(0,0,0,0.035)] hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                          >
                            {/* optional icon/thumb, else bullet */}
                            {it.thumb ? (
                              // thumbnail variant (small square)
                              <img src={it.thumb} alt="" className="w-5 h-5 rounded object-cover" />
                            ) : it.icon ? (
                              <span className="text-ink/70 group-hover:text-brand">{it.icon}</span>
                            ) : (
                              <span className="inline-block translate-y-[0.5px]">•</span>
                            )}

                            <span className="flex-1">{it.label}</span>

                            {/* optional badge */}
                            {it.badge && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand/10 text-brand">{it.badge}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}