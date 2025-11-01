// Simple i18n utility without external dependencies
import urTranslations from '@/locales/ur.json';
import enTranslations from '@/locales/en.json';

export type Locale = 'ur' | 'en';

const translations = {
  ur: urTranslations,
  en: enTranslations
};

export function getTranslations(locale: Locale = 'ur') {
  return translations[locale] || translations.ur;
}

export function t(key: string, locale: Locale = 'ur'): string {
  const trans = getTranslations(locale);
  const keys = key.split('.');
  let value: any = trans;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value as string || key;
}
