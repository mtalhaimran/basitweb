'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'en' | 'ur';
}

export function SearchOverlay({ isOpen, onClose, lang = 'en' }: SearchOverlayProps) {
  const searchRef = useRef<HTMLDivElement>(null);
  const isUrdu = lang === 'ur';

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.PagefindUI) {
      const search = new window.PagefindUI({
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
          zero_results: "کوئی نتیجہ نہیں ملا",
          many_results: "[SEARCH_TERM] کے لیے [COUNT] نتائج",
          one_result: "[SEARCH_TERM] کے لیے [COUNT] نتیجہ",
          alt_search: "کے لیے تلاش کریں",
          search_suggestion: "کیا آپ [SEARCH_TERM] تلاش کر رہے ہیں؟"
        } : undefined
      });
    }

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Handle Cmd/Ctrl+K
    const handleSearchShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // Open search (handled by parent component)
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    document.addEventListener('keydown', handleSearchShortcut);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleSearchShortcut);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 search-overlay">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="fixed top-[10vh] left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-background border rounded-lg shadow-2xl">
        <div className={`flex items-center justify-between p-4 border-b ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <h2 className={`text-lg font-medium ${isUrdu ? 'urdu-heading' : ''}`}>
            {isUrdu ? 'تلاش' : 'Search'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded-md transition-colors"
            aria-label={isUrdu ? 'بند کریں' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <div ref={searchRef} className={isUrdu ? 'rtl' : ''} />
        </div>
        <div className={`p-4 border-t bg-muted/50 text-xs text-muted-foreground ${isUrdu ? 'text-right urdu-text' : ''}`}>
          {isUrdu 
            ? 'تلاش کے لیے Ctrl+K دبائیں، بند کرنے کے لیے Escape'
            : 'Press Ctrl+K to search, Escape to close'
          }
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