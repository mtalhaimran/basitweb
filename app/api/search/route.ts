import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parseFrontmatter } from '@/lib/utils/frontmatter';
import { loadBooks } from '@/lib/utils/books';

export type SearchDoc = {
  id: string;
  url: string;
  title: string;
  excerpt?: string;
  collection: 'bonn-ka-banjara' | 'snippets' | 'books' | 'gallery';
  tags?: string[];
  locale: 'ur' | 'en';
  quotes?: string[];
  caption?: string;
  date?: string;
};

/**
 * GET /api/search
 * Returns all searchable content from TinaCMS collections
 */
export async function GET() {
  try {
    const docs: SearchDoc[] = [];

    // 1. Load Bonn-ka-Banjara posts
    const bonnKaBanjaraPath = path.join(process.cwd(), 'content/bonn-ka-banjara');
    if (fs.existsSync(bonnKaBanjaraPath)) {
      const files = fs.readdirSync(bonnKaBanjaraPath);
      
      for (const file of files) {
        if (!file.endsWith('.md')) continue;
        
        const filePath = path.join(bonnKaBanjaraPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { data, content: body } = parseFrontmatter(content);
        
        const slug = file.replace('.md', '');
        const excerpt = body.substring(0, 200).replace(/[#*_\[\]()]/g, '');
        
        docs.push({
          id: `bkb-${slug}`,
          url: `/bonn-ka-banjara/${slug}`,
          title: (data.title as string) || 'بے عنوان',
          excerpt,
          collection: 'bonn-ka-banjara',
          tags: (data.tags as string[]) || [],
          locale: ((data.locale as string) || 'ur') as 'ur' | 'en',
          date: (data.date as string) || undefined,
        });
      }
    }

    // 2. Load Snippets
    const snippetsPath = path.join(process.cwd(), 'content/snippets');
    if (fs.existsSync(snippetsPath)) {
      const files = fs.readdirSync(snippetsPath);
      
      for (const file of files) {
        if (!file.endsWith('.md')) continue;
        
        const filePath = path.join(snippetsPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { data, content: body } = parseFrontmatter(content);
        
        const slug = file.replace('.md', '');
        const excerpt = body.substring(0, 200).replace(/[#*_\[\]()]/g, '');
        
        docs.push({
          id: `snippet-${slug}`,
          url: `/snippets/${slug}`,
          title: (data.title as string) || 'بے عنوان',
          excerpt,
          collection: 'snippets',
          tags: (data.tags as string[]) || [],
          locale: ((data.locale as string) || 'ur') as 'ur' | 'en',
          date: (data.date as string) || undefined,
        });
      }
    }

    // 3. Load Books
    const books = await loadBooks();
    for (const book of books) {
      docs.push({
        id: `book-${book.id}`,
        url: `/books#${book.id}`,
        title: book.title,
        excerpt: book.description || undefined,
        collection: 'books',
        tags: [],
        locale: (book.locale || 'ur') as 'ur' | 'en',
        quotes: book.quotes,
        date: book.publishDate,
      });
    }

    // 4. Load Gallery
    // From TinaCMS content/gallery
    const galleryContentPath = path.join(process.cwd(), 'content/gallery');
    if (fs.existsSync(galleryContentPath)) {
      const files = fs.readdirSync(galleryContentPath);
      
      for (const file of files) {
        if (!file.endsWith('.md')) continue;
        
        const filePath = path.join(galleryContentPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { data } = parseFrontmatter(content);
        
        docs.push({
          id: `gallery-cms-${file.replace('.md', '')}`,
          url: '/gallery',
          title: (data.title as string) || 'تصویر',
          collection: 'gallery',
          tags: [],
          locale: ((data.locale as string) || 'ur') as 'ur' | 'en',
          caption: (data.caption as string) || undefined,
          date: (data.date as string) || undefined,
        });
      }
    }

    // From public/gallery manifest
    const manifestPath = path.join(process.cwd(), 'public/gallery/gallery-manifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifestContent = fs.readFileSync(manifestPath, 'utf8');
      const manifest = JSON.parse(manifestContent);
      
      if (manifest.images && Array.isArray(manifest.images)) {
        for (const image of manifest.images) {
          docs.push({
            id: `gallery-public-${image.filename}`,
            url: '/gallery',
            title: image.title || 'تصویر',
            collection: 'gallery',
            tags: [],
            locale: 'ur',
            caption: image.caption || undefined,
            date: image.date || undefined,
          });
        }
      }
    }

    return NextResponse.json(docs);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to load search data' },
      { status: 500 }
    );
  }
}
