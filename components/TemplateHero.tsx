'use client';

import Image from 'next/image';

interface TemplateHeroProps {
  lang?: 'ur' | 'en';
}

export function TemplateHero({ lang = 'ur' }: TemplateHeroProps) {
  const isUrdu = lang === 'ur';

  return (
    <section
      className="relative h-[60vh] min-h-[400px] w-full overflow-visible"
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      <Image src="/images/hero.jpg" alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      <div className="relative z-10 flex h-full items-center justify-center">
        {/* Example: <h1 className="text-white urdu-heading text-3xl sm:text-4xl md:text-5xl text-center">میں عبدالباسط ظفر ہوں…</h1> */}
      </div>
    </section>
  );
}
