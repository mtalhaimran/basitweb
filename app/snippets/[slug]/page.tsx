import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { parseFrontmatter } from '@/lib/utils/frontmatter';
import { SimpleMarkdown } from '@/components/RichText';

export const dynamic = 'force-static';

interface SnippetData {
  title: string;
  date: string;
  tags?: string[];
  coverImage?: string;
  body: string;
}

async function getSnippet(slug: string): Promise<SnippetData | null> {
  try {
    const snippetsDirectory = path.join(process.cwd(), 'content/snippets');
    const filePath = path.join(snippetsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = parseFrontmatter(fileContents);
    
    return {
      title: data.title as string || 'بے عنوان',
      date: data.date as string || new Date().toISOString(),
      tags: data.tags as string[] || [],
      coverImage: data.coverImage as string,
      body: content
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
            <SimpleMarkdown content={snippet.body} />
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
