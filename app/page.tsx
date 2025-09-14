'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TimelineIcon } from '@/components/TimelineIcon';

// Animation variants for sections that fade/slide in
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

// Reusable Milestone Component with Image Support
function Milestone({ year, text, imageSrc, imageAlt, index, isUrdu }: { year: string; text: string; imageSrc: string; imageAlt: string; index: number; isUrdu: boolean; }) {
  const isImageLeft = index % 2 === 0;
  const textAlign = isUrdu ? 'text-right' : 'text-left';

  return (
    <motion.div
      className="py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className={`relative h-80 rounded-lg overflow-hidden shadow-xl ${isImageLeft ? '' : 'md:order-last'}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
        <div className={textAlign}>
          <p className="text-lg font-semibold text-ink-muted mb-4">
            <span className="text-brand mr-2">{year}</span>
          </p>
          <h3 className={`text-3xl md:text-4xl ${isUrdu ? 'font-urdu-heading' : 'font-sans font-bold'}`}>
            {text}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  const content = {
    ur: {
      headline: 'عبدالباسط ظفر',
      subheadline: 'لکھاری اور کہانی گو',
      intro: 'جرمنی میں مقیم، میں ٹیکنالوجی، ثقافت، اور انسانی تجربے کے درمیان تعلق کو دریافت کرتا ہوں۔ میری تحریریں ڈیجیٹل اور ادبی دنیاؤں کے درمیان پل کا کام کرتی ہیں۔',
      milestones: [
        { year: '۲۰۱۸', text: 'جرمنی کا سفر شروع ہوا۔', image: '/images/hero.jpg', alt: 'Placeholder alt text', icon: 'milestone' as const },
        { year: '۲۰۲۱', text: 'پہلی کتاب شائع ہوئی۔', image: '/images/hero.jpg', alt: 'Placeholder alt text', icon: 'book' as const },
        { year: '۲۰۲۴', text: 'بن کا بنجارہ سیریز کا آغاز۔', image: '/images/hero.jpg', alt: 'Placeholder alt text', icon: 'writing' as const }
      ],
      quote: 'ہر کہانی ایک سفر ہے، اور ہر لفظ ایک قدم۔',
      cta: 'میرا کام دیکھیں',
    },
    en: {
      headline: 'Abdul Basit Zafar',
      subheadline: 'Writer and Storyteller',
      intro: 'Based in Bonn, Germany, I explore the intersection of technology, culture, and human experience. My writing bridges the digital and literary worlds.',
      milestones: [
        { year: '2018', text: 'The Journey to Germany Began.', image: '/images/hero.jpg', alt: 'Placeholder alt text', icon: 'milestone' as const },
        { year: '2021', text: 'Published the First Novel.', image: '/images/hero.jpg', alt: 'Placeholder alt text', icon: 'book' as const },
        { year: '2024', text: 'Launched the Bonn ka Banjara Series.', image: '/images/hero.jpg', alt: 'Placeholder alt text', icon: 'writing' as const }
      ],
      quote: 'Every story is a journey, and every word is a step.',
      cta: 'Explore My Work',
    },
  };

  const currentContent = isUrdu ? content.ur : content.en;
  const introWords = currentContent.intro.split(' ');

  return (
    <div>
      {/* Section 1: Hero */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center text-white bg-black">
        <Image
          src="/images/hero.jpg"
          alt="Abstract background"
          fill
          priority
          className="object-cover z-0 opacity-40"
        />
        <div className="relative z-10 p-4">
          <motion.h1 className={`text-6xl md:text-8xl mb-4 ${isUrdu ? 'font-urdu-heading' : 'font-sans font-bold'}`} initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            {currentContent.headline}
          </motion.h1>
          <motion.p className={`text-xl md:text-2xl ${isUrdu ? 'font-urdu-body' : 'font-sans'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}>
            {currentContent.subheadline}
          </motion.p>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="bg-surface text-ink">
        <div className="container mx-auto">
          {/* Intro Section */}
          <motion.section className="max-w-3xl mx-auto py-24 md:py-32 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
            <p className={`text-2xl md:text-3xl ${isUrdu ? 'font-urdu-body leading-loose' : 'font-sans leading-relaxed'}`}>
              {introWords.map((word, i) => (
                <motion.span key={i} className="inline-block" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                  {word}{' '}
                </motion.span>
              ))}
            </p>
          </motion.section>

          {/* All Milestones */}
          {currentContent.milestones.map((milestone, index) => (
            <Milestone key={index} index={index} year={milestone.year} text={milestone.text} imageSrc={milestone.image} imageAlt={milestone.alt} isUrdu={isUrdu} />
          ))}

          {/* Quote Section */}
          <motion.section className="max-w-3xl mx-auto py-24 md:py-32 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={sectionVariants}>
            <blockquote className={`text-3xl md:text-4xl italic ${isUrdu ? 'font-urdu-heading' : 'font-sans'}`}>
              “{currentContent.quote}”
            </blockquote>
          </motion.section>

          {/* CTA Section */}
          <motion.section className="pt-12 pb-24 md:pb-32 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={sectionVariants}>
            <Link href="/work" className={`inline-block rounded-md bg-brand px-12 py-5 text-xl font-semibold text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 ${isUrdu ? 'font-urdu-body' : 'font-sans'}`}>
              {currentContent.cta}
            </Link>
          </motion.section>
        </div>
      </div>
    </div>
  );
}