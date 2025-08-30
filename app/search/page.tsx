'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function SearchPage() {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.PagefindUI) {
      new window.PagefindUI({
        element: searchRef.current,
        showSubResults: true,
        showImages: false
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="section-heading text-3xl sm:text-4xl md:text-5xl">Search</h1>
            <p className="text-xl text-muted-foreground">
              Search through all books, essays, and stories.
            </p>
          </div>

          <div ref={searchRef} />
        </div>
      </main>
      <Footer />
    </div>
  );
}