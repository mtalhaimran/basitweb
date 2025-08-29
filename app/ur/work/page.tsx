'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookCard } from '@/components/BookCard';
import { EssayCard } from '@/components/EssayCard';
import { books, essays, talks, pressItems, series } from '@/lib/data/content';
import { Filter, BookOpen, PenTool, Mic, Newspaper } from 'lucide-react';

export default function UrduWorkPage() {
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
    <div className="min-h-screen flex flex-col">
      <Header lang="ur" />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4">
          <div className="mb-12 text-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-urdu-heading">تمام کام</h1>
            <p className="text-xl text-muted-foreground max-w-3xl ml-auto font-urdu-body leading-relaxed">
              کتابوں، مضامین، تقاریر، اور میڈیا میں شرکت کا مکمل مجموعہ۔
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-end mb-8 border-b">
            <div className="flex items-center space-x-1 flex-row-reverse space-x-reverse">
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-all focus-ring flex-row-reverse space-x-reverse font-urdu-body ${
                      activeFilter === filter.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
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
          <div className="space-y-12">
            {/* Books */}
            {filteredContent.books.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-right font-urdu-heading">کتابیں</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredContent.books.map((book) => (
                    <BookCard key={book.id} book={book} lang="ur" />
                  ))}
                </div>
              </section>
            )}

            {/* Essays */}
            {filteredContent.essays.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-right font-urdu-heading">مضامین</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredContent.essays.map((essay) => (
                    <EssayCard key={essay.id} essay={essay} lang="ur" />
                  ))}
                </div>
              </section>
            )}

            {/* Series */}
            {filteredContent.series.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-right font-urdu-heading">سلسلہ</h2>
                <div className="grid gap-6">
                  {filteredContent.series.map((seriesItem) => (
                    <div key={seriesItem.id} className="border rounded-xl p-8 card-hover">
                      <div className="text-right">
                        <h3 className="text-2xl font-bold mb-3 font-urdu-heading">{seriesItem.titleUrdu}</h3>
                        <p className="text-muted-foreground mb-6 font-urdu-body leading-relaxed">
                          {seriesItem.descriptionUrdu}
                        </p>
                        <div className="flex items-center justify-between flex-row-reverse">
                          <Link 
                            href="/ur/bonn-ka-banjara"
                            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium focus-ring flex-row-reverse font-urdu-body"
                          >
                            سلسلہ دیکھیں
                            <ExternalLink className="w-4 h-4 mr-2" />
                          </Link>
                          <span className="text-sm text-muted-foreground font-urdu-body">
                            {seriesItem.totalEntries} حصے
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Talks */}
            {filteredContent.talks.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-right font-urdu-heading">تقاریر</h2>
                <div className="grid gap-6">
                  {filteredContent.talks.map((talk) => (
                    <div key={talk.id} className="border rounded-xl p-6 card-hover">
                      <div className="text-right">
                        <h3 className="text-lg font-semibold mb-2">{talk.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{talk.description}</p>
                        <div className="text-xs text-muted-foreground font-urdu-body">
                          <p>{talk.event} • {talk.location}</p>
                          <p>{new Date(talk.date).toLocaleDateString('ur-PK')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Press */}
            {filteredContent.press.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-right font-urdu-heading">پریس</h2>
                <div className="grid gap-6">
                  {filteredContent.press.map((item) => (
                    <div key={item.id} className="border rounded-xl p-6 card-hover">
                      <div className="text-right">
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{item.excerpt}</p>
                        <div className="text-xs text-muted-foreground font-urdu-body">
                          <p>{item.publication}</p>
                          <p>{new Date(item.date).toLocaleDateString('ur-PK')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer lang="ur" />
    </div>
  );
}