import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookCard } from '@/components/BookCard';
import { books } from '@/lib/data/content';

export const metadata = {
  title: 'کتابیں - عبدالباسط ظفر',
  description: 'عبدالباسط ظفر کی کتابوں کا مکمل مجموعہ۔',
};

export default function BooksPage() {
  return ( // Removed lang/dir as it's now in root layout
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-32 pb-20" data-pagefind-body>
        <div className="container">
          <div className="text-center mb-20">
            <h1 className="text-display urdu-display mb-8 text-ink">کتابیں</h1>
            <p className="large-text urdu-text text-medium-contrast max-w-3xl mx-auto content-spacing">
              ناولز اور کہانیوں کا مجموعہ جو شناخت، ٹیکنالوجی، اور مختلف ثقافتوں میں انسانی تجربات کو دریافت کرتا ہے۔
            </p>
          </div>

          <div className="portfolio-grid"> {/* Use new grid styling */}
            {books.map((book, index) => (
              <div key={book.id} className="animate-slide-up" style={{animationDelay: `${index * 150}ms`}}>
                <BookCard book={book} lang="ur" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}