import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abdulbasitzafar.com';
  
  // Static routes - mainly Urdu, English support for landing page and posts only
  const routes = [
    '',
    '/work',
    '/writing',
    '/posts',
    '/books',
    '/about',
    '/contact',
    '/bonn-ka-banjara',
    '/en',
    '/en/posts',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' || route === '/en' ? 1.0 : 0.8,
  }));
}
