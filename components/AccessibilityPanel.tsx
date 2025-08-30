'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Eye, Type, Contrast, Zap } from 'lucide-react';
import { useAccessibility } from './AccessibilityProvider';

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSetting, resetSettings } = useAccessibility();

  const toggles = [
    {
      key: 'dyslexiaFriendly' as const,
      label: 'Dyslexia-Friendly Font',
      labelUrdu: 'ڈسلیکسیا دوست فونٹ',
      description: 'Use OpenDyslexic font with enhanced spacing',
      descriptionUrdu: 'بہتر اسپیسنگ کے ساتھ ڈسلیکسیا فونٹ استعمال کریں',
      icon: Type,
    },
    {
      key: 'highContrast' as const,
      label: 'High Contrast',
      labelUrdu: 'زیادہ کنٹراسٹ',
      description: 'Increase text contrast for better readability',
      descriptionUrdu: 'بہتر پڑھنے کے لیے ٹیکسٹ کنٹراسٹ بڑھائیں',
      icon: Contrast,
    },
    {
      key: 'largeText' as const,
      label: 'Large Text',
      labelUrdu: 'بڑا ٹیکسٹ',
      description: 'Increase font size for easier reading',
      descriptionUrdu: 'آسان پڑھنے کے لیے فونٹ سائز بڑھائیں',
      icon: Eye,
    },
    {
      key: 'reducedMotion' as const,
      label: 'Reduce Motion',
      labelUrdu: 'کم حرکت',
      description: 'Minimize animations and transitions',
      descriptionUrdu: 'انیمیشن اور ٹرانزیشن کم کریں',
      icon: Zap,
    },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-4 bg-brand text-white rounded-full shadow-lg hover:bg-brand-hover transition-colors enhanced-focus"
        aria-label="Accessibility Settings"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* Panel Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-surface rounded-2xl shadow-2xl border border-line p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-heading-2 urdu-heading text-ink">
                    رسائی کی ترتیبات
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-ink-muted hover:text-ink hover:bg-surface-muted rounded-lg transition-colors enhanced-focus"
                    aria-label="بند کریں"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Settings */}
                <div className="space-y-4 mb-6">
                  {toggles.map((toggle) => {
                    const Icon = toggle.icon;
                    const isEnabled = settings[toggle.key];
                    
                    return (
                      <div key={toggle.key} className="flex items-start gap-4 flex-row-reverse text-right">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2 flex-row-reverse">
                            <h3 className="text-heading-4 urdu-heading text-ink">
                              {toggle.labelUrdu}
                            </h3>
                            <motion.button
                              onClick={() => updateSetting(toggle.key, !isEnabled)}
                              className={`relative w-12 h-6 rounded-full transition-colors enhanced-focus ${
                                isEnabled ? 'bg-brand' : 'bg-gray-300'
                              }`}
                              whileTap={{ scale: 0.95 }}
                            >
                              <motion.div
                                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                animate={{ x: isEnabled ? 24 : 4 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                              />
                            </motion.button>
                          </div>
                          <p className="text-caption urdu-text text-medium-contrast">
                            {toggle.descriptionUrdu}
                          </p>
                        </div>
                        <div className="p-3 bg-surface-muted rounded-xl">
                          <Icon className="w-5 h-5 text-brand" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetSettings}
                  className="w-full btn btn-secondary urdu-text enhanced-focus"
                >
                  ڈیفالٹ ترتیبات بحال کریں
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}