import Link from 'next/link';
import { FileText, Clock, ExternalLink } from 'lucide-react';
import type { Essay } from '@/lib/data/content';

interface EssayCardProps {
  essay: Essay;
  lang?: 'en' | 'ur';
}

export function EssayCard({ essay, lang = 'en' }: EssayCardProps) {
  const isUrdu = lang === 'ur';
  
  return (
    <article 
      className="group border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
      data-pagefind-filter={`type:Essay,year:${new Date(essay.publishedDate).getFullYear()}`}
      data-pagefind-meta={`title:${essay.title},date:${essay.publishedDate}`}
    >
      <div className={`flex justify-between items-start mb-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center space-x-2 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <FileText className="w-4 h-4 text-muted-foreground" />
          <span className={`text-xs font-medium text-muted-foreground uppercase ${isUrdu ? 'urdu-text' : ''}`}>
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
          <span>
            {new Date(essay.publishedDate).toLocaleDateString(isUrdu ? 'ur-PK' : 'en-US')}
          </span>
        </div>
      </div>

      <h3 className={`text-xl font-semibold mb-3 group-hover:text-primary transition-colors ${
        isUrdu ? 'urdu-heading text-right' : ''
      }`}>
        {isUrdu && essay.titleUrdu ? essay.titleUrdu : essay.title}
      </h3>
      
      <p className={`text-muted-foreground mb-4 leading-relaxed ${
        isUrdu ? 'urdu-text text-right' : ''
      }`}>
        {isUrdu && essay.descriptionUrdu ? essay.descriptionUrdu : essay.description}
      </p>

      {essay.publication && (
        <p className={`text-xs text-muted-foreground mb-4 ${isUrdu ? 'urdu-text text-right' : ''}`}>
          {isUrdu ? 'میں شائع' : 'Published in'} <span className="font-medium">{essay.publication}</span>
        </p>
      )}

      <div className={`flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
        <Link 
          href={`${isUrdu ? '/ur' : ''}/writing/${essay.slug}`}
          className={`inline-flex items-center text-sm font-medium text-primary hover:underline ${
            isUrdu ? 'flex-row-reverse urdu-text' : ''
          }`}
        >
          {isUrdu ? 'پڑھیں' : 'Read'}
          <ExternalLink className={`w-3 h-3 ${isUrdu ? 'mr-1' : 'ml-1'}`} />
        </Link>

        <div className={`flex flex-wrap gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          {essay.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}