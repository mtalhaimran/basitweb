import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AudioBlock } from '@/components/AudioBlock';
import { essays } from '@/lib/data/content';
import { Calendar, Clock, Building, Tag } from 'lucide-react';

interface EssayPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return essays.map((essay) => ({
    slug: essay.slug,
  }));
}

export async function generateMetadata({ params }: EssayPageProps) {
  const essay = essays.find((e) => e.slug === params.slug);
  
  if (!essay) return { title: 'Essay Not Found' };

  return {
    title: `${essay.title} - Abdul Basit Zafar`,
    description: essay.description,
    openGraph: {
      title: essay.title,
      description: essay.description,
      type: 'article',
      publishedTime: essay.publishedDate,
      authors: ['Abdul Basit Zafar'],
      tags: essay.tags
    }
  };
}

export default function EssayPage({ params }: EssayPageProps) {
  const essay = essays.find((e) => e.slug === params.slug);
  
  if (!essay) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: essay.title,
    author: {
      '@type': 'Person',
      name: 'Abdul Basit Zafar'
    },
    publisher: {
      '@type': 'Organization',
      name: essay.publication || 'Abdul Basit Zafar'
    },
    datePublished: essay.publishedDate,
    description: essay.description,
    keywords: essay.tags.join(', '),
    url: `https://abdulbasitzafar.com/writing/${essay.slug}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1 py-16" data-pagefind-body>
          <article className="container mx-auto px-4 max-w-4xl">
            {/* Header */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{essay.title}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {essay.description}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(essay.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{essay.readTime} min read</span>
                </div>
                
                {essay.publication && (
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>{essay.publication}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {essay.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </header>

            {/* Audio */}
            {essay.audio && (
              <AudioBlock 
                src={essay.audio.src}
                transcript={essay.audio.transcript}
                title="Listen to Essay"
              />
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-lg leading-relaxed">
                {essay.content}
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}