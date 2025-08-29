import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookCard } from '@/components/BookCard';
import { books } from '@/lib/data/content';

export const metadata = {
  title: 'Books - Abdul Basit Zafar',
  description: 'Browse the complete collection of books by Abdul Basit Zafar.',
};

export default function BooksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-6">Books</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A collection of novels and stories exploring identity, technology, and the human experience across cultures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}