'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface TemplateAboutProps {
  lang?: 'ur' | 'en';
}

export function TemplateAbout({ lang = 'ur' }: TemplateAboutProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isUrdu = lang === 'ur';

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const services = [
    'Educational Guides', 'Email Marketing', 'Style Guide', 'Web Redesign',
    'Copywriting', 'Naming', 'Performance Emails', 'Brand Narrative',
    'Messaging', 'First Photoshoot', 'Social Strategy', 'Content Marketing',
    'Brand Strategy', 'Marketing Management', 'Writing', 'Strategy',
    'Brand Positioning', 'Creative Direction'
  ];

  const servicesUrdu = [
    'تعلیمی رہنمائی', 'ای میل مارکیٹنگ', 'اسٹائل گائیڈ', 'ویب ری ڈیزائن',
    'کاپی رائٹنگ', 'نام کاری', 'کارکردگی ای میلز', 'برانڈ کہانی',
    'پیغام رسانی', 'پہلی فوٹو شوٹ', 'سوشل حکمت عملی', 'مواد کی مارکیٹنگ',
    'برانڈ حکمت عملی', 'مارکیٹنگ انتظام', 'تحریر', 'حکمت عملی',
    'برانڈ پوزیشننگ', 'تخلیقی ہدایت'
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
              {isUrdu ? 'میرے بارے میں' : 'ABOUT ME'}
            </motion.h2>
            
            <motion.p 
              className="template-body urdu-text max-w-sm mr-auto leading-relaxed"
              variants={itemVariants}
            >
              {isUrdu 
                ? 'میں نے ڈی ٹی سی کمپنیوں، وینچر فنڈز، اور ملٹی نیشنل کارپوریشنز کے لیے تخلیقی ڈائریکٹر، حکمت عملی ساز، لکھاری، مشیر، اور سرمایہ کار کے طور پر خدمات انجام دیں۔'
                : 'I served as a creative director, strategist, writer, advisor, and investor to DTC companies, venture funds, and multinational corporations.'
              }
            </motion.p>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="col-span-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex gap-10 flex-row-reverse">
              {/* Portrait */}
              <motion.div 
                className="flex-1 max-w-sm"
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                    alt={isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 300px, 400px"
                    unoptimized
                  />
                </div>
                
                {/* Social Handle */}
                <motion.div 
                  className="mt-6 text-right"
                  variants={itemVariants}
                >
                  <p className="template-caption urdu-text">
                    @abdulbasitzafar
                  </p>
                </motion.div>
              </motion.div>

              {/* Services */}
              <motion.div 
                className="flex-1"
                variants={itemVariants}
              >
                <h3 className="template-subheading mb-8 urdu-heading">
                  {isUrdu ? 'میں ان خدمات میں ماہر ہوں...' : 'I am expert to those services...'}
                </h3>
                
                <div className="flex flex-wrap gap-3 justify-end">
                  {(isUrdu ? servicesUrdu : services).slice(0, 12).map((service, index) => (
                    <motion.span
                      key={service}
                      className="skill-badge urdu-text"
                      initial={{ opacity: 0, scale: 0.5, y: 50 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: shouldReduceMotion ? 0 : 0.5, 
                        delay: shouldReduceMotion ? 0 : index * 0.05,
                        type: "spring",
                        bounce: 0.3
                      }}
                      whileHover={shouldReduceMotion ? {} : { 
                        scale: 1.05, 
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {service}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}