'use client';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';
import { LanguageProvider } from '../context/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <html lang="ur" dir="rtl">
        <body className="font-urdu-body bg-surface text-ink antialiased">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </LanguageProvider>
  );
}