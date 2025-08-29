import Link from 'next/link';
import { FileText, Clock, ArrowUpRight, Calendar, Tag } from 'lucide-react';
import type { Essay } from '@/lib/data/content';

interface EssayCardProps {
  essay: Essay;
  lang?: 'en' | 'ur';
}

export function EssayCard({ essay, lang = 'en' }: EssayCardProps) {
  const isUrdu = lang === 'ur';

  return (
    <article 
      className="minimal-card group"
      data-pagefind-filter={`type:Essay,year:${new Date(essay.publishedDate).getFullYear()}`}
      data-pagefind-meta={`title:${essay.title},date:${essay.publishedDate}`}
    >
      <div className={`${isUrdu ? 'text-right' : ''}`}>
        <div className={`flex items-center gap-3 mb-4 text-caption ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
          <FileText className="w-4 h-4 text-red-600" />
          <span className={`uppercase tracking-wide font-semibold text-red-600 ${isUrdu ? 'urdu-text' : ''}`}>
            {isUrdu ? 'مضمون' : 'Essay'}
          </span>
          <span className="text-gray-400">•</span>
          <div className={`flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="text-gray-500">
              {new Date(essay.publishedDate).toLocaleDateString(isUrdu ? 'ur-PK' : 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          <span className="text-gray-400">•</span>
          <div className={`flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
            <Clock className="w-3 h-3 text-gray-400" />
            <span className={`text-gray-500 ${isUrdu ? 'urdu-text' : ''}`}>
              {essay.readTime} {isUrdu ? 'منٹ' : 'min'}
            </span>
          </div>
        </div>

        <h3 className={`card-title ${isUrdu ? 'urdu-heading' : ''}`}>
          {isUrdu && essay.titleUrdu ? essay.titleUrdu : essay.title}
        </h3>
        
        <p className={`text-gray-600 mb-6 leading-relaxed ${isUrdu ? 'urdu-text' : ''}`}>
          {isUrdu && essay.descriptionUrdu ? essay.descriptionUrdu : essay.description}
        </p>

        {essay.publication && (
          <div className={`flex items-center gap-2 mb-6 ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
            <span className={`text-caption text-gray-500 ${isUrdu ? 'urdu-text' : ''}`}>
              {isUrdu ? 'شائع شدہ:' : 'Published in'}
            </span>
            <span className="text-sm font-medium text-gray-700">{essay.publication}</span>
          </div>
        )}

        <div className={`flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <Link 
            href={`/writing/${essay.slug}`}
            className={`view-link ${isUrdu ? 'urdu-text flex-row-reverse' : ''}`}
          >
            <span>{isUrdu ? 'پڑھیں' : 'read'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <div className={`flex flex-wrap gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
            {essay.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg ${isUrdu ? 'flex-row-reverse' : ''}`}
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