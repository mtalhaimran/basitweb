'use client';

import Image from 'next/image';
import NameRevealUrdu from './NameRevealUrdu';

interface TemplateHeroProps { lang?: 'ur' | 'en'; }

export function TemplateHero({ lang = 'ur' }: TemplateHeroProps) {
  const isUrdu = lang === 'ur';

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-visible" dir={isUrdu ? 'rtl' : 'ltr'}>
      <Image src="/images/hero.jpg" alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

      {/* TOP-RIGHT TRIGGER */}
      <div className="absolute top-6 right-6 z-20">
        <NameRevealUrdu className="text-white" />
      </div>

      {/* (optional) center text/content goes here; remove if you don’t need it */}
      {/* <div className="relative z-10 flex h-full items-center justify-center"></div> */}
    </section>
  );
}
