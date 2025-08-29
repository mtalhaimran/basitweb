import Link from 'next/link';
import { FileText, Clock, ExternalLink, Calendar, Tag } from 'lucide-react';
import type { Essay } from '@/lib/data/content';

interface EssayCardProps {
  essay: Essay;
  lang?: 'en' | 'ur';
}

export function EssayCard({ essay, lang = 'en' }: EssayCardProps) {
  const isUrdu = lang === 'ur';
  
  return (
    <article 
      className="group card-hover border rounded-xl p-6 bg-card"
      data-pagefind-filter={`type:Essay,year:${new Date(essay.publishedDate).getFullYear()}`}
      data-pagefind-meta={`title:${essay.title},date:${essay.publishedDate}`}
    >
      <div className={`flex justify-between items-start mb-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center space-x-2 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <FileText className="w-4 h-4 text-primary" />
          <span className={`text-xs font-medium text-primary uppercase tracking-wide ${
            isUrdu ? 'font-urdu-body' : ''
          }`}>
            {isUrdu ? 'مضمون' : 'Essay'}
          </span>
        </div>
        
        <div className={`flex items-center space-x-3 text-xs text-muted-foreground ${
          isUrdu ? 'flex-row-reverse space-x-reverse' : ''
        }`}>
          <div className={`flex items-center space-x-1 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Clock className="w-3 h-3" />
            <span>{essay.readTime} {isUrdu ? 'منٹ' : 'min'}</span>
          </div>
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

      <h3 className={`text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 ${
        isUrdu ? 'font-urdu-heading text-right' : ''
      }`}>
        {isUrdu && essay.titleUrdu ? essay.titleUrdu : essay.title}
      </h3>
      
      <p className={`text-muted-foreground mb-4 leading-relaxed line-clamp-3 ${
        isUrdu ? 'font-urdu-body text-right' : ''
      }`}>
        {isUrdu && essay.descriptionUrdu ? essay.descriptionUrdu : essay.description}
      </p>

      {essay.publication && (
        <p className={`text-xs text-muted-foreground mb-4 ${isUrdu ? 'font-urdu-body text-right' : ''}`}>
          {isUrdu ? 'میں شائع:' : 'Published in'} <span className="font-medium">{essay.publication}</span>
        </p>
      )}

      <div className={`flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
        <Link 
          href={`${isUrdu ? '/ur' : ''}/writing/${essay.slug}`}
          className={`inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm focus-ring ${
            isUrdu ? 'flex-row-reverse font-urdu-body' : ''
          }`}
        >
          {isUrdu ? 'پڑھیں' : 'Read'}
          <ExternalLink className={`w-3 h-3 ${isUrdu ? 'mr-2' : 'ml-2'}`} />
        </Link>

        <div className={`flex flex-wrap gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          {essay.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center space-x-1 px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
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