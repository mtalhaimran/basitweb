import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://abdulbasitzafar.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/*',
        '/admin/*',
        '/dashboard/*',
        '/drafts/*',
        '/preview',
        '/private/*',
        '/_next/*',
        '/404',
        '/500'
      ]
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}
