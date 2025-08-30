import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'عبدالباسط ظفر',
  description: 'اردو اولین پورٹ فولیو',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ur" dir="rtl">
      <body className="font-urdu-body bg-surface text-ink antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
