'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, Loader2, BookOpen, FileText, Image, Briefcase, Filter } from 'lucide-react';
import { getSearchManager, SearchDoc } from '@/lib/search/flexsearch-index';

const collectionIcons = {
  'bonn-ka-banjara': BookOpen,
  'snippets': FileText,
  'books': BookOpen,
  'gallery': Image,
};

const collectionLabels = {
  'bonn-ka-banjara': 'بون کا بنجارہ',
  'snippets': 'مضامین',
  'books': 'کتابیں',
  'gallery': 'گیلری',
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [selectedLocale, setSelectedLocale] = useState<string>('all');

  const searchManager = useMemo(() => getSearchManager(), []);

  // Initialize search index
  useEffect(() => {
    const initSearch = async () => {
      try {
        await searchManager.initialize();
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize search:', error);
        setIsLoading(false);
      }
    };

    initSearch();
  }, [searchManager]);

  // Debounced search
  useEffect(() => {
    if (!searchManager.isReady()) return;

    const timer = setTimeout(() => {
      if (query.trim()) {
        setIsSearching(true);
        const searchResults = searchManager.search(query, {
          collection: selectedCollection !== 'all' ? (selectedCollection as SearchDoc['collection']) : undefined,
          locale: selectedLocale !== 'all' ? (selectedLocale as 'ur' | 'en') : undefined,
          limit: 50,
        });
        setResults(searchResults);
        setIsSearching(false);
      } else {
        setResults([]);
        setIsSearching(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query, selectedCollection, selectedLocale, searchManager]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface pt-40 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand mx-auto mb-4" />
          <p className="text-ink-muted font-urdu-body">تلاش لوڈ ہو رہی ہے...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-40">
      <div className="container mx-auto px-4 pb-24" dir="rtl">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-right">
            <h1 className="text-4xl font-bold text-ink mb-2 font-urdu-heading">
              تلاش
            </h1>
            <p className="text-ink-muted font-urdu-body">
              تمام مواد میں تلاش کریں - {searchManager.getAllDocs().length} اشیاء
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <div className="flex items-center gap-3 bg-surface-white rounded-lg border-2 border-line focus-within:border-brand transition-colors ltr-row">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="تلاش کریں... (اردو، رومن اردو، یا انگریزی)"
                className="flex-1 py-3 px-4 bg-transparent text-ink font-urdu-body text-lg outline-none text-right"
                dir="rtl"
                autoFocus
              />
              <div className="p-3 text-ink-muted">
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-3 justify-end">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-ink-muted" />
              <span className="text-sm text-ink-muted font-urdu-body">فلٹر:</span>
            </div>
            
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="px-3 py-2 bg-surface-white border border-line rounded-lg text-ink font-urdu-body text-sm outline-none focus:border-brand transition-colors"
              dir="rtl"
            >
              <option value="all">تمام قسمیں</option>
              <option value="bonn-ka-banjara">بون کا بنجارہ</option>
              <option value="snippets">مضامین</option>
              <option value="books">کتابیں</option>
              <option value="gallery">گیلری</option>
            </select>

            <select
              value={selectedLocale}
              onChange={(e) => setSelectedLocale(e.target.value)}
              className="px-3 py-2 bg-surface-white border border-line rounded-lg text-ink font-urdu-body text-sm outline-none focus:border-brand transition-colors"
              dir="rtl"
            >
              <option value="all">تمام زبانیں</option>
              <option value="ur">اردو</option>
              <option value="en">انگریزی</option>
            </select>
          </div>

          {/* Results */}
          {query.trim() ? (
            <div>
              <div className="mb-4 text-right">
                <p className="text-sm text-ink-muted font-urdu-body">
                  {results.length} نتائج ملے
                </p>
              </div>

              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((result) => {
                    const Icon = collectionIcons[result.collection] || FileText;
                    return (
                      <Link
                        key={result.id}
                        href={result.url}
                        className="block bg-surface-white rounded-lg border border-line p-4 hover:border-brand hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <Icon className="w-5 h-5 text-brand" />
                          </div>
                          <div className="flex-1 text-right">
                            <div className="flex items-center justify-end gap-2 mb-2">
                              <span className="text-xs px-2 py-1 bg-surface rounded-full text-ink-muted font-urdu-body">
                                {collectionLabels[result.collection]}
                              </span>
                              {result.locale && (
                                <span className="text-xs px-2 py-1 bg-brand/10 rounded-full text-brand font-urdu-body">
                                  {result.locale === 'ur' ? 'اردو' : 'English'}
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-brand transition-colors font-urdu-heading">
                              {result.title}
                            </h3>
                            {result.excerpt && (
                              <p className="text-ink-muted line-clamp-2 font-urdu-body mb-2">
                                {result.excerpt}
                              </p>
                            )}
                            {result.tags && result.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 justify-end">
                                {result.tags.slice(0, 3).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs px-2 py-1 bg-surface rounded text-ink-muted font-urdu-body"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            {result.quotes && result.quotes.length > 0 && (
                              <p className="text-sm text-brand mt-2 font-urdu-body">
                                {result.quotes.length} اقتباسات
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-ink-muted mx-auto mb-4" />
                  <p className="text-lg text-ink-muted font-urdu-body">
                    کوئی نتیجہ نہیں ملا
                  </p>
                  <p className="text-sm text-ink-muted font-urdu-body mt-2">
                    مختلف الفاظ استعمال کرکے دوبارہ کوشش کریں
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-ink-muted mx-auto mb-4" />
              <p className="text-lg text-ink-muted font-urdu-body">
                اوپر سرچ باکس میں لکھنا شروع کریں
              </p>
              <p className="text-sm text-ink-muted font-urdu-body mt-2">
                آپ اردو، رومن اردو، یا انگریزی میں تلاش کر سکتے ہیں
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
