'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const quickLinks = [
    { name: 'کام', href: '/work' },
    { name: 'کتابیں', href: '/books' },
    { name: 'تحریریں', href: '/writing' },
    { name: 'تعارف', href: '/about' },
    { name: 'پریس کٹ', href: '/press-kit' }
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
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
            <Link 
              href="/" 
              className="text-3xl font-bold mb-6 block text-ink hover:text-primary transition-colors focus-ring rounded urdu-heading"
            >
              عبدالباسط ظفر
            </Link>
            
            <p className="text-gray-600 mb-8 max-w-md leading-relaxed urdu-text text-right">
              لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان کہانیوں کے ذریعے پل بناتا ہے جو زبانوں اور سرحدوں کے پار دنیاوں کو جوڑتی ہیں۔
            </p>

            {/* Social Links - RTL Layout */}
            <div className="flex items-center gap-4 flex-row-reverse justify-end">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-primary-200 hover:text-primary transition-all duration-200 focus-ring"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
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
            <h3 className="text-heading-4 urdu-heading mb-8 text-ink">
              نیویگیشن
            </h3>
            <nav className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block text-gray-600 hover:text-primary transition-colors focus-ring rounded urdu-text"
                  >
                    {link.name}
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
            <h3 className="text-heading-4 urdu-heading mb-8 text-ink">
              اپڈیٹ رہیں
            </h3>
            <p className="text-gray-600 mb-6 urdu-text leading-relaxed">
              نئی کتابوں، مضامین، اور تقاریر کی اطلاع کے لیے نیوز لیٹر سبسکرائب کریں۔
            </p>
            <div className="flex gap-3 flex-row-reverse">
              <input
                type="email"
                placeholder="آپ کا ای میل"
                className="input flex-1 text-sm text-right urdu-text"
                dir="rtl"
              />
              <button className="btn btn-primary text-sm px-6 urdu-text">
                سبسکرائب
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section - RTL Layout */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-200 text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:flex-row-reverse">
            <div className="flex flex-col items-center space-y-4 text-center">
              <p className="text-ink-muted text-sm urdu-text">
                © {new Date().getFullYear()} عبدالباسط ظفر۔ تمام حقوق محفوظ ہیں۔
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <Link
                  href="/sitemap.xml" 
                  className="hover:text-primary transition-colors focus-ring rounded"
                >
                  Sitemap
                </Link>
                <span>•</span>
                <div className="flex items-center gap-1 urdu-text">
                  <span>جرمنی میں محبت سے بنایا گیا</span>
                  <Heart className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}