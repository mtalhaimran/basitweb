'use client';
import Image from 'next/image';

interface TemplateHeroProps { lang?: 'ur' | 'en' }

export function TemplateHero({ lang = 'ur' }: TemplateHeroProps) {
  // Prefer setting dir on <html>, but this local fallback is OK:
  const isUrdu = lang === 'ur';

  return (
    <section
      className="relative h-[60vh] min-h-[400px] w-full overflow-visible"
      // better to rely on <html dir="rtl|ltr">; keep this if you must localize
      dir={isUrdu ? 'rtl' : 'ltr'}
      aria-label="Hero"
    >
      <Image
        src="/images/hero.jpg"
        alt=""             // keep empty if purely decorative
        fill
        priority           // good for LCP
        sizes="100vw"      // avoids layout shifts on responsive
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      <div className="relative z-10 flex h-full items-center justify-center">
        {/* Put heading here; use text-start for RTL/LTR safety */}
        {/* <h1 className="text-white text-3xl sm:text-4xl md:text-5xl text-start">
            میں عبدالباسط ظفر ہوں…
          </h1> */}
      </div>
    </section>
  );
}
