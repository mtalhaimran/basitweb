import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PortfolioGrid } from '@/components/PortfolioGrid';

export const metadata = {
  title: 'عبدالباسط ظفر - لکھاری اور کہانی گو',
  description: 'عبدالباسط ظفر کا پورٹ فولیو - کتابیں، مضامین، اور کہانیاں جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کو دریافت کرتی ہیں۔',
  alternates: {
    languages: {
      'en': '/'
    }
  },
  openGraph: {
    title: 'عبدالباسط ظفر - لکھاری اور کہانی گو',
    description: 'عبدالباسط ظفر کا پورٹ فولیو - کتابیں، مضامین، اور کہانیاں',
    images: [{
      url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
      width: 1200,
      height: 630,
      alt: 'عبدالباسط ظفر - لکھاری اور کہانی گو'
    }],
    type: 'website',
    locale: 'ur_PK',
    alternateLocale: 'en_US'
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'عبدالباسط ظفر',
  alternateName: 'Abdul Basit Zafar',
  jobTitle: 'لکھاری اور کہانی گو',
  url: 'https://abdulbasitzafar.com/ur',
  image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  sameAs: [
    'https://twitter.com/abdulbasitzafar',
    'https://linkedin.com/in/abdulbasitzafar'
  ],
  knowsLanguage: ['اردو', 'انگریزی', 'جرمن'],
  description: 'لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان تعلق کو دریافت کرتا ہے۔'
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