'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookCard } from '@/components/BookCard';
import { EssayCard } from '@/components/EssayCard';
import { books, essays, talks, pressItems } from '@/lib/data/content';
import { Filter } from 'lucide-react';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All Work' },
    { id: 'books', label: 'Books' },
    { id: 'essays', label: 'Essays' },
    { id: 'talks', label: 'Talks' },
    { id: 'press', label: 'Press' }
  ];

  const filteredContent = () => {
    switch (activeFilter) {
      case 'books':
        return books;
      case 'essays':
        return essays;
      case 'talks':
        return talks;
      case 'press':
        return pressItems;
      default:
        return [...books, ...essays, ...talks, ...pressItems];
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-6">All Work</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A complete collection of books, essays, talks, and media appearances.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-1 mb-8 border-b">
            <Filter className="w-4 h-4 text-muted-foreground mr-2" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeFilter === 'all' || activeFilter === 'books' ? (
              books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            ) : null}
            
            {activeFilter === 'all' || activeFilter === 'essays' ? (
              essays.map((essay) => (
                <EssayCard key={essay.id} essay={essay} />
              ))
            ) : null}
            
            {(activeFilter === 'all' || activeFilter === 'talks') && talks.map((talk) => (
              <div key={talk.id} className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{talk.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{talk.description}</p>
                <div className="text-xs text-muted-foreground">
                  <p>{talk.event} • {talk.location}</p>
                  <p>{new Date(talk.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            
            {(activeFilter === 'all' || activeFilter === 'press') && pressItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{item.excerpt}</p>
                <div className="text-xs text-muted-foreground">
                  <p>{item.publication}</p>
                  <p>{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}