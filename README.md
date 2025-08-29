# abdulbasitzafar.com

A bilingual portfolio website for writer Abdul Basit Zafar, featuring books, essays, and stories in English and Urdu.

## Features

- **Bilingual Support**: Full English and Urdu (RTL) language support
- **Search**: Pagefind integration with keyboard shortcuts (Ctrl+K)
- **Audio**: HTML5 audio player with transcript support
- **Newsletter**: Mailchimp integration with double opt-in
- **SEO**: JSON-LD structured data, sitemap, and social meta tags
- **Responsive**: Mobile-first design with proper RTL considerations

## Tech Stack

- **Framework**: Next.js 13 (App Router) with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Search**: Pagefind for static site search
- **Deployment**: Static export for Vercel or any static hosting
- **Typography**: Inter for Latin, Noto fonts for Urdu

## Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build and Export

```bash
npm run build
```

This creates an `out/` directory with the static site.

### Add Search Indexing

After building, run Pagefind to index the exported site:

```bash
npx -y pagefind --site out
```

This creates `/pagefind` assets in the `out/` directory.

## Project Structure

```
app/
├── page.tsx              # EN homepage
├── ur/                   # Urdu pages
│   ├── page.tsx          # UR homepage
│   └── bonn-ka-banjara/  # Urdu series
├── work/                 # Filterable work grid
├── books/                # Book pages
├── writing/              # Essay pages
├── about/                # About page
├── contact/              # Contact page
└── sitemap.ts           # Auto-generated sitemap

components/
├── Header.tsx           # Main navigation
├── Footer.tsx           # Footer with newsletter
├── SearchOverlay.tsx    # Search modal
├── PortfolioGrid.tsx    # Homepage portfolio grid
├── BookCard.tsx         # Book display component
├── EssayCard.tsx        # Essay display component
├── NewsletterForm.tsx   # Mailchimp signup
└── AudioBlock.tsx       # Audio player with transcript

lib/
└── data/
    └── content.ts       # Sample books, essays, series
```

## Testing Instructions

### 1. Test RTL Support
- Navigate to `/ur` to see the Urdu homepage
- Verify text alignment, navigation, and layout are properly right-to-left
- Check that fonts load correctly (Noto Nastaliq Urdu for headings, Noto Naskh Arabic for body)

### 2. Test Search Functionality
- Press `Ctrl+K` (or `Cmd+K` on Mac) to open search overlay
- Search for content like "memory", "technology", or "بن"
- Verify results show with proper filtering and metadata

### 3. Test Newsletter Signup
- Visit `/newsletter` or use footer form
- Enter email and submit
- Verify confirmation message appears (simulated Mailchimp integration)

### 4. Test Audio Player
- Visit any book page (e.g., `/books/shadows-of-memory`)
- Test audio playback controls
- Toggle transcript visibility

### 5. Test Navigation
- Use keyboard navigation (Tab key)
- Test skip links for accessibility
- Verify language switcher works between EN/UR versions

## Deployment

### Vercel
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `out`
4. Deploy

### Manual Static Hosting
1. Run `npm run build` to generate static files
2. Run `npx -y pagefind --site out` to add search
3. Upload `out/` directory to any static hosting service

## Environment Variables

For newsletter functionality, add these to your environment:

```
MAILCHIMP_API_KEY=your_api_key
MAILCHIMP_LIST_ID=your_list_id
```

## Content Management

Sample content is stored in `lib/data/content.ts`. Replace with your actual:
- Books data
- Essays and articles
- Series entries
- Press mentions
- Talk information

## License

MIT License - feel free to use this as a template for your own portfolio.