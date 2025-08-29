import Link from 'next/link';
import Image from 'next/image';
import { Book as BookIcon, ExternalLink, Calendar, Star } from 'lucide-react';
import type { Book } from '@/lib/data/content';

interface BookCardProps {
  book: Book;
  lang?: 'en' | 'ur';
}

export function BookCard({ book, lang = 'en' }: BookCardProps) {
  const isUrdu = lang === 'ur';
  
  return (
    <article 
      className="group card-hover border rounded-xl overflow-hidden bg-card"
      data-pagefind-filter={`type:Book,year:${book.publishedYear}`}
      data-pagefind-meta={`title:${book.title},image:${book.coverImage},date:${book.publishedYear}`}
    >
      {/* Book Cover */}
      <div className="aspect-[3/4] relative overflow-hidden bg-muted">
        <Image
          src={book.coverImage}
          alt={`${book.title} cover`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className={`flex justify-between items-start mb-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-2 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <BookIcon className="w-4 h-4 text-primary" />
            <span className={`text-xs font-medium text-primary uppercase tracking-wide ${
              isUrdu ? 'font-urdu-body' : ''
            }`}>
              {isUrdu ? 'کتاب' : 'Book'}
            </span>
          </div>
          <div className={`flex items-center space-x-1 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {book.publishedYear}
            </span>
          </div>
        </div>

        <h3 className={`text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 ${
          isUrdu ? 'font-urdu-heading text-right' : ''
        }`}>
          {isUrdu && book.titleUrdu ? book.titleUrdu : book.title}
        </h3>
        
        <p className={`text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3 ${
          isUrdu ? 'font-urdu-body text-right' : ''
        }`}>
          {isUrdu && book.descriptionUrdu ? book.descriptionUrdu : book.description}
        </p>

        {book.publisher && (
          <p className={`text-xs text-muted-foreground mb-4 ${isUrdu ? 'font-urdu-body text-right' : ''}`}>
            {isUrdu ? 'ناشر:' : 'Published by'} <span className="font-medium">{book.publisher}</span>
          </p>
        )}

        <div className={`flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <Link 
            href={`${isUrdu ? '/ur' : ''}/books/${book.slug}`}
            className={`inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm focus-ring ${
              isUrdu ? 'flex-row-reverse font-urdu-body' : ''
            }`}
          >
            {isUrdu ? 'تفصیل دیکھیں' : 'Read More'}
            <ExternalLink className={`w-3 h-3 ${isUrdu ? 'mr-2' : 'ml-2'}`} />
          </Link>

          {book.buyLinks && (
            <div className={`flex items-center space-x-1 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-muted-foreground">
                {isUrdu ? 'دستیاب' : 'Available'}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}