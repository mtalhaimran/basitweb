'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  
  const quickLinks = [
    { name: 'کام', href: '/work' },
    { name: 'کتابیں', href: '/books' },
    { name: 'تحریریں', href: '/writing' },
    { name: 'تعارف', href: '/about' },
    { name: 'رابطہ', href: '/contact' }
  ];

  const socialLinks = [
    { 
      name: 'ٹویٹر', 
      href: 'https://twitter.com/abdulbasitzafar', 
      icon: Twitter,
      label: 'ٹویٹر پر فالو کریں'
    },
    { 
      name: 'لنکڈان', 
      href: 'https://linkedin.com/in/abdulbasitzafar', 
      icon: Linkedin,
      label: 'لنکڈان پر جڑیں'
    },
    { 
      name: 'ای میل', 
      href: 'mailto:hello@abdulbasitzafar.com', 
      icon: Mail,
      label: 'ای میل بھیجیں'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <footer className="bg-surface-muted border-t border-line" data-pagefind-ignore>
      <div className="container py-20">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section - RTL Aligned */}
          <motion.div 
            className="md:col-span-5 md:col-start-8 text-right"
            variants={itemVariants}
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                href="/" 
                className="text-3xl font-bold mb-6 block text-ink hover:text-brand transition-colors focus-ring rounded urdu-heading inline-block"
              >
                عبدالباسط ظفر
              </Link>
            </motion.div>
            
            <p className="text-ink-muted mb-8 max-w-md leading-relaxed urdu-text text-right font-urdu-body">
              لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان کہانیوں کے ذریعے پل بناتا ہے جو زبانوں اور سرحدوں کے پار دنیاوں کو جوڑتی ہیں۔
            </p>

            {/* Social Links - RTL Layout */}
            <div className="flex items-center gap-4 flex-row-reverse justify-end">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={social.name}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white border border-line rounded-2xl hover:bg-surface-muted hover:border-brand hover:text-brand transition-all duration-200 focus-ring group"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links - RTL Aligned */}
          <motion.div 
            className="md:col-span-3 md:col-start-5 text-right"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-8 text-ink font-urdu-heading">
              نیویگیشن
            </h3>
            <nav className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                  whileHover={shouldReduceMotion ? {} : { x: -8 }}
                >
                  <Link
                    href={link.href}
                    className="block text-ink-muted hover:text-brand transition-colors focus-ring rounded urdu-text relative group"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <motion.div
                      className="absolute bottom-0 right-0 left-0 h-0.5 bg-brand origin-right"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Newsletter Section - RTL Aligned */}
          <motion.div 
            className="md:col-span-4 md:col-start-1 text-right"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-8 text-ink font-urdu-heading">
              اپڈیٹ رہیں
            </h3>
            <p className="text-ink-muted mb-6 urdu-text leading-relaxed font-urdu-body">
              نئی کتابوں، مضامین، اور تقاریر کی اطلاع کے لیے نیوز لیٹر سبسکرائب کریں۔
            </p>
            <motion.div 
              className="flex gap-3 flex-row-reverse"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="email"
                placeholder="آپ کا ای میل"
                className="flex-1 px-4 py-3 text-sm text-right urdu-text bg-white border border-line rounded-xl focus:border-brand focus:ring-2 focus:ring-red-100 transition-all"
                dir="rtl"
              />
              <motion.button 
                className="px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-sm hover:shadow-md urdu-text"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                سبسکرائب
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Section - RTL Layout */}
        <motion.div 
          className="mt-16 pt-8 border-t border-line text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:flex-row-reverse">
            <div className="flex flex-col items-center space-y-4 text-center">
              <p className="text-ink-muted text-sm urdu-text">
                © {new Date().getFullYear()} عبدالباسط ظفر۔ تمام حقوق محفوظ ہیں۔
              </p>
              
              <div className="flex items-center gap-6 text-sm text-ink-muted">
                <Link
                  href="/sitemap.xml" 
                  className="hover:text-brand transition-colors focus-ring rounded"
                >
                  Sitemap
                </Link>
                <span>•</span>
                <motion.div 
                  className="flex items-center gap-1 urdu-text"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                >
                  <span>جرمنی میں محبت سے بنایا گیا</span>
                  <motion.div
                    animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart className="w-4 h-4 text-brand" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}