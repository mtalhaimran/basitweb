'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
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
      className="project-card group"
      data-pagefind-filter={`type:Book,year:${book.publishedYear}`}
      data-pagefind-meta={`title:${book.title},image:${book.coverImage},date:${book.publishedYear}`}
      whileHover={shouldReduceMotion ? {} : { 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
    >
      <div className="text-right">
        {/* Book Cover */}
        <div className="aspect-[3/4] relative overflow-hidden bg-surface-muted">
          <Image
            src={book.coverImage}
            alt={`${isUrdu && book.titleUrdu ? book.titleUrdu : book.title} cover`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 300px, (max-width: 1024px) 250px, 300px"
            unoptimized
          />
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="template-subheading urdu-heading mb-4 group-hover:text-brand-hover transition-colors">
            {isUrdu && book.titleUrdu ? book.titleUrdu : book.title}
          </h3>
          
          <motion.div
            whileHover={shouldReduceMotion ? {} : { x: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              href={`/books/${book.slug}`}
              className="inline-flex items-center template-link group"
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