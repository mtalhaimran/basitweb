# عبدالباسط ظفر - Framer-Inspired Urdu Portfolio

A bilingual portfolio website inspired by the Framer "Exposa" template, featuring a warm beige background, red accents, heavy Framer Motion animations, and proper RTL support.

## 🎨 Design Features

### Brand Identity (Framer Template Inspired)
- **Primary Color**: Red (#DC2626) for links, CTAs, and accents
- **Background**: Warm beige (#ECE1D5) inspired by the Framer template
- **Typography**: Satoshi (headings) + Inter (body) + Noto fonts (Urdu)
- **Layout**: Template-style asymmetrical grid with RTL support
- **Animations**: Letter-by-letter reveals and scroll-triggered effects

### Template Adaptations
- **Grid System**: 3-column template grid adapted for Urdu content
- **Card Design**: Clean project cards with hover lift effects
- **Badge System**: Skill badges with border styling from template
- **Navigation**: Minimal header with template-style underline animations

### Name Animation
The hero features an animated name reveal:
- Shows "ب" by default
- On hover/tap: reveals full name "عبدالباسط ظفر"
- Circular glyph slides across the name during animation
- Respects `prefers-reduced-motion`

## 🚀 Tech Stack

- **Framework**: Next.js 13 (App Router) with TypeScript
- **Styling**: Tailwind CSS with Framer template-inspired theme
- **Animations**: Framer Motion for template-style effects
- **Fonts**: Satoshi + Inter + Google Fonts (WOFF2) with performance optimization
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
├── sitemap.ts           # Auto-generated sitemap
└── robots.ts            # SEO robots configuration

components/
├── Header.tsx           # Template-style navigation
├── Footer.tsx           # Minimal footer with template styling
├── TemplateHero.tsx     # Main hero section with grid layout
├── TemplateAbout.tsx    # About section with portrait
├── TemplateTestimonial.tsx # Testimonial section
├── PortfolioGrid.tsx    # Main portfolio layout
├── BookCard.tsx         # Book display with template styling
├── EssayCard.tsx        # Essay display with template styling
├── SearchOverlay.tsx    # Animated search modal
└── NameRevealUrdu.tsx   # "ب" → "عبدالباسط ظفر" animation
```

## 🎭 Template Animation System

### Letter Reveal Animation
```css
.letter-reveal {
  opacity: 0.001;
  filter: blur(10px);
  transform: translateY(10px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Card Animations
- **Hover**: Lift effect (-8px translateY) with shadow enhancement
- **Scale**: Image scale (1.05) on card hover
- **Badges**: Scale and lift effects on skill badges
- **Stagger**: Sequential entrance animations for grids

### Performance Optimizations
- GPU-accelerated transforms (translateY, scale, opacity)
- No layout-shifting animations
- Reduced motion fallbacks
- Optimized spring physics

## 🌐 RTL Implementation

### Template Grid RTL
```css
[dir="rtl"] .template-grid {
  direction: rtl;
}

[dir="rtl"] .template-grid > * {
  direction: ltr;
  text-align: right;
}
```

### Tailwind RTL Utilities
```tsx
// Flexbox RTL
<div className="flex flex-row-reverse space-x-4 space-x-reverse">

// Text alignment
<p className="text-right urdu-text">
```

### Font Loading
```tsx
// Template-inspired font loading
const satoshi = {
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-satoshi'
};
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

## 🎨 Template Customization Guide

### Changing Colors
```css
/* In globals.css */
:root {
  --brand: #DC2626;           /* Change brand color */
  --brand-hover: #B91C1C;
  --surface: #ECE1D5;         /* Template background */
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

### Template Grid System
```css
.template-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
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
2. Upload `out/` directory

## 📝 Content Management

Content is stored in `lib/data/content.ts`. Update with your:
- Books data with Urdu translations
- Essays and articles
- Series entries
- Social links and contact info

## 🔧 Template Features

- ✅ Framer-inspired warm beige background
- ✅ Template-style asymmetrical grid layout
- ✅ Skill badges with border styling
- ✅ Letter-by-letter text reveal animations
- ✅ Project cards with hover lift effects
- ✅ Minimal navigation with underline animations
- ✅ RTL support for Urdu content
- ✅ Bilingual landing page
- ✅ Heavy Framer Motion animations

## 📄 License

MIT License - feel free to use as a template for your own portfolio.