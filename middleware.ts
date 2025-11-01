import { createI18nMiddleware } from 'next-international/middleware';
import type { NextRequest } from 'next/server';

const I18n = createI18nMiddleware({
  locales: ['en', 'ur'],
  defaultLocale: 'ur',
});

export function middleware(request: NextRequest) {
  return I18n(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)|admin|admin/.*).*)',
  ],
};