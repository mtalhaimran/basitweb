import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'عبدالباسط ظفر - لکھاری اور کہانی گو',
  description: 'عبدالباسط ظفر کا پورٹ فولیو - کتابیں، مضامین، اور کہانیاں',
  alternates: {
    languages: {
      'en': '/'
    }
  }
};

export default function UrduLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="urdu-text" lang="ur" dir="rtl">
      {children}
    </div>
  );
}