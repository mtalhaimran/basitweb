import { createI18nServer, setStaticParamsLocale } from 'next-international/server';
import { cache } from 'react';

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } = createI18nServer(
  {
    en: () => import('./en.json'),
    ur: () => import('./ur.json'),
  },
  {
    // Make sure the cache is used during build-time rendering
    cache: cache,
  },
);

export { setStaticParamsLocale };