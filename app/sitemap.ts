import { MetadataRoute } from 'next';
import { books, essays, series } from '@/lib/data/content';

// Private routes to exclude from sitemap
const PRIVATE_ROUTES = [
  '/admin',
  '/dashboard',
  '/api',
  '/private',
  '/draft',
  '/preview',
  '/test'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abdulbasitzafar.com';
  
  const routes: MetadataRoute.Sitemap = [
    // Main pages (Urdu)
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ur: baseUrl
        }
      }
    },
    // English landing page
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ur: baseUrl
        }
      }
    },
    // Main navigation pages
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Urdu series
    {
      url: `${baseUrl}/ur/bonn-ka-banjara`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ];

  // Add book pages
  books.forEach((book) => {
    routes.push({
      url: `${baseUrl}/books/${book.slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    });
  });

  // Add essay pages
  essays.forEach((essay) => {
    routes.push({
      url: `${baseUrl}/writing/${essay.slug}`,
      lastModified: new Date(essay.publishedDate),
      changeFrequency: 'yearly',
      priority: 0.6,
    });
  });

  // Add series entry pages
  series.entries.forEach((entry) => {
    routes.push({
      url: `${baseUrl}/ur/bonn-ka-banjara/${entry.slug}`,
      lastModified: new Date(entry.publishedDate),
      changeFrequency: 'yearly',
      priority: 0.6,
    });
  });

  // Filter out private routes
  return routes.filter(route => 
    !PRIVATE_ROUTES.some(privateRoute => 
      route.url.includes(privateRoute)
    )
  );
}