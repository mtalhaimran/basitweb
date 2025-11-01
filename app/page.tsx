import { getI18n, getCurrentLocale } from '@/locales/server';

export const dynamic = 'force-static';

export default async function HomePage() {
  const t = await getI18n();
  const locale = (await getCurrentLocale()) || 'ur';
  const isUrdu = locale === 'ur';

  return (
          {t('home.headline')}
          {t('home.subheadline')}
          {t('home.intro')}
        {[1, 2, 3].map((i) => (

              {t(`home.milestone${i}_year` as any)}

              {t(`home.milestone${i}_text` as any)}
            
          
        ))}
      

      
        "{t('home.quote')}"
      

      
        <a 
          href={isUrdu ? "/work" : "/en/work"} 
          className={`inline-block rounded-xl border px-4 py-2 hover:bg-brand hover:text-white transition-colors ${isUrdu ? 'urdu-text' : ''}`}
        >
          {t('home.cta')}
        
      
    
  );
}