import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookCard } from '@/components/BookCard';
import { books } from '@/lib/data/content';

export const metadata = {
  title: 'کتابیں - عبدالباسط ظفر',
  description: 'عبدالباسط ظفر کی کتابوں کا مکمل مجموعہ دیکھیں۔',
};

export default function UrduBooksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header lang="ur" />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-6">کتابیں</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              ناولز اور کہانیوں کا مجموعہ جو شناخت، ٹیکنالوجی، اور مختلف ثقافتوں میں انسانی تجربات کو دریافت کرتا ہے۔
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} lang="ur" />
            ))}
          </div>
        </div>
      </main>
      <Footer lang="ur" />
    </div>
  );
}