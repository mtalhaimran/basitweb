import Link from 'next/link';
import Image from 'next/image';
import { Book as BookIcon, ExternalLink } from 'lucide-react';
import type { Book } from '@/lib/data/content';

interface BookCardProps {
  book: Book;
  lang?: 'en' | 'ur';
}

export function BookCard({ book, lang = 'en' }: BookCardProps) {
  const isUrdu = lang === 'ur';
  
  return (
    <div 
      className="group border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
      data-pagefind-filter={`type:Book,year:${book.publishedYear}`}
      data-pagefind-meta={`title:${book.title},image:${book.coverImage},date:${book.publishedYear}`}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-muted">
        <Image
          src={book.coverImage}
          alt={`${book.title} cover`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
      </div>
      
      <div className="p-6">
        <div className={`flex justify-between items-start mb-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-2 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <BookIcon className="w-4 h-4 text-muted-foreground" />
            <span className={`text-xs font-medium text-muted-foreground uppercase ${isUrdu ? 'urdu-text' : ''}`}>
              {isUrdu ? 'کتاب' : 'Book'}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {book.publishedYear}
          </span>
        </div>

        <h3 className={`text-lg font-semibold mb-2 group-hover:text-primary transition-colors ${
          isUrdu ? 'urdu-heading text-right' : ''
        }`}>
          {isUrdu && book.titleUrdu ? book.titleUrdu : book.title}
        </h3>
        
        <p className={`text-muted-foreground text-sm mb-4 leading-relaxed ${
          isUrdu ? 'urdu-text text-right' : ''
        }`}>
          {isUrdu && book.descriptionUrdu ? book.descriptionUrdu : book.description}
        </p>

        <Link 
          href={`${isUrdu ? '/ur' : ''}/books/${book.slug}`}
          className={`inline-flex items-center text-sm font-medium text-primary hover:underline ${
            isUrdu ? 'flex-row-reverse urdu-text' : ''
          }`}
        >
          {isUrdu ? 'تفصیل دیکھیں' : 'Read More'}
          <ExternalLink className={`w-3 h-3 ${isUrdu ? 'mr-1' : 'ml-1'}`} />
        </Link>
      </div>
    </div>
  );
}