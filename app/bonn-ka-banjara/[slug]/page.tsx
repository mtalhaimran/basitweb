import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { parseFrontmatter } from '@/lib/utils/frontmatter';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { SimpleMarkdown } from '@/components/RichText';
import { mdxComponents } from '@/components/MDXProvider';

export const dynamic = 'force-static';

interface PostData {
  title: string;
  date: string;
  categories?: string[];
  tags?: string[];
  coverImage?: string;
  body: string | any; // Can be string (markdown) or object (TinaCMS rich-text)
}

async function getPost(slug: string): Promise<PostData | null> {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/bonn-ka-banjara');
    
    // Try .mdx first (new format), then fall back to .md (legacy)
    let filePath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(postsDirectory, `${slug}.md`);
    }
    
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
      categories: data.categories as string[] || [],
      tags: data.tags as string[] || [],
      coverImage: data.coverImage as string,
      body
    };
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
}

export default async function BonnKaBanjaraDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <article className="max-w-4xl mx-auto">
          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-ink font-urdu-heading text-right">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-4 justify-end items-center text-ink-muted">
              <time className="font-urdu-body">
                {new Date(post.date).toLocaleDateString('ur-PK', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {post.categories.map((category) => (
                    <span 
                      key={category}
                      className="px-3 py-1 bg-surface-elevated rounded-full text-sm font-urdu-body"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none text-right font-urdu-body">
            {typeof post.body === 'string' ? (
              <SimpleMarkdown content={post.body} />
            ) : (
              <TinaMarkdown components={mdxComponents} content={post.body} />
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <footer className="mt-12 pt-8 border-t border-line">
              <div className="flex gap-2 flex-wrap justify-end">
                {post.tags.map((tag) => (
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
