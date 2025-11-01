import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/private'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'anthropic-ai',
          'Claude-Web',
          'cohere-ai',
        ],
        disallow: ['/'],
      },
    ],
    sitemap: 'https://abdulbasitzafar.com/sitemap.xml',
  };
}
