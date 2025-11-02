'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-right">
            <h1 className="text-4xl font-bold text-ink mb-2 font-urdu-heading">
              تلاش
            </h1>
            <p className="text-ink-muted font-urdu-body">
              تمام مواد میں تلاش کریں
            </p>
          </div>

          <div className="relative mb-6">
            <div className="flex items-center gap-3 bg-surface-white rounded-lg border-2 border-line focus-within:border-brand transition-colors">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="تلاش کریں..."
                className="flex-1 py-3 px-4 bg-transparent text-ink font-urdu-body text-lg outline-none text-right"
                dir="rtl"
              />
              <div className="p-3 text-ink-muted">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="text-center py-12">
            <Search className="w-16 h-16 text-ink-muted mx-auto mb-4" />
            <p className="text-lg text-ink-muted font-urdu-body">
              تلاش جلد دستیاب ہوگی
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
