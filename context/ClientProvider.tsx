'use client';

import { I18nProviderClient } from '../locales/client';
import { LanguageProvider } from './LanguageContext';
import { ReactNode } from 'react';

export default function ClientProvider({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  // Ensure locale is valid, default to 'ur' if undefined
  const validLocale = locale && (locale === 'en' || locale === 'ur') ? locale : 'ur';

  return (
    <I18nProviderClient locale={validLocale} fallback={<div>Loading...</div>}>
      <LanguageProvider initialLanguage={validLocale}>
        {children}
      </LanguageProvider>
    </I18nProviderClient>
  );
}