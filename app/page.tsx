import { TemplateHero } from '@/components/TemplateHero';
import { getTranslations, type Locale } from '@/lib/i18n';

export const dynamic = 'force-static';

export default async function HomePage() {
  const locale: Locale = 'ur';
  const t = getTranslations(locale);
  const isUrdu = true;

  return (
    <>
      <TemplateHero lang={locale} />
      <div className="min-h-screen bg-surface">
        <div className="container mx-auto px-4 py-16" dir="rtl">
          <div className="max-w-6xl mx-auto">
            {/* Books Section */}
            <section className="mb-16">
              <h2 className="text-4xl font-bold text-ink mb-8 text-right font-urdu-heading">
                کتابیں
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Book Card 1 */}
                <a 
                  href="/books/book-1" 
                  className="group block bg-surface-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-[3/4] bg-surface-elevated relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-ink-muted font-urdu-body">
                      [کتاب کی تصویر]
                    </div>
                    <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-ink group-hover:text-brand transition-colors font-urdu-heading text-right">
                      کتاب کا عنوان
                    </h3>
                  </div>
                </a>

                {/* Book Card 2 */}
                <a 
                  href="/books/book-2" 
                  className="group block bg-surface-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-[3/4] bg-surface-elevated relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-ink-muted font-urdu-body">
                      [کتاب کی تصویر]
                    </div>
                    <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-ink group-hover:text-brand transition-colors font-urdu-heading text-right">
                      کتاب کا عنوان
                    </h3>
                  </div>
                </a>

                {/* Book Card 3 */}
                <a 
                  href="/books/book-3" 
                  className="group block bg-surface-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-[3/4] bg-surface-elevated relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-ink-muted font-urdu-body">
                      [کتاب کی تصویر]
                    </div>
                    <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-ink group-hover:text-brand transition-colors font-urdu-heading text-right">
                      کتاب کا عنوان
                    </h3>
                  </div>
                </a>
              </div>
            </section>

            {/* Quote */}
            <blockquote className="border-r-4 pr-6 border-brand py-2 mb-12">
              <p className="text-xl italic text-ink-muted font-urdu-body text-right">
                "{t.home.quote}"
              </p>
            </blockquote>

            {/* CTA */}
            <div className="text-right">
              <a 
                href="/work" 
                className="inline-block rounded-xl border-2 border-brand px-6 py-3 text-brand hover:bg-brand hover:text-white transition-colors font-medium font-urdu-body"
              >
                {t.home.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}