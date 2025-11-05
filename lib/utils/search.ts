import { loadBooks } from './books';
import { parseFrontmatter } from './frontmatter';
import fs from 'fs';
import path from 'path';

export interface SearchResult {
  type: 'book' | 'snippet' | 'bonn-ka-banjara' | 'work';
  id: string;
  title: string;
  excerpt: string;
  url: string;
  date?: string;
  tags?: string[];
  locale?: string;
}

/**
 * Search across all content types
 */
export async function globalSearch(query: string, filters?: {
  type?: SearchResult['type'][];
  locale?: string;
  dateFrom?: string;
  dateTo?: string;
}): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const searchTerm = query.toLowerCase();

  if (!searchTerm) {
    return results;
  }

  // Search books
  if (!filters?.type || filters.type.includes('book')) {
    const books = await loadBooks();
    for (const book of books) {
      if (
        book.title.toLowerCase().includes(searchTerm) ||
        book.description?.toLowerCase().includes(searchTerm) ||
        book.quotes.some(q => q.toLowerCase().includes(searchTerm))
      ) {
        if (!filters?.locale || book.locale === filters.locale) {
          results.push({
            type: 'book',
            id: book.id,
            title: book.title,
            excerpt: book.description || book.quotes[0] || '',
            url: `/books`,
            date: book.publishDate,
            locale: book.locale
          });
        }
      }
    }
  }

  // Search snippets
  if (!filters?.type || filters.type.includes('snippet')) {
    const snippetsResults = await searchInDirectory('snippets', searchTerm, filters);
    results.push(...snippetsResults.map(r => ({ ...r, type: 'snippet' as const })));
  }

  // Search bonn-ka-banjara
  if (!filters?.type || filters.type.includes('bonn-ka-banjara')) {
    const bonnResults = await searchInDirectory('bonn-ka-banjara', searchTerm, filters);
    results.push(...bonnResults.map(r => ({ ...r, type: 'bonn-ka-banjara' as const })));
  }

  // Search work (kaam)
  if (!filters?.type || filters.type.includes('work')) {
    const workResults = await searchInDirectory('work', searchTerm, filters);
    results.push(...workResults.map(r => ({ ...r, type: 'work' as const })));
  }

  return results;
}

/**
 * Helper to search in a content directory
 */
async function searchInDirectory(
  dirName: string, 
  searchTerm: string,
  filters?: any
): Promise<Omit<SearchResult, 'type'>[]> {
  const results: Omit<SearchResult, 'type'>[] = [];
  
  try {
    const dirPath = path.join(process.cwd(), 'content', dirName);
    
    if (!fs.existsSync(dirPath)) {
      return results;
    }

    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: body } = parseFrontmatter(content);
      
      const title = data.title as string || '';
      const matchesSearch = 
        title.toLowerCase().includes(searchTerm) ||
        body.toLowerCase().includes(searchTerm);
      
      if (!matchesSearch) continue;
      
      // Apply filters
      if (filters?.locale && data.locale !== filters.locale) continue;
      
      const itemDate = data.date as string;
      if (filters?.dateFrom && itemDate < filters.dateFrom) continue;
      if (filters?.dateTo && itemDate > filters.dateTo) continue;
      
      // Extract excerpt
      const excerpt = body
        .replace(/[#*`]/g, '')
        .trim()
        .slice(0, 150) + '...';
      
      results.push({
        id: file.replace('.md', ''),
        title,
        excerpt,
        url: `/${dirName}/${file.replace('.md', '')}`,
        date: itemDate,
        tags: data.tags as string[],
        locale: data.locale as string
      });
    }
  } catch (error) {
    console.error(`Error searching in ${dirName}:`, error);
  }
  
  return results;
}

/**
 * Get filter options for a content type
 */
export async function getFilterOptions(contentType: SearchResult['type']) {
  const options = {
    dates: [] as string[],
    tags: [] as string[],
    locales: [] as string[]
  };

  try {
    let dirName = contentType;
    if (contentType === 'book') {
      const books = await loadBooks();
      books.forEach(book => {
        if (book.publishDate) options.dates.push(book.publishDate);
        if (book.locale) options.locales.push(book.locale);
      });
      return options;
    }

    const dirPath = path.join(process.cwd(), 'content', dirName);
    if (!fs.existsSync(dirPath)) return options;

    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = parseFrontmatter(content);
      
      if (data.date) options.dates.push(data.date as string);
      if (data.tags) {
        const tags = data.tags as string[];
        tags.forEach(tag => {
          if (!options.tags.includes(tag)) options.tags.push(tag);
        });
      }
      if (data.locale && !options.locales.includes(data.locale as string)) {
        options.locales.push(data.locale as string);
      }
    }
  } catch (error) {
    console.error(`Error getting filter options for ${contentType}:`, error);
  }

  return options;
}
