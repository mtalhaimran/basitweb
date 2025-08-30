'use client';

import Image from 'next/image';

interface TemplateHeroProps {
  lang?: 'ur' | 'en';
}

const content = {
  en: {
    headline: "I'm Abdul Basit Zafar",
    subheadline: "I am a writer and storyteller, exploring the space between technology, culture, and human experience.",
    cta: "Explore My Work",
  },
  ur: {
    headline: "میں عبدالباسط ظفر ہوں",
    subheadline: "میں ایک لکھاری اور کہانی گو ہوں، جو ٹیکنالوجی، ثقافت اور انسانی تجربے کے درمیان کی جگہ کو تلاش کرتا ہوں۔",
    cta: "میرا کام دیکھیں",
  },
};

export function TemplateHero({ lang = 'ur' }: TemplateHeroProps) {
  const isUrdu = lang === 'ur';
  const currentContent = isUrdu ? content.ur : content.en;

  return (
    <section
      className="relative flex items-center justify-center h-screen min-h-[500px] w-full"
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 flex w-full max-w-5xl px-8">
        <div className={`flex flex-col ${isUrdu ? 'items-end text-right' : 'items-start text-left'} space-y-8 text-white`}>
          
          {/* --- MODIFIED LINE --- */}
          <h1 className={`text-4xl font-bold sm:text-5xl md:text-7xl leading-normal md:leading-snug ${isUrdu ? 'font-urdu-heading' : 'font-sans'}`}>
            {currentContent.headline}
          </h1>

          <p className={`max-w-2xl text-lg md:text-2xl leading-loose ${isUrdu ? 'font-urdu-body' : 'font-sans'}`}>
            {currentContent.subheadline}
          </p>

          <a
            href={isUrdu ? "/work" : "/en/work"}
            className={`rounded-md bg-brand px-8 py-3 text-lg font-semibold text-white transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 ${isUrdu ? 'font-urdu-body' : 'font-sans'}`}
          >
            {currentContent.cta}
          </a>
        </div>
      </div>
    </section>
  );
}