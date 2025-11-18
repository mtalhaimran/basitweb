import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { parseFrontmatter, getImagePath } from '@/lib/utils/frontmatter';

export const dynamic = 'force-static';

interface GalleryData {
  title: string;
  image: string;
  date: string;
  caption?: string;
  location?: string;
}

async function getGalleryItem(slug: string): Promise<GalleryData | null> {
  try {
    const galleryDirectory = path.join(process.cwd(), 'content/gallery');
    
    // Try .mdx first, then fall back to .md
    let filePath = path.join(galleryDirectory, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(galleryDirectory, `${slug}.md`);
    }
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = parseFrontmatter(fileContents);
    
    return {
      title: data.title as string || 'بے عنوان',
      image: data.image as string || '',
      date: data.date as string || new Date().toISOString(),
      caption: data.caption as string,
      location: data.location as string,
    };
  } catch (error) {
    console.error('Error loading gallery item:', error);
    return null;
  }
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const item = await getGalleryItem(resolvedParams.slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <article className="max-w-6xl mx-auto">
          {/* Gallery Item Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-ink font-urdu-heading text-right">
              {item.title}
            </h1>
            <div className="flex flex-wrap gap-4 justify-end items-center text-ink-muted">
              <time className="font-urdu-body">
                {new Date(item.date).toLocaleDateString('ur-PK', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {item.location && (
                <div className="flex items-center gap-2">
                  <span className="font-urdu-body">{item.location}</span>
                  <span>📍</span>
                </div>
              )}
            </div>
          </header>

          {/* Main Image */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
            {item.image && (
              <div className="relative w-full aspect-video md:aspect-[4/3]">
                <Image
                  src={getImagePath(item.image)}
                  alt={item.caption || item.title}
                  fill
                  className="object-contain bg-surface-elevated"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
              </div>
            )}
          </div>

          {/* Caption */}
          {item.caption && (
            <div className="bg-surface-elevated rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-3 text-ink font-urdu-heading text-right flex items-center justify-end gap-2">
                <span>تفصیل</span>
                <span className="text-2xl">💬</span>
              </h2>
              <p className="text-lg text-ink font-urdu-body text-right leading-relaxed">
                {item.caption}
              </p>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-12 flex justify-end">
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-urdu-body text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <span>←</span>
              <span>واپس گیلری</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
