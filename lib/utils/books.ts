import fs from 'fs';
import path from 'path';
import { parseFrontmatter } from './frontmatter';

/**
 * Parse MDX component syntax to TinaCMS rich-text format
 * Example: <CenterText>\n  content\n</CenterText> -> TinaCMS AST
 */
function parseMDXToTina(mdxContent: string): any {
  const children: any[] = [];
  const lines = mdxContent.split('\n');
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Check for opening MDX component tag
    const componentMatch = trimmed.match(/^<(CenterText|RightAlign|LeftAlign)>$/);
    if (componentMatch) {
      const componentName = componentMatch[1];
      i++; // Move to next line
      
      // Collect content until closing tag
      const componentChildren: any[] = [];
      while (i < lines.length) {
        const contentLine = lines[i];
        const contentTrimmed = contentLine.trim();
        
        // Check for closing tag
        if (contentTrimmed === `</${componentName}>`) {
          i++; // Move past closing tag
          break;
        }
        
        // Add content as paragraph (skip empty lines)
        if (contentTrimmed) {
          componentChildren.push({
            type: 'p',
            children: [{ type: 'text', text: contentTrimmed }]
          });
        }
        i++;
      }
      
      // Only add component node if it has content
      if (componentChildren.length > 0) {
        children.push({
          type: 'mdxJsxFlowElement',
          name: componentName,
          attributes: [],
          children: componentChildren
        });
      }
    } else if (trimmed) {
      // Regular text - add as paragraph
      children.push({
        type: 'p',
        children: [{ type: 'text', text: trimmed }]
      });
      i++;
    } else {
      // Empty line - skip
      i++;
    }
  }
  
  return {
    type: 'root',
    children
  };
}

export interface BookQuote {
  text: string;
}

export interface Book {
  id: string;
  title: string;
  coverImage?: string;
  publishDate: string;
  locale: string;
  publisher?: string;
  description?: string | any; // Can be string (markdown) or object (TinaCMS rich-text)
  quotes: string[];
}

/**
 * Load all books from markdown files
 */
export async function loadBooks(): Promise<Book[]> {
  try {
    const booksDirectory = path.join(process.cwd(), 'content/books');
    
    if (!fs.existsSync(booksDirectory)) {
      return [];
    }

    // First check for flat .md or .mdx files (new TinaCMS structure)
    const files = fs.readdirSync(booksDirectory);
    const contentFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
    
    if (contentFiles.length > 0) {
      // New flat file structure
      const books: Book[] = contentFiles.map(filename => {
        const filePath = path.join(booksDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = parseFrontmatter(fileContent);
        
        // Determine content type:
        // - If it starts with { or [, try to parse as JSON (TinaCMS rich-text format)
        // - If it contains MDX components (e.g., <CenterText>), parse MDX syntax
        // - Otherwise, keep as plain string
        let description: string | any = content || '';
        const trimmedContent = content.trim();
        
        if (trimmedContent && (trimmedContent.startsWith('{') || trimmedContent.startsWith('['))) {
          // Try to parse as JSON (TinaCMS rich-text AST format)
          try {
            description = JSON.parse(content);
          } catch {
            // If JSON parse fails, keep as string
            description = content;
          }
        } else if (trimmedContent && (trimmedContent.includes('<CenterText>') || trimmedContent.includes('<RightAlign>') || trimmedContent.includes('<LeftAlign>'))) {
          // Contains MDX components - parse to TinaCMS format
          description = parseMDXToTina(content);
        }
        
        return {
          id: filename.replace(/\.(md|mdx)$/, ''),
          title: data.title as string || 'بے عنوان',
          coverImage: data.coverImage as string,
          publishDate: data.publishDate as string || new Date().toISOString(),
          locale: data.locale as string || 'ur',
          publisher: data.publisher as string,
          description,
          quotes: (data.quotes as string[]) || []
        };
      });
      
      return books.sort((a, b) => 
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
    }

    // Fallback to old folder structure
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

      // Try to parse content as JSON (TinaCMS rich-text format)
      let description: string | any = bookBody || bookData.description as string;
      if (bookBody && (bookBody.trim().startsWith('{') || bookBody.trim().startsWith('['))) {
        try {
          description = JSON.parse(bookBody);
        } catch {
          // If JSON parse fails, keep as string (plain markdown)
          description = bookBody;
        }
      }

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
        publisher: bookData.publisher as string,
        description,
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
    // Decode the bookId in case it's percent-encoded (e.g., from URLs)
    const decodedBookId = decodeURIComponent(bookId);
    const books = await loadBooks();
    return books.find(book => book.id === decodedBookId) || null;
  } catch (error) {
    console.error(`Error loading book ${bookId}:`, error);
    return null;
  }
}
