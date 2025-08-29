import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PortfolioGrid } from '@/components/PortfolioGrid';

export const metadata = {
  title: 'Abdul Basit Zafar - Writer & Storyteller',
  description: 'Portfolio of Abdul Basit Zafar - books, essays, and stories exploring technology, culture, and human experience.',
  alternates: {
    languages: {
      'ur': '/ur'
    }
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Abdul Basit Zafar',
  jobTitle: 'Writer and Storyteller',
  url: 'https://abdulbasitzafar.com',
  sameAs: [
    'https://twitter.com/abdulbasitzafar',
    'https://linkedin.com/in/abdulbasitzafar'
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Independent'
  },
  knowsLanguage: ['English', 'Urdu', 'German']
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1">
          <PortfolioGrid />
        </main>
        <Footer />
      </div>
    </>
  );
}