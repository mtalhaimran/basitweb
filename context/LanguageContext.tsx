'use client';

import { createContext, useContext } from 'react';
import { useChangeLocale, useCurrentLocale } from '@/locales/client';

interface LanguageContextValue {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useCurrentLocale();
  const changeLocale = useChangeLocale();

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
