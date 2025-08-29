'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, BookOpen, PenTool, Mic, Star } from 'lucide-react'; // Removed Calendar as it's not used here
import { books, essays, series } from '@/lib/data/content';

interface PortfolioGridProps {
  lang?: 'en' | 'ur';
}

export function PortfolioGrid() { // Removed lang prop as site is now primarily Urdu
  const isUrdu = true; // Always Urdu
  const featuredBooks = books.slice(0, 2);
  const featuredEssays = essays.slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Full-screen background image */}
        <div className="hero-background-image absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="عبدالباسط ظفر - لکھاری اور کہانی گو"
            fill
            priority
            className="object-cover"
            unoptimized // Disable Next.js Image Optimization for Pexels URLs
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container relative z-10 text-center text-white"> {/* Centered content on top of image */}
          <div className="animate-fade-in">
            <h1 className="text-display urdu-display mb-8 text-white">
              عبدالباسط ظفر
            </h1>
            
            <p className="large-text mb-12 max-w-3xl mx-auto urdu-text text-white/90">
              لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان تعلق کو دریافت کرتا ہے۔ کہانیاں جو زبانوں اور سرحدوں کے پار دنیاوں کو جوڑتی ہیں۔
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center sm:flex-row-reverse">
              <Link 
                href="/work"
                className="btn btn-primary group"
              >
                <span className="urdu-text">
                  میرا کام دیکھیں
                </span>
                <ArrowUpRight className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              
              <Link 
                href="/about"
                className="btn btn-secondary"
              >
                تعارف
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="work-section">
        <div className="container">
          {/* Books Section */}
          <div className="mb-24">
            <div className="flex items-end justify-between mb-16 flex-row-reverse text-right">
              <div>
                <h2 className="text-heading-2 urdu-heading mb-4 text-ink"> {/* Use new ink color */}
                  تازہ کتابیں
                </h2>
                <p className="large-text urdu-text text-ink-muted"> {/* Use new ink-muted */}
                  ناولز اور کہانیوں کا مجموعہ جو شناخت، ٹیکنالوجی، اور انسانی رشتوں کو دریافت کرتا ہے
                </p>
              </div>
              <Link 
                href="/books"
                className="view-link urdu-text flex-row-reverse"
              >
                <span>تمام کتابیں</span>
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
                  <div className="flex items-start gap-6 flex-row-reverse text-right">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-20 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center shadow-sm"> {/* Use new primary colors */}
                        <BookOpen className="w-8 h-8 text-primary" /> {/* Use new primary color */}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 text-caption flex-row-reverse justify-end">
                        <span className="uppercase tracking-wide font-semibold text-primary urdu-text"> {/* Use new primary color */}
                          کتاب
                        </span>
                        <span className="text-ink-light">•</span> {/* Use new ink-light */}
                        <span className="text-ink-muted">{book.publishedYear}</span> {/* Use new ink-muted */}
                        {book.buyLinks && (
                          <>
                            <span className="text-ink-light">•</span> {/* Use new ink-light */}
                            <div className="flex items-center gap-1 flex-row-reverse">
                              <Star className="w-3 h-3 text-primary-500" /> {/* Use new primary-500 */}
                              <span className="text-ink-muted urdu-text"> {/* Use new ink-muted */}
                                دستیاب
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <h3 className="card-title urdu-heading">
                        {isUrdu && book.titleUrdu ? book.titleUrdu : book.title}
                      </h3>
                      
                      <p className="text-ink-muted mb-6 leading-relaxed urdu-text"> {/* Use new ink-muted */}
                        {isUrdu && book.descriptionUrdu ? book.descriptionUrdu : book.description}
                      </p>

                      <Link 
                        href={`/books/${book.slug}`}
                        className="view-link urdu-text flex-row-reverse"
                      >
                        <span>دیکھیں</span>
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
            <div className="flex items-end justify-between mb-16 flex-row-reverse text-right">
              <div>
                <h2 className="text-heading-2 urdu-heading mb-4 text-ink"> {/* Use new ink color */}
                  حالیہ تحریریں
                </h2>
                <p className="large-text urdu-text text-ink-muted"> {/* Use new ink-muted */}
                  ٹیکنالوجی، ثقافت، اور کہانی گوئی پر مضامین
                </p>
              </div>
              <Link 
                href="/writing"
                className="view-link urdu-text flex-row-reverse"
              >
                <span>تمام تحریریں</span>
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
                  <div className="text-right">
                    <div className="flex items-center gap-3 mb-4 text-caption flex-row-reverse justify-end">
                      <PenTool className="w-4 h-4 text-primary" /> {/* Use new primary color */}
                      <span className="uppercase tracking-wide font-semibold text-primary urdu-text"> {/* Use new primary color */}
                        مضمون
                      </span>
                      <span className="text-ink-light">•</span> {/* Use new ink-light */}
                      <span className="text-ink-muted"> {/* Use new ink-muted */}
                        {new Date(essay.publishedDate).toLocaleDateString('ur-PK', {
                          year: 'numeric',
                          month: 'short'
                        })}
                      </span>
                      <span className="text-ink-light">•</span> {/* Use new ink-light */}
                      <span className="text-ink-muted urdu-text"> {/* Use new ink-muted */}
                        {essay.readTime} منٹ
                      </span>
                    </div>
                    
                    <h3 className="card-title urdu-heading">
                      {isUrdu && essay.titleUrdu ? essay.titleUrdu : essay.title}
                    </h3>
                    
                    <p className="text-ink-muted mb-6 leading-relaxed urdu-text"> {/* Use new ink-muted */}
                      {isUrdu && essay.descriptionUrdu ? essay.descriptionUrdu : essay.description}
                    </p>

                    <Link 
                      href={`/writing/${essay.slug}`}
                      className="view-link urdu-text flex-row-reverse"
                    >
                      <span>پڑھیں</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Series Section */}
          <div>
            <div className="mb-16 text-right">
              <h2 className="text-heading-2 urdu-heading mb-4 text-ink"> {/* Use new ink color */}
                خصوصی سلسلہ
              </h2>
              <p className="large-text urdu-text text-ink-muted"> {/* Use new ink-muted */}
                جاری کہانی کی تلاش
              </p>
            </div>
            
            <div className="minimal-card animate-slide-up">
              <div className="flex items-start gap-8 flex-row-reverse text-right">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center shadow-sm"> {/* Use new primary colors */}
                    <Mic className="w-10 h-10 text-primary" /> {/* Use new primary color */}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4 text-caption flex-row-reverse justify-end">
                    <span className="uppercase tracking-wide font-semibold text-primary urdu-text"> {/* Use new primary color */}
                      سلسلہ
                    </span>
                    <span className="text-ink-light">•</span> {/* Use new ink-light */}
                    <span className="text-ink-muted urdu-text"> {/* Use new ink-muted */}
                      {series.totalEntries} حصے
                    </span>
                    <span className="text-ink-light">•</span> {/* Use new ink-light */}
                    <span className="text-ink-muted urdu-text"> {/* Use new ink-muted */}
                      اردو
                    </span>
                  </div>
                  
                  <h3 className="text-heading-3 urdu-heading mb-6 text-ink"> {/* Use new ink color */}
                    {isUrdu ? series.titleUrdu : series.title}
                  </h3>
                  
                  <p className="text-ink-muted mb-8 leading-relaxed max-w-2xl urdu-text"> {/* Use new ink-muted */}
                    {isUrdu ? series.descriptionUrdu : series.description}
                  </p>

                  <Link 
                    href="/bonn-ka-banjara"
                    className="btn btn-primary group"
                  >
                    <span className="urdu-text">سلسلہ دیکھیں</span>
                    <ArrowUpRight className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
            <h2 className="text-heading-2 urdu-heading mb-8 text-ink"> {/* Use new ink color */}
              آئیے جڑتے ہیں
            </h2>
            <p className="large-text mb-12 urdu-text text-ink-muted"> {/* Use new ink-muted */}
              تعاون، تقاریر، یا صرف کہانیوں کے بارے میں بات کرنے میں دلچسپی ہے؟ میں آپ سے سننا پسند کروں گا۔
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center sm:flex-row-reverse">
              <Link 
                href="/contact"
                className="btn btn-primary group"
              >
                <span className="urdu-text">
                  رابطہ کریں
                </span>
                <ArrowUpRight className={`w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isUrdu ? 'mr-2' : 'ml-2'}`} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}