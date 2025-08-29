import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, PenTool, Mic, Calendar, ExternalLink } from 'lucide-react';
import { books, essays, series } from '@/lib/data/content';

interface PortfolioGridProps {
  lang?: 'en' | 'ur';
}

export function PortfolioGrid({ lang = 'en' }: PortfolioGridProps) {
  const isUrdu = lang === 'ur';
  
  // Create featured portfolio items
  const featuredBooks = books.slice(0, 2);
  const featuredEssays = essays.slice(0, 3);
  const featuredSeries = isUrdu ? [series] : [];

  return (
    <section className="py-20 hero-gradient" data-pagefind-body>
      <div className="container">
        {/* Hero Section */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 ${
          isUrdu ? 'lg:grid-cols-2' : ''
        }`}>
          {/* Portrait */}
          <div className={`${isUrdu ? 'lg:order-2' : 'order-1'}`}>
            <div className="relative">
              <picture>
                <source 
                  media="(min-width: 1024px)" 
                  srcSet="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop 600w"
                  sizes="(min-width: 1024px) 600px"
                />
                <source 
                  media="(min-width: 768px)" 
                  srcSet="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop 500w"
                  sizes="(min-width: 768px) 500px"
                />
                <Image
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop"
                  alt={isUrdu ? 'عبدالباسط ظفر - لکھاری اور کہانی گو' : 'Abdul Basit Zafar - Writer and Storyteller'}
                  width={400}
                  height={500}
                  priority
                  className="hero-image rounded-2xl shadow-xl w-full max-w-md mx-auto"
                  unoptimized
                />
              </picture>
              
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand/10 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Hero Content */}
          <div className={`${isUrdu ? 'lg:order-1 text-right' : 'order-2'}`}>
            <h1 className={`mb-6 text-balance ${
              isUrdu ? 'urdu-display' : 'text-display-1'
            }`}>
              {isUrdu 
                ? 'عبدالباسط ظفر'
                : 'Abdul Basit Zafar'
              }
            </h1>
            
            <p className={`mb-8 text-pretty ${
              isUrdu ? 'urdu-body text-ink-muted' : 'text-body-lg text-ink-muted'
            }`}>
              {isUrdu 
                ? 'ایک لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان پلوں کا کام کرتا ہے۔ کہانیاں جو دنیاوں کو جوڑتی ہیں۔'
                : 'Writer and storyteller exploring the intersection of technology, culture, and human experience. Stories that connect worlds across languages and borders.'
              }
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 ${
              isUrdu ? 'sm:flex-row-reverse' : ''
            }`}>
              <Link 
                href={isUrdu ? '/ur/work' : '/work'}
                className={`btn btn-primary ${isUrdu ? 'urdu-body-sm' : ''}`}
              >
                {isUrdu ? 'کام دیکھیں' : 'View Work'}
                <ArrowRight className={`w-4 h-4 ${isUrdu ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Link>
              
              <Link 
                href={isUrdu ? '/ur/about' : '/about'}
                className={`btn btn-secondary ${isUrdu ? 'urdu-body-sm' : ''}`}
              >
                {isUrdu ? 'تعارف' : 'About'}
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Work Grid */}
        <div className="space-y-16">
          {/* Books Section */}
          <div>
            <div className={`flex items-center justify-between mb-8 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <h2 className={`${isUrdu ? 'urdu-heading-2' : 'text-heading-2'}`}>
                {isUrdu ? 'کتابیں' : 'Books'}
              </h2>
              <Link 
                href={isUrdu ? '/ur/books' : '/books'}
                className={`link text-sm ${isUrdu ? 'urdu-body-sm' : ''}`}
              >
                {isUrdu ? 'تمام کتابیں' : 'View all'}
                <ArrowRight className={`w-3 h-3 inline ${isUrdu ? 'mr-1 rotate-180' : 'ml-1'}`} />
              </Link>
            </div>
            
            <div className="portfolio-grid">
              {featuredBooks.map((book) => (
                <article
                  key={book.id}
                  className="portfolio-card group"
                  data-pagefind-filter={`type:Book,year:${book.publishedYear}`}
                >
                  <div className={`flex items-start space-x-4 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      <div className="w-16 h-20 bg-gradient-to-br from-brand/10 to-brand/5 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-brand" />
                      </div>
                    </div>
                    
                    <div className={`flex-1 min-w-0 ${isUrdu ? 'text-right' : ''}`}>
                      <div className={`flex items-center space-x-2 mb-2 text-caption ${
                        isUrdu ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <span className={`uppercase tracking-wide font-medium ${
                          isUrdu ? 'urdu-body-sm' : ''
                        }`}>
                          {isUrdu ? 'کتاب' : 'Book'}
                        </span>
                        <span>•</span>
                        <span>{book.publishedYear}</span>
                      </div>
                      
                      <h3 className={`portfolio-title mb-2 ${
                        isUrdu ? 'urdu-heading-3' : 'text-heading-3'
                      }`}>
                        {isUrdu && book.titleUrdu ? book.titleUrdu : book.title}
                      </h3>
                      
                      <p className={`text-ink-muted mb-4 line-clamp-2 ${
                        isUrdu ? 'urdu-body-sm' : 'text-body-sm'
                      }`}>
                        {isUrdu && book.descriptionUrdu ? book.descriptionUrdu : book.description}
                      </p>

                      <Link 
                        href={`${isUrdu ? '/ur' : ''}/books/${book.slug}`}
                        className={`link text-sm font-medium ${isUrdu ? 'urdu-body-sm' : ''}`}
                      >
                        {isUrdu ? 'دیکھیں' : 'view'}
                        <ArrowRight className={`w-3 h-3 inline ${isUrdu ? 'mr-1 rotate-180' : 'ml-1'}`} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Writing Section */}
          <div>
            <div className={`flex items-center justify-between mb-8 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <h2 className={`${isUrdu ? 'urdu-heading-2' : 'text-heading-2'}`}>
                {isUrdu ? 'حالیہ تحریریں' : 'Recent Writing'}
              </h2>
              <Link 
                href={isUrdu ? '/ur/writing' : '/writing'}
                className={`link text-sm ${isUrdu ? 'urdu-body-sm' : ''}`}
              >
                {isUrdu ? 'تمام تحریریں' : 'View all'}
                <ArrowRight className={`w-3 h-3 inline ${isUrdu ? 'mr-1 rotate-180' : 'ml-1'}`} />
              </Link>
            </div>
            
            <div className="writing-grid">
              {featuredEssays.map((essay) => (
                <article
                  key={essay.id}
                  className="portfolio-card group"
                  data-pagefind-filter={`type:Essay,year:${new Date(essay.publishedDate).getFullYear()}`}
                >
                  <div className={`flex items-center space-x-2 mb-3 text-caption ${
                    isUrdu ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <PenTool className="w-4 h-4 text-brand" />
                    <span className={`uppercase tracking-wide font-medium ${
                      isUrdu ? 'urdu-body-sm' : ''
                    }`}>
                      {isUrdu ? 'مضمون' : 'Essay'}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(essay.publishedDate).toLocaleDateString(isUrdu ? 'ur-PK' : 'en-US', {
                        year: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                  
                  <h3 className={`portfolio-title mb-2 ${
                    isUrdu ? 'urdu-heading-3' : 'text-heading-3'
                  }`}>
                    {isUrdu && essay.titleUrdu ? essay.titleUrdu : essay.title}
                  </h3>
                  
                  <p className={`text-ink-muted mb-4 line-clamp-2 ${
                    isUrdu ? 'urdu-body-sm' : 'text-body-sm'
                  }`}>
                    {isUrdu && essay.descriptionUrdu ? essay.descriptionUrdu : essay.description}
                  </p>

                  <div className={`flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
                    <Link 
                      href={`${isUrdu ? '/ur' : ''}/writing/${essay.slug}`}
                      className={`link text-sm font-medium ${isUrdu ? 'urdu-body-sm' : ''}`}
                    >
                      {isUrdu ? 'پڑھیں' : 'read'}
                      <ArrowRight className={`w-3 h-3 inline ${isUrdu ? 'mr-1 rotate-180' : 'ml-1'}`} />
                    </Link>
                    
                    <span className={`text-caption ${isUrdu ? 'urdu-body-sm' : ''}`}>
                      {essay.readTime} {isUrdu ? 'منٹ' : 'min'}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Series Section (Urdu only) */}
          {isUrdu && featuredSeries.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8 flex-row-reverse">
                <h2 className="urdu-heading-2">سلسلہ</h2>
                <Link 
                  href="/ur/bonn-ka-banjara"
                  className="link text-sm urdu-body-sm"
                >
                  مکمل سلسلہ
                  <ArrowRight className="w-3 h-3 inline mr-1 rotate-180" />
                </Link>
              </div>
              
              <div className="portfolio-card">
                <div className="flex items-start space-x-6 flex-row-reverse space-x-reverse">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand/10 to-brand/5 rounded-xl flex items-center justify-center">
                      <Mic className="w-10 h-10 text-brand" />
                    </div>
                  </div>
                  
                  <div className="flex-1 text-right">
                    <div className="flex items-center space-x-2 mb-3 text-caption flex-row-reverse space-x-reverse">
                      <span className="uppercase tracking-wide font-medium urdu-body-sm">
                        سلسلہ
                      </span>
                      <span>•</span>
                      <span className="urdu-body-sm">
                        {series.totalEntries} حصے
                      </span>
                    </div>
                    
                    <h3 className="portfolio-title urdu-heading-2 mb-3">
                      {series.titleUrdu}
                    </h3>
                    
                    <p className="text-ink-muted mb-6 urdu-body">
                      {series.descriptionUrdu}
                    </p>

                    <Link 
                      href="/ur/bonn-ka-banjara"
                      className="link text-sm font-medium urdu-body-sm"
                    >
                      شروع کریں
                      <ArrowRight className="w-3 h-3 inline mr-1 rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className={`text-center bg-subtle rounded-2xl p-12 ${isUrdu ? 'text-right' : ''}`}>
          <h2 className={`mb-4 ${isUrdu ? 'urdu-heading-2' : 'text-heading-2'}`}>
            {isUrdu ? 'مزید دریافت کریں' : 'Explore More'}
          </h2>
          <p className={`text-ink-muted mb-8 max-w-2xl mx-auto ${
            isUrdu ? 'urdu-body' : 'text-body-lg'
          }`}>
            {isUrdu 
              ? 'تمام کام، کہانیاں، اور خیالات کو دیکھنے کے لیے مکمل پورٹ فولیو دیکھیں۔'
              : 'Browse the complete portfolio to discover all works, stories, and thoughts across cultures and languages.'
            }
          </p>
          <Link 
            href={isUrdu ? '/ur/work' : '/work'}
            className={`btn btn-primary ${isUrdu ? 'urdu-body-sm' : ''}`}
          >
            {isUrdu ? 'تمام کام دیکھیں' : 'View All Work'}
            <ExternalLink className={`w-4 h-4 ${isUrdu ? 'mr-2' : 'ml-2'}`} />
          </Link>
        </div>
      </div>
    </section>
  );
}