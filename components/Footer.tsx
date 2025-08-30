'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  
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
    <footer className="bg-surface border-t border-line" data-pagefind-ignore>
      <div className="container py-20">
        {/* Logo Section */}
        <motion.div 
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <div className="w-32 h-6 mx-auto mb-8 bg-brand rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-wider">EXPOSA</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Content */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:flex-row-reverse"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Email */}
          <motion.div variants={itemVariants}>
            <Link
              href="mailto:hello@abdulbasitzafar.com"
              className="template-link urdu-text"
            >
              hello@abdulbasitzafar.com
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex items-center gap-6"
            variants={itemVariants}
          >
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
                    className="template-link"
                    aria-label={social.label}
                  >
                    <span className="urdu-text text-sm">{social.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Copyright */}
          <motion.div variants={itemVariants}>
            <p className="template-caption urdu-text">
              © {new Intl.DateTimeFormat('ur-PK', {
                timeZone: 'UTC',
                year: 'numeric'
              }).format(new Date())} عبدالباسط ظفر۔
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}