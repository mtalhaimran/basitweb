import { TemplateHero } from '@/components/TemplateHero';
import { BooksSection } from '@/components/BooksSection';
import { getTranslations, type Locale } from '@/lib/i18n';
import { loadBooks } from '@/lib/utils/books';
import { AnimatedQuoteAndCTA } from '@/components/AnimatedQuoteAndCTA';

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

            {/* Quote and CTA with animations */}
            <AnimatedQuoteAndCTA quote={t.home.quote} cta={t.home.cta} />
          </div>
        </div>
      </div>
    </>
  );
}