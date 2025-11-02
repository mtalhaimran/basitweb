import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ur', 'en'];
const defaultLocale = 'ur';

// Paths that should bypass locale handling
const publicPaths = ['/api', '/_next', '/static', '/admin', '/robots.txt', '/sitemap.xml', '/favicon.ico'];

// English pages that exist
const englishPages = ['/posts', '/page'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Handle /en routes - redirect to Urdu if page doesn't exist in English
  if (pathname.startsWith('/en/')) {
    const pathWithoutEn = pathname.replace('/en', '');
    
    // Check if this English page exists
    const englishPageExists = englishPages.some(page => 
      pathWithoutEn.startsWith(page) || pathWithoutEn === page
    );
    
    if (!englishPageExists) {
      // Redirect to Urdu version
      const url = request.nextUrl.clone();
      url.pathname = pathWithoutEn || '/';
      return NextResponse.redirect(url);
    }
    
    return NextResponse.next();
  }

  // Check if pathname already has a locale (but not /en which we handled above)
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // All other paths proceed normally (Urdu is default, no /ur prefix needed)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
