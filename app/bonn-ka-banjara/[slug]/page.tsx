import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AudioBlock } from '@/components/AudioBlock';
import { series } from '@/lib/data/content';
import { Calendar, ArrowRight, ArrowLeft, Home } from 'lucide-react';

interface SeriesEntryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return series.entries.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }: SeriesEntryPageProps) {
  const entry = series.entries.find((e) => e.slug === params.slug);
  
  if (!entry) return { title: 'Entry Not Found' };

  return {
    title: `${entry.titleUrdu} - بن کا بنجارہ`,
    description: entry.descriptionUrdu,
  };
}

export default function SeriesEntryPage({ params }: SeriesEntryPageProps) {
  const entry = series.entries.find((e) => e.slug === params.slug);
  
  if (!entry) {
    notFound();
  }

  const currentIndex = series.entries.findIndex((e) => e.slug === params.slug);
  const prevEntry = currentIndex > 0 ? series.entries[currentIndex - 1] : null;
  const nextEntry = currentIndex < series.entries.length - 1 ? series.entries[currentIndex + 1] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.titleUrdu,
    author: {
      '@type': 'Person',
      name: 'عبدالباسط ظفر'
    },
    datePublished: entry.publishedDate,
    description: entry.descriptionUrdu,
    isPartOf: {
      '@type': 'CreativeWorkSeries',
      name: 'بن کا بنجارہ'
    },
    url: `https://abdulbasitzafar.com/bonn-ka-banjara/${entry.slug}`
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
          <article className="container max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-12 text-right">
              <div className="flex items-center space-x-2 justify-end space-x-reverse text-sm text-gray-500 urdu-body-sm">
                <Link href="/" className="hover:text-red-600 transition-colors flex items-center space-x-1 space-x-reverse">
                  <Home className="w-4 h-4" />
                  <span>ہوم</span>
                </Link>
                <span>/</span>
                <Link href="/bonn-ka-banjara" className="hover:text-red-600 transition-colors">بن کا بنجارہ</Link>
                <span>/</span>
                <span className="text-gray-900">{entry.titleUrdu}</span>
              </div>
            </nav>

            {/* Header */}
            <header className="mb-16 text-right">
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full urdu-body-sm">
                  بن کا بنجارہ - حصہ {entry.order}
                </span>
              </div>
              
              <h1 className="urdu-display text-gray-900 mb-8">
                {entry.titleUrdu}
              </h1>
              
              <p className="urdu-body text-gray-600 mb-8 max-w-3xl ml-auto">
                {entry.descriptionUrdu}
              </p>

              <div className="flex items-center space-x-4 justify-end space-x-reverse text-sm text-gray-500">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Calendar className="w-4 h-4" />
                  <span className="urdu-body-sm">
                    {new Date(entry.publishedDate).toLocaleDateString('ur-PK', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </header>

            {/* Audio */}
            {entry.audio && (
              <AudioBlock 
                src={entry.audio.src}
                transcript={entry.audio.transcript}
                title="آڈیو ورژن"
                lang="ur"
              />
            )}

            {/* Content */}
            <div className="prose max-w-none text-right mb-16">
              <div className="urdu-body text-gray-700 leading-loose space-y-8">
                {entry.content.split('\n').map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <nav className="border-t border-gray-200 pt-12">
              <div className="flex justify-between items-center">
                {nextEntry ? (
                  <Link
                    href={`/bonn-ka-banjara/${nextEntry.slug}`}
                    className="flex items-center space-x-4 text-gray-600 hover:text-red-600 transition-colors group space-x-reverse"
                  >
                    <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <div className="text-right">
                      <p className="text-sm font-medium urdu-body-sm">اگلا</p>
                      <p className="urdu-heading-4 text-gray-900">{nextEntry.titleUrdu}</p>
                    </div>
                  </Link>
                ) : <div />}

                {prevEntry ? (
                  <Link
                    href={`/bonn-ka-banjara/${prevEntry.slug}`}
                    className="flex items-center space-x-4 text-gray-600 hover:text-red-600 transition-colors group space-x-reverse"
                  >
                    <div className="text-right">
                      <p className="text-sm font-medium urdu-body-sm">پچھلا</p>
                      <p className="urdu-heading-4 text-gray-900">{prevEntry.titleUrdu}</p>
                    </div>
                    <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : <div />}
              </div>
            </nav>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}