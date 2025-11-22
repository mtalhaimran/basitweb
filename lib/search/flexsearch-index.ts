'use client';

import { Document } from 'flexsearch';

export type SearchDoc = {
  id: string;
  url: string;
  title: string;
  excerpt?: string;
  collection: 'bonn-ka-banjara' | 'snippets' | 'books';
  tags?: string[];
  locale: 'ur' | 'en';
  quotes?: string[];
  date?: string;
};

// Urdu/Roman Urdu normalization
function normalizeUrdu(text: string): string {
  if (!text) return '';
  
  // Convert to lowercase
  let normalized = text.toLowerCase();
  
  // Remove Urdu diacritics (zabar, zer, pesh, etc.)
  normalized = normalized
    .replace(/[\u064B-\u065F]/g, '') // Remove Arabic diacritics
    .replace(/[\u0670]/g, '') // Remove Arabic letter superscript alef
    .replace(/[\u06D6-\u06ED]/g, ''); // Remove additional Arabic marks
  
  // Normalize Urdu characters that have multiple forms
  const urduNormalizationMap: { [key: string]: string } = {
    'ک': 'ك', // Multiple forms of kaaf
    'ی': 'ي', // Multiple forms of yay
    'ہ': 'ه', // Multiple forms of heh
    'ۂ': 'ه',
    'ۃ': 'ه',
    'ھ': 'ه',
    'ے': 'ي',
  };
  
  Object.entries(urduNormalizationMap).forEach(([from, to]) => {
    normalized = normalized.replace(new RegExp(from, 'g'), to);
  });
  
  return normalized;
}

// Create FlexSearch index with custom tokenizer for Urdu
export function createSearchIndex() {
  const index = new Document<SearchDoc>({
    document: {
      id: 'id',
      index: ['title', 'excerpt', 'tags', 'quotes', 'caption'],
      store: true,
    },
    tokenize: 'forward',
    encode: (str: string) => {
      // Normalize for both Urdu and English
      const normalized = normalizeUrdu(str);
      // Split on spaces and punctuation for proper tokenization
      return normalized.split(/[\s\p{P}]+/u).filter(Boolean);
    },
    // Use simple stemming for English, preserve Urdu
    stemmer: false,
    // Case insensitive matching
    matcher: 'simple',
    // Partial matching for better results
    resolution: 9,
  });

  return index;
}

export class SearchManager {
  private index: Document<SearchDoc>;
  private docs: SearchDoc[] = [];
  private isInitialized = false;

  constructor() {
    this.index = createSearchIndex();
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const response = await fetch('/api/search');
      if (!response.ok) {
        throw new Error('Failed to fetch search data');
      }
      
      const data: SearchDoc[] = await response.json();
      this.docs = data;
      
      // Add all documents to the index
      data.forEach((doc) => {
        this.index.add(doc);
      });
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize search index:', error);
      throw error;
    }
  }

  search(
    query: string,
    options?: {
      collection?: SearchDoc['collection'];
      locale?: 'ur' | 'en';
      limit?: number;
    }
  ): SearchDoc[] {
    if (!this.isInitialized || !query.trim()) {
      return [];
    }

    const normalizedQuery = normalizeUrdu(query);
    
    // Perform search
    const results = this.index.search(normalizedQuery, {
      limit: options?.limit || 50,
      enrich: true,
    });

    // FlexSearch returns an array of field results
    // Combine and deduplicate results
    const docMap = new Map<string, SearchDoc>();
    
    results.forEach((fieldResult: any) => {
      if (fieldResult.result) {
        fieldResult.result.forEach((item: any) => {
          const doc = item.doc || item;
          if (doc && doc.id && !docMap.has(doc.id)) {
            docMap.set(doc.id, doc);
          }
        });
      }
    });

    let filteredResults = Array.from(docMap.values());

    // Apply filters
    if (options?.collection) {
      filteredResults = filteredResults.filter(
        (doc) => doc.collection === options.collection
      );
    }

    if (options?.locale) {
      filteredResults = filteredResults.filter(
        (doc) => doc.locale === options.locale
      );
    }

    return filteredResults;
  }

  getAllDocs(): SearchDoc[] {
    return this.docs;
  }

  isReady(): boolean {
    return this.isInitialized;
  }
}

// Singleton instance
let searchManagerInstance: SearchManager | null = null;

export function getSearchManager(): SearchManager {
  if (!searchManagerInstance) {
    searchManagerInstance = new SearchManager();
  }
  return searchManagerInstance;
}
