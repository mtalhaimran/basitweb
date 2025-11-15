'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface TemplateHeroProps { lang?: 'ur' | 'en'; }

export function TemplateHero({ lang = 'ur' }: TemplateHeroProps) {
  const isUrdu = lang === 'ur';

  const nameUrdu = "عبدالباسط ظفر";
  const subtitleUrdu = "لکھاری اور کہانی گو";
  const introUrdu = "جرمنی کے شہر بون میں مقیم، میں ٹیکنالوجی، ثقافت، اور انسانی تجربے کے درمیان تعلق کو دریافت کرتا ہوں۔";

  const nameEnglish = "Abdul Basit Zafar";
  const subtitleEnglish = "Writer and Storyteller";
  const introEnglish = "Based in Bonn, Germany, I explore the intersection of technology, culture, and human experience.";

  const name = isUrdu ? nameUrdu : nameEnglish;
  const subtitle = isUrdu ? subtitleUrdu : subtitleEnglish;
  const intro = isUrdu ? introUrdu : introEnglish;

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden" dir={isUrdu ? 'rtl' : 'ltr'}>
      <Image src="/images/hero.jpg" alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      
      {/* Center text content on the image */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className={`container px-4 ${isUrdu ? 'text-right' : 'text-left'}`}>
          <div className="max-w-3xl mx-auto">
            <motion.h1 
              className={`text-6xl md:text-7xl font-bold mb-4 text-white ${isUrdu ? 'font-urdu-heading' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {name}
            </motion.h1>
            <motion.p 
              className={`text-2xl md:text-3xl text-white/90 mb-6 ${isUrdu ? 'font-urdu-body' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {subtitle}
            </motion.p>
            <motion.p 
              className={`text-lg md:text-xl text-white/80 leading-relaxed ${isUrdu ? 'font-urdu-body' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {intro}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
