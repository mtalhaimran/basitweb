import Link from 'next/link';
import { Twitter, Linkedin, Mail, Heart, Download, FileText } from 'lucide-react';

interface FooterProps {
  lang?: 'en' | 'ur';
}
export function Footer() { // Removed lang prop as site is now primarily Urdu
  const isUrdu = true; // Always Urdu
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
    <footer className="bg-surface-muted border-t border-line" data-pagefind-ignore> {/* Use new surface-muted and line colors */}
      <div className="container py-20">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-12 ${isUrdu ? 'text-right' : ''}`}>
          {/* Brand Section */}
          <div className={`md:col-span-5 ${isUrdu ? 'md:col-start-8' : ''}`}>
            <Link 
              href="/" 
              className={`text-3xl font-bold mb-6 block text-ink hover:text-primary transition-colors focus-ring rounded ${ // Use new ink/primary colors
                isUrdu ? 'urdu-heading' : ''
              }`}
            >
              {isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
            </Link>
            
            <p className={`text-gray-600 mb-8 max-w-md leading-relaxed ${isUrdu ? 'urdu-text' : ''}`}>
              {isUrdu // Always Urdu
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
            </h3> {/* Always Urdu */}
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
        </div>

        {/* Bottom Section */}
        <div className={`mt-16 pt-8 border-t border-gray-200 ${isUrdu ? 'text-right' : ''}`}>
          <div className={`flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 ${
            isUrdu ? 'md:flex-row-reverse' : ''
          <div className="flex flex-col items-center space-y-4">
            <p className={`text-ink-muted text-sm urdu-text`}> {/* Use new ink-muted */}
              © {new Date().getFullYear()} عبدالباسط ظفر۔ تمام حقوق محفوظ ہیں۔
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              isUrdu ? 'flex-row-reverse' : ''
            }`}>
              <Link // Keep sitemap link
                href="/sitemap.xml" 
                className="hover:text-red-600 transition-colors focus-ring rounded"
              >
                Sitemap
              </Link>
              <span>•</span>
              <div className="flex items-center gap-1 urdu-text">
                <span>جرمنی میں محبت سے بنایا گیا</span> {/* Always Urdu */}
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