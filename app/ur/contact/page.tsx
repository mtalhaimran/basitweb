import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, Twitter, Linkedin, MapPin, MessageCircle, Mic, Users } from 'lucide-react';

export const metadata = {
  title: 'رابطہ - عبدالباسط ظفر',
  description: 'تعاون، تقاریر، یا ادبی بحث کے لیے عبدالباسط ظفر سے رابطہ کریں۔',
  openGraph: {
    title: 'رابطہ - عبدالباسط ظفر',
    description: 'تعاون، تقاریر، یا ادبی بحث کے لیے عبدالباسط ظفر سے رابطہ کریں۔',
    locale: 'ur_PK'
  }
};

export default function UrduContactPage() {
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
    <div className="min-h-screen flex flex-col">
      <Header lang="ur" />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12 text-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-urdu-heading">رابطہ</h1>
            <p className="text-xl text-muted-foreground max-w-3xl ml-auto font-urdu-body leading-relaxed">
              تعاون، تقاریر، یا ادبی بحث میں دلچسپی ہے؟ میں آپ سے سننا پسند کروں گا۔
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8 text-right">
              <div>
                <h2 className="text-2xl font-semibold mb-6 font-urdu-heading">رابطے کی معلومات</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 flex-row-reverse space-x-reverse">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 font-urdu-heading">ای میل</h3>
                      <a 
                        href="mailto:hello@abdulbasitzafar.com"
                        className="text-primary hover:underline font-urdu-body focus-ring rounded"
                      >
                        hello@abdulbasitzafar.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 flex-row-reverse space-x-reverse">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 font-urdu-heading">مقام</h3>
                      <span className="text-muted-foreground font-urdu-body">بن، جرمنی</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 font-urdu-heading">سوشل میڈیا</h3>
                <div className="space-y-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent transition-colors focus-ring flex-row-reverse space-x-reverse"
                      >
                        <Icon className="w-5 h-5 text-primary" />
                        <div className="text-right">
                          <h4 className="font-semibold font-urdu-heading">{social.name}</h4>
                          <p className="text-sm text-muted-foreground font-urdu-body">{social.description}</p>
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
                <h2 className="text-2xl font-semibold mb-6 font-urdu-heading">میں کیا تلاش کر رہا ہوں</h2>
                
                <div className="space-y-6">
                  {collaborationTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div key={type.title} className="p-6 border rounded-xl hover:bg-accent/50 transition-colors">
                        <div className="flex items-start space-x-4 flex-row-reverse space-x-reverse">
                          <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="text-right">
                            <h3 className="font-semibold mb-2 font-urdu-heading text-lg">{type.title}</h3>
                            <p className="text-sm text-muted-foreground font-urdu-body leading-relaxed">
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
          <div className="mt-16 p-8 bg-muted/50 rounded-xl text-right">
            <h3 className="text-lg font-semibold mb-4 font-urdu-heading">جواب کا وقت</h3>
            <p className="text-sm text-muted-foreground font-urdu-body leading-relaxed">
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