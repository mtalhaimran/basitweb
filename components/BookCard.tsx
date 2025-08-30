'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ArrowUpRight, Calendar, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Book } from '@/lib/data/content';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isUrdu = true;
  
  return (
    <motion.article 
      className="bg-white rounded-2xl p-6 shadow-sm border border-line hover:shadow-xl transition-all duration-300 group"
      data-pagefind-filter={`type:Book,year:${book.publishedYear}`}
      data-pagefind-meta={`title:${book.title},image:${book.coverImage},date:${book.publishedYear}`}
      whileHover={shouldReduceMotion ? {} : { 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
    >
      <div className="text-right">
        {/* Book Cover */}
        <div className="aspect-[3/4] relative overflow-hidden rounded-xl mb-6 bg-gray-100">
          <Image
            src={book.coverImage}
            alt={`${isUrdu && book.titleUrdu ? book.titleUrdu : book.title} cover`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 300px, (max-width: 1024px) 250px, 300px"
            unoptimized
          />
          
          {/* Year badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-gray-900">{book.publishedYear}</span>
          </div>
        </div>
        
        {/* Content */}
        <div>
          <div className="flex items-center gap-3 mb-4 text-sm flex-row-reverse justify-end">
            <BookOpen className="w-4 h-4 text-brand" />
            <span className="uppercase tracking-wide font-semibold text-brand urdu-text">
              کتاب
            </span>
            {book.buyLinks && (
              <>
                <span className="text-ink-muted">•</span>
                <div className="flex items-center gap-1 flex-row-reverse">
                  <Star className="w-3 h-3 text-brand" />
                  <span className="text-ink-muted urdu-text">
                    دستیاب
                  </span>
                </div>
              </>
            )}
          </div>

          <h3 className="text-xl font-bold mb-4 text-ink font-urdu-heading group-hover:text-brand transition-colors">
            {isUrdu && book.titleUrdu ? book.titleUrdu : book.title}
          </h3>
          
          <p className="text-ink-muted mb-6 leading-relaxed font-urdu-body">
            {isUrdu && book.descriptionUrdu ? book.descriptionUrdu : book.description}
          </p>

          {book.publisher && (
            <p className="text-sm text-ink-muted mb-6 urdu-text">
              ناشر: <span className="font-medium text-ink">{book.publisher}</span>
            </p>
          )}

          <motion.div
            whileHover={shouldReduceMotion ? {} : { x: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              href={`/books/${book.slug}`}
              className="inline-flex items-center text-brand hover:text-red-700 font-medium transition-colors group"
            >
              <span className="urdu-text">تفصیلات دیکھیں</span>
              <ArrowUpRight className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}