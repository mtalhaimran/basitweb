'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function NameRevealUrdu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const homeHref = '/'; // Always link to the root

  useEffect(() => {
    const measure = () => {
      if (textRef.current) {
        setTextWidth(textRef.current.getBoundingClientRect().width);
      }
    };
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

  const transition = { duration: 0.4, ease: [0.4, 0, 0.2, 1] };

  return (
    <div
      className={['relative flex items-center', className].join(' ')}
      onMouseEnter={openWithDelay}
      onMouseLeave={closeWithDelay}
    >
      <div className="flex items-center flex-row-reverse gap-4">
        <Link href={homeHref} aria-label="Homepage" className="relative z-10">
          <motion.div
            aria-haspopup="menu"
            aria-expanded={open}
            className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white font-bold shadow-md"
            animate={{ rotate: open ? 360 : 0 }}
            transition={transition}
          >
            <span className="text-xl leading-none font-urdu-heading">ب</span>
          </motion.div>
        </Link>
        <motion.div
          style={{ width: open ? textWidth : 0 }}
          className="overflow-hidden"
          animate={{ opacity: open ? 1 : 0 }}
          transition={transition}
        >
          <span
            ref={textRef}
            className="block text-3xl font-extrabold font-urdu-heading whitespace-nowrap text-brand"
          >
            عبدالباسط ظفر
          </span>
        </motion.div>
      </div>
      
      {/* The dropdown can be re-added here if you want it */}
    </div>
  );
}