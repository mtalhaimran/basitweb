import { loadBooks } from '@/lib/utils/books';
import { getImagePath } from '@/lib/utils/frontmatter';
import Image from 'next/image';

export const dynamic = 'force-static';

export default async function BooksPage() {
  const books = await loadBooks();

  return (
    <div className="min-h-screen bg-surface pt-32">
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-right">
            <h1 className="text-5xl font-bold text-ink font-urdu-heading mb-4">
              کتابیں
            </h1>
            <p className="text-lg text-ink-muted font-urdu-body">
              مصنف کی تصانیف کا مجموعہ
            </p>
          </div>

          {/* Books Grid */}
          {books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="group relative bg-surface-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Book Cover */}
                  <div className="aspect-[3/4] bg-surface-elevated relative overflow-hidden">
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
                    
                    {/* Quote Overlay on Hover */}
                    {book.quotes.length > 0 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <blockquote className="text-white font-urdu-body text-right">
                          <p className="text-lg leading-relaxed mb-2">
                            &ldquo;{book.quotes[0]}&rdquo;
                          </p>
                          {book.quotes.length > 1 && (
                            <p className="text-sm text-white/80">
                              +{book.quotes.length - 1} مزید اقتباسات
                            </p>
                          )}
                        </blockquote>
                      </div>
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-ink mb-2 font-urdu-heading text-right">
                      {book.title}
                    </h2>
                    {book.publisher && (
                      <p className="text-sm text-ink-muted font-urdu-body text-right mb-3">
                        {book.publisher}
                      </p>
                    )}
                    {book.buyLink && (
                      <a
                        href={book.buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full text-center rounded-lg border-2 border-brand px-4 py-2 text-brand hover:bg-brand hover:text-white transition-colors font-medium font-urdu-body"
                      >
                        خریدیں
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-ink-muted font-urdu-body">
                ابھی کوئی کتاب دستیاب نہیں ہے۔
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
