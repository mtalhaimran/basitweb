'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type NameRevealProps = {
  className?: string;
  reducedMotion?: boolean;
};

export default function NameRevealUrdu({ className, reducedMotion }: NameRevealProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  // Measure full-name width for the circle travel distance
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

  // Respect prefers-reduced-motion if not explicitly overridden
  const prefersReduced =
    reducedMotion ??
    (typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // Animation settings
  const duration = prefersReduced ? 0 : 0.28;
  const spring = { type: 'spring', stiffness: 380, damping: 30, mass: 0.6 };

  return (
    <motion.div
      dir="rtl"
      className={['relative inline-flex items-center select-none cursor-pointer', className].filter(Boolean).join(' ')}
      onHoverStart={() => setIsOpen(true)}
      onHoverEnd={() => setIsOpen(false)}
      onTap={() => setIsOpen((v) => !v)}
    >
      {/* Circle with the single glyph "ب" */}
      <motion.div
        aria-hidden
        className="grid place-items-center rounded-full bg-brand text-white font-bold z-10 relative"
        style={{ width: 44, height: 44 }}
        animate={
          prefersReduced
            ? { x: 0 }
            : { x: isOpen ? -(textWidth + 12) : 0 }
        }
        transition={prefersReduced ? { duration: 0 } : spring}
      >
        <span className="text-xl leading-none font-urdu-heading">ب</span>
      </motion.div>

      {/* Full name (revealed on hover/tap) */}
      <div className="overflow-hidden" style={{ width: 0 }}>
        {/* spacer only */}
      </div>
      <div className="overflow-hidden pr-3">
        <motion.span
          ref={textRef}
          className="inline-block text-3xl font-extrabold font-urdu-heading whitespace-nowrap"
          style={{ originX: 1 }}
          initial={false}
          animate={
            prefersReduced
              ? { opacity: 1, scaleX: isOpen ? 1 : 0 }
              : {
                  opacity: isOpen ? 1 : 0.2,
                  scaleX: isOpen ? 1 : 0,
                  filter: isOpen ? 'blur(0px)' : 'blur(0.8px)',
                  letterSpacing: isOpen ? '0.02em' : '0.1em',
                }
          }
          transition={{ duration, ...spring }}
        >
          عبدالباسط ظفر
        </motion.span>
      </div>
    </motion.div>
  );
}