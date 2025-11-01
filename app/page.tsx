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
            {/* Milestones Timeline with Images */}
            <div className="space-y-12 mb-16">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Image Placeholder */}
                  <div className="flex-shrink-0 w-64 h-64 bg-surface-elevated rounded-lg shadow-md flex items-center justify-center border-2 border-line">
                    <div className="text-center">
                      <div className="text-6xl mb-2 text-brand font-urdu-heading">
                        {t.home[`milestone${i}_year` as keyof typeof t.home]}
                      </div>
                      <div className="text-sm text-ink-muted font-urdu-body px-4">
                        [صورت یہاں رکھیں]
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Content */}
                  <div className="flex-1">
                    <div className={`bg-surface-white rounded-lg p-6 shadow-sm border-r-4 border-brand ${i % 2 === 0 ? 'text-right' : 'text-right'}`}>
                      <h3 className="text-3xl font-bold text-brand mb-3 font-urdu-heading">
                        {t.home[`milestone${i}_year` as keyof typeof t.home]}
                      </h3>
                      <p className="text-lg text-ink font-urdu-body leading-relaxed">
                        {t.home[`milestone${i}_text` as keyof typeof t.home]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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