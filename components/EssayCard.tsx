import Link from 'next/link';
import { FileText, Clock, ExternalLink, Calendar, Tag } from 'lucide-react';
import type { Essay } from '@/lib/data/content';

interface EssayCardProps {
  essay: Essay;
}

export function EssayCard({ essay }: EssayCardProps) {
  return (
    <article 
      className="portfolio-card group"
      data-pagefind-filter={`type:Essay,year:${new Date(essay.publishedDate).getFullYear()}`}
      data-pagefind-meta={`title:${essay.title},date:${essay.publishedDate}`}
    >
      <div className="flex items-center space-x-2 mb-4 text-caption">
        <FileText className="w-4 h-4 text-red-600" />
        <span className="uppercase tracking-wide font-semibold text-red-600">Essay</span>
        <span className="text-gray-400">•</span>
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3 text-gray-400" />
          <span className="text-gray-500">
            {new Date(essay.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
        <span className="text-gray-400">•</span>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-gray-500">{essay.readTime} min</span>
        </div>
      </div>

      <h3 className="portfolio-title mb-4">
        {essay.title}
      </h3>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        {essay.description}
      </p>

      {essay.publication && (
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-caption text-gray-500">Published in</span>
          <span className="text-sm font-medium text-gray-700">{essay.publication}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Link 
          href={`/writing/${essay.slug}`}
          className="link text-sm font-semibold group"
        >
          read
          <ExternalLink className="w-3 h-3 inline ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="flex flex-wrap gap-2">
          {essay.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
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