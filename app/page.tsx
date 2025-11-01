import { getI18n, getCurrentLocale } from '@/locales/server';

export const dynamic = 'force-static';

export default async function HomePage() {
  const t = await getI18n();
  const locale = (await getCurrentLocale()) || 'ur';
  const isUrdu = locale === 'ur';

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir={isUrdu ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-5xl font-bold mb-4 text-ink ${isUrdu ? 'font-urdu-heading text-right' : ''}`}>
            {t('home.headline')}
          </h1>
          <p className={`text-2xl text-ink-muted mb-8 ${isUrdu ? 'font-urdu-body text-right' : ''}`}>
            {t('home.subheadline')}
          </p>
          <p className={`text-lg leading-relaxed text-ink mb-12 ${isUrdu ? 'font-urdu-body text-right' : ''}`}>
            {t('home.intro')}
          </p>

          {/* Milestones */}
          <div className="space-y-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex items-center gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <span className="text-brand font-bold">
                  {t(`home.milestone${i}_year` as any)}
                </span>
                <span className={`text-ink ${isUrdu ? 'font-urdu-body' : ''}`}>
                  {t(`home.milestone${i}_text` as any)}
                </span>
              </div>
            ))}
          </div>

          {/* Quote */}
          <blockquote className={`${isUrdu ? 'border-r-4 pr-6' : 'border-l-4 pl-6'} border-brand py-2 mb-12`}>
            <p className={`text-xl italic text-ink-muted ${isUrdu ? 'font-urdu-body text-right' : ''}`}>
              "{t('home.quote')}"
            </p>
          </blockquote>

          {/* CTA */}
          <div className={isUrdu ? 'text-right' : ''}>
            <a 
              href={isUrdu ? "/work" : "/en/work"} 
              className={`inline-block rounded-xl border-2 border-brand px-6 py-3 text-brand hover:bg-brand hover:text-white transition-colors font-medium ${isUrdu ? 'font-urdu-body' : ''}`}
            >
              {t('home.cta')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}