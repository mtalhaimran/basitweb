import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ExternalLink, Calendar, Star } from 'lucide-react';
import type { Book } from '@/lib/data/content';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <article 
      className="portfolio-card group"
      data-pagefind-filter={`type:Book,year:${book.publishedYear}`}
      data-pagefind-meta={`title:${book.title},image:${book.coverImage},date:${book.publishedYear}`}
    >
      {/* Book Cover */}
      <div className="aspect-[3/4] relative overflow-hidden rounded-2xl mb-8 bg-gray-100">
        <Image
          src={book.coverImage}
          alt={`${book.title} cover`}
          fill
          className="book-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        
        {/* Year badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-xs font-semibold text-gray-900">{book.publishedYear}</span>
        </div>
      </div>
      
      {/* Content */}
      <div>
        <div className="flex items-center space-x-2 mb-4 text-caption">
          <BookOpen className="w-4 h-4 text-red-600" />
          <span className="uppercase tracking-wide font-semibold text-red-600">Book</span>
          {book.buyLinks && (
            <>
              <span className="text-gray-400">•</span>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-red-500" />
                <span className="text-gray-500">Available</span>
              </div>
            </>
          )}
        </div>

        <h3 className="portfolio-title mb-4">
          {book.title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {book.description}
        </p>

        {book.publisher && (
          <p className="text-caption text-gray-500 mb-6">
            Published by <span className="font-medium text-gray-700">{book.publisher}</span>
          </p>
        )}

        <Link 
          href={`/books/${book.slug}`}
          className="btn btn-primary w-full group"
        >
          View Details
          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}