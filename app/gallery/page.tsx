import fs from 'fs';
import path from 'path';
import { getTranslations, type Locale } from '@/lib/i18n';
import { parseFrontmatter } from '@/lib/utils/frontmatter';
import GalleryGrid from '@/components/GalleryGrid';

export const dynamic = 'force-static';

interface GalleryImage {
  slug: string;
  title: string;
  image: string;
  caption?: string;
  location?: string;
  date: string;
  source: 'cms' | 'folder';
}

async function getGalleryImages(): Promise<GalleryImage[]> {
  const images: GalleryImage[] = [];
  
  try {
    // Load only from TinaCMS content/gallery MDX files
    const galleryDirectory = path.join(process.cwd(), 'content/gallery');
    
    if (fs.existsSync(galleryDirectory)) {
      const filenames = fs.readdirSync(galleryDirectory);
      
      // Load .md and .mdx files with frontmatter
      const cmsImages = filenames
        .filter(filename => filename.endsWith('.md') || filename.endsWith('.mdx'))
        .map(filename => {
          const filePath = path.join(galleryDirectory, filename);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data } = parseFrontmatter(fileContents);
          
          return {
            slug: filename.replace(/\.(md|mdx)$/, ''),
            title: data.title || 'بے عنوان',
            image: data.image || '',
            caption: data.caption,
            location: data.location,
            date: data.date || new Date().toISOString(),
            source: 'cms' as const
          };
        });
      
      images.push(...cmsImages);
    }
  } catch (error) {
    console.error('Error loading gallery images:', error);
  }
  
  // Sort by date (newest first)
  return images.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function GalleryPage() {
  const locale: Locale = 'ur';
  const t = getTranslations(locale);
  const galleryImages = await getGalleryImages();

  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto px-4 py-16 pt-40" dir="rtl">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-16 text-right">
            <h1 className="text-5xl font-bold text-ink font-urdu-heading mb-6">
              گیلری
            </h1>
            <p className="text-lg text-ink-muted font-urdu-body">
              ذاتی تصاویر اور یادیں
            </p>
          </div>

          {/* Gallery Grid */}
          {galleryImages.length > 0 ? (
            <GalleryGrid images={galleryImages} />
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
