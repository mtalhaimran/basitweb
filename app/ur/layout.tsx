import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'عبدالباسط ظفر - لکھاری اور کہانی گو',
  description: 'عبدالباسط ظفر کا پورٹ فولیو - کتابیں، مضامین، اور کہانیاں اردو اور انگریزی میں',
  alternates: {
    languages: {
      'en': '/',
      'ur': '/ur'
    }
  },
  openGraph: {
    locale: 'ur_PK',
    alternateLocale: 'en_US'
  }
};

export default function UrduLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="ur" dir="rtl" className="font-urdu-body">
      {children}
    </div>
  );
}