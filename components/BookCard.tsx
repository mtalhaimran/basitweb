import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ArrowUpRight, Calendar, Star } from 'lucide-react';
import type { Book } from '@/lib/data/content';

interface BookCardProps {
  book: Book;
  lang?: 'en' | 'ur';
}

export function BookCard({ book }: BookCardProps) { // Removed lang prop as site is now primarily Urdu
  const isUrdu = true; // Always Urdu
  return (
    <article 
      className="minimal-card group"
      data-pagefind-filter={`type:Book,year:${book.publishedYear}`}
      data-pagefind-meta={`title:${book.title},image:${book.coverImage},date:${book.publishedYear}`}
    >
      <div className={`${isUrdu ? 'text-right' : ''}`}>
        {/* Book Cover */}
        <div className="aspect-[3/4] relative overflow-hidden rounded-2xl mb-8 bg-gray-100">
          <Image
            src={book.coverImage}
            alt={`${isUrdu && book.titleUrdu ? book.titleUrdu : book.title} cover`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          
          {/* Year badge */}
          <div className={`absolute top-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full left-4`}> {/* Always RTL */}
            <span className="text-xs font-semibold text-gray-900">{book.publishedYear}</span>
          </div>
        </div>
        
        {/* Content */}
        <div>
          <div className={`flex items-center gap-3 mb-4 text-caption ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
            <BookOpen className="w-4 h-4 text-primary" /> {/* Use new primary color */}
            <span className={`uppercase tracking-wide font-semibold text-primary urdu-text`}> {/* Use new primary color */}
              کتاب
            </span>
            {book.buyLinks && (
              <>
                <span className="text-ink-light">•</span> {/* Use new ink-light */}
                <div className={`flex items-center gap-1 flex-row-reverse`}> {/* Always RTL */}
                  <Star className="w-3 h-3 text-primary-500" /> {/* Use new primary-500 */}
                  <span className={`text-ink-muted urdu-text`}> {/* Use new ink-muted */}
                    دستیاب
                  </span>
                </div>
              </>
            )}
          </div>

          <h3 className={`card-title urdu-heading`}>
            {isUrdu && book.titleUrdu ? book.titleUrdu : book.title}
          </h3>
          
          <p className={`text-ink-muted mb-6 leading-relaxed urdu-text`}> {/* Use new ink-muted */}
            {isUrdu && book.descriptionUrdu ? book.descriptionUrdu : book.description}
          </p>

          {book.publisher && (
            <p className={`text-caption text-gray-500 mb-6 ${isUrdu ? 'urdu-text' : ''}`}>
              {isUrdu ? 'ناشر:' : 'Published by'} <span className="font-medium text-gray-700">{book.publisher}</span>
            </p>
          )}

          <Link 
            href={`/books/${book.slug}`}
            className={`view-link urdu-text flex-row-reverse`}
          >
            <span>{isUrdu ? 'تفصیلات دیکھیں' : 'View Details'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}