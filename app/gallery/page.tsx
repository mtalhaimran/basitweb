import { getTranslations, type Locale } from '@/lib/i18n';

export const dynamic = 'force-static';

export default async function GalleryPage() {
  const locale: Locale = 'ur';
  const t = getTranslations(locale);

  // Placeholder gallery data - will be managed through TinaCMS
  const galleryImages = [
    { id: 1, title: 'تصویر 1', alt: 'Gallery image 1' },
    { id: 2, title: 'تصویر 2', alt: 'Gallery image 2' },
    { id: 3, title: 'تصویر 3', alt: 'Gallery image 3' },
    { id: 4, title: 'تصویر 4', alt: 'Gallery image 4' },
    { id: 5, title: 'تصویر 5', alt: 'Gallery image 5' },
    { id: 6, title: 'تصویر 6', alt: 'Gallery image 6' },
  ];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square bg-surface-elevated rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-ink-muted font-urdu-body">
                  [{image.title}]
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-urdu-heading text-xl text-right">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
