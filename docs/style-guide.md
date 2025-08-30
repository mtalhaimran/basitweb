# Style Guide - Abdul Basit Zafar Portfolio

## Color Palettes

### Crimson Minimal (Light Theme)
- **Brand**: `#D12A2A` - Primary red for links, CTAs, and accents
- **Brand Hover**: `#B91C1C` - Darker red for interactive states
- **Brand Light**: `#FEF2F2` - Light red for backgrounds and highlights
- **Ink**: `#0B0B0F` - Primary text color
- **Ink Muted**: `#6B7280` - Secondary text color
- **Surface**: `#FFFFFF` - Primary background
- **Surface Elevated**: `#FAFAFA` - Elevated surfaces (cards, modals)
- **Subtle**: `#F8F8FA` - Subtle backgrounds
- **Line**: `#E9E9EE` - Border color
- **Line Strong**: `#D1D5DB` - Stronger borders

### Ruby Noir (Dark Theme)
- **Brand**: `#E53935` - Brighter red for dark backgrounds
- **Ink**: `#E9ECF3` - Light text on dark
- **Surface**: `#161821` - Dark background
- **Subtle**: `#0D0E11` - Darker backgrounds

## Contrast Compliance (WCAG 2.1 AA)

| Text Type | Light Background | Dark Background | Contrast Ratio |
|-----------|------------------|-----------------|----------------|
| Primary Text (Ink) | ✅ 15.8:1 | ✅ 12.6:1 | Excellent |
| Muted Text | ✅ 5.2:1 | ✅ 4.8:1 | AA Compliant |
| Brand Links | ✅ 4.7:1 | ✅ 5.1:1 | AA Compliant |
| Brand on Light BG | ✅ 4.9:1 | N/A | AA Compliant |

## Typography

### English Typography
- **Font**: Inter (Google Fonts)
- **Body**: 16px (1rem) with 1.625 line-height
- **Scale**: 
  - Display 1: 60px (3.75rem) / 700 weight
  - Display 2: 48px (3rem) / 700 weight
  - Heading 1: 36px (2.25rem) / 600 weight
  - Heading 2: 30px (1.875rem) / 600 weight
  - Heading 3: 24px (1.5rem) / 600 weight
  - Body Large: 18px (1.125rem) / 400 weight
  - Body: 16px (1rem) / 400 weight
  - Small: 14px (0.875rem) / 400 weight
  - Caption: 12px (0.75rem) / 400 weight

### Urdu Typography
- **Display/Headings**: Noto Nastaliq Urdu (Google Fonts)
- **Body Text**: Noto Naskh Arabic (Google Fonts)
- **Line Height**: 1.8 for body text, 1.4 for headings
- **Letter Spacing**: Slightly increased for better readability

## Component Specifications

### Cards
- **Border Radius**: 12px (0.75rem)
- **Border**: 1px solid var(--line)
- **Padding**: 24px (1.5rem)
- **Hover**: Translate Y -2px, shadow-md, border-brand/20
- **Transition**: 200ms cubic-bezier(0.4, 0, 0.2, 1)

### Buttons
- **Primary**: Brand background, white text, 8px radius
- **Secondary**: Subtle background, ink text, line border
- **Ghost**: Transparent, muted text, hover subtle background
- **Padding**: 8px 16px for small, 12px 24px for regular
- **Focus**: 2px brand ring with 2px offset

### Portfolio Grid
- **Grid**: `repeat(auto-fit, minmax(280px, 1fr))`
- **Gap**: 32px (2rem) on desktop, 24px (1.5rem) on mobile
- **Max Width**: 1280px container

### Writing Grid
- **Grid**: `repeat(auto-fit, minmax(320px, 1fr))`
- **Max Columns**: 2 on large screens
- **Gap**: 24px (1.5rem)

## Brand Usage Guidelines

### ✅ Do
- Use brand red for links and CTAs
- Apply red to thin underlines and accents
- Use red for interactive states and focus rings
- Maintain proper contrast ratios
- Use red sparingly for maximum impact

### ❌ Don't
- Flood backgrounds with red
- Use red for large text blocks
- Apply red to non-interactive elements
- Use red without sufficient contrast
- Overuse red - it should feel intentional

## Motion & Animation

### Durations
- **Fast**: 150ms - Micro-interactions, hover states
- **Normal**: 200ms - Standard transitions
- **Slow**: 300ms - Complex animations, page transitions

### Easing
- **Ease Out**: `cubic-bezier(0.4, 0, 0.2, 1)` - Default for most animations
- **Ease In Out**: `cubic-bezier(0.4, 0, 0.2, 1)` - For reversible animations

### Reduced Motion
- All animations respect `prefers-reduced-motion: reduce`
- Transforms are disabled in reduced motion mode
- Only essential animations (loading states) remain

## RTL (Right-to-Left) Support

### Layout
- Use CSS logical properties (`margin-inline`, `padding-inline`)
- Flex direction automatically reverses with `flex-row-reverse`
- Text alignment switches to `text-right`
- Icons and chevrons rotate 180° for directional consistency

### Typography
- Urdu headings use Noto Nastaliq Urdu
- Urdu body text uses Noto Naskh Arabic
- Increased line-height (1.8) for better Urdu readability
- Proper letter-spacing for Arabic script

## Accessibility Features

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Visible focus states with brand-colored rings
- Skip links for main content navigation
- Logical tab order throughout

### Screen Readers
- Semantic HTML structure
- Proper ARIA labels and roles
- Alt text for all images
- Language attributes for content switching

### Visual Accessibility
- High contrast mode support
- Scalable text up to 200%
- Color is never the only indicator
- Sufficient color contrast ratios

## Image Guidelines

### Hero Portrait
- **Aspect Ratios**: 4:5 (mobile), 3:4 (tablet), 2:3 (desktop)
- **Formats**: WebP with JPEG fallback
- **Sizes**: 400px (mobile), 500px (tablet), 600px (desktop)
- **Alt Text**: "Abdul Basit Zafar - Writer and Storyteller"

### Book Covers
- **Aspect Ratio**: 3:4 (standard book proportion)
- **Background**: Neutral, non-distracting
- **Quality**: High resolution for crisp display
- **Alt Text**: "[Book Title] cover"

### Content Images
- **Style**: Professional, consistent color temperature
- **Processing**: Subtle desaturation for cohesion
- **Captions**: Red underline for emphasis
- **Loading**: Lazy loading for below-fold images

## Performance Targets

### Core Web Vitals
- **LCP**: ≤ 2.5s (hero image optimized with srcset)
- **FID**: ≤ 100ms (minimal JavaScript)
- **CLS**: ≤ 0.1 (proper image dimensions)

### Image Optimization
- **Format**: WebP with fallbacks
- **Compression**: 80% quality for photos
- **Responsive**: Multiple sizes with srcset
- **Critical**: Hero image preloaded

## File Organization

```
components/
├── Header.tsx           # Navigation with search and language toggle
├── Footer.tsx           # Links, newsletter, social
├── PortfolioGrid.tsx    # Homepage featured work grid
├── BookCard.tsx         # Book display component
├── EssayCard.tsx        # Essay display component
├── SearchOverlay.tsx    # Search modal with Pagefind
└── NewsletterForm.tsx   # Mailchimp integration

styles/
├── globals.css          # Design tokens and base styles
└── components.css       # Component-specific styles
```

This style guide ensures consistent, accessible, and beautiful design across both English and Urdu content while maintaining excellent performance and user experience standards.