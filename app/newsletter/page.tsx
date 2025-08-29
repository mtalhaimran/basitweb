import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NewsletterForm } from '@/components/NewsletterForm';
import { Mail, Users, Calendar } from 'lucide-react';

export const metadata = {
  title: 'نیوز لیٹر - عبدالباسط ظفر',
  description: 'نئی کہانیوں، خیالات، اور تحریری عمل کی پردے کے پیچھے کی جھلکیوں کے ساتھ اپڈیٹ رہیں۔',
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen" lang="ur" dir="rtl">
      <Header lang="ur" />
      <main id="main-content" className="pt-32 pb-20" data-pagefind-body>
        <div className="container">
          <div className="text-center mb-20">
            <h1 className="text-display urdu-display mb-8">نیوز لیٹر</h1>
            <p className="large-text urdu-text text-gray-600 max-w-3xl mx-auto">
              قارئین کی کمیونٹی میں شامل ہوں جو ایسی کہانیوں کی قدر کرتے ہیں جو ثقافتوں کو جوڑتی ہیں اور ہمارے مشترکہ انسانیت کو دریافت کرتی ہیں۔
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8">
              <Mail className="w-12 h-12 text-red-600 mx-auto mb-6" />
              <h3 className="text-heading-4 urdu-heading mb-4">کہانیاں پہلے</h3>
              <p className="urdu-text text-gray-600">
                نئے مضامین، کتابوں کے اقتباسات، اور تاملات آپ کے انباکس میں۔
              </p>
            </div>
            
            <div className="text-center p-8">
              <Users className="w-12 h-12 text-red-600 mx-auto mb-6" />
              <h3 className="text-heading-4 urdu-heading mb-4">کمیونٹی</h3>
              <p className="urdu-text text-gray-600">
                دنیا بھر کے ساتھی قارئین اور لکھاریوں کے ساتھ بحث میں شامل ہوں۔
              </p>
            </div>
            
            <div className="text-center p-8">
              <Calendar className="w-12 h-12 text-red-600 mx-auto mb-6" />
              <h3 className="text-heading-4 urdu-heading mb-4">پردے کے پیچھے</h3>
              <p className="urdu-text text-gray-600">
                تحریری عمل کی بصیرت، الہام کے ذرائع، اور آنے والے منصوبے۔
              </p>
            </div>
          </div>

          <div className="max-w-lg mx-auto minimal-card">
            <h2 className="text-heading-2 urdu-heading text-center mb-8">سبسکرائب کریں</h2>
            <NewsletterForm lang="ur" />
            
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <p className="text-caption urdu-text text-gray-600 text-center leading-relaxed">
                سبسکرائب کرنے سے، آپ کو ایک تصدیقی ای میل موصول ہوگا۔ آپ کا ای میل کبھی شیئر نہیں کیا جائے گا، 
                اور آپ کسی بھی وقت ان سبسکرائب کر سکتے ہیں۔ ماہانہ نیوز لیٹر، کوئی سپیم نہیں۔
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer lang="ur" />
    </div>
  );
}