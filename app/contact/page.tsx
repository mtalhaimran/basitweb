import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, Twitter, Linkedin, MapPin, MessageCircle, Mic, Users } from 'lucide-react';

export const metadata = {
  title: 'رابطہ - عبدالباسط ظفر',
  description: 'تعاون، تقاریر، یا ادبی بحث کے لیے عبدالباسط ظفر سے رابطہ کریں۔',
};

export default function ContactPage() {
  const socialLinks = [
    { 
      name: 'ٹویٹر', 
      href: 'https://twitter.com/abdulbasitzafar', 
      icon: Twitter,
      description: 'روزانہ کے خیالات اور اپڈیٹس'
    },
    { 
      name: 'لنکڈان', 
      href: 'https://linkedin.com/in/abdulbasitzafar', 
      icon: Linkedin,
      description: 'پیشہ ورانہ نیٹ ورکنگ'
    }
  ];

  const collaborationTypes = [
    {
      icon: Mic,
      title: 'تقاریر',
      description: 'کانفرنسز، ورکشاپس، اور کہانی گوئی، ٹیکنالوجی، اور بین الثقافتی رابطے پر تقریبات۔'
    },
    {
      icon: Users,
      title: 'ادبی تعاون',
      description: 'ترجمے کے منصوبے، مجموعی تعاونات، اور مشترکہ تحریری مواقع۔'
    },
    {
      icon: MessageCircle,
      title: 'میڈیا اور انٹرویوز',
      description: 'پوڈکاسٹ میں شرکت، انٹرویوز، اور تحریر اور ثقافت کے بارے میں بحث۔'
    }
  ];

  return (
    <div className="min-h-screen" lang="ur" dir="rtl">
      <Header lang="ur" />
      <main id="main-content" className="pt-32 pb-20" data-pagefind-body>
        <div className="container">
          <div className="text-center mb-20">
            <h1 className="text-display urdu-display mb-8">رابطہ</h1>
            <p className="large-text urdu-text text-gray-600 max-w-3xl mx-auto">
              تعاون، تقاریر، یا ادبی بحث میں دلچسپی ہے؟ میں آپ سے سننا پسند کروں گا۔
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8 text-right">
              <div>
                <h2 className="text-heading-2 urdu-heading mb-8">رابطے کی معلومات</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 space-x-reverse justify-end">
                    <div className="p-4 bg-red-100 rounded-2xl">
                      <Mail className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-heading-4 urdu-heading mb-2">ای میل</h3>
                      <a 
                        href="mailto:hello@abdulbasitzafar.com"
                        className="link urdu-text focus-ring rounded"
                      >
                        hello@abdulbasitzafar.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 space-x-reverse justify-end">
                    <div className="p-4 bg-red-100 rounded-2xl">
                      <MapPin className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-heading-4 urdu-heading mb-2">مقام</h3>
                      <span className="urdu-text text-gray-600">بن، جرمنی</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-heading-3 urdu-heading mb-6">سوشل میڈیا</h3>
                <div className="space-y-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="minimal-card flex items-center space-x-4 space-x-reverse justify-end focus-ring"
                      >
                        <Icon className="w-6 h-6 text-red-600" />
                        <div className="text-right">
                          <h4 className="text-heading-4 urdu-heading">{social.name}</h4>
                          <p className="text-caption urdu-text">{social.description}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Collaboration Types */}
            <div className="space-y-8">
              <div className="text-right">
                <h2 className="text-heading-2 urdu-heading mb-8">میں کیا تلاش کر رہا ہوں</h2>
                
                <div className="space-y-6">
                  {collaborationTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div key={type.title} className="minimal-card">
                        <div className="flex items-start space-x-4 space-x-reverse justify-end">
                          <div className="p-4 bg-red-100 rounded-2xl flex-shrink-0">
                            <Icon className="w-6 h-6 text-red-600" />
                          </div>
                          <div className="text-right">
                            <h3 className="text-heading-4 urdu-heading mb-3">{type.title}</h3>
                            <p className="urdu-text text-gray-600 leading-relaxed">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Response Time Note */}
          <div className="mt-20 minimal-card text-right">
            <h3 className="text-heading-3 urdu-heading mb-4">جواب کا وقت</h3>
            <p className="urdu-text text-gray-600 leading-relaxed">
              میں تمام استفسارات کا جواب 48 گھنٹوں کے اندر دینے کی کوشش کرتا ہوں۔ 
              فوری تقاریر کی درخواستوں یا وقت کے حساس معاملات کے لیے، براہ کرم اپنے موضوع میں اس کا ذکر کریں۔
            </p>
          </div>
        </div>
      </main>
      <Footer lang="ur" />
    </div>
  );
}