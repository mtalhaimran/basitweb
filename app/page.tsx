import { TemplateHero } from '@/components/TemplateHero';
import { BooksSection } from '@/components/BooksSection';
import { getTranslations, type Locale } from '@/lib/i18n';
import { loadBooks } from '@/lib/utils/books';

export const dynamic = 'force-static';

export default async function HomePage() {
  const locale: Locale = 'ur';
  const t = getTranslations(locale);
  const booksData = await loadBooks();
  
  // Transform books data for BooksSection component
  const books = booksData.map(book => ({
    slug: book.id,
    title: book.title,
    coverImage: book.coverImage,
    buyLink: book.buyLink
  }));

  return (
    <>
      <TemplateHero lang={locale} />
      <div className="min-h-screen bg-surface">
        <div className="container mx-auto px-4 py-16" dir="rtl">
          <div className="max-w-6xl mx-auto">
            {/* Books Section */}
            <BooksSection books={books} locale={locale} />

            {/* Quote */}
            <blockquote className="border-r-4 pr-6 border-brand py-2 mb-12">
              <p className="text-xl italic text-ink-muted font-urdu-body text-right">
                &ldquo;{t.home.quote}&rdquo;
              </p>
            </blockquote>

            {/* CTA */}
            <div className="text-right">
              <a 
                href="/work" 
                className="inline-block rounded-xl border-2 border-brand px-6 py-3 text-brand hover:bg-brand hover:text-white transition-colors font-medium font-urdu-body"
              >
                {t.home.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}