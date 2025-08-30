import { MetadataRoute } from 'next';
import { work } from '@/lib/data/work';
import { writing } from '@/lib/data/writing';
import { posts } from '@/lib/data/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abdulbasitzafar.com';

  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/` },
    { url: `${baseUrl}/work` },
    { url: `${baseUrl}/writing` },
    { url: `${baseUrl}/posts` },
    { url: `${baseUrl}/books` },
    { url: `${baseUrl}/about` },
    { url: `${baseUrl}/contact` },
    { url: `${baseUrl}/bonn-ka-banjara` },
    { url: `${baseUrl}/en` }
  ];

  work.forEach((item) => {
    routes.push({ url: `${baseUrl}/work/${item.slug}` });
  });
  writing.forEach((essay) => {
    routes.push({ url: `${baseUrl}/writing/${essay.slug}` });
  });
  posts.forEach((post) => {
    routes.push({ url: `${baseUrl}/posts/${post.slug}` });
  });

  return routes;
}
