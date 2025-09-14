'use client';

import { I18nProviderClient } from '../locales/client';
import { LanguageProvider } from './LanguageContext';

export default function ClientProvider({
  locale,
  children,
}: {
  locale?: string;
  children: React.ReactNode;
}) {
  const safeLocale = locale ?? 'en';

  return (
    <I18nProviderClient locale={safeLocale} fallback={<>Loading...</>}>
      <LanguageProvider initialLanguage={safeLocale}>{children}</LanguageProvider>
    </I18nProviderClient>
  );
}