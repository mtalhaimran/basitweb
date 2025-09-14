'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Award, ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  const content = {
    ur: {
      title: "میرے بارے میں",
      bio: [
        "عبدالباسط ظفر ایک دو زبانی لکھاری ہے جس کا کام ڈیجیٹل اور ادبی دنیاوں کو جوڑتا ہے۔ پاکستان میں پیدا ہوا اور اب جرمنی میں مقیم، اس کی تحریریں ہجرت، ٹیکنالوجی، اور ثقافتی شناخت کے موضوعات کو دریافت کرتی ہیں۔",
        "ان کا پہلا ناول 'یادوں کے سائے' جدید پاکستان میں مہاجر تجربے کی نفیس تصویر کشی کے لیے تنقیدی پذیرائی حاصل کر چکا ہے۔ ان کے مضامین ٹیک جرنلز سے لے کر ادبی رسائل تک مختلف اشاعات میں شائع ہوئے ہیں۔",
        "اردو اور انگریزی دونوں میں لکھتے ہوئے، عبدالباسط کثیر لسانی کہانی گوئی کی بھرپوری کو محفوظ اور منانے کی کوشش کرتا ہے۔ ان کا اردو سلسلہ 'بن کا بنجارہ' جرمنی میں ایک آوارہ کے تجربات کو بیان کرتا ہے۔"
      ],
      awardsTitle: "اعزازات",
      awards: [
        "بین الاقوامی ادبی انعام کے لیے شارٹ لسٹ (۲۰۲۳)",
        "'30 انڈر 30' لکھاریوں میں شامل",
        "ڈیجیٹل کہانی گوئی انوویشن گرانٹ کے وصول کنندہ"
      ],
      contact: "رابطہ کریں"
    },
    en: {
      title: "About Me",
      bio: [
        "Abdul Basit Zafar is a bilingual writer whose work bridges the digital and literary worlds. Born in Pakistan and now based in Germany, his writing explores themes of migration, technology, and cultural identity.",
        "His debut novel, 'Shadows of Memory,' has received critical acclaim for its nuanced portrayal of the immigrant experience in modern Pakistan. His essays have been featured in various publications, from tech journals to literary magazines.",
        "Writing in both Urdu and English, Abdul Basit seeks to preserve and celebrate the richness of multilingual storytelling. His Urdu series, 'Bonn ka Banjara,' chronicles the experiences of a wanderer in Germany."
      ],
      awardsTitle: "Accolades",
      awards: [
        "Shortlisted for the International Literary Prize (2023)",
        "Named one of the '30 Under 30' writers to watch",
        "Recipient of the Digital Storytelling Innovation Grant"
      ],
      contact: "Get in Touch"
    }
  };

  const current = content[language];

  return (
    <main className="container py-24 md:py-32">
      <SectionHeading>{current.title}</SectionHeading>
      <div className="grid md:grid-cols-3 gap-12 mt-12">
        
        {/* Left Column: Image */}
        <div className="md:col-span-1">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
              alt={isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Right Column: Bio and Awards */}
        <div className={`md:col-span-2 ${isUrdu ? 'text-right' : 'text-left'}`}>
          <div className={`prose max-w-none ${isUrdu ? 'prose-ur' : ''}`}>
            {current.bio.map((paragraph, index) => (
              <p key={index} className={`text-lg leading-relaxed ${isUrdu ? 'font-urdu-body' : ''}`}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 p-6 bg-surface-elevated rounded-lg border border-line">
            <h3 className={`flex items-center gap-3 text-2xl font-bold mb-4 ${isUrdu ? 'font-urdu-heading justify-end flex-row-reverse' : 'font-sans'}`}>
              <Award className="h-6 w-6 text-brand" />
              <span>{current.awardsTitle}</span>
            </h3>
            <ul className={`space-y-2 list-disc ${isUrdu ? 'list-inside pr-4' : 'pl-5'}`}>
              {current.awards.map((award, index) => (
                <li key={index} className={`text-base ${isUrdu ? 'font-urdu-body' : ''}`}>
                  {award}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/contact"
              className={`inline-flex items-center gap-2 rounded-md bg-brand px-8 py-3 text-lg font-semibold text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 ${isUrdu ? 'font-urdu-body' : ''}`}
            >
              <span>{current.contact}</span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}