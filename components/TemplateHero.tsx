'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import NameRevealUrdu from './NameRevealUrdu';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface TemplateHeroProps {
  lang?: 'ur' | 'en';
}

export function TemplateHero({ lang = 'ur' }: TemplateHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isUrdu = lang === 'ur';

  useEffect(() => setIsLoaded(true), []);

  const skills = ['Strategy', 'Creative', 'Writing', 'Marketing', 'Branding'];
  const skillsUrdu = ['حکمت عملی', 'تخلیقی', 'تحریر', 'مارکیٹنگ', 'برانڈنگ'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1, delayChildren: shouldReduceMotion ? 0 : 0.3 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <section
      className="bg-surface py-16 md:py-24" // was: hero-section
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      <div className="mx-auto max-w-6xl px-4"> {/* was: container */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3"> {/* was: template-grid */}
          {/* Left Column */}
          <motion.div
            className="lg:col-span-1 text-right"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-10 urdu-heading">{isUrdu ? 'اسٹوڈیو' : 'STUDIO'}</h2>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10">
              <p className="text-ink-muted urdu-text max-w-sm leading-relaxed ml-auto">{/* was: mr-auto (flip for rtl) */}
                {isUrdu
                  ? 'عبدالباسط ظفر ایک لکھاری، برانڈ حکمت عملی ساز، اور تخلیقی ڈائریکٹر ہے جو افراد اور برانڈز کے ساتھ مل کر دلکش کہانی گوئی، مقصدی تخلیقی منصوبہ بندی، اور کمیونٹی پر مبنی ترقی کا کام کرتا ہے۔'
                  : 'Abdul Basit Zafar is a writer, brand strategist, and creative director who collaborates with individuals and brands looking for compelling storytelling, purposeful creative planning, and community-focused development.'}
              </p>
            </motion.div>

            <motion.div className="flex flex-wrap gap-2 justify-end" variants={itemVariants}>
              {(isUrdu ? skillsUrdu : skills).map((skill, i) => (
                <motion.span
                  key={skill}
                  className="rounded-full bg-surface-muted text-ink px-3 py-1 text-sm urdu-text" // was: skill-badge
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    delay: shouldReduceMotion ? 0 : 0.8 + i * 0.1,
                    type: 'spring',
                    bounce: 0.3
                  }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2, transition: { duration: 0.2 } }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="lg:col-span-2 text-right"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-10 urdu-heading">{isUrdu ? 'پروجیکٹس' : 'PROJECTS'}</h2>

              <NameRevealUrdu className="text-ink" />

              {/* CTAs */}
              <div className="flex gap-6 justify-end">
                <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }} whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}>
                  <Link
                    href="/work"
                    className={`inline-flex items-center ${isUrdu ? 'flex-row-reverse' : ''} gap-2 rounded-2xl bg-brand px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand/40`}
                  >
                    <span className="urdu-text">{isUrdu ? 'میرا کام دیکھیں' : 'View My Work'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </motion.div>

                <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }} whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className={`inline-flex items-center ${isUrdu ? 'flex-row-reverse' : ''} gap-2 rounded-2xl border border-ink/15 px-5 py-3 text-base font-semibold text-ink transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-brand/40 urdu-text`}
                  >
                    <span>{isUrdu ? 'رابطہ کریں' : 'Contact'}</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Featured projects */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" variants={itemVariants}>
              {/* Project cards go here */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}