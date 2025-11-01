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
        <div className="container mx-auto px-4 py-12" dir="rtl">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 text-ink font-urdu-heading text-right">
              {t.home.headline}
            </h1>
            <p className="text-lg leading-relaxed text-ink mb-12 font-urdu-body text-right">
              {t.home.intro}
            </p>

            {/* Milestones */}
            <div className="space-y-6 mb-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 flex-row-reverse">
                  <span className="text-brand font-bold">
                    {t.home[`milestone${i}_year` as keyof typeof t.home]}
                  </span>
                  <span className="text-ink font-urdu-body">
                    {t.home[`milestone${i}_text` as keyof typeof t.home]}
                  </span>
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