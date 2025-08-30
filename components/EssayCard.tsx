'use client';

import Link from 'next/link';
import { FileText, Clock, ArrowUpRight, Calendar } from 'lucide-react';
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
  const year = validDate ? d.getFullYear() : '';

  return (
    <motion.article
      className="bg-white rounded-2xl p-6 shadow-sm border border-line hover:shadow-xl transition-all duration-300 group"
      data-pagefind-filter={`type:Essay${year ? `,year:${year}` : ''}`}
      data-pagefind-meta={`title:${essay.title},date:${essay.publishedDate}`}
      whileHover={shouldReduceMotion ? {} : { 
        y: -6,
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
    >
      <div className="text-right">
        <div className="flex items-center gap-3 mb-4 text-sm flex-row-reverse justify-end">
          <FileText className="w-4 h-4 text-brand" />
          <span className="uppercase tracking-wide font-semibold text-brand urdu-text">مضمون</span>
          <span className="text-ink-muted">•</span>
          <div className="flex items-center gap-1 flex-row-reverse">
            <Calendar className="w-3 h-3 text-ink-muted" />
            <span className="text-ink-muted urdu-text">
              {validDate
                ? new Intl.DateTimeFormat('ur-PK', { year: 'numeric', month: 'short', day: 'numeric' }).format(d)
                : ''}
            </span>
          </div>
          <span className="text-ink-muted">•</span>
          <div className="flex items-center gap-1 flex-row-reverse">
            <Clock className="w-3 h-3 text-ink-muted" />
            <span className="text-ink-muted urdu-text">{essay.readTime} منٹ</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4 text-ink font-urdu-heading group-hover:text-brand transition-colors">
          {isUrdu && essay.titleUrdu ? essay.titleUrdu : essay.title}
        </h3>

        <p className="text-ink-muted mb-6 leading-relaxed font-urdu-body">
          {isUrdu && essay.descriptionUrdu ? essay.descriptionUrdu : essay.description}
        </p>

        {essay.publication && (
          <div className="flex items-center gap-2 mb-6 flex-row-reverse justify-end">
            <span className="text-sm text-ink-muted urdu-text">شائع شدہ:</span>
            <span className="text-sm font-medium text-ink">{essay.publication}</span>
          </div>
        )}

        <div className="flex items-center justify-between flex-row-reverse">
          <motion.div
            whileHover={shouldReduceMotion ? {} : { x: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              href={`/writing/${essay.slug}`} 
              className="inline-flex items-center text-brand hover:text-red-700 font-medium transition-colors group"
            >
              <span className="urdu-text">پڑھیں</span>
              <ArrowUpRight className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="flex flex-wrap gap-2 flex-row-reverse">
            {(essay.tags ?? []).slice(0, 2).map((tag) => (
              <motion.span
                key={tag}
                className="inline-flex items-center px-3 py-1 text-xs bg-surface-muted text-ink-muted rounded-lg"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}