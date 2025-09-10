'use client';

import { motion } from 'framer-motion';
import { BookOpen, Star, PenTool, Milestone } from 'lucide-react'; // Example icons

interface TimelineIconProps {
  iconName: 'milestone' | 'book' | 'writing' | 'quote';
}

const icons = {
  milestone: Milestone,
  book: BookOpen,
  writing: PenTool,
  quote: Star,
};

export function TimelineIcon({ iconName }: TimelineIconProps) {
  const Icon = icons[iconName];

  return (
    <motion.div
      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-surface shadow-md ring-4 ring-brand-light"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Icon className="h-6 w-6 text-brand" />
    </motion.div>
  );
}