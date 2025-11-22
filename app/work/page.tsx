import fs from 'fs';
import path from 'path';
import { WorkPageClient } from '@/components/WorkPageClient';

export const dynamic = 'force-static';

interface ContentItem {
  type: 'book' | 'snippet' | 'bonn';
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
}

// Simple frontmatter parser
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatter, body] = match;
  const data: Record<string, any> = {};
  
  // Parse YAML-like frontmatter
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value: any = line.substring(colonIndex + 1).trim();
      
      // Remove quotes
      value = value.replace(/^["']|["']$/g, '');
      
      // Handle arrays
      if (key === 'categories' || key === 'tags') {
        if (!data[key]) data[key] = [];
      } else {
        data[key] = value;
      }
    } else if (line.trim().startsWith('-')) {
      // Array item
      const lastKey = Object.keys(data).pop();
      if (lastKey && Array.isArray(data[lastKey])) {
        data[lastKey].push(line.trim().substring(1).trim().replace(/^["']|["']$/g, ''));
      }
    }
  });
  
  return { data, content: body };
}

async function getAllContent(): Promise<ContentItem[]> {
  const allContent: ContentItem[] = [];

  try {
    // Get books
    const booksDir = path.join(process.cwd(), 'content/books');
    if (fs.existsSync(booksDir)) {
      const bookFiles = fs.readdirSync(booksDir);
      bookFiles
        .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
        .forEach(filename => {
          const filePath = path.join(booksDir, filename);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data, content } = parseFrontmatter(fileContents);
          
          const excerpt = content.replace(/[#*`]/g, '').trim().slice(0, 200) + '...';
          
          allContent.push({
            type: 'book',
            slug: filename.replace(/\.(mdx|md)$/, ''),
            title: data.title || 'بے عنوان',
            date: data.publishedDate || data.date || new Date().toISOString(),
            excerpt,
            image: data.coverImage
          });
        });
    }

    // Get snippets
    const snippetsDir = path.join(process.cwd(), 'content/snippets');
    if (fs.existsSync(snippetsDir)) {
      const snippetFiles = fs.readdirSync(snippetsDir);
      snippetFiles
        .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
        .forEach(filename => {
          const filePath = path.join(snippetsDir, filename);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data, content } = parseFrontmatter(fileContents);
          
          const excerpt = content.replace(/[#*`]/g, '').trim().slice(0, 150) + '...';
          
          allContent.push({
            type: 'snippet',
            slug: filename.replace(/\.(mdx|md)$/, ''),
            title: data.title || 'بے عنوان',
            date: data.date || new Date().toISOString(),
            excerpt
          });
        });
    }

    // Get bonn-ka-banjara posts (limit to recent 12)
    const bonnDir = path.join(process.cwd(), 'content/bonn-ka-banjara');
    if (fs.existsSync(bonnDir)) {
      const bonnFiles = fs.readdirSync(bonnDir);
      const bonnPosts = bonnFiles
        .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
        .map(filename => {
          const filePath = path.join(bonnDir, filename);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data, content } = parseFrontmatter(fileContents);
          
          const excerpt = content.replace(/[#*`]/g, '').trim().slice(0, 120) + '...';
          
          return {
            type: 'bonn' as const,
            slug: filename.replace(/\.(mdx|md)$/, ''),
            title: data.title || 'بے عنوان',
            date: data.date || new Date().toISOString(),
            excerpt,
            image: data.coverImage
          };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 12);
      
      allContent.push(...bonnPosts);
    }

  } catch (error) {
    console.error('Error loading content:', error);
  }

  // Sort all content by date
  return allContent.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function WorkPage() {
  const allContent = await getAllContent();

  return <WorkPageClient content={allContent} />;
}
