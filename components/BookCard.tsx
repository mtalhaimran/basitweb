import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ExternalLink, Calendar, Star, Award } from 'lucide-react';
import type { Book } from '@/lib/data/content';

interface BookCardProps {
  book: Book;
  lang?: 'en' | 'ur';
}

export function BookCard({ book, lang = 'en' }: BookCardProps) {
  const isUrdu = lang === 'ur';
  
  return (
    <article 
      className="card-hover overflow-hidden bg-surface group"
      data-pagefind-filter={`type:Book,year:${book.publishedYear}`}
      data-pagefind-meta={`title:${book.title},image:${book.coverImage},date:${book.publishedYear}`}
    >
      {/* Book Cover */}
      <div className="aspect-[3/4] relative overflow-hidden bg-subtle">
        <picture>
          <source 
            media="(min-width: 768px)" 
            srcSet={`${book.coverImage}&w=400&h=533&fit=crop 400w`}
            sizes="(min-width: 768px) 400px"
          />
          <Image
            src={`${book.coverImage}&w=300&h=400&fit=crop`}
            alt={`${isUrdu && book.titleUrdu ? book.titleUrdu : book.title} cover`}
            width={300}
            height={400}
            className="book-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </picture>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Year badge */}
        <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded-md">
          <span className="text-xs font-medium text-ink">{book.publishedYear}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className={`flex justify-between items-start mb-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-2 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <BookOpen className="w-4 h-4 text-brand" />
            <span className={`text-caption uppercase tracking-wide font-medium ${
              isUrdu ? 'urdu-body-sm' : ''
            }`}>
              {isUrdu ? 'کتاب' : 'Book'}
            </span>
          </div>
          
          {book.buyLinks && (
            <div className={`flex items-center space-x-1 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Star className="w-3 h-3 text-brand" />
              <span className={`text-caption ${isUrdu ? 'urdu-body-sm' : ''}`}>
                {isUrdu ? 'دستیاب' : 'Available'}
              </span>
            </div>
          )}
        </div>

        <h3 className={`portfolio-title mb-3 line-clamp-2 ${
          isUrdu ? 'urdu-heading-3 text-right' : 'text-heading-3'
        }`}>
          {isUrdu && book.titleUrdu ? book.titleUrdu : book.title}
        </h3>
        
        <p className={`text-ink-muted mb-4 line-clamp-3 ${
          isUrdu ? 'urdu-body-sm text-right' : 'text-body-sm'
        }`}>
          {isUrdu && book.descriptionUrdu ? book.descriptionUrdu : book.description}
        </p>

        {book.publisher && (
          <p className={`text-caption mb-4 ${isUrdu ? 'urdu-body-sm text-right' : ''}`}>
            {isUrdu ? 'ناشر:' : 'Published by'} <span className="font-medium text-ink">{book.publisher}</span>
          </p>
        )}

        <div className={`flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <Link 
            href={`${isUrdu ? '/ur' : ''}/books/${book.slug}`}
            className={`btn btn-primary text-sm ${isUrdu ? 'urdu-body-sm' : ''}`}
          >
            {isUrdu ? 'تفصیل' : 'Details'}
            <ExternalLink className={`w-3 h-3 ${isUrdu ? 'mr-2' : 'ml-2'}`} />
          </Link>

          {book.isbn && (
            <span className={`text-caption ${isUrdu ? 'urdu-body-sm' : ''}`}>
              ISBN: {book.isbn.slice(-4)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}