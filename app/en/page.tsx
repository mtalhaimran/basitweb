import { TemplateHero } from '@/components/TemplateHero';
import { getTranslations, type Locale } from '@/lib/i18n';

export const dynamic = 'force-static';

export default async function EnHomePage() {
  const locale: Locale = 'en';
  const t = getTranslations(locale);

  return (
    <>
      <TemplateHero lang="en" />
      <div className="min-h-screen bg-surface">
        <div className="container mx-auto px-4 py-12" dir="ltr">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 text-ink">
              {t.home.headline}
            </h1>
            <p className="text-2xl text-ink-muted mb-8">
              {t.home.subheadline}
            </p>
            <p className="text-lg leading-relaxed text-ink mb-12">
              {t.home.intro}
            </p>

            {/* Milestones */}
            <div className="space-y-6 mb-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-brand font-bold">
                    {t.home[`milestone${i}_year` as keyof typeof t.home]}
                  </span>
                  <span className="text-ink">
                    {t.home[`milestone${i}_text` as keyof typeof t.home]}
                  </span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 pl-6 border-brand py-2 mb-12">
              <p className="text-xl italic text-ink-muted">
                "{t.home.quote}"
              </p>
            </blockquote>

            {/* CTA */}
            <div className="flex gap-4">
              <a 
                href="/en/posts" 
                className="inline-block rounded-xl border-2 border-brand px-6 py-3 text-brand hover:bg-brand hover:text-white transition-colors font-medium"
              >
                English Posts
              </a>
              <a 
                href="/" 
                className="inline-block rounded-xl border-2 border-ink-muted px-6 py-3 text-ink-muted hover:bg-ink-muted hover:text-white transition-colors font-medium"
              >
                View Urdu Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
