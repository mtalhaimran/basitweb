import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AudioBlock } from '@/components/AudioBlock';
import Image from 'next/image';
import { MapPin, Languages, Award, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'تعارف - عبدالباسط ظفر',
  description: 'عبدالباسط ظفر کے بارے میں جانیں - لکھاری، کہانی گو، اور ثقافتوں کے درمیان پل۔',
  openGraph: {
    title: 'تعارف - عبدالباسط ظفر',
    description: 'عبدالباسط ظفر کے بارے میں جانیں - لکھاری، کہانی گو، اور ثقافتوں کے درمیان پل۔',
    locale: 'ur_PK'
  }
};

export default function UrduAboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header lang="ur" />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl mb-6">
                  <Image
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500"
                    alt="عبدالباسط ظفر"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                
                {/* Quick Stats */}
                <div className="space-y-4 text-right">
                  <div className="flex items-center space-x-3 flex-row-reverse space-x-reverse">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-urdu-body">بن، جرمنی</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 flex-row-reverse space-x-reverse">
                    <Languages className="w-5 h-5 text-primary" />
                    <span className="font-urdu-body">اردو، انگریزی، جرمن</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 flex-row-reverse space-x-reverse">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="font-urdu-body">3 کتابیں شائع</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="lg:col-span-2 text-right">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-urdu-heading">تعارف</h1>
                <p className="text-xl text-muted-foreground leading-relaxed font-urdu-body">
                  لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان تعلق کو دریافت کرتا ہے۔
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-right">
                <div className="font-urdu-body leading-relaxed space-y-6">
                  <p>
                    عبدالباسط ظفر ایک دو زبانی لکھاری ہے جس کا کام ڈیجیٹل اور ادبی دنیاوں کو جوڑتا ہے۔ 
                    پاکستان میں پیدا ہوا اور اب جرمنی میں مقیم، اس کی تحریریں ہجرت، ٹیکنالوجی، 
                    اور ثقافتی شناخت کے موضوعات کو دریافت کرتی ہیں۔
                  </p>

                  <p>
                    ان کا پہلا ناول "یادوں کے سائے" جدید پاکستان میں مہاجر تجربے کی نفیس تصویر کشی 
                    کے لیے تنقیدی پذیرائی حاصل کر چکا ہے۔ ان کے مضامین ٹیک جرنلز سے لے کر ادبی 
                    رسائل تک مختلف اشاعات میں شائع ہوئے ہیں۔
                  </p>

                  <AudioBlock 
                    src="/audio/about-intro-urdu.mp3"
                    transcript="السلام علیکم، میں عبدالباسط ہوں۔ میں ایسی کہانیاں لکھتا ہوں جو دنیاوں کے درمیان رہتی ہیں - زبانوں، ثقافتوں، اور ان ڈیجیٹل جگہوں کے درمیان جو ہم سب کو جوڑتی ہیں۔"
                    title="تعارف - آڈیو"
                    lang="ur"
                  />

                  <p>
                    اردو اور انگریزی دونوں میں لکھتے ہوئے، عبدالباسط کثیر لسانی کہانی گوئی کی 
                    بھرپوری کو محفوظ اور منانے کی کوشش کرتا ہے۔ ان کا اردو سلسلہ "بن کا بنجارہ" 
                    جرمنی میں ایک آوارہ کے تجربات کو بیان کرتا ہے۔
                  </p>

                  <div className="bg-muted/50 rounded-xl p-6 my-8">
                    <h2 className="text-2xl font-bold mb-4 font-urdu-heading flex items-center space-x-2 flex-row-reverse space-x-reverse">
                      <Award className="w-6 h-6 text-primary" />
                      <span>اعزازات</span>
                    </h2>
                    <ul className="space-y-2 font-urdu-body">
                      <li>• بین الاقوامی ادبی انعام کے لیے شارٹ لسٹ (2023)</li>
                      <li>• "30 انڈر 30" لکھاریوں میں شامل</li>
                      <li>• ڈیجیٹل کہانی گوئی انوویشن گرانٹ کے وصول کنندہ</li>
                    </ul>
                  </div>

                  <h2 className="text-2xl font-bold mb-4 font-urdu-heading">تقاریر اور کمیونٹی</h2>
                  <p>
                    عبدالباسط باقاعدگی سے کانفرنسوں میں ٹیکنالوجی اور کہانی گوئی کے درمیان تعلق 
                    کے بارے میں بات کرتا ہے۔ وہ کہانی کی طاقت میں یقین رکھتا ہے کہ یہ ثقافتی 
                    تقسیم کو ختم کر سکتی ہے اور ہماری بڑھتی ہوئی جڑی دنیا میں تفہیم پیدا کر سکتی ہے۔
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer lang="ur" />
    </div>
  );
}