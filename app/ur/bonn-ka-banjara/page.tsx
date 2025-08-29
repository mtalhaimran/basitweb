import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { series } from '@/lib/data/content';
import Link from 'next/link';
import { FileText, Calendar } from 'lucide-react';

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
    url: 'https://abdulbasitzafar.com/ur/bonn-ka-banjara'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header lang="ur" />
        <main id="main-content" className="flex-1 py-16" data-pagefind-body>
          <div className="container mx-auto px-4">
            <div className="text-right mb-12">
              <h1 className="text-4xl font-bold mb-6 urdu-heading">{series.titleUrdu}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl ml-auto urdu-text">
                {series.descriptionUrdu}
              </p>
            </div>

            <div className="grid gap-6">
              {series.entries.map((entry) => (
                <article
                  key={entry.id}
                  className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                  data-pagefind-filter={`type:Series,series:bonn-ka-banjara`}
                  data-pagefind-meta={`title:${entry.titleUrdu},date:${entry.publishedDate}`}
                >
                  <div className="flex justify-between items-start mb-4 flex-row-reverse">
                    <div className="flex items-center space-x-2 flex-row-reverse space-x-reverse">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground urdu-text">
                        حصہ {entry.order}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 flex-row-reverse space-x-reverse text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(entry.publishedDate).toLocaleDateString('ur-PK')}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-3 urdu-heading text-right">
                    {entry.titleUrdu}
                  </h2>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed urdu-text text-right">
                    {entry.descriptionUrdu}
                  </p>

                  <Link 
                    href={`/ur/bonn-ka-banjara/${entry.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline flex-row-reverse urdu-text"
                  >
                    پڑھیں
                    <FileText className="w-3 h-3 mr-1" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </main>
        <Footer lang="ur" />
      </div>
    </>
  );
}