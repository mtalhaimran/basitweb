'use client';

import Image from 'next/image';

interface TemplateHeroProps {
  lang?: 'ur' | 'en';
}

// Organized content for both languages
const content = {
  en: {
    headline: "I'm Abdul Basit Zafar",
    subheadline: "A passionate full-stack developer building modern, high-performance web applications.",
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
      {/* Background Image */}
      <Image
        src="/images/hero.jpg"
        alt="A professional background image related to technology or coding"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Centered Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center text-white">
        
        <h1 className={`text-4xl font-bold sm:text-5xl md:text-6xl ${isUrdu ? 'font-urdu-heading' : ''}`}>
          {currentContent.headline}
        </h1>

        <p className={`mt-4 max-w-2xl text-lg text-gray-200 md:text-xl ${isUrdu ? 'font-urdu-body' : ''}`}>
          {currentContent.subheadline}
        </p>

        {/* Call to Action Button */}
        <a
          href={isUrdu ? "/work" : "/en/work"} // Links to the correct work page
          className={`mt-8 rounded-md bg-brand px-8 py-3 text-lg font-semibold text-white transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 ${isUrdu ? 'font-urdu-body' : ''}`}
        >
          {currentContent.cta}
        </a>
      </div>
    </section>
  );
}