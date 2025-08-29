import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, BookOpen, PenTool, Mic, Calendar, Star } from 'lucide-react';
import { books, essays, series } from '@/lib/data/content';

interface PortfolioGridProps {
  lang?: 'en' | 'ur';
}

export function PortfolioGrid({ lang = 'en' }: PortfolioGridProps) {
  const isUrdu = lang === 'ur';
  const featuredBooks = books.slice(0, 2);
  const featuredEssays = essays.slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isUrdu ? 'lg:grid-cols-2' : ''}`}>
            {/* Portrait */}
            <div className={`${isUrdu ? 'order-1 lg:order-2' : 'order-2 lg:order-1'}`}>
              <div className="relative max-w-lg mx-auto">
                <picture>
                  {/* Desktop: 600x800 */}
                  <source 
                    media="(min-width: 1024px)" 
                    srcSet="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop 600w, https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop 1200w"
                    sizes="(min-width: 1024px) 600px"
                  />
                  {/* Tablet: 500x600 */}
                  <source 
                    media="(min-width: 768px)" 
                    srcSet="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop 500w, https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1200&fit=crop 1000w"
                    sizes="(min-width: 768px) 500px"
                  />
                  {/* Mobile: 400x500 */}
                  <Image
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop"
                    alt={isUrdu ? 'عبدالباسط ظفر - لکھاری اور کہانی گو' : 'Abdul Basit Zafar - Writer and Storyteller'}
                    width={400}
                    height={500}
                    className="w-full h-auto rounded-3xl shadow-2xl"
                    priority
                    unoptimized
                  />
                </picture>
                
                {/* Floating accents */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-red-100 rounded-full blur-3xl animate-float opacity-60"></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-red-50 rounded-full blur-2xl animate-float opacity-40" style={{animationDelay: '2s'}}></div>
              </div>
            </div>

            {/* Hero Content */}
            <div className={`${isUrdu ? 'order-2 lg:order-1 text-right' : 'order-1 lg:order-2 text-left'}`}>
              <div className="animate-fade-in">
                <h1 className={`text-display mb-8 ${isUrdu ? 'urdu-display' : 'text-gradient'}`}>
                  {isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
                </h1>
                
                <p className={`large-text mb-12 max-w-2xl ${isUrdu ? 'urdu-text ml-auto' : 'mx-auto lg:mx-0'}`}>
                  {isUrdu 
                    ? 'لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان تعلق کو دریافت کرتا ہے۔ کہانیاں جو زبانوں اور سرحدوں کے پار دنیاوں کو جوڑتی ہیں۔'
                    : 'Writer and storyteller exploring the intersection of technology, culture, and human experience. Stories that connect worlds across languages and borders.'
                  }
                </p>

                <div className={`flex flex-col sm:flex-row gap-6 ${isUrdu ? 'justify-end sm:flex-row-reverse' : 'justify-start'}`}>
                  <Link 
                    href="/work"
                    className="btn btn-primary group"
                  >
                    <span className={isUrdu ? 'urdu-text' : ''}>
                      {isUrdu ? 'میرا کام دیکھیں' : 'View My Work'}
                    </span>
                    <ArrowUpRight className={`w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isUrdu ? 'mr-2' : 'ml-2'}`} />
                  </Link>
                  
                  <Link 
                    href="/about"
                    className={`btn btn-secondary ${isUrdu ? 'urdu-text' : ''}`}
                  >
                    {isUrdu ? 'تعارف' : 'About Me'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="work-section">
        <div className="container">
          {/* Books Section */}
          <div className="mb-24">
            <div className={`flex items-end justify-between mb-16 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
              <div>
                <h2 className={`text-heading-2 mb-4 ${isUrdu ? 'urdu-heading' : ''}`}>
                  {isUrdu ? 'تازہ کتابیں' : 'Latest Books'}
                </h2>
                <p className={`large-text ${isUrdu ? 'urdu-text' : ''}`}>
                  {isUrdu ? 'شناخت، ٹیکنالوجی، اور انسانی رشتوں کو دریافت کرنے والے ناول' : 'Novels exploring identity, technology, and human connection'}
                </p>
              </div>
              <Link 
                href="/books"
                className={`view-link ${isUrdu ? 'urdu-text flex-row-reverse' : ''}`}
              >
                <span>{isUrdu ? 'تمام کتابیں' : 'All books'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="portfolio-grid">
              {featuredBooks.map((book, index) => (
                <article
                  key={book.id}
                  className="minimal-card animate-slide-up"
                  style={{animationDelay: `${index * 150}ms`}}
                >
                  <div className={`flex items-start gap-6 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                    <div className="flex-shrink-0">
                      <div className="w-16 h-20 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shadow-sm">
                        <BookOpen className="w-8 h-8 text-red-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center gap-3 mb-3 text-caption ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
                        <span className={`uppercase tracking-wide font-semibold text-red-600 ${isUrdu ? 'urdu-text' : ''}`}>
                          {isUrdu ? 'کتاب' : 'Book'}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">{book.publishedYear}</span>
                        {book.buyLinks && (
                          <>
                            <span className="text-gray-400">•</span>
                            <div className={`flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                              <Star className="w-3 h-3 text-red-500" />
                              <span className={`text-gray-500 ${isUrdu ? 'urdu-text' : ''}`}>
                                {isUrdu ? 'دستیاب' : 'Available'}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <h3 className={`card-title ${isUrdu ? 'urdu-heading' : ''}`}>
                        {isUrdu && book.titleUrdu ? book.titleUrdu : book.title}
                      </h3>
                      
                      <p className={`text-gray-600 mb-6 leading-relaxed ${isUrdu ? 'urdu-text' : ''}`}>
                        {isUrdu && book.descriptionUrdu ? book.descriptionUrdu : book.description}
                      </p>

                      <Link 
                        href={`/books/${book.slug}`}
                        className={`view-link ${isUrdu ? 'urdu-text flex-row-reverse' : ''}`}
                      >
                        <span>{isUrdu ? 'دیکھیں' : 'view'}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Writing Section */}
          <div className="mb-24">
            <div className={`flex items-end justify-between mb-16 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
              <div>
                <h2 className={`text-heading-2 mb-4 ${isUrdu ? 'urdu-heading' : ''}`}>
                  {isUrdu ? 'حالیہ تحریریں' : 'Recent Writing'}
                </h2>
                <p className={`large-text ${isUrdu ? 'urdu-text' : ''}`}>
                  {isUrdu ? 'ٹیکنالوجی، ثقافت، اور کہانی گوئی پر مضامین' : 'Essays on technology, culture, and storytelling'}
                </p>
              </div>
              <Link 
                href="/writing"
                className={`view-link ${isUrdu ? 'urdu-text flex-row-reverse' : ''}`}
              >
                <span>{isUrdu ? 'تمام تحریریں' : 'All writing'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="work-grid">
              {featuredEssays.map((essay, index) => (
                <article
                  key={essay.id}
                  className="minimal-card animate-slide-up"
                  style={{animationDelay: `${index * 150}ms`}}
                >
                  <div className={`${isUrdu ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-3 mb-4 text-caption ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
                      <PenTool className="w-4 h-4 text-red-600" />
                      <span className={`uppercase tracking-wide font-semibold text-red-600 ${isUrdu ? 'urdu-text' : ''}`}>
                        {isUrdu ? 'مضمون' : 'Essay'}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">
                        {new Date(essay.publishedDate).toLocaleDateString(isUrdu ? 'ur-PK' : 'en-US', {
                          year: 'numeric',
                          month: 'short'
                        })}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className={`text-gray-500 ${isUrdu ? 'urdu-text' : ''}`}>
                        {essay.readTime} {isUrdu ? 'منٹ' : 'min'}
                      </span>
                    </div>
                    
                    <h3 className={`card-title ${isUrdu ? 'urdu-heading' : ''}`}>
                      {isUrdu && essay.titleUrdu ? essay.titleUrdu : essay.title}
                    </h3>
                    
                    <p className={`text-gray-600 mb-6 leading-relaxed ${isUrdu ? 'urdu-text' : ''}`}>
                      {isUrdu && essay.descriptionUrdu ? essay.descriptionUrdu : essay.description}
                    </p>

                    <Link 
                      href={`/writing/${essay.slug}`}
                      className={`view-link ${isUrdu ? 'urdu-text flex-row-reverse' : ''}`}
                    >
                      <span>{isUrdu ? 'پڑھیں' : 'read'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Series Section */}
          <div>
            <div className={`mb-16 ${isUrdu ? 'text-right' : ''}`}>
              <h2 className={`text-heading-2 mb-4 ${isUrdu ? 'urdu-heading' : ''}`}>
                {isUrdu ? 'خصوصی سلسلہ' : 'Featured Series'}
              </h2>
              <p className={`large-text ${isUrdu ? 'urdu-text' : ''}`}>
                {isUrdu ? 'جاری کہانی کی تلاش' : 'Ongoing narrative explorations'}
              </p>
            </div>
            
            <div className="minimal-card animate-slide-up">
              <div className={`flex items-start gap-8 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center shadow-sm">
                    <Mic className="w-10 h-10 text-red-600" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className={`flex items-center gap-3 mb-4 text-caption ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
                    <span className={`uppercase tracking-wide font-semibold text-red-600 ${isUrdu ? 'urdu-text' : ''}`}>
                      {isUrdu ? 'سلسلہ' : 'Series'}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className={`text-gray-500 ${isUrdu ? 'urdu-text' : ''}`}>
                      {series.totalEntries} {isUrdu ? 'حصے' : 'entries'}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className={`text-gray-500 ${isUrdu ? 'urdu-text' : ''}`}>
                      {isUrdu ? 'اردو' : 'Urdu'}
                    </span>
                  </div>
                  
                  <h3 className={`text-heading-3 mb-6 ${isUrdu ? 'urdu-heading' : ''}`}>
                    {isUrdu ? series.titleUrdu : series.title}
                  </h3>
                  
                  <p className={`text-gray-600 mb-8 leading-relaxed max-w-2xl ${isUrdu ? 'urdu-text' : ''}`}>
                    {isUrdu ? series.descriptionUrdu : series.description}
                  </p>

                  <Link 
                    href="/bonn-ka-banjara"
                    className={`btn btn-primary group ${isUrdu ? 'urdu-text' : ''}`}
                  >
                    <span>{isUrdu ? 'سلسلہ دیکھیں' : 'Explore Series'}</span>
                    <ArrowUpRight className={`w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isUrdu ? 'mr-2' : 'ml-2'}`} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className={`max-w-4xl mx-auto text-center ${isUrdu ? 'text-right' : ''}`}>
            <h2 className={`text-heading-2 mb-8 ${isUrdu ? 'urdu-heading' : ''}`}>
              {isUrdu ? 'آئیے جڑتے ہیں' : 'Let\'s Connect'}
            </h2>
            <p className={`large-text mb-12 ${isUrdu ? 'urdu-text' : ''}`}>
              {isUrdu 
                ? 'تعاون، تقاریر، یا صرف کہانیوں کے بارے میں بات کرنے میں دلچسپی ہے؟ میں آپ سے سننا پسند کروں گا۔'
                : 'Interested in collaborations, speaking engagements, or just want to discuss stories? I\'d love to hear from you.'
              }
            </p>
            <div className={`flex flex-col sm:flex-row gap-6 justify-center ${isUrdu ? 'sm:flex-row-reverse' : ''}`}>
              <Link 
                href="/contact"
                className={`btn btn-primary group ${isUrdu ? 'urdu-text' : ''}`}
              >
                <span>{isUrdu ? 'رابطہ کریں' : 'Get in Touch'}</span>
                <ArrowUpRight className={`w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isUrdu ? 'mr-2' : 'ml-2'}`} />
              </Link>
              <Link 
                href="/newsletter"
                className={`btn btn-secondary ${isUrdu ? 'urdu-text' : ''}`}
              >
                {isUrdu ? 'نیوز لیٹر' : 'Newsletter'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}