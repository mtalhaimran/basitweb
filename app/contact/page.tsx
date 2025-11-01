import { getI18n, getCurrentLocale } from '@/locales/server';

export const dynamic = 'force-static';

export default async function ContactPage() {
  const t = await getI18n();
  const locale = (await getCurrentLocale()) || 'ur';
  const isUrdu = locale === 'ur';

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir={isUrdu ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-4xl font-bold mb-8 text-ink ${isUrdu ? 'font-urdu-heading text-right' : ''}`}>
            {isUrdu ? 'رابطہ' : 'Contact'}
          </h1>
          <div className={`space-y-4 ${isUrdu ? 'text-right' : ''}`}>
            <p className={`text-lg text-ink-muted ${isUrdu ? 'font-urdu-body' : ''}`}>
              {isUrdu ? 'ای میل:' : 'Email:'}
            </p>
            <a 
              href="mailto:hello@abdulbasitzafar.com" 
              className={`text-xl text-brand hover:text-brand-hover transition-colors ${isUrdu ? 'font-urdu-body' : ''}`}
            >
              hello@abdulbasitzafar.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
