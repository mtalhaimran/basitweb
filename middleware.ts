import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest } from 'next/server';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ur'],
  defaultLocale: 'ur',
  // No prefix for the default locale (Urdu)
  urlMapping: [
    { locale: 'en', hrefLang: 'en-US' },
    { locale: 'ur', hrefLang: 'ur-PK' },
  ],
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};