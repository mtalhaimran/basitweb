'use client';

import { createContext, useContext, useState } from 'react';
import { useChangeLocale } from '@/locales/client';

interface LanguageContextValue {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({
  initialLanguage,
  children,
}: {
  initialLanguage: string;
  children: React.ReactNode;
}) {
  const changeLocale = useChangeLocale();
  const [language, setLanguage] = useState(initialLanguage);

  function handleSetLanguage(lang: string) {
    setLanguage(lang);
    changeLocale(lang);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
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
