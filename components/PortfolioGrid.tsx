import Link from 'next/link';
import { ExternalLink, BookOpen, PenTool, Mic, Calendar } from 'lucide-react';
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
    <section 
      className="py-20 bg-hero-gradient" 
      data-pagefind-body
      data-pagefind-filter={`lang:${lang}`}
      data-pagefind-meta={`title:${isUrdu ? 'پورٹ فولیو' : 'Portfolio'}`}
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className={`mb-20 ${isUrdu ? 'text-right' : 'text-center'}`}>
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight ${
            isUrdu ? 'font-urdu-heading' : ''
          }`}>
            {isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
          </h1>
          <p className={`text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed ${
            isUrdu ? 'font-urdu-body mx-auto' : 'mx-auto'
          }`}>
            {isUrdu 
              ? 'ایک لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان پلوں کا کام کرتا ہے۔'
              : 'Writer and storyteller exploring the intersection of technology, culture, and human experience across languages and borders.'
            }
          </p>
        </div>

        {/* Featured Books */}
        <div className="mb-16">
          <div className={`flex items-center justify-between mb-8 ${isUrdu ? 'flex-row-reverse' : ''}`}>
            <h2 className={`text-3xl font-bold ${isUrdu ? 'font-urdu-heading' : ''}`}>
              {isUrdu ? 'کتابیں' : 'Books'}
            </h2>
            <Link 
              href={isUrdu ? '/ur/books' : '/books'}
              className={`text-primary hover:underline font-medium ${isUrdu ? 'font-urdu-body' : ''}`}
            >
              {isUrdu ? 'تمام کتابیں دیکھیں' : 'View all books'}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredBooks.map((book) => (
              <div
                key={book.id}
                className="portfolio-card rounded-xl p-6 group"
              >
                <div className={`flex items-start space-x-4 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="flex-shrink-0">
                    <div className="w-16 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  
                  <div className={`flex-1 min-w-0 ${isUrdu ? 'text-right' : ''}`}>
                    <div className={`flex items-center space-x-2 mb-2 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <span className={`text-xs font-medium text-primary uppercase tracking-wide ${
                        isUrdu ? 'font-urdu-body' : ''
                      }`}>
                        {isUrdu ? 'کتاب' : 'Book'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {book.publishedYear}
                      </span>
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-primary transition-colors ${
                      isUrdu ? 'font-urdu-heading' : ''
                    }`}>
                      {isUrdu && book.titleUrdu ? book.titleUrdu : book.title}
                    </h3>
                    
                    <p className={`text-muted-foreground text-sm mb-4 leading-relaxed ${
                      isUrdu ? 'font-urdu-body' : ''
                    }`}>
                      {isUrdu && book.descriptionUrdu ? book.descriptionUrdu : book.description}
                    </p>

                    <Link 
                      href={`${isUrdu ? '/ur' : ''}/books/${book.slug}`}
                      className={`inline-flex items-center text-sm font-medium text-primary hover:underline focus-ring rounded ${
                        isUrdu ? 'flex-row-reverse font-urdu-body' : ''
                      }`}
                    >
                      {isUrdu ? 'دیکھیں' : 'View'}
                      <ExternalLink className={`w-3 h-3 ${isUrdu ? 'mr-1' : 'ml-1'}`} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Essays */}
        <div className="mb-16">
          <div className={`flex items-center justify-between mb-8 ${isUrdu ? 'flex-row-reverse' : ''}`}>
            <h2 className={`text-3xl font-bold ${isUrdu ? 'font-urdu-heading' : ''}`}>
              {isUrdu ? 'تحریریں' : 'Recent Writing'}
            </h2>
            <Link 
              href={isUrdu ? '/ur/writing' : '/writing'}
              className={`text-primary hover:underline font-medium ${isUrdu ? 'font-urdu-body' : ''}`}
            >
              {isUrdu ? 'تمام تحریریں دیکھیں' : 'View all writing'}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEssays.map((essay) => (
              <article
                key={essay.id}
                className="portfolio-card rounded-xl p-6 group"
              >
                <div className={`flex items-center space-x-2 mb-3 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <PenTool className="w-4 h-4 text-primary" />
                  <span className={`text-xs font-medium text-primary uppercase tracking-wide ${
                    isUrdu ? 'font-urdu-body' : ''
                  }`}>
                    {isUrdu ? 'مضمون' : 'Essay'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(essay.publishedDate).getFullYear()}
                  </span>
                </div>
                
                <h3 className={`text-lg font-bold mb-2 group-hover:text-primary transition-colors ${
                  isUrdu ? 'font-urdu-heading text-right' : ''
                }`}>
                  {isUrdu && essay.titleUrdu ? essay.titleUrdu : essay.title}
                </h3>
                
                <p className={`text-muted-foreground text-sm mb-4 leading-relaxed ${
                  isUrdu ? 'font-urdu-body text-right' : ''
                }`}>
                  {isUrdu && essay.descriptionUrdu ? essay.descriptionUrdu : essay.description}
                </p>

                <div className={`flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
                  <Link 
                    href={`${isUrdu ? '/ur' : ''}/writing/${essay.slug}`}
                    className={`inline-flex items-center text-sm font-medium text-primary hover:underline focus-ring rounded ${
                      isUrdu ? 'flex-row-reverse font-urdu-body' : ''
                    }`}
                  >
                    {isUrdu ? 'پڑھیں' : 'Read'}
                    <ExternalLink className={`w-3 h-3 ${isUrdu ? 'mr-1' : 'ml-1'}`} />
                  </Link>
                  
                  <div className={`flex items-center space-x-1 text-xs text-muted-foreground ${
                    isUrdu ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <Calendar className="w-3 h-3" />
                    <span>{essay.readTime} {isUrdu ? 'منٹ' : 'min'}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Featured Series (Urdu only) */}
        {isUrdu && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 flex-row-reverse">
              <h2 className="text-3xl font-bold font-urdu-heading">سلسلہ</h2>
              <Link 
                href="/ur/bonn-ka-banjara"
                className="text-primary hover:underline font-medium font-urdu-body"
              >
                مکمل سلسلہ دیکھیں
              </Link>
            </div>
            
            <div className="portfolio-card rounded-xl p-8">
              <div className="flex items-start space-x-6 flex-row-reverse space-x-reverse">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center">
                    <Mic className="w-10 h-10 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 text-right">
                  <div className="flex items-center space-x-2 mb-3 flex-row-reverse space-x-reverse">
                    <span className="text-xs font-medium text-primary uppercase tracking-wide font-urdu-body">
                      سلسلہ
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {series.totalEntries} حصے
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 font-urdu-heading">
                    {series.titleUrdu}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed font-urdu-body">
                    {series.descriptionUrdu}
                  </p>

                  <Link 
                    href="/ur/bonn-ka-banjara"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline focus-ring rounded flex-row-reverse font-urdu-body"
                  >
                    شروع کریں
                    <ExternalLink className="w-3 h-3 mr-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className={`text-center bg-muted/50 rounded-2xl p-12 ${isUrdu ? 'text-right' : ''}`}>
          <h2 className={`text-3xl font-bold mb-4 ${isUrdu ? 'font-urdu-heading' : ''}`}>
            {isUrdu ? 'مزید دریافت کریں' : 'Explore More'}
          </h2>
          <p className={`text-muted-foreground mb-8 max-w-2xl mx-auto ${isUrdu ? 'font-urdu-body' : ''}`}>
            {isUrdu 
              ? 'تمام کام، کہانیاں، اور خیالات کو دیکھنے کے لیے مکمل پورٹ فولیو دیکھیں۔'
              : 'Browse the complete portfolio to discover all works, stories, and thoughts across cultures and languages.'
            }
          </p>
          <Link 
            href={isUrdu ? '/ur/work' : '/work'}
            className={`inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium focus-ring ${
              isUrdu ? 'flex-row-reverse font-urdu-body' : ''
            }`}
          >
            {isUrdu ? 'تمام کام دیکھیں' : 'View All Work'}
            <ExternalLink className={`w-4 h-4 ${isUrdu ? 'mr-2' : 'ml-2'}`} />
          </Link>
        </div>
      </div>
    </section>
  );
}