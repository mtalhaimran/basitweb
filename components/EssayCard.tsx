import Link from 'next/link';
import { FileText, Clock, ExternalLink, Calendar, Tag, Award } from 'lucide-react';
import type { Essay } from '@/lib/data/content';

interface EssayCardProps {
  essay: Essay;
  lang?: 'en' | 'ur';
}

export function EssayCard({ essay, lang = 'en' }: EssayCardProps) {
  const isUrdu = lang === 'ur';
  
  return (
    <article 
      className="card-hover p-6 bg-surface group"
      data-pagefind-filter={`type:Essay,year:${new Date(essay.publishedDate).getFullYear()}`}
      data-pagefind-meta={`title:${essay.title},date:${essay.publishedDate}`}
    >
      <div className={`flex justify-between items-start mb-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center space-x-2 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <FileText className="w-4 h-4 text-brand" />
          <span className={`text-caption uppercase tracking-wide font-medium ${
            isUrdu ? 'urdu-body-sm' : ''
          }`}>
            {isUrdu ? 'مضمون' : 'Essay'}
          </span>
        </div>
        
        <div className={`flex items-center space-x-3 text-caption ${
          isUrdu ? 'flex-row-reverse space-x-reverse' : ''
        }`}>
          <div className={`flex items-center space-x-1 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Clock className="w-3 h-3" />
            <span className={isUrdu ? 'urdu-body-sm' : ''}>
              {essay.readTime} {isUrdu ? 'منٹ' : 'min'}
            </span>
          </div>
          <span>•</span>
          <div className={`flex items-center space-x-1 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(essay.publishedDate).toLocaleDateString(isUrdu ? 'ur-PK' : 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>

      <h3 className={`portfolio-title mb-3 line-clamp-2 ${
        isUrdu ? 'urdu-heading-3 text-right' : 'text-heading-3'
      }`}>
        {isUrdu && essay.titleUrdu ? essay.titleUrdu : essay.title}
      </h3>
      
      <p className={`text-ink-muted mb-4 line-clamp-3 ${
        isUrdu ? 'urdu-body-sm text-right' : 'text-body-sm'
      }`}>
        {isUrdu && essay.descriptionUrdu ? essay.descriptionUrdu : essay.description}
      </p>

      {essay.publication && (
        <div className={`flex items-center space-x-2 mb-4 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <Award className="w-3 h-3 text-brand" />
          <span className={`text-caption ${isUrdu ? 'urdu-body-sm' : ''}`}>
            {isUrdu ? 'میں شائع:' : 'Published in'} <span className="font-medium text-ink">{essay.publication}</span>
          </span>
        </div>
      )}

      <div className={`flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
        <Link 
          href={`${isUrdu ? '/ur' : ''}/writing/${essay.slug}`}
          className={`link text-sm font-medium ${isUrdu ? 'urdu-body-sm' : ''}`}
        >
          {isUrdu ? 'پڑھیں' : 'read'}
          <ExternalLink className={`w-3 h-3 inline ${isUrdu ? 'mr-1' : 'ml-1'}`} />
        </Link>

        <div className={`flex flex-wrap gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          {essay.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center space-x-1 px-2 py-1 text-xs bg-subtle text-ink-muted rounded-md border border-line"
            >
              <Tag className="w-2 h-2" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}