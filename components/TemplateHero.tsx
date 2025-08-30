'use client';

import Image from 'next/image';
import NameRevealUrdu from './NameRevealUrdu';

interface TemplateHeroProps {
  lang?: 'ur' | 'en';
}

export function TemplateHero({ lang = 'ur' }: TemplateHeroProps) {
  const isUrdu = lang === 'ur';

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full" dir={isUrdu ? 'rtl' : 'ltr'}>
      <Image
        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <NameRevealUrdu className="text-white" />
      </div>
    </section>
  );
}
