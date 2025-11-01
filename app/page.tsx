// app/page.tsx
import { getI18n, getCurrentLocale } from '@/locales/server';

export const dynamic = 'force-static';

export default async function HomePage() {
  const t = await getI18n();
  const locale = (await getCurrentLocale()) || 'ur';
  const isUrdu = locale === 'ur';

  return (
    <main className={`container py-16 ${isUrdu ? 'text-right urdu-text' : ''}`}>
      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          {t('home.headline')}
        </h1>
        <p className="opacity-80 text-lg md:text-xl">
          {t('home.subheadline')}
        </p>
        <p className="max-w-3xl leading-8">
          {t('home.intro')}
        </p>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="border rounded-xl p-4">
          <div className="text-sm opacity-70">{t('home.milestone1_year')}</div>
          <div className="font-semibold">{t('home.milestone1_text')}</div>
        </div>
        <div className="border rounded-xl p-4">
          <div className="text-sm opacity-70">{t('home.milestone2_year')}</div>
          <div className="font-semibold">{t('home.milestone2_text')}</div>
        </div>
        <div className="border rounded-xl p-4">
          <div className="text-sm opacity-70">{t('home.milestone3_year')}</div>
          <div className="font-semibold">{t('home.milestone3_text')}</div>
        </div>
      </section>

      <blockquote className="mt-10 border-s-4 ps-4 italic opacity-80">
        “{t('home.quote')}”
      </blockquote>

      <div className="mt-10">
        <a href="/work" className={`inline-block rounded-xl border px-4 py-2 ${isUrdu ? 'font-urdu-body' : 'font-sans'}`}>
          {t('home.cta')}
        </a>
      </div>
    </main>
  );
}
