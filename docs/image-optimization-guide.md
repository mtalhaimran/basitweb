# Image Optimization Guide

## Hero Portrait Implementation

### Responsive Image Setup
```html
<picture>
  <!-- Desktop: 600x800 -->
  <source 
    media="(min-width: 1024px)" 
    srcSet="hero-portrait-600w.webp 600w, hero-portrait-1200w.webp 1200w"
    sizes="(min-width: 1024px) 600px"
    type="image/webp"
  />
  <!-- Tablet: 500x600 -->
  <source 
    media="(min-width: 768px)" 
    srcSet="hero-portrait-500w.webp 500w, hero-portrait-1000w.webp 1000w"
    sizes="(min-width: 768px) 500px"
    type="image/webp"
  />
  <!-- Mobile: 400x500 -->
  <img
    src="hero-portrait-400w.jpg"
    srcSet="hero-portrait-400w.jpg 400w, hero-portrait-800w.jpg 800w"
    sizes="(max-width: 767px) 400px"
    alt="Abdul Basit Zafar - Writer and Storyteller"
    width="400"
    height="500"
    loading="eager"
    fetchpriority="high"
    className="hero-image"
  />
</picture>
```

### Art Direction Crops
- **Mobile (400x500)**: Tight crop focusing on face and shoulders
- **Tablet (500x600)**: Medium crop including upper torso
- **Desktop (600x800)**: Full portrait with environmental context

## Image Categories

### Book Covers
- **Aspect Ratio**: 3:4 (standard book proportion)
- **Sizes**: 300w, 400w, 600w
- **Background**: Clean, neutral backgrounds
- **Alt Text Pattern**: "[Book Title] cover"
- **Loading**: Lazy loading except for featured books

```html
<img
  src="book-cover-300w.webp"
  srcSet="book-cover-300w.webp 300w, book-cover-600w.webp 600w"
  sizes="(min-width: 768px) 400px, 300px"
  alt="Shadows of Memory cover"
  width="300"
  height="400"
  loading="lazy"
  className="book-cover"
/>
```

### Content Images
- **Style**: Professional photography with consistent color grading
- **Processing**: Slight desaturation for cohesion
- **Captions**: Red underline treatment for emphasis
- **Alt Text**: Descriptive, contextual information

### Decorative Images
- **Alt Text**: Empty (`alt=""`) for purely decorative elements
- **Purpose**: Visual enhancement without content value
- **Loading**: Always lazy loaded

## File Naming Convention

```
hero-portrait-[width]w.[format]
book-[slug]-cover-[width]w.[format]
essay-[slug]-hero-[width]w.[format]
author-headshot-[variant]-[width]w.[format]
```

### Examples
- `hero-portrait-600w.webp`
- `book-shadows-memory-cover-400w.webp`
- `essay-digital-nomad-hero-800w.jpg`
- `author-headshot-professional-400w.webp`

## Compression Targets

### WebP Format (Primary)
- **Quality**: 80% for photos, 90% for graphics
- **Size Target**: <100KB for hero images, <50KB for thumbnails
- **Browser Support**: 95%+ with JPEG fallback

### JPEG Fallback
- **Quality**: 85% for photos
- **Progressive**: Yes for images >50KB
- **Optimization**: Use tools like ImageOptim or Squoosh

## Performance Optimization

### Critical Images (LCP)
- Hero portrait marked with `fetchpriority="high"`
- Preload critical images in `<head>`
- Avoid layout shifts with proper dimensions

### Lazy Loading
- All below-fold images use `loading="lazy"`
- Intersection Observer for custom lazy loading
- Placeholder backgrounds during loading

### CDN Integration
- Use Pexels URLs with optimization parameters
- Example: `?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop`
- Cache headers for static assets

## Responsive Breakpoints

### Image Breakpoints
- **Mobile**: 320px - 767px (400px images)
- **Tablet**: 768px - 1023px (500px images)  
- **Desktop**: 1024px+ (600px+ images)

### Container Queries (Future)
```css
@container (min-width: 400px) {
  .book-cover {
    aspect-ratio: 3/4;
  }
}
```

## Color Grading Rules

### Consistency Guidelines
- **Temperature**: Slightly warm (2700K-3200K)
- **Saturation**: Reduced by 10-15% for cohesion
- **Contrast**: Increased by 5-10% for clarity
- **Shadows**: Lifted slightly to match brand tone

### Brand Integration
- Avoid competing colors that clash with brand red
- Maintain neutral backgrounds for text readability
- Use consistent lighting direction across images

## Alt Text Guidelines

### Descriptive Patterns
- **Author Photos**: "Abdul Basit Zafar - [context/setting]"
- **Book Covers**: "[Book Title] cover"
- **Content Images**: Describe relevant visual information
- **Decorative**: Empty alt attribute (`alt=""`)

### Urdu Alt Text
- Provide Urdu alt text for Urdu pages
- Use proper Urdu typography in alt descriptions
- Maintain cultural context in descriptions

## Loading Strategy

### Above-the-Fold
```html
<img loading="eager" fetchpriority="high" />
```

### Below-the-Fold
```html
<img loading="lazy" />
```

### Progressive Enhancement
- Show placeholder backgrounds immediately
- Load low-quality placeholders first
- Enhance with full-quality images
- Provide loading states for slow connections

## Testing Checklist

### Performance
- [ ] LCP ≤ 2.5s on Fast 3G
- [ ] Images contribute <50% of page weight
- [ ] No layout shifts during image loading
- [ ] Proper caching headers set

### Visual Quality
- [ ] Images sharp on all device densities
- [ ] Consistent color grading across pages
- [ ] No pixelation or compression artifacts
- [ ] Proper aspect ratios maintained

### Accessibility
- [ ] All images have appropriate alt text
- [ ] Decorative images marked correctly
- [ ] Images don't convey essential information alone
- [ ] High contrast mode compatibility

### Cross-Browser
- [ ] WebP support with JPEG fallback
- [ ] Consistent rendering across browsers
- [ ] Mobile Safari compatibility
- [ ] Progressive enhancement working