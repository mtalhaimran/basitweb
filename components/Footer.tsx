import Link from 'next/link';
import { NewsletterForm } from './NewsletterForm';
import { Twitter, Linkedin, Mail, Heart, Download, FileText } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { name: 'Work', href: '/work' },
    { name: 'Books', href: '/books' },
    { name: 'Writing', href: '/writing' },
    { name: 'About', href: '/about' },
    { name: 'Press Kit', href: '/press-kit' }
  ];

  const resourceLinks = [
    { name: 'Press Kit', href: '/press-kit', icon: Download },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'Community', href: '/community', icon: FileText }
  ];

  const socialLinks = [
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/abdulbasitzafar', 
      icon: Twitter,
      label: 'Follow on Twitter'
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/in/abdulbasitzafar', 
      icon: Linkedin,
      label: 'Connect on LinkedIn'
    },
    { 
      name: 'Email', 
      href: 'mailto:hello@abdulbasitzafar.com', 
      icon: Mail,
      label: 'Send email'
    }
  ];
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200" data-pagefind-ignore>
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-5">
            <Link 
              href="/" 
              className="text-3xl font-black mb-6 block hover:text-red-600 transition-colors focus-ring rounded"
            >
              Abdul Basit Zafar
            </Link>
            
            <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
              A writer and storyteller bridging technology, culture, and human experience through 
              narrative that connects worlds across languages and borders.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 focus-ring"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-heading-4 mb-8">Navigation</h3>
            <nav className="space-y-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block link-subtle hover:text-red-600 transition-colors focus-ring rounded"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-heading-4 mb-8">Stay Updated</h3>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-600 mb-6 text-sm">
                Get updates on new stories, thoughts, and behind-the-scenes glimpses into the writing process.
              </p>
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Abdul Basit Zafar. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <Link 
                href="/sitemap.xml" 
                className="link-subtle hover:text-red-600 transition-colors focus-ring rounded"
              >
                Sitemap
              </Link>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>in Germany</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}