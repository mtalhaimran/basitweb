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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const skills = [
    'Strategy', 'Creative', 'Writing', 'Marketing', 'Branding'
  ];

  const skillsUrdu = [
    'حکمت عملی', 'تخلیقی', 'تحریر', 'مارکیٹنگ', 'برانڈنگ'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
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

  return (
    <section className="hero-section">
      <div className="container">
        <div className="template-grid">
          {/* Left Column - Bio */}
          <motion.div 
            className="col-span-1 text-right"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <h2 className="template-heading mb-10 urdu-heading">
                {isUrdu ? 'اسٹوڈیو' : 'STUDIO'}
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10">
              <p className="template-body urdu-text max-w-sm mr-auto leading-relaxed">
                {isUrdu 
                  ? 'عبدالباسط ظفر ایک لکھاری، برانڈ حکمت عملی ساز، اور تخلیقی ڈائریکٹر ہے جو افراد اور برانڈز کے ساتھ مل کر دلکش کہانی گوئی، مقصدی تخلیقی منصوبہ بندی، اور کمیونٹی پر مبنی ترقی کا کام کرتا ہے۔'
                  : 'Abdul Basit Zafar is a writer, brand strategist, and creative director who collaborates with individuals and brands looking for compelling storytelling, purposeful creative planning, and community-focused development.'
                }
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-2 justify-end"
              variants={itemVariants}
            >
              {(isUrdu ? skillsUrdu : skills).map((skill, index) => (
                <motion.span
                  key={skill}
                  className="skill-badge urdu-text"
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: shouldReduceMotion ? 0 : 0.5, 
                    delay: shouldReduceMotion ? 0 : 0.8 + index * 0.1,
                    type: "spring",
                    bounce: 0.3
                  }}
                  whileHover={shouldReduceMotion ? {} : { 
                    scale: 1.05, 
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Name and Projects */}
          <motion.div 
            className="col-span-2 text-right"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="template-heading mb-10 urdu-heading">
                {isUrdu ? 'پروجیکٹس' : 'PROJECTS'}
              </h2>
              
              {/* Name Reveal */}
              <div className="mb-12">
                <NameRevealUrdu className="text-ink" />
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-6 justify-end flex-row-reverse">
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  <Link 
                    href="/work"
                    className="btn btn-primary group urdu-text"
                  >
                    {isUrdu ? 'میرا کام دیکھیں' : 'View My Work'}
                    <ArrowUpRight className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  <Link 
                    href="/contact"
                    className="btn btn-secondary urdu-text"
                  >
                    {isUrdu ? 'رابطہ کریں' : 'Contact'}
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Featured Projects Grid */}
            <motion.div 
              className="portfolio-grid"
              variants={itemVariants}
            >
              {/* Project cards will be rendered here */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}