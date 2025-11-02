import fs from 'fs';
import path from 'path';
import { parseFrontmatter } from './frontmatter';

export interface BookQuote {
  text: string;
}

export interface Book {
  id: string;
  title: string;
  coverImage?: string;
  publishDate: string;
  locale: string;
  isbn?: string;
  publisher?: string;
  buyLink?: string;
  description?: string;
  quotes: string[];
}

/**
 * Load all books from the folder-based structure
 */
export async function loadBooks(): Promise<Book[]> {
  try {
    const booksDirectory = path.join(process.cwd(), 'content/books');
    
    if (!fs.existsSync(booksDirectory)) {
      return [];
    }

    const bookFolders = fs.readdirSync(booksDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const books: Book[] = [];

    for (const folderId of bookFolders) {
      const folderPath = path.join(booksDirectory, folderId);
      const bookFilePath = path.join(folderPath, 'book.md');
      const quotesFilePath = path.join(folderPath, 'quotes.md');

      if (!fs.existsSync(bookFilePath)) {
        continue;
      }

      // Load book metadata
      const bookContent = fs.readFileSync(bookFilePath, 'utf8');
      const { data: bookData, content: bookBody } = parseFrontmatter(bookContent);

      // Load quotes if available
      let quotes: string[] = [];
      if (fs.existsSync(quotesFilePath)) {
        const quotesContent = fs.readFileSync(quotesFilePath, 'utf8');
        const { data: quotesData } = parseFrontmatter(quotesContent);
        quotes = quotesData.quotes as string[] || [];
      }

      books.push({
        id: folderId,
        title: bookData.title as string || 'بے عنوان',
        coverImage: bookData.coverImage as string,
        publishDate: bookData.publishDate as string || new Date().toISOString(),
        locale: bookData.locale as string || 'ur',
        isbn: bookData.isbn as string,
        publisher: bookData.publisher as string,
        buyLink: bookData.buyLink as string,
        description: bookBody || bookData.description as string,
        quotes
      });
    }

    // Sort by publish date (newest first)
    return books.sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  } catch (error) {
    console.error('Error loading books:', error);
    return [];
  }
}

/**
 * Load a single book by ID
 */
export async function loadBookById(bookId: string): Promise<Book | null> {
  try {
    const books = await loadBooks();
    return books.find(book => book.id === bookId) || null;
  } catch (error) {
    console.error(`Error loading book ${bookId}:`, error);
    return null;
  }
}
