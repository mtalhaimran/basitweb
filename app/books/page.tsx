import { loadBooks } from '@/lib/utils/books';
import { BooksPageClient } from '@/components/BooksPageClient';

export const dynamic = 'force-static';

export default async function BooksPage() {
  const books = await loadBooks();

  return <BooksPageClient books={books} />;
}
