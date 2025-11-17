import { loadBookById, loadBooks } from '@/lib/utils/books';
import { getImagePath } from '@/lib/utils/frontmatter';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const books = await loadBooks();
  return books.map((book) => ({
    slug: book.id,
  }));
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const book = await loadBookById(resolvedParams.slug);
  
  if (!book) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface pt-32">
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Book Cover */}
            <div className="md:col-span-1">
              <div className="aspect-[3/4] bg-surface-elevated relative overflow-hidden rounded-lg shadow-lg sticky top-32">
                {book.coverImage ? (
                  <Image
                    src={getImagePath(book.coverImage)}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-ink-muted font-urdu-body">
                    [کتاب کی تصویر]
                  </div>
                )}
              </div>
            </div>

            {/* Book Details */}
            <div className="md:col-span-2">
              <h1 className="text-5xl font-bold mb-6 text-ink font-urdu-heading text-right">
                {book.title}
              </h1>
              
              {book.publisher && (
                <p className="text-xl text-ink-muted font-urdu-body text-right mb-8">
                  ناشر: {book.publisher}
                </p>
              )}

              {book.publishDate && (
                <p className="text-lg text-ink-muted font-urdu-body text-right mb-8">
                  تاریخ اشاعت: {new Date(book.publishDate).toLocaleDateString('ur-PK', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}

              {book.description && (
                <div className="prose prose-lg max-w-none text-right font-urdu-body mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-ink font-urdu-heading text-right">
                    تفصیل
                  </h2>
                  <div className="text-ink leading-relaxed whitespace-pre-wrap">
                    {book.description}
                  </div>
                </div>
              )}

              {book.quotes && book.quotes.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-3xl font-bold mb-6 text-ink font-urdu-heading text-right">
                    اقتباسات
                  </h2>
                  <div className="space-y-6">
                    {book.quotes.map((quote, index) => (
                      <blockquote 
                        key={index}
                        className="border-r-4 border-brand pr-6 py-3 bg-surface-white rounded-lg shadow-sm"
                      >
                        <p className="text-xl text-ink font-urdu-body text-right leading-relaxed">
                          &ldquo;{quote}&rdquo;
                        </p>
                      </blockquote>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
