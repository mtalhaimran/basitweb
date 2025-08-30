'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookCard } from '@/components/BookCard';
import { EssayCard } from '@/components/EssayCard';
import { books, essays, talks, pressItems, series } from '@/lib/data/content';
import { Filter, BookOpen, PenTool, Mic, Newspaper, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'تمام کام', icon: Filter },
    { id: 'books', label: 'کتابیں', icon: BookOpen },
    { id: 'essays', label: 'مضامین', icon: PenTool },
    { id: 'series', label: 'سلسلہ', icon: Mic },
    { id: 'talks', label: 'تقاریر', icon: Mic },
    { id: 'press', label: 'پریس', icon: Newspaper }
  ];

  const getFilteredContent = () => {
    switch (activeFilter) {
      case 'books':
        return { books, essays: [], series: [], talks: [], press: [] };
      case 'essays':
        return { books: [], essays, series: [], talks: [], press: [] };
      case 'series':
        return { books: [], essays: [], series: [series], talks: [], press: [] };
      case 'talks':
        return { books: [], essays: [], series: [], talks, press: [] };
      case 'press':
        return { books: [], essays: [], series: [], talks: [], press: pressItems };
      default:
        return { books, essays, series: [series], talks, press: pressItems };
    }
  };

  const filteredContent = getFilteredContent();

  return (
    <div className="min-h-screen"> {/* Removed lang/dir as it's now in root layout */}
      <Header />
      <main id="main-content" className="pt-32 pb-20" data-pagefind-body>
        <div className="container">
          <div className="text-center mb-20">
            <h1 className="section-heading text-3xl sm:text-4xl md:text-5xl urdu-display text-ink">تمام کام</h1>
            <p className="large-text urdu-text text-medium-contrast max-w-3xl mx-auto content-spacing">
              کتابوں، مضامین، تقاریر، اور میڈیا میں شرکت کا مکمل مجموعہ۔
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
                    className={`flex items-center space-x-2 space-x-reverse px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 urdu-text ${
                      activeFilter === filter.id // Use new primary color for active state
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

          {/* Content Grid */}
          <div className="space-y-20">
            {/* Books */}
            {filteredContent.books.length > 0 && (
              <section>
                <h2 className="section-heading urdu-heading mb-12 text-right">کتابیں</h2>
                <div className="portfolio-grid"> {/* Use new grid styling */}
                  {filteredContent.books.map((book, index) => (
                    <div key={book.id} className="animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                      <BookCard book={book} lang="ur" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Essays */}
            {filteredContent.essays.length > 0 && (
              <section>
                <h2 className="section-heading urdu-heading mb-12 text-right">مضامین</h2>
                <div className="work-grid"> {/* Use new grid styling */}
                  {filteredContent.essays.map((essay, index) => (
                    <div key={essay.id} className="animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                      <EssayCard essay={essay} lang="ur" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Series */}
            {filteredContent.series.length > 0 && (
              <section>
                <h2 className="section-heading urdu-heading mb-12 text-right">سلسلہ</h2>
                <div className="minimal-card animate-slide-up">
                  <div className="text-right">
                    <h3 className="text-heading-3 urdu-heading mb-4">{series.titleUrdu}</h3>
                    <p className="urdu-text text-gray-600 mb-8 leading-relaxed">
                      {series.descriptionUrdu}
                    </p>
                    <div className="flex items-center justify-between flex-row-reverse">
                      <Link 
                        href="/bonn-ka-banjara"
                        className="btn btn-primary group urdu-text"
                      > {/* Use new button styling */}
                        سلسلہ دیکھیں
                        <ArrowUpRight className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>
                      <span className="text-caption urdu-text">
                        {series.totalEntries} حصے
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Talks */}
            {filteredContent.talks.length > 0 && (
              <section>
                <h2 className="section-heading urdu-heading mb-12 text-right">تقاریر</h2>
                <div className="work-grid"> {/* Use new grid styling */}
                  {filteredContent.talks.map((talk, index) => (
                    <div key={talk.id} className="minimal-card animate-slide-up text-right" style={{animationDelay: `${index * 100}ms`}}>
                      <h3 className="card-title">{talk.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{talk.description}</p>
                      <div className="text-caption urdu-text">
                        <p>{talk.event} • {talk.location}</p>
                        <p>
                          {new Intl.DateTimeFormat('ur-PK', {
                            timeZone: 'UTC'
                          }).format(new Date(talk.date))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Press */}
            {filteredContent.press.length > 0 && (
              <section>
                <h2 className="section-heading urdu-heading mb-12 text-right">پریس</h2>
                <div className="work-grid"> {/* Use new grid styling */}
                  {filteredContent.press.map((item, index) => (
                    <div key={item.id} className="minimal-card animate-slide-up text-right" style={{animationDelay: `${index * 100}ms`}}>
                      <h3 className="card-title">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{item.excerpt}</p>
                      <div className="text-caption urdu-text">
                        <p>{item.publication}</p>
                        <p>
                          {new Intl.DateTimeFormat('ur-PK', {
                            timeZone: 'UTC'
                          }).format(new Date(item.date))}
                        </p>
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