import React from 'react';
import Link from 'next/link';
import { FileText, Clock, ArrowUpRight, Calendar, Tag } from 'lucide-react';
import type { Essay } from '@/lib/data/content';

interface EssayCardProps {
  essay: Essay;
  lang?: 'en' | 'ur';
}

export function EssayCard({ essay }: EssayCardProps) { // Removed lang prop as site is now primarily Urdu
  const isUrdu = true; // Always Urdu
  return (
    <article 
      className="minimal-card group"
      data-pagefind-filter={`type:Essay,year:${new Date(essay.publishedDate).getFullYear()}`}
      data-pagefind-meta={`title:${essay.title},date:${essay.publishedDate}`}
    >
      <div className={`${isUrdu ? 'text-right' : ''}`}>
        <div className={`flex items-center gap-3 mb-4 text-caption ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
          <FileText className="w-4 h-4 text-primary" /> {/* Use new primary color */}
          <span className={`uppercase tracking-wide font-semibold text-primary urdu-text`}> {/* Use new primary color */}
            مضمون
          </span>
          <span className="text-ink-light">•</span> {/* Use new ink-light */}
          <div className={`flex items-center gap-1 flex-row-reverse`}> {/* Always RTL */}
            <Calendar className="w-3 h-3 text-ink-light" /> {/* Use new ink-light */}
            <span className="text-ink-muted"> {/* Use new ink-muted */}
              {new Date(essay.publishedDate).toLocaleDateString('ur-PK', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          <span className="text-ink-light">•</span> {/* Use new ink-light */}
          <div className={`flex items-center gap-1 flex-row-reverse`}> {/* Always RTL */}
            <Clock className="w-3 h-3 text-ink-light" /> {/* Use new ink-light */}
            <span className={`text-ink-muted urdu-text`}> {/* Use new ink-muted */}
              {essay.readTime} منٹ
            </span>
          </div>
        </div>

        <h3 className={`card-title urdu-heading`}>
          {isUrdu && essay.titleUrdu ? essay.titleUrdu : essay.title}
        </h3>
        
        <p className={`text-ink-muted mb-6 leading-relaxed urdu-text`}> {/* Use new ink-muted */}
          {isUrdu && essay.descriptionUrdu ? essay.descriptionUrdu : essay.description}
        </p>

        {essay.publication && (
          <div className={`flex items-center gap-2 mb-6 ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
            <span className={`text-caption text-ink-muted urdu-text`}> {/* Use new ink-muted */}
              شائع شدہ:
            </span>
            <span className="text-sm font-medium text-ink">{essay.publication}</span> {/* Use new ink color */}
          </div>
        )}

        <div className={`flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <Link 
            href={`/writing/${essay.slug}`}
            className={`view-link urdu-text flex-row-reverse`}
          >
            <span>{isUrdu ? 'پڑھیں' : 'read'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <div className={`flex flex-wrap gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
            {essay.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} // Use new tag styling
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs bg-surface-muted text-ink-muted rounded-lg flex-row-reverse`} {/* Use new surface-muted and ink-muted */}
              >
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