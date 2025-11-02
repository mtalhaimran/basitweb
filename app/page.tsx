import fs from 'fs';
import path from 'path';
import { TemplateHero } from '@/components/TemplateHero';
import { BooksSection } from '@/components/BooksSection';
import { getTranslations, type Locale } from '@/lib/i18n';

export const dynamic = 'force-static';

interface Book {
  slug: string;
  title: string;
  coverImage?: string;
  buyLink?: string;
}

// Simple frontmatter parser
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatter, body] = match;
  const data: Record<string, any> = {};
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value: any = line.substring(colonIndex + 1).trim();
      value = value.replace(/^["']|["']$/g, '');
      data[key] = value;
    }
  });
  
  return { data, content: body };
}

async function getBooks(): Promise<Book[]> {
  try {
    const booksDirectory = path.join(process.cwd(), 'content/books');
    
    if (!fs.existsSync(booksDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(booksDirectory);
    
    const books = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(booksDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = parseFrontmatter(fileContents);
        
        return {
          slug: filename.replace('.md', ''),
          title: data.title || 'بے عنوان',
          coverImage: data.coverImage,
          buyLink: data.buyLink
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title));

    return books;
  } catch (error) {
    console.error('Error loading books:', error);
    return [];
  }
}

export default async function HomePage() {
  const locale: Locale = 'ur';
  const t = getTranslations(locale);
  const books = await getBooks();

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