import { getI18n, getCurrentLocale } from '@/locales/server';

export const dynamic = 'force-static';

export default async function AboutPage() {
  const t = await getI18n();
  const locale = (await getCurrentLocale()) || 'ur';
  const isUrdu = locale === 'ur';

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir={isUrdu ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-4xl font-bold mb-8 text-ink ${isUrdu ? 'font-urdu-heading text-right' : ''}`}>
            {isUrdu ? 'میرے بارے میں' : 'About Me'}
          </h1>
          <p className={`text-lg text-ink-muted mb-4 ${isUrdu ? 'font-urdu-body text-right' : ''}`}>
            {isUrdu ? 'میں عبدالباسط ظفر ہوں، جرمنی کے شہر بون میں مقیم ایک لکھاری اور کہانی گو۔' : 'I am Abdul Basit Zafar, a writer and storyteller based in Bonn, Germany.'}
          </p>
          <p className={`text-lg text-ink-muted ${isUrdu ? 'font-urdu-body text-right' : ''}`}>
            {isUrdu ? 'مزید تفصیلات جلد دستیاب ہوں گی۔' : 'More details coming soon.'}
          </p>
        </div>
      </div>
    </div>
  );
}
