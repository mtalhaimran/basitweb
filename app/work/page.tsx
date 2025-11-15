import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { loadBooks } from '@/lib/utils/books';
import { parseFrontmatter, getImagePath } from '@/lib/utils/frontmatter';

export const dynamic = 'force-static';

interface ContentItem {
  slug: string;
  title: string;
  date?: string;
  coverImage?: string;
  excerpt?: string;
  type: 'book' | 'snippet' | 'bonn-ka-banjara';
  link: string;
}

async function getBonnKaBanjaraPosts() {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/bonn-ka-banjara');
    
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(postsDirectory);
    
    const posts = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = parseFrontmatter(fileContents);
        
        const excerpt = content.replace(/[#*`]/g, '').trim().slice(0, 150) + '...';
        
        return {
          slug: filename.replace('.md', ''),
          title: data.title as string || 'بے عنوان',
          date: data.date as string || new Date().toISOString(),
          coverImage: data.coverImage as string,
          excerpt,
          type: 'bonn-ka-banjara' as const,
          link: `/bonn-ka-banjara/${filename.replace('.md', '')}`
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3); // Get latest 3

    return posts;
  } catch (error) {
    console.error('Error loading bonn-ka-banjara posts:', error);
    return [];
  }
}

async function getSnippets() {
  try {
    const snippetsDirectory = path.join(process.cwd(), 'content/snippets');
    
    if (!fs.existsSync(snippetsDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(snippetsDirectory);
    
    const snippets = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(snippetsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = parseFrontmatter(fileContents);
        
        const excerpt = content.replace(/[#*`]/g, '').trim().slice(0, 150) + '...';
        
        return {
          slug: filename.replace('.md', ''),
          title: data.title as string || 'بے عنوان',
          date: data.date as string || new Date().toISOString(),
          coverImage: data.coverImage as string,
          excerpt,
          type: 'snippet' as const,
          link: `/snippets/${filename.replace('.md', '')}`
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3); // Get latest 3

    return snippets;
  } catch (error) {
    console.error('Error loading snippets:', error);
    return [];
  }
}

export default async function WorkPage() {
  const books = await loadBooks();
  const bonnKaBanjaraPosts = await getBonnKaBanjaraPosts();
  const snippets = await getSnippets();

  // Get latest 3 books
  const latestBooks = books.slice(0, 3).map(book => ({
    slug: book.id,
    title: book.title,
    coverImage: book.coverImage,
    type: 'book' as const,
    link: `/books/${book.id}`,
    excerpt: book.description || ''
  }));

  return (
    <div className="min-h-screen bg-surface pt-32">
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-16 text-right">
            <h1 className="text-5xl md:text-6xl font-bold text-ink font-urdu-heading mb-4">
              کام
            </h1>
            <p className="text-lg md:text-xl text-ink-muted font-urdu-body max-w-3xl mr-auto">
              تحریروں، کتابوں اور مضامین کا مجموعہ
            </p>
          </div>

          {/* Books Section */}
          {latestBooks.length > 0 && (
            <section className="mb-16">
              <div className="flex justify-between items-center mb-12">
                <Link
                  href="/books"
                  className="text-brand hover:text-brand-hover font-urdu-body text-lg transition-colors"
                >
                  تمام دیکھیں ←
                </Link>
                <h2 className="text-3xl md:text-4xl font-bold text-ink font-urdu-heading">
                  کتابیں
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestBooks.map((book) => (
                  <Link
                    key={book.slug}
                    href={book.link}
                    className="group block bg-surface-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="aspect-[3/4] bg-surface-elevated relative overflow-hidden">
                      {book.coverImage ? (
                        <Image
                          src={getImagePath(book.coverImage)}
                          alt={book.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-ink-muted font-urdu-body">
                          [کتاب کی تصویر]
                        </div>
                      )}
                      <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-ink group-hover:text-brand transition-colors font-urdu-heading text-right">
                        {book.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Bonn Ka Banjara Section */}
          {bonnKaBanjaraPosts.length > 0 && (
            <section className="mb-16">
              <div className="flex justify-between items-center mb-12">
                <Link
                  href="/bonn-ka-banjara"
                  className="text-brand hover:text-brand-hover font-urdu-body text-lg transition-colors"
                >
                  تمام دیکھیں ←
                </Link>
                <h2 className="text-3xl md:text-4xl font-bold text-ink font-urdu-heading">
                  بون کا بنجارا
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bonnKaBanjaraPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={post.link}
                    className="group block bg-surface-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    {post.coverImage && (
                      <div className="aspect-video bg-surface-elevated relative overflow-hidden">
                        <Image
                          src={getImagePath(post.coverImage)}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-300" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-ink group-hover:text-brand transition-colors font-urdu-heading text-right mb-3">
                        {post.title}
                      </h3>
                      {post.date && (
                        <p className="text-sm text-ink-muted font-urdu-body text-right mb-3">
                          {new Date(post.date).toLocaleDateString('ur-PK', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                      {post.excerpt && (
                        <p className="text-ink-muted font-urdu-body text-right line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Snippets/Mazmoon Section */}
          {snippets.length > 0 && (
            <section className="mb-16">
              <div className="flex justify-between items-center mb-12">
                <Link
                  href="/snippets"
                  className="text-brand hover:text-brand-hover font-urdu-body text-lg transition-colors"
                >
                  تمام دیکھیں ←
                </Link>
                <h2 className="text-3xl md:text-4xl font-bold text-ink font-urdu-heading">
                  مضامین
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {snippets.map((snippet) => (
                  <Link
                    key={snippet.slug}
                    href={snippet.link}
                    className="group block bg-surface-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    {snippet.coverImage && (
                      <div className="aspect-video bg-surface-elevated relative overflow-hidden">
                        <Image
                          src={getImagePath(snippet.coverImage)}
                          alt={snippet.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-300" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-ink group-hover:text-brand transition-colors font-urdu-heading text-right mb-3">
                        {snippet.title}
                      </h3>
                      {snippet.date && (
                        <p className="text-sm text-ink-muted font-urdu-body text-right mb-3">
                          {new Date(snippet.date).toLocaleDateString('ur-PK', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                      {snippet.excerpt && (
                        <p className="text-ink-muted font-urdu-body text-right line-clamp-3">
                          {snippet.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {latestBooks.length === 0 && bonnKaBanjaraPosts.length === 0 && snippets.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-ink-muted font-urdu-body">
                ابھی کوئی مواد دستیاب نہیں ہے۔
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
