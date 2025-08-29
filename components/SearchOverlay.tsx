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
            resetStyles: false
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4 animate-scale-in">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200">
          {/* Header */}
          <div className={`flex items-center justify-between p-8 border-b border-gray-200 ${isUrdu ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <div className="p-3 bg-red-100 rounded-2xl">
                <Search className="w-6 h-6 text-red-600" />
              </div>
              <h2 className={`text-2xl font-bold ${isUrdu ? 'urdu-heading' : ''}`}>
                {isUrdu ? 'تلاش' : 'Search'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="btn-ghost p-3 rounded-2xl"
              aria-label={isUrdu ? 'تلاش بند کریں' : 'Close search'}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Content */}
          <div className="p-8 min-h-[400px]">
            {!isLoaded && (
              <div className="text-center py-16">
                <div className="loading-skeleton w-16 h-16 rounded-2xl mx-auto mb-6"></div>
                <p className={`text-gray-500 ${isUrdu ? 'urdu-text' : ''}`}>
                  {isUrdu ? 'تلاش لوڈ ہو رہی ہے...' : 'Loading search...'}
                </p>
              </div>
            )}
            <div ref={searchRef} />
          </div>

          {/* Footer */}
          <div className={`px-8 py-6 border-t border-gray-200 bg-gray-50 text-caption text-gray-500 ${
            isUrdu ? 'text-right' : ''
          }`}>
            <div className={`flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isUrdu ? 'flex-row-reverse urdu-text' : ''}`}>
                <Command className="w-4 h-4" />
                <span>{isUrdu ? 'تلاش کے لیے ٹائپ کریں' : 'Type to search'}</span>
              </div>
              <span className={isUrdu ? 'urdu-text' : ''}>
                {isUrdu ? 'بند کرنے کے لیے Esc دبائیں' : 'Press Esc to close'}
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