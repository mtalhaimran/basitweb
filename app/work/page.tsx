'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookCard } from '@/components/BookCard';
import { EssayCard } from '@/components/EssayCard';
import { books, essays, talks, pressItems } from '@/lib/data/content';
import { Filter, BookOpen, PenTool, Mic, Newspaper } from 'lucide-react';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All Work', icon: Filter },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'essays', label: 'Essays', icon: PenTool },
    { id: 'talks', label: 'Talks', icon: Mic },
    { id: 'press', label: 'Press', icon: Newspaper }
  ];

  const filteredContent = () => {
    switch (activeFilter) {
      case 'books':
        return { books, essays: [], talks: [], press: [] };
      case 'essays':
        return { books: [], essays, talks: [], press: [] };
      case 'talks':
        return { books: [], essays: [], talks, press: [] };
      case 'press':
        return { books: [], essays: [], talks: [], press: pressItems };
      default:
        return { books, essays, talks, press: pressItems };
    }
  };

  const content = filteredContent();

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-32 pb-20" data-pagefind-body>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-display mb-8">All Work</h1>
            <p className="text-body-lg text-gray-600 max-w-3xl mx-auto">
              A complete collection of books, essays, talks, and media appearances exploring 
              the intersection of technology, culture, and human experience.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-gray-100 rounded-2xl p-2">
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      activeFilter === filter.id
                        ? 'bg-white text-red-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-20">
            {/* Books */}
            {content.books.length > 0 && (
              <section>
                <h2 className="text-heading-2 mb-12 text-center">Books</h2>
                <div className="portfolio-grid">
                  {content.books.map((book, index) => (
                    <div key={book.id} className="animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                      <BookCard book={book} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Essays */}
            {content.essays.length > 0 && (
              <section>
                <h2 className="text-heading-2 mb-12 text-center">Essays</h2>
                <div className="writing-grid">
                  {content.essays.map((essay, index) => (
                    <div key={essay.id} className="animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                      <EssayCard essay={essay} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Talks */}
            {content.talks.length > 0 && (
              <section>
                <h2 className="text-heading-2 mb-12 text-center">Talks</h2>
                <div className="writing-grid">
                  {content.talks.map((talk, index) => (
                    <div key={talk.id} className="portfolio-card animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                      <div className="flex items-center space-x-2 mb-4 text-caption">
                        <Mic className="w-4 h-4 text-red-600" />
                        <span className="uppercase tracking-wide font-semibold text-red-600">Talk</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">
                          {new Date(talk.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      
                      <h3 className="portfolio-title">{talk.title}</h3>
                      <p className="text-gray-600 mb-4">{talk.description}</p>
                      
                      <div className="text-sm text-gray-500">
                        <p className="font-medium">{talk.event}</p>
                        <p>{talk.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Press */}
            {content.press.length > 0 && (
              <section>
                <h2 className="text-heading-2 mb-12 text-center">Press</h2>
                <div className="writing-grid">
                  {content.press.map((item, index) => (
                    <div key={item.id} className="portfolio-card animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                      <div className="flex items-center space-x-2 mb-4 text-caption">
                        <Newspaper className="w-4 h-4 text-red-600" />
                        <span className="uppercase tracking-wide font-semibold text-red-600">Press</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">
                          {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      
                      <h3 className="portfolio-title">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.excerpt}</p>
                      
                      <div className="text-sm text-gray-500">
                        <p className="font-medium">{item.publication}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}