'use client';

import { createContext, useContext, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface LanguageContextValue {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({
  initialLanguage,
  children,
}: {
  initialLanguage?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = useState(initialLanguage ?? 'ur');

  function handleSetLanguage(lang: string) {
    if (!lang) return;
    const basePath =
      pathname.replace(new RegExp(`^/${language}`), '') || '/';
    setLanguage(lang);
    const newPath =
      lang === 'ur'
        ? basePath
        : basePath === '/'
          ? `/${lang}`
          : `/${lang}${basePath}`;
    router.push(newPath);
    router.refresh();
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
