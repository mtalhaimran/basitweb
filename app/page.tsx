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
  },
  openGraph: {
    title: 'Abdul Basit Zafar - Writer & Storyteller',
    description: 'Portfolio of Abdul Basit Zafar - books, essays, and stories exploring technology, culture, and human experience.',
    images: [{
      url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
      width: 1200,
      height: 630,
      alt: 'Abdul Basit Zafar - Writer & Storyteller'
    }],
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ur_PK'
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@abdulbasitzafar'
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Abdul Basit Zafar',
  jobTitle: 'Writer and Storyteller',
  url: 'https://abdulbasitzafar.com',
  image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  sameAs: [
    'https://twitter.com/abdulbasitzafar',
    'https://linkedin.com/in/abdulbasitzafar'
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Independent'
  },
  knowsLanguage: ['English', 'Urdu', 'German'],
  description: 'Writer and storyteller exploring the intersection of technology, culture, and human experience.'
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