import { getI18n, getCurrentLocale } from '@/locales/server';

export const dynamic = 'force-static';

export default async function WritingPage() {
  const t = await getI18n();
  
  let locale = 'ur';
  try {
    locale = (await getCurrentLocale()) || 'ur';
  } catch (error) {
    locale = 'ur';
  }
  
  const isUrdu = locale === 'ur';

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir={isUrdu ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-4xl font-bold mb-8 text-ink ${isUrdu ? 'font-urdu-heading text-right' : ''}`}>
            {isUrdu ? 'تحریریں' : 'Writing'}
          </h1>
          <p className={`text-lg text-ink-muted ${isUrdu ? 'font-urdu-body text-right' : ''}`}>
            {isUrdu ? 'میری تحریریں جلد دستیاب ہوں گی۔' : 'Writing collection coming soon.'}
          </p>
        </div>
      </div>
    </div>
  );
}
