import Link from 'next/link';
import { NewsletterForm } from './NewsletterForm';
import { Twitter, Linkedin, Mail, Globe, Heart } from 'lucide-react';

interface FooterProps {
  lang?: 'en' | 'ur';
}

export function Footer({ lang = 'en' }: FooterProps) {
  const isUrdu = lang === 'ur';
  
  const quickLinks = isUrdu ? [
    { name: 'کتابیں', href: '/ur/books' },
    { name: 'تحریریں', href: '/ur/writing' },
    { name: 'بن کا بنجارہ', href: '/ur/bonn-ka-banjara' },
    { name: 'تعارف', href: '/ur/about' },
    { name: 'رابطہ', href: '/ur/contact' }
  ] : [
    { name: 'Books', href: '/books' },
    { name: 'Writing', href: '/writing' },
    { name: 'About', href: '/about' },
    { name: 'Press Kit', href: '/press-kit' },
    { name: 'Contact', href: '/contact' }
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
    <footer className="border-t bg-muted/30" data-pagefind-ignore>
      <div className="container mx-auto px-4 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-12 ${isUrdu ? 'text-right' : ''}`}>
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link 
              href={isUrdu ? '/ur' : '/'} 
              className={`text-2xl font-bold mb-4 block hover:text-primary transition-colors focus-ring rounded ${
                isUrdu ? 'font-urdu-heading' : ''
              }`}
            >
              {isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
            </Link>
            <p className={`text-muted-foreground leading-relaxed mb-6 max-w-md ${
              isUrdu ? 'font-urdu-body' : ''
            }`}>
              {isUrdu 
                ? 'ایک لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان پلوں کا کام کرتا ہے۔ کہانیاں جو دنیاوں کو جوڑتی ہیں۔'
                : 'A writer and storyteller bridging technology, culture, and human experience. Stories that connect worlds, exploring identity in our interconnected age.'
              }
            </p>

            {/* Social Links */}
            <div className={`flex items-center space-x-4 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background border rounded-lg hover:bg-accent hover:border-primary/30 transition-all duration-200 focus-ring"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-6 ${isUrdu ? 'font-urdu-heading' : ''}`}>
              {isUrdu ? 'فہرست' : 'Quick Links'}
            </h3>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded ${
                    isUrdu ? 'font-urdu-body' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-6 ${isUrdu ? 'font-urdu-heading' : ''}`}>
              {isUrdu ? 'خبرنامہ' : 'Newsletter'}
            </h3>
            <p className={`text-sm text-muted-foreground mb-4 ${isUrdu ? 'font-urdu-body' : ''}`}>
              {isUrdu 
                ? 'نئی کہانیوں اور خیالات کے لیے سائن اپ کریں۔'
                : 'Stay updated with new stories and thoughts.'
              }
            </p>
            <NewsletterForm lang={lang} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`mt-12 pt-8 border-t ${isUrdu ? 'text-right' : 'text-center'}`}>
          <div className={`flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 ${
            isUrdu ? 'md:flex-row-reverse' : ''
          }`}>
            <p className={`text-sm text-muted-foreground ${isUrdu ? 'font-urdu-body' : ''}`}>
              {isUrdu 
                ? `© ${new Date().getFullYear()} عبدالباسط ظفر۔ تمام حقوق محفوظ ہیں۔`
                : `© ${new Date().getFullYear()} Abdul Basit Zafar. All rights reserved.`
              }
            </p>
            
            <div className={`flex items-center space-x-4 text-xs text-muted-foreground ${
              isUrdu ? 'flex-row-reverse space-x-reverse font-urdu-body' : ''
            }`}>
              <Link href="/sitemap.xml" className="hover:text-foreground transition-colors focus-ring rounded">
                {isUrdu ? 'سائٹ میپ' : 'Sitemap'}
              </Link>
              <span>•</span>
              <div className={`flex items-center space-x-1 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <span>{isUrdu ? 'سے بنایا گیا' : 'Made with'}</span>
                <Heart className="w-3 h-3 text-red-500" />
                <span>{isUrdu ? 'جرمنی میں' : 'in Germany'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}