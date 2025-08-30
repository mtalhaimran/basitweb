import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { books } from '@/lib/data/content';
import Image from 'next/image';
import { ExternalLink, Calendar, Building, Hash } from 'lucide-react';
import Link from 'next/link';

interface BookPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return books.map((book) => ({
    slug: book.slug,
  }));
}

export async function generateMetadata({ params }: BookPageProps) {
  const book = books.find((b) => b.slug === params.slug);
  
  if (!book) return { title: 'Book Not Found' };

  return {
    title: `${book.title} - Abdul Basit Zafar`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: [{ url: book.coverImage, width: 400, height: 600, alt: `${book.title} cover` }],
      type: 'book',
      book: {
        isbn: book.isbn,
        releaseDate: book.publishedYear.toString(),
        author: 'Abdul Basit Zafar'
      }
    }
  };
}

export default function BookPage({ params }: BookPageProps) {
  const book = books.find((b) => b.slug === params.slug);
  
  if (!book) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: {
      '@type': 'Person',
      name: 'Abdul Basit Zafar'
    },
    publisher: book.publisher,
    isbn: book.isbn,
    datePublished: book.publishedYear.toString(),
    description: book.description,
    image: book.coverImage,
    url: `https://abdulbasitzafar.com/books/${book.slug}`
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
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Book Cover */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-2xl mb-6">
                    <Image
                      src={book.coverImage}
                      alt={`${book.title} cover`}
                      fill
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  </div>
                  
                  {/* Buy Links */}
                  {book.buyLinks && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                        Get the Book
                      </h3>
                      {Object.entries(book.buyLinks).map(([store, url]) => (
                        <Link
                          key={store}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between w-full p-3 border rounded-md hover:bg-accent transition-colors"
                        >
                          <span className="capitalize font-medium">{store}</span>
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Book Details */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h1 className="section-heading text-3xl sm:text-4xl md:text-5xl">{book.title}</h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">{book.description}</p>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Published</p>
                      <p className="text-sm text-muted-foreground">{book.publishedYear}</p>
                    </div>
                  </div>
                  
                  {book.publisher && (
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Publisher</p>
                        <p className="text-sm text-muted-foreground">{book.publisher}</p>
                      </div>
                    </div>
                  )}
                  
                  {book.isbn && (
                    <div className="flex items-center space-x-3">
                      <Hash className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">ISBN</p>
                        <p className="text-sm text-muted-foreground">{book.isbn}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                {book.excerpt && (
                  <div className="prose prose-lg max-w-none">
                    <h2 className="section-heading">Excerpt</h2>
                    <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground text-lg leading-relaxed">
                      {book.excerpt}
                    </blockquote>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}