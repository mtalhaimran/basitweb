'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface TemplateTestimonialProps {
  lang?: 'ur' | 'en';
}

export function TemplateTestimonial({ lang = 'ur' }: TemplateTestimonialProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isUrdu = lang === 'ur';

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const testimonial = {
    text: isUrdu 
      ? '"عبدالباسط کے ساتھ کام کرنا ہمارے برانڈ کے لیے ایک گیم چینجر تھا۔ انہوں نے صرف ایک حکمت عملی فراہم نہیں کی - انہوں نے ہمارے کاروبار کی روح کو دریافت کیا اور اسے ایک طاقتور کہانی میں تبدیل کیا جو ہمارے سامعین کے ساتھ گونجتی ہے۔"'
      : '"Working with Abdul Basit was a game-changer for our brand. He didn\'t just deliver a strategy — he uncovered the soul of our business and translated it into a powerful narrative that resonates with our audience."',
    author: isUrdu ? 'لینا ٹورس' : 'Lena Torres',
    company: isUrdu ? 'ایمبر سکن کیئر کی بانی' : 'Founder of Ember Skincare'
  };

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 150 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="py-24 bg-surface">
      <div className="container">
        <div className="template-grid">
          {/* Left Column */}
          <motion.div 
            className="col-span-1 text-right"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="template-heading mb-10 urdu-heading"
              variants={itemVariants}
            >
              {isUrdu ? 'وہ کیا کہتے ہیں' : 'WHAT THEY SAID'}
            </motion.h2>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="col-span-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex gap-20 flex-row-reverse items-center">
              {/* Testimonial */}
              <motion.div 
                className="flex-1"
                variants={itemVariants}
              >
                <blockquote className="template-subheading urdu-text mb-8 leading-relaxed">
                  {testimonial.text}
                </blockquote>
                
                <div className="text-right">
                  <p className="template-body urdu-text font-medium mb-1">
                    {testimonial.author}
                  </p>
                  <p className="template-caption urdu-text">
                    {testimonial.company}
                  </p>
                </div>
              </motion.div>

              {/* Portrait */}
              <motion.div 
                className="flex-1 max-w-sm"
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop"
                    alt={isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 300px, 400px"
                    unoptimized
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}