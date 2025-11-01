'use client';

import { useChangeLocale, useCurrentLocale } from '@/locales/client';

export default function LocaleSwitch() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  const onToggle = () => {
    changeLocale(locale === 'ur' ? 'en' : 'ur'); // ✅ lets next-international map the URL
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className="px-3 py-2 rounded-xl border"
      aria-label="Toggle language"
    >
      {locale === 'ur' ? 'English' : 'اردو'}
    </button>
  );
}
