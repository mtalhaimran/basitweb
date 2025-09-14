'use client';

import { I18nProviderClient } from '../locales/client';
import { LanguageProvider } from './LanguageContext';

export default function ClientProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <I18nProviderClient locale={locale} fallback={<>Loading...</>}>
      <LanguageProvider initialLanguage={locale}>{children}</LanguageProvider>
    </I18nProviderClient>
  );
}