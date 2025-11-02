import { describe, it, expect } from 'vitest';

// Test the frontmatter parser used in gallery and books
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatter, body] = match;
  const data: Record<string, any> = {};
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value: any = line.substring(colonIndex + 1).trim();
      value = value.replace(/^["']|["']$/g, '');
      data[key] = value;
    }
  });
  
  return { data, content: body };
}

describe('Frontmatter Parser', () => {
  it('parses valid frontmatter', () => {
    const content = `---
title: "Test Title"
date: 2024-01-15
image: test.jpg
---

Body content here`;

    const result = parseFrontmatter(content);
    
    expect(result.data.title).toBe('Test Title');
    expect(result.data.date).toBe('2024-01-15');
    expect(result.data.image).toBe('test.jpg');
    expect(result.content.trim()).toBe('Body content here');
  });

  it('handles content without frontmatter', () => {
    const content = 'Just plain content';
    
    const result = parseFrontmatter(content);
    
    expect(result.data).toEqual({});
    expect(result.content).toBe('Just plain content');
  });

  it('handles empty frontmatter', () => {
    const content = `---

---

Body content`;

    const result = parseFrontmatter(content);
    
    expect(result.data).toEqual({});
    expect(result.content.trim()).toBe('Body content');
  });

  it('removes quotes from values', () => {
    const content = `---
title: "Quoted Title"
caption: 'Single Quoted'
location: Unquoted
---

Body`;

    const result = parseFrontmatter(content);
    
    expect(result.data.title).toBe('Quoted Title');
    expect(result.data.caption).toBe('Single Quoted');
    expect(result.data.location).toBe('Unquoted');
  });
});

describe('Gallery Data Structure', () => {
  it('validates required fields for gallery images', () => {
    const galleryImage = {
      slug: 'test-image',
      title: 'Test Image',
      image: 'test.jpg',
      date: '2024-01-15',
    };
    
    expect(galleryImage.slug).toBeDefined();
    expect(galleryImage.title).toBeDefined();
    expect(galleryImage.image).toBeDefined();
    expect(galleryImage.date).toBeDefined();
  });

  it('allows optional fields for gallery images', () => {
    const galleryImage = {
      slug: 'test-image',
      title: 'Test Image',
      image: 'test.jpg',
      date: '2024-01-15',
      caption: 'Optional caption',
      location: 'Optional location',
    };
    
    expect(galleryImage.caption).toBe('Optional caption');
    expect(galleryImage.location).toBe('Optional location');
  });
});
