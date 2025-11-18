import { getPageContent, isValidPage, pageContent } from '@/lib/pageContent';
import { notFound } from 'next/navigation';
import { type Locale } from '@/lib/i18n';

export const dynamic = 'force-static';

// Generate static params for all pages
export async function generateStaticParams() {
  const pages = Object.keys(pageContent);
  return pages.map(page => ({
    slug: [page]
  }));
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  // Default to Urdu locale
  const locale: Locale = 'ur';
  const isUrdu = true;
  
  // Await params to comply with Next.js 15
  const resolvedParams = await params;
  
  // Get the page slug (first segment)
  const pageSlug = resolvedParams.slug?.[0] || '';
  
  // Check if page exists
  if (!isValidPage(pageSlug)) {
    notFound();
  }
  
  // Get page content
  const content = getPageContent(pageSlug, locale);
  
  if (!content) {
    notFound();
  }

  // Special handling for contact page
  const isContactPage = pageSlug === 'contact';

  return (
    <div className="bg-surface pt-40">
      <div className="container mx-auto px-4 pb-24" dir={isUrdu ? 'rtl' : 'ltr'}>
        <div className="max-w-6xl mx-auto">
          <h1 className={`text-4xl font-bold mb-8 text-ink ${isUrdu ? 'font-urdu-heading text-right' : ''}`}>
            {content.title}
          </h1>
          
          {isContactPage ? (
            <div className={`space-y-4 ${isUrdu ? 'text-right' : ''}`}>
              <p className={`text-lg text-ink-muted ${isUrdu ? 'font-urdu-body' : ''}`}>
                {content.content}
              </p>
              <a 
                href="mailto:hello@abdulbasitzafar.com" 
                className={`text-xl text-brand hover:text-brand-hover transition-colors ${isUrdu ? 'font-urdu-body' : ''}`}
              >
                hello@abdulbasitzafar.com
              </a>
            </div>
          ) : (
            <div className={`text-lg text-ink-muted ${isUrdu ? 'font-urdu-body text-right' : ''}`}>
              {content.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className={index > 0 ? 'mt-4' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
