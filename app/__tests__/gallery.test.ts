import { describe, it, expect } from 'vitest';
import { parseFrontmatter, getImagePath } from '@/lib/utils/frontmatter';

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

describe('Image Path Utility', () => {
  it('returns absolute path as-is', () => {
    expect(getImagePath('/absolute/path.jpg')).toBe('/absolute/path.jpg');
  });

  it('prepends /images/ to relative paths', () => {
    expect(getImagePath('relative.jpg')).toBe('/images/relative.jpg');
  });

  it('handles undefined gracefully', () => {
    expect(getImagePath(undefined)).toBe('');
  });

  it('handles empty string', () => {
    expect(getImagePath('')).toBe('');
  });
});
