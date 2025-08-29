'use client';

import { useState, useEffect } from 'react';
import { Settings, Type, Spacing, Eye, Palette } from 'lucide-react';

export function AccessibilityControls() {
  const [isVisible, setIsVisible] = useState(false);
  const [textSize, setTextSize] = useState('normal');
  const [lineSpacing, setLineSpacing] = useState('normal');
  const [letterSpacing, setLetterSpacing] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Apply text size
    document.documentElement.classList.remove('text-size-small', 'text-size-normal', 'text-size-large', 'text-size-extra-large');
    document.documentElement.classList.add(`text-size-${textSize}`);

    // Apply line spacing
    document.documentElement.classList.remove('line-spacing-normal', 'line-spacing-relaxed', 'line-spacing-loose');
    document.documentElement.classList.add(`line-spacing-${lineSpacing}`);

    // Apply letter spacing
    document.documentElement.classList.remove('letter-spacing-normal', 'letter-spacing-wide', 'letter-spacing-wider');
    document.documentElement.classList.add(`letter-spacing-${letterSpacing}`);

    // Apply high contrast
    if (highContrast) {
      document.documentElement.style.setProperty('--ink', '#000000');
      document.documentElement.style.setProperty('--ink-muted', '#333333');
      document.documentElement.style.setProperty('--surface', '#FFFFFF');
      document.documentElement.style.setProperty('--primary', '#CC0000');
    } else {
      document.documentElement.style.removeProperty('--ink');
      document.documentElement.style.removeProperty('--ink-muted');
      document.documentElement.style.removeProperty('--surface');
      document.documentElement.style.removeProperty('--primary');
    }
  }, [textSize, lineSpacing, letterSpacing, highContrast]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 p-3 bg-white border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="إعدادات إمكانية الوصول"
        title="إعدادات إمكانية الوصول"
      >
        <Settings className="w-5 h-5 text-gray-600" />
      </button>

      {/* Controls Panel */}
      {isVisible && (
        <div className="accessibility-controls visible">
          <h3 className="text-sm font-semibold mb-4 text-right urdu-text">إعدادات إمكانية الوصول</h3>
          
          {/* Text Size */}
          <div className="mb-4">
            <label className="block text-xs font-medium mb-2 text-right urdu-text">حجم النص</label>
            <div className="space-y-1">
              {[
                { value: 'small', label: 'صغير' },
                { value: 'normal', label: 'عادي' },
                { value: 'large', label: 'كبير' },
                { value: 'extra-large', label: 'كبير جداً' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTextSize(option.value)}
                  className={`${textSize === option.value ? 'active' : ''} urdu-text text-right`}
                >
                  <Type className="w-3 h-3 ml-2" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Line Spacing */}
          <div className="mb-4">
            <label className="block text-xs font-medium mb-2 text-right urdu-text">تباعد الأسطر</label>
            <div className="space-y-1">
              {[
                { value: 'normal', label: 'عادي' },
                { value: 'relaxed', label: 'مريح' },
                { value: 'loose', label: 'واسع' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLineSpacing(option.value)}
                  className={`${lineSpacing === option.value ? 'active' : ''} urdu-text text-right`}
                >
                  <Spacing className="w-3 h-3 ml-2" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Letter Spacing */}
          <div className="mb-4">
            <label className="block text-xs font-medium mb-2 text-right urdu-text">تباعد الحروف</label>
            <div className="space-y-1">
              {[
                { value: 'normal', label: 'عادي' },
                { value: 'wide', label: 'واسع' },
                { value: 'wider', label: 'أوسع' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLetterSpacing(option.value)}
                  className={`${letterSpacing === option.value ? 'active' : ''} urdu-text text-right`}
                >
                  <Eye className="w-3 h-3 ml-2" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast */}
          <div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`${highContrast ? 'active' : ''} urdu-text text-right`}
            >
              <Palette className="w-3 h-3 ml-2" />
              تباين عالي
            </button>
          </div>
        </div>
      )}
    </>
  );
}