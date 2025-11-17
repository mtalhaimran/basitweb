'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getImagePath } from '@/lib/utils/frontmatter';

interface Book {
  slug: string;
  title: string;
  coverImage?: string;
  buyLink?: string;
}

interface BooksSectionProps {
  books: Book[];
  locale?: 'ur' | 'en';
}

export function BooksSection({ books, locale = 'ur' }: BooksSectionProps) {
  const isUrdu = locale === 'ur';

  if (books.length === 0) {
    return (
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-ink mb-8 text-right font-urdu-heading">
          کتابیں
        </h2>
        <p className="text-ink-muted font-urdu-body text-right">
          ابھی کوئی کتاب دستیاب نہیں ہے۔
        </p>
      </section>
    );
  }

  return (
    <section className="mb-16 mt-16">
      <motion.div 
        className="flex justify-between items-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/books"
          className="text-brand hover:text-brand-dark transition-colors font-urdu-body text-lg underline decoration-2 underline-offset-4"
        >
          تمام کتابیں دیکھیں ←
        </Link>
        <h2 className="text-4xl font-bold text-ink font-urdu-heading">
          کتابیں
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book, index) => (
          <motion.div
            key={book.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BookContent book={book} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BookContent({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.slug}`}>
      <motion.div 
        className="group bg-surface-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -8 }}
        role="article"
        aria-label={`Book: ${book.title}`}
      >
        <div className="aspect-video bg-surface-elevated relative overflow-hidden">
          {book.coverImage ? (
            <Image
              src={getImagePath(book.coverImage)}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-ink-muted font-urdu-body">
              [کتاب کی تصویر]
            </div>
          )}
          <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-300" />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-ink group-hover:text-brand transition-colors font-urdu-heading text-right">
            {book.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}
