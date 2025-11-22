'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Mail, Book, FileText, MapPin, User, Phone } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  
  const sitemapLinks = [
    { name: 'کتابیں', href: '/books', icon: Book },
    { name: 'مضامین', href: '/snippets', icon: FileText },
    { name: 'بون کا بنجارہ', href: '/bonn-ka-banjara', icon: MapPin },
    { name: 'میرے بارے میں', href: '/about', icon: User },
    { name: 'رابطہ', href: '/contact', icon: Phone },
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
    <footer className="bg-surface border-t border-line mt-24" data-pagefind-ignore>
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Sitemap Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold urdu-heading mb-4">سائٹ میپ</h3>
            <nav className="flex flex-col space-y-3">
              {sitemapLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="template-link flex items-center gap-3 hover:text-brand transition-colors"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="urdu-text">{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>

          {/* Social Links Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold urdu-heading mb-4">سوشل میڈیا</h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={social.name}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05, x: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="template-link flex items-center gap-3 hover:text-brand transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="urdu-text">{social.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold urdu-heading mb-4">رابطہ</h3>
            <Link
              href="mailto:hello@abdulbasitzafar.com"
              className="template-link flex items-center gap-3 hover:text-brand transition-colors"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm break-all">hello@abdulbasitzafar.com</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-8 border-t border-line text-center"
        >
          <p className="template-caption urdu-text">
            © {new Intl.DateTimeFormat('ur-PK', {
              timeZone: 'UTC',
              year: 'numeric'
            }).format(new Date())} عبدالباسط ظفر۔
          </p>
        </motion.div>
      </div>
    </footer>
  );
}