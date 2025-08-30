'use client';

import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BookOpen, PenLine, Layers, User2, Mail, Sparkles } from 'lucide-react';

type MenuItem = { label: string; href: string };
type Section = { title: string; items: MenuItem[] };

type Props = {
  className?: string;
  reducedMotion?: boolean;
  sections?: Section[];
};

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
  }
  
];

export default function NameRevealUrdu({ className, reducedMotion, sections = DEFAULT_SECTIONS }: Props) {
  const [open, setOpen] = useState(false);
  const [textW, setTextW] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // viewport-anchored menu position (right/top)
  const [menuTop, setMenuTop] = useState<number>(80); // default fallback

  const prefersReduced = reducedMotion ?? useReducedMotion();

  // measure full name width so the circle travels the exact distance
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

  // compute fixed menu top position from trigger
  const updateMenuTop = () => {
    const btn = triggerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    setMenuTop(rect.bottom + 12); // 12px gap below the badge
  };

  // open/close with hover intent (avoid flicker)
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const openWithDelay = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = window.setTimeout(() => {
      updateMenuTop();
      setOpen(true);
    }, 80);
  };
  const closeWithDelay = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  // cleanup timers
  useEffect(() => () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  // close on outside click / Esc
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', updateMenuTop, true);
    window.addEventListener('resize', updateMenuTop);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', updateMenuTop, true);
      window.removeEventListener('resize', updateMenuTop);
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
      onFocus={openWithDelay}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) closeWithDelay();
      }}
    >
      {/* trigger: circular ب */}
      <motion.button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="name-sitemap-menu"
        onClick={() => { updateMenuTop(); setOpen((v) => !v); }} // tap/click toggle
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

      {/* full name reveal */}
      <div className="overflow-hidden pr-3">
        <motion.span
          ref={textRef}
          className="inline-block text-3xl md:text-4xl font-extrabold font-urdu-heading whitespace-nowrap"
          style={{ originX: 1 }}
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

      {/* dropdown menu: FIXED to viewport right */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="name-sitemap-menu"
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18 } }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.12 } }}
            // ⬇️ fixed to viewport right, under the trigger vertically
            style={{ position: 'fixed' as const, top: menuTop, right: 16 }}
            className="z-[70] w-[min(92vw,780px)] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl ring-1 ring-black/5"
            // keep open while hovering inside the menu to avoid flicker
            onMouseEnter={() => {
              if (closeTimer.current) window.clearTimeout(closeTimer.current);
            }}
            onMouseLeave={closeWithDelay}
          >
            <div className="h-1.5 w-full bg-gradient-to-l from-brand/30 via-brand/15 to-transparent" />
            <div className="p-4 md:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sections.map((section) => (
                  <div key={section.title}>
                    <div className="mb-2 flex items-center justify-between">
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
                            className="group urdu-text inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[15px] text-ink hover:bg-[rgba(0,0,0,0.035)] hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
