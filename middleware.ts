import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that should bypass middleware
const publicPaths = ['/api', '/_next', '/static', '/admin', '/robots.txt', '/sitemap.xml', '/favicon.ico'];

// Only /en landing page and /en/posts exist in English
const validEnglishPaths = ['/en', '/en/posts'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Handle /en routes - only allow /en and /en/posts, redirect everything else to Urdu
  if (pathname.startsWith('/en')) {
    // Check if this is a valid English path
    const isValidEnglishPath = validEnglishPaths.some(validPath => 
      pathname === validPath || (validPath === '/en/posts' && pathname.startsWith('/en/posts/'))
    );
    
    if (!isValidEnglishPath) {
      // Redirect to Urdu version (remove /en prefix)
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace('/en', '') || '/';
      return NextResponse.redirect(url);
    }
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
