'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, BookOpen, PenTool, Mic } from 'lucide-react';
import { books, essays, series } from '@/lib/data/content';
import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PortfolioGrid() {
  const pathname = usePathname();
  const isLandingPage = pathname === '/' || pathname === '/en';
  const isUrduPage = !pathname.startsWith('/en');
  const shouldReduceMotion = useReducedMotion();
  
  const featuredBooks = books.slice(0, 2);
  const featuredEssays = essays.slice(0, 3);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
        delayChildren: shouldReduceMotion ? 0 : 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Full Background */}
      <section className="hero-section relative overflow-hidden">
        {/* Full-screen background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            unoptimized
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        <div className="container relative z-10 text-center text-white min-h-screen flex items-center justify-center">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Bilingual Hero Content */}
            {isLandingPage ? (
              <div className="space-y-12">
                {/* Urdu Section */}
                <motion.div
                  className="text-right"
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 1, delay: shouldReduceMotion ? 0 : 0.5 }}
                >
                  <h1 className="text-6xl md:text-7xl font-bold mb-6 font-urdu-heading">
                    عبدالباسط ظفر
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed font-urdu-body max-w-3xl mr-auto">
                    لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان کہانیوں کے ذریعے پل بناتا ہے
                  </p>
                </motion.div>

                {/* English Section */}
                <motion.div
                  className="text-left"
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 1, delay: shouldReduceMotion ? 0 : 0.7 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white/95">
                    Abdul Basit Zafar
                  </h2>
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
                    Writer and storyteller bridging technology, culture, and human experience through narratives that connect worlds across languages and borders
                  </p>
                </motion.div>

                {/* CTAs */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 1.2 }}
                >
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link 
                      href="/work"
                      className="inline-flex items-center px-8 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
                    >
                      <span className="urdu-text">میرا کام دیکھیں</span>
                      <ArrowUpRight className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link 
                      href="/about"
                      className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                    >
                      <span className="urdu-text">تعارف</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            ) : (
              /* Urdu-only hero for other pages */
              <motion.div
                className="text-right"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 1, delay: shouldReduceMotion ? 0 : 0.5 }}
              >
                <h1 className="text-6xl md:text-7xl font-bold mb-8 font-urdu-heading">
                  عبدالباسط ظفر
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed font-urdu-body max-w-3xl mr-auto">
                  لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان کہانیوں کے ذریعے پل بناتا ہے
                </p>
                
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link 
                    href="/work"
                    className="inline-flex items-center px-8 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
                  >
                    <span className="urdu-text">میرا کام دیکھیں</span>
                    <ArrowUpRight className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-24 bg-surface-muted">
        <div className="container">
          {/* Books Section */}
          <motion.div 
            className="mb-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="flex items-end justify-between mb-16 flex-row-reverse text-right"
              variants={itemVariants}
            >
              <div>
                <h2 className="text-4xl font-bold mb-4 text-ink font-urdu-heading">
                  تازہ کتابیں
                </h2>
                <p className="text-xl text-ink-muted font-urdu-body">
                  شناخت، ٹیکنالوجی، اور انسانی رشتوں کو دریافت کرنے والے ناول
                </p>
              </div>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <Link 
                  href="/books"
                  className="inline-flex items-center text-brand hover:text-red-700 font-medium transition-colors group"
                >
                  <span className="urdu-text">تمام کتابیں</span>
                  <ArrowUpRight className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredBooks.map((book, index) => (
                <motion.article
                  key={book.id}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-line hover:shadow-xl transition-all duration-300 group"
                  variants={itemVariants}
                  whileHover={shouldReduceMotion ? {} : { 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" } 
                  }}
                >
                  <div className="flex items-start gap-6 flex-row-reverse text-right">
                    <motion.div 
                      className="flex-shrink-0"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="w-20 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shadow-sm">
                        <BookOpen className="w-10 h-10 text-brand" />
                      </div>
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 text-sm flex-row-reverse justify-end">
                        <span className="uppercase tracking-wide font-semibold text-brand urdu-text">
                          کتاب
                        </span>
                        <span className="text-ink-muted">•</span>
                        <span className="text-ink-muted">{book.publishedYear}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 text-ink font-urdu-heading group-hover:text-brand transition-colors">
                        {book.titleUrdu || book.title}
                      </h3>
                      
                      <p className="text-ink-muted mb-6 leading-relaxed font-urdu-body">
                        {book.descriptionUrdu || book.description}
                      </p>

                      <motion.div
                        whileHover={shouldReduceMotion ? {} : { x: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link 
                          href={`/books/${book.slug}`}
                          className="inline-flex items-center text-brand hover:text-red-700 font-medium transition-colors group"
                        >
                          <span className="urdu-text">دیکھیں</span>
                          <ArrowUpRight className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Writing Section */}
          <motion.div 
            className="mb-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="flex items-end justify-between mb-16 flex-row-reverse text-right"
              variants={itemVariants}
            >
              <div>
                <h2 className="text-4xl font-bold mb-4 text-ink font-urdu-heading">
                  حالیہ تحریریں
                </h2>
                <p className="text-xl text-ink-muted font-urdu-body">
                  ٹیکنالوجی، ثقافت، اور کہانی گوئی پر مضامین
                </p>
              </div>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <Link 
                  href="/writing"
                  className="inline-flex items-center text-brand hover:text-red-700 font-medium transition-colors group"
                >
                  <span className="urdu-text">تمام تحریریں</span>
                  <ArrowUpRight className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEssays.map((essay, index) => (
                <motion.article
                  key={essay.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-line hover:shadow-xl transition-all duration-300 group"
                  variants={itemVariants}
                  whileHover={shouldReduceMotion ? {} : { 
                    y: -6,
                    transition: { duration: 0.3, ease: "easeOut" } 
                  }}
                >
                  <div className="text-right">
                    <div className="flex items-center gap-3 mb-4 text-sm flex-row-reverse justify-end">
                      <PenTool className="w-4 h-4 text-brand" />
                      <span className="uppercase tracking-wide font-semibold text-brand urdu-text">
                        مضمون
                      </span>
                      <span className="text-ink-muted">•</span>
                      <span className="text-ink-muted urdu-text">
                        {essay.readTime} منٹ
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 text-ink font-urdu-heading group-hover:text-brand transition-colors">
                      {essay.titleUrdu || essay.title}
                    </h3>
                    
                    <p className="text-ink-muted mb-6 leading-relaxed font-urdu-body">
                      {essay.descriptionUrdu || essay.description}
                    </p>

                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { x: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link 
                        href={`/writing/${essay.slug}`}
                        className="inline-flex items-center text-brand hover:text-red-700 font-medium transition-colors group"
                      >
                        <span className="urdu-text">پڑھیں</span>
                        <ArrowUpRight className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Series Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="mb-16 text-right"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold mb-4 text-ink font-urdu-heading">
                خصوصی سلسلہ
              </h2>
              <p className="text-xl text-ink-muted font-urdu-body">
                جاری کہانی کی تلاش
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-sm border border-line hover:shadow-xl transition-all duration-300 group"
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" } 
              }}
            >
              <div className="flex items-start gap-8 flex-row-reverse text-right">
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center shadow-sm">
                    <Mic className="w-12 h-12 text-brand" />
                  </div>
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4 text-sm flex-row-reverse justify-end">
                    <span className="uppercase tracking-wide font-semibold text-brand urdu-text">
                      سلسلہ
                    </span>
                    <span className="text-ink-muted">•</span>
                    <span className="text-ink-muted urdu-text">
                      {series.totalEntries} حصے
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-6 text-ink font-urdu-heading group-hover:text-brand transition-colors">
                    {series.titleUrdu}
                  </h3>
                  
                  <p className="text-ink-muted mb-8 leading-relaxed max-w-2xl font-urdu-body">
                    {series.descriptionUrdu}
                  </p>

                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link 
                      href="/ur/bonn-ka-banjara"
                      className="inline-flex items-center px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
                    >
                      <span className="urdu-text">سلسلہ دیکھیں</span>
                      <ArrowUpRight className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-white">
        <div className="container">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-right"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold mb-8 text-ink font-urdu-heading">
              آئیے جڑتے ہیں
            </h2>
            <p className="text-xl mb-12 text-ink-muted font-urdu-body">
              تعاون، تقاریر، یا صرف کہانیوں کے بارے میں بات کرنے میں دلچسپی ہے؟ میں آپ سے سننا پسند کروں گا۔
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center sm:flex-row-reverse"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                <span className="urdu-text">رابطہ کریں</span>
                <ArrowUpRight className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}