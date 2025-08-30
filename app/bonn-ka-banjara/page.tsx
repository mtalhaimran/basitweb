import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { series } from '@/lib/data/content';
import Link from 'next/link';
import { FileText, Calendar, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'بن کا بنجارہ - عبدالباسط ظفر',
  description: 'جرمنی میں ایک آوارہ کی زندگی کی تلاش کا سلسلہ',
};

export default function BonnKaBanjaraPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    name: 'بن کا بنجارہ',
    author: {
      '@type': 'Person',
      name: 'عبدالباسط ظفر'
    },
    description: 'جرمنی میں ایک آوارہ کی زندگی کی تلاش کا سلسلہ',
    numberOfEpisodes: series.totalEntries,
    url: 'https://abdulbasitzafar.com/bonn-ka-banjara'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen" lang="ur" dir="rtl">
        <Header />
        <main id="main-content" className="pt-32 pb-20" data-pagefind-body>
          <div className="container">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <h1 className="section-heading text-3xl sm:text-4xl md:text-5xl urdu-display text-red-600">
                بن کا بنجارہ
              </h1>
              <p className="urdu-body text-gray-600 max-w-3xl mx-auto">
                {series.descriptionUrdu}
              </p>
            </div>

            {/* Series Entries */}
            <div className="max-w-4xl mx-auto space-y-8">
              {series.entries.map((entry, index) => (
                <article
                  key={entry.id}
                  className="portfolio-card group animate-slide-up"
                  style={{animationDelay: `${index * 100}ms`}}
                  data-pagefind-filter={`type:Series,series:bonn-ka-banjara`}
                  data-pagefind-meta={`title:${entry.titleUrdu},date:${entry.publishedDate}`}
                >
                  <div className="text-right">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-caption urdu-body-sm text-gray-500">
                          {new Date(entry.publishedDate).toLocaleDateString('ur-PK')}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <FileText className="w-4 h-4 text-red-600" />
                        <span className="text-caption urdu-body-sm font-semibold text-red-600">
                          حصہ {entry.order}
                        </span>
                      </div>
                    </div>

                    <h2 className="section-heading urdu-heading-2 text-gray-900 group-hover:text-red-600 transition-colors">
                      {entry.titleUrdu}
                    </h2>
                    
                    <p className="urdu-body text-gray-600 mb-6 leading-loose">
                      {entry.descriptionUrdu}
                    </p>

                    <Link 
                      href={`/bonn-ka-banjara/${entry.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition-colors group space-x-reverse"
                    >
                      <span className="urdu-body-sm">پڑھیں</span>
                      <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}