'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getImagePath } from '@/lib/utils/frontmatter';
import Image from 'next/image';
import type { Book } from '@/lib/utils/books';

interface BooksPageClientProps {
  books: Book[];
}

export function BooksPageClient({ books }: BooksPageClientProps) {
  return (
    <div className="min-h-screen bg-surface pt-32">
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div 
            className="mb-16 text-right"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-ink font-urdu-heading mb-4">
              کتابیں
            </h1>
            <p className="text-lg text-ink-muted font-urdu-body">
              مصنف کی تصانیف کا مجموعہ
            </p>
          </motion.div>

          {/* Books Grid */}
          {books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/books/${book.id}`}>
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
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-ink-muted font-urdu-body">
                ابھی کوئی کتاب دستیاب نہیں ہے۔
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
