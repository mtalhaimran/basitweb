'use client';

import Link from 'next/link';
import { FileText, Clock, ArrowUpRight, Calendar, Tag } from 'lucide-react';
import type { Essay } from '@/lib/data/content';

interface EssayCardProps {
  essay: Essay;
}

export function EssayCard({ essay }: EssayCardProps) {
  const isUrdu = true;

  // Date guard (avoids RangeError: Invalid time value if publishedDate is bad)
  const d = new Date(essay.publishedDate as any);
  const validDate = !Number.isNaN(d.getTime());
  const year = validDate ? d.getFullYear() : '';

  return (
    <article
      className="minimal-card group"
      data-pagefind-filter={`type:Essay${year ? `,year:${year}` : ''}`}
      data-pagefind-meta={`title:${essay.title},date:${essay.publishedDate}`}
    >
      <div className={isUrdu ? 'text-right' : ''}>
        <div className={`flex items-center gap-3 mb-4 text-caption ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
          <FileText className="w-4 h-4 text-primary" />
          {/* label */}
          <span className="uppercase tracking-wide font-semibold text-primary urdu-text">مضمون</span>
          <span className="text-ink-light">•</span>
          <div className="flex items-center gap-1 flex-row-reverse">
            <Calendar className="w-3 h-3 text-ink-light" />
            <span className="text-ink-muted">
              {validDate
                ? new Intl.DateTimeFormat('ur-PK', { year: 'numeric', month: 'short', day: 'numeric' }).format(d)
                : ''}
            </span>
          </div>
          <span className="text-ink-light">•</span>
          <div className="flex items-center gap-1 flex-row-reverse">
            <Clock className="w-3 h-3 text-ink-light" />
            <span className="text-ink-muted urdu-text">{essay.readTime} منٹ</span>
          </div>
        </div>

        {/* put title text on the element itself */}
        <h3 className="card-title urdu-heading">
          {isUrdu && essay.titleUrdu ? essay.titleUrdu : essay.title}
        </h3>

        <p className="text-ink-muted mb-6 leading-relaxed urdu-text">
          {isUrdu && essay.descriptionUrdu ? essay.descriptionUrdu : essay.description}
        </p>

        {essay.publication && (
          <div className={`flex items-center gap-2 mb-6 ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="text-caption text-ink-muted urdu-text">شائع شدہ:</span>
            <span className="text-sm font-medium text-ink">{essay.publication}</span>
          </div>
        )}

        <div className={`flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <Link href={`/writing/${essay.slug}`} className="view-link urdu-text flex-row-reverse">
            <span>{isUrdu ? 'پڑھیں' : 'read'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <div className={`flex flex-wrap gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
            {(essay.tags ?? []).slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-surface-muted text-ink-muted rounded-lg flex-row-reverse"
              >
                {/* tag chip */}
                <Tag className="w-2 h-2" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}