# عبدالباسط ظفر - Urdu-First Portfolio

A bilingual portfolio website for writer Abdul Basit Zafar, featuring a red designer theme, heavy Framer Motion animations, and proper RTL support.

## 🎨 Design Features

### Brand Identity
- **Primary Color**: Red (#DC2626) for links, CTAs, and accents
- **Typography**: Noto Nastaliq Urdu (headings) + Noto Naskh Arabic (body)
- **Layout**: Urdu-first with RTL support, bilingual landing page
- **Animations**: Heavy hover effects with Framer Motion

### Name Animation
The hero features an animated name reveal:
- Shows "ب" by default
- On hover/tap: reveals full name "عبدالباسط ظفر"
- Circular glyph slides across the name during animation
- Respects `prefers-reduced-motion`

## 🚀 Tech Stack

- **Framework**: Next.js 13 (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom red theme
- **Animations**: Framer Motion for heavy hover effects
- **Fonts**: Google Fonts (WOFF2) with performance optimization
- **SEO**: Automatic sitemap.xml and robots.txt generation

## 📁 Project Structure

```
app/
├── page.tsx              # Urdu homepage (bilingual hero)
├── en/                   # English variant
│   ├── layout.tsx        # English layout (LTR)
│   └── page.tsx          # English homepage
├── work/                 # Filterable work grid
├── books/                # Book pages
├── writing/              # Essay pages
├── about/                # About page
├── contact/              # Contact page
├── ur/bonn-ka-banjara/   # Urdu series
├── sitemap.ts           # Auto-generated sitemap
└── robots.ts            # SEO robots configuration

components/
├── Header.tsx           # Animated navigation with name reveal
├── Footer.tsx           # RTL footer with heavy hover effects
├── PortfolioGrid.tsx    # Animated portfolio grid
├── BookCard.tsx         # Book display with hover animations
├── EssayCard.tsx        # Essay display with motion effects
├── SearchOverlay.tsx    # Animated search modal
└── NameRevealUrdu.tsx   # "ب" → "عبدالباسط ظفر" animation
```

## 🎭 Animation System

### Name Reveal Component
```tsx
import NameRevealUrdu from '@/components/NameRevealUrdu';

// Usage
<NameRevealUrdu className="text-ink" />
```

**Animation Details:**
- **Default State**: Shows circular "ب" badge
- **Hover/Tap**: Reveals full name with spring animation
- **Effects**: Scale, blur, letter-spacing, and circular motion
- **Duration**: 280ms with spring physics
- **Accessibility**: Respects `prefers-reduced-motion`

### Card Animations
- **Hover**: Lift effect (-8px translateY) with shadow enhancement
- **Scale**: Subtle scale (1.05) on interactive elements
- **Underlines**: Animated underline wipe effects
- **Stagger**: Sequential entrance animations for grids

### Performance Optimizations
- GPU-accelerated transforms (translateY, scale, opacity)
- No layout-shifting animations
- Reduced motion fallbacks
- Optimized spring physics

## 🌐 RTL Implementation

### CSS Logical Properties
```css
/* Use logical properties for RTL support */
margin-inline-start: 1rem;  /* Instead of margin-left */
padding-inline-end: 2rem;   /* Instead of padding-right */
border-inline-start: 1px;   /* Instead of border-left */
```

### Tailwind RTL Utilities
```tsx
// Flexbox RTL
<div className="flex flex-row-reverse space-x-4 space-x-reverse">

// Text alignment
<p className="text-right urdu-text">

// Grid positioning (auto-reversed)
<div className="md:col-start-8"> {/* Becomes col-start-1 in RTL */}
```

### Font Loading
```tsx
// Optimized font loading
const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-urdu-heading'
});
```

## 🔍 SEO Configuration

### Sitemap Generation
- **Automatic**: Generates from content data
- **Excludes**: Private routes (/admin, /api, /private, etc.)
- **Hreflang**: Bilingual page alternatives
- **Priority**: Weighted by content importance

### Robots.txt
- **Allows**: All public content
- **Disallows**: Private routes and system directories
- **Blocks**: AI crawlers (GPTBot, ChatGPT, etc.)
- **Sitemap**: References auto-generated sitemap

### Meta Tags
- **Open Graph**: Proper images and descriptions
- **Twitter Cards**: Summary with large image
- **JSON-LD**: Structured data for rich snippets
- **Hreflang**: Language alternatives

## 🎨 Customization Guide

### Changing Colors
```css
/* In globals.css */
:root {
  --brand: theme(colors.blue.600);     /* Change brand color */
  --brand-hover: theme(colors.blue.700);
  --brand-light: theme(colors.blue.50);
}
```

### Adjusting Name Animation
```tsx
// In NameRevealUrdu.tsx
const spring = { 
  type: 'spring', 
  stiffness: 380,    /* Higher = snappier */
  damping: 30,       /* Higher = less bounce */
  mass: 0.6          /* Higher = slower */
};
```

### RTL Utilities
```css
/* Add new RTL spacing */
[dir="rtl"] .space-x-12 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
  margin-right: calc(3rem * var(--tw-space-x-reverse));
  margin-left: calc(3rem * calc(1 - var(--tw-space-x-reverse)));
}
```

## 🚀 Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build and Export
```bash
npm run build
```

### Add Search Indexing
```bash
npx -y pagefind --site out
```

## 📊 Performance Targets

- **LCP**: ≤ 2.5s (optimized hero image)
- **FID**: ≤ 100ms (minimal JavaScript)
- **CLS**: ≤ 0.1 (proper image dimensions)
- **Accessibility**: WCAG 2.1 AA compliant

## 🌍 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `out`
4. Add environment variables if needed

### Static Hosting
1. Run `npm run build`
2. Run `npx -y pagefind --site out`
3. Upload `out/` directory

## 📝 Content Management

Content is stored in `lib/data/content.ts`. Update with your:
- Books data with Urdu translations
- Essays and articles
- Series entries
- Social links and contact info

## 🔧 Removed Features

- ❌ Audio components and players
- ❌ Accessibility settings panel
- ❌ Newsletter signup forms
- ❌ Settings buttons in headers/footers

## 📄 License

MIT License - feel free to use as a template for your own portfolio.