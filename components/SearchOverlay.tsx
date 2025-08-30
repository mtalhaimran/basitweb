'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Search, Command } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const searchRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isUrdu = true;

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        >
          <div className="fixed inset-0" onClick={onClose} />
          <motion.div 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4"
            initial={{ scale: shouldReduceMotion ? 1 : 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: shouldReduceMotion ? 1 : 0.95, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            <div className="bg-surface rounded-2xl shadow-2xl border border-line">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-line flex-row-reverse">
                <div className="flex items-center gap-4 flex-row-reverse">
                  <div className="p-3 bg-brand-light rounded-xl">
                    <Search className="w-6 h-6 text-brand" />
                  </div>
                  <h2 className="text-2xl font-bold urdu-heading text-ink">
                    تلاش
                  </h2>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-3 text-ink-muted hover:text-ink hover:bg-surface-muted rounded-xl transition-colors"
                  aria-label="تلاش بند کریں"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Search Content */}
              <div className="p-6 min-h-[400px]">
                {!isLoaded && (
                  <div className="text-center py-16">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl mx-auto mb-6 bg-surface-muted"
                      animate={shouldReduceMotion ? {} : { 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    <p className="text-ink-muted urdu-text">
                      تلاش لوڈ ہو رہی ہے...
                    </p>
                  </div>
                )}
                <div ref={searchRef} />
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-line bg-surface-muted text-sm text-ink-muted text-right">
                <div className="flex items-center justify-between flex-row-reverse">
                  <div className="flex items-center gap-2 flex-row-reverse urdu-text">
                    <Command className="w-4 h-4" />
                    <span>تلاش کے لیے ٹائپ کریں</span>
                  </div>
                  <span className="urdu-text">
                    بند کرنے کے لیے Esc دبائیں
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

declare global {
  interface Window {
    PagefindUI: any;
  }
}