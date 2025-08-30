import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PortfolioGrid } from '@/components/PortfolioGrid';
import { motion } from 'framer-motion';

export const metadata = {
  title: 'Abdul Basit Zafar - Writer and Storyteller',
  description: 'Abdul Basit Zafar\'s portfolio - books, essays, and stories exploring technology, culture, and human experience.',
  openGraph: {
    title: 'Abdul Basit Zafar - Writer and Storyteller',
    description: 'Abdul Basit Zafar\'s portfolio - books, essays, and stories',
    images: [{
      url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
      width: 1200,
      height: 630,
      alt: 'Abdul Basit Zafar - Writer and Storyteller'
    }],
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@abdulbasitzafar'
  },
  alternates: {
    canonical: 'https://abdulbasitzafar.com/en',
    languages: {
      'ur': 'https://abdulbasitzafar.com',
      'en': 'https://abdulbasitzafar.com/en'
    }
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Abdul Basit Zafar',
  alternateName: 'عبدالباسط ظفر',
  jobTitle: 'Writer and Storyteller',
  url: 'https://abdulbasitzafar.com',
  image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  sameAs: [
    'https://twitter.com/abdulbasitzafar',
    'https://linkedin.com/in/abdulbasitzafar'
  ],
  knowsLanguage: ['English', 'Urdu', 'German'],
  description: 'Writer and storyteller exploring the intersection of technology, culture, and human experience.'
};

export default function EnglishHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen" lang="en" dir="ltr">
        <Header />
        <main id="main-content">
          <PortfolioGrid lang="en" />
        </main>
        <Footer />
      </div>
    </>
  );
}