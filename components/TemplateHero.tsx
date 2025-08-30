'use client';

import Image from 'next/image';

interface TemplateHeroProps {
  lang?: 'ur' | 'en';
}

// Define our text content outside the component for better organization
const content = {
  en: {
    headline: "I'm Abdul Basit Zafar",
    subheadline:
      "A passionate Full-Stack Developer building modern, high-performance web applications.",
    cta: "View My Work",
  },
  ur: {
    headline: "میں عبدالباسط ظفر ہوں",
    subheadline: "ایک پرجوش فل اسٹیک ڈیولپر جو جدید اور تیز رفتار ویب ایپلیکیشنز بناتا ہے۔",
    cta: "میرا کام دیکھیں",
  },
};

export function TemplateHero({ lang = 'ur' }: TemplateHeroProps) {
  const isUrdu = lang === 'ur';
  const currentContent = isUrdu ? content.ur : content.en;

  return (
    <section
      className="relative h-[70vh] min-h-[500px] w-full"
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      {/* Background Image with Optimization */}
      <Image
        src="/images/hero.jpg"
        alt="A professional background image related to technology or coding"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content Container - Centered */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
        
        {/* Main Headline (h1) */}
        <h1
          className={`text-4xl font-bold sm:text-5xl md:text-6xl ${
            isUrdu ? 'urdu-heading' : ''
          }`}
        >
          {currentContent.headline}
        </h1>

        {/* Sub-headline (p) */}
        <p
          className={`mt-4 max-w-2xl text-lg text-gray-200 md:text-xl ${
            isUrdu ? 'urdu-text' : ''
          }`}
        >
          {currentContent.subheadline}
        </p>

        {/* Call to Action Button */}
        <a
          href="#projects" // This should link to your projects/portfolio section
          className={`mt-8 rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isUrdu ? 'urdu-text' : ''
          }`}
        >
          {currentContent.cta}
        </a>
      </div>
    </section>
  );
}