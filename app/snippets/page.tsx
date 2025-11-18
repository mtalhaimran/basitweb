import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { parseFrontmatter } from '@/lib/utils/frontmatter';

export const dynamic = 'force-static';

interface Snippet {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  coverImage?: string;
  excerpt?: string;
}

async function getSnippets(): Promise<Snippet[]> {
  try {
    const snippetsDirectory = path.join(process.cwd(), 'content/snippets');
    
    if (!fs.existsSync(snippetsDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(snippetsDirectory);
    
    const snippets = filenames
      .filter(filename => filename.endsWith('.mdx') || filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(snippetsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = parseFrontmatter(fileContents);
        
        // Extract excerpt (first 150 characters of content)
        const excerpt = content.replace(/[#*`]/g, '').trim().slice(0, 150) + '...';
        
        return {
          slug: filename.replace(/\.(mdx|md)$/, ''),
          title: data.title as string || 'بے عنوان',
          date: data.date as string || new Date().toISOString(),
          tags: data.tags as string[] || [],
          coverImage: data.coverImage as string,
          excerpt
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return snippets;
  } catch (error) {
    console.error('Error loading snippets:', error);
    return [];
  }
}

export default async function SnippetsPage() {
  const snippets = await getSnippets();

  return (
    <div className="min-h-screen bg-surface pt-40">
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-right">
            <h1 className="text-5xl font-bold text-ink font-urdu-heading mb-6">
              مضامین
            </h1>
            <p className="text-lg text-ink-muted font-urdu-body">
              مختصر تحریریں اور مضامین
            </p>
          </div>

          {snippets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {snippets.map((snippet) => (
                <a
                  key={snippet.slug}
                  href={`/snippets/${snippet.slug}`}
                  className="group block bg-surface-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-video bg-surface-elevated relative overflow-hidden">
                    {snippet.coverImage ? (
                      <Image
                        src={`/images/${snippet.coverImage}`}
                        alt={snippet.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-ink-muted font-urdu-body">
                        [تصویر]
                      </div>
                    )}
                    <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-300" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-ink group-hover:text-brand transition-colors font-urdu-heading text-right mb-3">
                      {snippet.title}
                    </h2>
                    <p className="text-sm text-ink-muted font-urdu-body text-right mb-3">
                      {new Date(snippet.date).toLocaleDateString('ur-PK', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    {snippet.excerpt && (
                      <p className="text-ink-muted font-urdu-body text-right line-clamp-3">
                        {snippet.excerpt}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-ink-muted font-urdu-body">
                ابھی کوئی مضمون دستیاب نہیں ہے۔
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
