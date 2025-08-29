import Link from 'next/link';
import { NewsletterForm } from './NewsletterForm';

interface FooterProps {
  lang?: 'en' | 'ur';
}

export function Footer({ lang = 'en' }: FooterProps) {
  const isUrdu = lang === 'ur';
  
  return (
    <footer className="border-t bg-muted/50" data-pagefind-ignore>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className={isUrdu ? 'text-right' : ''}>
            <h3 className={`text-lg font-semibold mb-4 ${isUrdu ? 'urdu-heading' : ''}`}>
              {isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
            </h3>
            <p className={`text-muted-foreground text-sm leading-relaxed ${isUrdu ? 'urdu-text' : ''}`}>
              {isUrdu 
                ? 'ایک لکھاری اور کہانی گو جو ٹیکنالوجی اور ثقافت کے درمیان پلوں کا کام کرتا ہے۔'
                : 'A writer and storyteller bridging technology and culture, exploring identity in our connected world.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div className={isUrdu ? 'text-right' : ''}>
            <h3 className={`text-lg font-semibold mb-4 ${isUrdu ? 'urdu-heading' : ''}`}>
              {isUrdu ? 'فہرست' : 'Quick Links'}
            </h3>
            <nav className="space-y-2">
              {[
                { name: isUrdu ? 'کتابیں' : 'Books', href: isUrdu ? '/ur/books' : '/books' },
                { name: isUrdu ? 'تحریریں' : 'Writing', href: isUrdu ? '/ur/writing' : '/writing' },
                { name: isUrdu ? 'پریس کٹ' : 'Press Kit', href: isUrdu ? '/ur/press-kit' : '/press-kit' },
                { name: isUrdu ? 'کمیونٹی' : 'Community', href: isUrdu ? '/ur/community' : '/community' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-sm text-muted-foreground hover:text-foreground transition-colors ${
                    isUrdu ? 'urdu-text' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter Section */}
          <div className={isUrdu ? 'text-right' : ''}>
            <h3 className={`text-lg font-semibold mb-4 ${isUrdu ? 'urdu-heading' : ''}`}>
              {isUrdu ? 'خبرنامہ' : 'Newsletter'}
            </h3>
            <p className={`text-sm text-muted-foreground mb-4 ${isUrdu ? 'urdu-text' : ''}`}>
              {isUrdu 
                ? 'نئی کہانیوں اور خیالات کے لیے سائن اپ کریں۔'
                : 'Stay updated with new stories and thoughts.'
              }
            </p>
            <NewsletterForm lang={lang} />
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t text-center ${isUrdu ? 'urdu-text' : ''}`}>
          <p className="text-sm text-muted-foreground">
            {isUrdu 
              ? `© ${new Date().getFullYear()} عبدالباسط ظفر۔ تمام حقوق محفوظ ہیں۔`
              : `© ${new Date().getFullYear()} Abdul Basit Zafar. All rights reserved.`
            }
          </p>
        </div>
      </div>
    </footer>
  );
}