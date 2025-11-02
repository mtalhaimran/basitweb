import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { getTranslations, type Locale } from '@/lib/i18n';

export const dynamic = 'force-static';

interface GalleryImage {
  slug: string;
  title: string;
  image: string;
  caption?: string;
  location?: string;
  date: string;
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

async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const galleryDirectory = path.join(process.cwd(), 'content/gallery');
    
    if (!fs.existsSync(galleryDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(galleryDirectory);
    
    const images = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(galleryDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = parseFrontmatter(fileContents);
        
        return {
          slug: filename.replace('.md', ''),
          title: data.title || 'بے عنوان',
          image: data.image || '',
          caption: data.caption,
          location: data.location,
          date: data.date || new Date().toISOString()
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return images;
  } catch (error) {
    console.error('Error loading gallery images:', error);
    return [];
  }
}

export default async function GalleryPage() {
  const locale: Locale = 'ur';
  const t = getTranslations(locale);
  const galleryImages = await getGalleryImages();

  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto px-4 py-16" dir="rtl">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-right">
            <h1 className="text-5xl font-bold text-ink mb-4 font-urdu-heading">
              گیلری
            </h1>
            <p className="text-lg text-ink-muted font-urdu-body">
              ذاتی تصاویر اور یادیں
            </p>
          </div>

          {/* Gallery Grid */}
          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div
                  key={image.slug}
                  className="group relative aspect-square bg-surface-elevated rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  role="img"
                  aria-label={image.caption || image.title}
                >
                  {image.image ? (
                    <Image
                      src={image.image.startsWith('/') ? image.image : `/images/${image.image}`}
                      alt={image.caption || image.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-ink-muted font-urdu-body">
                      [{image.title}]
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-urdu-heading text-xl text-right mb-1">
                        {image.title}
                      </h3>
                      {image.caption && (
                        <p className="text-white/90 font-urdu-body text-sm text-right mb-1">
                          {image.caption}
                        </p>
                      )}
                      {image.location && (
                        <p className="text-white/80 font-urdu-body text-xs text-right">
                          📍 {image.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-ink-muted font-urdu-body">
                ابھی کوئی تصویر دستیاب نہیں ہے۔
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
