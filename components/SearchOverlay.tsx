'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Search, Command } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const searchRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
    <div className="fixed inset-0 z-50 search-overlay animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4 animate-scale-in">
        <div className="search-modal">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Search className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold">Search</h2>
            </div>
            <button
              onClick={onClose}
              className="btn-ghost p-2 rounded-lg"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Content */}
          <div className="p-6 min-h-[400px]">
            {!isLoaded && (
              <div className="text-center py-16">
                <div className="loading-skeleton w-16 h-16 rounded-2xl mx-auto mb-6"></div>
                <p className="text-gray-500">Loading search...</p>
              </div>
            )}
            <div ref={searchRef} />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-caption text-gray-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Command className="w-4 h-4" />
                <span>Type to search</span>
              </div>
              <span>Press Esc to close</span>
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