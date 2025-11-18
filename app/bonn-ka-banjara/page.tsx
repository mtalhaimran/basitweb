import fs from 'fs';
import path from 'path';
import Image from 'next/image';

export const dynamic = 'force-static';

interface Post {
  slug: string;
  title: string;
  date: string;
  categories?: string[];
  coverImage?: string;
  excerpt?: string;
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
  
  // Parse YAML-like frontmatter
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value: any = line.substring(colonIndex + 1).trim();
      
      // Remove quotes
      value = value.replace(/^["']|["']$/g, '');
      
      // Handle arrays
      if (key === 'categories' || key === 'tags') {
        if (!data[key]) data[key] = [];
      } else {
        data[key] = value;
      }
    } else if (line.trim().startsWith('-')) {
      // Array item
      const lastKey = Object.keys(data).pop();
      if (lastKey && Array.isArray(data[lastKey])) {
        data[lastKey].push(line.trim().substring(1).trim().replace(/^["']|["']$/g, ''));
      }
    }
  });
  
  return { data, content: body };
}

async function getBonnKaBanjaraPosts(): Promise<Post[]> {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/bonn-ka-banjara');
    
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(postsDirectory);
    
    const posts = filenames
      .filter(filename => filename.endsWith('.mdx') || filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = parseFrontmatter(fileContents);
        
        // Extract excerpt (first 150 characters of content)
        const excerpt = content.replace(/[#*`]/g, '').trim().slice(0, 150) + '...';
        
        return {
          slug: filename.replace(/\.(mdx|md)$/, ''),
          title: data.title || 'بے عنوان',
          date: data.date || new Date().toISOString(),
          categories: data.categories || [],
          coverImage: data.coverImage,
          excerpt
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error loading bonn-ka-banjara posts:', error);
    return [];
  }
}

export default async function BonnKaBanjaraPage() {
  const posts = await getBonnKaBanjaraPosts();

  return (
    <div className="min-h-screen bg-surface pt-40">
      <div className="container mx-auto px-4 pb-24" dir="rtl">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-right">
            <h1 className="text-5xl font-bold text-ink font-urdu-heading mb-6">
              بون کا بنجارہ
            </h1>
            <p className="text-lg text-ink-muted font-urdu-body">
              بون شہر سے تعلق رکھنے والی کہانیاں اور تحریریں
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/bonn-ka-banjara/${post.slug}`}
                  className="group block bg-surface-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-video bg-surface-elevated relative overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={`/images/${post.coverImage}`}
                        alt={post.title}
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
                      {post.title}
                    </h2>
                    <p className="text-sm text-ink-muted font-urdu-body text-right mb-3">
                      {new Date(post.date).toLocaleDateString('ur-PK', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    {post.excerpt && (
                      <p className="text-ink-muted font-urdu-body text-right line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-ink-muted font-urdu-body">
                ابھی کوئی پوسٹ دستیاب نہیں ہے۔
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
