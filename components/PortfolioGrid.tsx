'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, BookOpen, PenTool, Mic, Star } from 'lucide-react';
import { books, essays, series } from '@/lib/data/content';
import { motion } from 'framer-motion';

export function PortfolioGrid() {
  const featuredBooks = books.slice(0, 2);
  const featuredEssays = essays.slice(0, 3);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Full Background */}
      <section className="hero-section relative">
        {/* Full-screen background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="عبدالباسط ظفر - لکھاری اور کہانی گو"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
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
            <motion.h1 
              className="text-display urdu-display mb-8 text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              عبدالباسط ظفر
            </motion.h1>
            
            <motion.p 
              className="large-text mb-12 max-w-3xl mx-auto urdu-text text-white/90 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان تعلق کو دریافت کرتا ہے۔ کہانیاں جو زبانوں اور سرحدوں کے پار دنیاوں کو جوڑتی ہیں۔
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center sm:flex-row-reverse"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link 
                  href="/work"
                  className="btn btn-primary group"
                >
                  <span className="urdu-text">میرا کام دیکھیں</span>
                  <ArrowUpRight className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link 
                  href="/about"
                  className="btn btn-secondary urdu-text"
                >
                  تعارف
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="work-section">
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
                <h2 className="text-heading-2 urdu-heading mb-4 text-ink">
                  تازہ کتابیں
                </h2>
                <p className="large-text urdu-text text-ink-muted">
                  شناخت، ٹیکنالوجی، اور انسانی رشتوں کو دریافت کرنے والے ناول
                </p>
              </div>
              <Link 
                href="/books"
                className="view-link urdu-text flex-row-reverse"
              >
                <span>تمام کتابیں</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <div className="portfolio-grid">
              {featuredBooks.map((book, index) => (
                <motion.article
                  key={book.id}
                  className="minimal-card"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.3, ease: "easeOut" } 
                  }}
                >
                  <div className="flex items-start gap-6 flex-row-reverse text-right">
                    <div className="flex-shrink-0">
                      <motion.div 
                        className="w-16 h-20 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center shadow-sm"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <BookOpen className="w-8 h-8 text-primary" />
                      </motion.div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 text-caption flex-row-reverse justify-end">
                        <span className="uppercase tracking-wide font-semibold text-primary urdu-text">
                          کتاب
                        </span>
                        <span className="text-ink-light">•</span>
                        <span className="text-ink-muted">{book.publishedYear}</span>
                        {book.buyLinks && (
                          <>
                            <span className="text-ink-light">•</span>
                            <div className="flex items-center gap-1 flex-row-reverse">
                              <Star className="w-3 h-3 text-primary-500" />
                              <span className="text-ink-muted urdu-text">
                                دستیاب
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <h3 className="card-title urdu-heading">
                        {book.titleUrdu || book.title}
                      </h3>
                      
                      <p className="text-ink-muted mb-6 leading-relaxed urdu-text">
                        {book.descriptionUrdu || book.description}
                      </p>

                      <Link 
                        href={`/books/${book.slug}`}
                        className="view-link urdu-text flex-row-reverse"
                      >
                        <span>دیکھیں</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
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
                <h2 className="text-heading-2 urdu-heading mb-4 text-ink">
                  حالیہ تحریریں
                </h2>
                <p className="large-text urdu-text text-ink-muted">
                  ٹیکنالوجی، ثقافت، اور کہانی گوئی پر مضامین
                </p>
              </div>
              <Link 
                href="/writing"
                className="view-link urdu-text flex-row-reverse"
              >
                <span>تمام تحریریں</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <div className="work-grid">
              {featuredEssays.map((essay, index) => (
                <motion.article
                  key={essay.id}
                  className="minimal-card"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -6, 
                    transition: { duration: 0.3, ease: "easeOut" } 
                  }}
                >
                  <div className="text-right">
                    <div className="flex items-center gap-3 mb-4 text-caption flex-row-reverse justify-end">
                      <PenTool className="w-4 h-4 text-primary" />
                      <span className="uppercase tracking-wide font-semibold text-primary urdu-text">
                        مضمون
                      </span>
                      <span className="text-ink-light">•</span>
                      <span className="text-ink-muted">
                        {new Date(essay.publishedDate).toLocaleDateString('ur-PK', {
                          year: 'numeric',
                          month: 'short'
                        })}
                      </span>
                      <span className="text-ink-light">•</span>
                      <span className="text-ink-muted urdu-text">
                        {essay.readTime} منٹ
                      </span>
                    </div>
                    
                    <h3 className="card-title urdu-heading">
                      {essay.titleUrdu || essay.title}
                    </h3>
                    
                    <p className="text-ink-muted mb-6 leading-relaxed urdu-text">
                      {essay.descriptionUrdu || essay.description}
                    </p>

                    <Link 
                      href={`/writing/${essay.slug}`}
                      className="view-link urdu-text flex-row-reverse"
                    >
                      <span>پڑھیں</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
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
              <h2 className="text-heading-2 urdu-heading mb-4 text-ink">
                خصوصی سلسلہ
              </h2>
              <p className="large-text urdu-text text-ink-muted">
                جاری کہانی کی تلاش
              </p>
            </motion.div>
            
            <motion.div 
              className="minimal-card"
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3, ease: "easeOut" } 
              }}
            >
              <div className="flex items-start gap-8 flex-row-reverse text-right">
                <div className="flex-shrink-0">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center shadow-sm"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Mic className="w-10 h-10 text-primary" />
                  </motion.div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4 text-caption flex-row-reverse justify-end">
                    <span className="uppercase tracking-wide font-semibold text-primary urdu-text">
                      سلسلہ
                    </span>
                    <span className="text-ink-light">•</span>
                    <span className="text-ink-muted urdu-text">
                      {series.totalEntries} حصے
                    </span>
                    <span className="text-ink-light">•</span>
                    <span className="text-ink-muted urdu-text">
                      اردو
                    </span>
                  </div>
                  
                  <h3 className="text-heading-3 urdu-heading mb-6 text-ink">
                    {series.titleUrdu}
                  </h3>
                  
                  <p className="text-ink-muted mb-8 leading-relaxed max-w-2xl urdu-text">
                    {series.descriptionUrdu}
                  </p>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link 
                      href="/ur/bonn-ka-banjara"
                      className="btn btn-primary group"
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
      <section className="py-24 bg-surface-muted">
        <div className="container">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-right"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-heading-2 urdu-heading mb-8 text-ink">
              آئیے جڑتے ہیں
            </h2>
            <p className="large-text mb-12 urdu-text text-ink-muted">
              تعاون، تقاریر، یا صرف کہانیوں کے بارے میں بات کرنے میں دلچسپی ہے؟ میں آپ سے سننا پسند کروں گا۔
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center sm:flex-row-reverse"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link 
                href="/contact"
                className="btn btn-primary group"
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