import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, PenTool, Mic, Calendar, ExternalLink, Star, Award } from 'lucide-react';
import { books, essays, series } from '@/lib/data/content';

export function PortfolioGrid() {
  const featuredBooks = books.slice(0, 2);
  const featuredEssays = essays.slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section pt-32 pb-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Portrait */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop"
                    alt="Abdul Basit Zafar - Writer and Storyteller"
                    fill
                    className="hero-image object-cover"
                    priority
                    unoptimized
                  />
                </div>
                
                {/* Floating accent */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-100 rounded-full blur-2xl animate-float"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-red-50 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="animate-fade-in">
                <h1 className="text-display mb-8 text-gradient">
                  Abdul Basit Zafar
                </h1>
                
                <p className="text-body-lg text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0">
                  Writer and storyteller exploring the intersection of technology, culture, and human experience. 
                  Stories that connect worlds across languages and borders.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    href="/work"
                    className="btn btn-primary group"
                  >
                    View My Work
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <Link 
                    href="/about"
                    className="btn btn-secondary"
                  >
                    About Me
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          {/* Books Section */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-heading-2 mb-4">Latest Books</h2>
                <p className="text-body text-gray-600">Novels exploring identity, technology, and human connection</p>
              </div>
              <Link 
                href="/books"
                className="link text-sm font-medium group"
              >
                View all books
                <ArrowRight className="w-3 h-3 inline ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="portfolio-grid">
              {featuredBooks.map((book, index) => (
                <article
                  key={book.id}
                  className="portfolio-card group animate-slide-up"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shadow-sm">
                        <BookOpen className="w-10 h-10 text-red-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-3 text-caption">
                        <span className="uppercase tracking-wide font-semibold text-red-600">Book</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">{book.publishedYear}</span>
                        {book.buyLinks && (
                          <>
                            <span className="text-gray-400">•</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-red-500" />
                              <span className="text-gray-500">Available</span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <h3 className="portfolio-title">
                        {book.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {book.description}
                      </p>

                      <Link 
                        href={`/books/${book.slug}`}
                        className="link text-sm font-semibold group"
                      >
                        view
                        <ArrowRight className="w-3 h-3 inline ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Writing Section */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-heading-2 mb-4">Recent Writing</h2>
                <p className="text-body text-gray-600">Essays on technology, culture, and storytelling</p>
              </div>
              <Link 
                href="/writing"
                className="link text-sm font-medium group"
              >
                View all writing
                <ArrowRight className="w-3 h-3 inline ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="writing-grid">
              {featuredEssays.map((essay, index) => (
                <article
                  key={essay.id}
                  className="portfolio-card group animate-slide-up"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="flex items-center space-x-2 mb-4 text-caption">
                    <PenTool className="w-4 h-4 text-red-600" />
                    <span className="uppercase tracking-wide font-semibold text-red-600">Essay</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">
                      {new Date(essay.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                      })}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{essay.readTime} min</span>
                  </div>
                  
                  <h3 className="portfolio-title">
                    {essay.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {essay.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/writing/${essay.slug}`}
                      className="link text-sm font-semibold group"
                    >
                      read
                      <ArrowRight className="w-3 h-3 inline ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    {essay.publication && (
                      <div className="flex items-center space-x-1">
                        <Award className="w-3 h-3 text-gray-400" />
                        <span className="text-caption text-gray-500">{essay.publication}</span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Series Section */}
          <div>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-heading-2 mb-4">Featured Series</h2>
                <p className="text-body text-gray-600">Ongoing narrative explorations</p>
              </div>
            </div>
            
            <div className="portfolio-card animate-slide-up">
              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center shadow-sm">
                    <Mic className="w-12 h-12 text-red-600" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-4 text-caption">
                    <span className="uppercase tracking-wide font-semibold text-red-600">Series</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{series.totalEntries} entries</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">Urdu</span>
                  </div>
                  
                  <h3 className="text-heading-3 text-gray-900 mb-4">
                    {series.title}
                    <span className="urdu-heading-3 text-red-600 mr-4">{series.titleUrdu}</span>
                  </h3>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl">
                    {series.description}
                  </p>

                  <Link 
                    href="/bonn-ka-banjara"
                    className="btn btn-primary group"
                  >
                    Explore Series
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-heading-2 mb-6">Let's Connect</h2>
            <p className="text-body-lg text-gray-600 mb-10">
              Interested in collaborations, speaking engagements, or just want to discuss stories? 
              I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="btn btn-primary group"
              >
                Get in Touch
                <Mail className="w-4 h-4 ml-2" />
              </Link>
              <Link 
                href="/newsletter"
                className="btn btn-secondary"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}