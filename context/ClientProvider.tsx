'use client';

import { I18nProviderClient } from '../locales/client';

export default function ClientProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <I18nProviderClient locale={locale} fallback={<>Loading...</>}>
      {children}
    </I18nProviderClient>
  );
}