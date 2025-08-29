import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PortfolioGrid } from '@/components/PortfolioGrid';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'عبدالباسط ظفر',
  alternateName: 'Abdul Basit Zafar',
  jobTitle: 'لکھاری اور کہانی گو',
  url: 'https://abdulbasitzafar.com/ur',
  sameAs: [
    'https://twitter.com/abdulbasitzafar',
    'https://linkedin.com/in/abdulbasitzafar'
  ],
  knowsLanguage: ['اردو', 'انگریزی', 'جرمن']
};

export default function UrduHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header lang="ur" />
        <main id="main-content" className="flex-1">
          <PortfolioGrid lang="ur" />
        </main>
        <Footer lang="ur" />
      </div>
    </>
  );
}