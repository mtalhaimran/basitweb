import Link from 'next/link';
import { NewsletterForm } from './NewsletterForm';
import { Twitter, Linkedin, Mail, Heart, Download, FileText } from 'lucide-react';

interface FooterProps {
  lang?: 'en' | 'ur';
}

export function Footer({ lang = 'en' }: FooterProps) {
  const isUrdu = lang === 'ur';

  const quickLinks = isUrdu ? [
    { name: 'کام', href: '/work' },
    { name: 'کتابیں', href: '/books' },
    { name: 'تحریریں', href: '/writing' },
    { name: 'تعارف', href: '/about' },
    { name: 'پریس کٹ', href: '/press-kit' }
  ] : [
    { name: 'Work', href: '/work' },
    { name: 'Books', href: '/books' },
    { name: 'Writing', href: '/writing' },
    { name: 'About', href: '/about' },
    { name: 'Press Kit', href: '/press-kit' }
  ];

  const socialLinks = [
    { 
      name: isUrdu ? 'ٹویٹر' : 'Twitter', 
      href: 'https://twitter.com/abdulbasitzafar', 
      icon: Twitter,
      label: isUrdu ? 'ٹویٹر پر فالو کریں' : 'Follow on Twitter'
    },
    { 
      name: isUrdu ? 'لنکڈان' : 'LinkedIn', 
      href: 'https://linkedin.com/in/abdulbasitzafar', 
      icon: Linkedin,
      label: isUrdu ? 'لنکڈان پر جڑیں' : 'Connect on LinkedIn'
    },
    { 
      name: isUrdu ? 'ای میل' : 'Email', 
      href: 'mailto:hello@abdulbasitzafar.com', 
      icon: Mail,
      label: isUrdu ? 'ای میل بھیجیں' : 'Send email'
    }
  ];
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200" data-pagefind-ignore>
      <div className="container py-20">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-12 ${isUrdu ? 'text-right' : ''}`}>
          {/* Brand Section */}
          <div className={`md:col-span-5 ${isUrdu ? 'md:col-start-8' : ''}`}>
            <Link 
              href="/" 
              className={`text-3xl font-bold mb-6 block hover:text-red-600 transition-colors focus-ring rounded ${
                isUrdu ? 'urdu-heading' : ''
              }`}
            >
              {isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
            </Link>
            
            <p className={`text-gray-600 mb-8 max-w-md leading-relaxed ${isUrdu ? 'urdu-text' : ''}`}>
              {isUrdu 
                ? 'لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان کہانیوں کے ذریعے پل بناتا ہے جو زبانوں اور سرحدوں کے پار دنیاوں کو جوڑتی ہیں۔'
                : 'A writer and storyteller bridging technology, culture, and human experience through narrative that connects worlds across languages and borders.'
              }
            </p>

            {/* Social Links */}
            <div className={`flex items-center gap-4 ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 focus-ring"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className={`md:col-span-3 ${isUrdu ? 'md:col-start-5' : ''}`}>
            <h3 className={`text-heading-4 mb-8 ${isUrdu ? 'urdu-heading' : ''}`}>
              {isUrdu ? 'نیویگیشن' : 'Navigation'}
            </h3>
            <nav className="space-y-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-gray-600 hover:text-red-600 transition-colors focus-ring rounded ${
                    isUrdu ? 'urdu-text' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className={`md:col-span-4 ${isUrdu ? 'md:col-start-1' : ''}`}>
            <h3 className={`text-heading-4 mb-8 ${isUrdu ? 'urdu-heading' : ''}`}>
              {isUrdu ? 'اپڈیٹ رہیں' : 'Stay Updated'}
            </h3>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h4 className={`text-lg font-semibold mb-4 ${isUrdu ? 'urdu-heading' : ''}`}>
                {isUrdu ? 'نیوز لیٹر' : 'Newsletter'}
              </h4>
              <p className={`text-gray-600 mb-6 text-sm ${isUrdu ? 'urdu-text' : ''}`}>
                {isUrdu 
                  ? 'نئی کہانیوں، خیالات، اور تحریری عمل کی پردے کے پیچھے کی جھلکیوں کے ساتھ اپڈیٹ حاصل کریں۔'
                  : 'Get updates on new stories, thoughts, and behind-the-scenes glimpses into the writing process.'
                }
              </p>
              <NewsletterForm compact lang={lang} />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`mt-16 pt-8 border-t border-gray-200 ${isUrdu ? 'text-right' : ''}`}>
          <div className={`flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 ${
            isUrdu ? 'md:flex-row-reverse' : ''
          }`}>
            <p className={`text-gray-500 text-sm ${isUrdu ? 'urdu-text' : ''}`}>
              © {new Date().getFullYear()} {isUrdu ? 'عبدالباسط ظفر۔ تمام حقوق محفوظ ہیں۔' : 'Abdul Basit Zafar. All rights reserved.'}
            </p>
            
            <div className={`flex items-center gap-6 text-sm text-gray-500 ${
              isUrdu ? 'flex-row-reverse' : ''
            }`}>
              <Link 
                href="/sitemap.xml" 
                className="hover:text-red-600 transition-colors focus-ring rounded"
              >
                Sitemap
              </Link>
              <span>•</span>
              <div className={`flex items-center gap-1 ${isUrdu ? 'flex-row-reverse urdu-text' : ''}`}>
                <span>{isUrdu ? 'جرمنی میں محبت سے بنایا گیا' : 'Made with'}</span>
                {!isUrdu && <Heart className="w-4 h-4 text-red-500" />}
                {!isUrdu && <span>in Germany</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}