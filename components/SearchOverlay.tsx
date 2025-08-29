'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Search, Command } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'en' | 'ur';
}

export function SearchOverlay({ isOpen, onClose, lang = 'en' }: SearchOverlayProps) {
  const searchRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isUrdu = lang === 'ur';

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      // Check if PagefindUI is available
      if (window.PagefindUI) {
        try {
          new window.PagefindUI({
            element: searchRef.current,
            showSubResults: true,
            showImages: false,
            resetStyles: false,
            translations: isUrdu ? {
              placeholder: "تلاش کریں...",
              clear_search: "تلاش صاف کریں",
              load_more: "مزید لوڈ کریں",
              search_label: "تلاش",
              filters_label: "فلٹرز",
              zero_results: "[SEARCH_TERM] کے لیے کوئی نتیجہ نہیں ملا",
              many_results: "[SEARCH_TERM] کے لیے [COUNT] نتائج",
              one_result: "[SEARCH_TERM] کے لیے [COUNT] نتیجہ",
              alt_search: "کے لیے تلاش کریں",
              search_suggestion: "کیا آپ [SEARCH_TERM] تلاش کر رہے ہیں؟"
            } : undefined
          });
          setIsLoaded(true);
        } catch (error) {
          console.warn('Pagefind not available yet');
        }
      }
    }

    // Handle keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, isUrdu]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 search-overlay animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4 animate-scale-in">
        <div className="search-modal rounded-xl overflow-hidden">
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b border-line bg-subtle ${
            isUrdu ? 'flex-row-reverse' : ''
          }`}>
            <div className={`flex items-center space-x-3 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className="p-2 bg-brand/10 rounded-lg">
                <Search className="w-4 h-4 text-brand" />
              </div>
              <h2 className={`text-lg font-semibold ${isUrdu ? 'urdu-heading-3' : ''}`}>
                {isUrdu ? 'تلاش' : 'Search'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost p-2"
              aria-label={isUrdu ? 'بند کریں' : 'Close search'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Content */}
          <div className="p-6 min-h-[300px]">
            {!isLoaded && (
              <div className={`text-center py-12 ${isUrdu ? 'urdu-body' : ''}`}>
                <div className="loading-skeleton w-12 h-12 rounded-lg mx-auto mb-4"></div>
                <p className="text-ink-muted">
                  {isUrdu ? 'تلاش لوڈ ہو رہی ہے...' : 'Loading search...'}
                </p>
              </div>
            )}
            <div 
              ref={searchRef} 
              className={isUrdu ? 'text-right' : ''}
              dir={isUrdu ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Footer */}
          <div className={`px-6 py-4 border-t border-line bg-subtle text-caption ${
            isUrdu ? 'text-right urdu-body-sm' : ''
          }`}>
            <div className={`flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center space-x-2 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Command className="w-3 h-3" />
                <span>
                  {isUrdu 
                    ? 'تلاش کے لیے ٹائپ کریں'
                    : 'Type to search'
                  }
                </span>
              </div>
              <span>
                {isUrdu 
                  ? 'بند کرنے کے لیے Esc دبائیں'
                  : 'Press Esc to close'
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Global type declaration for PagefindUI
declare global {
  interface Window {
    PagefindUI: any;
  }
}