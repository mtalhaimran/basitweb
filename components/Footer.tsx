import Link from 'next/link';
import { NewsletterForm } from './NewsletterForm';
import { Twitter, Linkedin, Mail, Globe, Heart, FileText, Download } from 'lucide-react';

interface FooterProps {
  lang?: 'en' | 'ur';
}

export function Footer({ lang = 'en' }: FooterProps) {
  const isUrdu = lang === 'ur';
  
  const quickLinks = isUrdu ? [
    { name: 'کام', href: '/ur/work' },
    { name: 'کتابیں', href: '/ur/books' },
    { name: 'تحریریں', href: '/ur/writing' },
    { name: 'بن کا بنجارہ', href: '/ur/bonn-ka-banjara' },
    { name: 'تعارف', href: '/ur/about' }
  ] : [
    { name: 'Work', href: '/work' },
    { name: 'Books', href: '/books' },
    { name: 'Writing', href: '/writing' },
    { name: 'About', href: '/about' },
    { name: 'Press Kit', href: '/press-kit' }
  ];

  const resourceLinks = isUrdu ? [
    { name: 'پریس کٹ', href: '/press-kit', icon: Download },
    { name: 'رابطہ', href: '/ur/contact', icon: Mail },
    { name: 'کمیونٹی', href: '/community', icon: FileText }
  ] : [
    { name: 'Press Kit', href: '/press-kit', icon: Download },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'Community', href: '/community', icon: FileText }
  ];

  const socialLinks = [
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/abdulbasitzafar', 
      icon: Twitter,
      label: isUrdu ? 'ٹویٹر پر فالو کریں' : 'Follow on Twitter'
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/in/abdulbasitzafar', 
      icon: Linkedin,
      label: isUrdu ? 'لنکڈان پر جڑیں' : 'Connect on LinkedIn'
    },
    { 
      name: 'Email', 
      href: 'mailto:hello@abdulbasitzafar.com', 
      icon: Mail,
      label: isUrdu ? 'ای میل بھیجیں' : 'Send email'
    }
  ];
  
  return (
    <footer className="border-t border-line bg-surface" data-pagefind-ignore>
      <div className="container py-16">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-12 ${isUrdu ? 'text-right' : ''}`}>
          {/* Brand Section */}
          <div className="md:col-span-5">
            <Link 
              href={isUrdu ? '/ur' : '/'} 
              className={`text-2xl font-bold mb-4 block hover:text-brand transition-colors focus-ring rounded ${
                isUrdu ? 'urdu-heading-2' : 'text-heading-2'
              }`}
            >
              {isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
            </Link>
            
            <p className={`text-ink-muted mb-6 max-w-md ${
              isUrdu ? 'urdu-body' : 'text-body'
            }`}>
              {isUrdu 
                ? 'ایک لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان پلوں کا کام کرتا ہے۔'
                : 'A writer and storyteller bridging technology, culture, and human experience through narrative that connects worlds.'
              }
            </p>

            {/* Social Links */}
            <div className={`flex items-center space-x-3 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-subtle border border-line rounded-lg hover:bg-surface-elevated hover:border-brand/30 hover:text-brand transition-all duration-200 focus-ring"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className={`text-lg font-semibold mb-6 ${
              isUrdu ? 'urdu-heading-3' : 'text-heading-3'
            }`}>
              {isUrdu ? 'فہرست' : 'Navigation'}
            </h3>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block link-subtle hover:text-brand transition-colors focus-ring rounded text-sm ${
                    isUrdu ? 'urdu-body-sm' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="md:col-span-4">
            <h3 className={`text-lg font-semibold mb-6 ${
              isUrdu ? 'urdu-heading-3' : 'text-heading-3'
            }`}>
              {isUrdu ? 'وسائل' : 'Resources'}
            </h3>
            
            <div className="space-y-3 mb-6">
              {resourceLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-2 link-subtle hover:text-brand transition-colors focus-ring rounded text-sm ${
                      isUrdu ? 'flex-row-reverse space-x-reverse urdu-body-sm' : ''
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Newsletter CTA */}
            <div className="bg-subtle border border-line rounded-lg p-4">
              <h4 className={`text-sm font-semibold mb-2 ${
                isUrdu ? 'urdu-heading-3 text-right' : ''
              }`}>
                {isUrdu ? 'خبرنامہ' : 'Newsletter'}
              </h4>
              <p className={`text-caption mb-3 ${isUrdu ? 'urdu-body-sm text-right' : ''}`}>
                {isUrdu 
                  ? 'نئی کہانیوں کے لیے سائن اپ کریں۔'
                  : 'Get updates on new stories.'
                }
              </p>
              <NewsletterForm compact lang={lang} />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`mt-12 pt-8 border-t border-line ${isUrdu ? 'text-right' : ''}`}>
          <div className={`flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 ${
            isUrdu ? 'md:flex-row-reverse' : ''
          }`}>
            <p className={`text-caption ${isUrdu ? 'urdu-body-sm' : ''}`}>
              {isUrdu 
                ? `© ${new Date().getFullYear()} عبدالباسط ظفر۔ تمام حقوق محفوظ ہیں۔`
                : `© ${new Date().getFullYear()} Abdul Basit Zafar. All rights reserved.`
              }
            </p>
            
            <div className={`flex items-center space-x-4 text-caption ${
              isUrdu ? 'flex-row-reverse space-x-reverse urdu-body-sm' : ''
            }`}>
              <Link 
                href="/sitemap.xml" 
                className="link-subtle hover:text-brand transition-colors focus-ring rounded"
              >
                {isUrdu ? 'سائٹ میپ' : 'Sitemap'}
              </Link>
              <span>•</span>
              <div className={`flex items-center space-x-1 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <span>{isUrdu ? 'سے بنایا گیا' : 'Made with'}</span>
                <Heart className="w-3 h-3 text-brand" />
                <span>{isUrdu ? 'جرمنی میں' : 'in Germany'}</span>
              </div>
              <span>•</span>
              <Link
                href={isUrdu ? '/' : '/ur'}
                className="link-subtle hover:text-brand transition-colors focus-ring rounded"
                hrefLang={isUrdu ? 'en' : 'ur'}
              >
                <Globe className="w-3 h-3 inline mr-1" />
                {isUrdu ? 'English' : 'اردو'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}