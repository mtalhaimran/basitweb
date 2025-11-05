/**
 * Interface for frontmatter data
 */
export interface FrontmatterData {
  [key: string]: string | string[] | number | boolean | undefined;
}

/**
 * Result of parsing frontmatter
 */
export interface FrontmatterResult {
  data: FrontmatterData;
  content: string;
}

/**
 * Parse frontmatter from markdown content
 * @param content - The markdown content with frontmatter
 * @returns Object with parsed frontmatter data and content body
 */
export function parseFrontmatter(content: string): FrontmatterResult {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatter, body] = match;
  const data: FrontmatterData = {};
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value: string = line.substring(colonIndex + 1).trim();
      
      // Remove quotes
      value = value.replace(/^["']|["']$/g, '');
      
      data[key] = value;
    }
  });
  
  return { data, content: body };
}

/**
 * Get the full image path, handling both absolute and relative paths
 * @param imagePath - The image path from content
 * @returns Full image path for Next.js Image component
 */
export function getImagePath(imagePath: string | undefined): string {
  if (!imagePath) return '';
  return imagePath.startsWith('/') ? imagePath : `/images/${imagePath}`;
}
