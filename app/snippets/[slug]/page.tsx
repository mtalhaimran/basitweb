import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { parseFrontmatter } from '@/lib/utils/frontmatter';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { SimpleMarkdown } from '@/components/RichText';
import { mdxComponents } from '@/components/MDXProvider';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  try {
    const snippetsDirectory = path.join(process.cwd(), 'content/snippets');
    
    if (!fs.existsSync(snippetsDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(snippetsDirectory);
    
    return filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => ({
        slug: filename.replace('.md', ''),
      }));
  } catch (error) {
    console.error('Error generating static params for snippets:', error);
    return [];
  }
}

interface SnippetData {
  title: string;
  date: string;
  tags?: string[];
  coverImage?: string;
  body: string | any; // Can be string (markdown) or object (TinaCMS rich-text)
}

async function getSnippet(slug: string): Promise<SnippetData | null> {
  try {
    // Decode the slug in case it's percent-encoded (e.g., from URLs)
    const decodedSlug = decodeURIComponent(slug);
    const snippetsDirectory = path.join(process.cwd(), 'content/snippets');
    const filePath = path.join(snippetsDirectory, `${decodedSlug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = parseFrontmatter(fileContents);
    
    // Try to parse content as JSON (TinaCMS rich-text format)
    let body: string | any = content;
    if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
      try {
        body = JSON.parse(content);
      } catch {
        // If JSON parse fails, keep as string (plain markdown)
        body = content;
      }
    }
    
    return {
      title: data.title as string || 'بے عنوان',
      date: data.date as string || new Date().toISOString(),
      tags: data.tags as string[] || [],
      coverImage: data.coverImage as string,
      body
    };
  } catch (error) {
    console.error('Error loading snippet:', error);
    return null;
  }
}

export default async function SnippetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const snippet = await getSnippet(resolvedParams.slug);

  if (!snippet) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <article className="max-w-4xl mx-auto">
          {/* Snippet Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-ink font-urdu-heading text-right">
              {snippet.title}
            </h1>
            <div className="flex flex-wrap gap-4 justify-end items-center text-ink-muted">
              <time className="font-urdu-body">
                {new Date(snippet.date).toLocaleDateString('ur-PK', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </header>

          {/* Snippet Content */}
          <div className="prose prose-lg max-w-none text-right font-urdu-body">
            {typeof snippet.body === 'string' ? (
              <SimpleMarkdown content={snippet.body} />
            ) : (
              <TinaMarkdown components={mdxComponents} content={snippet.body} />
            )}
          </div>

          {/* Tags */}
          {snippet.tags && snippet.tags.length > 0 && (
            <footer className="mt-12 pt-8 border-t border-line">
              <div className="flex gap-2 flex-wrap justify-end">
                {snippet.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-surface-white border border-line rounded-full text-sm text-ink-muted font-urdu-body hover:bg-surface-elevated transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </article>
      </div>
    </div>
  );
}
