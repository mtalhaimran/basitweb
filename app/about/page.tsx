import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AudioBlock } from '@/components/AudioBlock';
import Image from 'next/image';
import { MapPin, Award, BookOpen, Users, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'تعارف - عبدالباسط ظفر',
  description: 'عبدالباسط ظفر کے بارے میں جانیں - لکھاری، کہانی گو، اور ثقافتوں کے درمیان پل۔',
};

export default function AboutPage() {
  return ( // Removed lang/dir as it's now in root layout
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-32 pb-20" data-pagefind-body>
        <div className="container">
          <div className="text-center mb-20">
            <h1 className="text-display urdu-display mb-8">تعارف</h1>
            <p className="large-text urdu-text text-gray-600 max-w-3xl mx-auto">
              لکھاری اور کہانی گو جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان تعلق کو دریافت کرتا ہے۔
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl mb-8">
                  <Image
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop"
                    alt="عبدالباسط ظفر" // Keep alt text
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                
                {/* Quick Stats */}
                <div className="space-y-4 text-right">
                  <div className="flex items-center space-x-3 space-x-reverse justify-end">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="urdu-text text-ink-muted">بن، جرمنی</span> {/* Use new ink-muted */}
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse justify-end">
                    <BookOpen className="w-5 h-5 text-red-600" />
                    <span className="urdu-text text-ink-muted">3 کتابیں شائع</span> {/* Use new ink-muted */}
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse justify-end">
                    <Users className="w-5 h-5 text-red-600" />
                    <span className="urdu-text text-ink-muted">دو زبانی لکھاری</span> {/* Use new ink-muted */}
                  </div>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="lg:col-span-2 text-right">
              <div className="prose max-w-none">
                <div className="urdu-text text-gray-700 leading-loose space-y-8">
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

                  <div className="bg-gray-50 rounded-2xl p-8 my-8">
                    <h3 className="text-heading-3 urdu-heading mb-6 flex items-center space-x-2 space-x-reverse justify-end">
                      <Award className="w-6 h-6 text-red-600" />
                      <span className="text-ink">اعزازات</span> {/* Use new ink color */}
                    </h3>
                    <ul className="space-y-3 urdu-text">
                      <li>• بین الاقوامی ادبی انعام کے لیے شارٹ لسٹ (2023)</li>
                      <li>• "30 انڈر 30" لکھاریوں میں شامل</li>
                      <li>• ڈیجیٹل کہانی گوئی انوویشن گرانٹ کے وصول کنندہ</li>
                    </ul>
                  </div>

                  <h3 className="text-heading-3 urdu-heading mb-6">تقاریر اور کمیونٹی</h3>
                  <p>
                    عبدالباسط باقاعدگی سے کانفرنسوں میں ٹیکنالوجی اور کہانی گوئی کے درمیان تعلق 
                    کے بارے میں بات کرتا ہے۔ وہ کہانی کی طاقت میں یقین رکھتا ہے کہ یہ ثقافتی 
                    تقسیم کو ختم کر سکتی ہے اور ہماری بڑھتی ہوئی جڑی دنیا میں تفہیم پیدا کر سکتی ہے۔
                  </p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Link 
                  href="/contact"
                  className="btn btn-primary group urdu-text"
                >
                  رابطہ کریں {/* Use new button styling */}
                  <ArrowUpRight className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}