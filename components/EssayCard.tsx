'use client';

import Link from 'next/link';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Essay } from '@/lib/data/content';

interface EssayCardProps {
  essay: Essay;
}

export function EssayCard({ essay }: EssayCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isUrdu = true;

  const d = new Date(essay.publishedDate);
  const validDate = !Number.isNaN(d.getTime());

  return (
    <motion.article
      className="project-card group"
      data-pagefind-filter={`type:Essay${validDate ? `,year:${d.getUTCFullYear()}` : ''}`}
      data-pagefind-meta={`title:${essay.title},date:${essay.publishedDate}`}
      whileHover={shouldReduceMotion ? {} : { 
        y: -6,
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
    >
      <div className="p-6 text-right">
        <div className="flex items-center gap-4 mb-4 text-sm flex-row-reverse justify-end">
          <div className="flex items-center gap-1 flex-row-reverse">
            <Calendar className="w-3 h-3 text-brand" />
            <span className="template-caption urdu-text">
              {validDate
                ? new Intl.DateTimeFormat('ur-PK', {
                    timeZone: 'UTC',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }).format(d)
                : ''}
            </span>
          </div>
          <span className="text-ink-muted">•</span>
          <div className="flex items-center gap-1 flex-row-reverse">
            <Clock className="w-3 h-3 text-brand" />
            <span className="template-caption urdu-text">{essay.readTime} منٹ</span>
          </div>
        </div>

        <h3 className="template-subheading urdu-heading mb-4 group-hover:text-brand-hover transition-colors">
          {isUrdu && essay.titleUrdu ? essay.titleUrdu : essay.title}
        </h3>

        <p className="template-body urdu-text mb-6 leading-relaxed">
          {isUrdu && essay.descriptionUrdu ? essay.descriptionUrdu : essay.description}
        </p>

        <motion.div
          whileHover={shouldReduceMotion ? {} : { x: -8 }}
          transition={{ duration: 0.2 }}
        >
          <Link 
            href={`/writing/${essay.slug}`} 
            className="inline-flex items-center template-link group"
          >
            <span className="urdu-text">پڑھیں</span>
            <ArrowUpRight className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}